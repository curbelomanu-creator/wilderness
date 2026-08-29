// Wilderness 5.4 - monumental walkable Jerusalem, Temple mount and olive surroundings
(()=>{
const T=window.THREE,W=window.WildernessWorld,N=window.WildernessNations50,H=window.WildernessHistorical52;
if(!T||!W||!N||!H||typeof scene==='undefined')return;
const city=H.byId?.get?.('hist-jerusalem')||H.cities?.find?.(c=>c.historicalId==='jerusalem');
if(!city)return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const cx=city.x,cz=city.z,prevGround=W.groundY,baseY=prevGround(cx,cz);
const temple={x:cx+38,z:cz+62},oliveMount={x:cx+168,z:cz+22};
function smooth01(t){t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)}
// Jerusalem rises gradually northward. The Temple mount is the dominant plateau.
W.groundY=function(x,z){
  let y=prevGround(x,z),d=Math.hypot(x-cx,z-cz);
  if(d<158){
    const target=baseY+(z-cz)*.034+(x-cx)*.004;
    const edge=d<=122?1:1-smooth01((d-122)/36);
    y=y*(1-edge*.82)+target*(edge*.82);
  }
  // Kidron-like eastern valley between the city and the Mount of Olives.
  const vx=(x-(cx+112))/29,vz=(z-(cz+12))/118;
  y-=6.2*Math.exp(-(vx*vx+vz*vz));
  // Mount of Olives: a separate high ridge east of the city.
  const ox=(x-oliveMount.x)/72,oz=(z-oliveMount.z)/105;
  y+=10.8*Math.exp(-(ox*ox+oz*oz));
  // Temple plateau: highest urban ground, broad enough to walk comfortably.
  const td=Math.hypot(x-temple.x,z-temple.z);
  if(td<48){const k=1-smooth01(td/48),target=baseY+11.8;y=y*(1-k*.96)+target*(k*.96)}
  return Math.round(y*20)/20;
};
city.radius=122;city.scale=4;city.special='jerusalem';city.temple=temple;
const judah=N.faction('judah');if(judah)judah.spawn={x:cx,z:cz-12};
const mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
const M={limestone:mat(0xbdb39c),limestone2:mat(0x918a7d),adobe:mat(0xbba37d),adobe2:mat(0x927a61),road:mat(0xab9879),wood:mat(0x574132),cedar:mat(0x4b3529),dark:mat(0x241d18),olive:mat(0x596f43),olive2:mat(0x74844d),palm:mat(0x637c48),cloth:mat(0x775044),bronze:mat(0xa87c3e),gold:mat(0xc4a34f)};
const G=new T.Group();G.name='jerusalem54';G.userData.jerusalem54=true;scene.add(G);
function box(g,w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.jerusalem54=true;g.add(q);return q}
function root(x,z,rot=0){const g=new T.Group();g.position.set(x,W.groundY(x,z),z);g.rotation.y=rot;g.userData.jerusalem54=true;G.add(g);return g}
function road(x1,z1,x2,z2,width=6){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/3.8));for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t,y=W.groundY(x,z),q=box(G,width,.055,4.1,M.road,x,y+.028,z,false);q.rotation.y=Math.atan2(dx,dz)}}
function plaza(x,z,w,d){box(G,w,.06,d,M.road,x,W.groundY(x,z)+.03,z,false)}
function house(x,z,levels=1,stone=false,w=6.2,d=5.0,rot=0){const g=root(x,z,rot),m=stone?M.limestone:M.adobe;for(let f=0;f<levels;f++){box(g,w,3.55,d,m,0,f*3.55+1.775,0);box(g,w+.2,.22,d+.2,f%2?M.cedar:M.limestone2,0,(f+1)*3.55+.11,0)}box(g,1.1,2.65,.18,M.dark,0,1.33,d/2+.1);for(const sx of[-.28,.28])box(g,.55,.55,.15,M.dark,sx*w,2.35,d/2+.09);return g}
function tower(x,z,h=10){const g=root(x,z);box(g,5.1,h,5.1,M.limestone2,0,h/2,0);box(g,5.6,.28,5.6,M.limestone,0,h+.14,0);for(const xx of[-2,0,2])for(const zz of[-2.25,2.25])box(g,.68,.9,.68,M.limestone,xx,h+.45,zz)}
function olive(x,z,s=1){const y=W.groundY(x,z);box(G,.36*s,3.2*s,.36*s,M.wood,x,y+1.6*s,z,false);box(G,2.6*s,.78*s,2.25*s,M.olive,x,y+3.35*s,z,false);box(G,2.0*s,.62*s,1.75*s,M.olive2,x+.18*s,y+3.82*s,z-.1*s,false)}
function palm(x,z,s=1){const y=W.groundY(x,z);box(G,.38*s,4.7*s,.38*s,M.wood,x,y+2.35*s,z,false);for(let i=0;i<6;i++){const l=box(G,.24*s,.14*s,3.0*s,M.palm,x,y+4.85*s,z,false);l.rotation.y=i*Math.PI/3}}
function gate(x,z,rot=0,name='Puerta'){const g=root(x,z,rot);g.name=`jerusalem54-${name}`;for(const xx of[-5.2,5.2]){box(g,5.2,9.6,5.2,M.limestone2,xx,4.8,0);box(g,5.65,.32,5.65,M.limestone,xx,9.76,0)}box(g,15.6,1.65,4.5,M.limestone,0,8.4,0)}
const gates=[
 {x:cx,z:cz-106,rot:0,name:'puerta-sur'},
 {x:cx+10,z:cz+104,rot:Math.PI,name:'puerta-norte'},
 {x:cx-103,z:cz-8,rot:Math.PI/2,name:'puerta-oeste'},
 {x:cx+103,z:cz+12,rot:-Math.PI/2,name:'puerta-este'}
];
function nearGate(x,z){return gates.some(g=>Math.hypot(x-g.x,z-g.z)<10.5)}
function wallEdge(ax,az,bx,bz){const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/9));for(let i=0;i<n;i++){const t=(i+.5)/n,x=ax+dx*t,z=az+dz*t;if(nearGate(x,z))continue;const seg=len/n,y=W.groundY(x,z),q=box(G,2.25,7.5,seg,M.limestone2,x,y+3.75,z);q.rotation.y=Math.atan2(dx,dz);if(!mobile&&i%2===0){const c=box(G,2.7,.8,.85,M.limestone,x,y+7.9,z);c.rotation.y=Math.atan2(dx,dz)}}}
const wallPoly=[[-84,-104],[66,-108],[104,-64],[105,64],[65,104],[-54,106],[-98,58],[-106,-44]].map(([x,z])=>[cx+x,cz+z]);
for(let i=0;i<wallPoly.length;i++){const a=wallPoly[i],b=wallPoly[(i+1)%wallPoly.length];wallEdge(a[0],a[1],b[0],b[1])}
gates.forEach(g=>gate(g.x,g.z,g.rot,g.name));
// Walkable street hierarchy: gates -> central market -> upper city -> Temple.
road(cx,cz-98,cx,cz+78,7.5);road(cx-94,cz-8,cx+94,cz-8,6.6);road(cx-48,cz-86,cx-48,cz+72,4.5);road(cx+42,cz-80,cx+42,cz+34,4.5);road(cx-82,cz+38,cx+78,cz+38,4.3);road(cx+2,cz+26,temple.x,temple.z-20,5.5);road(cx+95,cz+12,cx+15,cz+5,5.2);
plaza(cx,cz-8,27,22);plaza(cx-38,cz+42,18,14);plaza(temple.x,temple.z-24,21,13);
// Dense but traversable neighborhoods. The central road corridors remain clear.
const xs=mobile?[-72,-50,-27,27,51,73]:[-74,-57,-40,-23,24,41,58,75];
const zs=mobile?[-77,-51,-25,13,38,62]:[-80,-63,-46,-28,12,28,45,62];
let hi=0;for(const x0 of xs)for(const z0 of zs){const x=cx+x0,z=cz+z0;if(Math.abs(x-cx)<13||Math.abs(z-(cz-8))<11)continue;if(x>cx+10&&z>cz+34)continue;if(Math.hypot(x-(cx-38),z-(cz+42))<18)continue;const levels=((hi++%5===0)||z0>35)?2:1;house(x,z,levels,hi%3===0,5.6+(hi%2)*.7,4.6+(hi%3)*.25,(hi%2?0:Math.PI))}
// Lower-city terraces along the southern ascent.
for(let i=0;i<(mobile?6:10);i++){const side=i%2?-1:1,x=cx+side*(18+(i%3)*8),z=cz-88+Math.floor(i/2)*13;house(x,z,1,i%3===0,5.4,4.3,side>0?-Math.PI/2:Math.PI/2)}
// Central market.
for(let i=-2;i<=2;i++){const g=root(cx+i*4.6,cz-8+(i%2?7:-7));box(g,3.6,.13,2.8,i%2?M.cloth:M.adobe2,0,2.75,0);for(const dx of[-1.4,1.4])for(const dz of[-1,1])box(g,.11,2.65,.11,M.wood,dx,1.32,dz);box(g,2.8,.6,1.15,M.wood,0,.3,.1)}
// Royal/administrative complex west of the upper city.
const palaceX=cx-38,palaceZ=cz+42,pg=root(palaceX,palaceZ);box(pg,22,5.2,15,M.limestone2,0,2.6,0);box(pg,16,4.6,11,M.adobe,0,7.4,-1);box(pg,16.5,.3,11.5,M.cedar,0,9.85,-1);for(const xx of[-6,-3,0,3,6])box(pg,.55,4.2,.55,M.limestone,xx,2.1,8.2);tower(cx-73,cz+72,11);tower(cx-74,cz-77,9.5);
// Temple mount: broad open court and a tall sanctuary at the highest urban point.
const ty=W.groundY(temple.x,temple.z),tg=new T.Group();tg.position.set(temple.x,ty,temple.z);tg.name='jerusalem54-temple';tg.userData.jerusalem54=true;G.add(tg);
box(tg,46,.32,36,M.limestone,0,.16,0,false);
// Low court walls with a broad southern entrance left open.
box(tg,46,2.5,1.25,M.limestone2,0,1.25,-18);box(tg,46,2.5,1.25,M.limestone2,0,1.25,18);box(tg,1.25,2.5,36,M.limestone2,-23,1.25,0);box(tg,1.25,2.5,36,M.limestone2,23,1.25,0);
// Southern court gateway, intentionally open.
for(const xx of[-6.2,6.2])box(tg,4.4,6.6,4.2,M.limestone2,xx,3.3,-16.2);box(tg,17,1.3,4.2,M.limestone,0,6.0,-16.2);
// Altar in the open court for the later FAVOR DE ELOHIM ritual system.
box(tg,3.1,1.65,3.1,M.bronze,0,.83,-6.2);box(tg,4.1,.28,4.1,M.limestone2,0,.14,-6.2,false);
// Sanctuary and porch.
box(tg,17,10.5,18,M.limestone,0,5.25,6.4);box(tg,17.7,.42,18.7,M.cedar,0,10.72,6.4);for(const xx of[-6,-3,0,3,6])box(tg,.72,7.8,.72,M.limestone2,xx,3.9,-3.0);box(tg,15.8,.5,1.2,M.cedar,0,8.05,-3.0);box(tg,3.0,5.5,.25,M.dark,0,2.75,-2.7);box(tg,5.2,.32,4.4,M.gold,0,10.95,6.4,false);
// A clear processional approach to the Temple mount.
road(cx+6,cz+31,temple.x,temple.z-19,6.2);
// Olive belt around Jerusalem and a denser Mount of Olives east of the valley.
const treeCount=mobile?34:62;for(let i=0;i<treeCount;i++){const a=W.hash2i(i,54,5401)*Math.PI*2,r=128+W.hash2i(i,54,5402)*78,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(Math.abs(Math.sin(a))<.08&&r<155)continue;olive(x,z,.72+W.hash2i(i,54,5403)*.45)}
for(let i=0;i<(mobile?18:30);i++){const a=W.hash2i(i,55,5411)*Math.PI*2,r=18+W.hash2i(i,55,5412)*62,x=oliveMount.x+Math.cos(a)*r,z=oliveMount.z+Math.sin(a)*r;olive(x,z,.75+W.hash2i(i,55,5413)*.42)}
// Palms are concentrated in the warmer eastern/southeastern approaches, not across the whole hill country.
for(let i=0;i<(mobile?6:10);i++){const x=cx+122+W.hash2i(i,56,5421)*68,z=cz-82+W.hash2i(i,56,5422)*92;palm(x,z,.72+W.hash2i(i,56,5423)*.35)}
const anchors={center:{x:cx,z:cz-8},spawn:{x:cx,z:cz-12},palace:{x:palaceX,z:palaceZ},temple:{x:temple.x,z:temple.z,y:ty},altar:{x:temple.x,z:temple.z-6.2,y:ty},mountOfOlives:{x:oliveMount.x,z:oliveMount.z},gates};
function suppressGeneric(){
  try{const rt=typeof generatedSettlements!=='undefined'&&generatedSettlements.get(city.id);if(rt?.group)rt.group.visible=false;if(rt){rt.radius=city.radius;rt.special='jerusalem'}}catch(_){ }
  try{const cg=window.WildernessCultural53?.groups?.get?.(city.id);if(cg)cg.visible=false}catch(_){ }
  for(const o of scene.children){if(o===G)continue;const n=(o?.name||'').toLowerCase();if((n.includes('hist-jerusalem')||n.includes('jerusal'))&&(n.startsWith('settlement46')||n.startsWith('cultural53')||n.startsWith('city-')||n.startsWith('v40-')))o.visible=false}
}
let last=0;function loop(t){if(t-last>650){last=t;suppressGeneric()}requestAnimationFrame(loop)}requestAnimationFrame(loop);suppressGeneric();
window.WildernessJerusalem54={city,group:G,anchors,temple:anchors.temple,altar:anchors.altar,gates,baseY};
})();