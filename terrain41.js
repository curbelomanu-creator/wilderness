// Wilderness 4.7 - rendered macro terrain, biome colors and real sea surface
(()=>{
  const T=window.THREE,W=window.WildernessWorld;
  if(!T||!W||typeof scene==='undefined'||typeof chunks==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const meshes=new Map(),waters=new Map();
  const material=new T.MeshLambertMaterial({vertexColors:true,flatShading:false,side:T.DoubleSide});
  const waterMat=new T.MeshLambertMaterial({color:0x3f8195,transparent:true,opacity:.74,side:T.DoubleSide,depthWrite:false});
  const colors={
    desert:new T.Color(0xcaa56b),steppe:new T.Color(0xa59a60),fertile:new T.Color(0x74854c),
    grassland:new T.Color(0x6f914b),forest:new T.Color(0x46663d),oasis:new T.Color(0x5f8350),
    rocky:new T.Color(0x817568),mountain:new T.Color(0x706b65),coast:new T.Color(0xc9b17d),
    sea:new T.Color(0x536f72),road:new T.Color(0x9d7953)
  };
  function sampleColor(x,z){if(W.roadAt(x,z))return colors.road;return colors[W.biomeAt(x,z)]||colors.desert}
  function waterGeometry(cx,cz,seg){
    if(typeof W.waterAt!=='function')return null;const ox=cx*W.CHUNK_SIZE,oz=cz*W.CHUNK_SIZE,step=W.CHUNK_SIZE/seg,verts=[];
    for(let ix=0;ix<seg;ix++)for(let iz=0;iz<seg;iz++){
      const x0=ox+ix*step,z0=oz+iz*step,x1=x0+step,z1=z0+step,cxw=(x0+x1)/2,czw=(z0+z1)/2;
      if(!W.waterAt(cxw,czw))continue;const y=(W.SEA_LEVEL??0)+.08;
      verts.push(x0,y,z0,x1,y,z0,x1,y,z1,x0,y,z0,x1,y,z1,x0,y,z1);
    }
    if(!verts.length)return null;const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.computeVertexNormals();return geo;
  }
  function build(cx,cz){
    const key=`${cx},${cz}`;if(meshes.has(key))return;const seg=mobile?10:16;
    const geo=new T.PlaneGeometry(W.CHUNK_SIZE,W.CHUNK_SIZE,seg,seg);geo.rotateX(-Math.PI/2);
    const pos=geo.attributes.position,arr=new Float32Array(pos.count*3),ox=cx*W.CHUNK_SIZE+W.CHUNK_SIZE/2,oz=cz*W.CHUNK_SIZE+W.CHUNK_SIZE/2;
    for(let i=0;i<pos.count;i++){const lx=pos.getX(i),lz=pos.getZ(i),wx=ox+lx,wz=oz+lz;pos.setY(i,W.groundY(wx,wz)+.035);const c=sampleColor(wx,wz);arr[i*3]=c.r;arr[i*3+1]=c.g;arr[i*3+2]=c.b}
    geo.setAttribute('color',new T.BufferAttribute(arr,3));geo.computeVertexNormals();
    const mesh=new T.Mesh(geo,material);mesh.position.set(ox,0,oz);mesh.receiveShadow=true;mesh.castShadow=false;mesh.name='terrain41-'+key;scene.add(mesh);meshes.set(key,mesh);
    const wg=waterGeometry(cx,cz,seg);if(wg){const wm=new T.Mesh(wg,waterMat);wm.name='water47-'+key;wm.renderOrder=2;scene.add(wm);waters.set(key,wm)}
  }
  function hideLegacy(){for(const [,g] of chunks){if(!g)continue;for(const child of g.children)if(child?.isInstancedMesh)child.visible=false}}
  function sync(){
    hideLegacy();for(const key of chunks.keys()){const[cx,cz]=key.split(',').map(Number);build(cx,cz)}
    for(const[key,m]of[...meshes])if(!chunks.has(key)){scene.remove(m);m.geometry.dispose();meshes.delete(key);const w=waters.get(key);if(w){scene.remove(w);w.geometry.dispose();waters.delete(key)}}
  }
  let last=0;function loop(t){if(t-last>220){last=t;sync()}requestAnimationFrame(loop)}requestAnimationFrame(loop);
  window.WildernessTerrain41={meshes,waters,sync};
})();