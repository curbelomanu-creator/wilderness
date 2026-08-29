(()=>{
  const T=window.THREE,W=window.WildernessWorld;
  if(!T||!W||typeof player==='undefined')return;
  const G={dead:false,scaled:new WeakSet(),lastSafe:player.mesh.position.clone()};

  // --- muerte real + reinicio ---
  const death=document.createElement('div');
  death.id='death31';
  death.style.cssText='display:none;position:fixed;z-index:250;inset:0;background:#100b08cc;color:#f7e7c7;align-items:center;justify-content:center;text-align:center;font-family:ui-monospace,monospace;pointer-events:auto';
  death.innerHTML='<div style="padding:28px;background:#21160ee8;border:1px solid #d3b477;border-radius:12px;min-width:260px"><div style="font-size:25px;font-weight:900;margin-bottom:8px">HAS MUERTO</div><div style="font-size:10px;opacity:.8;margin-bottom:18px">Tu viaje ha terminado.</div><button id="restart31" style="padding:11px 18px;border:1px solid #e4c689;background:#56391f;color:#fff0cf;border-radius:8px;font-weight:900">VOLVER A COMENZAR</button></div>';
  document.body.appendChild(death);
  death.querySelector('#restart31').onclick=()=>{try{localStorage.removeItem(`wilderness20:${W.seedToken}`);localStorage.removeItem(`wilderness10:${W.seedToken}`)}catch(_){} location.reload()};
  function die(){if(G.dead)return;G.dead=true;player.hp=0;mobileMove.x=0;mobileMove.z=0;mobileMove.run=false;player.mesh.rotation.z=Math.PI/2;death.style.display='flex';document.exitPointerLock?.()}
  const baseDamage=damage;
  damage=function(e,amount){if(G.dead&&e===player)return;baseDamage(e,amount);if(e===player&&player.hp<=0)die()};
  const baseAttack=playerAttack;
  playerAttack=function(){if(!G.dead)return baseAttack()};
  const baseInteract=interact;
  interact=function(){if(!G.dead)return baseInteract()};
  const baseUpdatePlayer=updatePlayer;

  // --- paredes urbanas sólidas ---
  function blocksCityWall(from,to){
    if(typeof cities==='undefined')return false;
    for(const c of cities){
      const r=c.radius||23,fx=from.x-c.x,fz=from.z-c.z,tx=to.x-c.x,tz=to.z-c.z;
      const fd=Math.hypot(fx,fz),td=Math.hypot(tx,tz);
      if((fd<r-1.25&&td>r-1.25)||(fd>r+1.25&&td<r+1.25)){
        // puerta principal al sur: corredor de 4.8 unidades
        const gate=Math.abs(to.x-c.x)<2.4&&to.z>c.z;
        const siege=window.WildernessSiege23?.cities?.get?.(c.id);
        const breached=!!siege&&siege.gate<=0;
        if(!gate||(!c.captured&&!breached))return true;
      }
    }
    return false;
  }
  updatePlayer=function(dt){
    if(G.dead){mobileMove.x=0;mobileMove.z=0;return}
    const before=player.mesh.position.clone();
    baseUpdatePlayer(dt);
    if(blocksCityWall(before,player.mesh.position)){
      player.mesh.position.x=before.x;player.mesh.position.z=before.z;player.mesh.position.y=W.groundY(before.x,before.z);
      if(mounted&&mount){mount.mesh.position.copy(player.mesh.position);mount.mesh.rotation.copy(player.mesh.rotation)}
    }else G.lastSafe.copy(player.mesh.position);
  };

  // --- escala creíble de caballos/camellos y montura ---
  function scaleMount(a){
    if(!a?.mesh||G.scaled.has(a)||!(a.type==='horse'||a.type==='camel'))return;
    G.scaled.add(a);
    if(a.type==='camel')a.mesh.scale.set(1.28,1.62,1.32);
    else a.mesh.scale.set(1.24,1.42,1.28);
  }
  for(const a of livestock||[])scaleMount(a);
  const baseMakeAnimal=makeAnimal;
  makeAnimal=function(type,x,z,owned=false){const a=baseMakeAnimal(type,x,z,owned);scaleMount(a);return a};

  // Corrige altura del jinete después del loop principal.
  function mountHeight(){
    if(G.dead||!mounted||!mount)return;
    scaleMount(mount);
    const y=W.groundY(player.mesh.position.x,player.mesh.position.z);
    player.mesh.position.y=y+(mount.type==='camel'?2.75:2.05);
  }

  // --- menos fauna hostil: como máximo un león activo cerca del jugador ---
  function thinLions(){
    if(typeof enemies==='undefined')return;
    const lions=enemies.filter(e=>e.alive&&e.type==='lion').sort((a,b)=>a.mesh.position.distanceToSquared(player.mesh.position)-b.mesh.position.distanceToSquared(player.mesh.position));
    for(let i=1;i<lions.length;i++){
      if(lions[i].mesh.position.distanceToSquared(player.mesh.position)<180*180){lions[i].alive=false;scene.remove(lions[i].mesh)}
    }
  }
  let last=0;function loop(t){try{mountHeight();if(t-last>3500){last=t;for(const a of livestock||[])scaleMount(a);thinLions()}}catch(e){console.warn('gameplay31',e)}requestAnimationFrame(loop)}requestAnimationFrame(loop);
  window.WildernessGameplay31=G;
})();