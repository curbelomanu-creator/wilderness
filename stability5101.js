// Wilderness 5.10.1 - health regeneration, city circulation cleanup and final combat guards
(()=>{
const T=window.THREE,W=window.WildernessWorld,N=window.WildernessNations50,S46=window.WildernessSettlement46,J=window.WildernessJerusalem54,H=window.WildernessHistorical52;
if(!T||!W||!N||typeof player==='undefined')return;
const R={lastCombat:performance.now(),regenDelay:7000,regenRate:.06,regenerating:false,marketsRemoved:new Set(),lastCleanup:0};
function locked(){return !N.state?.selected||!!window.WildernessNationSelectionOpen}
function markCombat(){R.lastCombat=performance.now();R.regenerating=false}
if(typeof damage==='function'){
 const baseDamage=damage;
 damage=function(e,amount){
   if(e===player){if(locked())return;markCombat()}
   return baseDamage(e,amount)
 };
}
if(typeof playerAttack==='function'){
 const baseAttack=playerAttack;
 playerAttack=function(...args){if(locked())return;markCombat();return baseAttack(...args)};
}
// Final guard in case later AI modules replaced the early pregame wrapper.
if(typeof updateEnemies==='function'){
 const baseEnemies=updateEnemies;
 updateEnemies=function(dt){window.WildernessPregame5101?.normalizeEnemies?.();if(locked())return;return baseEnemies(dt)};
}
if(typeof fireArrow==='function'){
 const baseFire=fireArrow;
 fireArrow=function(shooter,target,friendly){if(friendly===false||shooter?.enemy||shooter?.king||shooter?.__meleeOnly5101)return;return baseFire(shooter,target,friendly)};
}
function enemyNear(max=12){
 if(typeof enemies==='undefined')return false;
 const p=player.mesh.position;
 for(const e of enemies){if(!e?.alive||!e.mesh)continue;if(Math.hypot(e.mesh.position.x-p.x,e.mesh.position.z-p.z)<max)return true}
 return false;
}
function regen(dt,now){
 if(locked()||!player.alive||player.hp<=0||player.hp>=player.maxHp){R.regenerating=false;return}
 if(now-R.lastCombat<R.regenDelay||enemyNear(12)){R.regenerating=false;return}
 R.regenerating=true;player.hp=Math.min(player.maxHp,player.hp+player.maxHp*R.regenRate*dt);
}
function defFor(id){const rt=typeof generatedSettlements!=='undefined'?generatedSettlements.get(id):null;return rt?.def||rt?.definition||rt?.source||H?.byId?.get?.(id)||rt||null}
function clearNormalCityMarkets(){
 const built=S46?.state?.built;if(!built)return 0;let removed=0;
 for(const[id,g]of built){const d=defFor(id);if(!d||d.type!=='city'||!g?.children)continue;
   for(const o of g.children){if(!o?.isGroup||o.visible===false)continue;const count=o.children?.length||0;if(count<15||count>22)continue;const dx=(o.position?.x??1e9)-d.x,dz=(o.position?.z??1e9)-d.z;if(Math.hypot(dx,dz)>10)continue;o.visible=false;o.userData.marketRemoved5101=true;R.marketsRemoved.add(`${id}:${Math.round(dx*10)}:${Math.round(dz*10)}`);removed++}
 }
 return removed;
}
function clearJerusalemMarket(){
 if(!J?.group||!J?.anchors?.center)return 0;const c=J.anchors.center;let removed=0;
 for(const o of J.group.children){if(!o?.isGroup||o.visible===false)continue;const n=o.children?.length||0;if(n<5||n>7)continue;const dx=o.position.x-c.x,dz=o.position.z-c.z;if(Math.hypot(dx,dz)>16)continue;o.visible=false;o.userData.marketRemoved5101=true;removed++}
 return removed;
}
function cleanupMarkets(now){if(now-R.lastCleanup<900)return;R.lastCleanup=now;const n=clearNormalCityMarkets()+clearJerusalemMarket();if(n){const C=window.WildernessCollision45?.state;if(C?.lastCenter?.set)C.lastCenter.set(1e9,0,1e9);if(C)C.lastScan=0;setTimeout(()=>window.WildernessCollision45?.rebuild?.(),30)}}
if(typeof updateUI==='function'){
 const baseUI=updateUI;
 updateUI=function(){baseUI();if(R.regenerating&&typeof stats!=='undefined'&&stats)stats.innerHTML+='<br><b>Salud: REGENERANDO</b>'};
}
let last=performance.now();function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;try{regen(dt,now);cleanupMarkets(now);if(locked()&&player.mesh)player.mesh.visible=false;else if(player.mesh)player.mesh.visible=true}catch(e){console.warn('Wilderness 5.10.1 stability',e)}requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessStability5101={state:R,markCombat,cleanupMarkets,enemyNear};
})();