(() => {
  const THREE=window.THREE,W=window.WildernessWorld;
  if(!THREE||!W||typeof scene==='undefined'||typeof player==='undefined'||typeof cities==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const S={active:null,states:new Map(),clock:0};
  const wood=new THREE.MeshLambertMaterial({color:0x51331f,flatShading:true});
  const iron=new THREE.MeshLambertMaterial({color:0x302a25,flatShading:true});
  const stone=new THREE.MeshLambertMaterial({color:0x8b6748,flatShading:true});
  const gold=new THREE.MeshLambertMaterial({color:0xc29b42,flatShading:true});
  function box(parent,w,h,d,mat,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=!mobile;m.receiveShadow=true;parent.add(m);return m}

  const panel=document.createElement('div');panel.id='siege13';panel.style.cssText='display:none;position:fixed;z-index:28;left:50%;top:58px;transform:translateX(-50%);min-width:220px;text-align:center;padding:7px 10px;border:1px solid #d8b97a99;border-radius:7px;background:#1a100bdc;color:#f6e7c8;font:9px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;text-shadow:0 1px 2px #000;pointer-events:none';document.body.appendChild(panel);
  if(mobile){panel.style.top='44px';panel.style.fontSize='7px';panel.style.maxWidth='45vw';panel.style.minWidth='160px'}

  function key(c){return c.id||c.name||`${Math.round(c.x)},${Math.round(c.z)}`}
  function buildFortifications(c){
    const k=key(c);if(S.states.has(k))return S.states.get(k);
    const g=new THREE.Group();g.name=`siege-${k}`;const r=c.radius||23,wallH=4.8;
    const gy=W.groundY(c.x,c.z+r);
    const gate=box(g,7.2,5.8,1.25,wood,c.x,gy+2.9,c.z+r-.8);
    for(let x=-2.7;x<=2.7;x+=1.35)box(g,.15,5.5,1.45,iron,c.x+x,gy+2.75,c.z+r-.72);
    box(g,8.6,.42,1.6,stone,c.x,gy+6,c.z+r-.75);
    const towerPos=[[-r+2,r-2],[r-2,r-2],[-r+2,-r+2],[r-2,-r+2]];
    const towers=[];
    for(const[dx,dz]of towerPos){const y=W.groundY(c.x+dx,c.z+dz);const t=new THREE.Group();box(t,4.8,7.4,4.8,stone,0,3.7,0);for(const ox of[-1.8,0,1.8])for(const oz of[-1.8,1.8])box(t,.55,1,.55,stone,ox,7.7,oz);t.position.set(c.x+dx,y,c.z+dz);g.add(t);towers.push(t)}
    const innerY=W.groundY(c.x,c.z-7);const throne=box(g,3.8,1.3,2.2,gold,c.x,innerY+.65,c.z-3.8);throne.visible=false;
    scene.add(g);
    const state={city:c,group:g,gate,gateHp:36,gateMax:36,breached:false,innerOpen:false,won:false,lastHit:0,towers,throne};
    S.states.set(k,state);c.siege13=state;return state;
  }
  function scan(){for(const c of cities)if(c&&!c.captured)buildFortifications(c)}
  function nearestCity(){let best=null,bd=Infinity;for(const c of cities){if(!c||c.captured)continue;const d=Math.hypot(player.mesh.position.x-c.x,player.mesh.position.z-c.z);if(d<bd){best=c;bd=d}}return best?{c:best,d:bd}:null}
  function nearGate(st,range=9){const c=st.city,r=c.radius||23;return Math.hypot(player.mesh.position.x-c.x,player.mesh.position.z-(c.z+r))<range}
  function defendersAlive(c){return (c.defendersRuntime||[]).filter(e=>e.alive).length}
  function breach(st,amount=1){if(st.breached)return;st.gateHp=Math.max(0,st.gateHp-amount);st.lastHit=performance.now();if(window.WildernessPolish)window.WildernessPolish.shake=Math.min(.7,(window.WildernessPolish.shake||0)+.08);if(st.gateHp<=0){st.breached=true;st.gate.rotation.z=Math.PI/2;st.gate.position.y-=2.3;flash(`¡La puerta de ${st.city.name} ha caído! Entren en la ciudad.`,3600)}}

  if(typeof playerAttack==='function'){
    const old=playerAttack;playerAttack=function(){const n=nearestCity();if(n&&n.d<(n.c.radius||23)+16){const st=buildFortifications(n.c);if(!st.breached&&nearGate(st,10)){if(typeof issueOrder==='function')issueOrder('attack');breach(st,2.7);flash(`Golpeas la puerta · ${Math.ceil(st.gateHp)}/${st.gateMax}`,900);return}}old()};
  }
  if(typeof damage==='function'){
    const oldDamage=damage;damage=function(e,amount){if(e?.king&&e.home?.siege13){const st=e.home.siege13;if(!st.breached){flash('El rey está protegido tras las murallas. Rompe la puerta.',1800);return}const alive=defendersAlive(e.home);const threshold=Math.max(2,Math.floor((e.home.defenders||8)*.28));if(alive>threshold){flash(`Aún quedan ${alive} defensores. Debilita la guarnición antes de llegar al rey.`,1700);return}}oldDamage(e,amount)};
  }

  function followerSiege(st,dt){if(st.breached||typeof followers==='undefined')return;const c=st.city,r=c.radius||23;let attackers=0;for(const f of followers){if(!f.alive||f.order!=='attack')continue;if(Math.hypot(f.mesh.position.x-c.x,f.mesh.position.z-(c.z+r))<13)attackers++}if(attackers>0)breach(st,dt*Math.min(attackers,12)*.52)}
  function updateStage(st){const c=st.city,alive=defendersAlive(c),total=Math.max(1,c.defenders||1);if(st.breached&&!st.innerOpen&&alive<=Math.max(2,Math.floor(total*.28))){st.innerOpen=true;st.throne.visible=true;flash(`La defensa interior de ${c.name} se derrumba. ¡El rey está expuesto!`,3600)}if(c.captured&&!st.won){st.won=true;panel.style.display='none';flash(`${c.name} ha sido conquistada tras el asedio.`,4000)}}
  function render(st){if(!st){panel.style.display='none';return}panel.style.display='block';const alive=defendersAlive(st.city);let stage='APROXIMACIÓN';if(!st.breached)stage='ROMPER LA PUERTA';else if(!st.innerOpen)stage='TOMAR LAS MURALLAS';else stage='DERROTAR AL REY';const gate=st.breached?'BRECHA ABIERTA':`${Math.ceil(st.gateHp)}/${st.gateMax}`;panel.innerHTML=`<b>ASEDIO · ${st.city.name}</b><br>${stage}<br>Puerta: ${gate} · Defensores: ${alive}`}
  function tick(dt){S.clock+=dt;if(S.clock>.8){S.clock=0;scan()}const n=nearestCity();if(!n||n.d>(n.c.radius||23)+55){S.active=null;render(null);return}const st=buildFortifications(n.c);S.active=st;followerSiege(st,dt);updateStage(st);render(st)}
  scan();let last=performance.now();function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;try{tick(dt)}catch(e){console.warn('Wilderness 1.3 siege:',e)}requestAnimationFrame(loop)}requestAnimationFrame(loop);window.WildernessSiege=S;
})();