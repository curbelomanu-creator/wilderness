// Wilderness 4.3.1 - single clean main-warrior model, no stacked legacy visuals
(()=>{
const T=window.THREE;if(!T||typeof player==='undefined'||!player?.actor)return;
const a=player.actor,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const skinMat=(typeof mats!=='undefined'&&mats.skin)?mats.skin:new T.MeshLambertMaterial({color:0xa87555,flatShading:true});
const M={linen:new T.MeshLambertMaterial({color:0xc8ad7b,flatShading:true}),cream:new T.MeshLambertMaterial({color:0xe0c99b,flatShading:true}),red:new T.MeshLambertMaterial({color:0x713c32,flatShading:true}),leather:new T.MeshLambertMaterial({color:0x563523,flatShading:true}),leather2:new T.MeshLambertMaterial({color:0x7a5131,flatShading:true}),bronze:new T.MeshLambertMaterial({color:0xa9793c,flatShading:true}),steel:new T.MeshLambertMaterial({color:0xcbd0cb,flatShading:true}),edge:new T.MeshLambertMaterial({color:0xf1eee2,flatShading:true}),wood:new T.MeshLambertMaterial({color:0x51341f,flatShading:true}),hair:new T.MeshLambertMaterial({color:0x2a1c14,flatShading:true}),skin:skinMat,dark:new T.MeshLambertMaterial({color:0x241914,flatShading:true})};
function box(p,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;q.receiveShadow=true;p.add(q);return q}
function cyl(p,r,h,m,x,y,z,seg=8){const q=new T.Mesh(new T.CylinderGeometry(r,r,h,seg),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
// Critical fix: hide every previously-created visual mesh on the protagonist.
a.traverse(o=>{if(o.isMesh)o.visible=false});
if(player.__period42){player.__period42.layers.visible=false;player.__period42.head.visible=false}
if(player.__face15)player.__face15.visible=false;if(player.__headwrap15)player.__headwrap15.visible=false;if(player.__robe15)player.__robe15.visible=false;
if(player.__weapons15){player.__weapons15.staff.visible=false;player.__weapons15.sword.visible=false}
// One and only one torso/head costume.
const hero=new T.Group();hero.name='hero431-single-model';a.add(hero);
// Legs/skirt: long split linen tunic appropriate to a mobile warrior.
box(hero,.58,1.08,.72,M.linen,-.30,.62,0);box(hero,.58,1.08,.72,M.linen,.30,.62,0);box(hero,1.17,.40,.77,M.cream,0,1.15,0);
// Torso, cuirass and belt.
box(hero,1.18,1.20,.78,M.cream,0,1.73,0);box(hero,1.14,.80,.84,M.leather2,0,1.96,0);
for(const x of[-.42,-.14,.14,.42])box(hero,.09,.70,.88,M.leather,x,1.96,0);
box(hero,1.28,.22,.86,M.leather,0,1.39,0);box(hero,.22,.34,.08,M.bronze,0,1.39,.47);
// Shoulder guards, sash, and short practical cloak.
box(hero,.46,.18,.92,M.leather,-.55,2.29,0);box(hero,.46,.18,.92,M.leather,.55,2.29,0);const sash=box(hero,.20,1.48,.07,M.red,.10,1.98,.46);sash.rotation.z=-.43;const cape=box(hero,.98,1.28,.09,M.red,0,1.72,-.46);cape.rotation.x=-.05;
// Single head/face/beard assembly.
box(hero,.69,.66,.63,M.skin,0,2.91,.02);box(hero,.72,.22,.64,M.hair,0,3.20,0);box(hero,.73,.28,.12,M.hair,0,2.70,.32);box(hero,.44,.34,.11,M.hair,0,2.54,.25);
box(hero,.88,.15,.78,M.cream,0,3.30,0);box(hero,.79,.14,.84,M.red,0,3.39,0);box(hero,.17,.62,.11,M.cream,-.35,3.02,-.34);box(hero,.17,.60,.11,M.cream,.35,3.03,-.34);box(hero,.54,.64,.09,M.cream,0,3.01,-.38);
box(hero,.10,.07,.035,M.dark,-.16,3.00,.34);box(hero,.10,.07,.035,M.dark,.16,3.00,.34);box(hero,.11,.19,.08,M.skin,0,2.89,.37);
// Rebuild the animated limbs instead of showing the old body underneath.
const left=player.__arms15?.left,right=player.__arms15?.right;
for(const arm of[left,right])if(arm){box(arm,.40,.62,.40,M.cream,0,-.21,0);box(arm,.30,.48,.30,M.skin,0,-.70,0);box(arm,.34,.28,.34,M.leather,0,-.54,0);box(arm,.27,.24,.31,M.skin,0,-.98,.02)}
for(const leg of[player.__legs15?.left,player.__legs15?.right])if(leg){box(leg,.34,.60,.35,M.cream,0,-.30,0);box(leg,.29,.48,.30,M.skin,0,-.72,0);box(leg,.34,.18,.42,M.leather,0,-.97,.07);box(leg,.31,.18,.34,M.cream,0,-.77,0)}
// New sword: grip sits in the hand; blade extends from guard outward/upward.
const hand=right||hero;
const sword=new T.Group();sword.name='hero431-sword';hand.add(sword);sword.position.set(.02,-.96,.08);sword.rotation.set(-1.10,0,-.08);
cyl(sword,.085,.46,M.leather,0,0,0);box(sword,.62,.10,.16,M.bronze,0,.29,0);box(sword,.17,1.70,.085,M.steel,0,1.18,0);box(sword,.030,1.62,.095,M.edge,.078,1.18,0);const tip=box(sword,.13,.33,.075,M.steel,0,2.12,0);tip.rotation.z=Math.PI/4;box(sword,.18,.14,.18,M.bronze,0,-.29,0);
// New staff: held below its midpoint and angled naturally forward.
const staff=new T.Group();staff.name='hero431-staff';hand.add(staff);staff.position.set(.03,-.89,.09);staff.rotation.set(-.38,0,-.14);cyl(staff,.075,2.78,M.wood,0,-.36,0);cyl(staff,.105,.28,M.leather,0,-.04,0);cyl(staff,.095,.18,M.bronze,0,1.03,0);
player.__hero43={hero,sword,staff};
function mode(v){const swordOn=v==='sword';sword.visible=swordOn;staff.visible=!swordOn;player.__weapon15=swordOn?'sword':'staff';if(player.__weapons15)player.__weapons15.mode=player.__weapon15}
mode(player.__weapons15?.mode==='sword'||player.__weapon15==='sword'?'sword':'staff');
function loop(){// Legacy toggle can re-show old weapon groups; force them off every frame.
if(player.__weapons15){player.__weapons15.staff.visible=false;player.__weapons15.sword.visible=false;const v=player.__weapons15.mode||player.__weapon15||'staff';sword.visible=v==='sword';staff.visible=v!=='sword'}
requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessHero43={hero,sword,staff,mode};
})();