// Wilderness World Editor Runtime 0.1
// Applies sparse, non-destructive terrain/biome/path edits stored by editor.html.
(()=>{
  const W=window.WildernessWorld;
  if(!W||window.WildernessWorldEditorRuntime)return;

  const STORAGE_PREFIX='wilderness-world-editor-v1:';
  const key=STORAGE_PREFIX+(W.seedToken||'default');
  const CELL=8;
  const baseGround=W.groundY.bind(W);
  const baseBiome=W.biomeAt.bind(W);
  const baseRoad=W.roadAt?W.roadAt.bind(W):()=>false;
  const baseRiverAt=W.riverAt?W.riverAt.bind(W):()=>false;
  const baseRiverBankAt=W.riverBankAt?W.riverBankAt.bind(W):()=>false;
  const baseRiverInfoAt=W.riverInfoAt?W.riverInfoAt.bind(W):()=>null;

  const blank=()=>({version:1,cellSize:CELL,heights:{},biomes:{},paths:[],updatedAt:Date.now()});
  let data=blank();
  try{
    const raw=localStorage.getItem(key);
    if(raw){
      const parsed=JSON.parse(raw);
      if(parsed&&parsed.version===1)data={...blank(),...parsed,heights:parsed.heights||{},biomes:parsed.biomes||{},paths:Array.isArray(parsed.paths)?parsed.paths:[]};
    }
  }catch(e){console.warn('World Editor: no se pudo leer el guardado',e)}

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const gridKey=(gx,gz)=>`${gx},${gz}`;
  const hAtGrid=(gx,gz)=>Number(data.heights[gridKey(gx,gz)]||0);
  function sampleHeightDelta(x,z){
    const fx=x/CELL,fz=z/CELL,x0=Math.floor(fx),z0=Math.floor(fz),tx=fx-x0,tz=fz-z0;
    const a=hAtGrid(x0,z0),b=hAtGrid(x0+1,z0),c=hAtGrid(x0,z0+1),d=hAtGrid(x0+1,z0+1);
    return (a+(b-a)*tx)*(1-tz)+(c+(d-c)*tx)*tz;
  }
  function manualBiomeAt(x,z){
    const gx=Math.round(x/CELL),gz=Math.round(z/CELL);
    return data.biomes[gridKey(gx,gz)]||null;
  }
  function pointSegDist(px,pz,ax,az,bx,bz){
    const vx=bx-ax,vz=bz-az,wx=px-ax,wz=pz-az,l2=vx*vx+vz*vz||1,t=clamp((wx*vx+wz*vz)/l2,0,1);
    const x=ax+vx*t,z=az+vz*t;
    return{d:Math.hypot(px-x,pz-z),t,x,z};
  }
  function nearestPath(x,z,type,max=80){
    let best=null;
    for(const p of data.paths){
      if(!p||p.type!==type||!Array.isArray(p.points)||p.points.length<2)continue;
      for(let i=0;i<p.points.length-1;i++){
        const a=p.points[i],b=p.points[i+1],q=pointSegDist(x,z,a.x,a.z,b.x,b.z);
        if(q.d<=max&&(!best||q.d<best.d))best={...q,path:p,index:i,width:Number(p.width)||3};
      }
    }
    return best;
  }
  function manualRiverInfo(x,z,max=50){
    const q=nearestPath(x,z,'river',max);if(!q)return null;
    const width=q.width||3.5,bank=width*3.4;
    return{...q,width,bank,waterY:baseGround(q.x,q.z)-Math.max(.5,width*.16)};
  }

  function groundY(x,z){
    let y=baseGround(x,z)+sampleHeightDelta(x,z);
    const q=manualRiverInfo(x,z,52);
    if(q){
      if(q.d<q.bank){const f=1-q.d/q.bank;y-=f*f*Math.max(.35,q.width*.12)}
      if(q.d<q.width){const f=1-q.d/q.width;y-=f*f*Math.max(.55,q.width*.18)}
    }
    return Math.round(y*20)/20;
  }
  function biomeAt(x,z){
    const manual=manualBiomeAt(x,z);
    if(manual)return manual;
    const q=manualRiverInfo(x,z,40);
    if(q){
      if(q.d<=q.width*2.3)return'fertile';
      if(q.d<=q.bank){const b=baseBiome(x,z);return b==='desert'?'steppe':b}
    }
    return baseBiome(x,z);
  }
  function roadAt(x,z){
    const q=nearestPath(x,z,'road',15);
    return baseRoad(x,z)||!!(q&&q.d<=q.width);
  }
  function riverAt(x,z){
    const q=manualRiverInfo(x,z,15);
    return baseRiverAt(x,z)||!!(q&&q.d<=q.width);
  }
  function riverBankAt(x,z,max=25){
    const q=manualRiverInfo(x,z,max);
    return baseRiverBankAt(x,z,max)||!!(q&&q.d<=q.bank);
  }
  function riverInfoAt(x,z,max=34){
    const manual=manualRiverInfo(x,z,max);
    if(manual&&manual.d<=max)return manual;
    return baseRiverInfoAt(x,z,max);
  }

  function save(){data.updatedAt=Date.now();localStorage.setItem(key,JSON.stringify(data));return data}
  function replace(next){data={...blank(),...(next||{}),heights:next?.heights||{},biomes:next?.biomes||{},paths:Array.isArray(next?.paths)?next.paths:[]};save();runtime.data=data;return data}
  function clear(){data=blank();localStorage.removeItem(key);runtime.data=data;return data}

  W.groundY=groundY;
  W.biomeAt=biomeAt;
  W.roadAt=roadAt;
  W.riverAt=riverAt;
  W.riverBankAt=riverBankAt;
  W.riverInfoAt=riverInfoAt;

  const runtime={key,CELL,data,baseGround,baseBiome,sampleHeightDelta,manualBiomeAt,nearestPath,manualRiverInfo,groundY,biomeAt,save,replace,clear,gridKey,hAtGrid};
  window.WildernessWorldEditorRuntime=runtime;

  // Development-only entry point to the editor. The public game remains playable normally.
  if(!/editor\.html$/i.test(location.pathname)){
    const addButton=()=>{
      if(document.getElementById('world-editor-button'))return;
      const b=document.createElement('button');
      b.id='world-editor-button';b.textContent='EDITOR';b.title='Abrir Wilderness World Editor';
      Object.assign(b.style,{position:'fixed',zIndex:'31',top:'48px',right:'12px',border:'1px solid #d8b97a88',borderRadius:'8px',padding:'7px',color:'#f7e4bb',background:'#1c130bcc',font:'9px ui-monospace,monospace',cursor:'pointer'});
      b.onclick=()=>{location.href='editor.html'+location.search};
      document.body.appendChild(b);
    };
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addButton);else addButton();
  }
})();
