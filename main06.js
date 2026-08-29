// Wilderness 3.1 gameplay overhaul phase 2 — startup-safe
document.title='Wilderness — 3.1';
const startupTitle07=document.querySelector('#startup strong');if(startupTitle07)startupTitle07.textContent='WILDERNESS 3.1';
function player06(){try{return player}catch(_){return null}}
let lifeChunk06='';
function ensureLife06(){const p=player06();if(!p?.mesh||typeof L06==='undefined'||L06.caveMode)return;const cx=Math.floor(p.mesh.position.x/W.CHUNK_SIZE),cz=Math.floor(p.mesh.position.z/W.CHUNK_SIZE),k=`${cx},${cz}`;if(k===lifeChunk06)return;lifeChunk06=k;const r=isMobile?1:2;for(let x=-r;x<=r;x++)for(let z=-r;z<=r;z++){spawnCaravan06(cx+x,cz+z);spawnBanditCamp06(cx+x,cz+z)}}
const interactPre06=interact;interact=function(){if(typeof L06!=='undefined'&&L06.caveMode){const i=L06.caveMode.i;if(pd06(i.bx,i.bz+23)<6)return leaveCave06()}else{if(typeof nearCaravan06==='function'&&nearCaravan06(8.5))return openTrade06();const c=typeof nearCave06==='function'?nearCave06(6.5):null;if(c)return enterCave06(c)}interactPre06()};
const uiPre06=updateUI;updateUI=function(){uiPre06();stats.innerHTML=stats.innerHTML.replace(/WILDERNESS · [0-9.]+/,'WILDERNESS · 3.1');if(typeof L06!=='undefined'){stats.innerHTML+=`<br>Séqueles: ${L06.eco.shekels} · Comida: ${L06.eco.food} · Agua: ${L06.eco.water}`;if(L06.caveMode)stats.innerHTML+='<br><b>Ubicación: CUEVA</b>'}if(typeof updateTradeButton06==='function')updateTradeButton06()};
const clock06=new THREE.Clock();
function loop06(){requestAnimationFrame(loop06);const p=player06();if(!p?.mesh)return;const dt=Math.min(clock06.getDelta(),.05);ensureLife06();if(typeof updateCaravans06==='function')updateCaravans06(dt);if(typeof updateBandits06==='function')updateBandits06();if(typeof updateCave06==='function')updateCave06()}
requestAnimationFrame(loop06);
function loadModule08(src){return new Promise((ok,bad)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>bad(new Error('No se pudo cargar '+src));document.body.appendChild(s)})}
async function startLateSystems(){try{for(const f of ['kingdoms07','settlement08','society09','release10','polish11','world12','siege13','field14','characters15','animations16','tactics17','citylife18','audio19','stability20','combat21','combatAI22','siege23','kingdom24','campaign25','interface30'])await loadModule08(f+'.js?v=311');flash('Wilderness 3.1 · Movimiento fluido, pendientes y cámara contextual activados.',5200)}catch(e){console.warn(e);flash('3.1 no pudo iniciar uno de los sistemas avanzados.',3500)}}
startLateSystems();