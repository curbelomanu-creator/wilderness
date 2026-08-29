// Wilderness 5.10.5 - continuous Jerusalem roads and one clean protagonist render
(()=>{
const T=window.THREE,W=window.WildernessWorld,H=window.WildernessHistorical52;
if(!T||!W||typeof scene==='undefined'||typeof player==='undefined'||!player.actor)return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
// ---------- Continuous Jerusalem roads ----------
const city=H?.byId?.get?.('hist-jerusalem')||H?.cities?.find?.(c=>c.historicalId==='jerusalem');
const roadGroup=new T.Group();roadGroup.name='jerusalem5105-roads';roadGroup.userData.noCollision=true;scene.add(roadGroup);
const roadMat=new T.MeshLambertMaterial({color:0xa99573,flatShading:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
function gy(x,z){return W.groundY(x,z)}
function ribbon(x1,z1,x2,z2,width,step=1.6){const dx=x2-x1,dz=z2-z1,len=Math.max(.001,Math.hypot(dx,dz)),n=Math.max(2,Math.ceil(len/(mobile?2.4:step))),px=-dz/len*width/2,pz=dx/len*width/2,v=[],ind=[];for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t;for(const s of[-1,1]){const xx=x+px*s,zz=z+pz*s;v.push(xx,gy(xx,zz)+.065,zz)}}for(let i=0;i<n;i++){const a=i*2,b=a+1,c=a+2,d=c+1;ind.push(a,c,b,b,c,d)}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(v,3));geo.setIndex(ind);geo.computeVertexNormals();const q=new T.Mesh(geo,roadMat);q.receiveShadow=true;q.userData.noCollision=true;q.userData.jerusalemRoad5105=true;roadGroup.add(q);return q}
function hideTileRoads(){const g=scene.getObjectByName('jerusalem54');if(!g)return 0;let n=0;g.traverse(o=>{if(!o?.isMesh||!o.geometry?.parameters)return;const p=o.geometry.parameters,h=Number(p.height),w=Number(p.width),d=Number(p.depth),c=o.material?.color?.getHex?.();if(c===0xab9879&&h<=.08&&Math.max(w,d)<=8.3&&Math.min(w,d)<=4.3){o.visible=false;n++}});return n}
let hiddenRoadTiles=hideTileRoads();
if(city){const cx=city.x,cz=city.z,J=window.WildernessJerusalem54,tx=J?.anchors?.temple?.x??cx+38,tz=J?.anchors?.temple?.z??cz+62;[
 [cx,cz-98,cx,cz+78,7.5],[cx-94,cz-8,cx+94,cz-8,6.6],[cx-48,cz-86,cx-48,cz+72,4.5],[cx+42,cz-80,cx+42,cz+34,4.5],[cx-82,cz+38,cx+78,cz+38,4.3],[cx+2,cz+26,tx,tz-20,5.5],[cx+95,cz+12,cx+15,cz+5,5.2],[cx+6,cz+31,tx,tz-19,6.2]
 ].forEach(r=>ribbon(...r))}
// ---------- One clean protagonist model ----------
const actor=player.actor;
for(const c of [...actor.children])c.visible=false;
const root=new T.Group();root.name='hero5105-clean';actor.add(root);
const mat=(c)=>new T.MeshLambertMaterial({color:c,flatShading:true});
const M={linen:mat(0xd8c49b),linen2:mat(0xb99b70),skin:mat(0xa87555),hair:mat(0x2b1b12),leather:mat(0x5e3d29),red:mat(0x754238),bronze:mat(0xa9793c),steel:mat(0xcbd0cb),edge:mat(0xeee9da),wood:mat(0x51341f),dark:mat(0x241914)};
function box(p,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
function cyl(p,r,h,m,x,y,z,seg=6){const q=new T.Mesh(new T.CylinderGeometry(r,r,h,seg),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
// Torso and simple robe: intentionally few layers so nothing reads as duplicated geometry.
const torso=box(root,1.12,1.34,.72,M.linen,0,1.62,0);box(root,1.18,.18,.78,M.leather,0,1.30,0);
const skirtL=box(root,.52,1.08,.68,M.linen2,-.27,.62,0),skirtR=box(root,.52,1.08,.68,M.linen2,.27,.62,0);
const cape=box(root,.92,1.34,.09,M.red,0,1.65,-.42);cape.rotation.x=-.055;
// Head and compact head covering.
box(root,.66,.66,.60,M.skin,0,2.88,.02);box(root,.70,.22,.62,M.hair,0,3.17,0);box(root,.82,.15,.72,M.linen2,0,3.29,0);box(root,.15,.50,.10,M.linen2,-.32,3.02,-.28);box(root,.15,.46,.10,M.linen2,.32,3.04,-.28);box(root,.10,.07,.035,M.dark,-.15,2.97,.325);box(root,.10,.07,.035,M.dark,.15,2.97,.325);
// Fresh animation pivots replace all old visible limb layers.
const arms=new T.Group(),left=new T.Group(),right=new T.Group();left.position.set(-.58,2.16,0);right.position.set(.58,2.16,0);arms.add(left,right);root.add(arms);
for(const a of[left,right]){box(a,.30,.96,.30,M.skin,0,-.50,0);box(a,.36,.42,.36,M.linen,0,-.18,0);box(a,.34,.22,.34,M.leather,0,-.70,0)}
const legs=new T.Group(),legL=new T.Group(),legR=new T.Group();legL.position.set(-.24,1.02,0);legR.position.set(.24,1.02,0);legs.add(legL,legR);root.add(legs);
for(const l of[legL,legR]){box(l,.32,.90,.34,M.linen2,0,-.46,0);box(l,.36,.20,.48,M.leather,0,-.91,.10)}
player.__arms15={left,right};player.__legs15={left:legL,right:legR};
// Weapon visuals belong only to the clean right hand. Legacy weapon groups remain hidden.
const sword=new T.Group();sword.name='hero5105-sword';right.add(sword);sword.position.set(.02,-1.10,.09);sword.rotation.set(1.08,0,-.10);cyl(sword,.085,.45,M.leather,0,0,0,8);box(sword,.55,.10,.15,M.bronze,0,.27,0);box(sword,.15,1.62,.08,M.steel,0,1.10,0);box(sword,.032,1.52,.09,M.edge,.07,1.10,0);const tip=box(sword,.12,.31,.07,M.steel,0,2.03,0);tip.rotation.z=Math.PI/4;box(sword,.17,.14,.17,M.bronze,0,-.28,0);
const staff=new T.Group();staff.name='hero5105-staff';right.add(staff);staff.position.set(.04,-.98,.10);staff.rotation.set(.36,0,-.16);cyl(staff,.07,2.65,M.wood,0,-.38,0,8);cyl(staff,.09,.20,M.bronze,0,.98,0,8);
player.__hero43={hero:root,torso,skirtL,skirtR,cape,sword,staff};player.__hero5105={root,arms,legs,sword,staff};
function weaponMode(){return player.__weapons15?.mode||player.__weapon15||'staff'}
function enforceSingle(){for(const c of actor.children)c.visible=(c===root);const mode=weaponMode();sword.visible=mode==='sword';staff.visible=mode!=='sword'}
let lastCheck=0;function loop(t){if(t-lastCheck>450){lastCheck=t;hiddenRoadTiles+=hideTileRoads()}enforceSingle();requestAnimationFrame(loop)}enforceSingle();requestAnimationFrame(loop);
window.WildernessPolish5105={roadGroup,hero:root,hiddenRoadTiles:()=>hiddenRoadTiles,ribbon};
})();