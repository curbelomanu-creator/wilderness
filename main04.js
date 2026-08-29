// ---------- jugador / cámara ----------
const clock = new THREE.Clock();
let camYaw = Math.PI * .75;
let camPitch = .30;
let cameraZoomAdjust = 0;
const moveVelocity = new THREE.Vector3();
const moveDesired = new THREE.Vector3();
const camTargetSmooth = new THREE.Vector3();
let camTargetReady = false;
let currentMoveSpeed = 0;

function dampAngle(current,target,lambda,dt){
  let delta=((target-current+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;
  return current+delta*(1-Math.exp(-lambda*dt));
}
function gameplayMode(){
  const command=!!window.WildernessInterface30?.state?.command;
  const battle=!!window.WildernessFieldBattle?.battle;
  return command?'command':battle?'battle':(mounted&&mount?'mounted':'explore');
}
function updatePlayer(dt) {
  let x = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0) + mobileMove.x;
  let z = (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0) - mobileMove.z;
  const len = Math.hypot(x, z); if (len > 1) { x /= len; z /= len; }
  const hasInput=len>.04;
  const mountFactor = mounted && mount ? (mount.type === 'camel' ? 1.42 : 1.78) : 1;
  const running=!!(keys.ShiftLeft||keys.ShiftRight||mobileMove.run);
  let targetSpeed=(running?9.15:5.75)*mountFactor;
  const forward = new THREE.Vector3(-Math.sin(camYaw), 0, -Math.cos(camYaw));
  const right = new THREE.Vector3(-forward.z, 0, forward.x);
  moveDesired.copy(forward).multiplyScalar(z).addScaledVector(right,x);
  if(hasInput&&moveDesired.lengthSq()>0){
    moveDesired.normalize();
    // Subir pendientes reduce velocidad; bajar pendientes apenas la aumenta.
    const hereY=W.groundY(player.mesh.position.x,player.mesh.position.z);
    const probeX=player.mesh.position.x+moveDesired.x*2.2,probeZ=player.mesh.position.z+moveDesired.z*2.2;
    const slope=W.groundY(probeX,probeZ)-hereY;
    const slopeFactor=THREE.MathUtils.clamp(1-slope*.095,.67,1.08);
    targetSpeed*=slopeFactor;
    moveDesired.multiplyScalar(targetSpeed);
    const accel=mounted&&mount?3.9:(running?7.2:8.8);
    moveVelocity.lerp(moveDesired,1-Math.exp(-accel*dt));
  }else{
    const brake=mounted&&mount?3.0:7.8;
    moveVelocity.multiplyScalar(Math.exp(-brake*dt));
    if(moveVelocity.lengthSq()<.006)moveVelocity.set(0,0,0);
  }
  currentMoveSpeed=moveVelocity.length();
  if(currentMoveSpeed>.02){
    const oldY=player.mesh.position.y;
    player.mesh.position.addScaledVector(moveVelocity,dt);
    player.mesh.position.y=W.groundY(player.mesh.position.x,player.mesh.position.z);
    const facing=Math.atan2(moveVelocity.x,moveVelocity.z);
    player.mesh.rotation.y=dampAngle(player.mesh.rotation.y,facing,mounted&&mount?5.2:10.5,dt);
    // Evita saltos visuales bruscos por pequeños cambios de terreno.
    if(!mounted&&Math.abs(player.mesh.position.y-oldY)<1.2)player.mesh.position.y=THREE.MathUtils.lerp(oldY,player.mesh.position.y,1-Math.exp(-13*dt));
  }else player.mesh.position.y=W.groundY(player.mesh.position.x,player.mesh.position.z);
  if (mounted && mount) {
    mount.mesh.position.copy(player.mesh.position); mount.mesh.rotation.copy(player.mesh.rotation);
    player.mesh.position.y += mount.type === 'camel' ? 1.75 : 1.35;
  }
  updateChunks();

  const mode=gameplayMode();
  let distance=9.6,height=1.55,targetHeight=2.05,fov=60,shoulder=0;
  if(mode==='mounted'){distance=12.8;height=2.2;targetHeight=2.8;fov=62}
  else if(mode==='battle'){distance=11.8;height=1.9;targetHeight=2.2;fov=56;shoulder=.75}
  else if(mode==='command'){distance=17.2;height=4.2;targetHeight=2.3;fov=58}
  distance=THREE.MathUtils.clamp(distance+cameraZoomAdjust,6.5,23);
  const rawTarget=player.mesh.position.clone().add(new THREE.Vector3(0,targetHeight,0));
  if(!camTargetReady){camTargetSmooth.copy(rawTarget);camTargetReady=true}else camTargetSmooth.lerp(rawTarget,1-Math.exp(-10*dt));
  const horizontal=Math.cos(camPitch)*distance;
  const offset=new THREE.Vector3(Math.sin(camYaw)*horizontal,Math.sin(camPitch)*distance+height,Math.cos(camYaw)*horizontal);
  if(shoulder){const side=new THREE.Vector3(Math.cos(camYaw),0,-Math.sin(camYaw));offset.addScaledVector(side,shoulder)}
  const desired=camTargetSmooth.clone().add(offset);
  const cameraTightness=mode==='command'?4.6:mode==='mounted'?5.4:7.0;
  camera.position.lerp(desired,1-Math.exp(-cameraTightness*dt));
  camera.lookAt(camTargetSmooth);
  camera.fov=THREE.MathUtils.lerp(camera.fov,fov,1-Math.exp(-5*dt));camera.updateProjectionMatrix();
}
function orbitCamera(dx,dy){camYaw-=dx*.0052;camPitch=THREE.MathUtils.clamp(camPitch+dy*.0044,-.14,1.02)}
addEventListener('mousemove', e => { if (e.buttons === 2) orbitCamera(e.movementX,e.movementY); });
addEventListener('wheel',e=>{if(isMobile)return;cameraZoomAdjust=THREE.MathUtils.clamp(cameraZoomAdjust+Math.sign(e.deltaY)*.85,-2.5,6.5)},{passive:true});
addEventListener('contextmenu', e => e.preventDefault());
let cameraPointer = null, lastCameraX = 0, lastCameraY = 0;
renderer.domElement.addEventListener('pointerdown', e => { if (!isMobile || e.target !== renderer.domElement) return; cameraPointer = e.pointerId; lastCameraX = e.clientX; lastCameraY=e.clientY; renderer.domElement.setPointerCapture(e.pointerId); e.preventDefault(); });
renderer.domElement.addEventListener('pointermove', e => { if (e.pointerId !== cameraPointer) return; const dx = e.clientX - lastCameraX,dy=e.clientY-lastCameraY; lastCameraX = e.clientX;lastCameraY=e.clientY; orbitCamera(dx,dy); e.preventDefault(); });
const stopCamera = e => { if (e.pointerId === cameraPointer) cameraPointer = null; };
renderer.domElement.addEventListener('pointerup', stopCamera); renderer.domElement.addEventListener('pointercancel', stopCamera);

function updateWorldEvents() {
  for (const s of generatedSettlements.values()) {
    const d = Math.hypot(player.mesh.position.x - s.x, player.mesh.position.z - s.z);
    if (!s.discovered && d < (s.type === 'city' ? 72 : 45)) {
      s.discovered = true;
      if (s.type === 'city') flash(`🏛️ Descubriste ${s.name}. Rey ${s.king}. Guarnición: ${s.defenders}.`, 4200);
      else flash(`🏘️ Descubriste la aldea de ${s.name}.`, 2800);
    }
  }
  for (const c of caves) { const d = Math.hypot(player.mesh.position.x - c.x, player.mesh.position.z - c.z); if (!c.discovered && d < 18) { c.discovered = true; flash('🕳️ Ves una cueva entre las rocas.', 2200); } }
  for (const city of cities) { if (city.captured) continue; const defendersAlive = city.defendersRuntime.filter(e => e.alive).length, kingAlive = city.kingRuntime?.alive; if (defendersAlive === 0 && !kingAlive) { city.captured = true; const y = W.groundY(city.x, city.z - 4); worldBox(.45, 7, .45, mats.wood, city.x, y + 3.5, city.z - 4, false); worldBox(3.2, 1.7, .3, mats.blue, city.x + 1.5, y + 6.3, city.z - 4, false); flash(`🏛️ ¡${city.name.toUpperCase()} HA CAÍDO! Sus habitantes ahora pueden unirse a tu ejército.`, 5200); } }
}
function nearestSettlement() { let best = null, bd = Infinity; for (const s of generatedSettlements.values()) { const d = Math.hypot(player.mesh.position.x - s.x, player.mesh.position.z - s.z); if (d < bd) { best = s; bd = d; } } return best ? { s: best, d: bd } : null; }
function updateUI() {
  const biomeLabels = { desert: 'Desierto', rocky: 'Montañas rocosas', steppe: 'Estepa', fertile: 'Valle fértil', oasis: 'Oasis' }; const biome = W.biomeAt(player.mesh.position.x, player.mesh.position.z); const living = followers.filter(f => f.alive), inf = living.filter(f => f.role === 'infantry').length, arq = living.filter(f => f.role === 'archer').length, cab = living.filter(f => f.role === 'cavalry').length; const ownedSheep = livestock.filter(a => a.alive && a.owned && a.type === 'sheep').length; const chunkX = Math.floor(player.mesh.position.x / W.CHUNK_SIZE), chunkZ = Math.floor(player.mesh.position.z / W.CHUNK_SIZE);
  stats.innerHTML = `<b>WILDERNESS · 3.1</b><br>Vida: ${Math.max(0, Math.ceil(player.hp))}/${player.maxHp}<br>Ejército: ${living.length}/${MAX_FOLLOWERS}<br>Inf: ${inf} · Arq: ${arq} · Cab: ${cab}<br>Ganado: ${ownedSheep}<br>Montado: ${mounted ? (mount?.type === 'camel' ? 'Camello' : 'Caballo') : 'No'}<br>Bioma: ${biomeLabels[biome]}<br>Región: ${chunkX}, ${chunkZ}<br>Semilla: ${W.seedToken}`;
  const labels = { people: 'PERSONAS', livestock: 'GANADO', all: 'TODOS', none: 'NADIE' }; const near = nearestSettlement(); let nearText = ''; if (near && near.d < 115) { if (near.s.type === 'city') { const aliveDefs = near.s.defendersRuntime.filter(e => e.alive), alive = aliveDefs.length + (near.s.kingRuntime?.alive ? 1 : 0); const ea = aliveDefs.filter(e => e.role === 'archer').length, ec = aliveDefs.filter(e => e.role === 'cavalry').length; nearText = `<br><br><b>${near.s.name}</b><br>${near.s.captured ? 'Ciudad conquistada' : `Defensores: ${alive} · Arq ${ea} · Cab ${ec}`}`; } else nearText = `<br><br><b>${near.s.name}</b><br>Aldea`; }
  orders.innerHTML = `<b>MANDO DEL EJÉRCITO</b><br>Grupo: ${roleLabels[selectedGroup]}<br>Formación: ${formationLabels[formation]}<br>Seguir pueblo: ${labels[followMode]}${nearText}<br><br><b>Teclas tácticas</b><br>Q grupo · V formación · T seguir · H mantener · F atacar · R retirada`; updateBattleButtons();
}
updateChunks(true); if (!generatedSettlements.get(W.starterVillage.id)) ensureSettlement(W.starterVillage); if (!generatedSettlements.get(W.starterCity.id)) ensureSettlement(W.starterCity);
function animate() { requestAnimationFrame(animate); const dt = Math.min(clock.getDelta(), .033); updatePlayer(dt); updateFollowers(dt); updateLivestock(dt); updateEnemies(dt); updateProjectiles(dt); updateWorldEvents(); updateUI(); renderer.render(scene, camera); }
animate(); addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5)); }); flash(`Wilderness · Movimiento fluido y cámara contextual.`, 4200);