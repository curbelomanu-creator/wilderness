// Wilderness 4.7 - biome vegetation, oasis pools, atmosphere and deep-water boundary
(()=>{
const T=window.THREE,W=window.WildernessWorld;if(!T||!W||typeof scene==='undefined'||typeof chunks==='undefined'||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const B={groups:new Map(),lastBiome:'',last:0};
const mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
const M={wood:mat(0x5b3925),leaf:mat(0x48653c),leaf2:mat(0x637d48),grass:mat(0x75934e),dry:mat(0xa4915d),rock:mat(0x746a60),rock2:mat(0x8b7e70),palm:mat(0x6c8747),sand:mat(0xc4a36c),water:new T.MeshLambertMaterial({color:0x4b8793,transparent:true,opacity:.72,side:T.DoubleSide,depthWrite:false})};
function box(g,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;q.receiveShadow=true;g.add(q);return q}
function cedar(g,x,z,s=1){const y=W.groundY(x,z);box(g,.52*s,5.4*s,.52*s,M.wood,x,y+2.7*s,z);box(g,3.4*s,.75*s,3.0*s,M.leaf,x,y+4.6*s,z);box(g,2.8*s,.68*s,2.5*s,M.leaf2,x,y+5.35*s,z);box(g,2.1*s,.58*s,2.0*s,M.leaf,x,y+5.95*s,z)}
function broadTree(g,x,z,s=1){const y=W.groundY(x,z);box(g,.50*s,4.5*s,.50*s,M.wood,x,y+2.25*s,z);box(g,3.8*s,1.2*s,3.5*s,M.leaf2,x,y+4.55*s,z);box(g,2.8*s,1.0*s,2.7*s,M.leaf,x+.35*s,y+5.25*s,z-.2*s)}
function palm(g,x,z,s=1){const y=W.groundY(x,z);box(g,.42*s,5.8*s,.42*s,M.wood,x,y+2.9*s,z);for(let i=0;i<6;i++){const a=i*Math.PI/3,q=box(g,.28*s,.16*s,2.9*s,M.palm,x,y+6.05*s,z);q.rotation.y=a;q.rotation.x=(i%2?-.12:.06)}}
function shrub(g,x,z,s=1,dry=false){const y=W.groundY(x,z);box(g,1.3*s,.62*s,1.15*s,dry?M.dry:M.grass,x,y+.31*s,z)}
function grass(g,x,z,s=1){const y=W.groundY(x,z);for(let i=-1;i<=1;i++){const q=box(g,.10,.75*s,.10,i?M.grass:M.leaf2,x+i*.34*s,y+.37*s,z+(i%2)*.18);q.rotation.z=i*.16}}
function rock(g,x,z,s=1){const y=W.groundY(x,z),q=box(g,2.1*s,1.45*s,1.75*s,W.randAt(x,z,4788)>.5?M.rock:M.rock2,x,y+.72*s,z);q.rotation.y=W.randAt(x,z,4789)*Math.PI}
function oasisPool(g,o){if(!o)return;const y=W.groundY(o.x,o.z)+.06,r=Math.max(2.8,o.r*.28),q=new T.Mesh(new T.CylinderGeometry(r,r,.07,20),M.water);q.position.set(o.x,y,o.z);q.receiveShadow=false;q.renderOrder=3;g.add(q)}
function decorate(cx,cz){
  const key=`${cx},${cz}`;if(B.groups.has(key))return;const g=new T.Group();g.name='biome47-'+key;scene.add(g);B.groups.set(key,g);
  const minX=cx*W.CHUNK_SIZE,minZ=cz*W.CHUNK_SIZE,count=mobile?7:13,seenOasis=new Set();
  for(let i=0;i<count;i++){
    const x=minX+4+W.hash2i(cx,cz,4770+i*5)*(W.CHUNK_SIZE-8),z=minZ+4+W.hash2i(cx,cz,4771+i*5)*(W.CHUNK_SIZE-8);if(W.roadAt(x,z)||W.waterAt?.(x,z))continue;
    const b=W.biomeAt(x,z),r=W.hash2i(cx,cz,4772+i*5),s=.72+W.hash2i(cx,cz,4773+i*5)*.75;
    if(b==='forest'){if(r<.52)cedar(g,x,z,s);else if(r<.88)broadTree(g,x,z,s);else shrub(g,x,z,s*.8)}
    else if(b==='grassland'){if(r<.22)broadTree(g,x,z,s*.85);else grass(g,x,z,s)}
    else if(b==='fertile'){if(r<.30)broadTree(g,x,z,s*.82);else if(r<.72)grass(g,x,z,s);else shrub(g,x,z,s*.8)}
    else if(b==='steppe'){if(r<.22)rock(g,x,z,s*.55);else shrub(g,x,z,s*.72,true)}
    else if(b==='desert'){if(r<.18)rock(g,x,z,s*.52);else if(r>.78)shrub(g,x,z,s*.58,true)}
    else if(b==='oasis'){const o=W.oasisInfoAt?.(x,z);if(o){const ok=`${Math.round(o.x)},${Math.round(o.z)}`;if(!seenOasis.has(ok)){seenOasis.add(ok);oasisPool(g,o)}}if(r<.72)palm(g,x,z,s);else shrub(g,x,z,s)}
    else if(b==='mountain'){if(r<.64)rock(g,x,z,s*.9);else if(r>.82)cedar(g,x,z,s*.7)}
    else if(b==='rocky'){if(r<.68)rock(g,x,z,s*.75);else shrub(g,x,z,s*.55,true)}
    else if(b==='coast'){if(r<.28)palm(g,x,z,s*.82);else if(r<.58)shrub(g,x,z,s*.65);else if(r>.86)rock(g,x,z,s*.48)}
  }
}
function atmosphere(){const b=W.biomeAt(player.mesh.position.x,player.mesh.position.z);if(b===B.lastBiome)return;B.lastBiome=b;const bg={sea:0x91b6bd,coast:0xb9c8b0,forest:0x8fa98b,grassland:0xa8bf91,fertile:0x9eb68c,steppe:0xb8b590,desert:0xcbb985,oasis:0x91b5a2,mountain:0xa6a9a6,rocky:0xb0aaa2}[b]||0xb8c6bd;scene.background.setHex(bg);scene.fog.color.setHex(bg);const dens={sea:.0034,coast:.0038,forest:.0054,grassland:.0041,fertile:.0043,steppe:.0042,desert:.0040,oasis:.0042,mountain:.0052,rocky:.0048}[b]||.0043;scene.fog.density=mobile?dens*1.22:dens}
// Until swimming/boats exist, deep water is a physical boundary. Shallows remain reachable.
if(typeof updatePlayer==='function'){
  const baseUpdate47=updatePlayer;updatePlayer=function(dt){const before=player.mesh.position.clone(),mBefore=(typeof mounted!=='undefined'&&mounted&&mount)?mount.mesh.position.clone():null;baseUpdate47(dt);if(W.deepWaterAt?.(player.mesh.position.x,player.mesh.position.z)){player.mesh.position.x=before.x;player.mesh.position.z=before.z;if(mBefore&&mount){mount.mesh.position.x=mBefore.x;mount.mesh.position.z=mBefore.z}}};
}
function sync(t){
  for(const key of chunks.keys()){const[cx,cz]=key.split(',').map(Number);decorate(cx,cz)}
  for(const[key,g]of[...B.groups])if(!chunks.has(key)){scene.remove(g);g.traverse(o=>o.geometry?.dispose?.());B.groups.delete(key)}
  atmosphere();B.last=t;
}
function loop(t){if(t-B.last>360)sync(t);requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessBiomes47=B;
})();