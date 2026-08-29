// Wilderness 3.2 - larger settlements and period architecture
(()=>{
  const T=window.THREE,W=window.WildernessWorld;
  if(!T||!W||typeof scene==='undefined'||typeof generatedSettlements==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const made=new Set(),groups=new Map();
  const m={
    adobe:new T.MeshLambertMaterial({color:0xa66f48,flatShading:true}),
    adobe2:new T.MeshLambertMaterial({color:0x8b5c3d,flatShading:true}),
    stone:new T.MeshLambertMaterial({color:0x766858,flatShading:true}),
    stone2:new T.MeshLambertMaterial({color:0x5f5549,flatShading:true}),
    wood:new T.MeshLambertMaterial({color:0x5b3823,flatShading:true}),
    cloth:new T.MeshLambertMaterial({color:0xb78b5a,flatShading:true}),
    cloth2:new T.MeshLambertMaterial({color:0x7f5035,flatShading:true}),
    dark:new T.MeshLambertMaterial({color:0x2c2119,flatShading:true})
  };
  function box(g,w,h,d,mat,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),mat);q.position.set(x,y,z);q.castShadow=!mobile;q.receiveShadow=true;g.add(q);return q}
  function tent(g,x,z,s=1,rot=0){
    const y=W.groundY(x,z),root=new T.Group();root.position.set(x,y,z);root.rotation.y=rot;g.add(root);
    const a=box(root,4.8*s,.22,5.6*s,m.cloth,-1.35*s,2.15*s,0);a.rotation.z=.60;
    const b=box(root,4.8*s,.22,5.6*s,m.cloth2,1.35*s,2.15*s,0);b.rotation.z=-.60;
    box(root,.16,3.7*s,.16,m.wood,0,1.85*s,0);
    box(root,5.4*s,.18,.18,m.wood,0,.12*s,-2.45*s);
    box(root,5.4*s,.18,.18,m.wood,0,.12*s,2.45*s);
  }
  function villageHouse(g,x,z,s=1){
    const y=W.groundY(x,z),w=6.8*s,d=5.4*s,h=4.5*s;
    box(g,w,h,d,m.adobe,x,y+h/2,z);
    box(g,w+.35,.35,d+.35,m.wood,x,y+h+.17,z);
    box(g,1.5,2.45,.35,m.dark,x,y+1.22,z+d/2+.18);
  }
  function cityHouse(g,x,z,s=1,stone=false,floors=2){
    const y=W.groundY(x,z),w=6.3*s,d=5.3*s,floorH=3.7*s,h=floors*floorH,mat=stone?m.stone:m.adobe;
    box(g,w,h,d,mat,x,y+h/2,z);
    for(let f=1;f<floors;f++)box(g,w+.12,.22,d+.12,stone?m.stone2:m.wood,x,y+f*floorH,z);
    box(g,w+.35,.38,d+.35,stone?m.stone2:m.wood,x,y+h+.19,z);
    box(g,1.35,2.35,.38,m.dark,x,y+1.18,z+d/2+.2);
    for(let f=0;f<floors;f++){
      const wy=y+2.15+f*floorH;
      box(g,.72,.72,.22,m.dark,x-w*.25,wy,z+d/2+.13);
      box(g,.72,.72,.22,m.dark,x+w*.25,wy,z+d/2+.13);
    }
  }
  function build(s){
    const d=s?.def||s?.definition||s?.source||s;if(!d?.id||made.has(d.id))return;made.add(d.id);
    const g=new T.Group();g.name=`settlements32-${d.id}`;scene.add(g);groups.set(d.id,g);
    if(d.type==='village'){
      const tents=mobile?5:9;
      for(let i=0;i<tents;i++){
        const a=i/tents*Math.PI*2+.25,r=12+(i%3)*4.2,x=d.x+Math.cos(a)*r,z=d.z+Math.sin(a)*r;
        tent(g,x,z,.85+(i%2)*.12,a+Math.PI/2);
      }
      const houses=mobile?2:4;
      for(let i=0;i<houses;i++){
        const a=.6+i/houses*Math.PI*2,r=7+i%2*3.5;
        villageHouse(g,d.x+Math.cos(a)*r,d.z+Math.sin(a)*r,.9+(i%2)*.08);
      }
      // Central communal canopy / market shade.
      const y=W.groundY(d.x,d.z);box(g,7.5,.28,6.5,m.cloth,d.x,y+3.6,d.z);for(const dx of[-3.1,3.1])for(const dz of[-2.55,2.55])box(g,.16,3.6,.16,m.wood,d.x+dx,y+1.8,d.z+dz);
    }else{
      const count=mobile?8:14;
      for(let i=0;i<count;i++){
        const ring=i%2,ang=i/count*Math.PI*2+(ring?.15:0),r=ring?11:18;
        const x=d.x+Math.cos(ang)*r,z=d.z+Math.sin(ang)*r;
        cityHouse(g,x,z,.88+(i%3)*.08,i%3===0,1+(i%3===0?2:1));
      }
      // A taller administrative/royal building so the city reads vertically.
      cityHouse(g,d.x,d.z-2,1.15,true,3);
    }
  }
  function tick(){for(const s of generatedSettlements.values())build(s)}
  let last=0;function loop(t){if(t-last>700){last=t;tick()}requestAnimationFrame(loop)}requestAnimationFrame(loop);
  window.WildernessSettlements32={groups};
})();