// Wilderness 5.11.0 — bridge georeferenced W6 physical sampler into the live chunk renderer
// Loaded late, after Wilderness6Physical exists. Does not touch engine04.js.
(()=>{
  if(window.Wilderness6TerrainBridge)return;
  const W=window.WildernessWorld,P=window.Wilderness6Physical;
  if(!W||!P){console.warn('W6 terrain bridge: world/physical sampler unavailable');return;}

  const legacy={groundY:W.groundY,biomeAt:W.biomeAt,terrainFeatureAt:W.terrainFeatureAt};
  const biomeMap={
    water:'rocky',nile_fertile:'fertile',delta_fertile:'fertile',egypt_desert:'desert',
    sinai_mountain:'rocky',sinai_desert:'desert',negev_desert:'desert',arabah_desert:'desert',
    judean_rocky:'rocky',judean_desert:'desert',mediterranean_steppe:'steppe',
    jezreel_fertile:'fertile',jordan_valley:'fertile',galilee_highland:'rocky',galilee_fertile:'fertile',
    cedar_highland:'fertile',phoenician_mediterranean:'fertile',lebanon_mountain:'rocky',bekaa_steppe:'steppe',
    gilead_highland:'fertile',transjordan_steppe:'steppe',moab_rocky:'rocky',moab_steppe:'steppe',
    edom_mountain:'rocky',edom_steppe:'steppe',syrian_highland:'rocky',syrian_steppe:'steppe',
    anatolian_highland:'rocky',north_syrian_steppe:'steppe',fertile:'fertile',steppe:'steppe',desert:'desert',rocky:'rocky'
  };
  const sample=(x,z)=>P.sample(x,z);
  W.groundY=(x,z)=>sample(x,z).elevation;
  W.biomeAt=(x,z)=>biomeMap[sample(x,z).biome]||'steppe';
  W.terrainFeatureAt=(x,z)=>{
    const s=sample(x,z);if(s.water)return s.water.kind==='river'?'ravine':'normal';
    const b=biomeMap[s.biome];if(b==='rocky'&&s.elevation>12)return'mountain';return'normal';
  };

  // Existing chunks were generated with the legacy terrain. Remove only chunk meshes so updateChunks
  // rebuilds the visible area with W6 elevations; settlements/actors remain managed by legacy systems for now.
  try{
    if(typeof chunks!=='undefined'&&chunks&&typeof scene!=='undefined'){
      for(const [,g] of [...chunks])scene.remove(g);chunks.clear();
    }
    if(typeof updateChunks==='function')updateChunks(true);
    if(typeof player!=='undefined'&&player?.mesh){
      player.mesh.position.y=W.groundY(player.mesh.position.x,player.mesh.position.z);
    }
  }catch(e){console.warn('W6 terrain bridge refresh',e);}

  window.Wilderness6TerrainBridge=Object.freeze({version:'5.11.0',active:true,legacy,sample,biomeMap});
})();