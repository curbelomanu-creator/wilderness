// Wilderness 4.3 - bespoke main warrior, correctly held sword and staff
(()=>{
const T=window.THREE;if(!T||typeof player==='undefined'||!player?.actor)return;
const a=player.actor,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const M={linen:new T.MeshLambertMaterial({color:0xc8ad7b,flatShading:true}),cream:new T.MeshLambertMaterial({color:0xe0c99b,flatShading:true}),red:new T.MeshLambertMaterial({color:0x713c32,flatShading:true}),leather:new T.MeshLambertMaterial({color:0x563523,flatShading:true}),leather2:new T.MeshLambertMaterial({color:0x7a5131,flatShading:true}),bronze:new T.MeshLambertMaterial({color:0xa9793c,flatShading:true}),steel:new T.MeshLambertMaterial({color:0xcbd0cb,flatShading:true}),edge:new T.MeshLambertMaterial({color:0xf1eee2,flatShading:true}),wood:new T.MeshLambertMaterial({color:0x51341f,flatShading:true}),hair:new T.MeshLambertMaterial({color:0x2a1c14,flatShading:true}),skin:(typeof mats!=='undefined'?mats.skin:new T.MeshLambertMaterial({color:0xa87555})),dark:new T.MeshLambertMaterial({color:0x241914,flatShading:true})};
function box(p,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
function cyl(p,r,h,m,x,y,z,seg=6){const q=new T.Mesh(new T.CylinderGeometry(r,r,h,seg),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
// Hide the earlier additive costume while retaining its animated arm/leg skeleton.
if(player.__period42){player.__period42.layers.visible=false;player.__period42.head.visible=false}
if(player.__face15)player.__face15.visible=false;if(player.__headwrap15)player.__headwrap15.visible=false;if(player.__robe15)player.__robe15.visible=false;
const hero=new T.Group();hero.name='hero43-costume';a.add(hero);
// Long ancient Near Eastern warrior tunic, split skirt, broad belt and leather armor.
box(hero,1.18,1.36,.76,M.cream,0,1.55,0);box(hero,.55,1.00,.72,M.linen,-.29,.62,0);box(hero,.55,1.00,.72,M.linen,.29,.62,0);
box(hero,1.26,.22,.82,M.leather,0,1.35,0);box(hero,.18,.38,.08,M.bronze,0,1.35,.46);
box(hero,1.12,.78,.84,M.leather2,0,1.98,0);for(const x of[-.42,-.14,.14,.42])box(hero,.10,.72,.88,M.leather,x,1.98,0);
// Shoulder guards and diagonal warrior sash.
box(hero,.42,.18,.94,M.leather,-.55,2.28,0);box(hero,.42,.18,.94,M.leather,.55,2.28,0);const sash=box(hero,.20,1.55,.08,M.red,.10,1.98,.47);sash.rotation.z=-.42;
// Cape hanging behind, never above the head.
const cape=box(hero,1.00,1.48,.10,M.red,0,1.62,-.47);cape.rotation.x=-.05;
// Head, beard and wrapped warrior headdress.
box(hero,.68,.66,.62,M.skin,0,2.92,.02);box(hero,.72,.27,.64,M.hair,0,3.19,0);box(hero,.76,.34,.14,M.hair,0,2.70,.31);box(hero,.42,.35,.12,M.hair,0,2.54,.24);
box(hero,.88,.16,.78,M.cream,0,3.30,0);box(hero,.78,.16,.84,M.red,0,3.39,0);box(hero,.18,.66,.12,M.cream,-.35,3.02,-.34);box(hero,.18,.62,.12,M.cream,.35,3.04,-.34);box(hero,.54,.68,.10,M.cream,0,3.01,-.38);
// Eyes and nose for a readable face at gameplay distance.
box(hero,.10,.07,.035,M.dark,-.16,3.00,.335);box(hero,.10,.07,.035,M.dark,.16,3.00,.335);box(hero,.12,.20,.08,M.skin,0,2.89,.37);
// Bracers and sandals attached to animated limbs.
if(player.__arms15){for(const arm of[player.__arms15.left,player.__arms15.right]){box(arm,.34,.48,.34,M.cream,0,-.12,0);box(arm,.36,.28,.36,M.leather,0,-.55,0)}}
if(player.__legs15){for(const leg of[player.__legs15.left,player.__legs15.right]){box(leg,.36,.20,.45,M.leather,0,-.94,.07);box(leg,.33,.28,.35,M.cream,0,-.72,0)}}
// Replace 4.2 weapons entirely. The hand is the animated right-arm pivot.
if(player.__weapons15){player.__weapons15.staff.visible=false;player.__weapons15.sword.visible=false}
const hand=player.__arms15?.right||hero;
const sword=new T.Group();sword.name='hero43-sword';hand.add(sword);sword.position.set(.02,-.91,.08);sword.rotation.set(-1.08,0,-.10);
// Grip is centered in the hand; guard above fist; blade projects forward/up from guard.
cyl(sword,.09,.48,M.leather,0,0,0,8);box(sword,.58,.10,.16,M.bronze,0,.28,0);box(sword,.16,1.68,.085,M.steel,0,1.15,0);box(sword,.035,1.58,.095,M.edge,.075,1.15,0);const tip=box(sword,.13,.34,.075,M.steel,0,2.10,0);tip.rotation.z=Math.PI/4;box(sword,.18,.15,.18,M.bronze,0,-.30,0);
const staff=new T.Group();staff.name='hero43-staff';hand.add(staff);staff.position.set(.04,-.76,.10);staff.rotation.set(-.36,0,-.16);cyl(staff,.075,2.72,M.wood,0,-.40,0,8);cyl(staff,.10,.22,M.leather,0,-.05,0,8);cyl(staff,.095,.18,M.bronze,0,1.00,0,8);
player.__hero43={hero,sword,staff};
function mode(v){const swordOn=v==='sword';sword.visible=swordOn;staff.visible=!swordOn;player.__weapon15=swordOn?'sword':'staff';if(player.__weapons15)player.__weapons15.mode=player.__weapon15}
const oldSet=window.WildernessCharacters15?.setPlayerWeapon;if(window.WildernessCharacters15){window.WildernessCharacters15.setPlayerWeapon=function(v){mode(v);const b=document.getElementById('weapon-toggle15');if(b)b.textContent=v==='sword'?'GUARDAR ESPADA':'SACAR ESPADA'}}
mode(player.__weapon15==='sword'?'sword':'staff');
// Keep the new meshes synchronized even when the legacy toggle changes its mode.
function loop(){const v=player.__weapons15?.mode||player.__weapon15||'staff';sword.visible=v==='sword';staff.visible=v!=='sword';requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessHero43={hero,sword,staff,mode};
})();