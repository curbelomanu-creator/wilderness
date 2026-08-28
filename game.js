(() => {
  const THREE = window.THREE;
  const isMobile = matchMedia('(pointer: coarse)').matches || innerWidth <= 820;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xb9d1d4);
  scene.fog = new THREE.FogExp2(0xcab98c, 0.0045);

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 800);
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.prepend(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xffe8bd, 0x66503b, 1.7);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1c9, 2.3);
  sun.position.set(-55, 85, 35);
  sun.castShadow = !isMobile;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -100; sun.shadow.camera.right = 100;
  sun.shadow.camera.top = 100; sun.shadow.camera.bottom = -100;
  scene.add(sun);

  // ---------- deterministic procedural helpers ----------
  let seed = Math.floor(Math.random() * 999999);
  function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  function noise2(x, z) {
    return Math.sin(x * 0.083 + seed * 0.00001) * 0.55 + Math.cos(z * 0.071 - seed * 0.00002) * 0.45 + Math.sin((x + z) * 0.031) * 0.65;
  }
  function groundY(x, z) {
    const n = noise2(x, z);
    return Math.floor((n + Math.sin(x * 0.014) * 0.7) * 1.7) * 0.55;
  }

  const mats = {
    sand: new THREE.MeshLambertMaterial({ color: 0xc49a5a, flatShading: true }),
    sand2: new THREE.MeshLambertMaterial({ color: 0xd3ad6b, flatShading: true }),
    rock: new THREE.MeshLambertMaterial({ color: 0x806852, flatShading: true }),
    green: new THREE.MeshLambertMaterial({ color: 0x7d8b45, flatShading: true }),
    adobe: new THREE.MeshLambertMaterial({ color: 0xb67d4b, flatShading: true }),
    adobe2: new THREE.MeshLambertMaterial({ color: 0x8e5e3b, flatShading: true }),
    wood: new THREE.MeshLambertMaterial({ color: 0x5b3923, flatShading: true }),
    white: new THREE.MeshLambertMaterial({ color: 0xdccaa6, flatShading: true }),
    black: new THREE.MeshLambertMaterial({ color: 0x2d261f, flatShading: true }),
    red: new THREE.MeshLambertMaterial({ color: 0x8b3c2f, flatShading: true }),
    blue: new THREE.MeshLambertMaterial({ color: 0x365d72, flatShading: true }),
    gold: new THREE.MeshLambertMaterial({ color: 0xc9a03f, flatShading: true }),
    lion: new THREE.MeshLambertMaterial({ color: 0xb77b2e, flatShading: true }),
    sheep: new THREE.MeshLambertMaterial({ color: 0xe7dec8, flatShading: true }),
    horse: new THREE.MeshLambertMaterial({ color: 0x6e4731, flatShading: true }),
    enemy: new THREE.MeshLambertMaterial({ color: 0x6d2c2c, flatShading: true }),
  };

  // ---------- terrain tiles ----------
  const tileGeo = new THREE.BoxGeometry(4, 0.75, 4);
  const tiles = new THREE.Group();
  const WORLD = 220;
  for (let x = -WORLD/2; x <= WORLD/2; x += 4) {
    for (let z = -WORLD/2; z <= WORLD/2; z += 4) {
      const y = groundY(x,z);
      const oasis = Math.hypot(x + 42, z - 25) < 24;
      const rocky = noise2(x*1.8,z*1.8) > 1.05;
      const mat = oasis ? mats.green : rocky ? mats.rock : (rand()>.78 ? mats.sand2 : mats.sand);
      const t = new THREE.Mesh(tileGeo, mat);
      t.position.set(x, y - 0.38, z);
      t.receiveShadow = true;
      tiles.add(t);
    }
  }
  scene.add(tiles);

  function box(w,h,d,mat,x,y,z,cast=true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
    m.position.set(x,y,z); m.castShadow=cast; m.receiveShadow=true; scene.add(m); return m;
  }
  function palm(x,z,s=1){
    const y=groundY(x,z);
    box(.65,5*s,.65,mats.wood,x,y+2.5*s,z);
    for(let i=0;i<5;i++){
      const leaf=box(.35,0.25,3.2*s,mats.green,x,y+5.15*s,z);
      leaf.rotation.y=i*Math.PI/2.5;
    }
  }
  for(let i=0;i<18;i++){ const a=rand()*Math.PI*2,r=5+rand()*18; palm(-42+Math.cos(a)*r,-25+Math.sin(a)*r,.7+rand()*.45); }

  // ---------- entity factories ----------
  const followers=[]; const livestock=[]; const enemies=[]; const civilians=[];
  let followMode='people';
  let mounted=false, mount=null;
  const mobileMove={x:0,z:0,run:false};

  function makeHumanoid({x=0,z=0,enemy=false,civilian=false,king=false}={}){
    const g=new THREE.Group();
    const bodyMat = king ? mats.gold : enemy ? mats.enemy : civilian ? mats.white : mats.blue;
    const body=new THREE.Mesh(new THREE.BoxGeometry(1.05,1.7,.7),bodyMat); body.position.y=1.6; body.castShadow=true; g.add(body);
    const head=new THREE.Mesh(new THREE.BoxGeometry(.78,.78,.78),new THREE.MeshLambertMaterial({color:0xa87752,flatShading:true})); head.position.y=2.85; head.castShadow=true; g.add(head);
    const legs=[-.26,.26].map(dx=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.28,1,.28),mats.black);l.position.set(dx,.55,0);l.castShadow=true;g.add(l);return l;});
    if(enemy || king){ const spear=new THREE.Mesh(new THREE.BoxGeometry(.12,2.8,.12),mats.wood); spear.position.set(.72,1.7,0); spear.rotation.z=.1; g.add(spear); }
    g.position.set(x,groundY(x,z),z); scene.add(g);
    const e={mesh:g,hp:king?8:4,alive:true,enemy,civilian,king,recruited:false,speed: enemy?3.8:4.2,cooldown:0};
    if(enemy||king) enemies.push(e); else civilians.push(e);
    return e;
  }

  function makeAnimal(type,x,z){
    const g=new THREE.Group();
    const mat=type==='lion'?mats.lion:type==='horse'?mats.horse:mats.sheep;
    const body=new THREE.Mesh(new THREE.BoxGeometry(type==='horse'?1.3:1.15,.8,type==='horse'?2.2:1.45),mat); body.position.y=1; body.castShadow=true; g.add(body);
    const head=new THREE.Mesh(new THREE.BoxGeometry(.7,.7,.7),mat); head.position.set(0,1.35,type==='horse'?1.25:.9); head.castShadow=true; g.add(head);
    for(const dx of [-.38,.38]) for(const dz of [-.65,.65]){const l=new THREE.Mesh(new THREE.BoxGeometry(.18,.8,.18), type==='sheep'?mats.black:mat); l.position.set(dx,.4,dz);l.castShadow=true;g.add(l)}
    if(type==='lion'){ const mane=new THREE.Mesh(new THREE.BoxGeometry(.95,.95,.5),new THREE.MeshLambertMaterial({color:0x7b4b20,flatShading:true}));mane.position.set(0,1.4,.72);g.add(mane); }
    g.position.set(x,groundY(x,z),z); scene.add(g);
    const a={mesh:g,type,hp:type==='lion'?7:5,alive:true,speed:type==='lion'?5.2:type==='horse'?7:3,wander:rand()*6.28,cooldown:0,recruited:type==='sheep'};
    if(type==='lion') enemies.push(a); else livestock.push(a);
    return a;
  }

  // ---------- player ----------
  const player=makeHumanoid({x:0,z:0});
  civilians.splice(civilians.indexOf(player),1);
  player.hp=12; player.maxHp=12;
  player.mesh.children[0].material=mats.blue;
  player.mesh.scale.set(1.08,1.08,1.08);

  // ---------- settlement generation ----------
  function makeVillage(cx,cz){
    for(let i=0;i<6;i++){
      const x=cx-12+(i%3)*9, z=cz-6+Math.floor(i/3)*11, y=groundY(x,z);
      box(6,3.2,5,mats.adobe,x,y+1.6,z);
      box(2.5,.3,5.4,mats.wood,x,y+3.35,z);
      makeHumanoid({x:x+(rand()-.5)*3,z:z+(rand()-.5)*3,civilian:true});
    }
  }
  makeVillage(-40,38);

  function makeCity(cx,cz){
    const y=groundY(cx,cz);
    // rectangular walls with gate opening south
    for(let x=-24;x<=24;x+=4){
      box(4,4.5,2,mats.adobe2,cx+x,groundY(cx+x,cz-20)+2.2,cz-20);
      if(Math.abs(x)>5) box(4,4.5,2,mats.adobe2,cx+x,groundY(cx+x,cz+20)+2.2,cz+20);
    }
    for(let z=-16;z<=16;z+=4){ box(2,4.5,4,mats.adobe2,cx-24,groundY(cx-24,cz+z)+2.2,cz+z); box(2,4.5,4,mats.adobe2,cx+24,groundY(cx+24,cz+z)+2.2,cz+z); }
    for(const [dx,dz] of [[-24,-20],[24,-20],[-24,20],[24,20]]) box(4.5,7,4.5,mats.adobe2,cx+dx,groundY(cx+dx,cz+dz)+3.5,cz+dz);
    // houses
    for(let i=0;i<8;i++){
      const x=cx-15+(i%4)*10, z=cz-8+Math.floor(i/4)*13;
      box(6,3,5,mats.adobe,x,groundY(x,z)+1.5,z);
    }
    // palace
    box(11,5,8,mats.adobe2,cx,groundY(cx,cz-8)+2.5,cz-8);
    // civilians
    for(let i=0;i<8;i++) makeHumanoid({x:cx+(rand()-.5)*30,z:cz+(rand()-.5)*28,civilian:true});
    // defenders
    for(let i=0;i<10;i++) makeHumanoid({x:cx-17+rand()*34,z:cz-13+rand()*27,enemy:true});
    makeHumanoid({x:cx,z:cz-7,enemy:true,king:true});
  }
  makeCity(55,-45);

  // world animals
  for(let i=0;i<9;i++) makeAnimal('sheep',-20+rand()*28,8+rand()*25);
  makeAnimal('horse',12,9);
  for(let i=0;i<3;i++) makeAnimal('lion',15+rand()*30,25+rand()*28);

  // ---------- input ----------
  const keys={};
  function setFollowMode(mode){
    followMode=mode;
    const text={people:'PERSONAS síganme',livestock:'GANADO sígame',all:'TODOS síganme',none:'NADIE me siga'}[mode];
    flash(`Orden: ${text}`);
    document.querySelectorAll('.order-btn').forEach(b=>b.classList.toggle('active',b.dataset.follow===mode));
  }
  function retreat(){ followers.forEach(f=>f.retreat=3); flash('¡RETIRADA!'); }
  addEventListener('keydown',e=>{
    keys[e.code]=true;
    if(e.repeat) return;
    if(e.code==='Digit1') setFollowMode('people');
    if(e.code==='Digit2') setFollowMode('livestock');
    if(e.code==='Digit3') setFollowMode('all');
    if(e.code==='Digit4') setFollowMode('none');
    if(e.code==='KeyE') interact();
    if(e.code==='KeyF') playerAttack();
    if(e.code==='KeyR') retreat();
  });
  addEventListener('keyup',e=>keys[e.code]=false);

  // Touch controls: left thumb moves; drag the world with another finger to rotate camera.
  const joyZone=document.getElementById('joystick-zone');
  const joyStick=document.getElementById('joystick-stick');
  let joyPointer=null, joyCenter={x:0,y:0};
  function resetJoy(){ mobileMove.x=0; mobileMove.z=0; joyPointer=null; joyStick && (joyStick.style.transform='translate(0px,0px)'); }
  if(joyZone){
    joyZone.addEventListener('pointerdown',e=>{
      joyPointer=e.pointerId; joyZone.setPointerCapture(e.pointerId);
      const r=joyZone.getBoundingClientRect(); joyCenter={x:r.left+r.width/2,y:r.top+r.height/2};
      e.preventDefault();
    });
    joyZone.addEventListener('pointermove',e=>{
      if(e.pointerId!==joyPointer)return;
      const max=39, dx=e.clientX-joyCenter.x, dy=e.clientY-joyCenter.y, len=Math.hypot(dx,dy)||1, scale=Math.min(1,max/len);
      const px=dx*scale, py=dy*scale;
      mobileMove.x=px/max; mobileMove.z=py/max;
      joyStick.style.transform=`translate(${px}px,${py}px)`;
      e.preventDefault();
    });
    joyZone.addEventListener('pointerup',resetJoy); joyZone.addEventListener('pointercancel',resetJoy);
  }
  document.querySelectorAll('.order-btn').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();setFollowMode(b.dataset.follow);}));
  const attackBtn=document.getElementById('btn-attack'), interactBtn=document.getElementById('btn-interact'), retreatBtn=document.getElementById('btn-retreat'), runBtn=document.getElementById('btn-run');
  attackBtn?.addEventListener('pointerdown',e=>{e.preventDefault();playerAttack();});
  interactBtn?.addEventListener('pointerdown',e=>{e.preventDefault();interact();});
  retreatBtn?.addEventListener('pointerdown',e=>{e.preventDefault();retreat();});
  runBtn?.addEventListener('pointerdown',e=>{e.preventDefault();mobileMove.run=true;runBtn.classList.add('active');});
  const stopRun=e=>{mobileMove.run=false;runBtn?.classList.remove('active');};
  runBtn?.addEventListener('pointerup',stopRun); runBtn?.addEventListener('pointercancel',stopRun); runBtn?.addEventListener('pointerleave',stopRun);

  function dist(a,b){return a.position.distanceTo(b.position)}
  function nearestEntity(arr,maxD){let best=null,bd=maxD;for(const e of arr){if(!e.alive)continue;const d=dist(player.mesh,e.mesh);if(d<bd){best=e;bd=d}}return best;}

  function interact(){
    if(mounted){ mounted=false; if(mount){ mount.mesh.position.copy(player.mesh.position).add(new THREE.Vector3(1.5,0,0)); } mount=null; flash('Desmontaste'); return; }
    const horse=livestock.find(a=>a.alive&&a.type==='horse'&&dist(player.mesh,a.mesh)<3.2);
    if(horse){mounted=true;mount=horse;flash('Montaste el caballo');return;}
    const c=nearestEntity(civilians.filter(x=>x!==player&&!x.recruited),3.5);
    if(c){c.recruited=true; followers.push(c); flash('Aldeano reclutado'); return;}
    flash('No hay nada con qué interactuar');
  }

  function playerAttack(){
    const target=nearestEntity(enemies,3.6);
    if(!target){flash('No hay enemigo al alcance');return;}
    damage(target,2.5);
    flash(target.alive?'Golpeaste al enemigo':'Enemigo derrotado');
  }

  function damage(e,amount){
    if(!e.alive)return; e.hp-=amount;
    if(e.hp<=0){e.alive=false;e.mesh.rotation.z=Math.PI/2;setTimeout(()=>{scene.remove(e.mesh);},2500);}
  }

  // ---------- AI ----------
  const vTmp=new THREE.Vector3();
  function moveToward(entity,target,dt,speed,stop=2){
    vTmp.subVectors(target,entity.mesh.position); vTmp.y=0; const d=vTmp.length();
    if(d>stop){vTmp.normalize(); entity.mesh.position.addScaledVector(vTmp,speed*dt); entity.mesh.rotation.y=Math.atan2(vTmp.x,vTmp.z); entity.mesh.position.y=groundY(entity.mesh.position.x,entity.mesh.position.z);}
    return d;
  }

  function updateFollowers(dt){
    followers.forEach((f,i)=>{
      if(!f.alive)return;
      f.cooldown=Math.max(0,(f.cooldown||0)-dt);
      if(f.retreat>0){f.retreat-=dt; const away=vTmp.subVectors(f.mesh.position,player.mesh.position).setY(0).normalize(); f.mesh.position.addScaledVector(away,5*dt); return;}
      const closeEnemy=enemies.find(e=>e.alive&&dist(f.mesh,e.mesh)<7);
      if(closeEnemy){ const d=moveToward(f,closeEnemy.mesh.position,dt,4.4,1.7); if(d<2&&f.cooldown<=0){damage(closeEnemy,1.2);f.cooldown=.8;} return; }
      if(followMode==='people'||followMode==='all'){
        const angle=(i/Math.max(1,followers.length))*Math.PI*2;
        const target=player.mesh.position.clone().add(new THREE.Vector3(Math.cos(angle)*3.5,0,Math.sin(angle)*3.5+3));
        moveToward(f,target,dt,4.5,1.2);
      }
    });
  }

  function updateLivestock(dt){
    livestock.forEach((a,i)=>{
      if(!a.alive||a===mount)return;
      a.wander+=dt*(rand()-.48)*.8;
      const shouldFollow=(followMode==='livestock'||followMode==='all') && a.type!=='horse';
      if(shouldFollow){
        const angle=i*.9; const target=player.mesh.position.clone().add(new THREE.Vector3(Math.cos(angle)*5,0,Math.sin(angle)*5+5));
        moveToward(a,target,dt,a.speed,2.5);
      } else if(a.type!=='horse') {
        a.mesh.position.x+=Math.sin(a.wander)*dt*.35; a.mesh.position.z+=Math.cos(a.wander)*dt*.35;
        a.mesh.position.y=groundY(a.mesh.position.x,a.mesh.position.z);
      }
    });
  }

  function updateEnemies(dt){
    enemies.forEach(e=>{
      if(!e.alive)return;
      e.cooldown=Math.max(0,(e.cooldown||0)-dt);
      const isLion=e.type==='lion';
      let target=null, targetD=isLion?11:10;
      const candidates=[player,...followers.filter(x=>x.alive),...livestock.filter(x=>x.alive&&x.type==='sheep')];
      for(const c of candidates){const d=dist(e.mesh,c.mesh);if(d<targetD){target=c;targetD=d;}}
      if(target){
        const d=moveToward(e,target.mesh.position,dt,e.speed||4,1.6);
        if(d<1.9&&e.cooldown<=0){damage(target,isLion?2:1);e.cooldown=isLion?1.1:1.3; if(target===player&&player.hp<=0) respawn();}
      } else if(isLion){e.wander=(e.wander||0)+dt*.35; e.mesh.position.x+=Math.sin(e.wander)*dt*.35;e.mesh.position.z+=Math.cos(e.wander)*dt*.35;e.mesh.position.y=groundY(e.mesh.position.x,e.mesh.position.z);}
    });
  }

  function respawn(){ player.hp=player.maxHp; player.mesh.position.set(0,groundY(0,0),0); mounted=false;mount=null;flash('Has caído. Regresas al punto inicial.'); }

  // ---------- player movement / camera ----------
  const clock=new THREE.Clock();
  let camYaw=Math.PI*.75;
  function updatePlayer(dt){
    let x=(keys.KeyD?1:0)-(keys.KeyA?1:0) + mobileMove.x;
    let z=(keys.KeyS?1:0)-(keys.KeyW?1:0) + mobileMove.z;
    const len=Math.hypot(x,z); if(len>1){x/=len;z/=len;}
    const speed=((keys.ShiftLeft||mobileMove.run)?1.65:1)*(mounted?11:6);
    const forward=new THREE.Vector3(Math.sin(camYaw),0,Math.cos(camYaw));
    const right=new THREE.Vector3(forward.z,0,-forward.x);
    const dir=forward.multiplyScalar(-z).add(right.multiplyScalar(x));
    if(dir.lengthSq()>0){dir.normalize();player.mesh.position.addScaledVector(dir,speed*dt);player.mesh.rotation.y=Math.atan2(dir.x,dir.z);}
    player.mesh.position.x=THREE.MathUtils.clamp(player.mesh.position.x,-105,105);
    player.mesh.position.z=THREE.MathUtils.clamp(player.mesh.position.z,-105,105);
    player.mesh.position.y=groundY(player.mesh.position.x,player.mesh.position.z);
    if(mounted&&mount){mount.mesh.position.copy(player.mesh.position);mount.mesh.rotation.copy(player.mesh.rotation);player.mesh.position.y+=1.35;}
    const desired=player.mesh.position.clone().add(new THREE.Vector3(0,mounted?7:6,0));
    const back=new THREE.Vector3(Math.sin(camYaw),.32,Math.cos(camYaw)).multiplyScalar(11);
    desired.add(back);
    camera.position.lerp(desired,1-Math.pow(.0001,dt));
    camera.lookAt(player.mesh.position.clone().add(new THREE.Vector3(0,2,0)));
  }
  addEventListener('mousemove',e=>{if(e.buttons===2){camYaw-=e.movementX*.005;}});
  addEventListener('contextmenu',e=>e.preventDefault());

  let cameraPointer=null, lastCameraX=0;
  renderer.domElement.addEventListener('pointerdown',e=>{
    if(!isMobile || e.target!==renderer.domElement)return;
    cameraPointer=e.pointerId; lastCameraX=e.clientX; renderer.domElement.setPointerCapture(e.pointerId); e.preventDefault();
  });
  renderer.domElement.addEventListener('pointermove',e=>{
    if(e.pointerId!==cameraPointer)return;
    const dx=e.clientX-lastCameraX; lastCameraX=e.clientX; camYaw-=dx*.009; e.preventDefault();
  });
  const stopCamera=e=>{if(e.pointerId===cameraPointer)cameraPointer=null;};
  renderer.domElement.addEventListener('pointerup',stopCamera); renderer.domElement.addEventListener('pointercancel',stopCamera);

  // ---------- city capture ----------
  let cityCaptured=false;
  function updateCapture(){
    if(cityCaptured)return;
    const remaining=enemies.filter(e=>e.alive&&!e.type).length;
    if(remaining===0){cityCaptured=true;flash('🏛️ ¡LA CIUDAD HA CAÍDO! Ahora es tuya.',5000);}
  }

  // ---------- UI ----------
  const stats=document.getElementById('stats'),orders=document.getElementById('orders'),msg=document.getElementById('message');
  let msgTimer=0;
  function flash(text,ms=1700){msg.textContent=text;msg.style.opacity=1;clearTimeout(msgTimer);msgTimer=setTimeout(()=>msg.style.opacity=0,ms);}
  function updateUI(){
    stats.innerHTML=`<b>WILDERNESS · PROTOTYPE 0.2</b><br>Vida: ${Math.max(0,Math.ceil(player.hp))}/${player.maxHp}<br>Seguidores: ${followers.filter(f=>f.alive).length}<br>Ganado: ${livestock.filter(a=>a.alive&&a.type==='sheep').length}<br>Montado: ${mounted?'Sí':'No'}<br>Semilla: ${seed}`;
    const labels={people:'PERSONAS',livestock:'GANADO',all:'TODOS',none:'NADIE'};
    orders.innerHTML=`<b>ORDEN ACTIVA</b><br>Seguir: ${labels[followMode]}<br><br><b>Objetivo del prototipo</b><br>Recluta aldeanos → reúne ganado → monta el caballo → encuentra la ciudad → derrota su guarnición.`;
  }

  function animate(){
    requestAnimationFrame(animate);
    const dt=Math.min(clock.getDelta(),.033);
    updatePlayer(dt); updateFollowers(dt); updateLivestock(dt); updateEnemies(dt); updateCapture(); updateUI();
    renderer.render(scene,camera);
  }
  animate();

  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,isMobile?1:1.5));});
  flash('Explora. Hay una aldea, ganado, leones y una ciudad en este mundo.',3500);
})();
