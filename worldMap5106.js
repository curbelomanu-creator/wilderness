// Wilderness 5.10.6 — interactive master world map viewer
(()=>{
  if(window.WildernessWorldMap5106)return;
  window.WildernessWorldMap5106={version:'5.10.6'};

  const COORDS_URL='docs/WILDERNESS_6_MASTER_COORDINATES.csv?v=5106a1';
  const ROADS_URL='docs/WILDERNESS_6_MASTER_ROAD_GRAPH.csv?v=5106a1';
  const EXT={minX:-44000,maxX:33000,minZ:-71000,maxZ:78000};
  const BLOCK_NAMES={
    '1':'Judá · Samaria central','2':'Filistea · Sefelá','3':'Jezreel · Galilea',
    '4':'Galaad · Amón · Moab','5':'Edom · Arabá · Aqaba','6':'Fenicia · Aram',
    '7':'Norte neo-hitita · Éufrates','8':'Egipto · Sinaí · Nilo'
  };
  const BLOCK_COLORS={
    '1':'#e9cf8f','2':'#cf9f70','3':'#b6c782','4':'#c7a56a',
    '5':'#b97b55','6':'#8fb6a1','7':'#9d9a7b','8':'#d7bd78'
  };
  const WAYPOINTS={
    SHARON_CORRIDOR:{x:-3600,z:5100,name:'Llanura de Sharon'},
    CARMEL_PASS:{x:-1500,z:10400,name:'Paso del Carmelo'},
    HULA:{x:3500,z:14750,name:'Valle de Hula'},
    SEA_OF_GALILEE:{x:3350,z:11450,name:'Mar de Galilea'},
    DEAD_SEA_NORTH:{x:3200,z:-300,name:'Norte del Mar Muerto'},
    BETH_SHEAN_FORD:{x:3300,z:8050,name:'Vado de Bet-seán'},
    JERICHO_FORD:{x:3200,z:1050,name:'Vado de Jericó'},
    ARABAH_NORTH:{x:3500,z:-7200,name:'Arabá norte'},
    ARWAD_MAINLAND_EMBARKATION:{x:5550,z:33700,name:'Embarcadero de Arwad'},
    ACCO_CORRIDOR:{x:-650,z:13700,name:'Corredor de Acco'},
    UPPER_GALILEE:{x:2200,z:15100,name:'Alta Galilea'},
    ANTI_LEBANON_PASS:{x:7600,z:23500,name:'Paso del Anti-Líbano'},
    BEKAA:{x:4700,z:21500,name:'Becá'},
    LEBANON_PASS:{x:3400,z:22600,name:'Paso del Líbano'},
    HARRAN_BOUNDARY:{x:32000,z:61000,name:'Ruta hacia Harrán / Asiria'},
    SINAI_CENTRAL:{x:-18800,z:-20500,name:'Sinaí central'},
    AQABA_NORTH:{x:3900,z:-16000,name:'Golfo de Aqaba'},
    EGYPT_DELTA_PORTS:{x:-35500,z:-6200,name:'Puertos del Delta'}
  };

  let cities=[],cityById=new Map(),routes=[];
  let canvas,ctx,modal,info,status,btn;
  let zoom=1,panX=0,panY=0,dragging=false,lastX=0,lastY=0;
  let showRoutes=true,showLabels=true,ready=false,selected=null;

  function csvRows(text){
    const lines=String(text||'').trim().split(/\r?\n/); if(lines.length<2)return[];
    const head=lines.shift().split(',');
    return lines.filter(Boolean).map(line=>{
      const p=line.split(','); const o={}; head.forEach((h,i)=>o[h]=p[i]??''); return o;
    });
  }
  function routeCoord(node){return cityById.get(node)||WAYPOINTS[node]||null;}
  function blockKey(v){return String(v||'').split('-')[0];}
  function typeLabel(t){return ({city:'Ciudad',settlement:'Asentamiento',mining_district:'Distrito minero',port:'Puerto',oasis_settlement:'Oasis',fortress:'Fortaleza',ruins:'Ruinas',monument:'Monumento',ruins_mining:'Ruinas/minas',landmark:'Hito'})[t]||t;}

  function buildUI(){
    const style=document.createElement('style');
    style.textContent=`
      #wm5106btn{position:fixed;z-index:31;top:calc(12px + env(safe-area-inset-top,0px));right:calc(72px + env(safe-area-inset-right,0px));border:1px solid #d8b97a88;border-radius:8px;padding:7px 9px;color:#f7e4bb;background:#1c130bcc;font:700 9px ui-monospace,SFMono-Regular,Menlo,monospace;pointer-events:auto;text-shadow:0 1px 2px #000}
      #wm5106{display:none;position:fixed;z-index:180;inset:0;background:#100c08f3;color:#f4e6c4;pointer-events:auto;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;touch-action:none}
      #wm5106.open{display:block}
      #wm5106top{position:absolute;z-index:4;left:0;right:0;top:0;min-height:54px;display:flex;align-items:center;gap:7px;padding:calc(8px + env(safe-area-inset-top,0px)) calc(10px + env(safe-area-inset-right,0px)) 8px calc(10px + env(safe-area-inset-left,0px));background:#21170fdc;border-bottom:1px solid #cfae7166}
      #wm5106top strong{font-size:13px;color:#fff0b8;margin-right:auto;white-space:nowrap}
      .wm5106ctl{border:1px solid #d6b87a99;background:#352517;color:#f7e4bb;border-radius:7px;padding:7px 9px;font:700 9px inherit}
      .wm5106ctl.on{background:#72512c}
      #wm5106canvas{position:absolute;inset:0;width:100%;height:100%;display:block;image-rendering:auto;touch-action:none}
      #wm5106info{position:absolute;z-index:4;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));max-width:min(390px,72vw);background:#20160edb;border:1px solid #d6b87a88;border-radius:9px;padding:9px 11px;font-size:10px;line-height:1.45;box-shadow:0 5px 20px #0008}
      #wm5106info b{color:#fff0b8}
      #wm5106status{position:absolute;z-index:4;right:calc(10px + env(safe-area-inset-right,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));background:#20160ed0;border:1px solid #d6b87a66;border-radius:8px;padding:7px 9px;font-size:8px;max-width:42vw;text-align:right}
      #wm5106legend{position:absolute;z-index:3;right:calc(10px + env(safe-area-inset-right,0px));top:calc(64px + env(safe-area-inset-top,0px));background:#20160ebd;border:1px solid #d6b87a55;border-radius:8px;padding:7px 8px;font-size:7px;line-height:1.55;pointer-events:none}
      #wm5106legend span{display:block;white-space:nowrap}#wm5106legend i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px}
      @media(pointer:coarse),(max-width:820px){#wm5106btn{right:calc(65px + env(safe-area-inset-right,0px));font-size:7px;padding:7px}#wm5106top{gap:4px;min-height:48px}#wm5106top strong{font-size:9px;max-width:34vw;overflow:hidden;text-overflow:ellipsis}.wm5106ctl{padding:6px 7px;font-size:8px}#wm5106legend{display:none}#wm5106info{font-size:8px;max-width:68vw}#wm5106status{font-size:7px}}
    `;
    document.head.appendChild(style);

    btn=document.createElement('button'); btn.id='wm5106btn'; btn.textContent='MAPA'; btn.title='Mapa maestro del mundo (M)';
    document.body.appendChild(btn);

    modal=document.createElement('div'); modal.id='wm5106'; modal.innerHTML=`
      <div id="wm5106top"><strong>MAPA DEL MUNDO · WILDERNESS 6</strong><button class="wm5106ctl" data-a="minus">−</button><button class="wm5106ctl" data-a="plus">+</button><button class="wm5106ctl" data-a="reset">TODO</button><button class="wm5106ctl on" data-a="routes">RUTAS</button><button class="wm5106ctl on" data-a="labels">NOMBRES</button><button class="wm5106ctl" data-a="close">CERRAR</button></div>
      <canvas id="wm5106canvas"></canvas>
      <div id="wm5106legend">${Object.entries(BLOCK_NAMES).map(([k,n])=>`<span><i style="background:${BLOCK_COLORS[k]}"></i>${k}. ${n}</span>`).join('')}</div>
      <div id="wm5106info"><b>Mapa maestro</b><br>Arrastra para desplazarte · rueda o +/− para zoom · toca una ciudad para ver detalles.</div>
      <div id="wm5106status">Cargando mapa…</div>`;
    document.body.appendChild(modal);
    canvas=modal.querySelector('#wm5106canvas');ctx=canvas.getContext('2d');info=modal.querySelector('#wm5106info');status=modal.querySelector('#wm5106status');

    btn.onclick=open;
    modal.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
      const a=b.dataset.a;
      if(a==='close')return close();
      if(a==='plus'){zoom=Math.min(16,zoom*1.35);draw();}
      if(a==='minus'){zoom=Math.max(.45,zoom/1.35);draw();}
      if(a==='reset'){zoom=1;panX=panY=0;selected=null;setDefaultInfo();draw();}
      if(a==='routes'){showRoutes=!showRoutes;b.classList.toggle('on',showRoutes);draw();}
      if(a==='labels'){showLabels=!showLabels;b.classList.toggle('on',showLabels);draw();}
    });

    canvas.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture?.(e.pointerId)});
    canvas.addEventListener('pointermove',e=>{if(!dragging)return;panX+=e.clientX-lastX;panY+=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;draw()});
    canvas.addEventListener('pointerup',e=>{dragging=false;pick(e.clientX,e.clientY)});
    canvas.addEventListener('pointercancel',()=>dragging=false);
    canvas.addEventListener('wheel',e=>{e.preventDefault();const factor=e.deltaY<0?1.18:1/1.18;zoom=Math.max(.45,Math.min(16,zoom*factor));draw()},{passive:false});
    addEventListener('resize',resize);
    document.addEventListener('keydown',keyCapture,true);
  }

  function keyCapture(e){
    if((e.key==='m'||e.key==='M')&&!e.repeat){e.preventDefault();e.stopImmediatePropagation();modal?.classList.contains('open')?close():open();return;}
    if(!modal?.classList.contains('open'))return;
    if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close();return;}
    if(['w','a','s','d','W','A','S','D',' ','e','E','f','F','c','C','k','K'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();}
  }
  function open(){modal.classList.add('open');resize();draw();}
  function close(){modal.classList.remove('open');}
  function resize(){
    if(!canvas)return;const d=Math.min(devicePixelRatio||1,2),r=canvas.getBoundingClientRect();canvas.width=Math.max(1,Math.floor(r.width*d));canvas.height=Math.max(1,Math.floor(r.height*d));ctx.setTransform(d,0,0,d,0,0);draw();
  }
  function size(){const r=canvas.getBoundingClientRect();return{w:r.width,h:r.height};}
  function baseScale(){const {w,h}=size();return Math.min((w-32)/(EXT.maxX-EXT.minX),(h-76)/(EXT.maxZ-EXT.minZ));}
  function toScreen(x,z){
    const {w,h}=size(),cx=(EXT.minX+EXT.maxX)/2,cz=(EXT.minZ+EXT.maxZ)/2,s=baseScale()*zoom;
    return{x:w/2+(x-cx)*s+panX,y:h/2-(z-cz)*s+panY};
  }
  function worldPath(points,closePath=false){
    ctx.beginPath();points.forEach((p,i)=>{const q=toScreen(p[0],p[1]);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});if(closePath)ctx.closePath();
  }

  function drawWater(){
    // Mediterranean west of the Levantine/Egyptian coast.
    const coast=[[-43000,-5200],[-34000,-6200],[-25300,-7600],[-13400,-6500],[-9200,-5000],[-7200,-3150],[-6350,-1250],[-5500,250],[-4200,5200],[-1750,10570],[-300,16560],[1320,19780],[2510,23490],[3910,26030],[5860,34140],[10000,39000]];
    const med=[[-44000,39000],[-44000,-5200],...coast,[10000,39000]];
    worldPath(med,true);ctx.fillStyle='#18394a';ctx.fill();

    // Dead Sea / Sea of Galilee.
    ellipseWorld(3300,-3000,900,2600,'#244c59');
    ellipseWorld(3350,11450,850,1500,'#2c6170');

    // Red Sea and gulfs (schematic but continuous).
    worldPath([[3000,-15800],[5000,-15800],[6500,-26000],[7200,-50000],[3000,-71000],[-3000,-71000],[-6500,-52000],[-8200,-35000],[-9800,-17000],[-7200,-15000],[-4700,-30000],[-2500,-43000],[1200,-30000],[3000,-15800]],true);ctx.fillStyle='#173f50';ctx.fill();

    // Nile + branches.
    const nile=[[-24400,-70000],[-24400,-67100],[-31300,-62000],[-41900,-44300],[-38200,-30000],[-37650,-21300],[-37000,-16000],[-35500,-11500]];
    drawRiver(nile,5,'#3d7f93');
    [[[-35500,-11500],[-31600,-8850],[-30500,-6000]],[[-35500,-11500],[-35200,-8000],[-34000,-5800]],[[-35500,-11500],[-40000,-9000],[-42200,-6200]]].forEach(r=>drawRiver(r,3,'#3d7f93'));

    // Jordan.
    drawRiver([[4100,17000],[3940,16330],[3500,14750],[3350,13000],[3350,11450],[3000,9800],[2510,7980],[2300,4500],[1970,1030],[3000,-500],[3300,-3000]],3,'#3d7f93');
    // Orontes and Euphrates.
    drawRiver([[4900,21500],[7000,28000],[10500,33500],[14240,37240],[13100,55700]],3,'#3d7f93');
    drawRiver([[33000,79000],[31300,75900],[28500,69000],[26300,63700],[31000,56000]],5,'#3d7f93');
  }
  function ellipseWorld(x,z,rx,rz,color){const c=toScreen(x,z),s=baseScale()*zoom;ctx.beginPath();ctx.ellipse(c.x,c.y,Math.max(2,rx*s),Math.max(2,rz*s),0,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function drawRiver(points,width,color){worldPath(points);ctx.strokeStyle=color;ctx.lineWidth=Math.max(1,width*Math.min(1.8,Math.sqrt(zoom)));ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();}

  function drawReliefHints(){
    const labels=[
      [-1750,10570,'MONTE CARMELO'],[5200,17450,'MONTE HERMÓN'],[6100,-11250,'SEÍR'],
      [4700,21500,'BECÁ'],[7600,24500,'ANTI-LÍBANO'],[3100,24500,'LÍBANO'],[-11700,-35800,'SINAÍ / HOREB'],
      [3500,-10500,'ARABÁ'],[3300,-3000,'MAR MUERTO'],[3350,11450,'MAR DE GALILEA']
    ];
    ctx.save();ctx.fillStyle='#d8c89d88';ctx.font=`${Math.max(7,8*Math.min(1.25,zoom))}px ui-monospace,monospace`;ctx.textAlign='center';
    labels.forEach(([x,z,t])=>{const p=toScreen(x,z);ctx.fillText(t,p.x,p.y)});ctx.restore();
  }

  function drawRoutes(){
    if(!showRoutes)return;
    routes.forEach(r=>{
      let prev=null;
      r.nodes.forEach(n=>{
        const c=routeCoord(n.node);if(!c){prev=null;return;}
        if(prev){const a=toScreen(prev.x,prev.z),b=toScreen(c.x,c.z);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineWidth=r.mode==='sea'?1.6:1.1;ctx.strokeStyle=r.mode==='sea'?'#77b8cacc':'#d7b574a8';ctx.setLineDash(r.mode==='sea'?[5,5]:[]);ctx.stroke();ctx.setLineDash([]);}
        prev=c;
      });
    });
  }

  function markerStyle(c){
    if(c.type==='monument'||c.type==='landmark')return{fill:'#fff0b8',shape:'diamond'};
    if(c.type.includes('ruins'))return{fill:'#a88f77',shape:'square'};
    if(c.type==='port')return{fill:'#80c2cb',shape:'square'};
    return{fill:BLOCK_COLORS[blockKey(c.block)]||'#e8d2a0',shape:'circle'};
  }
  function drawCities(){
    const {w,h}=size();
    cities.forEach(c=>{
      const p=toScreen(c.x,c.z);if(p.x<-40||p.x>w+40||p.y<-40||p.y>h+40)return;
      const m=markerStyle(c),r=Math.max(2.3,Math.min(6.5,2.6+Number(c.radius||0)/95)*Math.min(1.25,Math.sqrt(zoom)));
      ctx.beginPath();
      if(m.shape==='diamond'){ctx.moveTo(p.x,p.y-r);ctx.lineTo(p.x+r,p.y);ctx.lineTo(p.x,p.y+r);ctx.lineTo(p.x-r,p.y);ctx.closePath();}
      else if(m.shape==='square')ctx.rect(p.x-r,p.y-r,r*2,r*2);
      else ctx.arc(p.x,p.y,r,0,Math.PI*2);
      ctx.fillStyle=m.fill;ctx.fill();ctx.strokeStyle=selected===c?'#ffffff':'#1a1008';ctx.lineWidth=selected===c?2:1;ctx.stroke();
      if(showLabels&&(zoom>=.82||Number(c.radius)>=190||['jerusalem','memphis','thebes','damascus','carchemish','tyre','gaza'].includes(c.id))){
        ctx.font=`${Math.max(7,Math.min(12,7.5+zoom*.9))}px ui-monospace,monospace`;ctx.textAlign='left';ctx.textBaseline='middle';ctx.lineWidth=3;ctx.strokeStyle='#120c08dd';ctx.strokeText(c.name,p.x+r+3,p.y);ctx.fillStyle='#f3e5c6';ctx.fillText(c.name,p.x+r+3,p.y);
      }
    });
  }
  function drawCompass(){
    const {w}=size();ctx.save();ctx.translate(w-29,96);ctx.strokeStyle='#ead7aa';ctx.fillStyle='#ead7aa';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,17);ctx.lineTo(0,-16);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-18);ctx.lineTo(-4,-9);ctx.lineTo(4,-9);ctx.closePath();ctx.fill();ctx.font='9px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText('N',0,-23);ctx.restore();
  }
  function draw(){
    if(!ctx||!canvas)return;const {w,h}=size();ctx.clearRect(0,0,w,h);ctx.fillStyle='#251b12';ctx.fillRect(0,0,w,h);
    drawWater();drawReliefHints();drawRoutes();drawCities();drawCompass();
    if(!ready){ctx.fillStyle='#f4e6c4';ctx.font='13px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText('Cargando coordenadas del mundo…',w/2,h/2)}
  }

  function pick(clientX,clientY){
    if(!ready)return;const r=canvas.getBoundingClientRect(),x=clientX-r.left,y=clientY-r.top;
    let best=null,bestD=15;
    cities.forEach(c=>{const p=toScreen(c.x,c.z),d=Math.hypot(p.x-x,p.y-y);if(d<bestD){best=c;bestD=d}});
    if(best){selected=best;const bk=blockKey(best.block);info.innerHTML=`<b>${best.name}</b><br>${typeLabel(best.type)} · Bloque ${best.block}<br>${BLOCK_NAMES[bk]||''}<br><small>Coordenadas maestras: ${best.x}, ${best.z}${best.radius?` · radio ${best.radius}`:''}</small>`;draw();}
  }
  function setDefaultInfo(){if(info)info.innerHTML='<b>Mapa maestro Wilderness 6</b><br>8 bloques conectados · arrastra para desplazarte · rueda o +/− para zoom · toca una ciudad para ver detalles.<br><small>Vista de diseño consolidada; el terreno jugable se reconstruirá después sobre estos datos.</small>';}

  async function loadData(){
    try{
      const [a,b]=await Promise.all([fetch(COORDS_URL,{cache:'no-store'}),fetch(ROADS_URL,{cache:'no-store'})]);
      if(!a.ok||!b.ok)throw Error('No se pudieron leer los datos maestros');
      cities=csvRows(await a.text()).map(o=>({...o,x:+o.x,z:+o.z,radius:+o.radius||0}));
      cityById=new Map(cities.map(c=>[c.id,c]));
      const rr=csvRows(await b.text()),groups=new Map();
      rr.forEach(o=>{if(!groups.has(o.route_id))groups.set(o.route_id,{id:o.route_id,name:o.route_name,mode:o.mode,nodes:[]});const g=groups.get(o.route_id);g.nodes.push({seq:+o.sequence,node:o.node,mode:o.mode});if(o.mode==='sea')g.mode='sea'});
      routes=[...groups.values()].map(g=>(g.nodes.sort((x,y)=>x.seq-y.seq),g));ready=true;
      status.textContent=`${cities.length} lugares · ${routes.length} corredores · M para abrir/cerrar`;
      setDefaultInfo();draw();
    }catch(e){console.warn('World map 5.10.6',e);status.textContent='No se pudieron cargar los datos del mapa';info.innerHTML='<b>Mapa no disponible</b><br>Los archivos maestros no pudieron cargarse.';}
  }

  buildUI();loadData();
})();