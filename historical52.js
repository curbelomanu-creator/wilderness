// Wilderness 5.2 - historical kingdoms, fixed cities, territories, rulers and city proximity UI
(()=>{
const T=window.THREE,W=window.WildernessWorld,N=window.WildernessNations50;
if(!T||!W||!N||typeof scene==='undefined'||typeof player==='undefined')return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<=820;
const baseGround=W.groundY,baseSettlementDef=W.settlementDef,baseSettlementsNearBounds=W.settlementsNearBounds;
const H={cities:[],byId:new Map(),kings:new Map(),suppressed:new Set(),lastNearby:null};
const coastalIds=new Set(['gaza','ashkelon','ashdod','tyre','sidon','byblos','arwad','sarepta','berytus','elath','eziongeber']);
function safeCandidate(x,z,port=false){
  if(W.deepWaterAt?.(x,z)||W.riverAt?.(x,z))return null;
  const b=W.biomeAt(x,z),s=W.slopeAt?.(x,z)??0;
  if(b==='sea'||b==='mountain'||s>.52)return null;
  let score=s*90+Math.abs(baseGround(x,z))*0.08;
  if(port){if(W.coastAt?.(x,z))score-=38;else score+=18}
  else if(W.coastAt?.(x,z))score+=12;
  return score;
}
function resolveSite(c){
  const port=!!c.port||coastalIds.has(c.id);let best=null;
  const radii=[0,12,24,36,48,60,72];
  for(const r of radii){const n=r?16:1;for(let i=0;i<n;i++){const a=i/n*Math.PI*2,x=c.x+Math.cos(a)*r,z=c.z+Math.sin(a)*r,q=safeCandidate(x,z,port);if(q==null)continue;const drift=r*.22,score=q+drift;if(!best||score<best.score)best={x,z,score}}if(best&&r>=24&&best.score<12)break}
  return best||{x:c.x,z:c.z};
}
function populationFor(c){return c.capital?220+c.tier*55:c.tier>=3?150:c.tier===2?90:42}
function defendersFor(c){return c.capital?26+c.tier*5:c.tier>=3?22:c.tier===2?14:6}
for(const f of Object.values(N.factions)){
  for(const c of f.cities){
    const p=resolveSite(c);c.x=p.x;c.z=p.z;if(c.capital)f.spawn={x:p.x,z:p.z};
    const d={id:`hist-${c.id}`,historicalId:c.id,name:c.name,x:p.x,z:p.z,type:(c.tier>=2||c.capital)?'city':'village',tier:c.tier||1,population:populationFor(c),defenders:defendersFor(c),king:c.capital?f.king:null,faction:f.id,nation:f.id,factionName:f.display,factionKing:f.king,capital:!!c.capital,port:!!c.port||coastalIds.has(c.id),historical:true,special:c.special||null,scale:c.scale||1};
    H.cities.push(d);H.byId.set(d.id,d);
  }
}
function nearestHistorical(x,z,max=Infinity){let best=null,bd=max;for(const c of H.cities){const d=Math.hypot(x-c.x,z-c.z);if(d<bd){bd=d;best=c}}return best?{city:best,d:bd}:null}
// Historical cities reserve their immediate footprint and gently terrace it so walls/streets remain usable.
W.groundY=function(x,z){let y=baseGround(x,z),best=null,bd=Infinity;for(const c of H.cities){const r=c.special==='jerusalem'?72:c.capital?48:c.type==='city'?38:28;const d=Math.hypot(x-c.x,z-c.z);if(d<r&&d<bd){bd=d;best={c,r}}}if(!best)return y;const target=baseGround(best.c.x,best.c.z),inner=best.r*.62;if(bd<=inner)y=y*.12+target*.88;else{const t=(bd-inner)/(best.r-inner),k=(1-t)*(1-t)*.72;y=y*(1-k)+target*k}return Math.round(y*20)/20};
function territoryAt(x,z){const n=nearestHistorical(x,z,610);return n?n.city.faction:null}
function enrichProcedural(s){if(!s||s.historical)return s;const fId=territoryAt(s.x,s.z);if(!fId)return s;const f=N.faction(fId);return{...s,faction:fId,nation:fId,factionName:f?.display||fId,factionKing:f?.king||null,territorial:true}}
W.settlementsNearBounds=function(minX,maxX,minZ,maxZ,margin=20){
  const out=[],seen=new Set();
  for(const s0 of baseSettlementsNearBounds(minX,maxX,minZ,maxZ,margin)){
    const near=nearestHistorical(s0.x,s0.z,56+(s0.type==='city'?10:0));if(near)continue;
    const s=enrichProcedural(s0);if(!seen.has(s.id)){seen.add(s.id);out.push(s)}
  }
  for(const c of H.cities)if(c.x>=minX-margin&&c.x<=maxX+margin&&c.z>=minZ-margin&&c.z<=maxZ+margin&&!seen.has(c.id)){seen.add(c.id);out.push(c)}
  return out;
};
if(baseSettlementDef)W.settlementDef=(cx,cz)=>{const s=baseSettlementDef(cx,cz);if(!s)return null;if(nearestHistorical(s.x,s.z,58))return null;return enrichProcedural(s)};
// Give already-created procedural settlements a political identity too.
function tagExisting(){if(typeof generatedSettlements==='undefined')return;for(const rt of generatedSettlements.values()){if(!rt||rt.historical)continue;const fId=territoryAt(rt.x,rt.z);if(!fId)continue;const f=N.faction(fId);rt.faction=fId;rt.nation=fId;rt.factionName=f?.display||fId;rt.factionKing=f?.king||null}}
function ensureNearbyHistorical(){if(typeof ensureSettlement!=='function')return;const px=player.mesh.position.x,pz=player.mesh.position.z;for(const c of H.cities)if(Math.hypot(px-c.x,pz-c.z)<260)try{ensureSettlement(c)}catch(e){console.warn('historical52 ensure',c.name,e)}}
function relationLabel(faction){if(!N.state.selected)return'SIN NACIÓN';const r=N.relationTo(faction);return({own:'PROPIA',ally:'ALIADA',friendly:'AMISTOSA',neutral:'NEUTRAL',hostile:'HOSTIL',war:'EN GUERRA'})[r]||String(r).toUpperCase()}
const card=document.createElement('div');card.id='historical52card';card.style.cssText=`position:fixed;z-index:72;left:50%;top:calc(12px + env(safe-area-inset-top,0px));transform:translateX(-50%);display:none;min-width:210px;max-width:min(82vw,360px);padding:8px 11px;border:1px solid #e0c18799;border-radius:10px;background:#171108df;color:#fff0cf;text-align:center;text-shadow:0 1px 2px #000;font:9px/1.35 ui-monospace,monospace;pointer-events:none`;
document.body.appendChild(card);
if(mobile){card.style.top='calc(48px + env(safe-area-inset-top,0px))';card.style.fontSize='8px';card.style.minWidth='180px'}
function updateCard(){const n=nearestHistorical(player.mesh.position.x,player.mesh.position.z,170);H.lastNearby=n;if(!n){card.style.display='none';return}const c=n.city,f=N.faction(c.faction);card.innerHTML=`<b style="font-size:1.12em;color:#fff4c9">${c.name.toUpperCase()}</b><br>${f?.display||c.factionName}<br>Rey: <b>${c.factionKing}</b> · ${relationLabel(c.faction)}<br><span style="opacity:.72">${c.capital?'CAPITAL · ':''}${Math.round(n.d)} m</span>`;card.style.display='block'}
// Kings are unique faction rulers. Reuse the capital runtime king if the engine created it; otherwise mark the capital for later placement.
function syncKings(){if(typeof generatedSettlements==='undefined')return;for(const f of Object.values(N.factions)){if(H.kings.has(f.id))continue;const cap=H.cities.find(c=>c.faction===f.id&&c.capital),rt=cap&&generatedSettlements.get(cap.id);if(rt?.kingRuntime){rt.kingRuntime.faction=f.id;rt.kingRuntime.rulerName=f.king;H.kings.set(f.id,rt.kingRuntime)}}}
function sync(){ensureNearbyHistorical();tagExisting();syncKings();updateCard()}
let last=0;function loop(t){if(t-last>420){last=t;try{sync()}catch(e){console.warn('Wilderness 5.2 historical kingdoms',e)}}requestAnimationFrame(loop)}requestAnimationFrame(loop);
window.WildernessHistorical52={cities:H.cities,byId:H.byId,kings:H.kings,nearestCity:nearestHistorical,territoryAt,state:H};
})();