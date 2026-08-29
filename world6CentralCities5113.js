// Wilderness 5.11.3 — dedicated central-corridor cities for Wilderness 6
(()=>{
  if(window.Wilderness6CentralCities)return;
  const T=window.THREE,W=window.WildernessWorld,D=window.Wilderness6World;
  if(!T||!W||!D||typeof scene==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const mat=c=>new T.MeshLambertMaterial({color:c,flatShading:true});
  const M={stone:mat(0xb8ab90),stone2:mat(0x8c826f),light:mat(0xd0c19f),adobe:mat(0xb28b66),adobe2:mat(0x8f684d),road:mat(0xaa9676),wood:mat(0x5a3a25),dark:mat(0x281e16),olive:mat(0x667747),olive2:mat(0x7b8a53),palm:mat(0x6a7f48),bronze:mat(0x9d7440),gold:mat(0xc3a255),cloth:mat(0x744d39)};
  const built=new Map();

  function hideScaffold(id){
    try{const r=typeof generatedSettlements!=='undefined'&&generatedSettlements.get?.(`w6-${id}`);if(r?.group)r.group.visible=false;}catch(_){ }
  }
  function box(g,w,h,d,m,x,y,z,cast=true){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=cast&&!mobile;q.receiveShadow=true;q.userData.w6Central=true;g.add(q);return q;}
  function root(G,x,z,rot=0){const g=new T.Group();g.position.set(x,W.groundY(x,z),z);g.rotation.y=rot;g.userData.w6Central=true;G.add(g);return g;}
  function road(G,x1,z1,x2,z2,width=7){const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/5));for(let i=0;i<=n;i++){const t=i/n,x=x1+dx*t,z=z1+dz*t,y=W.groundY(x,z),q=box(G,width,.08,5.1,M.road,x,y+.04,z,false);q.rotation.y=Math.atan2(dx,dz);q.userData.noCollision=true;}}
  function plaza(G,x,z,w,d){const q=box(G,w,.09,d,M.road,x,W.groundY(x,z)+.045,z,false);q.userData.noCollision=true;}
  function tower(G,x,z,h=16){const g=root(G,x,z);box(g,7,h,7,M.stone2,0,h/2,0);box(g,7.7,.45,7.7,M.light,0,h+.22,0);}
  function house(G,x,z,levels=2,w=7.5,d=6,rot=0,stone=false){const g=root(G,x,z,rot),mm=stone?M.stone:M.adobe;for(let f=0;f<levels;f++){box(g,w,4,d,mm,0,f*4+2,0);box(g,w+.2,.25,d+.2,f%2?M.wood:M.stone2,0,(f+1)*4+.12,0);}box(g,1.1,2.9,.2,M.dark,0,1.45,d/2+.11,false);return g;}
  function olive(G,x,z,s=1){const y=W.groundY(x,z);box(G,.42*s,4.2*s,.42*s,M.wood,x,y+2.1*s,z,false);box(G,3.2*s,1*s,2.7*s,M.olive,x,y+4.45*s,z,false);box(G,2.4*s,.75*s,2.1*s,M.olive2,x+.2*s,y+5*s,z-.1*s,false);}
  function palm(G,x,z,s=1){const y=W.groundY(x,z);box(G,.45*s,5.8*s,.45*s,M.wood,x,y+2.9*s,z,false);for(let i=0;i<6;i++){const q=box(G,.28*s,.16*s,3.5*s,M.palm,x,y+6.05*s,z,false);q.rotation.y=i*Math.PI/3;}}
  function shrine(G,cx,cz,kind='yahwist',scale=1){const y=W.groundY(cx,cz),g=new T.Group();g.position.set(cx,y,cz);g.name=`w6-shrine-${kind}`;G.add(g);box(g,19*scale,.35,15*scale,M.light,0,.18,0,false);box(g,11*scale,8*scale,10*scale,M.stone,0,4*scale,2*scale);for(const xx of[-3.5,0,3.5])box(g,.7*scale,6*scale,.7*scale,M.stone2,xx*scale,3*scale,-4.2*scale);box(g,3.5*scale,1.8*scale,3.5*scale,M.bronze,0,.9*scale,-4.7*scale);}
  function palace(G,cx,cz,scale=1){const y=W.groundY(cx,cz),g=new T.Group();g.position.set(cx,y,cz);G.add(g);box(g,30*scale,7*scale,21*scale,M.stone2,0,3.5*scale,0);box(g,22*scale,6*scale,15*scale,M.light,0,10*scale,-1*scale);for(const xx of[-8,-4,0,4,8])box(g,.8*scale,5*scale,.8*scale,M.stone,xx*scale,2.5*scale,11.5*scale);}
  function wallCity(id,opt){
    const c=D.getPlace?.(id);if(!c)return null;hideScaffold(id);
    const G=new T.Group();G.name=`w6-${id}-dedicated`;G.userData.cityId=id;scene.add(G);
    const cx=c.x,cz=c.z,r=opt.r,wallH=opt.wallH||12,towerH=opt.towerH||17;
    const gates=(opt.gates||[]).map(g=>({x:cx+g.x*r,z:cz+g.z*r,rot:g.rot,label:g.label}));
    const nearGate=(x,z)=>gates.some(g=>Math.hypot(x-g.x,z-g.z)<13);
    const poly=(opt.poly||[[-.78,-.86],[.55,-.91],[.88,-.42],[.9,.45],[.48,.9],[-.5,.88],[-.9,.35],[-.88,-.45]]).map(([x,z])=>[cx+x*r,cz+z*r]);
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz),n=Math.max(1,Math.ceil(len/11));
      for(let j=0;j<n;j++){const t=(j+.5)/n,x=a[0]+dx*t,z=a[1]+dz*t;if(nearGate(x,z))continue;const q=box(G,3.2,wallH,len/n+.3,M.stone2,x,W.groundY(x,z)+wallH/2,z);q.rotation.y=Math.atan2(dx,dz);}
      if(i%2===0)tower(G,a[0],a[1],towerH+(i%3));
    }
    for(const g of gates){const rt=root(G,g.x,g.z,g.rot);for(const xx of[-7,7])box(rt,7,wallH+5,8,M.stone2,xx,(wallH+5)/2,0);box(rt,22,2.2,7.5,M.light,0,wallH+2.5,0);}
    const center={x:cx+(opt.centerX||0),z:cz+(opt.centerZ||0)};
    gates.forEach(g=>road(G,g.x,g.z,center.x,center.z,opt.roadW||8));plaza(G,center.x,center.z,opt.plazaW||30,opt.plazaD||24);
    // Continue principal corridors beyond gates so city roads meet the master road network.
    gates.forEach(g=>{const vx=g.x-cx,vz=g.z-cz,l=Math.hypot(vx,vz)||1;road(G,g.x,g.z,g.x+vx/l*75,g.z+vz/l*75,opt.roadW||8);});
    const street=[...gates.map(g=>[g.x,g.z,center.x,center.z,14])];
    const pseg=(px,pz,a,b,c1,d1)=>{const vx=c1-a,vz=d1-b,wx=px-a,wz=pz-b,l=vx*vx+vz*vz||1,t=Math.max(0,Math.min(1,(wx*vx+wz*vz)/l));return Math.hypot(px-(a+vx*t),pz-(b+vz*t));};
    const blocked=(x,z)=>street.some(s=>pseg(x,z,s[0],s[1],s[2],s[3])<s[4])||Math.hypot(x-center.x,z-center.z)<22;
    const grid=mobile?5:7;let k=0;for(let ix=-grid;ix<=grid;ix++)for(let iz=-grid;iz<=grid;iz++){
      const x=cx+ix*(r/(grid+1))*0.92,z=cz+iz*(r/(grid+1))*0.92;if(Math.hypot(x-cx,z-cz)>r*.72||blocked(x,z))continue;
      if(opt.keepClear&&opt.keepClear(x,z,cx,cz))continue;
      house(G,x,z,opt.levels?.(k,x,z)||((k%5===0)?3:2),opt.houseW||7.5,opt.houseD||6,k%2?0:Math.PI/2,opt.stoneHouses?k%3===0:k%5===0);k++;
    }
    if(opt.palace)palace(G,cx+opt.palace[0]*r,cz+opt.palace[1]*r,opt.palace[2]||1);
    if(opt.shrine)shrine(G,cx+opt.shrine[0]*r,cz+opt.shrine[1]*r,opt.shrine[2]||id,opt.shrine[3]||1);
    built.set(id,{group:G,city:c,gates,center});return G;
  }

  // Bethlehem — compact fortified agricultural town with terraces and Yahwist local sanctuary.
  const beth=wallCity('bethlehem',{r:82,wallH:11,towerH:15,roadW:6.5,plazaW:24,plazaD:18,houseW:6.5,houseD:5.5,
    gates:[{x:0,z:.9,rot:Math.PI,label:'JERUSALÉN'},{x:-.1,z:-.9,rot:0,label:'BET-SUR · HEBRÓN'},{x:.82,z:-.2,rot:-Math.PI/2,label:'TECOA'}],shrine:[.38,.38,'bethlehem',.72]});
  if(beth){const c=D.getPlace('bethlehem');for(let i=0;i<(mobile?18:34);i++){const a=W.hash2i(i,5113,11)*Math.PI*2,r=100+W.hash2i(i,5113,12)*90;olive(beth,c.x+Math.cos(a)*r,c.z+Math.sin(a)*r,.8+W.hash2i(i,5113,13)*.45);}}

  // Hebron — major southern highland city, stronger walls, large civic/palace compound.
  const heb=wallCity('hebron',{r:125,wallH:14,towerH:19,roadW:8,plazaW:34,plazaD:27,houseW:8,houseD:6.5,stoneHouses:true,
    gates:[{x:.05,z:.92,rot:Math.PI,label:'BET-SUR · JERUSALÉN'},{x:-.18,z:-.92,rot:0,label:'BEERSEBA'},{x:-.86,z:.05,rot:Math.PI/2,label:'LAQUIS · SEFELÁ'}],palace:[-.35,.34,.9],shrine:[.38,.37,'hebron',.85]});
  if(heb){const c=D.getPlace('hebron');for(let i=0;i<(mobile?20:38);i++){const a=W.hash2i(i,5113,21)*Math.PI*2,r=145+W.hash2i(i,5113,22)*115;olive(heb,c.x+Math.cos(a)*r,c.z+Math.sin(a)*r,.9+W.hash2i(i,5113,23)*.5);}}

  // Jericho — low oasis city: lighter fortification, open orchards and palms, east/west Jordan corridor.
  const jer=wallCity('jericho',{r:105,wallH:8,towerH:12,roadW:8,plazaW:32,plazaD:26,houseW:7,houseD:6,
    gates:[{x:-.88,z:.05,rot:Math.PI/2,label:'JERUSALÉN'},{x:.88,z:.05,rot:-Math.PI/2,label:'JORDÁN · HESBÓN'},{x:.05,z:.88,rot:Math.PI,label:'BET-SEÁN'}],palace:[-.18,.25,.72]});
  if(jer){const c=D.getPlace('jericho');for(let i=0;i<(mobile?34:70);i++){const a=W.hash2i(i,5113,31)*Math.PI*2,r=115+W.hash2i(i,5113,32)*120;palm(jer,c.x+Math.cos(a)*r,c.z+Math.sin(a)*r,.85+W.hash2i(i,5113,33)*.5);}}

  // Bethel — fortified ridge sanctuary, temple/sanctuary intentionally dominant over palace.
  wallCity('bethel',{r:96,wallH:12,towerH:17,roadW:7,plazaW:28,plazaD:21,houseW:7,houseD:5.8,
    gates:[{x:0,z:-.9,rot:0,label:'JERUSALÉN'},{x:.05,z:.9,rot:Math.PI,label:'SILO · SAMARIA'},{x:-.84,z:.05,rot:Math.PI/2,label:'GEZER'}],shrine:[.25,.34,'bethel-north',1.05]});

  // Shiloh — smaller sanctuary town; lower walls, open sacred precinct and fewer dense houses.
  wallCity('shiloh',{r:74,wallH:9,towerH:13,roadW:6,plazaW:25,plazaD:20,houseW:6.2,houseD:5.2,
    gates:[{x:-.05,z:-.9,rot:0,label:'BETEL · JERUSALÉN'},{x:.1,z:.9,rot:Math.PI,label:'SIQUEM'}],shrine:[.28,.25,'shiloh',1.0],levels:k=>k%7===0?2:1});

  // Shechem — large valley city between Ebal/Gerizim corridor, broad east-west civic street.
  const she=wallCity('shechem',{r:132,wallH:13,towerH:18,roadW:8,plazaW:36,plazaD:28,houseW:8,houseD:6.5,
    gates:[{x:0,z:-.9,rot:0,label:'SILO · BETEL'},{x:-.82,z:.18,rot:Math.PI/2,label:'SAMARIA'},{x:.82,z:.18,rot:-Math.PI/2,label:'JORDÁN'}],palace:[-.28,.30,.85],shrine:[.30,.34,'shechem',.82]});
  if(she){const c=D.getPlace('shechem'); // emphasize Ebal/Gerizim with nearby rocky/olive slopes visually
    for(let i=0;i<(mobile?22:42);i++){const side=i%2?-1:1,x=c.x+side*(155+W.hash2i(i,5113,41)*80),z=c.z-40+W.hash2i(i,5113,42)*160;olive(she,x,z,.85+W.hash2i(i,5113,43)*.5);}}

  // Samaria — monumental northern capital: strongest city after Jerusalem in this corridor, royal palace dominates skyline.
  const sam=wallCity('samaria',{r:178,wallH:15,towerH:22,roadW:9,plazaW:42,plazaD:32,houseW:8.5,houseD:7,stoneHouses:true,
    gates:[{x:.05,z:-.92,rot:0,label:'SIQUEM · JERUSALÉN'},{x:.75,z:.55,rot:-Math.PI/2,label:'JEZREEL · MEGIDO'},{x:-.78,z:.45,rot:Math.PI/2,label:'COSTA · SHARON'}],palace:[-.10,.28,1.18],shrine:[.34,.32,'samaria',.92],levels:k=>k%4===0?3:2});
  if(sam){const c=D.getPlace('samaria'),G=built.get('samaria').group;plaza(G,c.x-18,c.z+48,55,34);for(let i=0;i<(mobile?28:54);i++){const a=W.hash2i(i,5113,51)*Math.PI*2,r=195+W.hash2i(i,5113,52)*130;olive(G,c.x+Math.cos(a)*r,c.z+Math.sin(a)*r,.9+W.hash2i(i,5113,53)*.55);}}

  window.Wilderness6CentralCities=Object.freeze({version:'5.11.3',built});
})();