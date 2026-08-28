(() => {
  const THREE=window.THREE,W=window.WildernessWorld;
  if(!THREE||!W||typeof player==='undefined'||typeof followers==='undefined'||typeof enemies==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const F={morale:100,enemyMorale:100,chargeCooldown:0,volleyCooldown:0,battle:false,lastFriendly:0,lastEnemy:0};
  const panel=document.createElement('div');panel.id='field14';panel.style.cssText='display:none;position:fixed;z-index:27;left:50%;top:58px;transform:translateX(-50%);min-width:250px;padding:7px 10px;border:1px solid #d8b97a99;border-radius:8px;background:#1c130bd4;color:#f6e7c8;font:9px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;text-align:center;text-shadow:0 1px 2px #000;pointer-events:none';document.body.appendChild(panel);
  if(mobile){panel.style.top='45px';panel.style.fontSize='7px';panel.style.minWidth='190px';}

  function aliveFriendly(){return followers.filter(f=>f.alive)}
  function aliveEnemyNear(r=45){return enemies.filter(e=>e.alive&&e.mesh.position.distanceTo(player.mesh.position)<r)}
  function roleCount(arr,role){return arr.filter(e=>e.role===role).length}
  function nearestFrom(e,arr,max=30){let best=null,bd=max;for(const t of arr){if(!t.alive)continue;const d=e.mesh.position.distanceTo(t.mesh.position);if(d<bd){bd=d;best=t}}return best}
  function battleState(){const fr=aliveFriendly(),en=aliveEnemyNear();F.battle=en.length>0&&(fr.length>0||player.hp>0);return{fr,en}}
  function moraleLabel(v){return v>70?'FIRME':v>45?'INCIERTA':v>22?'QUEBRÁNDOSE':'HUIDA'}
  function render(){const{fr,en}=battleState();panel.style.display=F.battle?'block':'none';if(!F.battle)return;panel.innerHTML=`<b>BATALLA · 1.4</b><br>Tu fuerza: ${fr.length} · Moral ${Math.round(F.morale)} ${moraleLabel(F.morale)}<br>Enemigo: ${en.length} · Moral ${Math.round(F.enemyMorale)} ${moraleLabel(F.enemyMorale)}`}

  function updateMorale(dt,fr,en){const f=fr.length,e=en.length;if(!F.battle){F.morale=Math.min(100,F.morale+dt*2);F.enemyMorale=Math.min(100,F.enemyMorale+dt*2);F.lastFriendly=f;F.lastEnemy=e;return}if(F.lastFriendly&&f<F.lastFriendly)F.morale-=Math.min(12,(F.lastFriendly-f)*4);if(F.lastEnemy&&e<F.lastEnemy)F.enemyMorale-=Math.min(12,(F.lastEnemy-e)*4);if(e>f*1.6)F.morale-=dt*2.3;if(f>e*1.6)F.enemyMorale-=dt*2.3;if(player.hp<(player.maxHp||14)*.35)F.morale-=dt*1.3;F.morale=Math.max(0,Math.min(100,F.morale));F.enemyMorale=Math.max(0,Math.min(100,F.enemyMorale));F.lastFriendly=f;F.lastEnemy=e;
    if(F.morale<18){for(const x of fr)if(Math.random()<dt*.7){x.order='retreat';x.retreat=Math.max(x.retreat||0,4.5)}}
    if(F.enemyMorale<18){for(const x of en)if(Math.random()<dt*.7){x.retreat=Math.max(x.retreat||0,4.2);x.__fieldRout=true}}
  }

  function cavalryCharge(dt,fr,en){F.chargeCooldown=Math.max(0,F.chargeCooldown-dt);if(F.chargeCooldown>0||!en.length)return;const cav=fr.filter(f=>f.role==='cavalry'&&f.order==='attack');if(cav.length<2)return;let hits=0;for(const c of cav){const t=nearestFrom(c,en,10);if(!t)continue;const d=c.mesh.position.distanceTo(t.mesh.position);if(d<4.4){damage(t,1.4);hits++;if(t.alive){const dx=t.mesh.position.x-c.mesh.position.x,dz=t.mesh.position.z-c.mesh.position.z,l=Math.hypot(dx,dz)||1;t.mesh.position.x+=dx/l*1.8;t.mesh.position.z+=dz/l*1.8}}}if(hits){F.chargeCooldown=4.5;F.enemyMorale=Math.max(0,F.enemyMorale-hits*2.4);if(typeof flash==='function')flash(`Carga de caballería: ${hits} impactos.`,1800)}}

  function archerVolley(dt,fr,en){F.volleyCooldown=Math.max(0,F.volleyCooldown-dt);if(F.volleyCooldown>0||!en.length)return;const arch=fr.filter(f=>f.role==='archer'&&f.order==='attack');if(arch.length<3)return;let shots=0;for(const a of arch.slice(0,mobile?7:12)){const t=nearestFrom(a,en,24);if(!t)continue;fireArrow(a,t,true);shots++}if(shots>=3){F.volleyCooldown=5.8;F.enemyMorale=Math.max(0,F.enemyMorale-shots*.65);if(typeof flash==='function')flash(`Lluvia de flechas: ${shots} arqueros disparan.`,1600)}}

  function enemyPressure(dt,en){if(!en.length)return;const near=en.filter(e=>e.mesh.position.distanceTo(player.mesh.position)<6).length;if(near>=3)F.morale=Math.max(0,F.morale-dt*.9);}

  if(typeof issueOrder==='function'){
    const old=issueOrder;issueOrder=function(order){old(order);if(order==='attack')F.morale=Math.min(100,F.morale+3);if(order==='retreat')F.morale=Math.max(0,F.morale-5)};
  }

  let last=performance.now(),uiClock=0;function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;const s=battleState();updateMorale(dt,s.fr,s.en);cavalryCharge(dt,s.fr,s.en);archerVolley(dt,s.fr,s.en);enemyPressure(dt,s.en);uiClock+=dt;if(uiClock>.25){uiClock=0;render()}requestAnimationFrame(loop)}requestAnimationFrame(loop);window.WildernessFieldBattle=F;
})();