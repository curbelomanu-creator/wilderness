// Wilderness 5.10.5 - terrain-integrated Temple with continuous ground-hugging surfaces
(()=>{
const T=window.THREE,W=window.WildernessWorld,H=window.WildernessHistorical52;
if(!T||!W||typeof scene==='undefined')return;
const old=scene.getObjectByName('jerusalem54-temple');
const city=H?.byId?.get?.('hist-jerusalem')||H?.cities?.find?.(c=>c.historicalId==='jerusalem');
if(!old&&!city)return;
const tx=old?.position?.x??(city.x+38),tz=old?.position?.z??(city.z+62);if(old)old.visible=false;
const G=new T.Group();G.name='temple5104';G.userData.temple5104=true;scene.add(G);
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const mat=(c,flat=true)=>new T.MeshLambertMaterial({color:c,flatShading:flat});
const M={pave:mat(0xb9ad94,false),pave2:mat(0xa79d89,false),wall:mat(0x978f80),light:mat(0xc9c0aa),wood:mat(0x574132),dark:mat(0x241d18),bronze:mat(0xa87c3e),gold:mat(0xc4a34f)};
function box(w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.temple5104=true;G.add(q);return q}
function gy(x,z){return W.groundY(x,z)}
function continuousSurface(cx,cz,w,d,nx,nz,m,offset=.045){const v=[],ind=[];nx=Math.max(1,nx|0);nz=Math.max(1,nz|0);for(let iz=0;iz<=nz;iz++){const z=cz-d/2+d*iz/nz;for(let ix=0;ix<=nx;ix++){const x=cx-w/2+w*ix/nx;v.push(x,gy(x,z)+offset,z)}}const row=nx+1;for(let iz=0;iz<nz;iz++)for(let ix=0;ix<nx;ix++){const a=iz*row+ix,b=a+1,c=a+row,d0=c+1;ind.push(a,c,b,b,c,d0)}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(v,3));geo.setIndex(ind);geo.computeVertexNormals();const q=new T.Mesh(geo,m);q.receiveShadow=true;q.userData.temple5104=true;q.userData.noCollision=true;G.add(q);return q}
function ribbon(x1,z1,x2,z2,width,m,step=1.5,offset=.05){const dx=x2-x1,dz=z2-z1,len=Math.max(.001,Math.hypot(dx,dz)),n=Math.max(2,Math.ceil(len/step)),px=-dz/len*width/2,pz=dx/len*width/2,v=[],ind=[];for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t;for(const s of[-1,1]){const xx=x+px*s,zz=z+pz*s;v.push(xx,gy(xx,zz)+offset,zz)}}for(let i=0;i<n;i++){const a=i*2,b=a+1,c=a+2,d=c+1;ind.push(a,c,b,b,c,d)}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(v,3));geo.setIndex(ind);geo.computeVertexNormals();const q=new T.Mesh(geo,m);q.receiveShadow=true;q.userData.temple5104=true;q.userData.noCollision=true;G.add(q);return q}
continuousSurface(tx,tz,44,34,mobile?12:22,mobile?10:17,M.pave,.055);
function wallLine(x1,z1,x2,z2,gapCenter=false){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/2.6)),ux=dx/len,uz=dz/len;for(let i=0;i<n;i++){const t=(i+.5)/n;if(gapCenter&&Math.abs((i+.5)-n/2)<2.7)continue;const x=x1+dx*t,z=z1+dz*t,seg=len/n,gc=gy(x,z),g0=gy(x-ux*seg*.5,z-uz*seg*.5),g1=gy(x+ux*seg*.5,z+uz*seg*.5),bottom=Math.min(gc,g0,g1)-.08,top=Math.max(gc,g0,g1)+2.55,h=top-bottom,q=box(1.15,h,seg+.12,M.wall,x,bottom+h/2,z);q.rotation.y=Math.atan2(dx,dz)}}
wallLine(tx-23,tz-18,tx+23,tz-18,true);wallLine(tx-23,tz+18,tx+23,tz+18);wallLine(tx-23,tz-18,tx-23,tz+18);wallLine(tx+23,tz-18,tx+23,tz+18);
for(const ox of[-6.4,6.4]){const x=tx+ox,z=tz-17.2,y=gy(x,z);box(4.2,6.5,4.2,M.wall,x,y+3.25,z);box(4.7,.28,4.7,M.light,x,y+6.64,z)}
const start={x:tx-28,z:tz-38},end={x:tx,z:tz-19.2};ribbon(start.x,start.z,end.x,end.z,6.2,M.pave,mobile?2.1:1.35,.055);
for(let i=0;i<6;i++){const t=i/5,x=tx-4.8*(1-t),z=tz-23.0+3.8*t,y=gy(x,z),q=box(8.2,.10,1.05,M.light,x,y+.05,z,false);q.userData.noCollision=true}
const altarZ=tz-6.2,altarY=gy(tx,altarZ);continuousSurface(tx,altarZ,4.2,4.2,4,4,M.pave2,.06);box(3.1,1.65,3.1,M.bronze,tx,altarY+.825,altarZ);
const sx=tx,sz=tz+6.4;let minY=Infinity,maxY=-Infinity;for(const ox of[-8.5,0,8.5])for(const oz of[-9,0,9]){const y=gy(sx+ox,sz+oz);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}const floorY=maxY+.08,foundationH=Math.max(.45,floorY-minY+.25);
box(18,foundationH,19,M.wall,sx,minY+foundationH/2,sz);box(17,10.5,18,M.light,sx,floorY+5.25,sz);box(17.7,.42,18.7,M.wood,sx,floorY+10.71,sz);
for(const ox of[-6,-3,0,3,6])box(.72,7.8,.72,M.wall,sx+ox,floorY+3.9,sz-9.4);box(15.8,.5,1.2,M.wood,sx,floorY+8.05,sz-9.4);box(3,5.5,.25,M.dark,sx,floorY+2.75,sz-9.15);box(5.2,.32,4.4,M.gold,sx,floorY+10.95,sz,false);
for(let i=0;i<5;i++){const z=sz-11.5+i,y=gy(sx,z),q=box(9,.10,1.15,M.light,sx,y+.05,z,false);q.userData.noCollision=true}
const J=window.WildernessJerusalem54||W.jerusalem54||window.Jerusalem54;if(J?.anchors){J.anchors.temple.y=gy(tx,tz);Object.assign(J.anchors.altar,{x:tx,y:altarY,z:altarZ})}
if(city){city.temple={x:tx,z:tz,y:gy(tx,tz)};city.templeAltar={x:tx,z:altarZ,y:altarY}}
setTimeout(()=>window.WildernessCollision45?.rebuild?.(true),800);
window.WildernessTemple5104={group:G,altar:{x:tx,y:altarY,z:altarZ},sanctuary:{x:sx,y:floorY,z:sz},ribbon,continuousSurface};
})();