(() => {
  const THREE = window.THREE;
  const W = window.WildernessWorld;
  if (!THREE || !W || typeof scene === 'undefined' || typeof player === 'undefined') return;

  const kingdomPanel = document.createElement('div');
  kingdomPanel.id = 'kingdom-panel';
  kingdomPanel.style.cssText = 'position:fixed;right:12px;top:58px;z-index:25;max-width:245px;padding:8px 10px;border:1px solid #d8b97a99;border-radius:8px;background:#1c130bc7;color:#f6e7c8;font:10px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;text-shadow:0 1px 2px #000;pointer-events:none';
  document.body.appendChild(kingdomPanel);
  if (matchMedia('(pointer:coarse)').matches || innerWidth <= 820) {
    kingdomPanel.style.right = '8px'; kingdomPanel.style.top = '48px'; kingdomPanel.style.maxWidth = '44vw'; kingdomPanel.style.fontSize = '7px'; kingdomPanel.style.padding = '5px 6px';
  }

  const realmColors = [0x9f533f,0x566f8c,0x71814c,0x8a6b3f,0x6d507a,0x4f7771,0x8a4949,0x77704a];
  const realms = new Map();
  const armies = [];
  const MAX_VISIBLE_ARMIES = (matchMedia('(pointer:coarse)').matches || innerWidth <= 820) ? 4 : 7;
  const MAX_REALMS = 12;
  let simClock = 0, scanClock = 0, eventClock = 0;
  const history = [];

  function announce(text) {
    history.unshift(text); if (history.length > 4) history.length = 4;
    if (typeof flash === 'function') flash(text, 2300);
  }
  function realmKey(s) { return s.id || `${Math.round(s.x)},${Math.round(s.z)}`; }
  function createRealm(s) {
    if (!s || s.type !== 'city') return null;
    const key = realmKey(s);
    if (realms.has(key)) return realms.get(key);
    if (realms.size >= MAX_REALMS) return null;
    const h = W.randAt(s.x, s.z, 7001);
    const r = {
      id:key, name:s.name || 'Ciudad', king:s.king || 'Rey', x:s.x, z:s.z,
      color:realmColors[Math.floor(h * realmColors.length) % realmColors.length],
      strength:Math.max(8, (s.defenders || 8) + Math.floor(W.randAt(s.x,s.z,7002)*12)),
      wealth:35 + Math.floor(W.randAt(s.x,s.z,7003)*75),
      aggression:.28 + W.randAt(s.x,s.z,7004)*.58,
      owner:'npc', cities:1, lastCampaign:0, source:s
    };
    realms.set(key,r); return r;
  }
  function relation(a,b) {
    if (!a || !b || a.id === b.id) return 1;
    const ax = Math.floor(a.x/20), az=Math.floor(a.z/20), bx=Math.floor(b.x/20), bz=Math.floor(b.z/20);
    const v = W.hash2i(ax+bx,az+bz,7010);
    return v < .31 ? -1 : v < .48 ? 0 : 1;
  }
  function nearestEnemyRealm(from) {
    let best=null, bd=Infinity;
    for (const r of realms.values()) {
      if (r.id===from.id || relation(from,r)>=0) continue;
      const d=Math.hypot(r.x-from.x,r.z-from.z);
      if (d<bd && d<520) { best=r; bd=d; }
    }
    return best;
  }
  function nearestFriendlyRealm(from) {
    let best=null,bd=Infinity;
    for(const r of realms.values()){
      if(r.id===from.id || relation(from,r)<0) continue;
      const d=Math.hypot(r.x-from.x,r.z-from.z);
      if(d<bd){best=r;bd=d;}
    }
    return best;
  }

  function makeSoldierBlock(parent,x,z,color,archer=false) {
    const m = new THREE.MeshLambertMaterial({color,flatShading:true});
    const body=new THREE.Mesh(new THREE.BoxGeometry(.72,1.1,.52),m); body.position.set(x,1.08,z); parent.add(body);
    const head=new THREE.Mesh(new THREE.BoxGeometry(.48,.48,.48),new THREE.MeshLambertMaterial({color:0xa97854,flatShading:true})); head.position.set(x,1.86,z); parent.add(head);
    if(archer){const bow=new THREE.Mesh(new THREE.BoxGeometry(.08,1.15,.08),new THREE.MeshLambertMaterial({color:0x6f4b2e,flatShading:true}));bow.position.set(x+.45,1.25,z);bow.rotation.z=.35;parent.add(bow);}
    else {const spear=new THREE.Mesh(new THREE.BoxGeometry(.08,2,.08),new THREE.MeshLambertMaterial({color:0x604027,flatShading:true}));spear.position.set(x+.42,1.4,z);parent.add(spear);}
  }
  function buildArmyMesh(realm,strength) {
    const g=new THREE.Group();
    const count=Math.min(8,Math.max(3,Math.round(strength/4)));
    for(let i=0;i<count;i++){
      const row=Math.floor(i/4), col=i%4;
      makeSoldierBlock(g,(col-1.5)*1.05,-row*1.15,realm.color,i%4===3);
    }
    const flagPole=new THREE.Mesh(new THREE.BoxGeometry(.08,2.7,.08),new THREE.MeshLambertMaterial({color:0x5b3823}));flagPole.position.set(-2,1.35,.2);g.add(flagPole);
    const flag=new THREE.Mesh(new THREE.BoxGeometry(1.15,.62,.08),new THREE.MeshLambertMaterial({color:realm.color,flatShading:true}));flag.position.set(-1.45,2.35,.2);g.add(flag);
    return g;
  }
  function spawnArmy(realm,target,kind='raid') {
    if (!realm || !target || armies.length>=MAX_VISIBLE_ARMIES) return;
    const strength=Math.max(5,Math.min(realm.strength-4,7+Math.floor(realm.strength*.34)));
    if(strength<5)return;
    realm.strength-=Math.floor(strength*.45);
    const mesh=buildArmyMesh(realm,strength); mesh.position.set(realm.x,W.groundY(realm.x,realm.z),realm.z); scene.add(mesh);
    armies.push({realm,target,mesh,strength,kind,speed:kind==='patrol'?2.2:2.75,alive:true,returning:false,age:0});
    announce(`${realm.name} movilizó ${kind==='patrol'?'una patrulla':'un ejército'} hacia ${target.name}.`);
  }
  function removeArmy(a){if(!a.alive)return;a.alive=false;scene.remove(a.mesh);const i=armies.indexOf(a);if(i>=0)armies.splice(i,1);}
  function resolveArmyArrival(a){
    if(a.returning){a.realm.strength+=Math.max(2,Math.floor(a.strength*.65));removeArmy(a);return;}
    const t=a.target;
    if(!t){removeArmy(a);return;}
    if(a.kind==='patrol'){
      const next=nearestFriendlyRealm(a.realm)||a.realm;a.target=next;a.returning=true;return;
    }
    const defense=Math.max(6,t.strength);
    const attack=a.strength*(.78+Math.random()*.5);
    if(attack>defense*1.05){
      const loss=Math.max(2,Math.floor(defense*.35));a.strength=Math.max(2,a.strength-loss);
      t.strength=Math.max(5,Math.floor(t.strength*.55));a.realm.wealth+=12;t.wealth=Math.max(0,t.wealth-12);
      if(attack>defense*1.55 && Math.random()<.42){
        t.owner=a.realm.id;a.realm.cities++;announce(`${a.realm.name} conquistó territorio de ${t.name}.`);
      } else announce(`${a.realm.name} saqueó las afueras de ${t.name}.`);
    } else {
      a.strength=Math.max(1,Math.floor(a.strength*.42));t.strength=Math.max(4,t.strength-Math.floor(a.strength*.18));announce(`${t.name} rechazó una incursión de ${a.realm.name}.`);
    }
    a.target=a.realm;a.returning=true;
  }
  function updateArmies(dt){
    for(const a of [...armies]){
      a.age+=dt;if(a.age>240){removeArmy(a);continue;}
      const tx=a.target?.x??a.realm.x,tz=a.target?.z??a.realm.z;
      const dx=tx-a.mesh.position.x,dz=tz-a.mesh.position.z,d=Math.hypot(dx,dz);
      if(d<5){resolveArmyArrival(a);continue;}
      const step=Math.min(d,a.speed*dt);a.mesh.position.x+=dx/d*step;a.mesh.position.z+=dz/d*step;a.mesh.position.y=W.groundY(a.mesh.position.x,a.mesh.position.z);a.mesh.rotation.y=Math.atan2(dx,dz);
      if(typeof player!=='undefined' && Math.hypot(a.mesh.position.x-player.mesh.position.x,a.mesh.position.z-player.mesh.position.z)>760){removeArmy(a);}
    }
    for(let i=0;i<armies.length;i++)for(let j=i+1;j<armies.length;j++){
      const a=armies[i],b=armies[j];if(!a||!b||a.realm.id===b.realm.id||relation(a.realm,b.realm)>=0)continue;
      if(a.mesh.position.distanceTo(b.mesh.position)<4.8){
        const ap=a.strength*(.8+Math.random()*.4),bp=b.strength*(.8+Math.random()*.4);
        if(ap>=bp){a.strength=Math.max(1,a.strength-Math.ceil(b.strength*.45));announce(`${a.realm.name} venció a tropas de ${b.realm.name}.`);removeArmy(b);}else{b.strength=Math.max(1,b.strength-Math.ceil(a.strength*.45));announce(`${b.realm.name} venció a tropas de ${a.realm.name}.`);removeArmy(a);}return;
      }
    }
  }
  function scanRealms(){
    const px=player.mesh.position.x,pz=player.mesh.position.z;
    const defs=W.settlementsNearBounds(px-650,px+650,pz-650,pz+650,30);
    defs.forEach(createRealm);
  }
  function campaignTick(){
    for(const r of realms.values()){
      r.strength=Math.min(45,r.strength+.35);r.wealth=Math.min(150,r.wealth+.25);
      if(armies.some(a=>a.realm.id===r.id))continue;
      const enemy=nearestEnemyRealm(r);
      if(enemy && Math.random()<r.aggression*.22 && r.strength>13){spawnArmy(r,enemy,'raid');continue;}
      const friendly=nearestFriendlyRealm(r);
      if(friendly && Math.random()<.08 && r.strength>11)spawnArmy(r,friendly,'patrol');
    }
  }
  function syncPlayerConquests(){
    if(typeof cities==='undefined')return;
    for(const c of cities){
      if(!c)continue;
      const conquered=!!(c.conquered||c.defeated||c.captured);
      const def=c.def||c.definition||c.source;
      if(!conquered||!def)continue;
      const r=realms.get(realmKey(def));if(r&&r.owner!=='player'){r.owner='player';announce(`${r.name} reconoce tu dominio.`);}
    }
  }
  function renderPanel(){
    const px=player.mesh.position.x,pz=player.mesh.position.z;
    const nearby=[...realms.values()].sort((a,b)=>Math.hypot(a.x-px,a.z-pz)-Math.hypot(b.x-px,b.z-pz)).slice(0,3);
    let html='<b style="color:#fff0b8">REINOS · 0.7</b><br>';
    if(!nearby.length)html+='Explorando territorios…';
    else for(const r of nearby){const d=Math.round(Math.hypot(r.x-px,r.z-pz));const own=r.owner==='player'?'TUYO':r.owner==='npc'?'LIBRE':'OCUPADO';html+=`${r.name} · ${own} · ⚔${Math.round(r.strength)} · ${d}m<br>`;}
    if(history[0])html+=`<span style="opacity:.75">${history[0]}</span>`;
    kingdomPanel.innerHTML=html;
  }
  function tick07(dt){
    simClock+=dt;scanClock+=dt;eventClock+=dt;
    updateArmies(dt);
    if(scanClock>4){scanClock=0;scanRealms();syncPlayerConquests();renderPanel();}
    if(eventClock>18){eventClock=0;campaignTick();}
  }

  const oldAnimate07 = window.WildernessTick07;
  window.WildernessTick07 = tick07;
  scanRealms();renderPanel();

  // Hook into requestAnimationFrame without replacing the game's own loop.
  let last=performance.now();
  function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;try{tick07(dt)}catch(e){console.warn('Wilderness 0.7 kingdoms:',e);}requestAnimationFrame(loop);}
  requestAnimationFrame(loop);
  window.WildernessKingdoms={realms,armies,spawnArmy,relation};
})();