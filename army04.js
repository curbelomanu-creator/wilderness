// ---------- órdenes ----------
function setFollowMode(mode) {
  followMode = mode;
  const text = { people: 'PERSONAS síganme', livestock: 'GANADO sígame', all: 'TODOS síganme', none: 'NADIE me siga' }[mode];
  flash(`Orden: ${text}`);
  document.querySelectorAll('.order-btn').forEach(b => b.classList.toggle('active', b.dataset.follow === mode));
}
function selectedFollowers() {
  return followers.filter(f => f.alive && (selectedGroup === 'all' || f.role === selectedGroup));
}
function issueOrder(order) {
  const selected = selectedFollowers();
  if (!selected.length) { flash(`No tienes unidades en ${roleLabels[selectedGroup]}.`); return; }
  selected.forEach(f => {
    f.order = order;
    if (order === 'hold') f.holdPos = f.mesh.position.clone();
    if (order === 'retreat') f.retreat = 3.2;
  });
  flash(`${roleLabels[selectedGroup]}: ${orderLabels[order]}`);
}
function cycleGroup() {
  const list = ['all', 'infantry', 'archer', 'cavalry'];
  selectedGroup = list[(list.indexOf(selectedGroup) + 1) % list.length];
  flash(`Grupo seleccionado: ${roleLabels[selectedGroup]}`);
  updateBattleButtons();
}
function cycleFormation() {
  const list = ['line', 'column', 'wedge'];
  formation = list[(list.indexOf(formation) + 1) % list.length];
  flash(`Formación: ${formationLabels[formation]}`);
  updateBattleButtons();
}

const keys = {};
addEventListener('keydown', e => {
  keys[e.code] = true; if (e.repeat) return;
  if (e.code === 'Digit1') setFollowMode('people');
  if (e.code === 'Digit2') setFollowMode('livestock');
  if (e.code === 'Digit3') setFollowMode('all');
  if (e.code === 'Digit4') setFollowMode('none');
  if (e.code === 'KeyE') interact();
  if (e.code === 'KeyF') playerAttack();
  if (e.code === 'KeyR') issueOrder('retreat');
  if (e.code === 'KeyH') issueOrder('hold');
  if (e.code === 'KeyT') issueOrder('follow');
  if (e.code === 'KeyQ') cycleGroup();
  if (e.code === 'KeyV') cycleFormation();
});
addEventListener('keyup', e => keys[e.code] = false);

const joyZone = document.getElementById('joystick-zone'), joyStick = document.getElementById('joystick-stick');
let joyPointer = null, joyCenter = { x: 0, y: 0 };
function resetJoy() { mobileMove.x = 0; mobileMove.z = 0; joyPointer = null; if (joyStick) joyStick.style.transform = 'translate(0px,0px)'; }
if (joyZone) {
  joyZone.addEventListener('pointerdown', e => { joyPointer = e.pointerId; joyZone.setPointerCapture(e.pointerId); const r = joyZone.getBoundingClientRect(); joyCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; e.preventDefault(); });
  joyZone.addEventListener('pointermove', e => {
    if (e.pointerId !== joyPointer) return;
    const max = 39, dx = e.clientX - joyCenter.x, dy = e.clientY - joyCenter.y, len = Math.hypot(dx, dy) || 1, scale = Math.min(1, max / len);
    const px = dx * scale, py = dy * scale; mobileMove.x = px / max; mobileMove.z = py / max; joyStick.style.transform = `translate(${px}px,${py}px)`; e.preventDefault();
  });
  joyZone.addEventListener('pointerup', resetJoy); joyZone.addEventListener('pointercancel', resetJoy);
}
document.querySelectorAll('.order-btn').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); setFollowMode(b.dataset.follow); }));
const attackBtn = document.getElementById('btn-attack'), interactBtn = document.getElementById('btn-interact'), retreatBtn = document.getElementById('btn-retreat'), runBtn = document.getElementById('btn-run');
attackBtn?.addEventListener('pointerdown', e => { e.preventDefault(); playerAttack(); });
interactBtn?.addEventListener('pointerdown', e => { e.preventDefault(); interact(); });
retreatBtn?.addEventListener('pointerdown', e => { e.preventDefault(); issueOrder('retreat'); });
runBtn?.addEventListener('pointerdown', e => { e.preventDefault(); mobileMove.run = true; runBtn.classList.add('active'); });
const stopRun = () => { mobileMove.run = false; runBtn?.classList.remove('active'); };
runBtn?.addEventListener('pointerup', stopRun); runBtn?.addEventListener('pointercancel', stopRun); runBtn?.addEventListener('pointerleave', stopRun);
document.getElementById('btn-group')?.addEventListener('pointerdown', e => { e.preventDefault(); cycleGroup(); });
document.getElementById('btn-formation')?.addEventListener('pointerdown', e => { e.preventDefault(); cycleFormation(); });
document.getElementById('btn-follow-army')?.addEventListener('pointerdown', e => { e.preventDefault(); issueOrder('follow'); });
document.getElementById('btn-hold')?.addEventListener('pointerdown', e => { e.preventDefault(); issueOrder('hold'); });

