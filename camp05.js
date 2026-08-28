// ---------- Wilderness 0.5 · Campamento, ganado y pastores ----------
document.title = 'Wilderness — 0.5';

// Goats are introduced in 0.5 as a second herd species.
function decorateGoat(a) {
  if (!a || a._goatDecorated) return;
  a._goatDecorated = true;
  const h1 = addBox(a.mesh, .11, .42, .11, mats.wood, -.22, 1.78, .92, false);
  const h2 = addBox(a.mesh, .11, .42, .11, mats.wood, .22, 1.78, .92, false);
  h1.rotation.x = -.38; h2.rotation.x = -.38;
}

const starterGoats = [];
for (let i = 0; i < 2; i++) {
  const a = i * Math.PI;
  const g = makeAnimal('goat', W.starterVillage.x + Math.cos(a) * 10, W.starterVillage.z + Math.sin(a) * 10, true);
  g.sex = i === 0 ? 'female' : 'male';
  g.age = 999;
  decorateGoat(g);
  starterGoats.push(g);
}

// Initialize metadata for existing herd animals.
let animalSerial = 0;
function ensureAnimalMeta(a) {
  if (a.type !== 'sheep' && a.type !== 'goat') return;
  if (!a.sex) a.sex = (animalSerial++ % 3 === 0) ? 'male' : 'female';
  if (a.age == null) a.age = 999;
  if (a.baseScale == null) a.baseScale = 1;
  if (a.type === 'goat') decorateGoat(a);
}
livestock.forEach(ensureAnimalMeta);

const campState = {
  active: false,
  x: 0,
  z: 0,
  group: null,
  herdCondition: 72,
  birthProgress: 0,
  births: 0,
  maxShepherds: 3,
  restPulse: 0
};

function campDistance() {
  if (!campState.active) return Infinity;
  return Math.hypot(player.mesh.position.x - campState.x, player.mesh.position.z - campState.z);
}

function pastureQualityAt(x, z) {
  const b = W.biomeAt(x, z);
  return { oasis: 1, fertile: .92, steppe: .67, rocky: .34, desert: .22 }[b] || .3;
}

function livingShepherds() {
  return followers.filter(f => f.alive && f.duty === 'shepherd');
}

function herdAtCamp(radius = 30) {
  if (!campState.active) return [];
  return livestock.filter(a => a.alive && a.owned && (a.type === 'sheep' || a.type === 'goat') && Math.hypot(a.mesh.position.x - campState.x, a.mesh.position.z - campState.z) <= radius);
}

function createTent(group, x, z, scale = 1) {
  const y = W.groundY(x, z);
  addBox(group, .18, 3.5 * scale, .18, mats.wood, x, y + 1.75 * scale, z, false);
  const left = addBox(group, 3.4 * scale, .18, 5 * scale, mats.white, x - 1.15 * scale, y + 2.15 * scale, z, false);
  const right = addBox(group, 3.4 * scale, .18, 5 * scale, mats.adobe, x + 1.15 * scale, y + 2.15 * scale, z, false);
  left.rotation.z = .55; right.rotation.z = -.55;
}

function createCorral(group, x, z) {
  const y = W.groundY(x, z);
  const rX = 7.5, rZ = 5.5;
  for (let i = -3; i <= 3; i++) {
    const px = x + i * 2.4;
    for (const zz of [z - rZ, z + rZ]) {
      addBox(group, .18, 1.6, .18, mats.wood, px, W.groundY(px, zz) + .8, zz, false);
      addBox(group, 2.5, .14, .14, mats.wood, px, W.groundY(px, zz) + 1.1, zz, false);
    }
  }
  for (let i = -2; i <= 2; i++) {
    const pz = z + i * 2.4;
    for (const xx of [x - rX, x + rX]) {
      addBox(group, .18, 1.6, .18, mats.wood, xx, W.groundY(xx, pz) + .8, pz, false);
      addBox(group, .14, .14, 2.5, mats.wood, xx, W.groundY(xx, pz) + 1.1, pz, false);
    }
  }
  return { x, z, y };
}

