const THREE = window.THREE;
const W = window.WildernessWorld;
if (!THREE || !W) throw new Error('Wilderness: Three.js o world.js no cargaron.');

const isMobile = matchMedia('(pointer: coarse)').matches || innerWidth <= 820;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb8d0d1);
scene.fog = new THREE.FogExp2(0xc7b88f, isMobile ? 0.0062 : 0.0047);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 950);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5));
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffe7b9, 0x62513d, 1.65));
const sun = new THREE.DirectionalLight(0xffefc5, 2.15);
sun.position.set(-60, 90, 35);
sun.castShadow = !isMobile;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -90; sun.shadow.camera.right = 90;
sun.shadow.camera.top = 90; sun.shadow.camera.bottom = -90;
scene.add(sun);

const mat = color => new THREE.MeshLambertMaterial({ color, flatShading: true });
const mats = {
  sand: mat(0xc49a5a), sand2: mat(0xd7b06c), rock: mat(0x7c6855),
  steppe: mat(0x9a9557), fertile: mat(0x718044), oasis: mat(0x688443),
  road: mat(0x9c7549), adobe: mat(0xb77d4d), adobe2: mat(0x8c5d3d),
  wood: mat(0x5b3823), white: mat(0xdfcfaa), black: mat(0x2e2720),
  blue: mat(0x365f76), infantry: mat(0x365f76), archer: mat(0x6f7042), cavalry: mat(0x5a4a75),
  enemy: mat(0x73322d), enemyArcher: mat(0x825532), enemyCavalry: mat(0x5d2d38),
  gold: mat(0xc7a13e), lion: mat(0xb77a2e), mane: mat(0x75471f), sheep: mat(0xe4dbc5),
  horse: mat(0x6b4631), camel: mat(0xa87645), dark: mat(0x14110e),
  leaf: mat(0x60763c), skin: mat(0xa97854), shield: mat(0x9f7448),
  bow: mat(0x8b623a), arrow: mat(0x3a2518)
};

const stats = document.getElementById('stats');
const orders = document.getElementById('orders');
const msg = document.getElementById('message');
let msgTimer = 0;
function flash(text, ms = 1800) {
  msg.textContent = text;
  msg.style.opacity = 1;
  clearTimeout(msgTimer);
  msgTimer = setTimeout(() => msg.style.opacity = 0, ms);
}