function updateBattleButtons() {
  const gb = document.getElementById('btn-group'), fb = document.getElementById('btn-formation');
  if (gb) gb.textContent = `GRUPO ${roleLabels[selectedGroup].replace('INFANTERÍA','INF').replace('ARQUEROS','ARQ').replace('CABALLERÍA','CAB')}`;
  if (fb) fb.textContent = `FORMA ${formationLabels[formation]}`;
}
updateBattleButtons();

function dist(a, b) { return a.position.distanceTo(b.position); }
function nearestEntity(arr, maxD) {
  let best = null, bestD = maxD;
  for (const e of arr) { if (!e.alive) continue; const d = dist(player.mesh, e.mesh); if (d < bestD) { best = e; bestD = d; } }
  return best;
}

function interact() {
  if (mounted) {
    mounted = false;
    if (mount) { mount.mesh.position.copy(player.mesh.position).add(new THREE.Vector3(1.8, 0, 0)); mount.mesh.position.y = W.groundY(mount.mesh.position.x, mount.mesh.position.z); }
    mount = null; flash('Desmontaste'); return;
  }
  const ride = livestock.find(a => a.alive && (a.type === 'horse' || a.type === 'camel') && dist(player.mesh, a.mesh) < 3.4);
  if (ride) { mounted = true; mount = ride; flash(ride.type === 'camel' ? 'Montaste el camello' : 'Montaste el caballo'); return; }
  const animal = livestock.find(a => a.alive && a.type === 'sheep' && !a.owned && dist(player.mesh, a.mesh) < 3.2);
  if (animal) { animal.owned = true; flash('La oveja ahora forma parte de tu ganado'); return; }

  const c = nearestEntity(civilians.filter(x => x !== player && !x.recruited), 3.6);
  if (c) {
    if (followers.filter(f => f.alive).length >= MAX_FOLLOWERS) { flash(`Tu fuerza activa alcanzó el límite del prototipo: ${MAX_FOLLOWERS}.`); return; }
    if (c.home?.type === 'city' && !c.home.captured) { flash('Este habitante no se unirá mientras su ciudad siga bajo otro rey.'); return; }
    c.recruited = true; c.civilian = false; c.order = 'follow'; equipRole(c, c.potentialRole || 'infantry'); followers.push(c);
    flash(`Reclutaste a un ${roleLabels[c.role].toLowerCase().replace('infantería','soldado de infantería').replace('arqueros','arquero').replace('caballería','jinete')}.`);
    return;
  }
  const cave = caves.find(ca => Math.hypot(player.mesh.position.x - ca.x, player.mesh.position.z - ca.z) < 5);
  if (cave) { cave.discovered = true; flash('🕯️ Entrada de cueva descubierta. El interior llegará en una próxima versión.', 3200); return; }
  flash('No hay nada con qué interactuar');
}

