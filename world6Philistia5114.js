// Wilderness 5.11.4 — Philistia / Shephelah dedicated cities
(()=>{
if(window.Wilderness6Philistia)return;const T=THREE,W=window.WildernessWorld,D=window.Wilderness6World;if(!T||!W||!D||typeof scene==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820,mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
const M={lime:mat(0xc5b493),sand:mat(0xb89468),stone:mat(0x8d806d),dark:mat(0x33251a),road:mat(0xad9672),wood:mat(0x573821),sea:mat(0x397b8c),bronze:mat(0x9a7040),cult:mat(0x705447),green:mat(0x718052),cloth:mat(0x8a4c3e)};const built=new Map();
function hide(id){try{const r=typeof generatedSettlements!=='undefined'&&generatedSettlements.get?.(`w6-${id}`);if(r?.group)r.group.visible=false;}catch(_){}}
function box(G,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;q.receiveShadow=true;q.userData.w6Philistia=true;G.add(q);return q}
function road(G,a,b,c,d,w=8){const dx=c-a,dz=d-b,L=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(L/7));for(let i=0;i<=n;i++){let t=i/n,x=a+dx*t,z=b+dz*t,q=box(G,w,.08,7.2,M.road,x,W.groundY(x,z)+.05,z);q.rotation.y=Math.atan2(dx,dz);q.userData.noCollision=true}}
function house(G,x,z,l=2){const y=W.groundY(x,z),g=new T.Group();g.position.set(x,y,z);G.add(g);for(let f=0;f<l;f++){box(g,8,4.2,6.5,f%3?M.sand:M.lime,0,2.1+f*4.2,0);box(g,8.3,.25,6.8,M.wood,0,4.25+f*4.2,0)}box(g,1.2,3,.2,M.dark,0,1.5,3.36)}
function temple(G,x,z,type='dagon',s=1){const y=W.groundY(x,z),g=new T.Group();g.position.set(x,y,z);g.name=`w6-temple-${type}`;G.add(g);box(g,27*s,.4,22*s,M.lime,0,.2,0);box(g,17*s,10*s,15*s,M.cult,0,5*s,2*s);box(g,12*s,4*s,10*s,M.dark,0,12*s,2*s);for(const xx of[-6,-2,2,6])box(g,.8*s,8*s,.8*s,M.lime,xx*s,4*s,-7*s);box(g,4*s,2*s,4*s,M.bronze,0,1*s,-8*s);if(type==='baal-zebub')for(const xx of[-3,3])box(g,1.1*s,6*s,1.1*s,M.bronze,xx*s,8*s,2*s)}
function palace(G,x,z,s=1){const y=W.groundY(x,z),g=new T.Group();g.position.set(x,y,z);G.add(g);box(g,32*s,7*s,23*s,M.stone,0,3.5*s,0);box(g,24*s,6*s,16*s,M.lime,0,10*s,-2*s)}
function city(id,o){const c=D.getPlace(id);if(!c)return;hide(id);const G=new T.Group();G.name=`w6-${id}-philistia`;scene.add(G);let r=o.r,h=o.h||13,th=o.th||18,cx=c.x,cz=c.z;const gates=o.gates||[[0,-1],[0,1],[-1,0],[1,0]],gs=gates.map(([x,z])=>({x:cx+x*r*.9,z:cz+z*r*.9}));
for(let i=0;i<48;i++){let a=i/48*Math.PI*2,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(gs.some(g=>Math.hypot(x-g.x,z-g.z)<13))continue;let q=box(G,8,h,3.3,M.stone,x,W.groundY(x,z)+h/2,z);q.rotation.y=-a}for(let i=0;i<12;i++){let a=i/12*Math.PI*2,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;box(G,8,th,8,M.stone,x,W.groundY(x,z)+th/2,z)}
for(const g of gs){road(G,g.x,g.z,cx,cz,o.road||8);let vx=g.x-cx,vz=g.z-cz,l=Math.hypot(vx,vz);road(G,g.x,g.z,g.x+vx/l*85,g.z+vz/l*85,o.road||8)}let n=mobile?36:70;for(let i=0;i<n;i++){let a=W.hash2i(i,5114,1)*Math.PI*2,rr=24+W.hash2i(i,5114,2)*r*.62,x=cx+Math.cos(a)*rr,z=cz+Math.sin(a)*rr;if(Math.abs(x-cx)<12||Math.abs(z-cz)<12)continue;house(G,x,z,i%6===0?3:2)}
if(o.temple)temple(G,cx+o.temple[0]*r,cz+o.temple[1]*r,o.temple[2],o.temple[3]||1);if(o.palace)palace(G,cx+o.palace[0]*r,cz+o.palace[1]*r,o.palace[2]||1);built.set(id,G);return G}
// Great Philistine cities
city('gaza',{r:175,h:15,th:22,road:10,temple:[.30,.28,'dagon',1.25],palace:[-.30,.30,1.1]});
const ashkelon=city('ashkelon',{r:158,h:14,th:20,road:9,temple:[.28,.28,'astarte',1.1],palace:[-.3,.25,.95]});
city('ashdod',{r:148,h:14,th:20,road:9,temple:[.30,.25,'dagon',1.15],palace:[-.28,.30,.95]});
city('ekron',{r:142,h:15,th:21,road:9,temple:[.30,.30,'baal-zebub',1.3],palace:[-.30,.28,.9]});
city('gath',{r:145,h:15,th:22,road:10,temple:[.32,.30,'dagon',.9],palace:[-.30,.28,1.05]});
// Frontier/Judah western nodes
city('gezer',{r:125,h:13,th:19,road:8,temple:[.30,.28,'baal-asherah',.9],palace:[-.28,.28,.85]});
city('azekah',{r:88,h:12,th:17,road:7,palace:[-.25,.25,.7]});
city('lachish',{r:155,h:16,th:24,road:10,temple:[.32,.25,'yahwist',.75],palace:[-.30,.30,1.15]});
city('libnah',{r:82,h:11,th:16,road:7,temple:[.28,.25,'yahwist',.65]});
// Ashdod-Yam: dependent coastal port, deliberately not another walled metropolis.
const ad=D.getPlace('ashdod');if(ad){const coastX=ad.x-520,coastZ=ad.z-40,G=new T.Group();G.name='w6-ashdod-yam';scene.add(G);for(let i=0;i<10;i++)house(G,coastX+(i%5)*12,coastZ+Math.floor(i/5)*12,1);for(let i=0;i<3;i++){let q=box(G,6,.5,32,M.wood,coastX-15+i*14,W.groundY(coastX,coastZ)+.25,coastZ-30);q.userData.noCollision=true}road(G,ad.x,ad.z,coastX,coastZ,7);built.set('ashdod-yam',G)}
// Visual harbor for Ashkelon: piers and warehouses on seaward side.
if(ashkelon){const c=D.getPlace('ashkelon'),G=ashkelon;for(let i=0;i<4;i++)box(G,7,5,14,M.stone,c.x-125+i*17,W.groundY(c.x-125+i*17,c.z)+2.5,c.z+35);for(let i=0;i<3;i++){let q=box(G,5,.45,38,M.wood,c.x-165+i*16,W.groundY(c.x-165,c.z)+.25,c.z-5);q.userData.noCollision=true}}
window.Wilderness6Philistia=Object.freeze({version:'5.11.4',built});
})();