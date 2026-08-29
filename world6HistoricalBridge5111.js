// Wilderness 5.11.1 — historical settlements + master-road bridge
// Makes the legacy chunk renderer consume ONLY georeferenced W6 historical settlements and approved roads.
(()=>{
  if(window.Wilderness6HistoricalBridge)return;
  const W=window.WildernessWorld,D=window.Wilderness6World,G=window.WildernessGeo5107;
  if(!W||!D||!G){console.warn('W6 historical bridge: master data unavailable');return;}

  const legacy={settlementsNearBounds:W.settlementsNearBounds,settlementDef:W.settlementDef,roadAt:W.roadAt};
  const cityTypes=new Set(['city','settlement','fortress','port','oasis_settlement']);
  const rankTier={monumental_capital:3,great_city:3,great_port:3,great_fortress:3,island_fortress:3,frontier_fortress:2,fortress:2,strategic_minor:2,sanctuary_city:2,regional:1,minor:1,frontier:1,oasis:1,port_dependency:1};
  const rankPop={monumental_capital:220,great_city:160,great_port:150,great_fortress:130,island_fortress:115,frontier_fortress:95,fortress:85,strategic_minor:65,sanctuary_city:70,regional:55,minor:32,frontier:38,oasis:34,port_dependency:35};
  const rankDef={monumental_capital:22,great_city:16,great_port:14,great_fortress:22,island_fortress:20,frontier_fortress:18,fortress:15,strategic_minor:10,sanctuary_city:9,regional:8,minor:5,frontier:8,oasis:4,port_dependency:5};

  const historical=D.places.filter(p=>cityTypes.has(p.type)).map(p=>Object.freeze({
    id:`w6-${p.id}`,w6id:p.id,name:p.name,type:(p.type==='settlement'||p.type==='oasis_settlement')?'village':'city',
    x:p.x,z:p.z,tier:rankTier[p.rank]||2,population:rankPop[p.rank]||80,defenders:rankDef[p.rank]||10,
    historical:true,block:p.block,culture:p.culture,controller:p.controller,cult:p.cult,rank:p.rank,radius:p.radius
  }));
  const defById=new Map(historical.map(d=>[d.id,d]));

  W.settlementsNearBounds=(minX,maxX,minZ,maxZ,margin=20)=>historical.filter(s=>
    s.x>=minX-margin&&s.x<=maxX+margin&&s.z>=minZ-margin&&s.z<=maxZ+margin
  );
  W.settlementDef=(a,b)=>{
    if(typeof a==='string')return defById.get(a)||null;
    return null;
  };

  // Flatten approved master routes into physical line segments. Ferries/sea legs are excluded from road tiles.
  const segments=[];
  for(const r of D.routes){
    let prev=null;
    for(const n of r.nodes){
      const p=n.point;
      if(!p){prev=null;continue;}
      if(prev&&prev.mode!=='sea'&&prev.mode!=='ferry'&&n.mode!=='sea'&&n.mode!=='ferry')segments.push({
        routeId:r.id,routeName:r.name,ax:prev.point.x,az:prev.point.z,bx:p.x,bz:p.z,mode:n.mode||r.mode||'road'
      });
      prev={point:p,mode:n.mode||r.mode||'road'};
    }
  }

  // Spatial index keeps roadAt cheap on mobile despite the continent-scale graph.
  const CELL=1200,index=new Map();
  const cellKey=(x,z)=>`${Math.floor(x/CELL)},${Math.floor(z/CELL)}`;
  for(const s of segments){
    const minX=Math.min(s.ax,s.bx)-8,maxX=Math.max(s.ax,s.bx)+8,minZ=Math.min(s.az,s.bz)-8,maxZ=Math.max(s.az,s.bz)+8;
    for(let cx=Math.floor(minX/CELL);cx<=Math.floor(maxX/CELL);cx++)for(let cz=Math.floor(minZ/CELL);cz<=Math.floor(maxZ/CELL);cz++){
      const k=`${cx},${cz}`;(index.get(k)||index.set(k,[]).get(k)).push(s);
    }
  }
  function pointSegDist(px,pz,s){
    const vx=s.bx-s.ax,vz=s.bz-s.az,wx=px-s.ax,wz=pz-s.az,d=vx*vx+vz*vz||1,t=Math.max(0,Math.min(1,(wx*vx+wz*vz)/d));
    return Math.hypot(px-(s.ax+vx*t),pz-(s.az+vz*t));
  }
  W.roadAt=(x,z)=>{
    const list=index.get(cellKey(x,z));if(!list)return false;
    for(const s of list){const width=s.mode==='trail'?2.1:3.0;if(pointSegDist(x,z,s)<width)return true;}
    return false;
  };

  // Remove visible legacy procedural settlement architecture. Runtime NPC cleanup is deliberately deferred;
  // this avoids unsafe mutations of combat arrays while making all NEW settlement generation historical-only.
  let hiddenLegacy=0;
  try{
    if(typeof generatedSettlements!=='undefined')for(const [id,r] of generatedSettlements){
      if(!String(id).startsWith('w6-')&&r?.group){r.group.visible=false;hiddenLegacy++;}
    }
  }catch(e){console.warn('W6 historical bridge legacy hide',e);}

  window.Wilderness6HistoricalBridge=Object.freeze({version:'5.11.1',active:true,historical,defById,segments,index,legacy,hiddenLegacy});
})();