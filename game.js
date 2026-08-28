(() => {
  const THREE = window.THREE;
  const W = window.WildernessWorld;
  if (!THREE || !W) throw new Error('Wilderness: Three.js o world.js no cargaron.');

  const isMobile = matchMedia('(pointer: coarse)').matches || innerWidth <= 820;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xb8d0d1);
  scene.fog = new THREE.FogExp2(0xc7b88f, isMobile ? 0.0062 : 0.0047);

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 900);
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.prepend(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffe7b9, 0x62513d, 1.65));
  const sun = new THREE.DirectionalLight(0xffefc5, 2.15);
  sun.position.set(-60, 90, 35);
  sun.castShadow = !isMobile;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -90; sun.shadow.camera.right = 90;
  sun.shadow.camera.top = 90; sun.shadow.camera.bottom = -90;
  scene.add(sun);

  const mat = color => new THREE.MeshLambertMaterial({ color, flatShading: true });
  const mats = {
    sand: mat(0xc49a5a), sand2: mat(0xd7b06c), rock: mat(0x7c6855),
    steppe: mat(0x9a9557), fertile: mat(0x718044), oasis: mat(0x688443),
    road: mat(0x9c7549), adobe: mat(0xb77d4d), adobe2: mat(0x8c5d3d),
    wood: mat(0x5b3823), white: mat(0xdfcfaa), black: mat(0x2e2720),
    blue: mat(0x365f76), gold: mat(0xc7a13e), enemy: mat(0x73322d),
    lion: mat(0xb77a2e), mane: mat(0x75471f), sheep: mat(0xe4dbc5),
    horse: mat(0x6b4631), camel: mat(0xa87645), dark: mat(0x14110e),
    leaf: mat(0x60763c), skin: mat(0xa97854)
  };

  const stats = document.getElementById('stats');
  const orders = document.getElementById('orders');
  const msg = document.getElementById('message');
  let msgTimer = 0;
  function flash(text, ms = 1800) {
    msg.textContent = text;
    msg.style.opacity = 1;
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => msg.style.opacity = 0, ms);
  }

  function addBox(parent, w, h, d, material, x, y, z, cast = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    m.castShadow = cast && !isMobile;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  function worldBox(w, h, d, material, x, y, z, cast = true) {
    return addBox(scene, w, h, d, material, x, y, z, cast);
  }

  function makePalm(parent, x, z, s = 1) {
    const y = W.groundY(x, z);
    addBox(parent, .58, 4.8 * s, .58, mats.wood, x, y + 2.4 * s, z, false);
    for (let i = 0; i < 5; i++) {
      const leaf = addBox(parent, .28, .18, 3 * s, mats.leaf, x, y + 4.95 * s, z, false);
      leaf.rotation.y = i * Math.PI / 2.5;
    }
  }

  function makeRock(parent, x, z, s = 1) {
    const y = W.groundY(x, z);
    const r = addBox(parent, 2.2 * s, 1.5 * s, 1.8 * s, mats.rock, x, y + .72 * s, z, false);
    r.rotation.y = W.randAt(x, z, 1201) * Math.PI;
  }

  function makeShrub(parent, x, z, s = 1) {
    const y = W.groundY(x, z);
    addBox(parent, 1.2 * s, .7 * s, 1.05 * s, mats.leaf, x, y + .34 * s, z, false);
  }

  const tileGeo = new THREE.BoxGeometry(W.TILE, .72, W.TILE);
  const chunks = new Map();
  const generatedSettlements = new Map();
  const generatedCaves = new Map();
  const wildlifeChunks = new Set();
  const chunkRadius = isMobile ? 2 : 3;
  const dummy = new THREE.Object3D();

  function tileKey(x, z) {
    if (W.roadAt(x, z)) return 'road';
    const biome = W.biomeAt(x, z);
    if (biome === 'oasis') return 'oasis';
    if (biome === 'rocky') return 'rock';
    if (biome === 'fertile') return 'fertile';
    if (biome === 'steppe') return 'steppe';
    return W.randAt(x, z, 1301) > .78 ? 'sand2' : 'sand';
  }

  function buildChunk(cx, cz) {
    const key = `${cx},${cz}`;
    if (chunks.has(key)) return;
    const group = new THREE.Group();
    group.name = `chunk-${key}`;
    const buckets = { sand: [], sand2: [], rock: [], steppe: [], fertile: [], oasis: [], road: [] };
    const minX = cx * W.CHUNK_SIZE, minZ = cz * W.CHUNK_SIZE;
    for (let lx = W.TILE / 2; lx < W.CHUNK_SIZE; lx += W.TILE) {
      for (let lz = W.TILE / 2; lz < W.CHUNK_SIZE; lz += W.TILE) {
        const x = minX + lx, z = minZ + lz;
        buckets[tileKey(x, z)].push({ x, z, y: W.groundY(x, z) });
      }
    }
    for (const [kind, points] of Object.entries(buckets)) {
      if (!points.length) continue;
      const im = new THREE.InstancedMesh(tileGeo, mats[kind], points.length);
      im.receiveShadow = true;
      points.forEach((p, i) => {
        dummy.position.set(p.x, p.y - .36, p.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        im.setMatrixAt(i, dummy.matrix);
      });
      im.instanceMatrix.needsUpdate = true;
      group.add(im);
    }

    const decoCount = isMobile ? 3 : 6;
    for (let i = 0; i < decoCount; i++) {
      const x = minX + 5 + W.hash2i(cx, cz, 1400 + i * 3) * (W.CHUNK_SIZE - 10);
      const z = minZ + 5 + W.hash2i(cx, cz, 1401 + i * 3) * (W.CHUNK_SIZE - 10);
      if (W.roadAt(x, z)) continue;
      const biome = W.biomeAt(x, z);
      const s = .7 + W.hash2i(cx, cz, 1402 + i * 3) * .65;
      if (biome === 'oasis') makePalm(group, x, z, s);
      else if (biome === 'rocky') makeRock(group, x, z, s);
      else if (biome === 'fertile' || biome === 'steppe') makeShrub(group, x, z, s);
      else if (W.hash2i(cx, cz, 1450 + i) > .72) makeRock(group, x, z, s * .65);
    }

    scene.add(group);
    chunks.set(key, group);

    const defs = W.settlementsNearBounds(minX, minX + W.CHUNK_SIZE, minZ, minZ + W.CHUNK_SIZE, 8);
    defs.forEach(ensureSettlement);

    const caveDef = W.caveDefForChunk(cx, cz);
    if (caveDef) ensureCave(caveDef);

    spawnChunkWildlife(cx, cz);
  }

  function updateChunks(force = false) {
    const cx = Math.floor(player.mesh.position.x / W.CHUNK_SIZE);
    const cz = Math.floor(player.mesh.position.z / W.CHUNK_SIZE);
    if (!force && cx === updateChunks.lastX && cz === updateChunks.lastZ) return;
    updateChunks.lastX = cx; updateChunks.lastZ = cz;

    for (let dx = -chunkRadius; dx <= chunkRadius; dx++) {
      for (let dz = -chunkRadius; dz <= chunkRadius; dz++) buildChunk(cx + dx, cz + dz);
    }

    for (const [key, group] of [...chunks]) {
      const [gx, gz] = key.split(',').map(Number);
      if (Math.abs(gx - cx) > chunkRadius + 1 || Math.abs(gz - cz) > chunkRadius + 1) {
        scene.remove(group);
        chunks.delete(key);
      }
    }
  }

  const followers = [];
  const livestock = [];
  const enemies = [];
  const civilians = [];
  const cities = [];
  const caves = [];
  let followMode = 'people';
  let mounted = false, mount = null;
  let attackOrder = 0;
  const mobileMove = { x: 0, z: 0, run: false };

  function makeHumanoid({ x = 0, z = 0, enemy = false, civilian = false, king = false, home = null } = {}) {
    const g = new THREE.Group();
    const bodyMat = king ? mats.gold : enemy ? mats.enemy : civilian ? mats.white : mats.blue;
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.7, .7), bodyMat);
    body.position.y = 1.6; body.castShadow = !isMobile; g.add(body);
    const head = new THREE.Mesh(new THREE.BoxGeometry(.78, .78, .78), mats.skin);
    head.position.y = 2.85; head.castShadow = !isMobile; g.add(head);
    for (const dx of [-.26, .26]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(.28, 1, .28), mats.black);
      leg.position.set(dx, .55, 0); leg.castShadow = !isMobile; g.add(leg);
    }
    if (enemy || king) {
      const spear = new THREE.Mesh(new THREE.BoxGeometry(.12, 2.8, .12), mats.wood);
      spear.position.set(.72, 1.7, 0); spear.rotation.z = .1; g.add(spear);
    }
    g.position.set(x, W.groundY(x, z), z);
    scene.add(g);
    const e = {
      mesh: g, hp: king ? 10 : 4, maxHp: king ? 10 : 4, alive: true,
      enemy, civilian, king, recruited: false, speed: king ? 3.5 : enemy ? 3.9 : 4.3,
      cooldown: 0, home, retreat: 0
    };
    if (enemy || king) enemies.push(e); else civilians.push(e);
    return e;
  }

  function animalMaterial(type) {
    if (type === 'lion') return mats.lion;
    if (type === 'horse') return mats.horse;
    if (type === 'camel') return mats.camel;
    return mats.sheep;
  }

  function makeAnimal(type, x, z, owned = false) {
    const g = new THREE.Group();
    const material = animalMaterial(type);
    const long = type === 'horse' || type === 'camel';
    const body = new THREE.Mesh(new THREE.BoxGeometry(long ? 1.35 : 1.15, type === 'camel' ? 1.05 : .8, long ? 2.25 : 1.45), material);
    body.position.y = type === 'camel' ? 1.18 : 1; body.castShadow = !isMobile; g.add(body);
    const head = new THREE.Mesh(new THREE.BoxGeometry(.7, .7, .7), material);
    head.position.set(0, type === 'camel' ? 1.75 : 1.35, long ? 1.25 : .9); head.castShadow = !isMobile; g.add(head);
    for (const dx of [-.38, .38]) for (const dz of [-.65, .65]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(.18, type === 'camel' ? 1.05 : .8, .18), type === 'sheep' ? mats.black : material);
      leg.position.set(dx, type === 'camel' ? .52 : .4, dz); leg.castShadow = !isMobile; g.add(leg);
    }
    if (type === 'lion') {
      const mane = new THREE.Mesh(new THREE.BoxGeometry(.96, .96, .52), mats.mane);
      mane.position.set(0, 1.4, .72); g.add(mane);
    }
    if (type === 'camel') {
      const hump = new THREE.Mesh(new THREE.BoxGeometry(.85, .65, .85), material);
      hump.position.set(0, 1.85, -.15); g.add(hump);
    }
    g.position.set(x, W.groundY(x, z), z);
    scene.add(g);
    const a = {
      mesh: g, type, hp: type === 'lion' ? 7 : 5, maxHp: type === 'lion' ? 7 : 5,
      alive: true, speed: type === 'lion' ? 5.2 : type === 'horse' ? 7.2 : type === 'camel' ? 6 : 3,
      wander: W.randAt(x, z, 1601) * Math.PI * 2, cooldown: 0, owned
    };
    if (type === 'lion') enemies.push(a); else livestock.push(a);
    return a;
  }

  const player = makeHumanoid({ x: 0, z: 0 });
  civilians.splice(civilians.indexOf(player), 1);
  player.hp = 12; player.maxHp = 12;
  player.mesh.children[0].material = mats.blue;
  player.mesh.scale.set(1.08, 1.08, 1.08);

  function seedRand(def, salt) {
    return W.hash2i(Math.floor(def.x), Math.floor(def.z), salt);
  }

  function ensureSettlement(def) {
    if (generatedSettlements.has(def.id)) return generatedSettlements.get(def.id);
    const runtime = def.type === 'city' ? buildCity(def) : buildVillage(def);
    generatedSettlements.set(def.id, runtime);
    return runtime;
  }

  function buildVillage(def) {
    const group = new THREE.Group();
    group.name = `village-${def.name}`;
    scene.add(group);
    const count = 5 + Math.floor(seedRand(def, 1701) * 4);
    const radius = 12 + count;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + seedRand(def, 1710 + i) * .45;
      const r = 5 + seedRand(def, 1740 + i) * radius;
      const x = def.x + Math.cos(a) * r, z = def.z + Math.sin(a) * r;
      const y = W.groundY(x, z);
      addBox(group, 5.5, 3.1, 4.7, mats.adobe, x, y + 1.55, z, false);
      const beam = addBox(group, 2.3, .24, 5, mats.wood, x, y + 3.25, z, false);
      beam.rotation.y = seedRand(def, 1770 + i) * Math.PI;
    }
    worldBox(1.8, .45, 1.8, mats.dark, def.x, W.groundY(def.x, def.z) + .22, def.z, false);
    for (let i = 0; i < Math.min(7, Math.ceil(def.population / 6)); i++) {
      makeHumanoid({
        x: def.x + (seedRand(def, 1800 + i * 2) - .5) * 24,
        z: def.z + (seedRand(def, 1801 + i * 2) - .5) * 24,
        civilian: true
      });
    }
    return { ...def, group, captured: false, discovered: false, defendersRuntime: [], kingRuntime: null };
  }

  function buildCity(def) {
    const group = new THREE.Group();
    group.name = `city-${def.name}`;
    scene.add(group);
    const r = 19 + def.tier * 4;
    const wallH = 4.2 + def.tier * .45;
    const step = 4;
    for (let x = -r; x <= r; x += step) {
      addBox(group, step + .2, wallH, 2, mats.adobe2, def.x + x, W.groundY(def.x + x, def.z - r) + wallH / 2, def.z - r, false);
      if (Math.abs(x) > 4.5) addBox(group, step + .2, wallH, 2, mats.adobe2, def.x + x, W.groundY(def.x + x, def.z + r) + wallH / 2, def.z + r, false);
    }
    for (let z = -r + step; z <= r - step; z += step) {
      addBox(group, 2, wallH, step + .2, mats.adobe2, def.x - r, W.groundY(def.x - r, def.z + z) + wallH / 2, def.z + z, false);
      addBox(group, 2, wallH, step + .2, mats.adobe2, def.x + r, W.groundY(def.x + r, def.z + z) + wallH / 2, def.z + z, false);
    }
    for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r]]) {
      addBox(group, 4.3, wallH + 2.7, 4.3, mats.adobe2, def.x + dx, W.groundY(def.x + dx, def.z + dz) + (wallH + 2.7) / 2, def.z + dz, false);
    }

    const houseCount = 7 + def.tier * 4;
    for (let i = 0; i < houseCount; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      const x = def.x - r + 7 + col * ((2 * r - 14) / 3) + (seedRand(def, 1900 + i) - .5) * 2.2;
      const z = def.z - r + 8 + row * 8.2;
      if (z > def.z + r - 8 || Math.abs(x - def.x) < 5 && z < def.z - 3) continue;
      const y = W.groundY(x, z);
      addBox(group, 5.6, 3.1, 4.8, i % 3 === 0 ? mats.adobe2 : mats.adobe, x, y + 1.55, z, false);
    }

    const py = W.groundY(def.x, def.z - 7);
    addBox(group, 11 + def.tier * 1.5, 4.8 + def.tier * .5, 8, mats.adobe2, def.x, py + 2.4 + def.tier * .25, def.z - 7, false);
    addBox(group, 2.2, 1.1, 1, mats.gold, def.x, py + 5.15 + def.tier * .5, def.z - 2.8, false);

    for (let i = 0; i < Math.min(12, Math.ceil(def.population / 18)); i++) {
      makeHumanoid({
        x: def.x + (seedRand(def, 2000 + i * 2) - .5) * (r * 1.25),
        z: def.z + (seedRand(def, 2001 + i * 2) - .5) * (r * 1.1),
        civilian: true
      });
    }

    const runtime = { ...def, group, radius: r, captured: false, discovered: false, defendersRuntime: [], kingRuntime: null };
    for (let i = 0; i < def.defenders; i++) {
      const e = makeHumanoid({
        x: def.x + (seedRand(def, 2100 + i * 2) - .5) * r * 1.4,
        z: def.z + (seedRand(def, 2101 + i * 2) - .5) * r * 1.25,
        enemy: true,
        home: runtime
      });
      runtime.defendersRuntime.push(e);
    }
    runtime.kingRuntime = makeHumanoid({ x: def.x, z: def.z - 5, enemy: true, king: true, home: runtime });
    cities.push(runtime);
    return runtime;
  }

  function ensureCave(def) {
    if (generatedCaves.has(def.id)) return;
    const group = new THREE.Group();
    const y = W.groundY(def.x, def.z);
    for (let i = -2; i <= 2; i++) {
      addBox(group, 2.8, 3.4 + Math.abs(i) * .35, 3, mats.rock, def.x + i * 2.2, y + 1.7, def.z, false);
    }
    const opening = addBox(group, 4.3, 3.4, .45, mats.dark, def.x, y + 1.65, def.z - 1.55, false);
    scene.add(group);
    const cave = { ...def, group, opening, discovered: false };
    generatedCaves.set(def.id, cave);
    caves.push(cave);
  }

  function spawnChunkWildlife(cx, cz) {
    const key = `${cx},${cz}`;
    if (wildlifeChunks.has(key)) return;
    wildlifeChunks.add(key);
    const centerX = cx * W.CHUNK_SIZE + W.CHUNK_SIZE / 2;
    const centerZ = cz * W.CHUNK_SIZE + W.CHUNK_SIZE / 2;
    if (Math.hypot(centerX, centerZ) < 45) return;
    const biome = W.biomeAt(centerX, centerZ);
    const roll = W.hash2i(cx, cz, 2201);
    if ((biome === 'steppe' || biome === 'fertile' || biome === 'oasis') && roll > .5) {
      const count = 1 + Math.floor(W.hash2i(cx, cz, 2202) * 3);
      for (let i = 0; i < count; i++) makeAnimal('sheep', centerX + (W.hash2i(cx, cz, 2210 + i) - .5) * 30, centerZ + (W.hash2i(cx, cz, 2220 + i) - .5) * 30, false);
    }
    if (biome === 'desert' && roll > .78) {
      makeAnimal('camel', centerX + (W.hash2i(cx, cz, 2231) - .5) * 24, centerZ + (W.hash2i(cx, cz, 2232) - .5) * 24, false);
    }
    if ((biome === 'rocky' || biome === 'steppe') && W.hash2i(cx, cz, 2240) > .83) {
      makeAnimal('lion', centerX + (W.hash2i(cx, cz, 2241) - .5) * 25, centerZ + (W.hash2i(cx, cz, 2242) - .5) * 25, false);
    }
  }

  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2;
    makeAnimal('sheep', W.starterVillage.x + Math.cos(a) * (7 + i % 2 * 2), W.starterVillage.z + Math.sin(a) * (7 + i % 2 * 2), true);
  }
  const horseAngle = W.hash2i(1, 9, 2301) * Math.PI * 2;
  makeAnimal('horse', Math.cos(horseAngle) * 18, Math.sin(horseAngle) * 18, false);

  const keys = {};
  function setFollowMode(mode) {
    followMode = mode;
    const text = { people: 'PERSONAS síganme', livestock: 'GANADO sígame', all: 'TODOS síganme', none: 'NADIE me siga' }[mode];
    flash(`Orden: ${text}`);
    document.querySelectorAll('.order-btn').forEach(b => b.classList.toggle('active', b.dataset.follow === mode));
  }

  function retreat() {
    followers.forEach(f => f.retreat = 3);
    attackOrder = 0;
    flash('¡RETIRADA!');
  }

  addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.repeat) return;
    if (e.code === 'Digit1') setFollowMode('people');
    if (e.code === 'Digit2') setFollowMode('livestock');
    if (e.code === 'Digit3') setFollowMode('all');
    if (e.code === 'Digit4') setFollowMode('none');
    if (e.code === 'KeyE') interact();
    if (e.code === 'KeyF') playerAttack();
    if (e.code === 'KeyR') retreat();
  });
  addEventListener('keyup', e => keys[e.code] = false);

  const joyZone = document.getElementById('joystick-zone');
  const joyStick = document.getElementById('joystick-stick');
  let joyPointer = null, joyCenter = { x: 0, y: 0 };
  function resetJoy() {
    mobileMove.x = 0; mobileMove.z = 0; joyPointer = null;
    if (joyStick) joyStick.style.transform = 'translate(0px,0px)';
  }
  if (joyZone) {
    joyZone.addEventListener('pointerdown', e => {
      joyPointer = e.pointerId; joyZone.setPointerCapture(e.pointerId);
      const r = joyZone.getBoundingClientRect();
      joyCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      e.preventDefault();
    });
    joyZone.addEventListener('pointermove', e => {
      if (e.pointerId !== joyPointer) return;
      const max = 39, dx = e.clientX - joyCenter.x, dy = e.clientY - joyCenter.y;
      const len = Math.hypot(dx, dy) || 1, scale = Math.min(1, max / len);
      const px = dx * scale, py = dy * scale;
      mobileMove.x = px / max; mobileMove.z = py / max;
      joyStick.style.transform = `translate(${px}px,${py}px)`;
      e.preventDefault();
    });
    joyZone.addEventListener('pointerup', resetJoy);
    joyZone.addEventListener('pointercancel', resetJoy);
  }

  document.querySelectorAll('.order-btn').forEach(b => b.addEventListener('pointerdown', e => {
    e.preventDefault(); setFollowMode(b.dataset.follow);
  }));
  const attackBtn = document.getElementById('btn-attack');
  const interactBtn = document.getElementById('btn-interact');
  const retreatBtn = document.getElementById('btn-retreat');
  const runBtn = document.getElementById('btn-run');
  attackBtn?.addEventListener('pointerdown', e => { e.preventDefault(); playerAttack(); });
  interactBtn?.addEventListener('pointerdown', e => { e.preventDefault(); interact(); });
  retreatBtn?.addEventListener('pointerdown', e => { e.preventDefault(); retreat(); });
  runBtn?.addEventListener('pointerdown', e => { e.preventDefault(); mobileMove.run = true; runBtn.classList.add('active'); });
  const stopRun = () => { mobileMove.run = false; runBtn?.classList.remove('active'); };
  runBtn?.addEventListener('pointerup', stopRun);
  runBtn?.addEventListener('pointercancel', stopRun);
  runBtn?.addEventListener('pointerleave', stopRun);

  function dist(a, b) { return a.position.distanceTo(b.position); }
  function nearestEntity(arr, maxD) {
    let best = null, bestD = maxD;
    for (const e of arr) {
      if (!e.alive) continue;
      const d = dist(player.mesh, e.mesh);
      if (d < bestD) { best = e; bestD = d; }
    }
    return best;
  }

  function interact() {
    if (mounted) {
      mounted = false;
      if (mount) {
        mount.mesh.position.copy(player.mesh.position).add(new THREE.Vector3(1.8, 0, 0));
        mount.mesh.position.y = W.groundY(mount.mesh.position.x, mount.mesh.position.z);
      }
      mount = null;
      flash('Desmontaste');
      return;
    }

    const ride = livestock.find(a => a.alive && (a.type === 'horse' || a.type === 'camel') && dist(player.mesh, a.mesh) < 3.4);
    if (ride) {
      mounted = true; mount = ride;
      flash(ride.type === 'camel' ? 'Montaste el camello' : 'Montaste el caballo');
      return;
    }

    const animal = livestock.find(a => a.alive && a.type === 'sheep' && !a.owned && dist(player.mesh, a.mesh) < 3.2);
    if (animal) {
      animal.owned = true;
      flash('La oveja ahora forma parte de tu ganado');
      return;
    }

    const c = nearestEntity(civilians.filter(x => x !== player && !x.recruited), 3.6);
    if (c) {
      c.recruited = true; followers.push(c);
      flash('Aldeano reclutado');
      return;
    }

    const cave = caves.find(ca => Math.hypot(player.mesh.position.x - ca.x, player.mesh.position.z - ca.z) < 5);
    if (cave) {
      cave.discovered = true;
      flash('🕯️ Entrada de cueva descubierta. El interior llegará en una próxima versión.', 3200);
      return;
    }

    flash('No hay nada con qué interactuar');
  }

  function playerAttack() {
    attackOrder = 6;
    const target = nearestEntity(enemies, mounted ? 4.2 : 3.7);
    if (!target) {
      flash('⚔️ ¡Atacad! Tus seguidores buscarán enemigos cercanos.');
      return;
    }
    damage(target, mounted ? 3 : 2.5);
    flash(target.alive ? 'Golpeaste al enemigo · ¡Atacad!' : 'Enemigo derrotado · ¡Atacad!');
  }

  function damage(e, amount) {
    if (!e || !e.alive) return;
    e.hp -= amount;
    if (e.hp <= 0) {
      e.alive = false;
      e.mesh.rotation.z = Math.PI / 2;
      setTimeout(() => scene.remove(e.mesh), 2500);
    }
  }

  const vTmp = new THREE.Vector3();
  function moveToward(entity, target, dt, speed, stop = 2) {
    vTmp.subVectors(target, entity.mesh.position); vTmp.y = 0;
    const d = vTmp.length();
    if (d > stop) {
      vTmp.normalize();
      entity.mesh.position.addScaledVector(vTmp, speed * dt);
      entity.mesh.rotation.y = Math.atan2(vTmp.x, vTmp.z);
      entity.mesh.position.y = W.groundY(entity.mesh.position.x, entity.mesh.position.z);
    }
    return d;
  }

  function updateFollowers(dt) {
    attackOrder = Math.max(0, attackOrder - dt);
    const living = followers.filter(f => f.alive);
    living.forEach((f, i) => {
      f.cooldown = Math.max(0, (f.cooldown || 0) - dt);
      if (f.retreat > 0) {
        f.retreat -= dt;
        const away = new THREE.Vector3().subVectors(f.mesh.position, player.mesh.position).setY(0);
        if (away.lengthSq() < .01) away.set(1, 0, 0);
        away.normalize();
        f.mesh.position.addScaledVector(away, 5 * dt);
        f.mesh.position.y = W.groundY(f.mesh.position.x, f.mesh.position.z);
        return;
      }

      let closeEnemy = null, closeD = attackOrder > 0 ? 25 : 7;
      for (const e of enemies) {
        if (!e.alive) continue;
        const d = dist(f.mesh, e.mesh);
        if (d < closeD) { closeEnemy = e; closeD = d; }
      }
      if (closeEnemy) {
        const d = moveToward(f, closeEnemy.mesh.position, dt, 4.45, 1.7);
        if (d < 2 && f.cooldown <= 0) {
          damage(closeEnemy, 1.2); f.cooldown = .8;
        }
        return;
      }

      if (followMode === 'people' || followMode === 'all') {
        const cols = Math.min(6, Math.max(2, Math.ceil(Math.sqrt(living.length))));
        const row = Math.floor(i / cols), col = i % cols;
        const lateral = (col - (cols - 1) / 2) * 2.1;
        const behind = 3.5 + row * 2.2;
        const forward = new THREE.Vector3(Math.sin(player.mesh.rotation.y), 0, Math.cos(player.mesh.rotation.y));
        const right = new THREE.Vector3(forward.z, 0, -forward.x);
        const target = player.mesh.position.clone().addScaledVector(right, lateral).addScaledVector(forward, -behind);
        moveToward(f, target, dt, 4.7 + Math.min(row * .08, .5), 1.1);
      }
    });
  }

  function updateLivestock(dt) {
    const owned = livestock.filter(a => a.alive && a.owned && a !== mount);
    livestock.forEach(a => {
      if (!a.alive || a === mount) return;
      a.wander += dt * (W.randAt(Math.floor(a.mesh.position.x), Math.floor(a.mesh.position.z), 2401) - .48) * .12;
      const shouldFollow = a.owned && (followMode === 'livestock' || followMode === 'all');
      if (shouldFollow) {
        const oi = owned.indexOf(a);
        const angle = oi * .82;
        const target = player.mesh.position.clone().add(new THREE.Vector3(Math.cos(angle) * 5.2, 0, Math.sin(angle) * 5.2 + 5));
        moveToward(a, target, dt, a.speed, 2.4);
      } else if (a.type !== 'horse' && a.type !== 'camel') {
        a.mesh.position.x += Math.sin(a.wander) * dt * .28;
        a.mesh.position.z += Math.cos(a.wander) * dt * .28;
        a.mesh.position.y = W.groundY(a.mesh.position.x, a.mesh.position.z);
      }
    });
  }

  function updateEnemies(dt) {
    for (const e of enemies) {
      if (!e.alive) continue;
      e.cooldown = Math.max(0, (e.cooldown || 0) - dt);
      const isLion = e.type === 'lion';
      const home = e.home;
      const playerToHome = home ? Math.hypot(player.mesh.position.x - home.x, player.mesh.position.z - home.z) : 0;
      let target = null, targetD = isLion ? 12 : (playerToHome < (home?.radius || 25) + 18 ? 13 : 7);
      const candidates = [player, ...followers.filter(x => x.alive), ...livestock.filter(x => x.alive && x.owned && x.type === 'sheep')];
      for (const c of candidates) {
        const d = dist(e.mesh, c.mesh);
        if (d < targetD) { target = c; targetD = d; }
      }
      if (target) {
        const d = moveToward(e, target.mesh.position, dt, e.speed || 4, 1.6);
        if (d < 1.9 && e.cooldown <= 0) {
          damage(target, isLion ? 2 : e.king ? 1.7 : 1);
          e.cooldown = isLion ? 1.1 : 1.25;
          if (target === player && player.hp <= 0) respawn();
        }
      } else if (home && Math.hypot(e.mesh.position.x - home.x, e.mesh.position.z - home.z) > (home.radius || 20) * .8) {
        moveToward(e, new THREE.Vector3(home.x, 0, home.z), dt, e.speed || 4, 5);
      } else if (isLion) {
        e.wander = (e.wander || 0) + dt * .25;
        e.mesh.position.x += Math.sin(e.wander) * dt * .32;
        e.mesh.position.z += Math.cos(e.wander) * dt * .32;
        e.mesh.position.y = W.groundY(e.mesh.position.x, e.mesh.position.z);
      }
    }
  }

  function respawn() {
    player.hp = player.maxHp;
    player.mesh.position.set(0, W.groundY(0, 0), 0);
    mounted = false; mount = null;
    flash('Has caído. Regresas al punto inicial.', 3000);
  }

  const clock = new THREE.Clock();
  let camYaw = Math.PI * .75;

  function updatePlayer(dt) {
    let x = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0) + mobileMove.x;
    let z = (keys.KeyS ? 1 : 0) - (keys.KeyW ? 1 : 0) + mobileMove.z;
    const len = Math.hypot(x, z);
    if (len > 1) { x /= len; z /= len; }

    const mountFactor = mounted && mount ? (mount.type === 'camel' ? 1.45 : 1.8) : 1;
    const speed = ((keys.ShiftLeft || mobileMove.run) ? 1.55 : 1) * 6 * mountFactor;
    const forward = new THREE.Vector3(Math.sin(camYaw), 0, Math.cos(camYaw));
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    const dir = forward.multiplyScalar(-z).add(right.multiplyScalar(x));

    if (dir.lengthSq() > 0) {
      dir.normalize();
      player.mesh.position.addScaledVector(dir, speed * dt);
      player.mesh.rotation.y = Math.atan2(dir.x, dir.z);
    }

    player.mesh.position.y = W.groundY(player.mesh.position.x, player.mesh.position.z);
    if (mounted && mount) {
      mount.mesh.position.copy(player.mesh.position);
      mount.mesh.rotation.copy(player.mesh.rotation);
      player.mesh.position.y += mount.type === 'camel' ? 1.75 : 1.35;
    }

    updateChunks();

    const desired = player.mesh.position.clone().add(new THREE.Vector3(0, mounted ? 7.2 : 6.1, 0));
    const back = new THREE.Vector3(Math.sin(camYaw), .32, Math.cos(camYaw)).multiplyScalar(mounted ? 12.5 : 11);
    desired.add(back);
    camera.position.lerp(desired, 1 - Math.pow(.0001, dt));
    camera.lookAt(player.mesh.position.clone().add(new THREE.Vector3(0, 2, 0)));
  }

  addEventListener('mousemove', e => { if (e.buttons === 2) camYaw -= e.movementX * .005; });
  addEventListener('contextmenu', e => e.preventDefault());

  let cameraPointer = null, lastCameraX = 0;
  renderer.domElement.addEventListener('pointerdown', e => {
    if (!isMobile || e.target !== renderer.domElement) return;
    cameraPointer = e.pointerId; lastCameraX = e.clientX;
    renderer.domElement.setPointerCapture(e.pointerId); e.preventDefault();
  });
  renderer.domElement.addEventListener('pointermove', e => {
    if (e.pointerId !== cameraPointer) return;
    const dx = e.clientX - lastCameraX; lastCameraX = e.clientX;
    camYaw -= dx * .009; e.preventDefault();
  });
  const stopCamera = e => { if (e.pointerId === cameraPointer) cameraPointer = null; };
  renderer.domElement.addEventListener('pointerup', stopCamera);
  renderer.domElement.addEventListener('pointercancel', stopCamera);

  function updateWorldEvents() {
    for (const s of generatedSettlements.values()) {
      const d = Math.hypot(player.mesh.position.x - s.x, player.mesh.position.z - s.z);
      if (!s.discovered && d < (s.type === 'city' ? 72 : 45)) {
        s.discovered = true;
        if (s.type === 'city') flash(`🏛️ Descubriste ${s.name}. Rey ${s.king}. Guarnición estimada: ${s.defenders}.`, 4200);
        else flash(`🏘️ Descubriste la aldea de ${s.name}.`, 2800);
      }
    }

    for (const c of caves) {
      const d = Math.hypot(player.mesh.position.x - c.x, player.mesh.position.z - c.z);
      if (!c.discovered && d < 18) {
        c.discovered = true;
        flash('🕳️ Ves una cueva entre las rocas.', 2200);
      }
    }

    for (const city of cities) {
      if (city.captured) continue;
      const defendersAlive = city.defendersRuntime.filter(e => e.alive).length;
      const kingAlive = city.kingRuntime?.alive;
      if (defendersAlive === 0 && !kingAlive) {
        city.captured = true;
        const y = W.groundY(city.x, city.z - 4);
        worldBox(.45, 7, .45, mats.wood, city.x, y + 3.5, city.z - 4, false);
        worldBox(3.2, 1.7, .3, mats.blue, city.x + 1.5, y + 6.3, city.z - 4, false);
        flash(`🏛️ ¡${city.name.toUpperCase()} HA CAÍDO! Ahora pertenece a tu pueblo.`, 5200);
      }
    }
  }

  function nearestSettlement() {
    let best = null, bd = Infinity;
    for (const s of generatedSettlements.values()) {
      const d = Math.hypot(player.mesh.position.x - s.x, player.mesh.position.z - s.z);
      if (d < bd) { best = s; bd = d; }
    }
    return best ? { s: best, d: bd } : null;
  }

  function updateUI() {
    const biomeLabels = { desert: 'Desierto', rocky: 'Montañas rocosas', steppe: 'Estepa', fertile: 'Valle fértil', oasis: 'Oasis' };
    const biome = W.biomeAt(player.mesh.position.x, player.mesh.position.z);
    const ownedSheep = livestock.filter(a => a.alive && a.owned && a.type === 'sheep').length;
    const chunkX = Math.floor(player.mesh.position.x / W.CHUNK_SIZE);
    const chunkZ = Math.floor(player.mesh.position.z / W.CHUNK_SIZE);
    stats.innerHTML = `<b>WILDERNESS · 0.3</b><br>Vida: ${Math.max(0, Math.ceil(player.hp))}/${player.maxHp}<br>Seguidores: ${followers.filter(f => f.alive).length}<br>Ganado: ${ownedSheep}<br>Montado: ${mounted ? (mount?.type === 'camel' ? 'Camello' : 'Caballo') : 'No'}<br>Bioma: ${biomeLabels[biome]}<br>Región: ${chunkX}, ${chunkZ}<br>Semilla: ${W.seedToken}`;

    const labels = { people: 'PERSONAS', livestock: 'GANADO', all: 'TODOS', none: 'NADIE' };
    const near = nearestSettlement();
    let nearText = '';
    if (near && near.d < 110) {
      if (near.s.type === 'city') {
        const alive = near.s.defendersRuntime.filter(e => e.alive).length + (near.s.kingRuntime?.alive ? 1 : 0);
        nearText = `<br><br><b>${near.s.name}</b><br>${near.s.captured ? 'Ciudad conquistada' : `Defensores visibles: ${alive}`}`;
      } else {
        nearText = `<br><br><b>${near.s.name}</b><br>Aldea`;
      }
    }
    orders.innerHTML = `<b>ORDEN ACTIVA</b><br>Seguir: ${labels[followMode]}${attackOrder > 0 ? '<br>⚔️ Ataque activo' : ''}${nearText}<br><br><b>0.3</b><br>El mundo se genera mientras avanzas. Sigue caminos, busca cuevas y descubre ciudades distintas.`;
  }

  updateChunks(true);
  const starterRuntime = generatedSettlements.get(W.starterVillage.id);
  if (!starterRuntime) ensureSettlement(W.starterVillage);
  if (!generatedSettlements.get(W.starterCity.id)) ensureSettlement(W.starterCity);

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), .033);
    updatePlayer(dt);
    updateFollowers(dt);
    updateLivestock(dt);
    updateEnemies(dt);
    updateWorldEvents();
    updateUI();
    renderer.render(scene, camera);
  }
  animate();

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5));
  });

  flash(`Mundo ${W.seedToken}. Explora: el terreno, caminos, aldeas, cuevas y ciudades cambian con cada semilla.`, 4500);
})();