function createCampVisual(x, z) {
  const group = new THREE.Group();
  group.name = 'player-camp';
  scene.add(group);
  createTent(group, x - 5, z + 2, 1);
  if (followers.filter(f => f.alive).length >= 6) createTent(group, x + 5, z + 3, .88);
  if (followers.filter(f => f.alive).length >= 14) createTent(group, x, z + 8, .78);

  const fy = W.groundY(x, z);
  addBox(group, 2.1, .28, 2.1, mats.dark, x, fy + .14, z, false);
  addBox(group, .42, .45, .42, mats.gold, x - .35, fy + .38, z, false);
  addBox(group, .42, .60, .42, mats.gold, x + .28, fy + .45, z + .1, false);
  const log1 = addBox(group, 2.1, .18, .18, mats.wood, x, fy + .35, z, false); log1.rotation.y = .7;
  const log2 = addBox(group, 2.1, .18, .18, mats.wood, x, fy + .35, z, false); log2.rotation.y = -.7;

  createCorral(group, x + 13, z + 3);
  for (let i = 0; i < 3; i++) addBox(group, 1.25, 1.05, 1.25, mats.wood, x - 7 + i * 1.5, W.groundY(x - 7 + i * 1.5, z - 4) + .53, z - 4, false);
  return group;
}

function establishCamp() {
  if (campState.active) {
    if (campDistance() > 16) {
      flash('Debes regresar al campamento para levantarlo.');
      return;
    }
    liftCamp();
    return;
  }
  if (mounted) {
    flash('Desmonta antes de establecer el campamento.');
    return;
  }
  campState.active = true;
  campState.x = player.mesh.position.x;
  campState.z = player.mesh.position.z;
  campState.group = createCampVisual(campState.x, campState.z);
  campState.birthProgress = 0;
  campState.herdCondition = Math.max(55, campState.herdCondition);
  flash('⛺ Campamento establecido. Deja aquí ganado o asigna pastores.', 3300);
  updateCampButtons();
}

function liftCamp() {
  if (!campState.active) return;
  livingShepherds().forEach(f => {
    f.duty = null;
    f.order = 'follow';
    f.holdPos = null;
  });
  if (campState.group) scene.remove(campState.group);
  campState.group = null;
  campState.active = false;
  campState.birthProgress = 0;
  flash('⛺ Campamento levantado. Los pastores vuelven al grupo.', 2800);
  updateCampButtons();
}

function setShepherdCount(target) {
  if (!campState.active) { flash('Primero establece un campamento.'); return; }
  target = Math.max(0, Math.min(campState.maxShepherds, target));
  let current = livingShepherds();
  if (target > current.length) {
    const candidates = followers
      .filter(f => f.alive && !f.duty)
      .sort((a, b) => (a.role === 'cavalry') - (b.role === 'cavalry'));
    while (current.length < target && candidates.length) {
      const f = candidates.shift();
      f.duty = 'shepherd';
      f.order = 'hold';
      f.holdPos = new THREE.Vector3(campState.x + 10 + current.length * 2, W.groundY(campState.x + 10, campState.z), campState.z - 2);
      current.push(f);
    }
  } else if (target < current.length) {
    while (current.length > target) {
      const f = current.pop();
      f.duty = null;
      f.order = 'follow';
      f.holdPos = null;
    }
  }
  flash(`Pastores asignados: ${livingShepherds().length}`);
  updateCampButtons();
}

function cycleShepherds() {
  const maxPossible = Math.min(campState.maxShepherds, followers.filter(f => f.alive).length);
  if (!campState.active) { flash('Primero establece un campamento.'); return; }
  const current = livingShepherds().length;
  setShepherdCount(current >= maxPossible ? 0 : current + 1);
}

selectedFollowers = function selectedFollowers05() {
  return followers.filter(f => f.alive && f.duty !== 'shepherd' && (selectedGroup === 'all' || f.role === selectedGroup));
};

const interact04 = interact;
interact = function interact05() {
  if (!mounted) {
    const goat = livestock.find(a => a.alive && a.type === 'goat' && !a.owned && dist(player.mesh, a.mesh) < 3.2);
    if (goat) {
      goat.owned = true;
      ensureAnimalMeta(goat);
      flash('La cabra ahora forma parte de tu ganado.');
      return;
    }
  }
  interact04();
};

nearestFriendlyFor = function nearestFriendlyFor05(enemy, radius) {
  let target = null, bd = radius;
  const candidates = [player, ...followers.filter(x => x.alive), ...livestock.filter(x => x.alive && x.owned && (x.type === 'sheep' || x.type === 'goat'))];
  for (const c of candidates) {
    const d = dist(enemy.mesh, c.mesh);
    if (d < bd) { target = c; bd = d; }
  }
  return target;
};

