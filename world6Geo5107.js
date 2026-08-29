// Wilderness 5.10.7 — shared real-world geography projection for Wilderness 6
(()=>{
  if(window.WildernessGeo5107)return;
  const ORIGIN={lat:31.778,lon:35.235,name:'Jerusalén'};
  const WORLD_UNITS_PER_KM=100;
  const KM_LAT=110.574;
  const KM_LON=111.320*Math.cos(ORIGIN.lat*Math.PI/180);
  const BOUNDS={minLat:24.8,maxLat:39.1,minLon:30.0,maxLon:39.4};
  function llToWorld(lat,lon){return{x:(lon-ORIGIN.lon)*KM_LON*WORLD_UNITS_PER_KM,z:(lat-ORIGIN.lat)*KM_LAT*WORLD_UNITS_PER_KM};}
  function worldToLL(x,z){return{lat:ORIGIN.lat+z/(KM_LAT*WORLD_UNITS_PER_KM),lon:ORIGIN.lon+x/(KM_LON*WORLD_UNITS_PER_KM)};}
  const W=(lat,lon,name)=>Object.assign({lat,lon,name},llToWorld(lat,lon));
  const waypoints={
    SHARON_CORRIDOR:W(32.20,34.86,'Llanura de Sharon'),
    CARMEL_PASS:W(32.60,35.08,'Paso del Carmelo'),
    HULA:W(33.10,35.62,'Valle de Hula'),
    SEA_OF_GALILEE:W(32.82,35.59,'Mar de Galilea'),
    DEAD_SEA_NORTH:W(31.78,35.47,'Norte del Mar Muerto'),
    BETH_SHEAN_FORD:W(32.50,35.55,'Vado de Bet-seán'),
    JERICHO_FORD:W(31.86,35.54,'Vado de Jericó'),
    ARABAH_NORTH:W(30.90,35.40,'Arabá norte'),
    ARWAD_MAINLAND_EMBARKATION:W(34.85,35.90,'Embarcadero de Arwad'),
    ACCO_CORRIDOR:W(32.92,35.07,'Corredor de Acco'),
    UPPER_GALILEE:W(33.05,35.45,'Alta Galilea'),
    ANTI_LEBANON_PASS:W(33.65,36.05,'Paso del Anti-Líbano'),
    BEKAA:W(33.85,35.95,'Becá'),
    LEBANON_PASS:W(33.88,35.70,'Paso del Líbano'),
    HARRAN_BOUNDARY:W(36.87,39.03,'Ruta hacia Harrán / Asiria'),
    SINAI_CENTRAL:W(30.30,33.40,'Sinaí central'),
    AQABA_NORTH:W(29.62,34.98,'Golfo de Aqaba'),
    EGYPT_DELTA_PORTS:W(31.15,31.40,'Puertos del Delta')
  };
  const landmarks={
    mount_carmel:W(32.731,35.048,'Monte Carmelo'),
    mount_gilboa:W(32.515,35.410,'Monte Gilboa'),
    mount_tabor:W(32.687,35.390,'Monte Tabor'),
    mount_hermon:W(33.416,35.857,'Monte Hermón'),
    mount_nebo:W(31.768,35.725,'Monte Nebo'),
    dead_sea:W(31.50,35.48,'Mar Muerto'),
    sea_galilee:W(32.81,35.59,'Mar de Galilea')
  };
  window.WildernessGeo5107={
    version:'5.10.7',ORIGIN,WORLD_UNITS_PER_KM,KM_LAT,KM_LON,BOUNDS,llToWorld,worldToLL,waypoints,landmarks,
    coordsUrl:'docs/WILDERNESS_6_GEOREFERENCED_COORDINATES.csv?v=5107a1',
    roadsUrl:'docs/WILDERNESS_6_MASTER_ROAD_GRAPH.csv?v=5107a1',
    physical:{
      land:'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-50m.json',
      rivers:'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_50m_rivers_lake_centerlines.geojson',
      lakes:'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_50m_lakes.geojson'
    }
  };
})();
