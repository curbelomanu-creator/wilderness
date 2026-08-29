// Wilderness 5.10.3 - faction-safe respawn, manual snapshots and subtle OPTIONS menu
(()=>{
const W=window.WildernessWorld,N=window.WildernessNations50,C51=window.WildernessChooseNation51;
if(!W||!N||!C51||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const O={open:false,protectedUntil:0,friendlyGuards:new Set(),lastGuardSync:0,manualKey:`wildernessManual:${W.seedToken}`};
function flashO(t,m=2200){if(typeof flash==='function')flash(t,m)}
function capital(){return N.capitalFor?.(N.state.nation)||null}
function faction(){return N.faction?.(N.state.nation)||null}
function guardFaction(e){const h=e?.home,d=h?.def||h?.definition||h?.source||h;return d?.faction||d?.nation||h?.faction||h?.nation||window.WildernessHistorical52?.territoryAt?.(h?.x,h?.z)||null}
function relationFriendly(fid){if(!fid)return false;const r=N.relationTo?.(fid);return r==='own'||r==='ally'||r==='friendly'||r==='neutral'}
function syncFriendlyGuards(now=performance.now()){
 if(now-O.lastGuardSync<350||typeof enemies==='undefined')return;O.lastGuardSync=now;
 for(let i=enemies.length-1;i>=0;i--){const e=enemies[i];if(!e?.alive||e.type==='lion')continue;const fid=guardFaction(e);if(fid&&relationFriendly(fid)){enemies.splice(i,1);O.friendlyGuards.add(e);e.enemy=false;e.__friendlyGuard5103=true}}
 for(const e of [...O.friendlyGuards]){if(!e?.alive){O.friendlyGuards.delete(e);continue}const fid=guardFaction(e);if(fid&&!relationFriendly(fid)){e.enemy=true;e.__friendlyGuard5103=false;if(!enemies.includes(e))enemies.push(e);O.friendlyGuards.delete(e)}}
}
function unmountForRespawn(){try{if(typeof mounted!=='undefined'&&mounted){mounted=false;if(typeof mount!=='undefined')mount=null}if(typeof mobileMove!=='undefined'){mobileMove.x=0;mobileMove.z=0;mobileMove.run=false}}catch(_){}}
function respawnCapital(){
 if(!N.state.selected||!N.state.nation){closeOptions();C51.open();return false}
 unmountForRespawn();
 const G=window.WildernessGameplay31;if(G)G.dead=false;
 player.alive=true;player.hp=player.maxHp;player.mesh.rotation.z=0;if(player.actor)player.actor.rotation.set(0,0,0);
 const result=C51.placeAtCapital?.(N.state.nation)||N.spawnAtCapital?.();
 if(G?.lastSafe?.copy)G.lastSafe.copy(player.mesh.position);
 O.protectedUntil=performance.now()+6500;
 if(typeof projectiles!=='undefined')for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];if(p?.target===player){try{scene.remove(p.mesh)}catch(_){}projectiles.splice(i,1)}}
 const death=document.getElementById('death31');if(death)death.style.display='none';
 window.WildernessStability5101?.markCombat?.();syncFriendlyGuards(performance.now()+1000);
 N.save?.();window.WildernessRelease?.save?.(false);window.WildernessConquest510?.save?.();
 const c=capital();flashO(`Reapareciste en ${c?.name||'la capital de tu facción'}. Protección temporal activa.`,3600);return!!result
}
// Final respawn protection. Later wrappers still call through this function.
if(typeof damage==='function'){const baseDamage=damage;damage=function(e,amount){if(e===player&&performance.now()<O.protectedUntil)return;return baseDamage(e,amount)}}
function patchDeath(){const death=document.getElementById('death31'),b=death?.querySelector('#restart31');if(!death||!b)return;b.textContent='REAPARECER EN MI CAPITAL';const info=death.querySelector('div>div:nth-child(2)');if(info)info.textContent='Reaparecerás en la capital de tu facción sin perder el mundo ni tu progreso.';b.onclick=respawnCapital}
function flushWorld(){try{N.save?.();window.WildernessRelease?.save?.(false);window.WildernessConquest510?.save?.();window.dispatchEvent(new Event('pagehide'))}catch(e){console.warn('options5103 flush',e)}}
function worldKeys(){const out=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||k===O.manualKey)continue;if(k.startsWith('wilderness')&&k.includes(String(W.seedToken)))out.push(k)}return out}
function manualSave(){try{flushWorld();const entries={};for(const k of worldKeys())entries[k]=localStorage.getItem(k);const snap={version:'5.10.3',seed:W.seedToken,at:Date.now(),entries};localStorage.setItem(O.manualKey,JSON.stringify(snap));flashO('Partida guardada manualmente.',2200);renderInfo();return true}catch(e){console.warn('manual save',e);flashO('No se pudo guardar la partida.',2200);return false}}
function manualLoad(){try{const raw=localStorage.getItem(O.manualKey);if(!raw){flashO('No hay guardado manual. Cargando el autosave…',1800);setTimeout(()=>location.reload(),350);return true}const snap=JSON.parse(raw);if(!snap?.entries)return false;for(const k of worldKeys())localStorage.removeItem(k);for(const[k,v]of Object.entries(snap.entries))if(v!==null)localStorage.setItem(k,v);location.reload();return true}catch(e){console.warn('manual load',e);flashO('No se pudo cargar la partida.',2200);return false}}
function resetWorld(){try{const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('wilderness')&&k.includes(String(W.seedToken)))keys.push(k)}for(const k of keys)localStorage.removeItem(k);location.reload()}catch(e){console.warn('reset world',e)}}
const btn=document.createElement('button');btn.id='options5103btn';btn.textContent='OPTIONS';document.body.appendChild(btn);
const modal=document.createElement('div');modal.id='options5103modal';modal.innerHTML=`<div id="options5103card"><div class="o5103head"><small>WILDERNESS 5.10.3</small><h2>OPTIONS</h2><div id="options5103info"></div></div><div class="o5103grid"><button data-a="continue">CONTINUAR</button><button data-a="respawn">REAPARECER EN CAPITAL</button><button data-a="save">GUARDAR PARTIDA</button><button data-a="load">CARGAR PARTIDA</button><button data-a="faction">CAMBIAR FACCIÓN</button><button data-a="new">CREAR NUEVO MUNDO</button><button class="danger" data-a="reset">REINICIAR MUNDO</button></div></div>`;document.body.appendChild(modal);
const css=document.createElement('style');css.textContent=`#options5103btn{position:fixed;z-index:87;right:calc(12px + env(safe-area-inset-right,0px));top:calc(88px + env(safe-area-inset-top,0px));border:1px solid #d7bd8a66;border-radius:7px;background:#1711088c;color:#e7d3aa;padding:5px 7px;font:700 7px ui-monospace,monospace;letter-spacing:.08em;opacity:.62;pointer-events:auto;touch-action:manipulation}#options5103btn:hover{opacity:1}#options5103modal{display:none;position:fixed;z-index:230;inset:0;background:#080604d9;align-items:center;justify-content:center;padding:16px;pointer-events:auto;color:#f2e2c1;text-shadow:none}#options5103modal.open{display:flex}#options5103card{width:min(92vw,430px);background:#21160eea;border:1px solid #d7b576;border-radius:12px;padding:16px;box-shadow:0 18px 60px #000b}#options5103card h2{margin:3px 0 7px;color:#fff0bd;font:900 19px ui-monospace,monospace;letter-spacing:.10em}.o5103head{text-align:center}.o5103head small{font:700 7px ui-monospace,monospace;color:#cfae72;letter-spacing:.12em}#options5103info{font:8px/1.4 ui-monospace,monospace;opacity:.82;margin-bottom:11px}.o5103grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}.o5103grid button{min-height:42px;border:1px solid #b99760;border-radius:7px;background:#49311d;color:#fff0cf;padding:8px;font:800 8px ui-monospace,monospace;touch-action:manipulation}.o5103grid button.danger{grid-column:1/-1;background:#512720;border-color:#9c5b4e}@media(pointer:coarse),(max-width:820px){#options5103btn{top:calc(10px + env(safe-area-inset-top,0px));right:calc(154px + env(safe-area-inset-right,0px));font-size:6px;padding:6px;opacity:.72}#options5103card{width:min(94vw,390px);padding:12px}.o5103grid button{font-size:7px;min-height:40px}}`;document.head.appendChild(css);
const info=modal.querySelector('#options5103info');
function renderInfo(){const f=faction(),c=capital();let when='Sin guardado manual';try{const s=JSON.parse(localStorage.getItem(O.manualKey)||'null');if(s?.at)when='Guardado: '+new Date(s.at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}catch(_){}info.innerHTML=`${f?`<b>${f.display}</b> · Capital: ${c?.name||f.capital}`:'Sin facción seleccionada'}<br>${when} · Semilla: ${W.seedToken}`}
function openOptions(){O.open=true;window.WildernessOptionsOpen=true;modal.classList.add('open');if(typeof mobileMove!=='undefined'){mobileMove.x=0;mobileMove.z=0;mobileMove.run=false}document.exitPointerLock?.();renderInfo()}
function closeOptions(){O.open=false;window.WildernessOptionsOpen=false;modal.classList.remove('open')}
btn.onpointerdown=e=>{e.preventDefault();e.stopPropagation();openOptions()};
modal.addEventListener('pointerdown',e=>{if(e.target===modal)closeOptions()});
let confirmAction=null,confirmTimer=0;function confirm(btnEl,name,fn){const now=Date.now();if(confirmAction===name&&now<confirmTimer){confirmAction=null;fn();return}confirmAction=name;confirmTimer=now+3500;const old=btnEl.textContent;btnEl.textContent='TOCA OTRA VEZ PARA CONFIRMAR';setTimeout(()=>{if(confirmAction===name){confirmAction=null;btnEl.textContent=old}},3600)}
modal.querySelectorAll('button[data-a]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();e.stopPropagation();const a=b.dataset.a;if(a==='continue')return closeOptions();if(a==='respawn'){closeOptions();return respawnCapital()}if(a==='save')return manualSave();if(a==='load')return confirm(b,'load',manualLoad);if(a==='faction')return confirm(b,'faction',()=>{closeOptions();C51.open()});if(a==='new'){closeOptions();return document.getElementById('world-button')?.click()}if(a==='reset')return confirm(b,'reset',resetWorld)});
addEventListener('keydown',e=>{if(e.code==='Escape'&&O.open){e.preventDefault();closeOptions()}else if(e.code==='KeyO'&&!e.repeat&&!window.WildernessNationSelectionOpen){e.preventDefault();O.open?closeOptions():openOptions()}},true);
// Pause core actions while OPTIONS is open.
if(typeof updatePlayer==='function'){const base=updatePlayer;updatePlayer=function(dt){if(O.open)return;return base(dt)}}
if(typeof updateEnemies==='function'){const base=updateEnemies;updateEnemies=function(dt){syncFriendlyGuards();if(O.open)return;return base(dt)}}
if(typeof playerAttack==='function'){const base=playerAttack;playerAttack=function(...a){if(O.open)return;return base(...a)}}
if(typeof interact==='function'){const base=interact;interact=function(...a){if(O.open)return;return base(...a)}}
let lastPatch=0;function loop(now){if(now-lastPatch>450){lastPatch=now;patchDeath();syncFriendlyGuards(now)}requestAnimationFrame(loop)}patchDeath();syncFriendlyGuards(performance.now()+1000);requestAnimationFrame(loop);
window.WildernessOptions5103={state:O,open:openOptions,close:closeOptions,respawnCapital,manualSave,manualLoad,resetWorld,syncFriendlyGuards};
})();