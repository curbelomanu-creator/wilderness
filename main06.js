// Wilderness 0.6 integration
document.title='Wilderness — 0.6';
let lifeChunk06='';
function ensureLife06(){if(L06.caveMode)return;const cx=Math.floor(player.mesh.position.x/W.CHUNK_SIZE),cz=Math.floor(player.mesh.position.z/W.CHUNK_SIZE),k=`${cx},${cz}`;if(k===lifeChunk06)return;lifeChunk06=k;const r=isMobile?1:2;for(let x=-r;x<=r;x++)for(let z=-r;z<=r;z++){spawnCaravan06(cx+x,cz+z);spawnBanditCamp06(cx+x,cz+z)}}
const interactPre06=interact;interact=function(){if(L06.caveMode){const i=L06.caveMode.i;if(pd06(i.bx,i.bz+23)<6)return leaveCave06()}else{if(nearCaravan06(8.5))return openTrade06();const c=nearCave06(6.5);if(c)return enterCave06(c)}interactPre06()};
const uiPre06=updateUI;updateUI=function(){uiPre06();stats.innerHTML=stats.innerHTML.replace('WILDERNESS · 0.5','WILDERNESS · 0.6');stats.innerHTML+=`<br>Séqueles: ${L06.eco.shekels} · Comida: ${L06.eco.food} · Agua: ${L06.eco.water}`;if(L06.caveMode)stats.innerHTML+='<br><b>Ubicación: CUEVA</b>';updateTradeButton06()};
const clock06=new THREE.Clock();function loop06(){requestAnimationFrame(loop06);const dt=Math.min(clock06.getDelta(),.05);ensureLife06();updateCaravans06(dt);updateBandits06();updateCave06()}loop06();
flash('Wilderness 0.6 · Caravanas, comercio, bandidos y cuevas explorables.',5000);