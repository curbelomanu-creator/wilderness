// Wilderness 4.1 - continuous rendered terrain replacing floating tile boxes
(()=>{
  const T=window.THREE,W=window.WildernessWorld;
  if(!T||!W||typeof scene==='undefined'||typeof chunks==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const meshes=new Map();
  const material=new T.MeshLambertMaterial({vertexColors:true,flatShading:false,side:T.DoubleSide});
  const colors={
    desert:new T.Color(0xc7a069),
    steppe:new T.Color(0x9d945d),
    fertile:new T.Color(0x74824c),
    oasis:new T.Color(0x688455),
    rocky:new T.Color(0x817465),
    road:new T.Color(0x9d7953)
  };
  function sampleColor(x,z){
    if(W.roadAt(x,z))return colors.road;
    return colors[W.biomeAt(x,z)]||colors.desert;
  }
  function build(cx,cz){
    const key=`${cx},${cz}`;if(meshes.has(key))return;
    const seg=mobile?8:12;
    const geo=new T.PlaneGeometry(W.CHUNK_SIZE,W.CHUNK_SIZE,seg,seg);
    geo.rotateX(-Math.PI/2);
    const pos=geo.attributes.position,arr=new Float32Array(pos.count*3);
    const ox=cx*W.CHUNK_SIZE+W.CHUNK_SIZE/2,oz=cz*W.CHUNK_SIZE+W.CHUNK_SIZE/2;
    for(let i=0;i<pos.count;i++){
      const lx=pos.getX(i),lz=pos.getZ(i),wx=ox+lx,wz=oz+lz;
      pos.setY(i,W.groundY(wx,wz)+.035);
      const c=sampleColor(wx,wz);arr[i*3]=c.r;arr[i*3+1]=c.g;arr[i*3+2]=c.b;
    }
    geo.setAttribute('color',new T.BufferAttribute(arr,3));geo.computeVertexNormals();
    const mesh=new T.Mesh(geo,material);mesh.position.set(ox,0,oz);mesh.receiveShadow=true;mesh.castShadow=false;mesh.name='terrain41-'+key;scene.add(mesh);meshes.set(key,mesh);
  }
  function hideLegacy(){
    for(const [,g] of chunks){
      if(!g)continue;
      for(const child of g.children){if(child?.isInstancedMesh)child.visible=false}
    }
  }
  function sync(){
    hideLegacy();
    for(const key of chunks.keys()){
      const [cx,cz]=key.split(',').map(Number);build(cx,cz);
    }
    for(const [key,m] of [...meshes])if(!chunks.has(key)){
      scene.remove(m);m.geometry.dispose();meshes.delete(key);
    }
  }
  let last=0;function loop(t){if(t-last>220){last=t;sync()}requestAnimationFrame(loop)}requestAnimationFrame(loop);
  window.WildernessTerrain41={meshes,sync};
})();