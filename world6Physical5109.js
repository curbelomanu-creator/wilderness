// Wilderness 5.10.9 — georeferenced physical-world sampler for Wilderness 6
// This layer is intentionally independent from the legacy terrain renderer.
// It provides one authoritative synchronous sampler for future chunk generation.
(()=>{
  if(window.Wilderness6Physical)return;

  const G=window.WildernessGeo5107;
  if(!G){console.warn('W6 physical: WildernessGeo5107 is required');return;}

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t)};
  const lerp=(a,b,t)=>a+(b-a)*t;
  const km=(aLat,aLon,bLat,bLon)=>{
    const dy=(bLat-aLat)*G.KM_LAT;
    const dx=(bLon-aLon)*G.KM_LON;
    return Math.hypot(dx,dy);
  };
  function pointSegKm(lat,lon,aLat,aLon,bLat,bLon){
    const px=(lon-aLon)*G.KM_LON,pz=(lat-aLat)*G.KM_LAT;
    const vx=(bLon-aLon)*G.KM_LON,vz=(bLat-aLat)*G.KM_LAT;
    const d=vx*vx+vz*vz||1,t=clamp((px*vx+pz*vz)/d,0,1);
    return Math.hypot(px-vx*t,pz-vz*t);
  }
  function polylineDistanceKm(lat,lon,line){
    let d=Infinity;
    for(let i=1;i<line.length;i++)d=Math.min(d,pointSegKm(lat,lon,line[i-1][0],line[i-1][1],line[i][0],line[i][1]));
    return d;
  }
  function gaussianLine(lat,lon,line,widthKm,height){
    const d=polylineDistanceKm(lat,lon,line);
    return height*Math.exp(-(d*d)/(2*widthKm*widthKm));
  }
  function gaussianPoint(lat,lon,pLat,pLon,widthKm,height){
    const d=km(lat,lon,pLat,pLon);
    return height*Math.exp(-(d*d)/(2*widthKm*widthKm));
  }

  // Simplified real-world centerlines. Points are lat/lon and remain shared by map/terrain consumers.
  const RIVERS={
    jordan:[[33.25,35.65],[33.10,35.62],[32.89,35.62],[32.82,35.59],[32.70,35.57],[32.50,35.55],[32.20,35.56],[31.87,35.54],[31.76,35.55]],
    nile:[[25.72,32.66],[26.18,31.92],[27.78,30.80],[28.10,30.75],[29.10,30.75],[29.85,31.25],[30.15,31.20],[30.45,31.10],[30.80,31.00],[31.15,31.10]],
    euphrates:[[38.40,38.35],[37.90,38.30],[37.30,38.15],[36.83,38.01],[36.60,38.10]],
    orontes:[[34.20,36.30],[34.70,36.45],[35.13,36.76],[35.60,36.70],[36.15,36.35]],
    litani:[[33.85,35.85],[33.55,35.55],[33.30,35.30]],
    barada:[[33.62,36.05],[33.55,36.18],[33.51,36.28],[33.49,36.40]],
    kishon:[[32.60,35.18],[32.67,35.10],[32.79,35.04]],
    jabbok:[[32.20,35.55],[32.18,35.75],[32.18,35.95]],
    arnon:[[31.43,35.57],[31.43,35.72],[31.42,35.82]]
  };

  const RIDGES={
    judah:[[31.20,35.10],[31.55,35.10],[31.78,35.22],[32.05,35.25]],
    samaria:[[32.00,35.25],[32.30,35.22],[32.55,35.20]],
    galilee:[[32.70,35.35],[33.05,35.45],[33.30,35.55]],
    gilead:[[31.90,35.75],[32.30,35.80],[32.75,35.85]],
    moab:[[31.10,35.65],[31.45,35.75],[31.85,35.80]],
    seir:[[29.70,35.15],[30.20,35.35],[30.80,35.55],[31.20,35.65]],
    lebanon:[[33.45,35.55],[34.10,35.75],[34.75,36.00]],
    antiLebanon:[[33.35,36.10],[33.95,36.25],[34.50,36.35]],
    amanus:[[36.10,36.20],[36.65,36.25],[37.20,36.40]],
    taurus:[[37.20,36.70],[37.70,37.20],[38.30,38.00]],
    sinai:[[28.45,33.85],[28.80,33.70],[29.20,33.45]]
  };

  const WATER_LEVELS={mediterranean:0,red_sea:0,gulf_suez:0,gulf_aqaba:0,sea_galilee:-5,dead_sea:-12};

  function legacyNoise(x,z,scale,salt){
    const W=window.WildernessWorld;
    return W&&W.valueNoise?W.valueNoise(x,z,scale,salt):.5;
  }

  function regionalBase(lat,lon){
    // Values are gameplay elevation units, not metres.
    let y=1.0;
    if(lat<31.2&&lon<34.7)y-=.8; // Sinai coastal/central desert
    if(lat<29.8&&lon>34.7&&lon<35.6)y+=1.5; // Aqaba/Arabah escarpments
    if(lon>35.35&&lat>31.0&&lat<33.0)y+=2.2; // Transjordan plateau
    if(lat>33.0&&lon>35.4)y+=1.5; // Lebanon/Syria uplands
    if(lat<30.2&&lon<33.5)y-=.6; // Nile desert margins
    return y;
  }

  function riverValleyCut(lat,lon){
    let cut=0;
    const j=polylineDistanceKm(lat,lon,RIVERS.jordan); if(j<18)cut+=lerp(8,0,smooth(j/18));
    const n=polylineDistanceKm(lat,lon,RIVERS.nile); if(n<22)cut+=lerp(5,0,smooth(n/22));
    const e=polylineDistanceKm(lat,lon,RIVERS.euphrates); if(e<16)cut+=lerp(3,0,smooth(e/16));
    const o=polylineDistanceKm(lat,lon,RIVERS.orontes); if(o<12)cut+=lerp(2.5,0,smooth(o/12));
    const a=polylineDistanceKm(lat,lon,RIVERS.arnon); if(a<8)cut+=lerp(8,0,smooth(a/8));
    const jb=polylineDistanceKm(lat,lon,RIVERS.jabbok); if(jb<8)cut+=lerp(5,0,smooth(jb/8));
    return cut;
  }

  function reliefHeight(lat,lon,x,z){
    let y=regionalBase(lat,lon);
    y+=gaussianLine(lat,lon,RIDGES.judah,18,11);
    y+=gaussianLine(lat,lon,RIDGES.samaria,20,11);
    y+=gaussianLine(lat,lon,RIDGES.galilee,23,12);
    y+=gaussianLine(lat,lon,RIDGES.gilead,25,12);
    y+=gaussianLine(lat,lon,RIDGES.moab,23,12);
    y+=gaussianLine(lat,lon,RIDGES.seir,20,17);
    y+=gaussianLine(lat,lon,RIDGES.lebanon,22,24);
    y+=gaussianLine(lat,lon,RIDGES.antiLebanon,22,22);
    y+=gaussianLine(lat,lon,RIDGES.amanus,24,18);
    y+=gaussianLine(lat,lon,RIDGES.taurus,30,22);
    y+=gaussianLine(lat,lon,RIDGES.sinai,24,20);
    y+=gaussianPoint(lat,lon,33.416,35.857,18,15); // Hermon
    y+=gaussianPoint(lat,lon,32.731,35.048,8,7);   // Carmel
    y+=gaussianPoint(lat,lon,32.515,35.410,7,6);   // Gilboa
    y+=gaussianPoint(lat,lon,32.687,35.390,6,5);   // Tabor
    y-=riverValleyCut(lat,lon);

    // Real geographic depressions.
    y-=gaussianLine(lat,lon,[[32.82,35.58],[32.20,35.56],[31.75,35.55]],16,9);
    y-=gaussianPoint(lat,lon,31.50,35.48,24,8); // Dead Sea basin
    y-=gaussianLine(lat,lon,[[30.90,35.40],[30.30,35.25],[29.60,35.00]],20,6); // Arabah

    // Low-amplitude procedural microrelief only; geography controls the macro form.
    y+=(legacyNoise(x,z,420,6101)-.5)*2.4;
    y+=(legacyNoise(x,z,150,6102)-.5)*1.3;
    return Math.round(y*20)/20;
  }

  function distanceToRiver(lat,lon){
    let best=Infinity,id=null;
    for(const [k,line] of Object.entries(RIVERS)){
      const d=polylineDistanceKm(lat,lon,line);if(d<best){best=d;id=k;}
    }
    return{distanceKm:best,id};
  }

  function waterAtLL(lat,lon){
    // Inland water bodies are deterministic. Ocean/sea land mask is loaded separately by the map layer;
    // for gameplay chunks the Mediterranean/Red Sea coastline will be injected by the coast mesh stage.
    const gal=Math.sqrt(Math.pow((lat-32.81)/.12,2)+Math.pow((lon-35.59)/.055,2));
    if(gal<=1)return{kind:'lake',id:'sea_galilee',level:WATER_LEVELS.sea_galilee};
    const dead=Math.sqrt(Math.pow((lat-31.50)/.43,2)+Math.pow((lon-35.48)/.075,2));
    if(dead<=1)return{kind:'lake',id:'dead_sea',level:WATER_LEVELS.dead_sea};
    const r=distanceToRiver(lat,lon);
    const widths={jordan:.45,nile:1.5,euphrates:1.2,orontes:.6,litani:.35,barada:.3,kishon:.3,jabbok:.25,arnon:.2};
    if(r.id&&r.distanceKm<(widths[r.id]||.25))return{kind:'river',id:r.id,level:null};
    return null;
  }

  function biomeAtLL(lat,lon,x=0,z=0,elevation=null){
    const y=elevation==null?reliefHeight(lat,lon,x,z):elevation;
    const r=distanceToRiver(lat,lon);

    // Nile valley and Delta.
    if(lon>30.2&&lon<32.8&&lat<31.4){
      if(r.id==='nile'&&r.distanceKm<12)return 'nile_fertile';
      if(lat>30.2&&lon<32.2)return 'delta_fertile';
      return 'egypt_desert';
    }
    // Sinai / Negev / Arabah.
    if(lat<31.4&&lon<34.7)return y>12?'sinai_mountain':'sinai_desert';
    if(lat<31.4&&lon>=34.7&&lon<35.45)return y>11?'rocky':'negev_desert';
    if(lat<31.2&&lon>=35.1&&lon<35.7)return 'arabah_desert';
    // Judean desert east of ridge.
    if(lat>31.2&&lat<32.1&&lon>35.30&&lon<35.62)return y>8?'judean_rocky':'judean_desert';
    // Coastal Levant / Philistia / Sharon.
    if(lat>31.2&&lat<33.3&&lon<35.2)return 'mediterranean_steppe';
    // Jezreel / Jordan / Galilee.
    if(lat>32.3&&lat<32.75&&lon>35.1&&lon<35.65)return 'jezreel_fertile';
    if(r.id==='jordan'&&r.distanceKm<10)return 'jordan_valley';
    if(lat>32.65&&lat<33.35&&lon>35.2&&lon<35.75)return y>12?'galilee_highland':'galilee_fertile';
    // Phoenicia / Lebanon.
    if(lat>33.1&&lon<35.7)return y>13?'cedar_highland':'phoenician_mediterranean';
    if(lat>33.1&&lat<35.2&&lon>=35.7&&lon<36.4)return y>15?'lebanon_mountain':'bekaa_steppe';
    // Transjordan.
    if(lon>35.6&&lat>31.7&&lat<33.2)return y>12?'gilead_highland':'transjordan_steppe';
    if(lon>35.55&&lat>31.0&&lat<=31.7)return y>13?'moab_rocky':'moab_steppe';
    if(lat<31.1&&lon>35.3&&lon<36.0)return y>13?'edom_mountain':'edom_steppe';
    // Syria / northern states.
    if(lat>33.0&&lon>36.0&&lat<36.8)return y>14?'syrian_highland':'syrian_steppe';
    if(lat>=36.8)return y>15?'anatolian_highland':'north_syrian_steppe';

    const moisture=legacyNoise(x,z,500,6110)*.65+legacyNoise(x,z,180,6111)*.35;
    if(y>15)return 'rocky';
    if(moisture>.62)return 'fertile';
    if(moisture>.43)return 'steppe';
    return 'desert';
  }

  function sample(x,z){
    const ll=G.worldToLL(x,z);
    const water=waterAtLL(ll.lat,ll.lon);
    const elevation=water&&water.level!=null?water.level:reliefHeight(ll.lat,ll.lon,x,z);
    const biome=water?'water':biomeAtLL(ll.lat,ll.lon,x,z,elevation);
    const river=distanceToRiver(ll.lat,ll.lon);
    return Object.freeze({x,z,lat:ll.lat,lon:ll.lon,elevation,biome,water,nearestRiver:river});
  }

  function regionAt(x,z){
    const s=sample(x,z),{lat,lon}=s;
    if(lat<31.4&&lon<34.7)return 'sinai_egypt';
    if(lat<31.4&&lon>=34.7&&lon<35.45)return 'negev';
    if(lat<31.2&&lon>=35.1&&lon<35.7)return 'arabah';
    if(lat<32.1&&lon<35.3)return 'judah_philistia';
    if(lat<32.8&&lon<35.5)return 'samaria_jezreel';
    if(lat<33.4&&lon<35.8)return 'galilee_jordan';
    if(lat<33.3&&lon>=35.6)return 'transjordan';
    if(lat<35.2&&lon<36.3)return 'phoenicia_lebanon_aram';
    if(lat<36.8)return 'north_syria';
    return 'neo_hittite_euphrates';
  }

  const API={
    version:'5.10.9',RIVERS,RIDGES,WATER_LEVELS,
    sample,regionAt,reliefHeight,biomeAtLL,waterAtLL,distanceToRiver,polylineDistanceKm,
    note:'Macro-relief is geographically anchored; elevation is a gameplay simplification, not a DEM.'
  };
  window.Wilderness6Physical=Object.freeze(API);
  window.dispatchEvent(new CustomEvent('wilderness6physicalready',{detail:API}));
})();
