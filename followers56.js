// Wilderness 5.6 - robust recruited follower navigation using player breadcrumbs
(()=>{
const T=window.THREE,W=window.WildernessWorld;if(!T||!W||typeof player==='undefined'||typeof followers==='undefined'||typeof updateFollowers!=='function')return;
const F={trail:[],lastPlayer:null,stuck:new WeakMap(),regroups:0};
const tmp=new T.Vector3(),tmp2=new T.Vector3();
function alive(){return followers.filter(f=>f&&f.alive!==false&&f.mesh)}
function blocked(x,z,r=.5){const C=window.WildernessCollision45;if(!C?.staticBlocked)return false;tmp.set(x,W.groundY(x,z),z);return C.staticBlocked(tmp,r)}
function rememberTrail(){const p=player.mesh.position;if(!F.lastPlayer){F.lastPlayer=p.clone();F.trail=[p.clone()];return}const d2=(p.x-F.lastPlayer.x)**2+(p.z-F.lastPlayer.z)**2;if(d2<5.8)return;F.lastPlayer.copy(p);const q=p.clone();q.y=W.groundY(q.x,q.z);F.trail.unshift(q);if(F.trail.length>90)F.trail.length=90}
function trailTarget(rank,distToPlayer){if(!F.trail.length)return player.mesh.position;let idx=distToPlayer>38?Math.min(F.trail.length-1,2+Math.floor(rank/3)):Math.min(F.trail.length-1,4+Math.floor(rank/2));return F.trail[idx]||F.trail[F.trail.length-1]||player.mesh.position}
function nearestEnemy56(e,max){if(typeof enemies==='undefined')return null;let best=null,bd=max;for(const x of enemies){if(!x?.alive||!x.mesh)continue;const d=Math.hypot(x.mesh.position.x-e.mesh.position.x,x.mesh.position.z-e.mesh.position.z);if(d<bd){bd=d;best=x}}return best}
function move56(e,target,dt,speed,stop=.9){const p=e.mesh.position,dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz);if(d<=stop)return d;const nx=dx/d,nz=dz/d,step=Math.min(d-stop,speed*dt),r=e.role==='cavalry'?.72:.48;const tries=[[nx,nz],[nx*.72-nz*.70,nz*.72+nx*.70],[nx*.72+nz*.70,nz*.72-nx*.70],[-nz,nx],[nz,-nx]];let moved=false;for(const [ax,az] of tries){const l=Math.hypot(ax,az)||1,x=p.x+ax/l*step,z=p.z+az/l*step;if(blocked(x,z,r))continue;p.x=x;p.z=z;e.mesh.rotation.y=Math.atan2(ax,az);moved=true;break}p.y=W.groundY(p.x,p.z);return moved?d:-d}
function separation56(f,living,dt){let px=0,pz=0;for(const o of living){if(o===f)continue;const dx=f.mesh.position.x-o.mesh.position.x,dz=f.mesh.position.z-o.mesh.position.z,d2=dx*dx+dz*dz;if(d2>.02&&d2<2.45){const inv=1/Math.sqrt(d2);px+=dx*inv;pz+=dz*inv}}const l=Math.hypot(px,pz);if(l>.01){const x=f.mesh.position.x+px/l*dt*1.15,z=f.mesh.position.z+pz/l*dt*1.15;if(!blocked(x,z,.48)){f.mesh.position.x=x;f.mesh.position.z=z;f.mesh.position.y=W.groundY(x,z)}}}
function formationTarget56(f,living){if(typeof formationOffset==='function'){try{return formationOffset(f,living)}catch(_){}}
 const i=living.indexOf(f),row=Math.floor(i/4),col=i%4,yaw=player.mesh.rotation.y,fx=Math.sin(yaw),fz=Math.cos(yaw),rx=fz,rz=-fx;return new T.Vector3(player.mesh.position.x+rx*(col-1.5)*1.7-fx*(4+row*2),0,player.mesh.position.z+rz*(col-1.5)*1.7-fz*(4+row*2))}
function regroup56(f,rank){const candidates=[trailTarget(rank,40),...F.trail.slice(2,18)];for(const q of candidates){if(!q)continue;for(const off of [[0,0],[1.2,0],[-1.2,0],[0,1.2],[0,-1.2]]){const x=q.x+off[0],z=q.z+off[1];if(blocked(x,z,.55))continue;f.mesh.position.set(x,W.groundY(x,z),z);F.regroups++;return true}}return false}
function combat56(f,living,dt){f.cooldown=Math.max(0,(f.cooldown||0)-dt);const attack=f.order==='attack',hold=f.order==='hold';const detect=attack?(f.role==='archer'?58:44):hold?(f.role==='archer'?20:11):(f.role==='archer'?18:9);const target=nearestEnemy56(f,detect);if(!target)return false;const d=Math.hypot(f.mesh.position.x-target.mesh.position.x,f.mesh.position.z-target.mesh.position.z);if(f.role==='archer'){
  if(d<6){tmp2.subVectors(f.mesh.position,target.mesh.position);tmp2.y=0;if(tmp2.lengthSq()<.01)tmp2.set(1,0,0);tmp2.normalize();move56(f,{x:f.mesh.position.x+tmp2.x*4,z:f.mesh.position.z+tmp2.z*4},dt,4.8,.2)}
  else if(attack&&d>16)move56(f,target.mesh.position,dt,4.6,14);
  if(d<22&&f.cooldown<=0&&typeof fireArrow==='function'){fireArrow(f,target,true);f.cooldown=1.25+(living.indexOf(f)%5)*.08}
 }else{
  if(d>2.1)move56(f,target.mesh.position,dt,f.role==='cavalry'?7.4:5.2,1.65);
  if(d<2.7&&f.cooldown<=0&&typeof damage==='function'){damage(target,f.role==='cavalry'?1.7:1.15);f.cooldown=f.role==='cavalry'?.72:.92}
 }return true}
const previous56=updateFollowers;
updateFollowers=function(dt){
 rememberTrail();const living=alive();if(!living.length)return;
 for(let rank=0;rank<living.length;rank++){
   const f=living[rank];
   if(f.retreat>0||f.order==='retreat'){f.retreat=Math.max(0,(f.retreat||0)-dt);move56(f,player.mesh.position,dt,f.role==='cavalry'?7.8:5.8,5+(rank%4));if(f.retreat<=0)f.order='follow';separation56(f,living,dt);continue}
   if(combat56(f,living,dt)){separation56(f,living,dt);continue}
   if(f.order==='hold'){if(!f.holdPos)f.holdPos=f.mesh.position.clone();move56(f,f.holdPos,dt,4.1,.75);separation56(f,living,dt);continue}
   const dp=Math.hypot(f.mesh.position.x-player.mesh.position.x,f.mesh.position.z-player.mesh.position.z);
   const peopleFollow=typeof followMode==='undefined'||followMode==='people'||followMode==='all'||f.order==='follow';
   if(!peopleFollow){separation56(f,living,dt);continue}
   const target=dp>13?trailTarget(rank,dp):formationTarget56(f,living);const beforeX=f.mesh.position.x,beforeZ=f.mesh.position.z;
   move56(f,target,dt,f.role==='cavalry'?(dp>30?9.2:6.7):(dp>30?7.4:5.0),dp>13?1.25:1.0);
   const moved=Math.hypot(f.mesh.position.x-beforeX,f.mesh.position.z-beforeZ),need=Math.hypot(target.x-f.mesh.position.x,target.z-f.mesh.position.z);let st=F.stuck.get(f)||{t:0,lastX:f.mesh.position.x,lastZ:f.mesh.position.z};st.t=(moved<.025&&need>2.5)?st.t+dt:Math.max(0,st.t-dt*2.4);st.lastX=f.mesh.position.x;st.lastZ=f.mesh.position.z;F.stuck.set(f,st);
   if((st.t>3.6&&dp>24)||dp>118){if(regroup56(f,rank))st.t=0}
   separation56(f,living,dt);
 }
};
window.WildernessFollowers56={state:F,rememberTrail,regroup:regroup56,previous:previous56};
})();