(() => {
  const THREE=window.THREE,W=window.WildernessWorld;
  if(!THREE||!W||typeof scene==='undefined'||typeof player==='undefined')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const P={shake:0,hitFlash:0,fps:60,quality:mobile?1:1.35,target:null};
  const labels=new Map();
  const rings=[];
  let frames=0,fpsClock=0,last=performance.now();

  const overlay=document.createElement('div');overlay.style.cssText='position:fixed;z-index:18;inset:0;pointer-events:none;background:rgba(170,30,18,0);transition:background .08s';document.body.appendChild(overlay);
  const cross=document.createElement('div');cross.style.cssText='position:fixed;z-index:19;left:50%;top:50%;width:10px;height:10px;margin:-5px;border:1px solid rgba(255,235,190,.55);border-radius:50%;pointer-events:none;box-shadow:0 0 8px #0008';document.body.appendChild(cross);

  function ringAt(pos,color=0xffd27a){const geo=new THREE.RingGeometry(.45,.7,16);const m=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false});const mesh=new THREE.Mesh(geo,m);mesh.rotation.x=-Math.PI/2;mesh.position.copy(pos);mesh.position.y+=.08;scene.add(mesh);rings.push({mesh,t:0});}
  function pulseDamage(entity,amount){if(!entity?.mesh)return;entity.__hitPulse=.16;const color=entity.enemy?0xff5d45:0xffd27a;ringAt(entity.mesh.position,color);if(entity===player){P.hitFlash=.18;overlay.style.background='rgba(170,30,18,.28)';P.shake=Math.min(.7,P.shake+.3)}else if(amount>1.5)P.shake=Math.min(.45,P.shake+.1)}

  if(typeof damage==='function'){
    const oldDamage=damage;
    damage=function(e,amount){const was=e?.alive;pulseDamage(e,amount);oldDamage(e,amount);if(was&&e&&!e.alive){P.shake=Math.min(.7,P.shake+.18);ringAt(e.mesh.position,0x8b2e24)}};
  }
  if(typeof playerAttack==='function'){
    const oldAttack=playerAttack;
    playerAttack=function(){player.__attackAnim=.22;P.shake=Math.min(.35,P.shake+.08);oldAttack()};
  }

  function healthBar(e){if(labels.has(e))return labels.get(e);const c=document.createElement('canvas');c.width=72;c.height=12;const tex=new THREE.CanvasTexture(c);tex.minFilter=THREE.NearestFilter;const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));spr.scale.set(2.6,.42,1);scene.add(spr);const o={canvas:c,ctx:c.getContext('2d'),tex,spr};labels.set(e,o);return o}
  function updateBar(e,o){const hp=Math.max(0,e.hp||0),max=Math.max(1,e.maxHp||5),r=hp/max;const ctx=o.ctx;ctx.clearRect(0,0,72,12);ctx.fillStyle='rgba(18,10,6,.8)';ctx.fillRect(0,1,72,10);ctx.fillStyle=e.enemy?'#b44a3d':'#d0b060';ctx.fillRect(2,3,68*r,6);o.tex.needsUpdate=true;o.spr.position.copy(e.mesh.position);o.spr.position.y+=(e.role==='cavalry'?4.5:3.8);o.spr.visible=e.alive&&e.mesh.position.distanceTo(player.mesh.position)<28}
  function cleanupBars(){for(const[e,o]of labels){if(!e?.alive||!e.mesh?.parent){scene.remove(o.spr);o.tex.dispose();labels.delete(e)}}}

  function nearestHostile(){if(typeof enemies==='undefined')return null;let best=null,bd=18;for(const e of enemies){if(!e.alive)continue;const d=e.mesh.position.distanceTo(player.mesh.position);if(d<bd){bd=d;best=e}}return best}
  function animateHumanoid(e,t){if(!e?.alive||!e.actor)return;const vel=e.__lastPos?e.mesh.position.distanceTo(e.__lastPos):0;e.__lastPos=e.mesh.position.clone();const moving=vel>.01;if(moving)e.actor.rotation.z=Math.sin(t*10+(e.mesh.id||0))*.035;else e.actor.rotation.z*=.85;if(e.__hitPulse>0){e.__hitPulse-=.016;e.actor.scale.set(1.08,.94,1.08)}else e.actor.scale.lerp(new THREE.Vector3(1,1,1),.25)}
  function animatePlayer(t){if(player.__attackAnim>0){player.__attackAnim-=.016;player.actor.rotation.x=-.18;player.actor.rotation.z=Math.sin((.22-player.__attackAnim)*28)*.12}else{player.actor.rotation.x*=.78;player.actor.rotation.z*=.82}const moving=(keys?.KeyW||keys?.KeyA||keys?.KeyS||keys?.KeyD||Math.hypot(mobileMove?.x||0,mobileMove?.z||0)>.1);if(moving)player.actor.position.y=Math.sin(t*11)*.06;else player.actor.position.y*=.8}
  function updateRings(dt){for(let i=rings.length-1;i>=0;i--){const r=rings[i];r.t+=dt;r.mesh.scale.setScalar(1+r.t*3);r.mesh.material.opacity=Math.max(0,.9-r.t*2.4);if(r.t>.4){scene.remove(r.mesh);r.mesh.geometry.dispose();r.mesh.material.dispose();rings.splice(i,1)}}}

  function adaptive(dt){frames++;fpsClock+=dt;if(fpsClock<2.5)return;P.fps=frames/fpsClock;frames=0;fpsClock=0;if(!mobile)return;let target=P.quality;if(P.fps<32)target=Math.max(.68,target-.12);else if(P.fps>48)target=Math.min(1,target+.08);if(Math.abs(target-P.quality)>.02){P.quality=target;renderer.setPixelRatio(Math.min(devicePixelRatio,P.quality))}}
  function cameraFX(dt){if(P.shake>0){P.shake=Math.max(0,P.shake-dt*2.5);camera.position.x+=(Math.random()-.5)*P.shake;camera.position.y+=(Math.random()-.5)*P.shake*.55}if(P.hitFlash>0){P.hitFlash-=dt;if(P.hitFlash<=0)overlay.style.background='rgba(170,30,18,0)'}}
  function tick(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;const t=now/1000;animatePlayer(t);if(typeof followers!=='undefined')for(const e of followers)animateHumanoid(e,t);if(typeof enemies!=='undefined'){for(const e of enemies){animateHumanoid(e,t);if(e.alive&&e.mesh.position.distanceTo(player.mesh.position)<28)updateBar(e,healthBar(e))}}cleanupBars();P.target=nearestHostile();cross.style.borderColor=P.target?'rgba(255,116,84,.9)':'rgba(255,235,190,.55)';cross.style.transform=P.target?'scale(1.35)':'scale(1)';updateRings(dt);adaptive(dt);cameraFX(dt);requestAnimationFrame(tick)}
  requestAnimationFrame(tick);
  window.WildernessPolish=P;
})();