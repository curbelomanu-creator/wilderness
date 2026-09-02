// Wilderness World Editor 0.1 - browser-based topographic sculpt/paint editor
(()=>{
  const W=window.WildernessWorld,RT=window.WildernessWorldEditorRuntime;
  if(!W||!RT)throw new Error('World Editor: runtime no disponible');

  const canvas=document.getElementById('editor-canvas'),ctx=canvas.getContext('2d',{alpha:false});
  const Geo=window.WildernessGeography47;
  const isMobile=matchMedia('(pointer:coarse)').matches||innerWidth<760;
  const $=id=>document.getElementById(id);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const view={x:0,z:0,scale:isMobile?.72:1.18};
  const cursor={sx:innerWidth/2,sy:innerHeight/2,x:0,z:0,inside:false};
  let tool='raise',paintBiome='desert',brush=34,strength=1.1,pathWidth=4;
  let drawing=false,panning=false,lastPX=0,lastPY=0,lastBrushAt=0,flattenTarget=null,currentPath=null;
  let history=[],future=[],strokeSnapshot=null,renderQueued=false,saveTimer=null;
  const pointers=new Map();let pinchStart=0,pinchScale=1;

  const biomeColors={
    sea:[48,88,105],coast:[191,161,103],desert:[198,151,83],steppe:[148,143,82],
    fertile:[103,124,68],grassland:[91,125,67],forest:[67,102,58],rocky:[113,96,78],
    mountain:[105,96,85],oasis:[70,111,61]
  };

  function resize(){
    const dpr=Math.min(devicePixelRatio||1,isMobile?1.25:1.5);
    canvas.width=Math.max(1,Math.floor(innerWidth*dpr));canvas.height=Math.max(1,Math.floor(innerHeight*dpr));
    canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';canvas._dpr=dpr;queueRender();
  }
  addEventListener('resize',resize);

  function screenToWorld(sx,sy){return{x:view.x+(sx-innerWidth/2)/view.scale,z:view.z+(sy-innerHeight/2)/view.scale}}
  function worldToScreen(x,z){return{x:(x-view.x)*view.scale+innerWidth/2,y:(z-view.z)*view.scale+innerHeight/2}}
  function updateCursor(sx,sy){cursor.sx=sx;cursor.sy=sy;const p=screenToWorld(sx,sy);cursor.x=p.x;cursor.z=p.z;cursor.inside=true}

  function getHeightForPreview(x,z){
    let y=(Geo?.groundY?Geo.groundY(x,z):RT.baseGround(x,z))+RT.sampleHeightDelta(x,z);
    const q=RT.manualRiverInfo(x,z,52);
    if(q){
      if(q.d<q.bank){const f=1-q.d/q.bank;y-=f*f*Math.max(.35,q.width*.12)}
      if(q.d<q.width){const f=1-q.d/q.width;y-=f*f*Math.max(.55,q.width*.18)}
    }
    return y;
  }
  function getBiomeForPreview(x,z){
    const manual=RT.manualBiomeAt(x,z);if(manual)return manual;
    const q=RT.manualRiverInfo(x,z,38);if(q&&q.d<=q.width*2.3)return'fertile';
    return Geo?.biomeAt?Geo.biomeAt(x,z):RT.baseBiome(x,z);
  }
  function shaded(biome,h){
    const c=biomeColors[biome]||biomeColors.desert;
    const lift=clamp(h/45,-.18,.22),factor=1+lift;
    return`rgb(${clamp(Math.round(c[0]*factor),0,255)},${clamp(Math.round(c[1]*factor),0,255)},${clamp(Math.round(c[2]*factor),0,255)})`;
  }

  function drawGrid(){
    const spacing=view.scale>.9?50:100;
    ctx.save();ctx.strokeStyle='rgba(255,239,196,.10)';ctx.lineWidth=1;
    const min=screenToWorld(0,0),max=screenToWorld(innerWidth,innerHeight);
    let gx=Math.floor(min.x/spacing)*spacing;
    for(;gx<=max.x;gx+=spacing){const s=worldToScreen(gx,0).x;ctx.beginPath();ctx.moveTo(s,0);ctx.lineTo(s,innerHeight);ctx.stroke()}
    let gz=Math.floor(min.z/spacing)*spacing;
    for(;gz<=max.z;gz+=spacing){const s=worldToScreen(0,gz).y;ctx.beginPath();ctx.moveTo(0,s);ctx.lineTo(innerWidth,s);ctx.stroke()}
    ctx.restore();
  }
  function drawPaths(){
    ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
    for(const p of RT.data.paths||[]){
      if(!p?.points||p.points.length<1)continue;
      ctx.beginPath();
      p.points.forEach((pt,i)=>{const s=worldToScreen(pt.x,pt.z);if(i)ctx.lineTo(s.x,s.y);else ctx.moveTo(s.x,s.y)});
      ctx.strokeStyle=p.type==='river'?'rgba(54,139,188,.92)':'rgba(113,78,43,.95)';
      ctx.lineWidth=Math.max(2,(Number(p.width)||4)*2*view.scale);ctx.stroke();
      if(p===currentPath){
        ctx.strokeStyle='rgba(255,238,181,.85)';ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.stroke();ctx.setLineDash([]);
      }
      for(const pt of p.points){const s=worldToScreen(pt.x,pt.z);ctx.beginPath();ctx.arc(s.x,s.y,3.2,0,Math.PI*2);ctx.fillStyle='#fff0c4';ctx.fill()}
    }
    ctx.restore();
  }
  function render(){
    renderQueued=false;
    const dpr=canvas._dpr||1;ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle='#1a140d';ctx.fillRect(0,0,innerWidth,innerHeight);
    const step=isMobile?16:13;
    for(let sy=0;sy<innerHeight;sy+=step){
      for(let sx=0;sx<innerWidth;sx+=step){
        const p=screenToWorld(sx+step*.5,sy+step*.5),h=getHeightForPreview(p.x,p.z),b=getBiomeForPreview(p.x,p.z);
        let color=shaded(b,h);
        const river=RT.manualRiverInfo(p.x,p.z,24);
        if(river&&river.d<=river.width)color='rgb(55,119,151)';
        else{
          const road=RT.nearestPath(p.x,p.z,'road',12);
          if(road&&road.d<=road.width)color='rgb(143,104,63)';
        }
        ctx.fillStyle=color;ctx.fillRect(sx,sy,step+1,step+1);
      }
    }
    drawGrid();drawPaths();
    const origin=worldToScreen(0,0);ctx.fillStyle='rgba(255,239,190,.85)';ctx.fillRect(origin.x-2,origin.y-2,4,4);
    if(cursor.inside&&!['pan','road','river'].includes(tool)){
      ctx.beginPath();ctx.arc(cursor.sx,cursor.sy,brush*view.scale,0,Math.PI*2);
      ctx.strokeStyle='rgba(255,244,207,.92)';ctx.lineWidth=1.5;ctx.stroke();
      ctx.beginPath();ctx.arc(cursor.sx,cursor.sy,2.2,0,Math.PI*2);ctx.fillStyle='#fff2c8';ctx.fill();
    }
    $('status-left').textContent=`${tool.toUpperCase()} · x ${cursor.x.toFixed(1)} · z ${cursor.z.toFixed(1)} · zoom ${view.scale.toFixed(2)}x`;
    $('status-right').textContent=`Seed: ${W.seedToken} · ${Object.keys(RT.data.heights||{}).length} alturas · ${Object.keys(RT.data.biomes||{}).length} pintura · ${(RT.data.paths||[]).length} trazados`;
  }
  function queueRender(){if(renderQueued)return;renderQueued=true;requestAnimationFrame(render)}

  function scheduleSave(){
    clearTimeout(saveTimer);saveTimer=setTimeout(()=>{RT.save();saveTimer=null},130);
  }
  function snapshot(){return JSON.stringify(RT.data)}
  function beginUndo(){strokeSnapshot=snapshot()}
  function commitUndo(){
    if(!strokeSnapshot)return;const now=snapshot();
    if(now!==strokeSnapshot){history.push(strokeSnapshot);if(history.length>60)history.shift();future.length=0}
    strokeSnapshot=null;scheduleSave();
  }
  function restore(s){if(!s)return;RT.replace(JSON.parse(s));currentPath=null;queueRender()}
  function undo(){if(!history.length)return;future.push(snapshot());restore(history.pop());toast('Deshecho')}
  function redo(){if(!future.length)return;history.push(snapshot());restore(future.pop());toast('Rehecho')}

  function applyBrush(x,z){
    const CELL=RT.CELL,r=brush,minGX=Math.floor((x-r)/CELL),maxGX=Math.ceil((x+r)/CELL),minGZ=Math.floor((z-r)/CELL),maxGZ=Math.ceil((z+r)/CELL);
    const edits=[];
    for(let gx=minGX;gx<=maxGX;gx++)for(let gz=minGZ;gz<=maxGZ;gz++){
      const px=gx*CELL,pz=gz*CELL,d=Math.hypot(px-x,pz-z);if(d>r)continue;
      const fall=Math.pow(1-d/r,2),k=RT.gridKey(gx,gz),old=Number(RT.data.heights[k]||0);
      if(tool==='raise'||tool==='lower'){
        const sign=tool==='raise'?1:-1;RT.data.heights[k]=clamp(old+sign*strength*fall,-80,80);
      }else if(tool==='smooth'){
        let sum=0,n=0;for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){sum+=RT.hAtGrid(gx+dx,gz+dz);n++}
        edits.push([k,old+(sum/n-old)*clamp(strength*.18*fall,0,1)]);
      }else if(tool==='flatten'){
        const desired=flattenTarget-RT.baseGround(px,pz);
        edits.push([k,old+(desired-old)*clamp(strength*.16*fall,0,1)]);
      }else if(tool==='paint'){
        RT.data.biomes[k]=paintBiome;
      }
    }
    for(const [k,v] of edits)RT.data.heights[k]=clamp(v,-80,80);
    RT.data.updatedAt=Date.now();scheduleSave();queueRender();
  }

  function addPathPoint(x,z,type){
    beginUndo();
    if(!currentPath||currentPath.type!==type){
      currentPath={id:`${type}-${Date.now()}-${Math.floor(Math.random()*9999)}`,type,width:pathWidth,points:[]};
      RT.data.paths.push(currentPath);
    }
    const last=currentPath.points[currentPath.points.length-1];
    if(!last||Math.hypot(last.x-x,last.z-z)>2/currentPath.points.length+1)currentPath.points.push({x:Math.round(x*10)/10,z:Math.round(z*10)/10});
    commitUndo();queueRender();
  }
  function finishPath(){if(currentPath){toast(`${currentPath.type==='river'?'Río':'Camino'} terminado`);currentPath=null;queueRender()}}

  function setTool(next){
    tool=next;finishPath();
    document.querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('active',b.dataset.tool===tool));
    canvas.style.cursor=tool==='pan'?'grab':['road','river'].includes(tool)?'crosshair':'crosshair';
    queueRender();
  }

  document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>setTool(b.dataset.tool));
  document.querySelectorAll('[data-biome]').forEach(b=>b.onclick=()=>{paintBiome=b.dataset.biome;document.querySelectorAll('[data-biome]').forEach(x=>x.classList.toggle('active',x===b));setTool('paint')});
  $('brush-size').oninput=e=>{brush=Number(e.target.value);$('brush-size-v').textContent=String(brush);queueRender()};
  $('brush-strength').oninput=e=>{strength=Number(e.target.value);$('brush-strength-v').textContent=strength.toFixed(2)};
  $('path-width').oninput=e=>{pathWidth=Number(e.target.value);$('path-width-v').textContent=pathWidth.toFixed(1)};

  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('pointerdown',e=>{
    canvas.setPointerCapture?.(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});updateCursor(e.clientX,e.clientY);
    if(pointers.size===2){
      const a=[...pointers.values()];pinchStart=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);pinchScale=view.scale;drawing=false;panning=false;return;
    }
    if(e.button===2||e.button===1||tool==='pan'){panning=true;lastPX=e.clientX;lastPY=e.clientY;canvas.style.cursor='grabbing';return}
    if(tool==='road'||tool==='river'){addPathPoint(cursor.x,cursor.z,tool);return}
    beginUndo();drawing=true;flattenTarget=tool==='flatten'?RT.groundY(cursor.x,cursor.z):null;applyBrush(cursor.x,cursor.z);
  });
  canvas.addEventListener('pointermove',e=>{
    if(pointers.has(e.pointerId))pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===2){
      const a=[...pointers.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);
      if(pinchStart>5)view.scale=clamp(pinchScale*(d/pinchStart),.18,5);queueRender();return;
    }
    updateCursor(e.clientX,e.clientY);
    if(panning){
      const dx=e.clientX-lastPX,dy=e.clientY-lastPY;view.x-=dx/view.scale;view.z-=dy/view.scale;lastPX=e.clientX;lastPY=e.clientY;queueRender();return;
    }
    if(drawing&&Date.now()-lastBrushAt>28){lastBrushAt=Date.now();applyBrush(cursor.x,cursor.z)}
    else queueRender();
  });
  function endPointer(e){
    pointers.delete(e.pointerId);
    if(pointers.size<2)pinchStart=0;
    if(drawing){drawing=false;commitUndo()}
    panning=false;canvas.style.cursor=tool==='pan'?'grab':'crosshair';
  }
  canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);
  canvas.addEventListener('pointerleave',()=>{cursor.inside=false;queueRender()});
  canvas.addEventListener('pointerenter',e=>{cursor.inside=true;updateCursor(e.clientX,e.clientY);queueRender()});
  canvas.addEventListener('dblclick',e=>{if(tool==='road'||tool==='river'){e.preventDefault();finishPath()}});
  canvas.addEventListener('wheel',e=>{
    e.preventDefault();const before=screenToWorld(e.clientX,e.clientY),factor=Math.exp(-e.deltaY*.0012);
    view.scale=clamp(view.scale*factor,.18,5);const after=screenToWorld(e.clientX,e.clientY);view.x+=before.x-after.x;view.z+=before.z-after.z;queueRender();
  },{passive:false});

  addEventListener('keydown',e=>{
    if(e.key==='Enter'){finishPath();return}
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo();return}
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='y'){e.preventDefault();redo();return}
    const map={q:'pan','1':'raise','2':'lower','3':'smooth','4':'flatten','5':'paint','6':'road','7':'river'};
    if(map[e.key.toLowerCase()])setTool(map[e.key.toLowerCase()]);
  });

  $('undo').onclick=undo;$('redo').onclick=redo;
  $('save').onclick=()=>{RT.save();toast('Mundo guardado en este navegador')};
  $('play').onclick=()=>{RT.save();location.href='index.html'+location.search};
  $('export').onclick=()=>{
    RT.save();const blob=new Blob([JSON.stringify(RT.data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=`wilderness-${W.seedToken}-world-edit.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('JSON exportado');
  };
  $('import').onclick=()=>$('file-import').click();
  $('file-import').onchange=async e=>{
    const file=e.target.files?.[0];if(!file)return;
    try{const parsed=JSON.parse(await file.text());if(parsed.version!==1)throw Error('Versión no compatible');history.push(snapshot());RT.replace(parsed);future.length=0;toast('Mapa importado');queueRender()}catch(err){toast('No se pudo importar: '+err.message)}e.target.value='';
  };
  $('reset').onclick=()=>{
    if(!confirm('¿Borrar todas las modificaciones manuales de este seed?'))return;
    history.push(snapshot());RT.clear();future.length=0;currentPath=null;toast('Ediciones borradas');queueRender();
  };

  let toastTimer=0;
  function toast(text){const el=$('toast');el.textContent=text;el.style.opacity=1;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.opacity=0,1600)}

  resize();setTool('raise');toast('Editor cargado · las ediciones se guardan por seed');
})();