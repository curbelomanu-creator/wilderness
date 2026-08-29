// Wilderness 5.12.11 — prevent nation start until W6 geography, urban access and safe spawn are ready
(()=>{
  if(window.WildernessSelectionGuard5129)return;
  const ready=()=>!!(window.Wilderness6GameplayBridge5129?.ready&&window.Wilderness6UrbanAccess5131&&window.Wilderness6SpawnSafety51210?.ready);
  const guard=e=>{
    const b=e.target?.closest?.('#nation51start');
    if(!b||ready())return;
    e.preventDefault();e.stopImmediatePropagation();
    const old=b.textContent;b.textContent='PREPARANDO CAPITAL W6…';
    setTimeout(()=>{b.textContent=ready()?old:'CAPITAL TODAVÍA CARGANDO…'},900);
  };
  document.addEventListener('pointerdown',guard,true);
  window.WildernessSelectionGuard5129=Object.freeze({version:'5.12.11',ready});
})();
