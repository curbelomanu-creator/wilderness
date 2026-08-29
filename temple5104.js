// Wilderness 5.10.4 - terrain-integrated, walkable Jerusalem Temple
(()=>{
const T=window.THREE,W=window.WildernessWorld,J=window.WildernessJerusalem54;
if(!T||!W||!J||typeof scene==='undefined')return;
const a=J.anchors;if(!a?.temple)return;
const tx=a.temple.x,tz=a.temple.z;
const old=scene.getObjectByName('jerusalem54-temple');if(old)old.visible=false;
const oldMarket=scene.getObjectByName('jerusalem54-market');if(oldMarket)oldMarket.visible=false;
const G=new T.Group();G.name='temple5104';G.userData.temple5104=true;scene.add(G);
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
const M={pave:mat(0xc5bba4),pave2:mat(0xa79d89),wall:mat(0x978f80),light:mat(0xc9c0aa),wood:mat(0x574132),dark:mat(0x241d18),bronze:mat(0xa87c3e),gold:mat(0xc4a34f)};
function box(w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.temple5104=true;G.add(q);return q}
function gy(x,z){return W.groundY(x,z)}
// Ground-hugging court pavement: many small slabs instead of one floating rectangle.
const cell=4;for(let ix=-5;ix<=5;ix++)for(let iz=-4;iz<=4;iz++){
 const x=tx+ix*cell,z=tz+iz*cell;
 // Keep the monumental southern gateway corridor visually open.
 const y=gy(x,z);box(cell+.12,.10,cell+.12,(ix+iz)&1?M.pave:M.pave2,x,y+.05,z,false);
}
// Retaining/perimeter walls follow local ground segment by segment.
function wallLine(x1,z1,x2,z2,gapCenter=false){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/4));for(let i=0;i<n;i++){
 const t=(i+.5)/n,x=x1+dx*t,z=z1+dz*t;if(gapCenter&&Math.abs((i+.5)-n/2)<1.7)continue;
 const seg=len/n,y=gy(x,z),h=2.65,q=box(1.15,h,seg+.15,M.wall,x,y+h/2,z);q.rotation.y=Math.atan2(dx,dz);
 }}
wallLine(tx-23,tz-18,tx+23,tz-18,true);wallLine(tx-23,tz+18,tx+23,tz+18);wallLine(tx-23,tz-18,tx-23,tz+18);wallLine(tx+23,tz-18,tx+23,tz+18);
// Southern gate towers are rooted independently in the actual surface.
for(const sx of[-6.4,6.4]){const x=tx+sx,z=tz-17.2,y=gy(x,z);box(4.2,6.5,4.2,M.wall,x,y+3.25,z);box(4.7,.28,4.7,M.light,x,y+6.64,z)}
// Processional approach. The underlying terrain remains the walkable surface; slabs merely skin it.
const start={x:tx-28,z:tz-38},end={x:tx,z:tz-19.2};const dx=end.x-start.x,dz=end.z-start.z,L=Math.hypot(dx,dz),steps=Math.ceil(L/2.25);for(let i=0;i<=steps;i++){
 const t=i/steps,x=start.x+dx*t,z=start.z+dz*t,y=gy(x,z),q=box(6.2,.09,2.5,M.pave,x,y+.045,z,false);q.rotation.y=Math.atan2(dx,dz);
}
// Broad shallow ceremonial steps at the final ascent, each placed on sampled terrain.
for(let i=0;i<7;i++){const t=i/6,x=tx-5.2*(1-t),z=tz-23.5+4.4*t,y=gy(x,z);box(8.4,.12,1.2,M.light,x,y+.06,z,false)}
// Altar remains in the open court, but now sits on its local terrain instead of the old platform Y.
const altarZ=tz-6.2,altarY=gy(tx,altarZ);box(4.2,.18,4.2,M.pave2,tx,altarY+.09,altarZ,false);box(3.1,1.65,3.1,M.bronze,tx,altarY+.825,altarZ);
// Sanctuary: foundation is sunk to the terrain and the usable floor sits on the high inner plateau.
const sx=tx,sz=tz+6.4;let minY=Infinity,maxY=-Infinity;for(const ox of[-8.5,0,8.5])for(const oz of[-9,0,9]){const y=gy(sx+ox,sz+oz);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}
const floorY=maxY+.08;const foundationH=Math.max(.45,floorY-minY);box(18,foundationH,19,M.wall,sx,minY+foundationH/2,sz);
box(17,10.5,18,M.light,sx,floorY+5.25,sz);box(17.7,.42,18.7,M.wood,sx,floorY+10.71,sz);
for(const ox of[-6,-3,0,3,6])box(.72,7.8,.72,M.wall,sx+ox,floorY+3.9,sz-9.4);
box(15.8,.5,1.2,M.wood,sx,floorY+8.05,sz-9.4);box(3,5.5,.25,M.dark,sx,floorY+2.75,sz-9.15);box(5.2,.32,4.4,M.gold,sx,floorY+10.95,sz,false);
// Small terrain-following steps from court to sanctuary threshold.
for(let i=0;i<5;i++){const z=sz-11.5+i*1.0,y=gy(sx,z);box(9,.10,1.15,M.light,sx,y+.05,z,false)}
// Update ritual anchors to the real accessible surface.
a.temple.y=gy(tx,tz);a.altar.y=altarY;a.altar.x=tx;a.altar.z=altarZ;
if(J.state)J.state.templeIntegrated5104=true;
// New geometry is loaded before collision45; request a refresh too for existing sessions.
setTimeout(()=>window.WildernessCollision45?.rebuild?.(true),800);
window.WildernessTemple5104={group:G,altar:{x:tx,y:altarY,z:altarZ},sanctuary:{x:sx,y:floorY,z:sz}};
})();