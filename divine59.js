// Wilderness 5.9 - Divine Manifestations: sky light, giant angel, ability-specific celestial effects
(()=>{
const T=window.THREE,W=window.WildernessWorld,F=window.WildernessFavor58,S57=window.WildernessSiege57,D55=window.WildernessDiplomacy55,J=window.WildernessJerusalem54,S46=window.WildernessSettlement46;
if(!T||!W||!F||typeof scene==='undefined'||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820,KEY=`wilderness59:${W.seedToken}`;
const V={active:null,lastId:null,lastAt:0,pendingBreachUntil:0,miraculousBreaches:new Set()};
try{const d=JSON.parse(localStorage.getItem(KEY)||'null');for(const id of d?.miraculousBreaches||[])V.miraculousBreaches.add(id)}catch(_){ }
function save(){try{localStorage.setItem(KEY,JSON.stringify({miraculousBreaches:[...V.miraculousBreaches]}))}catch(_){ }}
addEventListener('pagehide',save);
const addMat=(c,o=.8)=>new T.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide});
const MAT={white:addMat(0xfff4c7,.82),gold:addMat(0xffd56f,.76),pale:addMat(0xdcecff,.62),wing:addMat(0xfff1bd,.58),beam:addMat(0xffefaa,.24),dust:addMat(0xd7b57b,.72)};
function flash59(t,m=2400){if(typeof flash==='function')flash(t,m)}
function gY(x,z){return W.groundY(x,z)}
function box(g,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m.clone?m.clone():m);q.position.set(x,y,z);q.userData.divine59=true;g.add(q);return q}
function cyl(g,r1,r2,h,m,x,y,z,seg=10){const q=new T.Mesh(new T.CylinderGeometry(r1,r2,h,seg,1,true),m.clone?m.clone():m);q.position.set(x,y,z);q.userData.divine59=true;g.add(q);return q}
function currentTarget(id){
 if(id==='breach'){
   const st=S57?.state?.active;if(st){const gs=[...(D55?.state?.gates?.values?.()||[])].filter(g=>g.settlementId===st.id);let gate=null,bd=Infinity;for(const g of gs){const d=Math.hypot(player.mesh.position.x-g.root.position.x,player.mesh.position.z-g.root.position.z);if(d<bd){bd=d;gate=g}}if(gate)return{x:gate.root.position.x,z:gate.root.position.z,y:gY(gate.root.position.x,gate.root.position.z),st,gate};return{x:st.s.x,z:st.s.z,y:gY(st.s.x,st.s.z),st}}
 }
 return{x:player.mesh.position.x,z:player.mesh.position.z,y:gY(player.mesh.position.x,player.mesh.position.z)}
}
function angelModel(){
 const a=new T.Group();a.name='divine59-angel';
 const robe=new T.Mesh(new T.ConeGeometry(2.0,7.8,7),MAT.white.clone());robe.position.y=-1.8;a.add(robe);
 box(a,2.7,3.5,1.35,MAT.gold,0,2.0,0);
 const head=new T.Mesh(new T.SphereGeometry(1.05,8,6),MAT.white.clone());head.position.y=4.45;a.add(head);
 const halo=new T.Mesh(new T.TorusGeometry(1.5,.12,6,20),MAT.gold.clone());halo.position.y=5.65;halo.rotation.x=Math.PI/2;a.add(halo);
 for(const side of[-1,1]){
   const wing=new T.Group();wing.position.set(side*1.15,2.2,.15);wing.rotation.z=side*-.23;a.add(wing);
   for(let i=0;i<6;i++){const feather=box(wing,1.55+.34*i,.42,5.8-.48*i,MAT.wing,side*(1.2+i*.82),-.2-i*.35,-.18);feather.rotation.z=side*(.34+.06*i);feather.rotation.y=side*.13}
 }
 for(const side of[-1,1]){const arm=box(a,.42,4.3,.42,MAT.gold,side*1.72,1.15,.1);arm.rotation.z=side*.52}
 a.scale.setScalar(mobile?1.08:1.22);return a
}
function groundRing(root,r=9){const q=new T.Mesh(new T.RingGeometry(r*.82,r,32),MAT.gold.clone());q.rotation.x=-Math.PI/2;q.position.y=.12;root.add(q);return q}
function sparks(root,n=18,r=10){const arr=[];for(let i=0;i<n;i++){const q=box(root,.18,.18,.18,i%3?MAT.gold:MAT.white,0,0,0);const a=i*2.399,r0=2+(i%7)/7*r;q.userData.seed={a,r:r0,y:(i%5)*1.2,sp:.45+(i%4)*.15};arr.push(q)}return arr}
function allyColumns(root){const es=[player,...(typeof followers!=='undefined'?followers.filter(f=>f?.alive&&f.mesh).slice(0,mobile?7:14):[])],cols=[];for(const e of es){const m=cyl(root,.38,.75,10,MAT.pale,0,5,0,8);m.userData.follow=e;cols.push(m)}return cols}
function shockwave(root){const q=new T.Mesh(new T.RingGeometry(2.2,2.7,32),MAT.white.clone());q.rotation.x=-Math.PI/2;q.position.y=.2;root.add(q);return q}
function swirl(root){const arr=[];for(let i=0;i<3;i++){const q=new T.Mesh(new T.TorusGeometry(6+i*2.2,.18,6,32),i===1?MAT.pale.clone():MAT.gold.clone());q.position.y=2+i*2.4;q.rotation.set(Math.PI/2+i*.24,i*.7,0);root.add(q);arr.push(q)}return arr}
function titleFor(id){return({fortitude:'FORTALEZA',fear:'TEMOR',restore:'RESTAURACIÓN',confusion:'CONFUSIÓN',breach:'DERRIBAR MURALLA'})[id]||String(id).toUpperCase()}
const banner=document.createElement('div');banner.id='divine59banner';document.body.appendChild(banner);
const css=document.createElement('style');css.textContent=`#divine59banner{position:fixed;z-index:190;left:50%;top:24%;transform:translate(-50%,-50%);display:none;pointer-events:none;color:#fff6ce;text-align:center;font:900 12px/1.35 ui-monospace,monospace;letter-spacing:.14em;text-shadow:0 2px 8px #000,0 0 18px #ffe69a}#divine59banner b{display:block;font-size:20px;letter-spacing:.08em}@media(pointer:coarse),(max-width:820px){#divine59banner{top:19%;font-size:8px;max-width:80vw}#divine59banner b{font-size:14px}}`;document.head.appendChild(css);
function showBanner(id){banner.innerHTML=`FAVOR DE ELOHIM<b>${titleFor(id)}</b>`;banner.style.display='block'}
function hideBanner(){banner.style.display='none'}
function restoreSky(a){if(a.baseBg&&scene.background?.copy)scene.background.copy(a.baseBg);if(scene.fog&&a.baseFogColor){scene.fog.color.copy(a.baseFogColor);if(a.baseFogDensity!=null&&'density'in scene.fog)scene.fog.density=a.baseFogDensity}}
function cleanup(){const a=V.active;if(!a)return;restoreSky(a);if(a.root)scene.remove(a.root);hideBanner();V.active=null}
function begin(id,{pre=false}={}){
 const now=performance.now();if(V.active)cleanup();const target=currentTarget(id),root=new T.Group();root.name=`divine59-${id}`;root.position.set(target.x,target.y,target.z);scene.add(root);
 const angel=angelModel();angel.position.set(0,id==='breach'?45:38,0);root.add(angel);
 const beamH=id==='breach'?47:40,beam=cyl(root,id==='breach'?4.8:3.3,id==='breach'?10:7,beamH,MAT.beam,0,beamH/2,0,16),ring=groundRing(root,id==='breach'?13:9),spark=sparks(root,mobile?12:22,id==='breach'?15:10);
 const light=new T.PointLight(0xffe7a0,id==='breach'?5.8:4.2,id==='breach'?135:90,1.8);light.position.set(0,id==='breach'?22:18,0);root.add(light);
 const skyDisk=new T.Mesh(new T.CircleGeometry(id==='breach'?28:22,32),MAT.pale.clone());skyDisk.rotation.x=Math.PI/2;skyDisk.position.y=id==='breach'?48:41;skyDisk.material.opacity=.13;root.add(skyDisk);
 const a={id,target,root,angel,beam,ring,spark,light,skyDisk,start:now,duration:id==='breach'?6500:5200,baseBg:scene.background?.clone?.()||null,baseFogColor:scene.fog?.color?.clone?.()||null,baseFogDensity:scene.fog&&'density'in scene.fog?scene.fog.density:null,cols:null,wave:null,swirls:null,pre};
 if(id==='fortitude'||id==='restore')a.cols=allyColumns(root);if(id==='fear')a.wave=shockwave(root);if(id==='confusion')a.swirls=swirl(root);
 V.active=a;showBanner(id);V.lastId=id;V.lastAt=now;return a
}
function sizeOf(o){const b=new T.Box3().setFromObject(o),s=new T.Vector3();b.getSize(s);return s}
function worldXZ(o){const p=new T.Vector3();o.getWorldPosition(p);return p}
function hideWallNearGroup(group,x,z,r=13){if(!group)return 0;group.updateMatrixWorld(true);let n=0;for(const o of group.children){if(!o?.visible)continue;const p=worldXZ(o),d=Math.hypot(p.x-x,p.z-z);if(d>r)continue;let s;try{s=sizeOf(o)}catch(_){continue}if(s.y<5.4||Math.max(s.x,s.z)<4.2)continue;o.visible=false;o.userData.divine59Collapsed=true;n++}return n}
function collapseVisual(st,target){if(!st||!target)return;V.miraculousBreaches.add(st.id);save();let n=0;const normal=S46?.state?.built?.get?.(st.id);n+=hideWallNearGroup(normal,target.x,target.z,14);if(st.id==='hist-jerusalem'||st.s?.special==='jerusalem')n+=hideWallNearGroup(J?.group,target.x,target.z,16);window.WildernessCollision45?.rebuild?.();const rg=new T.Group();rg.name=`divine59-collapse-${st.id}`;rg.position.set(target.x,gY(target.x,target.z),target.z);for(let i=0;i<(mobile?18:34);i++){const q=box(rg,.5+(i%4)*.28,.35+(i%3)*.18,.55+((i+2)%4)*.25,MAT.dust,0,0,0);const a=i*2.17,rr=1.5+(i%8)*.7;q.position.set(Math.sin(a)*rr,.4+(i%5)*.55,Math.cos(a)*rr);q.rotation.set(i*.13,i*.29,i*.17);q.userData.vx=Math.sin(a)*(2.5+(i%5)*.5);q.userData.vz=Math.cos(a)*(2.5+(i%4)*.5);q.userData.vy=3+(i%6)*.8}scene.add(rg);const t0=performance.now();function debris(t){const dt=Math.min(.05,(t-(rg.userData.last||t))/1000);rg.userData.last=t;const u=(t-t0)/2600;for(const q of rg.children){q.userData.vy-=9.8*dt;q.position.x+=q.userData.vx*dt;q.position.z+=q.userData.vz*dt;q.position.y=Math.max(.18,q.position.y+q.userData.vy*dt);if(q.material?.opacity!=null)q.material.opacity=Math.max(0,.72-u*.72)}if(u<1)requestAnimationFrame(debris);else scene.remove(rg)}requestAnimationFrame(debris);if(n)flash59('La muralla se derrumba y deja la ciudad expuesta.',3300)}
function restorePersistedCollapse(){for(const id of V.miraculousBreaches){const st=S57?.state?.states?.get?.(id);if(!st)continue;const gs=[...(D55?.state?.gates?.values?.()||[])].filter(g=>g.settlementId===id);const g=gs[0];if(g)collapsePersistedOnly(st,g.root.position)}}
const persistedDone=new Set();function collapsePersistedOnly(st,p){if(persistedDone.has(st.id))return;persistedDone.add(st.id);hideWallNearGroup(S46?.state?.built?.get?.(st.id),p.x,p.z,14);if(st.id==='hist-jerusalem'||st.s?.special==='jerusalem')hideWallNearGroup(J?.group,p.x,p.z,16);window.WildernessCollision45?.rebuild?.()}
function animate(now){const a=V.active;if(!a)return;const u=Math.min(1,(now-a.start)/a.duration),fadeIn=Math.min(1,u/.15),fadeOut=u>.72?Math.max(0,(1-u)/.28):1,alpha=Math.min(fadeIn,fadeOut);const skyTarget=new T.Color(a.id==='fear'||a.id==='confusion'?0x7d8297:0xc5b77f);if(a.baseBg&&scene.background?.copy){scene.background.copy(a.baseBg).lerp(skyTarget,.48*alpha)}if(scene.fog&&a.baseFogColor){scene.fog.color.copy(a.baseFogColor).lerp(skyTarget,.28*alpha);if(a.baseFogDensity!=null&&'density'in scene.fog)scene.fog.density=a.baseFogDensity*(1-.18*alpha)}
 a.angel.position.y+=(Math.sin(now*.0016)*.006);a.angel.rotation.y=Math.atan2(camera.position.x-a.root.position.x,camera.position.z-a.root.position.z);const wingPulse=.96+Math.sin(now*.0022)*.045;a.angel.scale.x=(mobile?1.08:1.22)*wingPulse;
 a.beam.material.opacity=.12+.22*alpha*(.7+.3*Math.sin(now*.009));a.ring.material.opacity=.2+.5*alpha;a.ring.scale.setScalar(1+u*(a.id==='fear'?2.9:.35));a.skyDisk.material.opacity=.07+.11*alpha;a.light.intensity=(a.id==='breach'?5.8:4.2)*alpha;
 for(const q of a.spark){const s=q.userData.seed,ang=s.a+now*.00045*s.sp;q.position.set(Math.cos(ang)*s.r,s.y+2+Math.sin(now*.002+s.a)*2.4,Math.sin(ang)*s.r);q.material.opacity=.25+.55*alpha}
 if(a.cols)for(const c of a.cols){const e=c.userData.follow;if(e?.mesh){c.position.set(e.mesh.position.x-a.root.position.x,5,e.mesh.position.z-a.root.position.z);c.material.opacity=.12+.28*alpha}}
 if(a.wave){a.wave.scale.setScalar(1+u*7.5);a.wave.material.opacity=Math.max(0,.65*(1-u))}
 if(a.swirls)for(let i=0;i<a.swirls.length;i++){a.swirls[i].rotation.y+=.018*(i+1);a.swirls[i].rotation.z-=.009*(i+1);a.swirls[i].material.opacity=.18+.34*alpha}
 if(u>=1)cleanup()
}
// The Favor UI uses a local useAbility function. Capture successful button invocations without changing 5.8 internals.
function abilityPointer(e){const b=e.target?.closest?.('#favor58abilities [data-a]');if(!b||b.disabled)return;const id=b.dataset.a,a=F.abilities?.[id];if(!a)return;const before=F.favor?.()??0;if(before<a.cost)return;if(id==='breach'){V.pendingBreachUntil=performance.now()+700;begin('breach',{pre:true})}setTimeout(()=>{const after=F.favor?.()??before;if(after<=before-a.cost+.01&&id!=='breach')begin(id)},30)}
document.addEventListener('pointerdown',abilityPointer,true);
// External callers through the public API receive the same presentation.
const publicUse=F.useAbility?.bind(F);if(publicUse){F.useAbility=function(id){const before=F.favor?.()??0,ok=publicUse(id),after=F.favor?.()??before;if(ok&&after<before&&id!=='breach')begin(id);return ok}}
// Favor's miraculous breach is delayed until the celestial manifestation reaches its impact beat.
const baseBreach=S57?.breachGate?.bind(S57);if(baseBreach){S57.breachGate=function(st,announce=true){if(performance.now()<V.pendingBreachUntil){const target=currentTarget('breach');V.pendingBreachUntil=0;setTimeout(()=>{baseBreach(st,announce);collapseVisual(st,target);if(V.active?.id==='breach'){V.active.light.intensity=9;V.active.ring.scale.setScalar(2.2)}},1450);return true}return baseBreach(st,announce)}}
// Make the diplomacy panel acknowledge an existing breach instead of saying only ABIERTA.
function syncBreachLabel(){const st=S57?.state?.active;if(!st?.breached)return;const info=document.getElementById('d55info');if(info)info.innerHTML=info.innerHTML.replace(/Puerta: <b>(?:ABIERTA|ABRIÉNDOSE|CERRADA|CERRÁNDOSE)<\/b>/,'Puerta: <b>BRECHA</b>')}
let last=performance.now(),persist=0;function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;try{animate(now);syncBreachLabel();persist+=dt;if(persist>1.1){persist=0;restorePersistedCollapse()}}catch(e){console.warn('Wilderness 5.9 divine',e)}requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessDivine59={state:V,begin,cleanup,collapseVisual,restorePersistedCollapse};
})();