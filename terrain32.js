// Wilderness 3.2 - continuous terrain / biome fix
(()=>{
  const W=window.WildernessWorld;
  if(!W)return;
  const oldRoad=W.roadAt;
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function smoothGround(x,z){
    // Large, continuous landforms. No vertical quantization: neighboring tiles stay connected.
    const broad=(W.valueNoise(x,z,260,3201)-.5)*7.0;
    const rolling=(W.valueNoise(x,z,120,3202)-.5)*4.2;
    const mountainMask=Math.pow(clamp((W.valueNoise(x,z,360,3203)-.57)/.43,0,1),1.65);
    const ridge=Math.pow(Math.abs(W.valueNoise(x,z,115,3204)-.5)*2,1.7);
    const mountains=mountainMask*(8+ridge*21);
    const gorgeMask=Math.pow(clamp((W.valueNoise(x,z,300,3205)-.61)/.39,0,1),1.5);
    const gorgeLine=Math.abs(W.valueNoise(x,z,92,3206)-.5)*2;
    const gorge=gorgeMask*Math.pow(clamp((.28-gorgeLine)/.28,0,1),1.8)*11;
    let y=broad+rolling+mountains-gorge-1.2;
    // Roads should remain traversable and visually seated in the landscape.
    if(oldRoad&&oldRoad(x,z))y*=.78;
    return Math.round(y*20)/20;
  }
  function biome(x,z){
    const y=smoothGround(x,z);
    const moisture=W.valueNoise(x,z,240,3210)*.7+W.valueNoise(x,z,110,3211)*.3;
    const mountain=W.valueNoise(x,z,360,3203);
    const gorgeLine=Math.abs(W.valueNoise(x,z,92,3206)-.5)*2;
    if(y>8.5||mountain>.70)return 'rocky';
    if(gorgeLine<.10&&y>1.5)return 'rocky';
    if(moisture>.68)return 'fertile';
    if(moisture>.52)return 'steppe';
    return 'desert';
  }
  W.groundY=smoothGround;
  W.biomeAt=biome;
  window.WildernessTerrain32={groundY:smoothGround,biomeAt:biome};
})();