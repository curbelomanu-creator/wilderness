// Wilderness 5.0 - robust build menu bridge for touch and desktop
(()=>{
function attach(){
  const api=window.WildernessSettlement,btn=document.getElementById('build08btn');
  if(!api||!btn)return false;
  if(btn.dataset.w50Fixed==='1')return true;
  btn.dataset.w50Fixed='1';
  btn.onclick=null;
  btn.style.zIndex='82';
  btn.style.pointerEvents='auto';
  btn.style.touchAction='manipulation';
  btn.style.userSelect='none';
  const open=e=>{e?.preventDefault?.();e?.stopPropagation?.();api.openMenu();};
  btn.addEventListener('pointerdown',open,{passive:false});
  btn.addEventListener('contextmenu',e=>e.preventDefault());
  btn.setAttribute('aria-label','Construir o fundar asentamiento');
  return true;
}
let tries=0;function boot(){if(attach())return;if(++tries<30)setTimeout(boot,150)}boot();
window.WildernessBuildFix50={attach};
})();