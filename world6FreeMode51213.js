// Wilderness 5.12.13 — free-flight exploration mode for desktop + mobile
(()=>{
  if(window.Wilderness6FreeMode51213)return;
  const T=window.THREE,W=window.WildernessWorld;
  if(!T||!W||typeof player==='undefined'||typeof updatePlayer!=='function')return;
  const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
  const S={active:false,vertical:0,turbo:false,normalSpeed:mobile?82:105,turboSpeed:mobile?230:290};
  const baseUpdate=updatePlayer;
  const vForward=new T.Vector3(),vRight=new T.Vector3(),vDir=new T.Vector3(),vTarget=new T.Vector3(),vOffset=new T.Vector3();

  function resetJump(){try{const j=window.WildernessControls46?.state;if(j){j.y=0;j.vy=0;j.grounded=true}}catch(_){ }}
  function dismount(){
    try{
      if(typeof mounted!=='undefined'&&mounted&&typeof mount!=='undefined'&&mount?.mesh){
        mount.mesh.position.copy(player.mesh.position);mount.mesh.position.x+=2;mount.mesh.position.y=W.groundY(mount.mesh.position.x,mount.mesh.position.z);
        mounted=false;mount=null;
      }
    }catch(_){ }
  }
  function setPad(active){
    if(!mobile)return;
    const tri=document.getElementById('ps46-tri'),sq=document.getElementById('ps46-square'),x=document.getElementById('ps46-x'),circle=document.getElementById('ps46-circle');
    if(tri){tri.textContent=active?'↑':'△';tri.setAttribute('aria-label',active?'Subir':'Acción')}
    if(x){x.textContent=active?'↓':'×';x.setAttribute('aria-label',active?'Bajar':'Saltar')}
    if(sq){sq.textContent=active?'»':'□';sq.setAttribute('aria-label',active?'Vuelo rápido':'Atacar')}
    if(circle)circle.style.opacity=active?'.45':'';
  }
  function menuButton(){return document.getElementById('w51213free')}
  function renderButton(){const b=menuButton();if(b){b.textContent=S.active?'SALIR MODO LIBRE':'MODO LIBRE';b.classList.toggle('active',S.active)}}
  function toggle(force){
    const on=typeof force==='boolean'?force:!S.active;if(on===S.active)return S.active;
    S.active=on;S.vertical=0;S.turbo=false;resetJump();
    if(on){dismount();const gy=W.groundY(player.mesh.position.x,player.mesh.position.z);player.mesh.position.y=Math.max(player.mesh.position.y,gy+7);document.body.classList.add('w51213-free');if(typeof flash==='function')flash('MODO LIBRE · vuela y recorre el mapa sin colisiones.',2600)}
    else{document.body.classList.remove('w51213-free');player.mesh.position.y=W.groundY(player.mesh.position.x,player.mesh.position.z);resetJump();try{window.WildernessCollision45?.rebuild?.(true)}catch(_){ }if(typeof flash==='function')flash('Modo libre desactivado.',1400)}
    setPad(on);renderButton();return S.active;
  }

  updatePlayer=function(dt){
    if(!S.active)return baseUpdate(dt);
    if(window.WildernessNationSelectionOpen||window.WildernessOptionsOpen)return;
    let x=((typeof keys!=='undefined'&&keys.KeyD)?1:0)-((typeof keys!=='undefined'&&keys.KeyA)?1:0)+(typeof mobileMove!=='undefined'?(mobileMove.x||0):0);
    let z=((typeof keys!=='undefined'&&keys.KeyW)?1:0)-((typeof keys!=='undefined'&&keys.KeyS)?1:0)-(typeof mobileMove!=='undefined'?(mobileMove.z||0):0);
    const len=Math.hypot(x,z);if(len>1){x/=len;z/=len}
    const fast=S.turbo||(typeof keys!=='undefined'&&(keys.ControlLeft||keys.ControlRight));
    const speed=fast?S.turboSpeed:S.normalSpeed;
    vForward.set(-Math.sin(camYaw),0,-Math.cos(camYaw));vRight.set(-vForward.z,0,vForward.x);vDir.copy(vForward).multiplyScalar(z).addScaledVector(vRight,x);
    if(vDir.lengthSq()>0){vDir.normalize();player.mesh.position.addScaledVector(vDir,speed*dt);player.mesh.rotation.y=Math.atan2(vDir.x,vDir.z)}
    const up=((typeof keys!=='undefined'&&keys.Space)?1:0)-((typeof keys!=='undefined'&&(keys.ShiftLeft||keys.ShiftRight))?1:0)+S.vertical;
    if(up)player.mesh.position.y+=up*speed*.72*dt;
    const floor=W.groundY(player.mesh.position.x,player.mesh.position.z)+1.4;if(player.mesh.position.y<floor)player.mesh.position.y=floor;
    try{updateChunks()}catch(_){ }
    vTarget.copy(player.mesh.position).add(new T.Vector3(0,2.15,0));const distance=11,horizontal=Math.cos(camPitch)*distance;
    vOffset.set(Math.sin(camYaw)*horizontal,Math.sin(camPitch)*distance+1.8,Math.cos(camYaw)*horizontal);
    const desired=vTarget.clone().add(vOffset);camera.position.lerp(desired,1-Math.pow(.0001,dt));camera.lookAt(vTarget);
  };

  function installMenu(){
    const sheet=document.getElementById('w5128sheet');if(!sheet||menuButton())return false;
    const b=document.createElement('button');b.id='w51213free';b.className='w51212-extra';b.textContent='MODO LIBRE';
    b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopImmediatePropagation();document.getElementById('w5128menu')?.classList.remove('open');toggle()},{capture:true});sheet.appendChild(b);renderButton();return true;
  }
  installMenu();const menuPoll=setInterval(()=>{if(installMenu())clearInterval(menuPoll)},400);setTimeout(()=>clearInterval(menuPoll),12000);

  function hold(id,value,type){const b=document.getElementById(id);if(!b)return;
    b.addEventListener('pointerdown',e=>{if(!S.active)return;e.preventDefault();e.stopImmediatePropagation();try{b.setPointerCapture(e.pointerId)}catch(_){ }if(type==='vertical')S.vertical=value;else S.turbo=true},{capture:true});
    const off=e=>{if(!S.active)return;e.preventDefault();e.stopImmediatePropagation();if(type==='vertical'&&S.vertical===value)S.vertical=0;else if(type==='turbo')S.turbo=false};
    for(const ev of['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,off,{capture:true});
  }
  if(mobile){setTimeout(()=>{hold('ps46-tri',1,'vertical');hold('ps46-x',-1,'vertical');hold('ps46-square',1,'turbo')},0)}
  addEventListener('blur',()=>{S.vertical=0;S.turbo=false});
  addEventListener('keydown',e=>{if(!S.active)return;if(['Space','ShiftLeft','ShiftRight','ControlLeft','ControlRight'].includes(e.code)){e.preventDefault()}},true);

  const style=document.createElement('style');style.textContent=`#w51213free.active{border-color:#8fc7d8!important;background:#21414b!important;color:#e8fbff!important}body.w51213-free #w3context{opacity:0!important}`;document.head.appendChild(style);
  window.Wilderness6FreeMode51213=Object.freeze({version:'5.12.13',state:S,toggle});
})();
