// Wilderness 5.11.2 — monumental Jerusalem W6
// Georeferenced at Jerusalem origin (0,0), with local biblical-era topography and corridor-aligned gates.
(()=>{
  if(window.Wilderness6Jerusalem)return;
  const T=window.THREE,W=window.WildernessWorld,D=window.Wilderness6World;
  if(!T||!W||!D||typeof scene==='undefined')return;
  const J=D.getPlace?.('jerusalem')||D.byId?.get?.('jerusalem');if(!J)return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const cx=J.x,cz=J.z;

  // Hide both the old bespoke Jerusalem and the temporary generic W6 city scaffold.
  try{const old=scene.getObjectByName('jerusalem54');if(old)old.visible=false;}catch(_){ }
  try{if(typeof generatedSettlements!=='undefined'){const rt=generatedSettlements.get('w6-jerusalem');if(rt?.group)rt.group.visible=false;}}catch(_){ }

  const prevGround=W.groundY;
  const base=prevGround(cx,cz);
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
  // Local city-scale terrain: ridge, City of David descent, Kidron, Hinnom, Mount of Olives.
  W.groundY=function(x,z){
    let y=prevGround(x,z),d=Math.hypot(x-cx,z-cz);
    if(d<310){
      const ridge=base+2.2+(z-cz)*.010-(x-cx)*.002;
      const k=d<220?1:1-smooth((d-220)/90);y=y*(1-k*.62)+ridge*(k*.62);
    }
    const kidronX=cx+145,kdx=(x-kidronX)/34,kdz=(z-(cz+5))/245;
    y-=7.8*Math.exp(-(kdx*kdx+kdz*kdz));
    const hinnomDx=(x-(cx-55))/105,hinnomDz=(z-(cz-205))/42;
    y-=6.2*Math.exp(-(hinnomDx*hinnomDx+hinnomDz*hinnomDz));
    const oliveDx=(x-(cx+235))/92,oliveDz=(z-(cz+30))/175;
    y+=12.5*Math.exp(-(oliveDx*oliveDx+oliveDz*oliveDz));
    // City of David descends south from the upper city.
    if(z<cz-55&&z>cz-235&&Math.abs(x-cx)<95)y-=Math.min(5.5,(-55-(z-cz))*.025);
    return Math.round(y*20)/20;
  };

  // Rebuild local ground chunks after the microtopography patch.
  try{if(typeof chunks!=='undefined'){for(const [,g] of [...chunks])scene.remove(g);chunks.clear();}if(typeof updateChunks==='function')updateChunks(true);}catch(e){console.warn('W6 Jerusalem chunk refresh',e);}

  const mat=(c,transparent=false,opacity=1)=>new T.MeshLambertMaterial({color:c,flatShading:true,transparent,opacity});
  const M={stone:mat(0xc7b999),stone2:mat(0x9d9076),stoneDark:mat(0x756b5c),plaster:mat(0xd2c09b),adobe:mat(0xb58d64),wood:mat(0x563a25),cedar:mat(0x493424),road:mat(0xae9874),bronze:mat(0xa77738),gold:mat(0xc7a34b),olive:mat(0x596f43),olive2:mat(0x788956),cloth:mat(0x8a6048),dark:mat(0x241d18),water:mat(0x537f8b,true,.78)};
  const G=new T.Group();G.name='jerusalemW6';G.userData.wilderness6=true;scene.add(G);
  function box(parent,w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.wilderness6=true;parent.add(q);return q;}
  function root(x,z,rot=0){const g=new T.Group();g.position.set(x,W.groundY(x,z),z);g.rotation.y=rot;g.userData.wilderness6=true;G.add(g);return g;}
  function ribbon(ax,az,bx,bz,width=8){const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),steps=Math.max(1,Math.ceil(len/5));for(let i=0;i<=steps;i++){const t=i/steps,x=ax+dx*t,z=az+dz*t,y=W.groundY(x,z);const q=box(G,width,.08,5.3,M.road,x,y+.04,z,false);q.rotation.y=Math.atan2(dx,dz);q.userData.noCollision=true;}}
  function plaza(x,z,w,d){const q=box(G,w,.08,d,M.road,x,W.groundY(x,z)+.04,z,false);q.userData.noCollision=true;}
  function tower(x,z,h=21,w=8){const g=root(x,z);box(g,w,h,w,M.stone2,0,h/2,0);box(g,w+1,.5,w+1,M.stone,0,h+.25,0);for(const xx of[-w*.35,0,w*.35])for(const zz of[-w*.45,w*.45])box(g,.85,1.35,.85,M.stone,xx,h+.65,zz);return g;}
  function gate(x,z,rot,name){const g=root(x,z,rot);g.name='jerusalemW6-'+name;for(const xx of[-7.2,7.2]){box(g,7,19,8,M.stone2,xx,9.5,0);box(g,8,.5,9,M.stone,xx,19.25,0);}box(g,22,3.0,7,M.stone,0,16.5,0);box(g,6,9,.45,M.dark,0,4.5,3.4,false);return g;}
  function wallEdge(ax,az,bx,bz,gates){const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),steps=Math.ceil(len/12);for(let i=0;i<steps;i++){const t=(i+.5)/steps,x=ax+dx*t,z=az+dz*t;if(gates.some(g=>Math.hypot(x-g.x,z-g.z)<17))continue;const seg=len/steps,y=W.groundY(x,z),q=box(G,3.4,15.5,seg,M.stone2,x,y+7.75,z);q.rotation.y=Math.atan2(dx,dz);if(!mobile&&i%2===0){const c=box(G,3.9,1.2,1.2,M.stone,x,y+16.1,z);c.rotation.y=q.rotation.y;}}}
  function house(x,z,levels=2,rot=0,elite=false){const g=root(x,z,rot),w=elite?9.5:7.2,d=elite?8.0:6.2,m=elite?M.stone:M.plaster;for(let f=0;f<levels;f++){box(g,w,4.1,d,m,0,2.05+f*4.1,0);box(g,w+.25,.3,d+.25,f%2?M.cedar:M.stone2,0,4.25+f*4.1,0);}box(g,1.4,3,.22,M.dark,0,1.5,d/2+.11,false);return g;}
  function olive(x,z,s=1){const y=W.groundY(x,z);box(G,.48*s,4.4*s,.48*s,M.wood,x,y+2.2*s,z,false);box(G,3.6*s,1.15*s,3*s,M.olive,x,y+4.7*s,z,false);box(G,2.7*s,.85*s,2.3*s,M.olive2,x+.25*s,y+5.25*s,z-.1*s,false);}
  function sign(x,z,rot,text){const g=root(x,z,rot);box(g,3.8,2.1,.22,M.wood,0,3.7,0,false);box(g,.24,4.4,.24,M.wood,0,2.2,0,false);try{const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#e4cf9f';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#241a11';ctx.font='bold 38px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,64);const tex=new T.CanvasTexture(c);tex.minFilter=T.LinearFilter;const sm=new T.MeshBasicMaterial({map:tex,side:T.DoubleSide});const p=new T.Mesh(new T.PlaneGeometry(3.4,.85),sm);p.position.set(0,3.7,.13);g.add(p);}catch(_){}}

  // Walled footprint: broad upper city plus narrower southern City of David spur.
  const poly=[[-155,-190],[-92,-238],[35,-230],[120,-170],[172,-70],[165,94],[118,170],[28,205],[-92,190],[-164,120],[-184,10],[-178,-105]].map(([x,z])=>[cx+x,cz+z]);
  const gates=[
    {id:'north',x:cx+7,z:cz+201,rot:Math.PI,label:'BETEL · SAMARIA'},
    {id:'south',x:cx-22,z:cz-230,rot:0,label:'BELÉN · HEBRÓN'},
    {id:'east',x:cx+169,z:cz+20,rot:-Math.PI/2,label:'JERICÓ · JORDÁN'},
    {id:'west',x:cx-181,z:cz+20,rot:Math.PI/2,label:'GEZER · COSTA'}
  ];
  for(let i=0;i<poly.length;i++)wallEdge(poly[i][0],poly[i][1],poly[(i+1)%poly.length][0],poly[(i+1)%poly.length][1],gates);
  gates.forEach(g=>{gate(g.x,g.z,g.rot,g.id);sign(g.x+(g.id==='east'?20:g.id==='west'?-20:10),g.z+(g.id==='north'?15:g.id==='south'?-15:10),g.rot,g.label);});
  for(const [x,z] of poly.filter((_,i)=>i%2===0))tower(x,z,20+(Math.abs(z-cz)<100?2:0),8.5);

  // Protected street system: four gate corridors + upper-city processional route.
  ribbon(cx+7,cz+194,cx,cz-205,10);
  ribbon(cx-170,cz+20,cx+154,cz+20,9);
  ribbon(cx-60,cz-165,cx-60,cz+145,6.5);
  ribbon(cx+62,cz-120,cx+62,cz+120,6.5);
  plaza(cx,cz+18,42,34);

  // Temple Mount east/northeast of the upper city.
  const tx=cx+83,tz=cz+105,ty=W.groundY(tx,tz);const temple=new T.Group();temple.position.set(tx,ty,tz);temple.name='jerusalemW6-temple';G.add(temple);
  box(temple,76,.6,60,M.stone,0,.3,0,false);box(temple,76,4,2,M.stone2,0,2,-30);box(temple,76,4,2,M.stone2,0,2,30);box(temple,2,4,60,M.stone2,-38,2,0);box(temple,2,4,60,M.stone2,38,2,0);
  // Open southern entrance and monumental inner sanctuary.
  for(const xx of[-10,10])box(temple,7,8,6,M.stone2,xx,4,-27);box(temple,28,2.2,6,M.stone,0,7.1,-27);
  box(temple,28,15,30,M.stone,0,7.5,9);box(temple,29,.6,31,M.cedar,0,15.3,9);for(const xx of[-10,-5,0,5,10])box(temple,.9,10,.9,M.stone2,xx,5,-7);box(temple,24,.6,1.4,M.cedar,0,10,-7);box(temple,5,7,.3,M.dark,0,3.5,-6.7,false);box(temple,8,.5,7,M.gold,0,15.65,9,false);
  // Courtyard altar, basins and administrative side rooms.
  box(temple,5,2.4,5,M.bronze,0,1.2,-16);for(const xx of[-25,25]){box(temple,11,6,14,M.stone2,xx,3,8);box(temple,11,.35,14,M.cedar,xx,6.2,8);}
  ribbon(cx+8,cz+55,tx,tz-33,9);

  // Royal palace and upper administrative quarter.
  const px=cx-68,pz=cz+88,py=W.groundY(px,pz);const palace=new T.Group();palace.position.set(px,py,pz);palace.name='jerusalemW6-palace';G.add(palace);
  box(palace,42,8,28,M.stone2,0,4,0);box(palace,30,8,20,M.plaster,0,12,-2);box(palace,31,.5,21,M.cedar,0,16.25,-2);for(const xx of[-12,-8,-4,0,4,8,12])box(palace,.8,6,.8,M.stone,xx,3,15);plaza(px,pz+24,48,18);

  // Gihon spring in the Kidron valley east of the City of David.
  const gx=cx+124,gz=cz-112,gy=W.groundY(gx,gz);box(G,8,.15,11,M.water,gx,gy+.07,gz,false);box(G,11,1.1,2,M.stone2,gx,gy+.55,gz-6,false);box(G,11,1.1,2,M.stone2,gx,gy+.55,gz+6,false);

  // Dense neighborhoods while preserving all protected streets/plazas/monuments.
  const protectedZones=[
    (x,z)=>Math.abs(x-cx)<14,
    (x,z)=>Math.abs(z-(cz+20))<13,
    (x,z)=>Math.abs(x-(cx-60))<10,
    (x,z)=>Math.abs(x-(cx+62))<10,
    (x,z)=>Math.hypot(x-tx,z-tz)<60,
    (x,z)=>Math.hypot(x-px,z-pz)<38,
    (x,z)=>Math.hypot(x-cx,z-(cz+18))<30
  ];
  const inside=(x,z)=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const xi=poly[i][0],zi=poly[i][1],xj=poly[j][0],zj=poly[j][1];if(((zi>z)!=(zj>z))&&(x<(xj-xi)*(z-zi)/(zj-zi)+xi))c=!c;}return c;};
  const spacing=mobile?27:22;let n=0;for(let x=cx-145;x<=cx+145;x+=spacing)for(let z=cz-190;z<=cz+170;z+=spacing){if(!inside(x,z)||protectedZones.some(f=>f(x,z)))continue;const jx=x+(W.hash2i(Math.round(x),Math.round(z),6611)-.5)*5,jz=z+(W.hash2i(Math.round(x),Math.round(z),6612)-.5)*5;const levels=z>cz+40?2+(n%4===0?1:0):1+(n%3!==0?1:0);house(jx,jz,levels,n%2?0:Math.PI/2,n%9===0);n++;}

  // Mature olive trees outside the wall and on the Mount of Olives. Keep roads and valleys legible.
  const treeCount=mobile?52:96;for(let i=0;i<treeCount;i++){const a=W.hash2i(i,5112,1)*Math.PI*2,r=225+W.hash2i(i,5112,2)*155,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(Math.abs(x-(cx+145))<28)continue;olive(x,z,.85+W.hash2i(i,5112,3)*.55);}
  for(let i=0;i<(mobile?28:48);i++){const a=W.hash2i(i,5112,4)*Math.PI*2,r=30+W.hash2i(i,5112,5)*100,x=cx+235+Math.cos(a)*r,z=cz+30+Math.sin(a)*r;olive(x,z,.9+W.hash2i(i,5112,6)*.5);}

  // Mark visible W6 Jerusalem for other systems.
  J.w6Architecture='jerusalemW6_5112';
  window.Wilderness6Jerusalem=Object.freeze({version:'5.11.2',group:G,center:{x:cx,z:cz},temple:{x:tx,z:tz},palace:{x:px,z:pz},gihon:{x:gx,z:gz},gates,previousGround:prevGround});
})();