function playerAttack() {
  issueOrder('attack');
  const target = nearestEntity(enemies, mounted ? 4.2 : 3.7);
  if (!target) return;
  damage(target, mounted ? 3.2 : 2.6);
}

function damage(e, amount) {
  if (!e || !e.alive) return;
  e.hp -= amount;
  if (e.hp <= 0) {
    e.alive = false; e.mesh.rotation.z = Math.PI / 2;
    setTimeout(() => scene.remove(e.mesh), 2600);
  }
}

function fireArrow(shooter, target, friendly) {
  if (!shooter.alive || !target?.alive) return;
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(.08, .08, .95), mats.arrow);
  const start = shooter.mesh.position.clone().add(new THREE.Vector3(0, shooter.role === 'cavalry' ? 3.1 : 2.2, 0));
  const end = target.mesh.position.clone().add(new THREE.Vector3(0, 1.5, 0));
  mesh.position.copy(start); mesh.lookAt(end); scene.add(mesh);
  const d = start.distanceTo(end);
  projectiles.push({ mesh, start, target, elapsed: 0, duration: Math.max(.18, d / 22), damage: friendly ? 1.15 : 1, friendly });
}
function updateProjectiles(dt) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i]; p.elapsed += dt;
    if (!p.target?.alive) { scene.remove(p.mesh); projectiles.splice(i, 1); continue; }
    const t = Math.min(1, p.elapsed / p.duration);
    const end = p.target.mesh.position.clone().add(new THREE.Vector3(0, 1.4, 0));
    p.mesh.position.lerpVectors(p.start, end, t); p.mesh.lookAt(end);
    if (t >= 1) { damage(p.target, p.damage); if (p.target === player && player.hp <= 0) respawn(); scene.remove(p.mesh); projectiles.splice(i, 1); }
  }
}

const vTmp = new THREE.Vector3();
function moveToward(entity, target, dt, speed, stop = 2) {
  vTmp.subVectors(target, entity.mesh.position); vTmp.y = 0; const d = vTmp.length();
  if (d > stop) { vTmp.normalize(); entity.mesh.position.addScaledVector(vTmp, speed * dt); entity.mesh.rotation.y = Math.atan2(vTmp.x, vTmp.z); entity.mesh.position.y = W.groundY(entity.mesh.position.x, entity.mesh.position.z); }
  return d;
}
function moveAway(entity, target, dt, speed) {
  vTmp.subVectors(entity.mesh.position, target); vTmp.y = 0; if (vTmp.lengthSq() < .01) vTmp.set(1,0,0); vTmp.normalize();
  entity.mesh.position.addScaledVector(vTmp, speed * dt); entity.mesh.position.y = W.groundY(entity.mesh.position.x, entity.mesh.position.z);
}
function nearestEnemyFor(entity, radius) {
  let best = null, bd = radius;
  for (const e of enemies) { if (!e.alive) continue; const d = dist(entity.mesh, e.mesh); if (d < bd) { best = e; bd = d; } }
  return best;
}

