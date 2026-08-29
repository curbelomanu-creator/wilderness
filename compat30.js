(()=>{
  // Replace the legacy flash implementation so later desktop scripts never
  // depend on the global lexical `msg` binding.
  let flashTimer30=0;
  window.flash=function(text,ms=1800){
    const el=document.getElementById('message');
    if(!el)return;
    el.textContent=String(text??'');
    el.style.opacity='1';
    clearTimeout(flashTimer30);
    flashTimer30=setTimeout(()=>{el.style.opacity='0'},ms);
  };

  const coarse=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  if(coarse)return;

  function canvas(){return document.querySelector('canvas')}
  function locked(){return document.pointerLockElement===canvas()}

  // Click once on the world to capture the mouse. ESC releases it.
  document.addEventListener('pointerdown',e=>{
    const c=canvas();
    if(!c||e.target!==c||e.button!==0)return;
    if(!locked()){
      try{c.requestPointerLock?.()}catch(_){ }
      e.preventDefault();
      return;
    }
    // Once captured, left click is the natural combat action.
    try{if(typeof playerAttack==='function')playerAttack()}catch(err){console.warn('desktop attack',err)}
  },true);

  document.addEventListener('mousemove',e=>{
    if(!locked())return;
    try{
      if(typeof orbitCamera==='function')orbitCamera(e.movementX||0,e.movementY||0);
    }catch(err){console.warn('desktop camera',err)}
  },true);

  document.addEventListener('pointerlockchange',()=>{
    if(typeof window.flash!=='function')return;
    if(locked())window.flash('Mouse capturado · ESC para liberar',1200);
  });

  // Right click remains usable without browser context menu while playing.
  document.addEventListener('contextmenu',e=>{
    if(e.target===canvas()||locked())e.preventDefault();
  });
})();