// Wilderness 5.12.11 — safe capital spawn anchors outside real W6 gates
(()=>{
  if(window.Wilderness6SpawnSafety51210)return;
  const W=window.WildernessWorld,D=window.Wilderness6World,N=window.WildernessNations50,C=window.WildernessChooseNation51;
  if(!W||!D||!N||!C||typeof player==='undefined')return;

  // Fallback architectural anchors are relative to W6 city coordinates. The urban-access system,
  // when available, supplies the exact exterior side of each capital's main gate.
  const ANCHORS={
    judah:{city:'jerusalem',dx:-18,dz:-246,lookDx:18,lookDz:210},
    israel:{city:'samaria',dx:0,dz:-208,lookDx:0,lookDz:180},
    philistia:{city:'gaza',dx:0,dz:-205,lookDx:0,lookDz:175},
    moab:{city:'dibon',dx:0,dz:-205,lookDx:0,lookDz:175},
    edom:{city:'bozrah',dx:0,dz:-195,lookDx:0,lookDz:165},
    ammon:{city:'rabbah',dx:0,dz:-222,lookDx:0,lookDz:190},
    aram:{city:'damascus',dx:0,dz:-239,lookDx:0,lookDz:205},
    phoenicia:{city:'tyre',dx:0,dz:-184,lookDx:0,lookDz:155},
    neo_hittite:{city:'carchemish',dx:0,dz:-239,lookDx:0,lookDz:205}
  };

  function terrainSafe(x,z){
    const b=W.biomeAt?.(x,z),s=W.slopeAt?.(x,z)??0;
    return !(W.deepWaterAt?.(x,z)||W.waterAt?.(x,z)||W.riverAt?.(x,z)||b==='sea'||s>.46);
  }
  function fallback(p){
    const preferred=Math.max(90,Math.min(245,(p.radius||80)*1.08));let best=null,score=Infinity;
    for(let r=preferred;r<=preferred+70;r+=10)for(let i=0;i<32;i++){
      const a=i/32*Math.PI*2,x=p.x+Math.cos(a)*r,z=p.z+Math.sin(a)*r;if(!terrainSafe(x,z))continue;
      const q=Math.abs(r-preferred)+(W.roadAt?.(x,z)?-12:0)+(W.slopeAt?.(x,z)??0)*65;
      if(q<score){score=q;best={x,z}}
    }
    return best||{x:p.x,z:p.z};
  }
  function anchorFor(fid){
    const urban=window.Wilderness6UrbanAccess5131?.spawnAnchorFor?.(fid);
    if(urban&&terrainSafe(urban.x,urban.z))return urban;
    const a=ANCHORS[fid],city=D.getPlace?.(a?.city||N.faction(fid)?.capital);if(!city)return null;
    if(a){const x=city.x+a.dx,z=city.z+a.dz;if(terrainSafe(x,z))return{x,z,city,lookX:city.x+a.lookDx,lookZ:city.z+a.lookDz,anchored:true,outside:true};}
    const q=fallback(city);return{...q,city,lookX:city.x,lookZ:city.z,anchored:false,outside:true};
  }
  function placeAtCapital(fid=N.state?.nation,reason='spawn'){
    const a=anchorFor(fid);if(!a)return false;
    const y=W.groundY(a.x,a.z)+0.08;player.mesh.position.set(a.x,y,a.z);
    player.mesh.rotation.y=Math.atan2(a.lookX-a.x,a.lookZ-a.z);
    try{if(typeof mounted!=='undefined'&&mounted&&typeof mount!=='undefined'&&mount?.mesh){mount.mesh.position.set(a.x,y,a.z);mount.mesh.rotation.y=player.mesh.rotation.y}}catch(_){ }
    try{window.WildernessGameplay31?.lastSafe?.copy?.(player.mesh.position)}catch(_){ }
    try{if(typeof updateChunks==='function')updateChunks(true)}catch(_){ }
    try{window.Wilderness6Streaming5125?.tick?.();window.Wilderness6UrbanAccess5131?.tick?.();window.Wilderness6LifeStreaming5126?.tick?.();window.WildernessCollision45?.rebuild?.(true)}catch(_){ }
    return{f:N.faction(fid),c:N.capitalFor(fid),p:{x:a.x,z:a.z},place:a.city,reason,anchored:a.anchored,outside:!!a.outside};
  }

  // First appearance and post-death respawn use the same exterior gate approach.
  N.spawnAtCapital=()=>!!placeAtCapital(N.state?.nation,'nation-api');
  C.placeAtCapital=id=>placeAtCapital(id,'nation-selection');

  // Emergency correction if an old save or delayed terrain rebuild leaves the player below any capital surface.
  function rescueBelowCapital(){
    const fid=N.state?.nation;if(!fid)return false;const a=anchorFor(fid);if(!a)return false;
    const p=player.mesh.position,city=a.city;if(Math.hypot(p.x-city.x,p.z-city.z)>310)return false;
    const gy=W.groundY(p.x,p.z);if(p.y>=gy-0.75)return false;
    placeAtCapital(fid,'below-terrain-rescue');return true;
  }
  rescueBelowCapital();setTimeout(rescueBelowCapital,1200);

  window.Wilderness6SpawnSafety51210=Object.freeze({version:'5.12.11',ready:true,anchors:Object.freeze({...ANCHORS}),anchorFor,placeAtCapital,rescueBelowCapital});
})();