function addBox(parent, w, h, d, material, x, y, z, cast = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = cast && !isMobile;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function worldBox(w, h, d, material, x, y, z, cast = true) { return addBox(scene, w, h, d, material, x, y, z, cast); }
function makePalm(parent, x, z, s = 1) { const y=W.groundY(x,z);addBox(parent,.58,4.8*s,.58,mats.wood,x,y+2.4*s,z,false);for(let i=0;i<5;i++){const leaf=addBox(parent,.28,.18,3*s,mats.leaf,x,y+4.95*s,z,false);leaf.rotation.y=i*Math.PI/2.5}}
function makeRock(parent,x,z,s=1){const y=W.groundY(x,z);const r=addBox(parent,2.2*s,1.5*s,1.8*s,mats.rock,x,y+.72*s,z,false);r.rotation.y=W.randAt(x,z,1201)*Math.PI}
function makeShrub(parent,x,z,s=1){const y=W.groundY(x,z);addBox(parent,1.2*s,.7*s,1.05*s,mats.leaf,x,y+.34*s,z,false)}

const tileGeo=new THREE.BoxGeometry(W.TILE,.72,W.TILE),chunks=new Map(),generatedSettlements=new Map(),generatedCaves=new Map(),wildlifeChunks=new Set(),chunkRadius=isMobile?2:3,dummy=new THREE.Object3D();
function tileKey(x,z){if(W.roadAt(x,z))return'road';const b=W.biomeAt(x,z);if(b==='oasis')return'oasis';if(b==='rocky')return'rock';if(b==='fertile')return'fertile';if(b==='steppe')return'steppe';return W.randAt(x,z,1301)>.78?'sand2':'sand'}
function buildChunk(cx,cz){const key=`${cx},${cz}`;if(chunks.has(key))return;const group=new THREE.Group();group.name=`chunk-${key}`;const buckets={sand:[],sand2:[],rock:[],steppe:[],fertile:[],oasis:[],road:[]},minX=cx*W.CHUNK_SIZE,minZ=cz*W.CHUNK_SIZE;for(let lx=W.TILE/2;lx<W.CHUNK_SIZE;lx+=W.TILE)for(let lz=W.TILE/2;lz<W.CHUNK_SIZE;lz+=W.TILE){const x=minX+lx,z=minZ+lz;buckets[tileKey(x,z)].push({x,z,y:W.groundY(x,z)})}for(const[kind,points]of Object.entries(buckets)){if(!points.length)continue;const im=new THREE.InstancedMesh(tileGeo,mats[kind],points.length);im.receiveShadow=true;points.forEach((p,i)=>{dummy.position.set(p.x,p.y-.36,p.z);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();im.setMatrixAt(i,dummy.matrix)});im.instanceMatrix.needsUpdate=true;group.add(im)}const decoCount=isMobile?3:6;for(let i=0;i<decoCount;i++){const x=minX+5+W.hash2i(cx,cz,1400+i*3)*(W.CHUNK_SIZE-10),z=minZ+5+W.hash2i(cx,cz,1401+i*3)*(W.CHUNK_SIZE-10);if(W.roadAt(x,z))continue;const biome=W.biomeAt(x,z),s=.7+W.hash2i(cx,cz,1402+i*3)*.65;if(biome==='oasis')makePalm(group,x,z,s);else if(biome==='rocky')makeRock(group,x,z,s);else if(biome==='fertile'||biome==='steppe')makeShrub(group,x,z,s);else if(W.hash2i(cx,cz,1450+i)>.72)makeRock(group,x,z,s*.65)}scene.add(group);chunks.set(key,group);W.settlementsNearBounds(minX,minX+W.CHUNK_SIZE,minZ,minZ+W.CHUNK_SIZE,8).forEach(ensureSettlement);const caveDef=W.caveDefForChunk(cx,cz);if(caveDef)ensureCave(caveDef);spawnChunkWildlife(cx,cz)}
function updateChunks(force=false){const cx=Math.floor(player.mesh.position.x/W.CHUNK_SIZE),cz=Math.floor(player.mesh.position.z/W.CHUNK_SIZE);if(!force&&cx===updateChunks.lastX&&cz===updateChunks.lastZ)return;updateChunks.lastX=cx;updateChunks.lastZ=cz;for(let dx=-chunkRadius;dx<=chunkRadius;dx++)for(let dz=-chunkRadius;dz<=chunkRadius;dz++)buildChunk(cx+dx,cz+dz);for(const[key,group]of[...chunks]){const[gx,gz]=key.split(',').map(Number);if(Math.abs(gx-cx)>chunkRadius+1||Math.abs(gz-cz)>chunkRadius+1){scene.remove(group);chunks.delete(key)}}}
const followers=[],livestock=[],enemies=[],civilians=[],cities=[],caves=[],projectiles=[],MAX_FOLLOWERS=60;let followMode='people',mounted=false,mount=null,selectedGroup='all',formation='line';const mobileMove={x:0,z:0,run:false};
const roleLabels={infantry:'INFANTERÍA',archer:'ARQUEROS',cavalry:'CABALLERÍA',all:'TODOS'},formationLabels={line:'LÍNEA',column:'COLUMNA',wedge:'CUÑA'},orderLabels={follow:'SEGUIR',hold:'MANTENER',attack:'ATACAR',retreat:'RETIRADA'};
function roleFrom(x,z,salt=0){const r=W.randAt(x,z,2600+salt);return r<.57?'infantry':r<.84?'archer':'cavalry'}
function equipRole(e,role){e.role=role;if(e.equipment)e.actor.remove(e.equipment);e.equipment=new THREE.Group();e.actor.add(e.equipment);if(e.cavalryHorse){e.mesh.remove(e.cavalryHorse);e.cavalryHorse=null}e.actor.position.y=0;const friendlyMat=role==='archer'?mats.archer:role==='cavalry'?mats.cavalry:mats.infantry,enemyMat=role==='archer'?mats.enemyArcher:role==='cavalry'?mats.enemyCavalry:mats.enemy;e.body.material=e.king?mats.gold:e.enemy?enemyMat:friendlyMat;if(role==='infantry'||e.king){const spear=addBox(e.equipment,.11,2.9,.11,mats.wood,.72,1.7,0,false);spear.rotation.z=.08;const shield=addBox(e.equipment,.65,.95,.18,e.enemy?mats.enemy:mats.shield,-.66,1.55,.05,false);shield.rotation.z=-.08}else if(role==='archer'){const a=addBox(e.equipment,.10,1.2,.10,mats.bow,.67,1.65,.05,false);a.rotation.z=.38;const b=addBox(e.equipment,.10,1.2,.10,mats.bow,.67,1.65,.05,false);b.rotation.z=-.38;addBox(e.equipment,.26,1.15,.26,mats.wood,-.55,1.65,-.22,false)}else if(role==='cavalry'){e.actor.position.y=1.25;const horse=new THREE.Group(),hmat=e.enemy?mats.enemyCavalry:mats.horse;addBox(horse,1.25,.78,2.15,hmat,0,.95,0,false);addBox(horse,.62,.62,.62,hmat,0,1.27,1.22,false);for(const dx of[-.38,.38])for(const dz of[-.65,.65])addBox(horse,.17,.82,.17,hmat,dx,.4,dz,false);e.mesh.add(horse);e.cavalryHorse=horse;const spear=addBox(e.equipment,.11,3.1,.11,mats.wood,.72,1.7,0,false);spear.rotation.z=.12}}
function makeHumanoid({x=0,z=0,enemy=false,civilian=false,king=false,home=null,role=null,potentialRole=null}={}){const g=new THREE.Group(),actor=new THREE.Group();g.add(actor);const body=new THREE.Mesh(new THREE.BoxGeometry(1.05,1.7,.7),king?mats.gold:enemy?mats.enemy:civilian?mats.white:mats.blue);body.position.y=1.6;body.castShadow=!isMobile;actor.add(body);const head=new THREE.Mesh(new THREE.BoxGeometry(.78,.78,.78),mats.skin);head.position.y=2.85;head.castShadow=!isMobile;actor.add(head);for(const dx of[-.26,.26]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.28,1,.28),mats.black);leg.position.set(dx,.55,0);leg.castShadow=!isMobile;actor.add(leg)}g.position.set(x,W.groundY(x,z),z);scene.add(g);const e={mesh:g,actor,body,hp:king?12:5,maxHp:king?12:5,alive:true,enemy,civilian,king,recruited:false,speed:king?3.7:enemy?4.1:4.5,cooldown:0,home,retreat:0,role:role||null,potentialRole:potentialRole||roleFrom(x,z),order:'follow',holdPos:null,equipment:null,cavalryHorse:null};if(role||enemy||king)equipRole(e,king?'infantry':(role||roleFrom(x,z,7)));if(enemy||king)enemies.push(e);else civilians.push(e);return e}
function animalMaterial(type){if(type==='lion')return mats.lion;if(type==='horse')return mats.horse;if(type==='camel')return mats.camel;return mats.sheep}
function makeAnimal(type,x,z,owned=false){const g=new THREE.Group(),material=animalMaterial(type),long=type==='horse'||type==='camel',body=new THREE.Mesh(new THREE.BoxGeometry(long?1.35:1.15,type==='camel'?1.05:.8,long?2.25:1.45),material);body.position.y=type==='camel'?1.18:1;body.castShadow=!isMobile;g.add(body);const head=new THREE.Mesh(new THREE.BoxGeometry(.7,.7,.7),material);head.position.set(0,type==='camel'?1.75:1.35,long?1.25:.9);head.castShadow=!isMobile;g.add(head);for(const dx of[-.38,.38])for(const dz of[-.65,.65]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.18,type==='camel'?1.05:.8,.18),type==='sheep'?mats.black:material);leg.position.set(dx,type==='camel'?.52:.4,dz);leg.castShadow=!isMobile;g.add(leg)}if(type==='lion')addBox(g,.96,.96,.52,mats.mane,0,1.4,.72,false);if(type==='camel')addBox(g,.85,.65,.85,material,0,1.85,-.15,false);g.position.set(x,W.groundY(x,z),z);scene.add(g);const a={mesh:g,type,hp:type==='lion'?7:5,maxHp:type==='lion'?7:5,alive:true,speed:type==='lion'?5.2:type==='horse'?7.2:type==='camel'?6:3,wander:W.randAt(x,z,1601)*Math.PI*2,cooldown:0,owned};if(type==='lion')enemies.push(a);else livestock.push(a);return a}
const player=makeHumanoid({x:0,z:0,role:'infantry'});civilians.splice(civilians.indexOf(player),1);player.enemy=false;player.civilian=false;player.hp=14;player.maxHp=14;player.mesh.scale.set(1.08,1.08,1.08);
function seedRand(def,salt){return W.hash2i(Math.floor(def.x),Math.floor(def.z),salt)}function ensureSettlement(def){if(generatedSettlements.has(def.id))return generatedSettlements.get(def.id);const runtime=def.type==='city'?buildCity(def):buildVillage(def);generatedSettlements.set(def.id,runtime);return runtime}
function buildVillage(def){const group=new THREE.Group();group.name=`village-${def.name}`;scene.add(group);const runtime={...def,group,captured:false,discovered:false,defendersRuntime:[],kingRuntime:null},count=5+Math.floor(seedRand(def,1701)*4),radius=12+count;for(let i=0;i<count;i++){const a=i/count*Math.PI*2+seedRand(def,1710+i)*.45,r=5+seedRand(def,1740+i)*radius,x=def.x+Math.cos(a)*r,z=def.z+Math.sin(a)*r,y=W.groundY(x,z);addBox(group,5.5,3.1,4.7,mats.adobe,x,y+1.55,z,false);const beam=addBox(group,2.3,.24,5,mats.wood,x,y+3.25,z,false);beam.rotation.y=seedRand(def,1770+i)*Math.PI}worldBox(1.8,.45,1.8,mats.dark,def.x,W.groundY(def.x,def.z)+.22,def.z,false);const civCount=Math.min(12,Math.max(5,Math.ceil(def.population/4)));for(let i=0;i<civCount;i++){const x=def.x+(seedRand(def,1800+i*2)-.5)*26,z=def.z+(seedRand(def,1801+i*2)-.5)*26;makeHumanoid({x,z,civilian:true,home:runtime,potentialRole:roleFrom(x,z,i)})}return runtime}
function buildCity(def){const group=new THREE.Group();group.name=`city-${def.name}`;scene.add(group);const r=19+def.tier*4,wallH=4.2+def.tier*.45,step=4,runtime={...def,group,radius:r,captured:false,discovered:false,defendersRuntime:[],kingRuntime:null};for(let x=-r;x<=r;x+=step){addBox(group,step+.2,wallH,2,mats.adobe2,def.x+x,W.groundY(def.x+x,def.z-r)+wallH/2,def.z-r,false);if(Math.abs(x)>4.5)addBox(group,step+.2,wallH,2,mats.adobe2,def.x+x,W.groundY(def.x+x,def.z+r)+wallH/2,def.z+r,false)}for(let z=-r+step;z<=r-step;z+=step){addBox(group,2,wallH,step+.2,mats.adobe2,def.x-r,W.groundY(def.x-r,def.z+z)+wallH/2,def.z+z,false);addBox(group,2,wallH,step+.2,mats.adobe2,def.x+r,W.groundY(def.x+r,def.z+z)+wallH/2,def.z+z,false)}for(const[dx,dz]of[[-r,-r],[r,-r],[-r,r],[r,r]])addBox(group,4.3,wallH+2.7,4.3,mats.adobe2,def.x+dx,W.groundY(def.x+dx,def.z+dz)+(wallH+2.7)/2,def.z+dz,false);const houseCount=7+def.tier*4;for(let i=0;i<houseCount;i++){const col=i%4,row=Math.floor(i/4),x=def.x-r+7+col*((2*r-14)/3)+(seedRand(def,1900+i)-.5)*2.2,z=def.z-r+8+row*8.2;if(z>def.z+r-8||(Math.abs(x-def.x)<5&&z<def.z-3))continue;addBox(group,5.6,3.1,4.8,i%3===0?mats.adobe2:mats.adobe,x,W.groundY(x,z)+1.55,z,false)}const py=W.groundY(def.x,def.z-7);addBox(group,11+def.tier*1.5,4.8+def.tier*.5,8,mats.adobe2,def.x,py+2.4+def.tier*.25,def.z-7,false);addBox(group,2.2,1.1,1,mats.gold,def.x,py+5.15+def.tier*.5,def.z-2.8,false);const civCount=Math.min(16,Math.max(7,Math.ceil(def.population/14)));for(let i=0;i<civCount;i++){const x=def.x+(seedRand(def,2000+i*2)-.5)*(r*1.25),z=def.z+(seedRand(def,2001+i*2)-.5)*(r*1.1);makeHumanoid({x,z,civilian:true,home:runtime,potentialRole:roleFrom(x,z,i+90)})}const archers=Math.max(2,Math.round(def.defenders*.30)),cavalry=def.tier>=2?Math.max(1,Math.round(def.defenders*.12)):0;for(let i=0;i<def.defenders;i++){const role=i<archers?'archer':i<archers+cavalry?'cavalry':'infantry';let x,z;if(role==='archer'){const side=i%2?-1:1;x=def.x+(seedRand(def,2100+i)-.5)*r*1.55;z=def.z+side*(r-4)}else if(role==='cavalry'){x=def.x+(seedRand(def,2130+i)-.5)*10;z=def.z+r+5+seedRand(def,2140+i)*6}else{x=def.x+(seedRand(def,2160+i)-.5)*r*1.4;z=def.z+(seedRand(def,2180+i)-.5)*r*1.25}const e=makeHumanoid({x,z,enemy:true,home:runtime,role});runtime.defendersRuntime.push(e)}runtime.kingRuntime=makeHumanoid({x:def.x,z:def.z-5,enemy:true,king:true,home:runtime,role:'infantry'});cities.push(runtime);return runtime}
function ensureCave(def){if(generatedCaves.has(def.id))return;const group=new THREE.Group(),y=W.groundY(def.x,def.z);for(let i=-2;i<=2;i++)addBox(group,2.8,3.4+Math.abs(i)*.35,3,mats.rock,def.x+i*2.2,y+1.7,def.z,false);const opening=addBox(group,4.3,3.4,.45,mats.dark,def.x,y+1.65,def.z-1.55,false);scene.add(group);const cave={...def,group,opening,discovered:false};generatedCaves.set(def.id,cave);caves.push(cave)}
function spawnChunkWildlife(cx,cz){const key=`${cx},${cz}`;if(wildlifeChunks.has(key))return;wildlifeChunks.add(key);const centerX=cx*W.CHUNK_SIZE+W.CHUNK_SIZE/2,centerZ=cz*W.CHUNK_SIZE+W.CHUNK_SIZE/2;if(Math.hypot(centerX,centerZ)<45)return;const biome=W.biomeAt(centerX,centerZ),roll=W.hash2i(cx,cz,2201);if((biome==='steppe'||biome==='fertile'||biome==='oasis')&&roll>.5){const count=1+Math.floor(W.hash2i(cx,cz,2202)*3);for(let i=0;i<count;i++)makeAnimal('sheep',centerX+(W.hash2i(cx,cz,2210+i)-.5)*30,centerZ+(W.hash2i(cx,cz,2220+i)-.5)*30,false)}if(biome==='desert'&&roll>.78)makeAnimal('camel',centerX+(W.hash2i(cx,cz,2231)-.5)*24,centerZ+(W.hash2i(cx,cz,2232)-.5)*24,false);if((biome==='rocky'||biome==='steppe')&&W.hash2i(cx,cz,2240)>.83)makeAnimal('lion',centerX+(W.hash2i(cx,cz,2241)-.5)*25,centerZ+(W.hash2i(cx,cz,2242)-.5)*25,false)}
for(let i=0;i<6;i++){const a=i/6*Math.PI*2;makeAnimal('sheep',W.starterVillage.x+Math.cos(a)*(7+i%2*2),W.starterVillage.z+Math.sin(a)*(7+i%2*2),true)}const horseAngle=W.hash2i(1,9,2301)*Math.PI*2;makeAnimal('horse',Math.cos(horseAngle)*18,Math.sin(horseAngle)*18,false);