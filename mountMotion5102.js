// Wilderness 5.10.2 - animated horse/camel gait, head motion and stable seated riding
(()=>{
const T=window.THREE,W=window.WildernessWorld,A44=window.WildernessAnimals44;
if(!T||!W||!A44||typeof player==='undefined')return;
const rigs=new WeakMap(),mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
function dims(o){const p=o?.geometry?.parameters;return p&&Number.isFinite(p.width)?{w:p.width,h:p.height,d:p.depth}:null}
function setup(a){
 if(!a?.mesh||!(a.type==='horse'||a.type==='camel'))return null;
 A44.enhance?.(a);if(rigs.has(a))return rigs.get(a);
 const g=a.__animal44;if(!g)return null;const camel=a.type==='camel';
 const children=[...g.children],legs=[],hooves=[];
 for(const o of children){if(!o?.isMesh)continue;const s=dims(o);if(!s)continue;const ax=Math.abs(o.position.x),az=Math.abs(o.position.z);
   const isLeg=ax>.34&&az>.54&&s.w<.38&&s.d<.42&&s.h>(camel?1.85:1.45)&&s.h<(camel?2.25:1.9)&&o.position.y<1.35;
   const isHoof=ax>.34&&az>.54&&s.w<.42&&s.d<.58&&s.h<.28&&o.position.y<.25;
   if(isLeg)legs.push({o,s});else if(isHoof)hooves.push({o,s});
 }
 const pivots=[];
 for(const L of legs){const old=L.o.position.clone(),top=old.y+L.s.h/2,p=new T.Group();p.name='mount5102-leg';p.position.set(old.x,top,old.z);g.add(p);g.remove(L.o);p.add(L.o);L.o.position.set(0,-L.s.h/2,0);
   let best=null,bd=Infinity;for(const H of hooves){if(H.used)continue;const d=Math.hypot(H.o.position.x-old.x,H.o.position.z-old.z);if(d<bd){bd=d;best=H}}if(best&&bd<.35){const hp=best.o.position.clone();best.used=true;g.remove(best.o);p.add(best.o);best.o.position.copy(hp).sub(p.position)}
   pivots.push({p,x:old.x,z:old.z});
 }
 const headPivot=new T.Group();headPivot.name='mount5102-head';const headBase=new T.Vector3(0,camel?2.55:2.18,.82);headPivot.position.copy(headBase);g.add(headPivot);
 const headParts=[...g.children].filter(o=>o!==headPivot&&o?.isMesh&&o.position.z>.84&&o.position.y>(camel?2.30:2.20));
 for(const o of headParts){const pos=o.position.clone();g.remove(o);headPivot.add(o);o.position.copy(pos).sub(headBase)}
 let tail=null,tailBase=0;for(const o of g.children){if(!o?.isMesh)continue;const s=dims(o);if(s&&o.position.z<-1.35&&s.w<.25&&s.d<.32&&s.h>.8){tail=o;tailBase=o.rotation.x;break}}
 const rig={g,pivots,headPivot,headBase,tail,tailBase,prev:a.mesh.position.clone(),speed:0,phase:Math.random()*Math.PI*2,bob:0};rigs.set(a,rig);a.__mountMotion5102=rig;return rig
}
function animate(a,rig,dt,now){
 const p=a.mesh.position,dx=p.x-rig.prev.x,dz=p.z-rig.prev.z,instant=Math.min(12,Math.hypot(dx,dz)/Math.max(.001,dt));rig.prev.copy(p);rig.speed+=(instant-rig.speed)*Math.min(1,dt*7);
 const moving=rig.speed>.12;if(moving)rig.phase+=dt*(2.2+rig.speed*.78);const motion=Math.min(1,rig.speed/6.2),amp=moving?(.12+.43*motion):.025;
 for(const L of rig.pivots){const offset=L.x*L.z>0?0:Math.PI,target=(moving?Math.sin(rig.phase+offset)*amp:Math.sin(now*.0012+offset)*.018);L.p.rotation.x+=(target-L.p.rotation.x)*Math.min(1,dt*13)}
 const nod=(moving?Math.sin(rig.phase*.52+.35)*(.035+.09*motion):Math.sin(now*.00135)*.026);rig.headPivot.rotation.x+=(nod-rig.headPivot.rotation.x)*Math.min(1,dt*7);rig.headPivot.position.z=rig.headBase.z+(moving?Math.sin(rig.phase*.52)*.055*motion:Math.sin(now*.0011)*.015);
 if(rig.tail)rig.tail.rotation.x=rig.tailBase+Math.sin((moving?rig.phase*.7:now*.001)+1.1)*(moving?.09:.035);
 rig.bob=moving?Math.abs(Math.sin(rig.phase*2))*.035*motion:Math.sin(now*.0014)*.006;rig.g.position.y=rig.bob;
}
function seatedPose(){
 if(typeof mounted==='undefined'||!mounted||!mount||(mount.type!=='horse'&&mount.type!=='camel'))return;
 const rig=setup(mount),base=W.groundY(mount.mesh.position.x,mount.mesh.position.z),seat=mount.__seat44||(mount.type==='camel'?3.40:2.57);
 player.mesh.position.x=mount.mesh.position.x;player.mesh.position.z=mount.mesh.position.z;player.mesh.position.y=base+seat+(rig?.bob||0)+.04;
 // Torso bottom rests just above the saddle; legs wrap around the animal instead of entering its body.
 player.actor.position.y=-.80;
 if(player.__hero43?.skirtL){player.__hero43.skirtL.visible=false;player.__hero43.skirtR.visible=false}
 if(player.__legs15){player.__legs15.left.rotation.x=1.06;player.__legs15.right.rotation.x=1.06;player.__legs15.left.rotation.z=-.58;player.__legs15.right.rotation.z=.58;player.__legs15.left.rotation.y=-.12;player.__legs15.right.rotation.y=.12}
}
function scan(){if(typeof livestock==='undefined')return;for(const a of livestock)if(a?.alive&&(a.type==='horse'||a.type==='camel'))setup(a)}
let last=performance.now(),scanClock=0;function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;scanClock+=dt;if(scanClock>.7){scanClock=0;scan()}if(typeof livestock!=='undefined')for(const a of livestock){if(!a?.alive||!(a.type==='horse'||a.type==='camel'))continue;const r=setup(a);if(r)animate(a,r,dt,now)}seatedPose();requestAnimationFrame(loop)}scan();requestAnimationFrame(loop);
window.WildernessMountMotion5102={rigs,setup,scan,seatedPose};
})();