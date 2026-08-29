// Wilderness 5.12.10 — prevent nation spawn before W6 geography and safe anchors finish loading
(()=>{
  if(window.WildernessSelectionGuard5129)return;
  const ready=()=>!!window.Wilderness6GameplayBridge5129?.ready&&!!window.Wilderness6SpawnSafety51210?.ready;
  const guard=e=>{
    const b=e.target?.closest?.('#nation51start');
    if(!b||ready())return;
    e.preventDefault();e.stopImmediatePropagation();
    const old=b.textContent;b.textContent='PREPARANDO PUNTO SEGURO…';
    setTimeout(()=>{if(!ready())b.textContent='MAPA TODAVÍA CARGANDO…';else b.textContent=old},900);
  };
  document.addEventListener('pointerdown',guard,true);
  window.WildernessSelectionGuard5129=Object.freeze({version:'5.12.10',ready});
})();