function formationOffset(f, living) {
  const forward = new THREE.Vector3(Math.sin(player.mesh.rotation.y), 0, Math.cos(player.mesh.rotation.y));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const sameRole = living.filter(x => x.role === f.role);
  const i = sameRole.indexOf(f), n = sameRole.length;
  let lateral = 0, behind = 4;

  if (formation === 'line') {
    if (f.role === 'infantry') { lateral = (i - (n - 1) / 2) * 1.85; behind = 4 + Math.floor(i / 12) * 2; }
    else if (f.role === 'archer') { lateral = (i - (n - 1) / 2) * 1.9; behind = 8 + Math.floor(i / 10) * 2; }
    else { lateral = (i % 2 ? 1 : -1) * (7 + Math.floor(i / 2) * 1.7); behind = 5 + (i % 3) * 1.2; }
  } else if (formation === 'column') {
    const cols = f.role === 'cavalry' ? 2 : 4;
    const row = Math.floor(i / cols), col = i % cols;
    lateral = (col - (cols - 1) / 2) * 2;
    behind = 4 + row * 2.25 + (f.role === 'archer' ? 4 : f.role === 'cavalry' ? 1 : 0);
  } else {
    if (f.role === 'infantry') { const row = Math.floor(i / 2); lateral = (i % 2 ? 1 : -1) * (1 + row * 1.3); behind = 4 + row * 1.35; }
    else if (f.role === 'archer') { lateral = (i - (n - 1) / 2) * 1.9; behind = 10 + Math.floor(i / 10) * 2; }
    else { lateral = (i % 2 ? 1 : -1) * (8 + Math.floor(i / 2) * 1.6); behind = 5 + Math.floor(i / 4) * 2; }
  }
  return player.mesh.position.clone().addScaledVector(right, lateral).addScaledVector(forward, -behind);
}

function applySeparation(f, living, dt) {
  const push = new THREE.Vector3();
  for (const other of living) {
    if (other === f || !other.alive) continue;
    const dx = f.mesh.position.x - other.mesh.position.x, dz = f.mesh.position.z - other.mesh.position.z;
    const d2 = dx * dx + dz * dz;
    if (d2 > .02 && d2 < 2.1) { const inv = 1 / Math.sqrt(d2); push.x += dx * inv; push.z += dz * inv; }
  }
  if (push.lengthSq() > .01) { push.normalize(); f.mesh.position.addScaledVector(push, 1.25 * dt); }
}

function updateFollowers(dt) {
  const living = followers.filter(f => f.alive);
  living.forEach(f => {
    f.cooldown = Math.max(0, (f.cooldown || 0) - dt);
    if (f.retreat > 0 || f.order === 'retreat') {
      f.retreat = Math.max(0, (f.retreat || 0) - dt);
      moveToward(f, player.mesh.position, dt, f.role === 'cavalry' ? 7 : 5.4, 5 + (living.indexOf(f) % 4));
      if (f.retreat <= 0) f.order = 'follow';
      applySeparation(f, living, dt); return;
    }

    const detect = f.order === 'attack' ? (f.role === 'archer' ? 58 : 45) : f.order === 'hold' ? (f.role === 'archer' ? 20 : 10) : (f.role === 'archer' ? 17 : 8);
    const target = nearestEnemyFor(f, detect);
    if (target) {
      const d = dist(f.mesh, target.mesh);
      if (f.role === 'archer') {
        if (d < 6) moveAway(f, target.mesh.position, dt, 4.6);
        else if (f.order === 'attack' && d > 16) moveToward(f, target.mesh.position, dt, 4.4, 14);
        if (d < 21 && f.cooldown <= 0) { fireArrow(f, target, true); f.cooldown = 1.35 + (living.indexOf(f) % 4) * .06; }
      } else {
        const speed = f.role === 'cavalry' ? 7 : 4.7;
        const d2 = moveToward(f, target.mesh.position, dt, speed, 1.65);
        if (d2 < 2 && f.cooldown <= 0) { damage(target, f.role === 'cavalry' ? 1.8 : 1.25); f.cooldown = f.role === 'cavalry' ? .65 : .82; }
      }
      applySeparation(f, living, dt); return;
    }

    if (f.order === 'hold' && f.holdPos) moveToward(f, f.holdPos, dt, 4.4, .8);
    else if (f.order === 'follow' && (followMode === 'people' || followMode === 'all')) moveToward(f, formationOffset(f, living), dt, f.role === 'cavalry' ? 7 : 4.9, 1.0);
    applySeparation(f, living, dt);
  });
}

