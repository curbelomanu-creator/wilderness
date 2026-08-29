// Wilderness 4.4.1 - detailed animals, correct proportions and true seated riding
(()=>{
const T=window.THREE,W=window.WildernessWorld;if(!T||!W||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const done=new WeakSet();
const M={horse:new T.MeshLambertMaterial({color:0x6d4430,flatShading:true}),horseDark:new T.MeshLambertMaterial({color:0x33251e,flatShading:true}),horseLight:new T.MeshLambertMaterial({color:0x9b6a49,flatShading:true}),camel:new T.MeshLambertMaterial({color:0xb18152,flatShading:true}),camelDark:new T.MeshLambertMaterial({color:0x704a2f,flatShading:true}),wool:new T.MeshLambertMaterial({color:0xe6dcc5,flatShading:true}),skin:new T.MeshLambertMaterial({color:0x44352a,flatShading:true}),lion:new T.MeshLambertMaterial({color:0xb87932,flatShading:true}),mane:new T.MeshLambertMaterial({color:0x67401f,flatShading:true}),leather:new T.MeshLambertMaterial({color:0x503323,flatShading:true}),cloth:new T.MeshLambertMaterial({color:0x7d3f34,flatShading:true}),hoof:new T.MeshLambertMaterial({color:0x241c18,flatShading:true})};
function box(p,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;q.receiveShadow=true;p.add(q);return q}
function hideOld(a){for(const c of a.mesh.children)c.visible=false}
function horse(a){hideOld(a);const g=new T.Group();g.name='animal44-horse';a.mesh.add(g);box(g,1.55,1.12,2.75,M.horse,0,1.72,0);const chest=box(g,1.35,1.30,1.10,M.horse,0,1.83,.78);chest.rotation.x=-.05;const neck=box(g,.78,1.55,.72,M.horse,0,2.55,1.16);neck.rotation.x=-.38;box(g,.72,.72,1.18,M.horse,0,3.12,1.72);box(g,.56,.48,.72,M.horseLight,0,2.98,2.35);for(const x of[-.22,.22]){const ear=box(g,.16,.44,.16,M.horseDark,x,3.58,1.62);ear.rotation.z=x<0?-.12:.12}box(g,.16,.82,.12,M.horseDark,0,3.10,1.17);for(let i=0;i<4;i++)box(g,.12,.30,.22,M.horseDark,0,2.85-i*.25,1.05-i*.18);for(const x of[-.48,.48])for(const z of[-.78,.78]){box(g,.26,1.68,.30,M.horse,x,.85,z);box(g,.32,.20,.45,M.hoof,x,.08,z+.06)}const tail=box(g,.18,1.48,.22,M.horseDark,0,1.52,-1.62);tail.rotation.x=-.28;box(g,1.00,.20,1.30,M.cloth,0,2.35,-.05);box(g,.82,.18,1.05,M.leather,0,2.48,-.04);box(g,.12,.95,.12,M.leather,-.66,1.85,.05);box(g,.12,.95,.12,M.leather,.66,1.85,.05);a.__animal44=g;a.__seat44=2.57;a.__riderBack44=-.08}
function camel(a){hideOld(a);const g=new T.Group();g.name='animal44-camel';a.mesh.add(g);box(g,1.65,1.22,2.85,M.camel,0,1.88,0);box(g,1.30,1.25,1.10,M.camel,0,2.35,-.20);const hump=box(g,1.18,1.10,1.28,M.camel,0,2.75,-.25);hump.rotation.x=.05;const neck=box(g,.68,2.28,.68,M.camel,0,3.12,1.12);neck.rotation.x=-.25;box(g,.72,.62,1.30,M.camel,0,4.18,1.72);box(g,.58,.44,.82,M.camelDark,0,4.05,2.42);for(const x of[-.24,.24]){const ear=box(g,.18,.34,.16,M.camelDark,x,4.56,1.72);ear.rotation.z=x<0?-.10:.10}for(const x of[-.50,.50])for(const z of[-.80,.80]){box(g,.24,2.08,.27,M.camel,x,1.02,z);box(g,.34,.18,.48,M.camelDark,x,.08,z+.08)}const tail=box(g,.16,1.15,.18,M.camelDark,0,1.70,-1.62);tail.rotation.x=-.28;box(g,1.18,.20,1.35,M.cloth,0,3.18,-.10);box(g,.94,.18,1.10,M.leather,0,3.31,-.08);box(g,.12,1.20,.12,M.leather,-.72,2.55,0);box(g,.12,1.20,.12,M.leather,.72,2.55,0);a.__animal44=g;a.__seat44=3.40;a.__riderBack44=-.10}
function sheep(a){hideOld(a);const g=new T.Group();g.name='animal44-sheep';a.mesh.add(g);box(g,1.35,1.00,1.80,M.wool,0,1.05,0);box(g,.82,.82,.82,M.wool,0,1.28,.82);box(g,.60,.56,.68,M.skin,0,1.24,1.18);for(const x of[-.36,.36])for(const z of[-.52,.52]){box(g,.16,.82,.16,M.skin,x,.48,z);box(g,.20,.16,.28,M.hoof,x,.06,z)}for(const x of[-.27,.27]){const ear=box(g,.22,.12,.42,M.skin,x,1.50,1.10);ear.rotation.z=x<0?-.22:.22}a.__animal44=g}
function lion(a){hideOld(a);const g=new T.Group();g.name='animal44-lion';a.mesh.add(g);box(g,1.38,.92,2.20,M.lion,0,1.10,0);box(g,.98,1.05,.82,M.mane,0,1.55,.88);box(g,.72,.66,.80,M.lion,0,1.56,1.32);box(g,.60,.28,.48,M.lion,0,1.45,1.82);for(const x of[-.42,.42])for(const z of[-.62,.62]){box(g,.22,.90,.24,M.lion,x,.52,z);box(g,.28,.16,.42,M.lion,x,.06,z+.08)}const tail=box(g,.14,.14,1.65,M.lion,0,1.12,-1.68);tail.rotation.x=-.18;box(g,.28,.28,.34,M.mane,0,1.04,-2.45);a.__animal44=g}
function enhance(a){if(!a?.mesh||done.has(a))return;if(!['horse','camel','sheep','lion'].includes(a.type))return;done.add(a);a.mesh.scale.set(1,1,1);if(a.type==='horse')horse(a);else if(a.type==='camel')camel(a);else if(a.type==='lion')lion(a);else sheep(a)}
function scan(){if(typeof livestock!=='undefined')for(const a of livestock)enhance(a);if(typeof enemies!=='undefined')for(const a of enemies)if(a?.type==='lion')enhance(a)}
if(typeof makeAnimal==='function'){const old=makeAnimal;makeAnimal=function(type,x,z,owned=false){const a=old(type,x,z,owned);enhance(a);return a}}
let wasMounted=false;
function ridingPose(){
  const on=!!(mounted&&mount);
  if(on){
    enhance(mount);
    const seat=mount.__seat44||(mount.type==='camel'?3.40:2.57);
    const base=W.groundY(mount.mesh.position.x,mount.mesh.position.z);
    // Keep the entity root at saddle height, then place the actor so its hip pivot sits on the saddle.
    player.mesh.position.x=mount.mesh.position.x;player.mesh.position.z=mount.mesh.position.z;player.mesh.position.y=base+seat;
    player.actor.position.y=-.88;
    // The long standing skirt must not pass through the animal. Only the shorter torso hangs over the saddle.
    if(player.__hero43?.skirtL){player.__hero43.skirtL.visible=false;player.__hero43.skirtR.visible=false}
    if(player.__legs15){
      player.__legs15.left.rotation.x=.92;player.__legs15.right.rotation.x=.92;
      player.__legs15.left.rotation.z=-.48;player.__legs15.right.rotation.z=.48;
      player.__legs15.left.rotation.y=-.10;player.__legs15.right.rotation.y=.10;
    }
    if(player.__arms15)player.__arms15.left.rotation.x=-.34;
    wasMounted=true;
  }else if(wasMounted){
    player.actor.position.y=0;
    if(player.__hero43?.skirtL){player.__hero43.skirtL.visible=true;player.__hero43.skirtR.visible=true}
    if(player.__legs15){player.__legs15.left.rotation.set(0,0,0);player.__legs15.right.rotation.set(0,0,0)}
    wasMounted=false;
  }
}
let last=0;function loop(t){ridingPose();if(t-last>700){last=t;scan()}requestAnimationFrame(loop)}scan();requestAnimationFrame(loop);
window.WildernessAnimals44={enhance,scan,ridingPose};
})();