// Wilderness 6 — authoritative master world data layer
// Coordinates are NEVER duplicated here: they come from the approved georeferenced CSV.
(()=>{
  if(window.Wilderness6Data)return;

  const BLOCKS={
    '1':{id:1,name:'Judá · Samaria central',regions:['judah','samaria_central']},
    '2':{id:2,name:'Filistea · Sefelá · Mediterráneo',regions:['philistia','shephelah','mediterranean_south']},
    '3':{id:3,name:'Jezreel · Galilea · Alto Jordán',regions:['jezreel','galilee','upper_jordan']},
    '4':{id:4,name:'Galaad · Amón · Moab',regions:['gilead','ammon','moab','dead_sea_east']},
    '5':{id:5,name:'Edom · Arabá · Aqaba',regions:['edom','arabah','aqaba']},
    '6':{id:6,name:'Fenicia · Aram',regions:['phoenicia','aram','lebanon','anti_lebanon']},
    '7':{id:7,name:'Norte neo-hitita · Éufrates',regions:['neo_hittite_north','euphrates_frontier']},
    '8':{id:8,name:'Egipto · Sinaí · Nilo · Mar Rojo',regions:['egypt','sinai','nile','red_sea']}
  };

  const CULTURES={
    judah:{name:'Judá',family:'israelite',defaultCult:'Yahweh/Elohim'},
    israel:{name:'Israel',family:'israelite',defaultCult:'Yahweh/Elohim'},
    canaanite:{name:'Cananea',family:'canaanite',defaultCult:'Baal · Asherah/Astarté'},
    philistine:{name:'Filistea',family:'philistine',defaultCult:'Dagón'},
    ammonite:{name:'Amón',family:'transjordan',defaultCult:'Milcom'},
    moabite:{name:'Moab',family:'transjordan',defaultCult:'Quemos/Chemosh'},
    edomite:{name:'Edom',family:'transjordan',defaultCult:'Qos/Qaus'},
    phoenician:{name:'Fenicia',family:'canaanite',defaultCult:'Baal/Melqart · Astarté'},
    aramean:{name:'Aramea',family:'aram',defaultCult:'Hadad/Rimón'},
    neo_hittite:{name:'Neo-hitita',family:'anatolian_syriac',defaultCult:'cultos locales'},
    egyptian:{name:'Egipcia',family:'egyptian',defaultCult:'cultos locales egipcios'}
  };

  const CITY_META={
    // Judá / Israel
    jerusalem:{culture:'judah',controller:'judah',cult:'Yahweh/Elohim',rank:'monumental_capital',palace:true,temple:'Templo de Jerusalén'},
    bethlehem:{culture:'judah',controller:'judah',rank:'fortified_city'},tekoa:{culture:'judah',controller:'judah',rank:'regional'},beth_zur:{culture:'judah',controller:'judah',rank:'fortress'},hebron:{culture:'judah',controller:'judah',rank:'great_city'},beersheba:{culture:'judah',controller:'judah',rank:'great_city'},arad:{culture:'judah',controller:'judah',rank:'fortress'},jericho:{culture:'judah',controller:'judah',rank:'great_city'},
    gezer:{culture:'canaanite',controller:'independent_disputed',cult:'Baal · Asherah/Astarté',rank:'great_city'},
    bethel:{culture:'israel',controller:'israel',rank:'fortified_city',temple:'Santuario septentrional'},shiloh:{culture:'israel',controller:'israel',rank:'sanctuary_city',temple:'Santuario antiguo'},shechem:{culture:'israel',controller:'israel',rank:'great_city'},samaria:{culture:'israel',controller:'israel',rank:'monumental_capital',palace:true},dothan:{culture:'israel',controller:'israel',rank:'minor'},beth_shean:{culture:'israel',controller:'israel',rank:'strategic_minor'},jezreel:{culture:'israel',controller:'israel',rank:'great_city',palace:true},megiddo:{culture:'israel',controller:'israel',rank:'great_fortress'},hazor:{culture:'israel',controller:'israel',rank:'great_fortress'},dan:{culture:'israel',controller:'israel',rank:'great_city',temple:'Santuario septentrional'},ramoth_gilead:{culture:'israel',controller:'israel_frontier',rank:'frontier_fortress'},

    // Filistea
    gaza:{culture:'philistine',controller:'philistia',cult:'Dagón',rank:'great_city'},ashkelon:{culture:'philistine',controller:'philistia',cult:'Astarté',rank:'great_port'},ashdod:{culture:'philistine',controller:'philistia',cult:'Dagón',rank:'great_city'},ekron:{culture:'philistine',controller:'philistia',cult:'Baal-Zebub',rank:'great_city'},gath:{culture:'philistine',controller:'philistia',cult:'Dagón',rank:'great_fortress'},azekah:{culture:'judah',controller:'judah',rank:'fortress'},libnah:{culture:'judah',controller:'judah',rank:'fortress'},lachish:{culture:'judah',controller:'judah',rank:'great_fortress',palace:true},

    // Amón / Moab / Edom
    rabbah:{culture:'ammonite',controller:'ammon',cult:'Milcom',rank:'monumental_capital',palace:true},jazer:{culture:'ammonite',controller:'ammon',rank:'regional'},minnith:{culture:'ammonite',controller:'ammon',rank:'regional'},abel_keramim:{culture:'ammonite',controller:'ammon',rank:'regional'},heshbon:{culture:'ammonite',controller:'ammon_disputed',rank:'great_city'},
    nebo_city:{culture:'moabite',controller:'moab',cult:'Quemos/Chemosh',rank:'sanctuary_city'},medeba:{culture:'moabite',controller:'moab',rank:'great_city'},atarot:{culture:'moabite',controller:'moab',rank:'fortress'},beth_baal_meon:{culture:'moabite',controller:'moab',rank:'regional'},dibon:{culture:'moabite',controller:'moab',cult:'Quemos/Chemosh',rank:'monumental_capital',palace:true},aroer:{culture:'moabite',controller:'moab',rank:'fortress'},kir_hareseth:{culture:'moabite',controller:'moab',rank:'great_fortress'},
    bozrah:{culture:'edomite',controller:'edom',cult:'Qos/Qaus',rank:'monumental_capital',palace:true},punon_faynan:{culture:'edomite',controller:'edom',rank:'mining_district'},sela:{culture:'edomite',controller:'edom',rank:'great_fortress'},teman:{culture:'edomite',controller:'edom',rank:'great_city'},elath:{culture:'edomite',controller:'edom',rank:'great_port'},ezion_geber:{culture:'edomite',controller:'edom',rank:'port_dependency'},

    // Fenicia / Aram
    tyre:{culture:'phoenician',controller:'tyre_city_state',cult:'Melqart',rank:'monumental_capital'},sarepta:{culture:'phoenician',controller:'sidon_or_tyrian_sphere',rank:'regional'},sidon:{culture:'phoenician',controller:'sidon_city_state',cult:'Eshmun · Astarté',rank:'monumental_capital'},berytus:{culture:'phoenician',controller:'berytus_city_state',rank:'great_city'},byblos:{culture:'phoenician',controller:'byblos_city_state',cult:'Baalat Gebal',rank:'monumental_capital'},arwad:{culture:'phoenician',controller:'arwad_city_state',rank:'island_fortress'},
    beth_rehob:{culture:'aramean',controller:'aram_frontier',rank:'frontier_post'},zobah:{culture:'aramean',controller:'local_aramean',rank:'regional'},damascus:{culture:'aramean',controller:'aram_damascus',cult:'Hadad/Rimón',rank:'monumental_capital',palace:true},hamath:{culture:'aramean',controller:'hamath_state',rank:'monumental_capital'},arpad:{culture:'aramean',controller:'arpad_state',rank:'great_city'},

    // Norte neo-hitita
    aleppo:{culture:'aramean',controller:'local_north_syrian',rank:'great_city'},kinalua:{culture:'neo_hittite',controller:'assyrian_province',rank:'great_city'},samal:{culture:'neo_hittite',controller:'sam_al_state',rank:'monumental_capital'},gurgum:{culture:'neo_hittite',controller:'gurgum_state',rank:'monumental_capital'},carchemish:{culture:'neo_hittite',controller:'carchemish_state',rank:'monumental_capital'},melid:{culture:'neo_hittite',controller:'melid_state',rank:'monumental_capital'},

    // Egipto / Sinaí
    rafah:{culture:'egyptian',controller:'egyptian_border_sphere',rank:'frontier'},el_arish:{culture:'egyptian',controller:'egyptian_border_sphere',rank:'oasis'},tjaru:{culture:'egyptian',controller:'egyptian_border_sphere',rank:'fortress'},pi_ramesses:{culture:'egyptian',controller:'ruins',rank:'ancient_ruins'},tanis:{culture:'egyptian',controller:'tanis_power',cult:'Amun',rank:'monumental_capital'},bubastis:{culture:'egyptian',controller:'delta_power',cult:'Bastet',rank:'great_city'},sais:{culture:'egyptian',controller:'sais_power',cult:'Neith',rank:'monumental_capital'},heliopolis:{culture:'egyptian',controller:'local_egyptian',cult:'Ra / Atum-Ra',rank:'great_sanctuary'},memphis:{culture:'egyptian',controller:'memphis_power',cult:'Ptah · Apis',rank:'monumental_capital'},giza:{culture:'egyptian',controller:'memphis_region',rank:'monument'},saqqara:{culture:'egyptian',controller:'memphis_region',rank:'monument'},serabit:{culture:'egyptian',controller:'remote',rank:'ruins_mining'},mount_sinai:{culture:'none',controller:'none',rank:'sacred_landmark'},hermopolis:{culture:'egyptian',controller:'local_egyptian',cult:'Thoth',rank:'great_city'},abydos:{culture:'egyptian',controller:'local_egyptian',cult:'Osiris',rank:'great_sanctuary'},thebes:{culture:'egyptian',controller:'theban_kushite_influence',cult:'Amun-Ra',rank:'monumental_capital'}
  };

  const GEOGRAPHY={
    water:{
      mediterranean:{name:'Mar Mediterráneo',kind:'sea'},red_sea:{name:'Mar Rojo',kind:'sea'},gulf_suez:{name:'Golfo de Suez',kind:'gulf'},gulf_aqaba:{name:'Golfo de Aqaba',kind:'gulf'},dead_sea:{name:'Mar Muerto',kind:'lake'},sea_galilee:{name:'Mar de Galilea',kind:'lake'},
      jordan:{name:'Río Jordán',kind:'river'},nile:{name:'Río Nilo',kind:'river'},litani:{name:'Río Litani',kind:'river'},orontes:{name:'Río Orontes',kind:'river'},barada:{name:'Río Barada',kind:'river'},euphrates:{name:'Río Éufrates',kind:'river'},kishon:{name:'Río Cisón/Kishon',kind:'river'},jabbok:{name:'Jaboc/Jabbok',kind:'wadi_river'},arnon:{name:'Arnón/Wadi Mujib',kind:'wadi_river'}
    },
    relief:{
      judah_hills:'Montañas de Judá',samaria_hills:'Montañas de Samaria',carmel:'Monte Carmelo',gilboa:'Monte Gilboa',tabor:'Monte Tabor',galilee:'Montañas de Galilea',hermon:'Monte Hermón',gilead:'Galaad',moab_plateau:'Meseta de Moab',seir:'Montañas de Seír/Edom',lebanon:'Cordillera del Líbano',anti_lebanon:'Anti-Líbano',amanus:'Montes Amanus',taurus:'Tauro',sinai_massifs:'Macizos del Sinaí',nebo:'Monte Nebo'
    },
    regions:['Jezreel','Sharon','Sefelá','Valle del Jordán','Desierto de Judea','Néguev','Arabá','Valle de Elá','Galaad','Bashán','Becá','Hula','Delta del Nilo','Sinaí']
  };

  let readyPromise=null;

  function csvRows(text){
    const lines=String(text||'').trim().split(/\r?\n/);if(lines.length<2)return[];
    const headers=lines.shift().split(',');
    return lines.filter(Boolean).map(line=>{const p=line.split(','),o={};headers.forEach((h,i)=>o[h]=p[i]??'');return o;});
  }

  function parsePlace(r){
    const meta=CITY_META[r.id]||{};
    const firstBlock=String(r.block||'').split('-')[0];
    const culture=meta.culture||null;
    return Object.freeze({
      id:r.id,name:r.name,block:r.block,blockInfo:BLOCKS[firstBlock]||null,type:r.type,
      lat:+r.lat,lon:+r.lon,x:+r.x,z:+r.z,radius:+r.radius||0,precision:r.precision,
      culture,cultureInfo:culture?CULTURES[culture]||null:null,
      controller:meta.controller||null,cult:meta.cult||(culture&&CULTURES[culture]?.defaultCult)||null,
      rank:meta.rank||r.type,palace:!!meta.palace,temple:meta.temple||null
    });
  }

  async function load(){
    if(readyPromise)return readyPromise;
    readyPromise=(async()=>{
      const geo=window.WildernessGeo5107;
      if(!geo)throw new Error('WildernessGeo5107 debe cargarse antes de world6-data.js');
      const [coordText,roadText]=await Promise.all([
        fetch(geo.coordsUrl,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('No se pudieron cargar coordenadas W6');return r.text();}),
        fetch(geo.roadsUrl,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('No se pudieron cargar rutas W6');return r.text();})
      ]);
      const places=csvRows(coordText).map(parsePlace);
      const byId=new Map(places.map(p=>[p.id,p]));
      const routeRows=csvRows(roadText);
      const routeMap=new Map();
      for(const rr of routeRows){
        if(!routeMap.has(rr.route_id))routeMap.set(rr.route_id,{id:rr.route_id,name:rr.route_name,mode:rr.mode,nodes:[]});
        routeMap.get(rr.route_id).nodes.push({sequence:+rr.sequence,node:rr.node,mode:rr.mode,notes:rr.notes||''});
      }
      const routes=[...routeMap.values()].map(r=>Object.freeze({...r,nodes:Object.freeze(r.nodes.sort((a,b)=>a.sequence-b.sequence).map(n=>Object.freeze({...n,point:byId.get(n.node)||geo.waypoints[n.node]||null})))}));
      const byBlock={};for(const p of places){for(const b of String(p.block).split('-'))(byBlock[b]||(byBlock[b]=[])).push(p);}
      const byCulture={};for(const p of places){if(p.culture)(byCulture[p.culture]||(byCulture[p.culture]=[])).push(p);}
      const data={
        version:'6.0-data-v1',dateBase:'ca. 734–732 BCE',projection:geo,
        blocks:BLOCKS,cultures:CULTURES,geography:GEOGRAPHY,
        places:Object.freeze(places),byId,byBlock,byCulture,routes:Object.freeze(routes),
        getPlace:id=>byId.get(id)||null,
        route:id=>routes.find(r=>r.id===id)||null,
        nearest(x,z,max=Infinity){let best=null,d2=max*max;for(const p of places){const q=(p.x-x)**2+(p.z-z)**2;if(q<d2){d2=q;best=p;}}return best?{place:best,distance:Math.sqrt(d2)}:null;},
        toWorld:(lat,lon)=>geo.llToWorld(lat,lon),toLatLon:(x,z)=>geo.worldToLL(x,z)
      };
      window.Wilderness6World=data;
      return data;
    })();
    return readyPromise;
  }

  window.Wilderness6Data={version:'6.0-data-v1',BLOCKS,CULTURES,CITY_META,GEOGRAPHY,load,get ready(){return readyPromise;}};
})();