function updateLivestock(dt) {
  const owned = livestock.filter(a => a.alive && a.owned && a !== mount);
  livestock.forEach(a => {
    if (!a.alive || a === mount) return;
    a.wander += dt * (W.randAt(Math.floor(a.mesh.position.x), Math.floor(a.mesh.position.z), 2401) - .48) * .12;
    const shouldFollow = a.owned && (followMode === 'livestock' || followMode === 'all');
    if (shouldFollow) {
      const oi = owned.indexOf(a), angle = oi * .82;
      const target = player.mesh.position.clone().add(new THREE.Vector3(Math.cos(angle) * 5.2, 0, Math.sin(angle) * 5.2 + 5));
      moveToward(a, target, dt, a.speed, 2.4);
    } else if (a.type !== 'horse' && a.type !== 'camel') {
      a.mesh.position.x += Math.sin(a.wander) * dt * .28; a.mesh.position.z += Math.cos(a.wander) * dt * .28; a.mesh.position.y = W.groundY(a.mesh.position.x, a.mesh.position.z);
    }
  });
}

function nearestFriendlyFor(enemy, radius) {
  let target = null, bd = radius;
  const candidates = [player, ...followers.filter(x => x.alive), ...livestock.filter(x => x.alive && x.owned && x.type === 'sheep')];
  for (const c of candidates) { const d = dist(enemy.mesh, c.mesh); if (d < bd) { target = c; bd = d; } }
  return target;
}

function updateEnemies(dt) {
  for (const e of enemies) {
    if (!e.alive) continue;
    e.cooldown = Math.max(0, (e.cooldown || 0) - dt);
    const isLion = e.type === 'lion', home = e.home;
    const playerToHome = home ? Math.hypot(player.mesh.position.x - home.x, player.mesh.position.z - home.z) : 0;
    const radius = isLion ? 12 : (playerToHome < (home?.radius || 25) + 24 ? (e.role === 'archer' ? 25 : 16) : 7);
    const target = nearestFriendlyFor(e, radius);
    if (target) {
      const d = dist(e.mesh, target.mesh);
      if (isLion) {
        const d2 = moveToward(e, target.mesh.position, dt, e.speed, 1.6);
        if (d2 < 1.9 && e.cooldown <= 0) { damage(target, 2); e.cooldown = 1.1; if (target === player && player.hp <= 0) respawn(); }
      } else if (e.role === 'archer') {
        if (d < 6) moveAway(e, target.mesh.position, dt, 4.2); else if (d > 18) moveToward(e, target.mesh.position, dt, 3.7, 16);
        if (d < 24 && e.cooldown <= 0) { fireArrow(e, target, false); e.cooldown = 1.55; }
      } else {
        const speed = e.role === 'cavalry' ? 6.8 : e.speed || 4;
        const d2 = moveToward(e, target.mesh.position, dt, speed, 1.6);
        if (d2 < 1.9 && e.cooldown <= 0) { damage(target, e.king ? 1.8 : e.role === 'cavalry' ? 1.6 : 1); e.cooldown = e.role === 'cavalry' ? .7 : 1.2; if (target === player && player.hp <= 0) respawn(); }
      }
    } else if (home && Math.hypot(e.mesh.position.x - home.x, e.mesh.position.z - home.z) > (home.radius || 20) * .88) {
      moveToward(e, new THREE.Vector3(home.x, 0, home.z), dt, e.role === 'cavalry' ? 6 : 4, 5);
    } else if (isLion) {
      e.wander = (e.wander || 0) + dt * .25; e.mesh.position.x += Math.sin(e.wander) * dt * .32; e.mesh.position.z += Math.cos(e.wander) * dt * .32; e.mesh.position.y = W.groundY(e.mesh.position.x, e.mesh.position.z);
    }
  }
}

function respawn() {
  player.hp = player.maxHp; player.mesh.position.set(0, W.groundY(0, 0), 0); mounted = false; mount = null;
  followers.filter(f => f.alive).forEach(f => { f.order = 'follow'; f.retreat = 0; });
  flash('Has caído. Regresas al punto inicial.', 3000);
}