const updateLivestock04 = updateLivestock;
updateLivestock = function updateLivestock05(dt) {
  updateLivestock04(dt);
  livestock.forEach(ensureAnimalMeta);
  if (!campState.active) return;

  const herd = herdAtCamp(45);
  const shouldTravel = followMode === 'livestock' || followMode === 'all';
  if (!shouldTravel) {
    const shepherdBonus = livingShepherds().length > 0 ? 1 : .55;
    herd.forEach((a, i) => {
      const ring = 2.2 + Math.floor(i / 8) * 1.4;
      const angle = i * 2.399;
      const target = new THREE.Vector3(
        campState.x + 13 + Math.cos(angle) * Math.min(6.1, ring),
        0,
        campState.z + 3 + Math.sin(angle) * Math.min(4.3, ring)
      );
      moveToward(a, target, dt, a.speed * shepherdBonus, 1.35);
    });
  }
};

function spawnBaby(type) {
  const n = campState.births++;
  const angle = n * 2.17 + W.hash2i(n, campState.births, 4101) * .9;
  const x = campState.x + 13 + Math.cos(angle) * 3.2;
  const z = campState.z + 3 + Math.sin(angle) * 2.7;
  const baby = makeAnimal(type, x, z, true);
  baby.sex = W.hash2i(n, campState.births, 4102) > .48 ? 'female' : 'male';
  baby.age = 0;
  baby.baseScale = 1;
  baby.mesh.scale.setScalar(.62);
  if (type === 'goat') decorateGoat(baby);
  flash(`🐑 Nació ${type === 'goat' ? 'una cabra' : 'una oveja'} en el campamento.`, 2600);
}

function updateAnimalGrowth(dt) {
  livestock.forEach(a => {
    if (a.type !== 'sheep' && a.type !== 'goat') return;
    ensureAnimalMeta(a);
    if (a.age < 999) {
      a.age += dt;
      const s = Math.min(1, .62 + a.age / 110 * .38);
      a.mesh.scale.setScalar(s);
      if (a.age > 110) a.age = 999;
    }
  });
}

function updateCamp(dt) {
  updateAnimalGrowth(dt);
  if (!campState.active) return;

  const shepherds = livingShepherds();
  shepherds.forEach((f, i) => {
    const angle = i / Math.max(1, shepherds.length) * Math.PI * 2;
    const target = new THREE.Vector3(campState.x + 13 + Math.cos(angle) * 8.5, 0, campState.z + 3 + Math.sin(angle) * 6.7);
    moveToward(f, target, dt, 4.6, 1.4);
    f.order = 'hold';
    f.holdPos = target;
  });

  const quality = pastureQualityAt(campState.x, campState.z);
  const targetCondition = Math.min(100, 28 + quality * 64 + shepherds.length * 4);
  campState.herdCondition += (targetCondition - campState.herdCondition) * Math.min(1, dt * .025);

  const herd = herdAtCamp(32);
  const adults = herd.filter(a => (a.age == null || a.age > 105));
  const femaleSheep = adults.filter(a => a.type === 'sheep' && a.sex === 'female').length;
  const maleSheep = adults.filter(a => a.type === 'sheep' && a.sex === 'male').length;
  const femaleGoats = adults.filter(a => a.type === 'goat' && a.sex === 'female').length;
  const maleGoats = adults.filter(a => a.type === 'goat' && a.sex === 'male').length;

  const canBreed = shepherds.length > 0 && campState.herdCondition >= 58 && herd.length < 80;
  if (canBreed && ((femaleSheep && maleSheep) || (femaleGoats && maleGoats))) {
    const speed = quality * (1 + shepherds.length * .28) * (campState.herdCondition / 100);
    campState.birthProgress += dt * speed;
    const threshold = 68;
    if (campState.birthProgress >= threshold) {
      campState.birthProgress = 0;
      const sheepWeight = femaleSheep * (maleSheep ? 1 : 0);
      const goatWeight = femaleGoats * (maleGoats ? .78 : 0);
      const type = goatWeight > 0 && W.hash2i(campState.births, Math.floor(campState.x), 4201) < goatWeight / Math.max(.01, sheepWeight + goatWeight) ? 'goat' : 'sheep';
      spawnBaby(type);
    }
  } else {
    campState.birthProgress = Math.max(0, campState.birthProgress - dt * .15);
  }

  if (campDistance() < 7 && player.hp < player.maxHp) {
    const danger = enemies.some(e => e.alive && Math.hypot(e.mesh.position.x - campState.x, e.mesh.position.z - campState.z) < 16);
    if (!danger) player.hp = Math.min(player.maxHp, player.hp + dt * .22);
  }
}

