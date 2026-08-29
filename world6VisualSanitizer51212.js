// Wilderness 5.12.12 — remove duplicate legacy city layers/NPCs once dedicated W6 capitals are active
(()=>{
  if(window.Wilderness6VisualSanitizer51212)return;
  const D=window.Wilderness6World,W=window.WildernessWorld;
  if(!D||!W||typeof scene==='undefined')return;
  const CAPITALS={
    jerusalem:'w6-jerusalem',samaria:'w6-samaria-dedicated',gaza:'w6-gaza-philistia',
    dibon:'w6-dibon-transjordan',bozrah:'w6-bozrah-edom',rabbah:'w6-rabbah-transjordan',
    damascus:'w6-damascus-aram',tyre:'w6-tyre-ph',carchemish:'w6-carchemish-neo-hittite'
  };
  const LEGACY_PREFIXES=['settlement46-','v40-','life18-','city12-','settlements32-','urban41-','urban42-'];
  const state={hiddenGroups:new Set(),suppressedEntities:0,last:0};
  function dedicatedReady(id){const n=CAPITALS[id];return !!(n&&scene.getObjectByName(n));}
  function hideObj(o){if(!o||o.visible===false)return false;o.visible=false;state.hiddenGroups.add(o.name||'(unnamed)');return true}
  function suppressEntity(e){
    if(!e||e.__w6LegacySuppressed)return;
    e.__w6LegacySuppressed=true;
    if(e.mesh){e.mesh.visible=false;try{e.mesh.parent?.remove?.(e.mesh)}catch(_){ }}
    state.suppressedEntities++;
  }
  function hideRuntime(id){
    try{
      if(typeof generatedSettlements==='undefined')return;
      for(const key of [`hist-${id}`,`w6-${id}`]){
        const rt=generatedSettlements.get?.(key);if(!rt)continue;
        if(rt.group)hideObj(rt.group);
        if(key.startsWith('hist-')){
          for(const v of Object.values(rt))if(Array.isArray(v))for(const e of v)if(e?.mesh)suppressEntity(e);
          if(rt.kingRuntime?.mesh)suppressEntity(rt.kingRuntime);
        }
      }
    }catch(e){console.warn('W6 sanitizer runtime',id,e)}
  }
  function suppressLegacyHomeEntities(){
    const arrays=[];
    try{if(typeof civilians!=='undefined')arrays.push(civilians)}catch(_){ }
    try{if(typeof enemies!=='undefined')arrays.push(enemies)}catch(_){ }
    for(const arr of arrays)for(const e of arr||[]){
      const h=e?.home,id=String(h?.id||'');
      if(id.startsWith('hist-')&&dedicatedReady(id.slice(5)))suppressEntity(e);
    }
  }
  function hideLegacySceneGroups(id){
    const hist=`hist-${id}`,w6=`w6-${id}`;
    for(const o of scene.children){
      const n=o?.name||'';
      if(!LEGACY_PREFIXES.some(p=>n.startsWith(p)))continue;
      if(n.includes(hist)||n.includes(w6))hideObj(o);
    }
    if(id==='jerusalem')for(const n of ['jerusalem54','temple5104','jerusalem5105-roads'])hideObj(scene.getObjectByName(n));
  }
  function auditImpossibleRoofs(id){
    const p=D.getPlace?.(id),g=scene.getObjectByName(CAPITALS[id]);if(!p||!g)return 0;
    let n=0;g.traverse(o=>{if(!o?.isMesh)return;const geo=o.geometry?.parameters;if(!geo)return;const h=Number(geo.height),w=Number(geo.width),d=Number(geo.depth);if(h<1&&Math.max(w||0,d||0)>80)n++});return n;
  }
  function tick(){
    for(const id of Object.keys(CAPITALS))if(dedicatedReady(id)){hideRuntime(id);hideLegacySceneGroups(id)}
    suppressLegacyHomeEntities();
    try{window.WildernessCollision45?.rebuild?.(true)}catch(_){ }
    state.last=performance.now();
  }
  tick();setInterval(tick,500);
  window.Wilderness6VisualSanitizer51212=Object.freeze({version:'5.12.12',state,tick,auditImpossibleRoofs});
})();
