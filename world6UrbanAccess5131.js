// Wilderness 5.12.11 — walkable capitals, real gate placement and urban crowd budgets
(()=>{
  if(window.Wilderness6UrbanAccess5131)return;
  const T=window.THREE,W=window.WildernessWorld,D=window.Wilderness6World,N=window.WildernessNations50;
  if(!T||!W||!D||!N||typeof scene==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const CAPITALS={
    judah:{id:'jerusalem',r:213,group:'w6-jerusalem',custom:true},
    israel:{id:'samaria',r:178,group:'w6-samaria-dedicated',custom:true},
    philistia:{id:'gaza',r:175,group:'w6-gaza-philistia'},
    moab:{id:'dibon',r:175,group:'w6-dibon-transjordan'},
    edom:{id:'bozrah',r:165,group:'w6-bozrah-edom'},
    ammon:{id:'rabbah',r:190,group:'w6-rabbah-transjordan'},
    aram:{id:'damascus',r:205,group:'w6-damascus-aram'},
    phoenicia:{id:'tyre',r:155,group:'w6-tyre-ph'},
    neo_hittite:{id:'carchemish',r:205,group:'w6-carchemish-neo-hittite'}
  };
  const byCity=new Map(Object.entries(CAPITALS).map(([f,c])=>[c.id,{...c,faction:f}]));
  const carved=new WeakSet(),v=new T.Vector3(),sz=new T.Vector3(),bb=new T.Box3();

  function cityPoint(c){return D.getPlace?.(c.id)||null}
  function gatePoints(c){
    const p=cityPoint(c);if(!p)return[];
    if(c.id==='jerusalem'){
      const gs=window.Wilderness6Jerusalem?.gates;if(gs)return Object.values(gs).map(g=>({x:g.x,z:g.z,rot:g.rot||0}));
    }
    if(c.id==='samaria'){
      const rec=window.Wilderness6CentralCities?.built?.get?.('samaria');if(rec?.gates?.length)return rec.gates.map(g=>({x:g.x,z:g.z,rot:g.rot||0}));
    }
    const r=c.r;return[
      {x:p.x,z:p.z-r,rot:0},{x:p.x,z:p.z+r,rot:Math.PI},
      {x:p.x-r,z:p.z,rot:Math.PI/2},{x:p.x+r,z:p.z,rot:-Math.PI/2}
    ];
  }
  function mainGateForFaction(fid){
    const c=CAPITALS[fid],p=c&&cityPoint(c);if(!c||!p)return null;
    const gs=gatePoints(c);if(!gs.length)return null;
    const g=gs.reduce((a,b)=>b.z<a.z?b:a,gs[0]);
    const dx=g.x-p.x,dz=g.z-p.z,l=Math.hypot(dx,dz)||1;
    return{...g,city:p,faction:fid,outX:dx/l,outZ:dz/l};
  }
  function spawnAnchorFor(fid){
    const g=mainGateForFaction(fid);if(!g)return null;
    const offset=mobile?25:29,x=g.x+g.outX*offset,z=g.z+g.outZ*offset;
    return{x,z,city:g.city,lookX:g.city.x,lookZ:g.city.z,gate:g,anchored:true,outside:true};
  }

  // Early circular-city builders placed road targets at .9r but walls at r. On large capitals that left
  // a continuous wall/tower across the apparent gate. Remove only tall boundary meshes in each gate lane.
  function carveCapital(c){
    if(c.custom)return 0;
    const G=scene.getObjectByName(c.group);if(!G||carved.has(G))return 0;
    const p=cityPoint(c),gs=gatePoints(c);if(!p||!gs.length)return 0;
    scene.updateMatrixWorld(true);let removed=0;
    G.traverse(o=>{
      if(!o?.isMesh||o.userData?.noCollision||o.userData?.urbanAccessRemoved)return;
      o.getWorldPosition(v);const radial=Math.hypot(v.x-p.x,v.z-p.z);
      if(Math.abs(radial-c.r)>30)return;
      let near=false;for(const g of gs)if(Math.hypot(v.x-g.x,v.z-g.z)<22){near=true;break}if(!near)return;
      bb.setFromObject(o);bb.getSize(sz);if(sz.y<6)return;
      o.visible=false;o.userData.urbanAccessRemoved=true;removed++;
    });
    carved.add(G);G.userData.urbanAccessCarved=removed;return removed;
  }

  function removeLegacyJerusalemGates(){
    const st=window.WildernessDiplomacy55?.state;if(!st?.gates)return 0;let removed=0;
    for(const [id,g] of [...st.gates])if(String(g.settlementId||'').startsWith('hist-jerusalem')){
      try{g.root?.parent?.remove?.(g.root)}catch(_){ }
      st.gates.delete(id);removed++;
    }return removed;
  }
  function cityConfigFromSettlement(id){return byCity.get(String(id||'').replace(/^w6-/,'').split(':')[0])||null}
  function syncDiplomacyGates(){
    const api=window.WildernessDiplomacy55,st=api?.state;if(!st?.gates)return 0;
    let changed=removeLegacyJerusalemGates();
    for(const g of st.gates.values()){
      const c=cityConfigFromSettlement(g.settlementId);if(!c||!g.root)continue;
      const mg=mainGateForFaction(c.faction);if(!mg)continue;
      const moved=Math.hypot(g.root.position.x-mg.x,g.root.position.z-mg.z)>.5;
      g.root.position.set(mg.x,W.groundY(mg.x,mg.z),mg.z);g.root.rotation.y=mg.rot||0;
      g.root.scale.x=Math.max(g.root.scale.x||1,1.75);g.root.userData.w6UrbanGate=true;
      const rel=N.relationTo?.(c.faction)||'neutral',siege=st.sieges?.has?.(`w6-${c.id}`)||st.sieges?.has?.(g.settlementId);
      const open=!siege&&rel!=='war'&&rel!=='hostile';g.targetOpen=open?1:0;
      g.root.userData.noCollision=!!open;if(moved)changed++;
    }return changed;
  }

  function nearbyCapital(pos){
    if(!pos)return null;let best=null,bd=Infinity;
    for(const [fid,c] of Object.entries(CAPITALS)){const p=cityPoint(c);if(!p)continue;const d=Math.hypot(pos.x-p.x,pos.z-p.z);if(d<c.r+95&&d<bd){bd=d;best={fid,c,p,d}}}
    return best;
  }
  function civilianBudgetFor(pos){return nearbyCapital(pos)?(mobile?12:24):null}
  function enemyBudgetFor(pos){
    const n=nearbyCapital(pos);if(!n)return null;
    const st=window.WildernessDiplomacy55?.state,siege=st?.sieges?.has?.(`w6-${n.c.id}`);
    return siege?(mobile?30:56):(mobile?14:26);
  }
  function animalBudgetFor(pos){return nearbyCapital(pos)?(mobile?10:18):null}

  function tick(){
    try{let changed=0;for(const c of Object.values(CAPITALS))changed+=carveCapital(c);changed+=syncDiplomacyGates();if(changed)window.WildernessCollision45?.rebuild?.(true)}catch(e){console.warn('W6 urban access',e)}
  }
  tick();setInterval(tick,420);
  window.Wilderness6UrbanAccess5131=Object.freeze({version:'5.12.11',profile:mobile?'mobile':'desktop',capitals:Object.freeze(CAPITALS),gatePoints,mainGateForFaction,spawnAnchorFor,nearbyCapital,civilianBudgetFor,enemyBudgetFor,animalBudgetFor,tick});
})();
