// Wilderness 5.3 - faction-specific architecture, materials and settlement silhouettes
(()=>{
const T=window.THREE,W=window.WildernessWorld,N=window.WildernessNations50,H=window.WildernessHistorical52;
if(!T||!W||!N||typeof scene==='undefined'||typeof generatedSettlements==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const C={done:new Set(),groups:new Map(),styles:new Map(),duplicateMarketsRemoved:0};
const STYLE_NAMES={israel:'Israelita',judah:'Judaita',philistia:'Filistea',moab:'Moabita',edom:'Edomita',ammon:'Amonita',aram:'Aramea',phoenicia:'Fenicia',neo_hittite:'Neo-hitita'};
const palettes={
 israel:{adobe:0xb79b71,adobe2:0x92785a,stone:0xaaa087,stone2:0x756e60,wood:0x59402b,dark:0x282019,cloth:0x536f78,cloth2:0xbda66f,road:0xa89472,field:0x87905a,vine:0x4f6839,leaf:0x617c45,bronze:0xa57c3e,sand:0xbca77f},
 judah:{adobe:0xc2ad86,adobe2:0x9d896d,stone:0xbab19d,stone2:0x80796d,wood:0x594333,dark:0x28231d,cloth:0x765142,cloth2:0xcab887,road:0xb1a07e,field:0x8b8954,vine:0x52683b,leaf:0x657a48,bronze:0xa77d40,sand:0xc6b38a},
 philistia:{adobe:0xc49b75,adobe2:0x9f6f56,stone:0x9e927d,stone2:0x6d6358,wood:0x60402d,dark:0x2c2019,cloth:0x8f4e45,cloth2:0xd0b47e,road:0xb09773,field:0x90905a,vine:0x557044,leaf:0x66804b,bronze:0xb07b3d,sand:0xcbb083},
 moab:{adobe:0xa88764,adobe2:0x81654d,stone:0x82766a,stone2:0x5f574f,wood:0x543b2c,dark:0x29211b,cloth:0x765442,cloth2:0xb49467,road:0x907b63,field:0x7f8150,vine:0x4c6137,leaf:0x5f7144,bronze:0x96713d,sand:0xaa9270},
 edom:{adobe:0xb56f52,adobe2:0x8e4f3d,stone:0xa56851,stone2:0x754437,wood:0x543224,dark:0x281915,cloth:0x74403a,cloth2:0xc38c66,road:0xa36850,field:0x80784d,vine:0x4f6038,leaf:0x617043,bronze:0xaa6f39,sand:0xbc8060},
 ammon:{adobe:0xa99578,adobe2:0x82725e,stone:0x918d82,stone2:0x68655e,wood:0x544033,dark:0x29231e,cloth:0x59604d,cloth2:0xb2a178,road:0x908672,field:0x7d8055,vine:0x4f613d,leaf:0x607348,bronze:0x98733e,sand:0xab9b7c},
 aram:{adobe:0xb7a68b,adobe2:0x8e7c68,stone:0xb6aa93,stone2:0x4f5351,wood:0x504033,dark:0x242627,cloth:0x465d70,cloth2:0xb79b70,road:0x9c907d,field:0x7f875a,vine:0x4d633c,leaf:0x61764a,bronze:0xa0783f,sand:0xb8a385},
 phoenicia:{adobe:0xbfa98c,adobe2:0x937963,stone:0xb8b09f,stone2:0x777166,wood:0x4b3427,dark:0x211a17,cloth:0x65405f,cloth2:0xc09a72,road:0xa79a82,field:0x7d895b,vine:0x46653e,leaf:0x58784a,bronze:0xaa7f45,sand:0xc0ad8d},
 neo_hittite:{adobe:0xaa9578,adobe2:0x806e59,stone:0x9e9687,stone2:0x5f5b55,wood:0x4d392d,dark:0x25211d,cloth:0x7d4c3e,cloth2:0xb89b68,road:0x938672,field:0x7e8053,vine:0x50623b,leaf:0x617044,bronze:0xa8783c,sand:0xae9b79}
};
const sourceMap=new Map([
 [0xb57b50,'adobe'],[0x95603f,'adobe2'],[0x8b7a63,'stone'],[0x695d50,'stone2'],[0x5b3925,'wood'],[0x271a12,'dark'],[0x8e5142,'cloth'],[0xc5a16d,'cloth2'],[0xa18461,'road'],[0x8d7d45,'field'],[0x556b36,'vine'],[0x627842,'leaf'],[0xa67b3f,'bronze'],[0xc2a16c,'sand']
]);
const materials={};
function material(faction,kind){materials[faction]??={};if(materials[faction][kind])return materials[faction][kind];const c=palettes[faction]?.[kind]??0x8b7a63;return materials[faction][kind]=new T.MeshLambertMaterial({color:c,flatShading:true})}
function box(g,w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.cultural53=true;g.add(q);return q}
function root(g,x,z,rot=0){const r=new T.Group();r.position.set(x,W.groundY(x,z),z);r.rotation.y=rot;r.userData.cultural53=true;g.add(r);return r}
function road(g,x1,z1,x2,z2,width,faction){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/4)),m=material(faction,'road');for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t,y=W.groundY(x,z),q=box(g,width,.055,4.3,m,x,y+.028,z,false);q.rotation.y=Math.atan2(dx,dz)}}
function banner(g,x,z,faction,capital=false){const r=root(g,x,z);box(r,.12,capital?6.6:5,.12,material(faction,'wood'),0,(capital?6.6:5)/2,0,false);const f=box(r,capital?2.8:2.2,capital?1.25:.95,.08,material(faction,'cloth'),capital?1.35:1.05,capital?5.55:4.1,0,false);f.rotation.y=.04}
function olive(g,x,z,faction,s=1){const y=W.groundY(x,z);box(g,.34*s,3.25*s,.34*s,material(faction,'wood'),x,y+1.62*s,z,false);box(g,2.45*s,.72*s,2.15*s,material(faction,'leaf'),x,y+3.35*s,z,false);box(g,1.8*s,.62*s,1.65*s,material(faction,'vine'),x+.2*s,y+3.8*s,z-.1*s,false)}
function courtyard(g,x,z,faction,stone=false){const r=root(g,x,z),m=material(faction,stone?'stone':'adobe');box(r,7.6,3.8,2.3,m,0,1.9,-4);box(r,2.3,3.8,6.2,m,-3.85,1.9,0);box(r,2.3,3.8,6.2,m,3.85,1.9,0);box(r,3.0,.18,2.3,material(faction,'wood'),0,4.02,-4)}
function terraceHouse(g,x,z,faction){const r=root(g,x,z);box(r,8.2,3.4,5.5,material(faction,'stone'),0,1.7,0);box(r,5.8,3.3,4.8,material(faction,'adobe'),1.0,4.95,-.2);box(r,6.2,.25,5.1,material(faction,'stone2'),1.0,6.72,-.2);for(let i=-3;i<=3;i++)box(r,1.05,.36,.9,material(faction,'stone2'),-5+i*1.1,.18,3.7+i*.26)}
function squareTower(g,x,z,faction,h=9){const r=root(g,x,z);box(r,4.8,h,4.8,material(faction,'stone2'),0,h/2,0);for(const sx of[-1.8,0,1.8])for(const zz of[-2.15,2.15])box(r,.7,.9,.7,material(faction,'stone'),sx,h+.45,zz);for(const sz of[-1.8,0,1.8])for(const xx of[-2.15,2.15])box(r,.7,.9,.7,material(faction,'stone'),xx,h+.45,sz)}
function columnHall(g,x,z,faction){const r=root(g,x,z);box(r,11,.35,7.2,material(faction,'stone'),0,.18,0);for(const xx of[-4.2,-1.4,1.4,4.2])box(r,.5,4.3,.5,material(faction,'stone2'),xx,2.32,2.45);box(r,10.4,.4,1.1,material(faction,'wood'),0,4.55,2.45);box(r,9.8,3.7,3.4,material(faction,'adobe2'),0,1.85,-1.7)}
function highPlace(g,x,z,faction){const r=root(g,x,z);box(r,10,.7,8,material(faction,'stone2'),0,.35,0);box(r,7.5,.8,5.6,material(faction,'stone'),0,1.1,0);box(r,4.8,.65,3.6,material(faction,'stone2'),0,1.82,0);box(r,.75,3.6,.75,material(faction,'stone'),0,3.95,-.5);box(r,1.8,.45,1.8,material(faction,'bronze'),0,2.38,1.05)}
function caravanCourt(g,x,z,faction){const r=root(g,x,z),R=7.5,m=material(faction,'stone');box(r,15,3.5,1.5,m,0,1.75,-R);box(r,1.5,3.5,12.5,m,-R,1.75,0);box(r,1.5,3.5,12.5,m,R,1.75,0);box(r,4.8,3.5,1.5,m,-5.1,1.75,R);box(r,4.8,3.5,1.5,m,5.1,1.75,R);const canopy=box(r,7.4,.18,5.2,material(faction,'cloth2'),0,3.25,-1.8);canopy.rotation.z=.03}
function twinGate(g,x,z,faction){const r=root(g,x,z);for(const xx of[-3.8,3.8]){box(r,4.2,8.5,4.2,material(faction,'stone2'),xx,4.25,0);for(const sx of[-1.4,0,1.4])box(r,.65,.9,.65,material(faction,'stone'),xx+sx,9.0,0)}box(r,11.5,1.55,3.8,material(faction,'stone'),0,7.6,0)}
function aramCourt(g,x,z,faction){const r=root(g,x,z);box(r,12,.5,9,material(faction,'stone'),0,.25,0);box(r,11.2,4.8,3.6,material(faction,'adobe'),0,2.4,-2.7);for(const xx of[-4.2,-1.4,1.4,4.2]){box(r,.58,4.4,.58,material(faction,'stone2'),xx,2.2,2.8);box(r,.72,.28,.72,material(faction,'stone'),xx,4.45,2.8)}box(r,10.8,.45,1.1,material(faction,'wood'),0,4.7,2.8)}
function cedarTower(g,x,z,faction,h=10.5){const r=root(g,x,z);box(r,5.2,h,5.1,material(faction,'stone'),0,h/2,0);for(let y=3.2;y<h;y+=3.1)box(r,5.55,.28,5.45,material(faction,'wood'),0,y,0);box(r,5.8,.35,5.7,material(faction,'stone2'),0,h+.18,0);box(r,1.2,2.8,.18,material(faction,'dark'),0,1.4,2.62)}
function warehouse(g,x,z,faction){const r=root(g,x,z);box(r,12,4.8,5.7,material(faction,'adobe2'),0,2.4,0);for(const xx of[-4,-1.35,1.35,4])box(r,1.15,3.4,.18,material(faction,'dark'),xx,1.7,2.93);box(r,12.5,.32,6.1,material(faction,'wood'),0,4.98,0)}
function hittiteGate(g,x,z,faction){const r=root(g,x,z);for(const xx of[-5,5]){box(r,5.6,10.5,6.2,material(faction,'stone2'),xx,5.25,0);box(r,6.2,.5,6.8,material(faction,'stone'),xx,10.75,0)}box(r,15.8,2.0,5.7,material(faction,'stone'),0,9.1,0);for(const xx of[-2.35,2.35]){box(r,2.0,1.5,2.6,material(faction,'stone'),xx,.75,3.5);box(r,1.1,.9,1.2,material(faction,'stone2'),xx,1.8,4.0)}}
function israelCompound(g,d,f){courtyard(g,d.x-17,d.z+12,f,true);olive(g,d.x+18,d.z+12,f,.95);olive(g,d.x+21,d.z+8,f,.78);if(d.type==='city')terraceHouse(g,d.x+18,d.z-13,f)}
function judahCompound(g,d,f){terraceHouse(g,d.x-17,d.z+12,f);olive(g,d.x+18,d.z+13,f,.86);if(d.type==='city')squareTower(g,d.x+20,d.z-17,f,d.capital?11:9)}
function philistiaCompound(g,d,f){columnHall(g,d.x-17,d.z+13,f);if(d.type==='city')warehouse(g,d.x+18,d.z-14,f)}
function moabCompound(g,d,f){highPlace(g,d.x-18,d.z+13,f);if(d.type==='city')squareTower(g,d.x+19,d.z-16,f,8.6)}
function edomCompound(g,d,f){caravanCourt(g,d.x-18,d.z+13,f);if(d.type==='city')squareTower(g,d.x+19,d.z-16,f,9.2)}
function ammonCompound(g,d,f){courtyard(g,d.x-17,d.z+13,f,true);if(d.type==='city')twinGate(g,d.x+18,d.z-16,f)}
function aramCompound(g,d,f){aramCourt(g,d.x-18,d.z+13,f);if(d.type==='city')squareTower(g,d.x+19,d.z-16,f,10)}
function phoeniciaCompound(g,d,f){cedarTower(g,d.x-17,d.z+12,f,d.capital?13:10.5);if(d.type==='city')warehouse(g,d.x+18,d.z-14,f)}
function hittiteCompound(g,d,f){hittiteGate(g,d.x-18,d.z+11,f);if(d.type==='city')squareTower(g,d.x+19,d.z-17,f,11)}
function recolor(base,faction){base.traverse(o=>{if(!o.isMesh||!o.material?.color)return;const kind=sourceMap.get(o.material.color.getHex());if(kind)o.material=material(faction,kind)})}
function removeDuplicateMarket(base,d){const a=base.children.filter(o=>o?.isGroup&&o.children?.length>=16&&o.children.length<=20&&Math.abs((o.position?.x??999)-d.x)<2&&Math.abs((o.position?.z??999)-d.z-2.5)<4);if(a.length>1){for(let i=1;i<a.length;i++)a[i].visible=false;C.duplicateMarketsRemoved+=a.length-1}}
function factionFor(d){return d.faction||d.nation||H?.territoryAt?.(d.x,d.z)||null}
function buildCulture(d,base,faction){const g=new T.Group();g.name=`culture53-${d.id}`;scene.add(g);C.groups.set(d.id,g);C.styles.set(d.id,STYLE_NAMES[faction]||faction);recolor(base,faction);removeDuplicateMarket(base,d);
  // City road correction: ports and other named city kinds get city-scale streets based on d.type, not kind labels.
  if(d.type==='city'){const r=d.capital?36:30;road(g,d.x,d.z-r-6,d.x,d.z+r+6,6.8,faction);road(g,d.x-r-4,d.z,d.x+r+4,d.z,5.5,faction)}
  banner(g,d.x+4,d.z-4,faction,!!d.capital);
  const fn={israel:israelCompound,judah:judahCompound,philistia:philistiaCompound,moab:moabCompound,edom:edomCompound,ammon:ammonCompound,aram:aramCompound,phoenicia:phoeniciaCompound,neo_hittite:hittiteCompound}[faction];if(fn)fn(g,d,faction);
  if(d.capital&&d.special!=='jerusalem'){banner(g,d.x-5,d.z-4,faction,true);squareTower(g,d.x-24,d.z-22,faction,11)}
  base.userData.culture53=faction;g.userData.faction=faction;g.userData.style=STYLE_NAMES[faction]||faction;
}
function sync(){for(const rt of generatedSettlements.values()){
  const d=rt?.def||rt?.definition||rt?.source||rt;if(!d?.id||C.done.has(d.id))continue;const faction=factionFor(d);if(!faction||!palettes[faction])continue;const base=scene.getObjectByName(`settlement46-${d.id}`);if(!base)continue;buildCulture(d,base,faction);C.done.add(d.id);
 }}
let last=0;function loop(t){if(t-last>520){last=t;try{sync()}catch(e){console.warn('Wilderness 5.3 cultural architecture',e)}}requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessCulture53={state:C,palettes,styleNames:STYLE_NAMES,materials};
})();