// Wilderness 5.10.1 - pregame lock, safe nation selection and melee-only enemies
(()=>{
const T=window.THREE,N=window.WildernessNations50;
if(!T||!N||typeof player==='undefined')return;
const P={ready:false,swords:new WeakMap(),lastSwordScan:0};
const bladeMat=new T.MeshLambertMaterial({color:0xb9b8b1,flatShading:true});
const hiltMat=new T.MeshLambertMaterial({color:0x7b5a31,flatShading:true});
const gripMat=new T.MeshLambertMaterial({color:0x36251a,flatShading:true});
function locked(){return !N.state?.selected||!!window.WildernessNationSelectionOpen}
function makeSword(e){
 if(!e?.actor||e.type==='lion'||e===player||P.swords.has(e))return;
 if(e.equipment)e.equipment.visible=false;
 if(e.cavalryHorse){try{e.mesh.remove(e.cavalryHorse)}catch(_){ }e.cavalryHorse=null;e.actor.position.y=0}
 e.role='infantry';
 const g=new T.Group();g.name='enemy-sword-5101';g.position.set(.72,1.55,.08);g.rotation.z=-.18;
 const blade=new T.Mesh(new T.BoxGeometry(.13,2.05,.15),bladeMat);blade.position.y=.75;g.add(blade);
 const cross=new T.Mesh(new T.BoxGeometry(.78,.12,.18),hiltMat);cross.position.y=-.30;g.add(cross);
 const grip=new T.Mesh(new T.BoxGeometry(.16,.62,.18),gripMat);grip.position.y=-.62;g.add(grip);
 e.actor.add(g);P.swords.set(e,g);e.__meleeOnly5101=true;
}
function normalizeEnemies(){
 if(typeof enemies==='undefined')return;
 for(const e of enemies){if(!e?.alive||e.type==='lion')continue;if(e.role!=='infantry'||!P.swords.has(e))makeSword(e)}
}
// Suppress every hostile projectile while preserving friendly/player archers if they exist.
if(typeof fireArrow==='function'){
 const baseFire=fireArrow;
 fireArrow=function(shooter,target,friendly){if(friendly===false||shooter?.enemy||shooter?.king||shooter?.__meleeOnly5101)return;return baseFire(shooter,target,friendly)};
}
if(typeof damage==='function'){
 const baseDamage=damage;
 damage=function(e,amount){if(e===player&&locked())return;return baseDamage(e,amount)};
}
if(typeof playerAttack==='function'){
 const baseAttack=playerAttack;
 playerAttack=function(...args){if(locked())return;return baseAttack(...args)};
}
if(typeof updateEnemies==='function'){
 const baseEnemies=updateEnemies;
 updateEnemies=function(dt){normalizeEnemies();if(locked())return;return baseEnemies(dt)};
}
function sync(){
 const l=locked();
 if(player?.mesh)player.mesh.visible=!l;
 if(typeof mount!=='undefined'&&mount?.mesh&&l)mount.mesh.visible=false;
 normalizeEnemies();
 const v=document.querySelector('#nation51 .n51head small');if(v)v.textContent='WILDERNESS 5.10.1';
 P.ready=!l;
 requestAnimationFrame(sync);
}
requestAnimationFrame(sync);
window.WildernessPregame5101={state:P,locked,normalizeEnemies};
})();