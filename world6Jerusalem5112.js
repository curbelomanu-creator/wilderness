// Wilderness 5.11.2 — first dedicated Wilderness 6 Jerusalem
(()=>{
  if(window.Wilderness6Jerusalem)return;
  const T=window.THREE,W=window.WildernessWorld,D=window.Wilderness6World;
  if(!T||!W||!D||typeof scene==='undefined')return;
  const city=D.getPlace?.('jerusalem'); if(!city)return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const cx=city.x,cz=city.z,oldGround=W.groundY;
  const base=oldGround(cx,cz);
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};

  // Historical topographic identity: ridge city, Kidron east, Hinnom south/west, Olives east.
  W.groundY=function(x,z){
    let y=oldGround(x,z),d=Math.hypot(x-cx,z-cz);
    if(d<265){
      const plateau=base+(z-cz)*0.008-(x-cx)*0.002;
      const k=d<205?0.90:0.90*(1-smooth((d-205)/60));
      y=y*(1-k)+plateau*k;
    }
    const kidX=(x-(cx+225))/52,kidZ=(z-(cz+15))/255;
    y-=7.2*Math.exp(-(kidX*kidX+kidZ*kidZ));
    const hinX=(x-(cx-55))/185,hinZ=(z-(cz-235))/52;
    y-=5.4*Math.exp(-(hinX*hinX+hinZ*hinZ));
    const olX=(x-(cx+365))/115,olZ=(z-(cz+20))/190;
    y+=12.5*Math.exp(-(olX*olX+olZ*olZ));
    // Temple Mount is a broad, walkable high platform.
    const tx=cx+72,tz=cz+102,td=Math.hypot(x-tx,z-tz);
    if(td<78){const k=1-smooth(td/78),target=base+8.5;y=y*(1-k*.95)+target*(k*.95)}
    return Math.round(y*20)/20;
  };

  // Retire previous Jerusalem layers and generic historical scaffold.
  for(const n of ['jerusalem54','temple5104']){const g=scene.getObjectByName(n);if(g)g.visible=false;}
  try{const r=typeof generatedSettlements!=='undefined'&&generatedSettlements.get('w6-jerusalem');if(r?.group)r.group.visible=false;}catch(_){ }

  const mat=(c)=>new T.MeshLambertMaterial({color:c,flatShading:true});
  const M={stone:mat(0xb8ad96),stone2:mat(0x8f8879),stone3:mat(0xd0c5ab),adobe:mat(0xb5926f),adobe2:mat(0x96745a),road:mat(0xaa987b),wood:mat(0x57402d),dark:mat(0x2c2119),bronze:mat(0x9a7037),gold:mat(0xc6a84d),olive:mat(0x596c42),olive2:mat(0x748451),cloth:mat(0x7a4c3a)};
  const G=new T.Group();G.name='w6-jerusalem';G.userData.w6Jerusalem=true;scene.add(G);
  function box(w,h,d,m,x,y,z,cast=true,parent=G){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.w6Jerusalem=true;parent.add(q);return q;}
  function root(x,z,rot=0){const g=new T.Group();g.position.set(x,W.groundY(x,z),z);g.rotation.y=rot;g.userData.w6Jerusalem=true;G.add(g);return g;}
  function ribbon(x1,z1,x2,z2,width=9){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(2,Math.ceil(len/4));for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t,y=W.groundY(x,z),q=box(width,.10,4.25,M.road,x,y+.05,z,false);q.rotation.y=Math.atan2(dx,dz);q.userData.noCollision=true;}}
  function plaza(x,z,w,d){const y=W.groundY(x,z);const q=box(w,.12,d,M.road,x,y+.06,z,false);q.userData.noCollision=true;}
  function tower(x,z,h=22){const y=W.groundY(x,z);box(9,h,9,M.stone2,x,y+h/2,z);box(10,.5,10,M.stone3,x,y+h+.25,z);for(const dx of[-3.6,0,3.6])for(const dz of[-4.2,4.2])box(1.05,1.25,1.05,M.stone3,x+dx,y+h+.75,z+dz);}
  function house(x,z,w=9,d=7,h=8,rot=0,rich=false){const g=root(x,z,rot);box(w,h,d,rich?M.stone:M.adobe,0,h/2,0,true,g);box(w+.35,.35,d+.35,rich?M.stone3:M.stone2,0,h+.18,0,true,g);box(1.5,3.3,.25,M.dark,0,1.65,d/2+.13,false,g);if(h>8.5)box(w*.72,3.4,d*.70,rich?M.stone3:M.adobe2,0,h+1.7,0,true,g);return g;}
  function olive(x,z,s=1){const y=W.groundY(x,z);box(.55*s,5.2*s,.55*s,M.wood,x,y+2.6*s,z,false);box(4.1*s,1.15*s,3.5*s,M.olive,x,y+5.25*s,z,false);box(3.0*s,.9*s,2.6*s,M.olive2,x+.4*s,y+6.0*s,z-.15*s,false);}
  function sign(x,z,rot,text){const g=root(x,z,rot);box(.22,3.5,.22,M.wood,0,1.75,0,false,g);const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');ctx.fillStyle='#3b2818';ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle='#d7bd83';ctx.lineWidth=8;ctx.strokeRect(4,4,c.width-8,c.height-8);ctx.fillStyle='#f5dfad';ctx.font='bold 34px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,48);const tex=new T.CanvasTexture(c);tex.minFilter=T.NearestFilter;const sm=new T.MeshBasicMaterial({map:tex,transparent:false});const p=new T.Mesh(new T.PlaneGeometry(7.2,1.35),sm);p.position.set(0,3.35,.14);g.add(p);}

  // Irregular 8th-century-style ridge enclosure, intentionally not a modern rectangular city.
  const P=[[-170,-205],[70,-220],[175,-145],[195,20],[155,150],[70,205],[-70,200],[-175,115],[-205,-45]].map(([x,z])=>[cx+x,cz+z]);
  const gates={
    south:{x:cx-18,z:cz-213,rot:0,label:'BELÉN · HEBRÓN'},
    north:{x:cx+42,z:cz+201,rot:Math.PI,label:'BETEL · SAMARIA'},
    west:{x:cx-199,z:cz+12,rot:Math.PI/2,label:'GEZER · COSTA'},
    east:{x:cx+192,z:cz+34,rot:-Math.PI/2,label:'JERICÓ · JORDÁN'}
  };
  const gateList=Object.values(gates);
  const nearGate=(x,z)=>gateList.some(g=>Math.hypot(x-g.x,z-g.z)<18);
  for(let i=0;i<P.length;i++){
    const [ax,az]=P[i],[bx,bz]=P[(i+1)%P.length],dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/12));
    for(let j=0;j<n;j++){const t=(j+.5)/n,x=ax+dx*t,z=az+dz*t;if(nearGate(x,z))continue;const seg=len/n,y=W.groundY(x,z),q=box(4.0,15,seg+.4,M.stone2,x,y+7.5,z);q.rotation.y=Math.atan2(dx,dz);if(j%2===0){const c=box(4.7,1.3,2.1,M.stone3,x,y+15.65,z);c.rotation.y=q.rotation.y;}}
    tower(ax,az,21+(i%3));
  }
  function gate(g){const r=root(g.x,g.z,g.rot);for(const xx of[-9,9]){box(9,20,10,M.stone2,xx,10,0,true,r);box(10,.6,11,M.stone3,xx,20.3,0,true,r)}box(27,3.0,7,M.stone3,0,17.5,0,true,r);box(8,10,.45,M.dark,0,5,3.7,false,r);sign(g.x+(g.rot===Math.PI/2?-14:g.rot===-Math.PI/2?14:0),g.z+(g.rot===0?-14:g.rot===Math.PI?14:0),g.rot,g.label);}
  gateList.forEach(gate);

  // Four protected corridors + cross streets. These remain decoration-free.
  ribbon(gates.south.x,gates.south.z+8,cx,cz-12,11);ribbon(cx,cz-12,gates.north.x,gates.north.z-8,11);
  ribbon(gates.west.x+8,gates.west.z,cx,cz-12,10);ribbon(cx,cz-12,gates.east.x-8,gates.east.z,10);
  ribbon(cx-85,cz-150,cx-85,cz+145,6.5);ribbon(cx+78,cz-125,cx+78,cz+55,6.5);ribbon(cx-145,cz+72,cx+125,cz+72,6.5);
  plaza(cx,cz-12,44,34);plaza(cx-66,cz+88,34,26);

  // Roads continue outside the walls toward the actual geographic corridors.
  ribbon(gates.south.x,gates.south.z,cx-45,cz-335,9);ribbon(gates.north.x,gates.north.z,cx+48,cz+335,9);
  ribbon(gates.west.x,gates.west.z,cx-335,cz+25,9);ribbon(gates.east.x,gates.east.z,cx+335,cz+45,9);

  // City of David: long southern ridge with dense stone/adobe terraces.
  const cityDavid=new T.Group();cityDavid.name='w6-city-of-david';G.add(cityDavid);
  for(let i=0;i<(mobile?18:32);i++){const row=Math.floor(i/4),col=i%4,x=cx-58+col*30+(row%2)*5,z=cz-175+row*28;if(Math.abs(x-cx)<16)continue;house(x,z,10,7.5,7.5+(i%4===0?2:0),(i%2)*Math.PI/2,i%5===0);}

  // Upper city neighborhoods, deliberately leaving the street grid and plazas clear.
  const X=mobile?[-142,-110,-72,-38,40,76,112,145]:[-150,-124,-98,-70,-42,40,68,96,124,150];
  const Z=mobile?[-105,-55,5,55,105,145]:[-115,-86,-55,-25,18,48,102,137,165];
  let n=0;for(const xo of X)for(const zo of Z){const x=cx+xo,z=cz+zo;if(Math.hypot(x-cx,z-(cz-12))<34)continue;if(Math.abs(x-cx)<19||Math.abs(z-(cz+72))<14||Math.abs(x-(cx-78))<12)continue;if(x>cx+28&&z>cz+55)continue;if(Math.hypot(x-(cx-66),z-(cz+88))<28)continue;house(x,z,8+(n%3),6.5+(n%2),7+(n%4===0?3:0),(n++%2)*Math.PI/2,n%5===0);}

  // Royal palace/administration west of the Temple approach.
  const px=cx-66,pz=cz+88,py=W.groundY(px,pz);box(42,8,30,M.stone2,px,py+4,pz);box(32,8,22,M.stone3,px,py+12,pz-1);box(34,.6,24,M.wood,px,py+16.3,pz-1);for(const ox of[-12,-6,0,6,12])box(1.2,7,1.2,M.stone,px+ox,py+3.5,pz+16);tower(cx-136,cz+120,22);

  // Temple Mount and First Temple — intentionally dominant but not anachronistically enormous.
  const tx=cx+72,tz=cz+102,ty=W.groundY(tx,tz),TG=new T.Group();TG.name='w6-first-temple';TG.position.set(tx,ty,tz);G.add(TG);
  box(112,1.1,82,M.stone3,0,.55,0,false,TG);
  box(112,5,2.4,M.stone2,0,2.5,-41,true,TG);box(112,5,2.4,M.stone2,0,2.5,41,true,TG);box(2.4,5,82,M.stone2,-56,2.5,0,true,TG);box(2.4,5,82,M.stone2,56,2.5,0,true,TG);
  // Court gateway and altar.
  for(const ox of[-10,10])box(8,11,8,M.stone2,ox,5.5,-37,true,TG);box(31,2.4,7,M.stone3,0,10,-37,true,TG);box(7,3.2,7,M.bronze,0,1.6,-16,true,TG);
  // Sanctuary: porch + main hall + elevated roofline.
  box(38,16,38,M.stone3,0,8,13,true,TG);box(40,.8,40,M.wood,0,16.4,13,true,TG);for(const ox of[-14,-7,0,7,14])box(1.5,12,1.5,M.stone2,ox,6,-7,true,TG);box(33,1,2,M.wood,0,12,-7,true,TG);box(6,8,.5,M.dark,0,4,-6.7,false,TG);box(11,.6,8,M.gold,0,17.0,13,false,TG);
  ribbon(cx+15,cz+35,tx,tz-44,10);

  // Mature olive landscape and eastern ridge. No trees are placed inside protected streets/plazas.
  const protectedRoad=(x,z)=>Math.abs(x-cx)<22||Math.abs(z-(cz-12))<20||Math.abs(z-(cz+72))<15||Math.abs(x-(cx-78))<14;
  for(let i=0;i<(mobile?48:88);i++){const a=W.hash2i(i,5112,1)*Math.PI*2,r=260+W.hash2i(i,5112,2)*210,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(protectedRoad(x,z))continue;olive(x,z,.85+W.hash2i(i,5112,3)*.65);}
  for(let i=0;i<(mobile?22:42);i++){const a=W.hash2i(i,5112,4)*Math.PI*2,r=25+W.hash2i(i,5112,5)*115,x=cx+365+Math.cos(a)*r,z=cz+20+Math.sin(a)*r;olive(x,z,1.0+W.hash2i(i,5112,6)*.55);}

  // Rebuild terrain chunks with Jerusalem's local topography and relocate player onto the new surface.
  try{if(typeof chunks!=='undefined'){for(const [,g] of [...chunks])scene.remove(g);chunks.clear();}if(typeof updateChunks==='function')updateChunks(true);if(typeof player!=='undefined'&&player?.mesh)player.mesh.position.y=W.groundY(player.mesh.position.x,player.mesh.position.z);}catch(e){console.warn('W6 Jerusalem terrain refresh',e);}
  setTimeout(()=>window.WildernessCollision45?.rebuild?.(true),900);

  window.Wilderness6Jerusalem=Object.freeze({version:'5.11.2',group:G,center:{x:cx,z:cz},gates,temple:{x:tx,z:tz,y:ty},palace:{x:px,z:pz},cityOfDavid:{x:cx-35,z:cz-125},mountOfOlives:{x:cx+365,z:cz+20}});
})();