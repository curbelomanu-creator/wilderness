// Wilderness 5.12.9 — canonical gameplay bridge: W6 is the only geographic authority
(()=>{
  if(window.Wilderness6GameplayBridge5129)return;
  const W=window.WildernessWorld,D=window.Wilderness6World,N=window.WildernessNations50,H=window.WildernessHistorical52;
  if(!W||!D||!N)return;

  const CAPITALS={israel:'samaria',judah:'jerusalem',philistia:'gaza',moab:'dibon',edom:'bozrah',ammon:'rabbah',aram:'damascus',phoenicia:'tyre',neo_hittite:'carchemish'};
  const ALIASES={betel:'bethel',bethzur:'beth_zur',kirhareseth:'kir_hareseth',eziongeber:'ezion_geber',bethrehob:'beth_rehob',nebo:'nebo_city',abelkeramim:'abel_keramim',bethbaalmeon:'beth_baal_meon',punon:'punon_faynan','sam_al':'samal'};
  const LEGACY_CAPITALS={israel:{x:20,z:520},judah:{x:0,z:0},philistia:{x:-430,z:-220},moab:{x:320,z:-120},edom:{x:300,z:-520},ammon:{x:310,z:190},aram:{x:250,z:760},phoenicia:{x:-260,z:610},neo_hittite:{x:350,z:1250}};
  const CAPITAL_IDS=new Set(Object.values(CAPITALS));

  function cleanId(id){
    let s=String(id||'').replace(/^w6-/,'').replace(/^hist-/,'');
    if(s.includes(':'))s=s.split(':')[0];
    return ALIASES[s]||s;
  }
  function place(id){return D.getPlace?.(cleanId(id))||null}
  function controllerFaction(controller,culture){
    const c=String(controller||'');
    if(['judah','israel','philistia','moab','edom','ammon'].includes(c))return c;
    if(c.startsWith('israel_'))return'israel';
    if(c.startsWith('ammon_'))return'ammon';
    if(c==='aram_damascus'||c==='aram_frontier'||c==='local_aramean'||c==='hamath_state'||c==='arpad_state')return'aram';
    if(c.includes('tyre')||c.includes('sidon')||c.includes('byblos')||c.includes('arwad')||c.includes('berytus'))return'phoenicia';
    if(c.includes('carchemish')||c.includes('sam_al')||c.includes('gurgum')||c.includes('melid')||c==='assyrian_province'||c==='local_north_syrian')return'neo_hittite';
    const byCulture={judah:'judah',israel:'israel',philistine:'philistia',moabite:'moab',edomite:'edom',ammonite:'ammon',aramean:'aram',phoenician:'phoenicia',neo_hittite:'neo_hittite'};
    return byCulture[culture]||null;
  }
  function baseFactionForPlace(p){return p?controllerFaction(p.controller,p.culture):null}
  function canonicalSettlementId(id){const p=place(id);return p?`w6-${p.id}`:String(id||'')}

  function syncNationGeography(){
    for(const [fid,f] of Object.entries(N.factions||{})){
      for(const c of f.cities||[]){
        const p=place(c.id);if(!p)continue;
        c.x=p.x;c.z=p.z;c.lat=p.lat;c.lon=p.lon;c.w6id=p.id;c.historicalId=p.id;
      }
      const cp=place(CAPITALS[fid]||f.capital);
      if(cp)f.spawn={x:cp.x,z:cp.z,w6id:cp.id};
    }
    if(N.state?.nation){const f=N.faction(N.state.nation);if(f){N.state.capital=CAPITALS[f.id]||f.capital;N.state.king=f.king;try{N.save?.()}catch(_){}}}
  }

  const originalCapitalFor=N.capitalFor?.bind(N);
  N.capitalFor=function(id){
    const f=N.faction(id);if(!f)return null;
    const cid=CAPITALS[id]||f.capital,p=place(cid),legacy=(f.cities||[]).find(c=>cleanId(c.id)===cid)||originalCapitalFor?.(id)||{id:cid,name:p?.name||cid,capital:true,tier:4};
    if(p){legacy.x=p.x;legacy.z=p.z;legacy.lat=p.lat;legacy.lon=p.lon;legacy.w6id=p.id;legacy.historicalId=p.id;legacy.name=p.name||legacy.name;}
    return legacy;
  };

  function safePoint(p){
    const maxR=Math.max(28,Math.min(95,(p.radius||80)*.48)),preferred=Math.min(38,maxR*.55),cand=[];
    cand.push({x:p.x,z:p.z,r:0});
    for(let r=10;r<=maxR;r+=10)for(let i=0;i<20;i++){const a=i/20*Math.PI*2;cand.push({x:p.x+Math.cos(a)*r,z:p.z+Math.sin(a)*r,r})}
    let best=null,score=Infinity;
    for(const q of cand){
      const b=W.biomeAt?.(q.x,q.z),s=W.slopeAt?.(q.x,q.z)??0;
      if(W.deepWaterAt?.(q.x,q.z)||W.waterAt?.(q.x,q.z)||W.riverAt?.(q.x,q.z)||b==='sea'||s>.42)continue;
      const sc=Math.abs(q.r-preferred)+s*55-(W.roadAt?.(q.x,q.z)?7:0);
      if(sc<score){score=sc;best=q}
    }
    return best||{x:p.x,z:p.z,r:0};
  }
  function spawnAtCapital(fid=N.state?.nation,reason='spawn'){
    const p=place(CAPITALS[fid]||N.faction(fid)?.capital);if(!p||typeof player==='undefined')return false;
    const q=safePoint(p),y=W.groundY(q.x,q.z);
    player.mesh.position.set(q.x,y,q.z);
    try{if(typeof mounted!=='undefined'&&mounted&&typeof mount!=='undefined'&&mount?.mesh)mount.mesh.position.set(q.x,y,q.z)}catch(_){ }
    try{window.WildernessGameplay31?.lastSafe?.copy?.(player.mesh.position)}catch(_){ }
    try{if(typeof updateChunks==='function')updateChunks(true)}catch(_){ }
    try{window.Wilderness6Streaming5125?.tick?.();window.Wilderness6LifeStreaming5126?.tick?.()}catch(_){ }
    return{f:N.faction(fid),c:N.capitalFor(fid),p:q,place:p,reason};
  }
  N.spawnAtCapital=function(){return!!spawnAtCapital(N.state?.nation,'nation-api')};
  if(window.WildernessChooseNation51)window.WildernessChooseNation51.placeAtCapital=id=>spawnAtCapital(id,'nation-selection');

  function nearestCity(x,z,max=Infinity){
    let best=null,bd=max;
    for(const p of D.places||[]){
      if(!['city','settlement','fortress','port','oasis_settlement'].includes(p.type))continue;
      const d=Math.hypot(x-p.x,z-p.z);if(d<bd){bd=d;best=p}
    }
    return best?{city:best,d:bd}:null;
  }
  function territoryAt(x,z){
    let best=null,bd=6500;
    for(const p of D.places||[]){const f=baseFactionForPlace(p);if(!f)continue;const d=Math.hypot(x-p.x,z-p.z);if(d<bd){bd=d;best=f}}
    return best;
  }

  function syncHistoricalLayer(){
    if(!H)return;
    for(const c of H.cities||[]){
      const p=place(c.historicalId||c.id);if(!p)continue;
      const f=baseFactionForPlace(p);
      c.x=p.x;c.z=p.z;c.name=p.name||c.name;c.w6id=p.id;c.historicalId=p.id;
      if(f){c.faction=f;c.nation=f;c.factionName=N.faction(f)?.display||f;c.factionKing=N.faction(f)?.king||c.factionKing}
    }
    H.territoryAt=territoryAt;
    H.nearestCity=(x,z,max=Infinity)=>{const n=nearestCity(x,z,max);if(!n)return null;const p=n.city,f=baseFactionForPlace(p);return{city:{id:`w6-${p.id}`,historicalId:p.id,w6id:p.id,name:p.name,x:p.x,z:p.z,type:p.type==='settlement'?'village':'city',faction:f,nation:f,factionName:N.faction(f)?.display||f,factionKing:N.faction(f)?.king||null,capital:CAPITAL_IDS.has(p.id),historical:true,rank:p.rank,radius:p.radius},d:n.d}};
  }

  const prevNear=W.settlementsNearBounds?.bind(W),prevDef=W.settlementDef?.bind(W);
  function decorateSettlement(s){
    if(!s)return s;const p=place(s.w6id||s.historicalId||s.id);if(!p)return s;
    const baseFaction=baseFactionForPlace(p),cid=`w6-${p.id}`;
    const hold=window.WildernessConquest510?.state?.holdings?.get?.(cid)||window.WildernessConquest510?.state?.holdings?.get?.(s.id);
    const owner=hold?.status==='occupied'?hold.owner:baseFaction;
    return{...s,id:cid,w6id:p.id,historicalId:p.id,name:p.name,x:p.x,z:p.z,lat:p.lat,lon:p.lon,block:p.block,culture:p.culture,cult:p.cult,rank:p.rank,radius:p.radius||s.radius,controller:p.controller,originalFaction:baseFaction,cultureFaction:baseFaction,controllerFaction:owner,faction:owner,nation:owner,factionName:N.faction(owner)?.display||owner||null,factionKing:N.faction(owner)?.king||null,capital:CAPITAL_IDS.has(p.id),king:CAPITAL_IDS.has(p.id)?N.faction(owner)?.king||null:null,historical:true,special:p.id==='jerusalem'?'jerusalem':s.special};
  }
  if(prevNear)W.settlementsNearBounds=(...a)=>(prevNear(...a)||[]).map(decorateSettlement);
  if(prevDef)W.settlementDef=(...a)=>decorateSettlement(prevDef(...a));

  function purgeLegacyDiplomacy(){
    const D55=window.WildernessDiplomacy55?.state;if(!D55)return;
    for(const [id,g] of [...D55.gates]){
      if(String(g.settlementId||'').startsWith('w6-'))continue;
      try{if(g.root?.parent)g.root.parent.remove(g.root)}catch(_){ }
      D55.gates.delete(id);
    }
    const migrated=new Set();for(const id of D55.sieges||[]){const p=place(id);migrated.add(p?`w6-${p.id}`:id)}
    D55.sieges.clear();for(const id of migrated)D55.sieges.add(id);D55.near=null;D55.lastAlert=null;
  }

  function migrateConquests(){
    const C=window.WildernessConquest510;if(!C?.state?.holdings)return;
    const entries=[...C.state.holdings.entries()];
    for(const [id,h] of entries){const p=place(id);if(!p)continue;const nid=`w6-${p.id}`;if(id===nid){h.x=p.x;h.z=p.z;continue}C.state.holdings.delete(id);h.id=nid;h.x=p.x;h.z=p.z;h.name=p.name||h.name;C.state.holdings.set(nid,h)}
    if(Array.isArray(N.state?.capturedCities))N.state.capturedCities=[...new Set(N.state.capturedCities.map(id=>{const p=place(id);return p?`w6-${p.id}`:id}))];
    try{C.save?.();N.save?.()}catch(_){ }
  }

  function migrateStorageMap(prefix){
    const key=`${prefix}:${W.seedToken}`;let obj;try{obj=JSON.parse(localStorage.getItem(key)||'null')}catch(_){return}if(!obj)return;
    if(prefix==='wilderness55'&&Array.isArray(obj.sieges))obj.sieges=[...new Set(obj.sieges.map(id=>canonicalSettlementId(id)))];
    else if(prefix==='wilderness57'){
      const out={};for(const [id,v] of Object.entries(obj)){const nid=canonicalSettlementId(id);out[nid]=v}obj=out;
    }else if(prefix==='wilderness510'&&obj.holdings){
      const out={};for(const [id,v] of Object.entries(obj.holdings)){const p=place(id),nid=p?`w6-${p.id}`:id;out[nid]={...v,id:nid,x:p?.x??v.x,z:p?.z??v.z,name:p?.name??v.name}}obj.holdings=out;
    }
    try{localStorage.setItem(key,JSON.stringify(obj))}catch(_){ }
  }

  function migrateLegacyPlayer(){
    if(!N.state?.selected||!N.state.nation||typeof player==='undefined')return false;
    const key=`wildernessW6Gameplay5129:${W.seedToken}`;try{if(localStorage.getItem(key))return false}catch(_){ }
    const old=LEGACY_CAPITALS[N.state.nation],cp=place(CAPITALS[N.state.nation]);if(!old||!cp)return false;
    const here=player.mesh.position,dOld=Math.hypot(here.x-old.x,here.z-old.z),dNew=Math.hypot(here.x-cp.x,here.z-cp.z);
    let moved=false;if(dOld<230&&dNew>650){spawnAtCapital(N.state.nation,'legacy-save-migration');moved=true}
    try{localStorage.setItem(key,JSON.stringify({at:Date.now(),moved,version:'5.12.9'}))}catch(_){ }
    return moved;
  }

  syncNationGeography();syncHistoricalLayer();purgeLegacyDiplomacy();migrateConquests();migrateStorageMap('wilderness55');migrateStorageMap('wilderness57');migrateStorageMap('wilderness510');migrateLegacyPlayer();

  const api={version:'5.12.9',ready:true,capitals:Object.freeze({...CAPITALS}),aliases:Object.freeze({...ALIASES}),place,cleanId,canonicalSettlementId,baseFactionForPlace,nearestCity,territoryAt,safePoint,spawnAtCapital,decorateSettlement,syncNationGeography,migrateLegacyPlayer};
  window.Wilderness6GameplayBridge5129=Object.freeze(api);
  window.dispatchEvent(new CustomEvent('wilderness:w6-gameplay-ready',{detail:{version:'5.12.9'}}));
  console.info('W6 gameplay bridge ready · canonical geography active');
})();
