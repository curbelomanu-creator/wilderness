// Wilderness 5.5 - diplomacy, animated gates, city alert states and siege intent
(()=>{
const T=window.THREE,W=window.WildernessWorld,N=window.WildernessNations50,H=window.WildernessHistorical52,J=window.WildernessJerusalem54;
if(!T||!W||!N||typeof scene==='undefined'||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const KEY=`wilderness55:${W.seedToken}`;
const D={gates:new Map(),settlements:new Map(),sieges:new Set(),near:null,lastAlert:null};
const walledKinds=new Set(['fortified_village','caravan_city','oasis_trade_city','inland_walled_city','royal_capital']);
const matWood=new T.MeshLambertMaterial({color:0x4b3021,flatShading:true});
const matIron=new T.MeshLambertMaterial({color:0x302b27,flatShading:true});
function save(){try{localStorage.setItem(KEY,JSON.stringify({sieges:[...D.sieges]}))}catch(_){}}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x?.sieges)for(const id of x.sieges)D.sieges.add(id)}catch(_){}}
load();addEventListener('pagehide',save);
function rel(f){return f?N.relationTo(f):'neutral'}
function relLabel(r){return({own:'PROPIA',ally:'ALIADA',friendly:'AMISTOSA',neutral:'NEUTRAL',hostile:'HOSTIL',war:'EN GUERRA'})[r]||String(r||'neutral').toUpperCase()}
function factionName(id){return N.faction(id)?.display||id||'Territorio independiente'}
function kingName(id){return N.faction(id)?.king||'—'}
function defOf(rt){return rt?.def||rt?.definition||rt?.source||rt}
function gateRadius(d,kind){if(d?.special==='jerusalem')return 106;if(kind==='royal_capital')return 34;if(kind==='fortified_village')return 24;return 31}
function doorPair(id,x,z,rot=0,label='Puerta'){
  const root=new T.Group();root.name=`diplomacy55-gate-${id}`;root.position.set(x,W.groundY(x,z),z);root.rotation.y=rot;root.userData.gate55=true;scene.add(root);
  const h=5.9,half=3.75,th=.34;
  const left=new T.Group(),right=new T.Group();left.position.x=-half;right.position.x=half;root.add(left,right);
  const l=new T.Mesh(new T.BoxGeometry(half,h,th),matWood),r=new T.Mesh(new T.BoxGeometry(half,h,th),matWood);
  l.position.set(half/2,h/2,0);r.position.set(-half/2,h/2,0);l.castShadow=r.castShadow=!mobile;l.receiveShadow=r.receiveShadow=true;left.add(l);right.add(r);
  for(const leaf of[l,r])for(let y=.8;y<h;y+=1.25){const band=new T.Mesh(new T.BoxGeometry(half+.08,.12,th+.08),matIron);band.position.y=y-h/2;leaf.add(band)}
  const g={id,label,root,left,right,openAmount:1,targetOpen:1,state:'open',settlementId:null,faction:null};D.gates.set(id,g);return g
}
function ensureJerusalem(){if(!J?.gates?.length)return;for(let i=0;i<J.gates.length;i++){const a=J.gates[i],id=`hist-jerusalem:${i}`;if(D.gates.has(id))continue;const g=doorPair(id,a.x,a.z,a.rot||0,a.name||`Puerta ${i+1}`);g.settlementId='hist-jerusalem';g.faction='judah'} }
function settlementGateData(rt){const d=defOf(rt);if(!d?.id||d.id==='hist-jerusalem')return null;const kind=rt?.settlementKind||d.settlementKind||window.WildernessSettlement46?.state?.types?.get?.(d.id);if(!walledKinds.has(kind))return null;const r=gateRadius(d,kind);return{d,kind,x:d.x,z:d.z+r,rot:0}}
function ensureSettlementGate(rt){const data=settlementGateData(rt);if(!data)return;const {d,x,z,rot}=data,id=`${d.id}:main`;if(D.gates.has(id))return;const g=doorPair(id,x,z,rot,`Puerta de ${d.name||'la ciudad'}`);g.settlementId=d.id;g.faction=d.faction||d.nation||rt.faction||rt.nation||null;D.settlements.set(d.id,rt)}
function targetForGate(g){const r=rel(g.faction),siege=D.sieges.has(g.settlementId);if(siege||r==='war'||r==='hostile')return 0;return 1}
function animateGate(g,dt){g.targetOpen=targetForGate(g);const speed=1.65,delta=g.targetOpen-g.openAmount;if(Math.abs(delta)<.006)g.openAmount=g.targetOpen;else g.openAmount+=Math.sign(delta)*Math.min(Math.abs(delta),speed*dt);const a=g.openAmount*1.42;g.left.rotation.y=-a;g.right.rotation.y=a;g.state=g.openAmount>.96?'open':g.openAmount<.04?'closed':g.targetOpen?'opening':'closing';g.root.userData.gateState=g.state}
function nearestSettlement(max=220){const px=player.mesh.position.x,pz=player.mesh.position.z;let best=null,bd=max;const defs=W.settlementsNearBounds?.(px-max,px+max,pz-max,pz+max,12)||[];for(const s of defs){const d=Math.hypot(px-s.x,pz-s.z);if(d<bd){bd=d;best=s}}return best?{s:best,d:bd}:null}
function runtimeFor(id){return typeof generatedSettlements!=='undefined'?generatedSettlements.get(id):null}
function syncAlert(near){if(!near)return;const s=near.s,rt=runtimeFor(s.id),r=rel(s.faction||s.nation),siege=D.sieges.has(s.id),alert=siege||r==='war'||r==='hostile';s.gateState=alert?'closed':'open';s.alertState=siege?'siege':alert?'alert':'peace';if(rt){rt.gateState=s.gateState;rt.alertState=s.alertState;rt.siegeActive=siege}if(alert&&near.d<145&&D.lastAlert!==s.id){D.lastAlert=s.id;if(typeof flash==='function')flash(`${s.name}: los vigías dan la alarma y cierran las puertas.`,2600)}if(!alert&&D.lastAlert===s.id)D.lastAlert=null}
const panel=document.createElement('div');panel.id='diplomacy55';panel.innerHTML='<div id="d55info"></div><button id="d55siege">INICIAR ASEDIO</button>';document.body.appendChild(panel);
const css=document.createElement('style');css.textContent=`#diplomacy55{display:none;position:fixed;z-index:95;left:50%;top:calc(12px + env(safe-area-inset-top,0px));transform:translateX(-50%);min-width:250px;max-width:min(88vw,390px);padding:9px 10px;border:1px solid #d8ba8199;border-radius:10px;background:#171108e8;color:#f7e8c7;text-align:center;font:9px/1.38 ui-monospace,monospace;text-shadow:0 1px 2px #000;pointer-events:auto}#diplomacy55 b{color:#fff1bc}#d55siege{display:none;margin:7px auto 0;border:1px solid #d38a6c;border-radius:8px;background:#632e24;color:#ffe6cf;padding:7px 12px;font:900 8px ui-monospace,monospace;touch-action:manipulation}#d55siege.active{display:block}@media(pointer:coarse),(max-width:820px){#diplomacy55{top:calc(44px + env(safe-area-inset-top,0px));min-width:205px;max-width:72vw;padding:6px 8px;font-size:7px}#d55siege{font-size:7px;padding:7px 10px}}`;document.head.appendChild(css);
const info=panel.querySelector('#d55info'),siegeBtn=panel.querySelector('#d55siege');
function gateStatusFor(id){const gs=[...D.gates.values()].filter(g=>g.settlementId===id);if(!gs.length)return null;if(gs.some(g=>g.state==='closing'))return'CERRÁNDOSE';if(gs.every(g=>g.state==='closed'))return'CERRADA';if(gs.some(g=>g.state==='opening'))return'ABRIÉNDOSE';return'ABIERTA'}
function render(near){const old=document.getElementById('historical52card');if(old)old.style.display='none';if(!near){panel.style.display='none';D.near=null;return}const s=near.s,f=s.faction||s.nation,r=rel(f),gate=gateStatusFor(s.id),active=D.sieges.has(s.id),canSiege=near.d<110&&f&&f!==N.state.nation&&(r==='hostile'||r==='war');D.near=near;info.innerHTML=`<b style="font-size:1.13em">${String(s.name||'ASENTAMIENTO').toUpperCase()}</b><br>${factionName(f)} · Rey: <b>${kingName(f)}</b><br>Relación: <b>${relLabel(r)}</b>${gate?` · Puerta: <b>${gate}</b>`:''}<br><span style="opacity:.7">${s.capital?'CAPITAL · ':''}${Math.round(near.d)} m${active?' · ASEDIO ACTIVO':''}</span>`;siegeBtn.classList.toggle('active',canSiege&&!active);siegeBtn.textContent=active?'ASEDIO ACTIVO':'INICIAR ASEDIO';panel.style.display='block'}
function beginSiege(s){if(!s)return false;const f=s.faction||s.nation,r=rel(f);if(!f||f===N.state.nation||!(r==='hostile'||r==='war'))return false;D.sieges.add(s.id);N.setRelation(f,'war');const rt=runtimeFor(s.id);if(rt){rt.siegeActive=true;rt.alertState='siege';rt.gateState='closed'}s.siegeActive=true;s.alertState='siege';s.gateState='closed';save();window.WildernessSiegeIntent55={settlement:s,faction:f,startedAt:Date.now()};if(typeof flash==='function')flash(`ASEDIO INICIADO · ${s.name} · ${factionName(f)}`,3400);return true}
siegeBtn.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();const s=D.near?.s;if(beginSiege(s)){siegeBtn.classList.remove('active')}},{passive:false});
function cancelSiege(id){D.sieges.delete(id);const rt=runtimeFor(id);if(rt){rt.siegeActive=false;rt.alertState='alert'}save()}
let last=performance.now(),scan=0;function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;try{ensureJerusalem();if(typeof generatedSettlements!=='undefined')for(const rt of generatedSettlements.values())ensureSettlementGate(rt);for(const g of D.gates.values())animateGate(g,dt);scan+=dt;if(scan>.24){scan=0;const n=nearestSettlement();syncAlert(n);render(n)}}catch(e){console.warn('Wilderness 5.5 diplomacy',e)}requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessDiplomacy55={state:D,beginSiege,cancelSiege,relation:rel,relationLabel:relLabel,nearestSettlement,gateStatusFor};
})();