// Wilderness 5.11.2 — Jerusalem W6 monumental city layer
(()=>{
  if(window.Wilderness6Jerusalem)return;
  const T=window.THREE,W=window.WildernessWorld,D=window.Wilderness6World;
  if(!T||!W||!D||typeof scene==='undefined')return;
  const J=D.getPlace?.('jerusalem');if(!J)return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const cx=J.x,cz=J.z,base=W.groundY(cx,cz);

  // Hide every older Jerusalem visual layer; keep runtime actors untouched.
  let hidden=0;
  scene.traverse(o=>{if(o===scene)return;const n=String(o.name||'').toLowerCase();if((n.includes('jerusalem54')||n==='village-jerusalén'||n==='city-jerusalén'||n==='city-jerusalem')&&o.visible){o.visible=false;hidden++;}});
  try{const r=typeof generatedSettlements!=='undefined'&&generatedSettlements.get?.('w6-jerusalem');if(r?.group){r.group.visible=false;hidden++;}}catch(_){ }

  const mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
  const M={stone:mat(0xb9ae92),stone2:mat(0x8f8774),light:mat(0xd2c7aa),adobe:mat(0xa98562),adobe2:mat(0x8d6c51),road:mat(0xa79475),wood:mat(0x5a3b25),dark:mat(0x241b14),olive:mat(0x667747),olive2:mat(0x7e8d58),bronze:mat(0xa27a42),gold:mat(0xc3a456),cloth:mat(0x754934)};
  const G=new T.Group();G.name='wilderness6-jerusalem';G.userData.wilderness6=true;G.userData.cityId='jerusalem';scene.add(G);
  const box=(g,w,h,d,m,x,y,z,cast=true)=>{const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.wilderness6=true;g.add(q);return q;};
  const root=(x,z,rot=0)=>{const g=new T.Group();g.position.set(x,W.groundY(x,z),z);g.rotation.y=rot;g.userData.wilderness6=true;G.add(g);return g;};

  const road=(x1,z1,x2,z2,width=8)=>{const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/5));for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t,y=W.groundY(x,z),q=box(G,width,.08,5.2,M.road,x,y+.04,z,false);q.rotation.y=Math.atan2(dx,dz);q.userData.noCollision=true;}};
  const plaza=(x,z,w,d)=>{const q=box(G,w,.09,d,M.road,x,W.groundY(x,z)+.045,z,false);q.userData.noCollision=true;};
  const tower=(x,z,h=22)=>{const g=root(x,z);box(g,8,h,8,M.stone2,0,h/2,0);box(g,8.8,.5,8.8,M.light,0,h+.25,0);for(const xx of[-3,0,3])for(const zz of[-3.7,3.7])box(g,.8,1.25,.8,M.light,xx,h+.62,zz);};
  const house=(x,z,levels=2,w=8,d=6,rot=0,stone=false)=>{const g=root(x,z,rot),m=stone?M.stone:M.adobe;for(let f=0;f<levels;f++){box(g,w,4.4,d,m,0,f*4.4+2.2,0);box(g,w+.25,.28,d+.25,f%2?M.wood:M.stone2,0,(f+1)*4.4+.14,0);}box(g,1.25,3.1,.22,M.dark,0,1.55,d/2+.12);return g;};
  const olive=(x,z,s=1)=>{const y=W.groundY(x,z);box(G,.45*s,4.5*s,.45*s,M.wood,x,y+2.25*s,z,false);box(G,3.4*s,1.05*s,2.8*s,M.olive,x,y+4.7*s,z,false);box(G,2.5*s,.8*s,2.2*s,M.olive2,x+.25*s,y+5.25*s,z-.1*s,false);};

  // City outline, roughly monumental 240-unit radius, elongated north-south.
  const poly=[[-145,-185],[85,-190],[155,-130],[165,-25],[155,105],[100,175],[-45,190],[-130,150],[-170,60],[-175,-75]].map(([x,z])=>[cx+x,cz+z]);
  const gates={
    north:{x:cx+18,z:cz+184,rot:Math.PI,label:'BETEL · SAMARIA'},
    south:{x:cx-5,z:cz-184,rot:0,label:'BELÉN · HEBRÓN'},
    east:{x:cx+162,z:cz+10,rot:-Math.PI/2,label:'JERICÓ · JORDÁN'},
    west:{x:cx-168,z:cz-15,rot:Math.PI/2,label:'GEZER · COSTA'}
  };
  const gateList=Object.values(gates);
  const nearGate=(x,z)=>gateList.some(g=>Math.hypot(x-g.x,z-g.z)<17);
  const wallEdge=(a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/12));for(let i=0;i<n;i++){const t=(i+.5)/n,x=a[0]+dx*t,z=a[1]+dz*t;if(nearGate(x,z))continue;const seg=len/n,y=W.groundY(x,z),q=box(G,3.2,15.5,seg,M.stone2,x,y+7.75,z);q.rotation.y=Math.atan2(dx,dz);if(i%2===0){const c=box(G,3.7,1.2,1.05,M.light,x,y+16.1,z);c.rotation.y=q.rotation.y;}}};
  for(let i=0;i<poly.length;i++)wallEdge(poly[i],poly[(i+1)%poly.length]);
  poly.forEach(([x,z],i)=>{if(i%2===0)tower(x,z,21+(i%3)*2);});

  function gate(g){const r=root(g.x,g.z,g.rot);r.name='w6-gate';for(const xx of[-9,9]){box(r,8.5,21,9,M.stone2,xx,10.5,0);box(r,9.3,.55,9.8,M.light,xx,21.28,0)}box(r,26,2.5,8.5,M.light,0,18.5,0);box(r,10.5,10,.8,M.dark,0,5.2,4.15,false);}
  gateList.forEach(gate);

  // Protected street hierarchy: four gates -> civic plaza -> upper city -> temple.
  const civic={x:cx-12,z:cz-12};
  road(gates.south.x,gates.south.z,civic.x,civic.z,10);
  road(gates.north.x,gates.north.z,civic.x,civic.z,10);
  road(gates.west.x,gates.west.z,civic.x,civic.z,9);
  road(gates.east.x,gates.east.z,civic.x,civic.z,9);
  plaza(civic.x,civic.z,40,34);
  road(cx-80,cz-125,cx-80,cz+125,6.5);road(cx+62,cz-115,cx+62,cz+86,6.5);road(cx-125,cz+70,cx+110,cz+70,6.5);

  // Temple mount, dominant NE skyline.
  const temple={x:cx+78,z:cz+108},ty=W.groundY(cx+78,cz+108),tg=new T.Group();tg.position.set(temple.x,ty,temple.z);tg.name='w6-temple-mount';G.add(tg);
  box(tg,78,.45,58,M.light,0,.22,0,false);
  box(tg,78,4,2,M.stone2,0,2,-29);box(tg,78,4,2,M.stone2,0,2,29);box(tg,2,4,58,M.stone2,-39,2,0);box(tg,2,4,58,M.stone2,39,2,0);
  for(const xx of[-13,13])box(tg,9,11,8,M.stone2,xx,5.5,-25);box(tg,34,2,8,M.light,0,10,-25);
  box(tg,26,17,27,M.light,0,8.5,8);box(tg,27,.6,28,M.wood,0,17.3,8);box(tg,8,.55,7,M.gold,0,17.7,8,false);
  for(const xx of[-9,-4.5,0,4.5,9])box(tg,.9,11,.9,M.stone2,xx,5.5,-7);
  box(tg,5,2.4,5,M.bronze,0,1.2,-13);box(tg,6.2,.35,6.2,M.stone2,0,.18,-13,false);
  road(civic.x,civic.z,temple.x,temple.z-34,9);
  plaza(temple.x,temple.z-38,34,18);

  // Palace/government complex west of Temple, explicitly separate from sanctuary.
  const palace={x:cx-55,z:cz+82},py=W.groundY(cx-55,cz+82),pg=new T.Group();pg.position.set(palace.x,py,palace.z);pg.name='w6-palace';G.add(pg);
  box(pg,42,8,28,M.stone2,0,4,0);box(pg,31,7,22,M.adobe,0,11,-1);box(pg,32,.45,23,M.wood,0,14.7,-1);for(const xx of[-12,-8,-4,0,4,8,12])box(pg,.8,6,.8,M.light,xx,3,15);
  plaza(palace.x,palace.z-22,32,18);road(civic.x,civic.z,palace.x,palace.z-22,7);

  // City of David / southern ridge: denser terraced quarter.
  const david={x:cx+18,z:cz-112};
  for(let i=0;i<(mobile?16:28);i++){const row=Math.floor(i/4),col=i%4,x=david.x+(col-1.5)*18,z=david.z+row*15;if(Math.abs(x-cx)<10)continue;house(x,z,2+(i%5===0?1:0),8.5,6.5,(i%2)*Math.PI/2,i%4===0);}

  // Upper/lower residential parcels; strict exclusion around all main streets/plazas/monuments.
  const streetSegments=[
    [gates.south.x,gates.south.z,civic.x,civic.z,17],[gates.north.x,gates.north.z,civic.x,civic.z,17],
    [gates.west.x,gates.west.z,civic.x,civic.z,16],[gates.east.x,gates.east.z,civic.x,civic.z,16],
    [civic.x,civic.z,temple.x,temple.z-34,15],[civic.x,civic.z,palace.x,palace.z-22,13]
  ];
  const pseg=(px,pz,a,b,c,d)=>{const vx=c-a,vz=d-b,wx=px-a,wz=pz-b,l=vx*vx+vz*vz||1,t=Math.max(0,Math.min(1,(wx*vx+wz*vz)/l));return Math.hypot(px-(a+vx*t),pz-(b+vz*t));};
  const protectedAt=(x,z)=>streetSegments.some(s=>pseg(x,z,s[0],s[1],s[2],s[3])<s[4])||Math.hypot(x-civic.x,z-civic.z)<31||Math.hypot(x-temple.x,z-temple.z)<55||Math.hypot(x-palace.x,z-palace.z)<38||Math.hypot(x-david.x,z-david.z)<55;
  const xs=mobile?[-125,-95,-65,-35,35,70,105,130]:[-132,-108,-84,-60,-36,34,58,82,106,130];
  const zs=mobile?[-135,-90,-45,15,55,105,145]:[-145,-118,-90,-62,-34,20,48,76,112,145];
  let k=0;for(const ox of xs)for(const oz of zs){const x=cx+ox,z=cz+oz;if(protectedAt(x,z))continue;if(Math.hypot(ox,oz)>163)continue;house(x,z,2+(k%6===0?1:0),8+(k%3),6.4+(k%2),k%2?0:Math.PI/2,k%4===0);k++;}

  // Market around civic plaza, but never blocking the plaza/street center.
  for(let i=0;i<(mobile?6:10);i++){const a=(i/(mobile?6:10))*Math.PI*2,x=civic.x+Math.cos(a)*27,z=civic.z+Math.sin(a)*22,g=root(x,z,a+Math.PI/2);box(g,5,.2,3.8,i%2?M.cloth:M.adobe2,0,3.4,0);for(const dx of[-2,2])for(const dz of[-1.4,1.4])box(g,.15,3.3,.15,M.wood,dx,1.65,dz);}

  // Mount of Olives and eastern valley context, placed relative to the real eastward Jericho corridor.
  const olives={x:cx+265,z:cz+20};
  for(let i=0;i<(mobile?34:68);i++){const a=W.hash2i(i,6112,1)*Math.PI*2,r=25+W.hash2i(i,6112,2)*105,x=olives.x+Math.cos(a)*r,z=olives.z+Math.sin(a)*r;olive(x,z,.9+W.hash2i(i,6112,3)*.55);}
  for(let i=0;i<(mobile?22:46);i++){const a=W.hash2i(i,6112,4)*Math.PI*2,r=190+W.hash2i(i,6112,5)*95,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(Math.abs(x-cx)<18||Math.abs(z-cz)<18)continue;olive(x,z,.8+W.hash2i(i,6112,6)*.5);}

  // Simple 3D route signs with canvas labels.
  function sign(x,z,text,rot=0){const g=root(x,z,rot);box(g,.35,4,.35,M.wood,0,2,0,false);const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');ctx.fillStyle='#5a3b25';ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle='#d7bd89';ctx.lineWidth=8;ctx.strokeRect(4,4,c.width-8,c.height-8);ctx.fillStyle='#fff0bf';ctx.font='bold 36px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,48);const tex=new T.CanvasTexture(c);tex.needsUpdate=true;const sm=new T.MeshBasicMaterial({map:tex,transparent:false});box(g,10,1.9,.22,sm,0,4.3,0,false);}
  sign(gates.north.x-18,gates.north.z-6,gates.north.label,Math.PI);
  sign(gates.south.x+18,gates.south.z+7,gates.south.label,0);
  sign(gates.east.x-8,gates.east.z+18,gates.east.label,-Math.PI/2);
  sign(gates.west.x+8,gates.west.z-18,gates.west.label,Math.PI/2);

  // Spawn Judah inside the city, facing roughly north toward the civic/Temple axis.
  try{const N=window.WildernessNations50,judah=N?.faction?.('judah');if(judah)judah.spawn={x:cx,z:cz-70};}catch(_){ }

  window.Wilderness6Jerusalem=Object.freeze({version:'5.11.2',group:G,city:J,hiddenLegacy:hidden,gates,temple,palace,david,olives,radius:240,protectedAt});
})();