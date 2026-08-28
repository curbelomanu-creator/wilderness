// ---------- jugador / cámara ----------
const clock = new THREE.Clock();
let camYaw = Math.PI * .75;
function updatePlayer(dt) {
  let x = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0) + mobileMove.x;
  let z = (keys.KeyS ? 1 : 0) - (keys.KeyW ? 1 : 0) + mobileMove.z;
  const len = Math.hypot(x, z); if (len > 1) { x /= len; z /= len; }
  const mountFactor = mounted && mount ? (mount.type === 'camel' ? 1.45 : 1.8) : 1;
  const speed = ((keys.ShiftLeft || mobileMove.run) ? 1.55 : 1) * 6 * mountFactor;
  const forward = new THREE.Vector3(Math.sin(camYaw), 0, Math.cos(camYaw));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const dir = forward.multiplyScalar(-z).add(right.multiplyScalar(x));
  if (dir.lengthSq() > 0) { dir.normalize(); player.mesh.position.addScaledVector(dir, speed * dt); player.mesh.rotation.y = Math.atan2(dir.x, dir.z); }
  player.mesh.position.y = W.groundY(player.mesh.position.x, player.mesh.position.z);
  if (mounted && mount) { mount.mesh.position.copy(player.mesh.position); mount.mesh.rotation.copy(player.mesh.rotation); player.mesh.position.y += mount.type === 'camel' ? 1.75 : 1.35; }
  updateChunks();
  const desired = player.mesh.position.clone().add(new THREE.Vector3(0, mounted ? 7.2 : 6.1, 0));
  const back = new THREE.Vector3(Math.sin(camYaw), .32, Math.cos(camYaw)).multiplyScalar(mounted ? 12.5 : 11);
  desired.add(back); camera.position.lerp(desired, 1 - Math.pow(.0001, dt)); camera.lookAt(player.mesh.position.clone().add(new THREE.Vector3(0, 2, 0)));
}
addEventListener('mousemove', e => { if (e.buttons === 2) camYaw -= e.movementX * .005; });
addEventListener('contextmenu', e => e.preventDefault());
let cameraPointer = null, lastCameraX = 0;
renderer.domElement.addEventListener('pointerdown', e => { if (!isMobile || e.target !== renderer.domElement) return; cameraPointer = e.pointerId; lastCameraX = e.clientX; renderer.domElement.setPointerCapture(e.pointerId); e.preventDefault(); });
renderer.domElement.addEventListener('pointermove', e => { if (e.pointerId !== cameraPointer) return; const dx = e.clientX - lastCameraX; lastCameraX = e.clientX; camYaw -= dx * .009; e.preventDefault(); });
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
  for (const c of caves) {
    const d = Math.hypot(player.mesh.position.x - c.x, player.mesh.position.z - c.z);
    if (!c.discovered && d < 18) { c.discovered = true; flash('🕳️ Ves una cueva entre las rocas.', 2200); }
  }
  for (const city of cities) {
    if (city.captured) continue;
    const defendersAlive = city.defendersRuntime.filter(e => e.alive).length, kingAlive = city.kingRuntime?.alive;
    if (defendersAlive === 0 && !kingAlive) {
      city.captured = true;
      const y = W.groundY(city.x, city.z - 4);
      worldBox(.45, 7, .45, mats.wood, city.x, y + 3.5, city.z - 4, false);
      worldBox(3.2, 1.7, .3, mats.blue, city.x + 1.5, y + 6.3, city.z - 4, false);
      flash(`🏛️ ¡${city.name.toUpperCase()} HA CAÍDO! Sus habitantes ahora pueden unirse a tu ejército.`, 5200);
    }
  }
}

function nearestSettlement() {
  let best = null, bd = Infinity;
  for (const s of generatedSettlements.values()) { const d = Math.hypot(player.mesh.position.x - s.x, player.mesh.position.z - s.z); if (d < bd) { best = s; bd = d; } }
  return best ? { s: best, d: bd } : null;
}

function updateUI() {
  const biomeLabels = { desert: 'Desierto', rocky: 'Montañas rocosas', steppe: 'Estepa', fertile: 'Valle fértil', oasis: 'Oasis' };
  const biome = W.biomeAt(player.mesh.position.x, player.mesh.position.z);
  const living = followers.filter(f => f.alive), inf = living.filter(f => f.role === 'infantry').length, arq = living.filter(f => f.role === 'archer').length, cab = living.filter(f => f.role === 'cavalry').length;
  const ownedSheep = livestock.filter(a => a.alive && a.owned && a.type === 'sheep').length;
  const chunkX = Math.floor(player.mesh.position.x / W.CHUNK_SIZE), chunkZ = Math.floor(player.mesh.position.z / W.CHUNK_SIZE);
  stats.innerHTML = `<b>WILDERNESS · 0.4</b><br>Vida: ${Math.max(0, Math.ceil(player.hp))}/${player.maxHp}<br>Ejército: ${living.length}/${MAX_FOLLOWERS}<br>Inf: ${inf} · Arq: ${arq} · Cab: ${cab}<br>Ganado: ${ownedSheep}<br>Montado: ${mounted ? (mount?.type === 'camel' ? 'Camello' : 'Caballo') : 'No'}<br>Bioma: ${biomeLabels[biome]}<br>Región: ${chunkX}, ${chunkZ}<br>Semilla: ${W.seedToken}`;

  const labels = { people: 'PERSONAS', livestock: 'GANADO', all: 'TODOS', none: 'NADIE' };
  const near = nearestSettlement(); let nearText = '';
  if (near && near.d < 115) {
    if (near.s.type === 'city') {
      const aliveDefs = near.s.defendersRuntime.filter(e => e.alive), alive = aliveDefs.length + (near.s.kingRuntime?.alive ? 1 : 0);
      const ea = aliveDefs.filter(e => e.role === 'archer').length, ec = aliveDefs.filter(e => e.role === 'cavalry').length;
      nearText = `<br><br><b>${near.s.name}</b><br>${near.s.captured ? 'Ciudad conquistada' : `Defensores: ${alive} · Arq ${ea} · Cab ${ec}`}`;
    } else nearText = `<br><br><b>${near.s.name}</b><br>Aldea`;
  }
  orders.innerHTML = `<b>MANDO DEL EJÉRCITO</b><br>Grupo: ${roleLabels[selectedGroup]}<br>Formación: ${formationLabels[formation]}<br>Seguir pueblo: ${labels[followMode]}${nearText}<br><br><b>Teclas tácticas</b><br>Q grupo · V formación · T seguir · H mantener · F atacar · R retirada`;
  updateBattleButtons();
}

updateChunks(true);
if (!generatedSettlements.get(W.starterVillage.id)) ensureSettlement(W.starterVillage);
if (!generatedSettlements.get(W.starterCity.id)) ensureSettlement(W.starterCity);

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), .033);
  updatePlayer(dt); updateFollowers(dt); updateLivestock(dt); updateEnemies(dt); updateProjectiles(dt); updateWorldEvents(); updateUI(); renderer.render(scene, camera);
}
animate();
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5)); });
flash(`Wilderness 0.5 · Ejército, campamento, ganado y pastores.`, 5200);
