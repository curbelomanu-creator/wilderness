// Wilderness 5.12.10 — safe capital spawn anchors tied to W6 city layouts
(()=>{
  if(window.Wilderness6SpawnSafety51210)return;
  const W=window.WildernessWorld,D=window.Wilderness6World,N=window.WildernessNations50,C=window.WildernessChooseNation51;
  if(!W||!D||!N||!C||typeof player==='undefined')return;

  // Architectural spawn anchors are RELATIVE to the authoritative W6 city coordinate.
  // Jerusalem uses the protected road immediately inside the southern gate, never a house/Temple footprint.
  const ANCHORS={
    judah:{city:'jerusalem',dx:-18,dz:-188,lookDx:18,lookDz:176},
    israel:{city:'samaria',dx:0,dz:-34,lookDx:0,lookDz:34},
    philistia:{city:'gaza',dx:0,dz:-34,lookDx:0,lookDz:34},
    moab:{city:'dibon',dx:0,dz:-32,lookDx:0,lookDz:32},
    edom:{city:'bozrah',dx:0,dz:-34,lookDx:0,lookDz:34},
    ammon:{city:'rabbah',dx:0,dz:-34,lookDx:0,lookDz:34},
    aram:{city:'damascus',dx:0,dz:-38,lookDx:0,lookDz:38},
    phoenicia:{city:'tyre',dx:0,dz:-32,lookDx:0,lookDz:32},
    neo_hittite:{city:'carchemish',dx:0,dz:-38,lookDx:0,lookDz:38}
  };

  function terrainSafe(x,z){
    const b=W.biomeAt?.(x,z),s=W.slopeAt?.(x,z)??0;
    return !(W.deepWaterAt?.(x,z)||W.waterAt?.(x,z)||W.riverAt?.(x,z)||b==='sea'||s>.46);
  }
  function fallback(p){
    const preferred=Math.max(24,Math.min(54,(p.radius||80)*.28));let best=null,score=Infinity;
    for(let r=preferred;r<=preferred+45;r+=9)for(let i=0;i<24;i++){
      const a=i/24*Math.PI*2,x=p.x+Math.cos(a)*r,z=p.z+Math.sin(a)*r;if(!terrainSafe(x,z))continue;
      const q=Math.abs(r-preferred)+(W.roadAt?.(x,z)?-9:0)+(W.slopeAt?.(x,z)??0)*60;
      if(q<score){score=q;best={x,z}}
    }
    return best||{x:p.x,z:p.z};
  }
  function anchorFor(fid){
    const a=ANCHORS[fid],city=D.getPlace?.(a?.city||N.faction(fid)?.capital);if(!city)return null;
    if(a){const x=city.x+a.dx,z=city.z+a.dz;if(terrainSafe(x,z))return{x,z,city,lookX:city.x+a.lookDx,lookZ:city.z+a.lookDz,anchored:true};}
    const q=fallback(city);return{...q,city,lookX:city.x,lookZ:city.z,anchored:false};
  }
  function placeAtCapital(fid=N.state?.nation,reason='spawn'){
    const a=anchorFor(fid);if(!a)return false;
    const y=W.groundY(a.x,a.z)+0.06;player.mesh.position.set(a.x,y,a.z);
    player.mesh.rotation.y=Math.atan2(a.lookX-a.x,a.lookZ-a.z);
    try{if(typeof mounted!=='undefined'&&mounted&&typeof mount!=='undefined'&&mount?.mesh){mount.mesh.position.set(a.x,y,a.z);mount.mesh.rotation.y=player.mesh.rotation.y}}catch(_){ }
    try{window.WildernessGameplay31?.lastSafe?.copy?.(player.mesh.position)}catch(_){ }
    try{if(typeof updateChunks==='function')updateChunks(true)}catch(_){ }
    try{window.Wilderness6Streaming5125?.tick?.();window.Wilderness6LifeStreaming5126?.tick?.()}catch(_){ }
    return{f:N.faction(fid),c:N.capitalFor(fid),p:{x:a.x,z:a.z},place:a.city,reason,anchored:a.anchored};
  }

  // Both first appearance and post-death respawn use exactly the same W6-safe anchor.
  N.spawnAtCapital=()=>!!placeAtCapital(N.state?.nation,'nation-api');
  C.placeAtCapital=id=>placeAtCapital(id,'nation-selection');

  // Emergency correction only when the current player is physically below Jerusalem terrain.
  function rescueBelowJerusalem(){
    if(N.state?.nation!=='judah')return false;const j=D.getPlace?.('jerusalem');if(!j)return false;
    const p=player.mesh.position;if(Math.hypot(p.x-j.x,p.z-j.z)>260)return false;
    const gy=W.groundY(p.x,p.z);if(p.y>=gy-0.75)return false;
    placeAtCapital('judah','below-terrain-rescue');return true;
  }
  rescueBelowJerusalem();
  setTimeout(rescueBelowJerusalem,1200);

  window.Wilderness6SpawnSafety51210=Object.freeze({version:'5.12.10',ready:true,anchors:Object.freeze({...ANCHORS}),anchorFor,placeAtCapital,rescueBelowJerusalem});
})();
