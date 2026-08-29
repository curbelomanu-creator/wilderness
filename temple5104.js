// Wilderness 5.10.4 - terrain-integrated, walkable Jerusalem Temple
(()=>{
const T=window.THREE,W=window.WildernessWorld,H=window.WildernessHistorical52;
if(!T||!W||typeof scene==='undefined')return;
const old=scene.getObjectByName('jerusalem54-temple');
const city=H?.byId?.get?.('hist-jerusalem')||H?.cities?.find?.(c=>c.historicalId==='jerusalem');
if(!old&&!city)return;
const tx=old?.position?.x??(city.x+38),tz=old?.position?.z??(city.z+62);if(old)old.visible=false;
const G=new T.Group();G.name='temple5104';G.userData.temple5104=true;scene.add(G);
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
const M={pave:mat(0xc5bba4),pave2:mat(0xa79d89),wall:mat(0x978f80),light:mat(0xc9c0aa),wood:mat(0x574132),dark:mat(0x241d18),bronze:mat(0xa87c3e),gold:mat(0xc4a34f)};
function box(w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.temple5104=true;G.add(q);return q}
function gy(x,z){return W.groundY(x,z)}
// Ground-hugging court pavement: small slabs follow the actual mountain surface.
const cell=4;for(let ix=-5;ix<=5;ix++)for(let iz=-4;iz<=4;iz++){const x=tx+ix*cell,z=tz+iz*cell,y=gy(x,z);box(cell+.12,.10,cell+.12,(ix+iz)&1?M.pave:M.pave2,x,y+.05,z,false)}
// Perimeter walls are rooted independently so their bases follow the terrain.
function wallLine(x1,z1,x2,z2,gapCenter=false){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/4));for(let i=0;i<n;i++){const t=(i+.5)/n,x=x1+dx*t,z=z1+dz*t;if(gapCenter&&Math.abs((i+.5)-n/2)<1.7)continue;const seg=len/n,y=gy(x,z),h=2.65,q=box(1.15,h,seg+.15,M.wall,x,y+h/2,z);q.rotation.y=Math.atan2(dx,dz)}}
wallLine(tx-23,tz-18,tx+23,tz-18,true);wallLine(tx-23,tz+18,tx+23,tz+18);wallLine(tx-23,tz-18,tx-23,tz+18);wallLine(tx+23,tz-18,tx+23,tz+18);
for(const sx of[-6.4,6.4]){const x=tx+sx,z=tz-17.2,y=gy(x,z);box(4.2,6.5,4.2,M.wall,x,y+3.25,z);box(4.7,.28,4.7,M.light,x,y+6.64,z)}
// Processional approach from the Jerusalem street network; underlying ground remains walkable.
const start={x:tx-28,z:tz-38},end={x:tx,z:tz-19.2},dx=end.x-start.x,dz=end.z-start.z,L=Math.hypot(dx,dz),steps=Math.ceil(L/2.25);for(let i=0;i<=steps;i++){const t=i/steps,x=start.x+dx*t,z=start.z+dz*t,y=gy(x,z),q=box(6.2,.09,2.5,M.pave,x,y+.045,z,false);q.rotation.y=Math.atan2(dx,dz)}
for(let i=0;i<7;i++){const t=i/6,x=tx-5.2*(1-t),z=tz-23.5+4.4*t,y=gy(x,z);box(8.4,.10,1.2,M.light,x,y+.05,z,false)}
// Altar sits directly on its sampled local surface.
const altarZ=tz-6.2,altarY=gy(tx,altarZ);box(4.2,.16,4.2,M.pave2,tx,altarY+.08,altarZ,false);box(3.1,1.65,3.1,M.bronze,tx,altarY+.825,altarZ);
// Sanctuary foundation reaches down into the hill; no exposed floating slab.
const sx=tx,sz=tz+6.4;let minY=Infinity,maxY=-Infinity;for(const ox of[-8.5,0,8.5])for(const oz of[-9,0,9]){const y=gy(sx+ox,sz+oz);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}const floorY=maxY+.08,foundationH=Math.max(.45,floorY-minY+.25);
box(18,foundationH,19,M.wall,sx,minY+foundationH/2,sz);box(17,10.5,18,M.light,sx,floorY+5.25,sz);box(17.7,.42,18.7,M.wood,sx,floorY+10.71,sz);
for(const ox of[-6,-3,0,3,6])box(.72,7.8,.72,M.wall,sx+ox,floorY+3.9,sz-9.4);box(15.8,.5,1.2,M.wood,sx,floorY+8.05,sz-9.4);box(3,5.5,.25,M.dark,sx,floorY+2.75,sz-9.15);box(5.2,.32,4.4,M.gold,sx,floorY+10.95,sz,false);
for(let i=0;i<5;i++){const z=sz-11.5+i,y=gy(sx,z);box(9,.10,1.15,M.light,sx,y+.05,z,false)}
// Update whichever Jerusalem API is present so Temple/Favor interactions use the accessible altar.
const J=window.WildernessJerusalem54||W.jerusalem54||window.Jerusalem54;if(J?.anchors){J.anchors.temple.y=gy(tx,tz);Object.assign(J.anchors.altar,{x:tx,y:altarY,z:altarZ})}
if(city){city.temple={x:tx,z:tz,y:gy(tx,tz)};city.templeAltar={x:tx,z:altarZ,y:altarY}}
setTimeout(()=>window.WildernessCollision45?.rebuild?.(true),800);
window.WildernessTemple5104={group:G,altar:{x:tx,y:altarY,z:altarZ},sanctuary:{x:sx,y:floorY,z:sz}};
})();