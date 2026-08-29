// Wilderness 5.0 - nations, rulers, capitals, relations and persistent player identity
(()=>{
const W=window.WildernessWorld;if(!W)return;
const KEY=`wilderness50:${W.seedToken}`;
const FACTIONS={
  israel:{id:'israel',label:'ISRAEL',display:'Reino de Israel',capital:'samaria',king:'Pécaj',color:0x456b78,spawn:{x:20,z:520},cities:[
    {id:'samaria',name:'Samaria',x:20,z:520,capital:true,tier:3},
    {id:'betel',name:'Betel',x:35,z:185,tier:2},{id:'shechem',name:'Siquem',x:40,z:385,tier:2},{id:'jezreel',name:'Jezreel',x:105,z:570,tier:2},
    {id:'megiddo',name:'Megido',x:-55,z:650,tier:2},{id:'hazor',name:'Hazor',x:85,z:845,tier:2},{id:'dan',name:'Dan',x:105,z:990,tier:2},{id:'tirzah',name:'Tirsa',x:95,z:420,tier:1}
  ]},
  judah:{id:'judah',label:'JUDÁ',display:'Reino de Judá',capital:'jerusalem',king:'Acaz',color:0x8a6a42,spawn:{x:0,z:0},cities:[
    {id:'jerusalem',name:'Jerusalén',x:0,z:0,capital:true,tier:4,special:'jerusalem',scale:4,surroundings:['olive','palm']},
    {id:'jericho',name:'Jericó',x:145,z:35,tier:2},{id:'hebron',name:'Hebrón',x:-15,z:-155,tier:2},{id:'bethlehem',name:'Belén',x:-8,z:-55,tier:1},
    {id:'lachish',name:'Laquis',x:-175,z:-120,tier:2},{id:'beersheba',name:'Beerseba',x:-10,z:-330,tier:2},{id:'arad',name:'Arad',x:100,z:-305,tier:1},
    {id:'tekoa',name:'Tecoa',x:35,z:-95,tier:1},{id:'bethzur',name:'Bet-sur',x:-5,z:-115,tier:1},{id:'azekah',name:'Azecá',x:-135,z:-70,tier:1},{id:'libnah',name:'Libná',x:-165,z:-165,tier:1}
  ]},
  philistia:{id:'philistia',label:'FILISTEA',display:'Filistea',capital:'gaza',king:'Hanunu de Gaza',color:0x78525b,spawn:{x:-430,z:-220},cities:[
    {id:'gaza',name:'Gaza',x:-430,z:-220,capital:true,tier:3},{id:'ashkelon',name:'Ascalón',x:-405,z:-105,tier:3},{id:'ashdod',name:'Asdod',x:-365,z:25,tier:3},
    {id:'ekron',name:'Ecrón',x:-285,z:65,tier:3},{id:'gath',name:'Gat',x:-245,z:-55,tier:3}
  ]},
  moab:{id:'moab',label:'MOAB',display:'Reino de Moab',capital:'dibon',king:'Salamanu',color:0x75604b,spawn:{x:320,z:-120},cities:[
    {id:'dibon',name:'Dibón',x:320,z:-120,capital:true,tier:3},{id:'medeba',name:'Medeba',x:300,z:20,tier:2},{id:'nebo',name:'Nebo',x:255,z:70,tier:1},
    {id:'kirhareseth',name:'Kir-Hareset',x:340,z:-250,tier:2},{id:'aroer',name:'Aroer',x:305,z:-180,tier:1},{id:'atarot',name:'Atarot',x:275,z:-20,tier:1},{id:'bethbaalmeon',name:'Bet-Baal-Meón',x:300,z:-65,tier:1}
  ]},
  edom:{id:'edom',label:'EDOM',display:'Reino de Edom',capital:'bozrah',king:'Qaus-malaka',color:0x935847,spawn:{x:300,z:-520},cities:[
    {id:'bozrah',name:'Bosra',x:300,z:-520,capital:true,tier:3},{id:'sela',name:'Sela',x:330,z:-680,tier:2},{id:'teman',name:'Temán',x:250,z:-760,tier:1},
    {id:'elath',name:'Elat',x:205,z:-1050,tier:2},{id:'eziongeber',name:'Ezión-Geber',x:225,z:-1025,tier:1}
  ]},
  ammon:{id:'ammon',label:'AMÓN',display:'Reino de Amón',capital:'rabbah',king:'Sanipu',color:0x626a4d,spawn:{x:310,z:190},cities:[
    {id:'rabbah',name:'Rabá',x:310,z:190,capital:true,tier:3},{id:'heshbon',name:'Hesbón',x:265,z:105,tier:2},{id:'jazer',name:'Jazer',x:300,z:125,tier:1},
    {id:'minnith',name:'Minnit',x:355,z:155,tier:1},{id:'abelkeramim',name:'Abel-Queramim',x:350,z:235,tier:1}
  ]},
  aram:{id:'aram',label:'ARAMEOS',display:'Aram-Damasco',capital:'damascus',king:'Rezín',color:0x4d657c,spawn:{x:250,z:760},cities:[
    {id:'damascus',name:'Damasco',x:250,z:760,capital:true,tier:4},{id:'hamath',name:'Hamat',x:155,z:1130,tier:3},{id:'arpad',name:'Arpad',x:65,z:1320,tier:2},
    {id:'zobah',name:'Zobá',x:205,z:920,tier:2},{id:'bethrehob',name:'Bet-Rehob',x:120,z:900,tier:1}
  ]},
  phoenicia:{id:'phoenicia',label:'FENICIOS',display:'Ciudades fenicias',capital:'tyre',king:'Mitenna de Tiro',color:0x426f70,spawn:{x:-260,z:610},cities:[
    {id:'tyre',name:'Tiro',x:-260,z:610,capital:true,tier:4,port:true},{id:'sidon',name:'Sidón',x:-235,z:720,tier:3,port:true},{id:'byblos',name:'Biblos',x:-205,z:905,tier:3,port:true},
    {id:'arwad',name:'Arwad',x:-185,z:1110,tier:2,port:true},{id:'sarepta',name:'Sarepta',x:-250,z:675,tier:1,port:true},{id:'berytus',name:'Berito',x:-220,z:825,tier:2,port:true}
  ]},
  neo_hittite:{id:'neo_hittite',label:'HITITAS',display:'Estados neo-hititas',capital:'carchemish',king:'Pisiri',color:0x7a5e3d,spawn:{x:350,z:1250},cities:[
    {id:'carchemish',name:'Carquemis',x:350,z:1250,capital:true,tier:4},{id:'samal',name:"Sam'al",x:210,z:1370,tier:2},{id:'melid',name:'Melid',x:520,z:1480,tier:2},
    {id:'gurgum',name:'Gurgum',x:360,z:1420,tier:2},{id:'kinalua',name:'Kinalua',x:120,z:1260,tier:2}
  ]}
};
const state={version:'5.0',nation:null,capital:null,king:null,relations:{},favor:0,reputation:0,capturedCities:[],selected:false,savedAt:0};
function faction(id){return FACTIONS[id]||null}
function capitalFor(id){const f=faction(id);return f?.cities.find(c=>c.id===f.capital)||null}
function baseRelation(a,b){if(a===b)return'own';const k=[a,b].sort().join(':');const map={
  'aram:israel':'ally','israel:judah':'war','aram:judah':'war','judah:philistia':'hostile','edom:judah':'hostile',
  'israel:phoenicia':'friendly','phoenicia:judah':'friendly','aram:phoenicia':'neutral','moab:judah':'neutral','ammon:judah':'neutral',
  'ammon:israel':'neutral','israel:moab':'hostile','edom:moab':'neutral'
};return map[k]||'neutral'}
function relationsFor(id){const r={};for(const other of Object.keys(FACTIONS))r[other]=baseRelation(id,other);return r}
function save(){try{state.savedAt=Date.now();localStorage.setItem(KEY,JSON.stringify(state));return true}catch(e){console.warn('nations50 save',e);return false}}
function load(){try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(!d)return false;Object.assign(state,d);state.relations=state.relations||{};state.capturedCities=Array.isArray(state.capturedCities)?state.capturedCities:[];state.favor=Math.max(0,Math.min(100,Number(state.favor)||0));return true}catch(e){console.warn('nations50 load',e);return false}}
function chooseNation(id,{spawn=false}={}){const f=faction(id);if(!f)return false;state.nation=f.id;state.capital=f.capital;state.king=f.king;state.relations=relationsFor(f.id);state.selected=true;save();if(spawn)spawnAtCapital();return true}
function spawnAtCapital(){if(!state.nation||typeof player==='undefined')return false;const f=faction(state.nation),c=capitalFor(state.nation);if(!f||!c)return false;const x=(f.spawn?.x??c.x),z=(f.spawn?.z??c.z);player.mesh.position.set(x,W.groundY(x,z),z);if(typeof mounted!=='undefined'&&mounted&&typeof mount!=='undefined'&&mount?.mesh){mount.mesh.position.set(x,W.groundY(x,z),z)}if(typeof updateChunks==='function')updateChunks(true);return true}
function relationTo(id){if(!state.nation)return'neutral';return state.relations[id]||baseRelation(state.nation,id)}
function setRelation(id,value){if(!FACTIONS[id]||!state.nation)return false;state.relations[id]=id===state.nation?'own':value;save();return true}
function gainFavor(amount){state.favor=Math.max(0,Math.min(100,state.favor+(Number(amount)||0)));save();return state.favor}
function spendFavor(amount){amount=Math.max(0,Number(amount)||0);if(state.favor<amount)return false;state.favor-=amount;save();return true}
function setReputation(v){state.reputation=Number(v)||0;save();return state.reputation}
function resetIdentity(){state.nation=null;state.capital=null;state.king=null;state.relations={};state.favor=0;state.reputation=0;state.capturedCities=[];state.selected=false;save()}
load();
addEventListener('pagehide',save);addEventListener('visibilitychange',()=>{if(document.hidden)save()});
window.WildernessNations50={version:'5.0',factions:FACTIONS,state,faction,capitalFor,chooseNation,spawnAtCapital,relationTo,setRelation,gainFavor,spendFavor,setReputation,save,load,resetIdentity,relationsFor};
})();