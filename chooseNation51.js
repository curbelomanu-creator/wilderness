// Wilderness 5.1 - mandatory nation selection and safe capital spawn
(()=>{
const W=window.WildernessWorld,N=window.WildernessNations50;if(!W||!N||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const descriptions={
 israel:'Reino del norte · colinas fértiles y ciudades fortificadas',
 judah:'Reino del sur · montañas, Jerusalén y el Templo',
 philistia:'Pentápolis costera · comercio y poder militar',
 moab:'Mesetas orientales · pastoreo y fortalezas',
 edom:'Montañas del sur · caravanas y fortalezas del desierto',
 ammon:'Tierras altas orientales · ciudades amuralladas',
 aram:'Aram-Damasco · comercio, caballería y grandes ciudades',
 phoenicia:'Ciudades marítimas · puertos, comercio y navegación',
 neo_hittite:'Reinos del norte · ciudadelas y arquitectura monumental'
};
const S={open:false,chosen:null,placing:false};
function safeSpot(f,c){
 const sx=f.spawn?.x??c.x,sz=f.spawn?.z??c.z,candidates=[{x:sx,z:sz,r:0}];
 for(let r=8;r<=80;r+=8)for(let i=0;i<16;i++){const a=i*Math.PI/8;candidates.push({x:sx+Math.cos(a)*r,z:sz+Math.sin(a)*r,r})}
 let best=null,score=Infinity;
 for(const p of candidates){
   const b=W.biomeAt?.(p.x,p.z),s=W.slopeAt?.(p.x,p.z)??0;
   if(W.deepWaterAt?.(p.x,p.z)||W.waterAt?.(p.x,p.z)||W.riverAt?.(p.x,p.z)||b==='sea'||b==='mountain'||s>.34)continue;
   const q=p.r+s*42+(W.coastAt?.(p.x,p.z)?5:0)-(W.roadAt?.(p.x,p.z)?2:0);
   if(q<score){score=q;best=p}
 }
 return best||{x:sx,z:sz};
}
function placeAtCapital(id){const f=N.faction(id),c=N.capitalFor(id);if(!f||!c)return false;const p=safeSpot(f,c),y=W.groundY(p.x,p.z);player.mesh.position.set(p.x,y,p.z);if(typeof mounted!=='undefined'&&mounted&&typeof mount!=='undefined'&&mount?.mesh)mount.mesh.position.set(p.x,y,p.z);if(typeof updateChunks==='function')updateChunks(true);return{f,c,p}}
function waitRelease(){return new Promise(resolve=>{let n=0;const step=()=>{if(window.WildernessRelease?.state?.ready||n++>30)return resolve();setTimeout(step,80)};step()})}
const overlay=document.createElement('div');overlay.id='nation51';overlay.innerHTML='<div id="nation51card"><div class="n51head"><small>WILDERNESS 5.1</small><h1>ESCOGE TU NACIÓN</h1><p>Tu elección determina tu capital, rey y relaciones iniciales. Comenzarás dentro de la capital de tu pueblo.</p></div><div id="nation51grid"></div><div id="nation51choice">Selecciona una nación para comenzar.</div><button id="nation51start" disabled>SELECCIONA UNA NACIÓN</button></div>';document.body.appendChild(overlay);
const style=document.createElement('style');style.textContent=`#nation51{display:none;position:fixed;z-index:170;inset:0;background:radial-gradient(circle at 50% 25%,#3b2a19 0,#171108 54%,#090604 100%);color:#f5e7c7;align-items:center;justify-content:center;padding:calc(14px + env(safe-area-inset-top,0px)) calc(14px + env(safe-area-inset-right,0px)) calc(14px + env(safe-area-inset-bottom,0px)) calc(14px + env(safe-area-inset-left,0px));pointer-events:auto;text-shadow:none;overflow:auto}#nation51.open{display:flex}#nation51card{width:min(960px,96vw);max-height:94dvh;overflow:auto;border:2px solid #d8b878;background:#1e150edb;box-shadow:0 18px 70px #000b;border-radius:15px;padding:18px}#nation51 .n51head{text-align:center;max-width:700px;margin:0 auto 14px}#nation51 .n51head small{color:#d7b778;font:800 9px ui-monospace,monospace;letter-spacing:.18em}#nation51 h1{margin:5px 0 7px;color:#fff0bd;font:900 23px ui-monospace,monospace;letter-spacing:.08em}#nation51 p{margin:0;opacity:.82;font:11px/1.45 ui-monospace,monospace}#nation51grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}#nation51grid button{position:relative;text-align:left;min-height:104px;border:1px solid #9f845d;border-radius:10px;background:#2a1d12;color:#f5e7c7;padding:12px;touch-action:manipulation}#nation51grid button:before{content:'';position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--nation);border-radius:10px 0 0 10px}#nation51grid button.selected{border-color:#ffe0a1;background:#4a321d;box-shadow:0 0 0 2px #d6b06a44 inset}#nation51grid strong{display:block;color:#fff0bd;font:900 13px ui-monospace,monospace;margin-bottom:5px}#nation51grid span,#nation51grid em{display:block;font:9px/1.35 ui-monospace,monospace;font-style:normal}#nation51grid em{opacity:.67;margin-top:5px}#nation51choice{text-align:center;min-height:32px;padding:10px 4px 5px;color:#e9ce96;font:10px ui-monospace,monospace}#nation51start{display:block;width:min(420px,100%);margin:5px auto 0;border:1px solid #edce91;border-radius:9px;padding:12px;background:#76502c;color:#fff2c8;font:900 11px ui-monospace,monospace;touch-action:manipulation}#nation51start:disabled{opacity:.4}#nation51hud{position:fixed;z-index:72;left:calc(12px + env(safe-area-inset-left,0px));top:calc(48px + env(safe-area-inset-top,0px));color:#e9ce96;background:#171108a8;border-left:3px solid var(--nation);border-radius:0 6px 6px 0;padding:4px 7px;font:800 7px ui-monospace,monospace;pointer-events:none;text-shadow:0 1px 2px #000}@media(pointer:coarse),(max-width:820px){#nation51{align-items:flex-start}#nation51card{padding:12px;width:100%;max-height:none}#nation51 h1{font-size:18px}#nation51 p{font-size:9px}#nation51grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}#nation51grid button{min-height:92px;padding:9px}#nation51grid strong{font-size:10px}#nation51grid span,#nation51grid em{font-size:7px}#nation51hud{left:calc(8px + env(safe-area-inset-left,0px));top:calc(40px + env(safe-area-inset-top,0px));font-size:6px;max-width:50vw}}`;document.head.appendChild(style);
const grid=overlay.querySelector('#nation51grid'),choice=overlay.querySelector('#nation51choice'),start=overlay.querySelector('#nation51start');
function hex(c){return'#'+Number(c||0x8b7657).toString(16).padStart(6,'0')}
for(const f of Object.values(N.factions)){const c=N.capitalFor(f.id),b=document.createElement('button');b.dataset.nation=f.id;b.style.setProperty('--nation',hex(f.color));b.innerHTML=`<strong>${f.label}</strong><span>Capital: ${c?.name||f.capital}</span><span>Rey: ${f.king}</span><em>${descriptions[f.id]||f.display}</em>`;b.addEventListener('pointerdown',e=>{e.preventDefault();select(f.id)},{passive:false});grid.appendChild(b)}
function select(id){if(S.placing)return;S.chosen=id;grid.querySelectorAll('button').forEach(b=>b.classList.toggle('selected',b.dataset.nation===id));const f=N.faction(id),c=N.capitalFor(id);choice.innerHTML=`<b>${f.display}</b> · Rey: ${f.king} · Comenzarás en <b>${c.name}</b>`;start.disabled=false;start.textContent=`COMENZAR EN ${String(c.name).toUpperCase()}`}
function block(e){if(!S.open)return;e.preventDefault();e.stopImmediatePropagation()}
function open(){S.open=true;window.WildernessNationSelectionOpen=true;overlay.classList.add('open');document.exitPointerLock?.();addEventListener('keydown',block,true);addEventListener('keyup',block,true)}
function close(){S.open=false;window.WildernessNationSelectionOpen=false;overlay.classList.remove('open');removeEventListener('keydown',block,true);removeEventListener('keyup',block,true)}
function badge(){document.getElementById('nation51hud')?.remove();if(!N.state.selected)return;const f=N.faction(N.state.nation),c=N.capitalFor(N.state.nation);if(!f)return;const h=document.createElement('div');h.id='nation51hud';h.style.setProperty('--nation',hex(f.color));h.textContent=`${f.label} · ${c?.name||''} · REY ${String(f.king).toUpperCase()}`;document.body.appendChild(h)}
async function begin(){if(!S.chosen||S.placing)return;S.placing=true;start.disabled=true;start.textContent='PREPARANDO CAPITAL…';choice.textContent='Cargando el punto de aparición y restaurando el mundo…';N.chooseNation(S.chosen,{spawn:false});await waitRelease();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const result=placeAtCapital(S.chosen);N.save();window.WildernessRelease?.save?.(false);close();badge();S.placing=false;if(result&&typeof flash==='function')flash(`${result.c.name} · ${result.f.display} · Rey ${result.f.king}`,4300)}
start.addEventListener('pointerdown',e=>{e.preventDefault();begin()},{passive:false});
if(N.state.selected){badge()}else open();
window.WildernessChooseNation51={state:S,open,select,begin,placeAtCapital,safeSpot,badge};
})();