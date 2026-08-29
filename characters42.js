// Wilderness 4.2 - richer layered ancient Near Eastern character silhouettes
(()=>{
  const T=window.THREE;if(!T||typeof player==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const done=new WeakSet();
  const mats={
    linen:new T.MeshLambertMaterial({color:0xd3bd91,flatShading:true}),
    linen2:new T.MeshLambertMaterial({color:0xb59368,flatShading:true}),
    brown:new T.MeshLambertMaterial({color:0x755039,flatShading:true}),
    dark:new T.MeshLambertMaterial({color:0x3e2b20,flatShading:true}),
    red:new T.MeshLambertMaterial({color:0x7f4637,flatShading:true}),
    blue:new T.MeshLambertMaterial({color:0x4c6170,flatShading:true}),
    sand:new T.MeshLambertMaterial({color:0xb89d72,flatShading:true}),
    leather:new T.MeshLambertMaterial({color:0x5c3a29,flatShading:true})
  };
  function box(p,w,h,d,m,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=!mobile;p.add(q);return q}
  function palette(e){const n=(e.mesh?.id||0)%5;return [mats.linen,mats.linen2,mats.sand,mats.red,mats.blue][n]}
  function enhance(e){
    // hero43 owns the protagonist silhouette; never layer the procedural NPC outfit onto player.
    if(e===player||!e?.actor||done.has(e))return;done.add(e);const a=e.actor,c=palette(e);
    const layers=new T.Group();
    box(layers,1.34,.34,.86,c,0,2.22,0);
    box(layers,1.20,1.05,.84,c,0,1.58,0);
    box(layers,1.05,.72,.82,c,0,.78,0);
    box(layers,1.12,.16,.87,mats.leather,0,1.40,0);
    box(layers,.28,1.05,.06,mats.brown,.30,1.23,.45);
    const mantle=box(layers,.96,1.18,.10,(e.king?mats.red:mats.dark),0,1.70,-.47);mantle.rotation.x=-.06;
    if(e.__arms15){box(e.__arms15.left,.34,.56,.34,c,0,-.12,0);box(e.__arms15.right,.34,.56,.34,c,0,-.12,0)}
    if(e.__legs15){for(const leg of [e.__legs15.left,e.__legs15.right]){box(leg,.34,.18,.42,mats.leather,0,-.96,.06);box(leg,.31,.16,.33,mats.linen2,0,-.73,0)}}
    const head=new T.Group();box(head,.98,.12,.96,c,0,3.34,0);box(head,.14,.72,.12,c,-.40,2.99,-.28);box(head,.14,.68,.12,c,.40,3.01,-.28);box(head,.68,.72,.10,c,0,2.98,-.43);
    a.add(layers,head);e.__period42={layers,head};a.scale.set(1,1.035,1);
  }
  function all(){const a=[];if(typeof civilians!=='undefined')a.push(...civilians);if(typeof followers!=='undefined')a.push(...followers);if(typeof enemies!=='undefined')a.push(...enemies);return [...new Set(a)].filter(e=>e!==player)}
  let last=0;function loop(t){if(t-last>500){last=t;for(const e of all())if(e?.alive)enhance(e)}requestAnimationFrame(loop)}requestAnimationFrame(loop);
  window.WildernessCharacters42={enhance};
})();