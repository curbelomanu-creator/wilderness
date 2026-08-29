// Wilderness 4.4.1 - single main warrior model with mount-aware garments
(()=>{
const T=window.THREE;if(!T||typeof player==='undefined'||!player?.actor)return;
const a=player.actor,mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const M={linen:new T.MeshLambertMaterial({color:0xc8ad7b,flatShading:true}),cream:new T.MeshLambertMaterial({color:0xe0c99b,flatShading:true}),red:new T.MeshLambertMaterial({color:0x713c32,flatShading:true}),leather:new T.MeshLambertMaterial({color:0x563523,flatShading:true}),leather2:new T.MeshLambertMaterial({color:0x7a5131,flatShading:true}),bronze:new T.MeshLambertMaterial({color:0xa9793c,flatShading:true}),steel:new T.MeshLambertMaterial({color:0xcbd0cb,flatShading:true}),edge:new T.MeshLambertMaterial({color:0xf1eee2,flatShading:true}),wood:new T.MeshLambertMaterial({color:0x51341f,flatShading:true}),hair:new T.MeshLambertMaterial({color:0x2a1c14,flatShading:true}),skin:(typeof mats!=='undefined'?mats.skin:new T.MeshLambertMaterial({color:0xa87555})),dark:new T.MeshLambertMaterial({color:0x241914,flatShading:true})};
function box(p,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
function cyl(p,r,h,m,x,y,z,seg=6){const q=new T.Mesh(new T.CylinderGeometry(r,r,h,seg),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
a.traverse(o=>{if(o!==a&&o.isMesh)o.visible=false});
const arms=player.__arms15,legs=player.__legs15;
const hero=new T.Group();hero.name='hero43-costume';a.add(hero);
const torso=box(hero,1.18,1.36,.76,M.cream,0,1.55,0);
const skirtL=box(hero,.55,1.00,.72,M.linen,-.29,.62,0),skirtR=box(hero,.55,1.00,.72,M.linen,.29,.62,0);
box(hero,1.26,.22,.82,M.leather,0,1.35,0);box(hero,.18,.38,.08,M.bronze,0,1.35,.46);
box(hero,1.12,.78,.84,M.leather2,0,1.98,0);for(const x of[-.42,-.14,.14,.42])box(hero,.10,.72,.88,M.leather,x,1.98,0);
box(hero,.42,.18,.94,M.leather,-.55,2.28,0);box(hero,.42,.18,.94,M.leather,.55,2.28,0);const sash=box(hero,.20,1.55,.08,M.red,.10,1.98,.47);sash.rotation.z=-.42;
const cape=box(hero,1.00,1.48,.10,M.red,0,1.62,-.47);cape.rotation.x=-.05;
box(hero,.68,.66,.62,M.skin,0,2.92,.02);box(hero,.72,.27,.64,M.hair,0,3.19,0);box(hero,.76,.34,.14,M.hair,0,2.70,.31);box(hero,.42,.35,.12,M.hair,0,2.54,.24);
box(hero,.88,.16,.78,M.cream,0,3.30,0);box(hero,.78,.16,.84,M.red,0,3.39,0);box(hero,.18,.66,.12,M.cream,-.35,3.02,-.34);box(hero,.18,.62,.12,M.cream,.35,3.04,-.34);box(hero,.54,.68,.10,M.cream,0,3.01,-.38);
box(hero,.10,.07,.035,M.dark,-.16,3.00,.335);box(hero,.10,.07,.035,M.dark,.16,3.00,.335);box(hero,.12,.20,.08,M.skin,0,2.89,.37);
if(arms){for(const arm of[arms.left,arms.right]){box(arm,.30,.98,.30,M.skin,0,-.48,0);box(arm,.38,.52,.38,M.cream,0,-.18,0);box(arm,.36,.28,.36,M.leather,0,-.58,0);box(arm,.32,.26,.34,M.skin,0,-1.03,.03)}}
if(legs){for(const leg of[legs.left,legs.right]){box(leg,.34,.92,.36,M.cream,0,-.48,0);box(leg,.35,.25,.39,M.leather,0,-.82,.03);box(leg,.39,.18,.57,M.leather,0,-.98,.12)}}
const hand=arms?.right||hero;
const sword=new T.Group();sword.name='hero43-sword';hand.add(sword);sword.position.set(.02,-1.10,.09);sword.rotation.set(1.08,0,-.10);
cyl(sword,.09,.48,M.leather,0,0,0,8);box(sword,.58,.10,.16,M.bronze,0,.28,0);box(sword,.16,1.68,.085,M.steel,0,1.15,0);box(sword,.035,1.58,.095,M.edge,.075,1.15,0);const tip=box(sword,.13,.34,.075,M.steel,0,2.10,0);tip.rotation.z=Math.PI/4;box(sword,.18,.15,.18,M.bronze,0,-.30,0);
const staff=new T.Group();staff.name='hero43-staff';hand.add(staff);staff.position.set(.04,-.98,.10);staff.rotation.set(.36,0,-.16);cyl(staff,.075,2.72,M.wood,0,-.40,0,8);cyl(staff,.10,.22,M.leather,0,-.05,0,8);cyl(staff,.095,.18,M.bronze,0,1.00,0,8);
player.__hero43={hero,torso,skirtL,skirtR,cape,sword,staff};
function mode(v){const on=v==='sword';sword.visible=on;staff.visible=!on;player.__weapon15=on?'sword':'staff';if(player.__weapons15)player.__weapons15.mode=player.__weapon15}
mode(player.__weapon15==='sword'?'sword':'staff');
function loop(){if(player.__weapons15){player.__weapons15.staff.visible=false;player.__weapons15.sword.visible=false}const v=player.__weapons15?.mode||player.__weapon15||'staff';sword.visible=v==='sword';staff.visible=v!=='sword';requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessHero43={hero,sword,staff,mode};
})();