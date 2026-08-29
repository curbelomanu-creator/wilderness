// Wilderness 5.12.9 — prevent legacy-coordinate nation spawn while W6 finishes loading
(()=>{
  if(window.WildernessSelectionGuard5129)return;
  const guard=e=>{
    const b=e.target?.closest?.('#nation51start');
    if(!b||window.Wilderness6GameplayBridge5129?.ready)return;
    e.preventDefault();e.stopImmediatePropagation();
    const old=b.textContent;b.textContent='PREPARANDO MAPA W6…';
    setTimeout(()=>{if(!window.Wilderness6GameplayBridge5129?.ready)b.textContent='MAPA TODAVÍA CARGANDO…';else b.textContent=old},900);
  };
  document.addEventListener('pointerdown',guard,true);
  window.WildernessSelectionGuard5129=Object.freeze({version:'5.12.9'});
})();