function installCampUI() {
  const style = document.createElement('style');
  style.textContent = `
    #camp-controls{position:fixed;z-index:24;right:calc(14px + env(safe-area-inset-right,0px));top:calc(58px + env(safe-area-inset-top,0px));display:flex;gap:6px;pointer-events:auto}
    #camp-controls button{border:1.5px solid rgba(235,204,145,.78);background:rgba(40,28,17,.84);color:#f6e5bf;border-radius:8px;padding:7px 9px;font:800 10px ui-monospace,SFMono-Regular,Menlo,monospace;box-shadow:0 4px 12px rgba(0,0,0,.28)}
    #camp-controls button.active{background:rgba(132,82,43,.92);color:#fff6db}
    @media (pointer:coarse),(max-width:820px){#camp-controls{top:calc(52px + env(safe-area-inset-top,0px));right:calc(8px + env(safe-area-inset-right,0px));flex-direction:column}#camp-controls button{padding:6px 7px;font-size:8px}}
  `;
  document.head.appendChild(style);
  const box = document.createElement('div');
  box.id = 'camp-controls';
  box.innerHTML = '<button id="btn-camp">⛺ CAMPAMENTO</button><button id="btn-shepherd">🐑 PASTORES 0</button>';
  document.body.appendChild(box);
  document.getElementById('btn-camp').addEventListener('pointerdown', e => { e.preventDefault(); establishCamp(); });
  document.getElementById('btn-shepherd').addEventListener('pointerdown', e => { e.preventDefault(); cycleShepherds(); });
}

function updateCampButtons() {
  const cb = document.getElementById('btn-camp');
  const pb = document.getElementById('btn-shepherd');
  if (cb) {
    cb.textContent = campState.active ? '⛺ LEVANTAR' : '⛺ CAMPAMENTO';
    cb.classList.toggle('active', campState.active);
  }
  if (pb) pb.textContent = `🐑 PASTORES ${livingShepherds().length}`;
}

installCampUI();
updateCampButtons();

addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.code === 'KeyC') establishCamp();
  if (e.code === 'KeyP') cycleShepherds();
});

const campClock05 = new THREE.Clock();
function campLoop05() {
  requestAnimationFrame(campLoop05);
  const dt = Math.min(campClock05.getDelta(), .05);
  updateCamp(dt);
}
campLoop05();

const updateUI04 = updateUI;
updateUI = function updateUI05() {
  updateUI04();
  const living = followers.filter(f => f.alive);
  const sheep = livestock.filter(a => a.alive && a.owned && a.type === 'sheep').length;
  const goats = livestock.filter(a => a.alive && a.owned && a.type === 'goat').length;
  const shepherdCount = livingShepherds().length;
  const campText = campState.active ? `Sí · ${Math.round(campDistance())}m · condición ${Math.round(campState.herdCondition)}%` : 'No';

  stats.innerHTML = stats.innerHTML
    .replace('WILDERNESS · 0.4', 'WILDERNESS · 0.5')
    .replace(/Ganado: [^<]*/, `Ganado: ${sheep} ovejas · ${goats} cabras`)
    .replace('Montado:', `Pastores: ${shepherdCount}<br>Campamento: ${campText}<br>Montado:`);

  if (campState.active) {
    orders.innerHTML += `<br><br><b>CAMPAMENTO</b><br>Ganado cercano: ${herdAtCamp(32).length}<br>Pasto: ${Math.round(pastureQualityAt(campState.x, campState.z) * 100)}%<br>Condición del rebaño: ${Math.round(campState.herdCondition)}%<br>Próxima cría: ${Math.round(Math.min(100, campState.birthProgress / 68 * 100))}%`;
  }
  orders.innerHTML = orders.innerHTML.replace('<b>Teclas tácticas</b>', '<b>Vida nómada</b><br>C campamento · P pastores<br><br><b>Teclas tácticas</b>');
  updateCampButtons();
};

flash('Wilderness 0.5 · Establece un campamento, asigna pastores y deja que tu ganado crezca con el tiempo.', 5600);