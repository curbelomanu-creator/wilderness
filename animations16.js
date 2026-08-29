(()=>{
const T=window.THREE;if(!T||typeof player==='undefined')return;
const S={entities:new WeakMap(),time:0};
function state(e){let s=S.entities.get(e);if(!s){s={last:e.mesh.position.clone(),speed:0,phase:(e.mesh.id||0)*.73};S.entities.set(e,s)}return s}
function people(){const a=[player];if(typeof civilians!=='undefined')a.push(...civilians);if(typeof followers!=='undefined')a.push(...followers);if(typeof enemies!=='undefined')a.push(...enemies);return[...new Set(a)].filter(e=>e?.mesh&&e.actor)}
function animals(){return typeof livestock!=='undefined'?livestock.filter(a=>a?.mesh):[]}
function humanoid(e,dt,t){const s=state(e),now=e.mesh.position.clone(),dx=now.x-s.last.x,dz=now.z-s.last.z,moved=Math.hypot(dx,dz),spd=moved/Math.max(dt,.001);s.speed=s.speed*.70+spd*.30;s.last.copy(now);
if(!e.alive){e.mesh.rotation.z+=(Math.PI/2-e.mesh.rotation.z)*Math.min(1,dt*8);return}
// Keep torso visually fixed: no side-to-side sway and no artificial vertical bob.
e.actor.rotation.z=0;e.actor.rotation.y=0;e.actor.position.x=0;e.actor.position.z=0;if(typeof mounted==='undefined'||!mounted||e!==player)e.actor.position.y=0;
const moving=s.speed>.28&&!e.__swing15&&!e.__bow15;
// Orient the whole character to the actual direction of travel, preventing sideways walking.
if(moving&&moved>.0015){const desired=Math.atan2(dx,dz);let d=desired-e.mesh.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));e.mesh.rotation.y+=d*Math.min(1,dt*16)}
const run=s.speed>6.1,freq=run?12.5:8.5,amp=run?.70:.48,cycle=Math.sin(t*freq+s.phase);
if(e.__legs15){const targetL=moving?cycle*amp:0,targetR=-targetL;e.__legs15.left.rotation.x+=(targetL-e.__legs15.left.rotation.x)*Math.min(1,dt*14);e.__legs15.right.rotation.x+=(targetR-e.__legs15.right.rotation.x)*Math.min(1,dt*14)}
if(e.__arms15&&!e.__swing15&&!e.__bow15){const arm=moving?cycle*(run?.56:.38):0;e.__arms15.left.rotation.x+=(arm-e.__arms15.left.rotation.x)*Math.min(1,dt*14);e.__arms15.right.rotation.x+=(-arm-e.__arms15.right.rotation.x)*Math.min(1,dt*14);e.__arms15.left.rotation.z*=Math.max(0,1-dt*14);e.__arms15.right.rotation.z*=Math.max(0,1-dt*14)}
}
function animateAnimal(a,dt,t){if(!a.alive)return;const s=state(a),moved=a.mesh.position.distanceTo(s.last),spd=moved/Math.max(dt,.001);s.speed=s.speed*.7+spd*.3;s.last.copy(a.mesh.position);a.mesh.rotation.z*=Math.max(0,1-dt*12);if(s.speed<.3)return;const freq=s.speed>5?12:8,amp=(a.type==='horse'||a.type==='camel')?.065:.035;a.mesh.position.y=W.groundY(a.mesh.position.x,a.mesh.position.z)+Math.abs(Math.sin(t*freq+s.phase))*amp}
function mountedMotion(t){if(typeof mounted==='undefined'||!mounted||!mount)return;player.actor.position.y=mount.type==='camel'?1.95:1.60;player.actor.rotation.z=0;player.actor.rotation.x=0}
let last=performance.now();function loop(now){const dt=Math.min(.045,(now-last)/1000||0);last=now;const t=now/1000;S.time=t;for(const e of people())humanoid(e,dt,t);for(const a of animals())animateAnimal(a,dt,t);mountedMotion(t);requestAnimationFrame(loop)}requestAnimationFrame(loop);window.WildernessAnimations16=S;
})();