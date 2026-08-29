// Wilderness 4.7 - macro geography, climate, coastlines and coherent biomes
(()=>{
const W=window.WildernessWorld;if(!W)return;
const SEA=0;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
const baseRoad=W.roadAt,baseSettlementDef=W.settlementDef,baseSettlementsNearBounds=W.settlementsNearBounds,baseCave=W.caveDefForChunk;
function climate(x,z){
  const moisture=W.valueNoise(x,z,920,4701)*.62+W.valueNoise(x,z,360,4702)*.28+W.valueNoise(x,z,150,4703)*.10;
  const heat=W.valueNoise(x,z,1150,4704)*.72+W.valueNoise(x,z,430,4705)*.28;
  return{moisture,heat,dry:1-moisture};
}
function continental(x,z){
  let c=W.valueNoise(x,z,1650,4710)*.68+W.valueNoise(x,z,720,4711)*.32;
  const anchors=[[0,0],[W.starterVillage.x,W.starterVillage.z],[W.starterCity.x,W.starterCity.z]];
  let protect=0;for(const [ax,az] of anchors){const d=Math.hypot(x-ax,z-az);protect=Math.max(protect,clamp(1-d/290));}
  return clamp(c+protect*.23);
}
function mountainStrength(x,z){
  const belt=smooth(.55,.82,W.valueNoise(x,z,760,4720));
  const ridge=1-Math.abs(W.valueNoise(x,z,205,4721)-.5)*2;
  const ridge2=1-Math.abs(W.valueNoise(x,z,108,4722)-.5)*2;
  return belt*(Math.pow(clamp(ridge),2.2)*.72+Math.pow(clamp(ridge2),3.0)*.28);
}
function valleyStrength(x,z){const q=1-Math.abs(W.valueNoise(x,z,410,4730)-.5)*2;return Math.pow(clamp((q-.64)/.36),1.7)}
function gorgeStrength(x,z){const q=1-Math.abs(W.valueNoise(x,z,135,4731)-.5)*2;const mask=smooth(.48,.78,W.valueNoise(x,z,520,4732));return Math.pow(clamp((q-.78)/.22),2.2)*mask}
function rawBase(x,z){
  const c=continental(x,z),cl=climate(x,z);
  const shelf=(c-.39)*31;
  const broad=(W.valueNoise(x,z,540,4740)-.5)*8.5;
  const hills=(W.valueNoise(x,z,210,4741)-.5)*7.0;
  const rolling=(W.valueNoise(x,z,82,4742)-.5)*2.4;
  const mountains=mountainStrength(x,z)*(13+34*(.45+W.valueNoise(x,z,285,4743)*.55));
  const valleys=valleyStrength(x,z)*(4.5+W.valueNoise(x,z,260,4744)*6.5);
  const gorges=gorgeStrength(x,z)*(7+W.valueNoise(x,z,92,4745)*8);
  const dunes=cl.dry>.62?(W.valueNoise(x,z,38,4746)-.5)*2.2*smooth(.62,.88,cl.dry):0;
  let y=shelf+broad+hills+rolling+mountains-valleys-gorges+dunes;
  const originLift=clamp(1-Math.hypot(x,z)/215);y+=originLift*5.5;
  return y;
}
function candidateSettlements(x,z){
  const out=[W.starterVillage,W.starterCity];
  if(!baseSettlementDef)return out;
  const cs=W.SETTLE_CELL||120,cx=Math.floor(x/cs),cz=Math.floor(z/cs);
  for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const s=baseSettlementDef(cx+dx,cz+dz);if(s)out.push(s)}
  return out;
}
function settledGround(x,z){
  let y=rawBase(x,z),best=0,target=y;
  for(const s of candidateSettlements(x,z)){
    if(!s)continue;const d=Math.hypot(x-s.x,z-s.z),rad=s.type==='city'?39:30;if(d>=rad)continue;
    const influence=Math.pow(clamp(1-d/rad),2.0),cy=rawBase(s.x,s.z);
    if(influence>best){best=influence;target=cy}
  }
  if(best)y=y*(1-best*.78)+target*(best*.78);
  return y;
}
function groundY(x,z){
  let y=settledGround(x,z);
  if(baseRoad&&baseRoad(x,z)&&y>SEA+.25){const local=(rawBase(x-4,z)+rawBase(x+4,z)+rawBase(x,z-4)+rawBase(x,z+4))*.25;y=y*.62+local*.38;}
  return Math.round(y*20)/20;
}
function waterDepthAt(x,z){return Math.max(0,SEA-groundY(x,z))}
function waterAt(x,z){return groundY(x,z)<SEA-.08}
function deepWaterAt(x,z){return groundY(x,z)<SEA-1.05}
function coastAt(x,z){
  if(waterAt(x,z))return false;const radii=[8,15,24];
  for(const r of radii)for(let i=0;i<8;i++){const a=i*Math.PI/4;if(waterAt(x+Math.cos(a)*r,z+Math.sin(a)*r))return true}
  return false;
}
function slopeAt(x,z){const e=4,y=groundY(x,z);return Math.max(Math.abs(groundY(x+e,z)-y),Math.abs(groundY(x-e,z)-y),Math.abs(groundY(x,z+e)-y),Math.abs(groundY(x,z-e)-y))/e}
function oasisCenter(sx,sz){
  if(W.hash2i(sx,sz,4760)<.79)return null;const size=235,x=(sx+.5)*size+(W.hash2i(sx,sz,4761)-.5)*82,z=(sz+.5)*size+(W.hash2i(sx,sz,4762)-.5)*82,cl=climate(x,z);
  if(cl.moisture>.43||groundY(x,z)<SEA+1.2||mountainStrength(x,z)>.30||slopeAt(x,z)>.34)return null;
  return{x,z,r:13+W.hash2i(sx,sz,4763)*9};
}
function oasisInfoAt(x,z){const size=235,sx=Math.floor(x/size),sz=Math.floor(z/size);for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const o=oasisCenter(sx+dx,sz+dz);if(o&&Math.hypot(x-o.x,z-o.z)<o.r)return o}return null}
function biomeAt(x,z){
  const y=groundY(x,z);if(y<SEA-.08)return'sea';if(coastAt(x,z))return'coast';
  const oasis=oasisInfoAt(x,z);if(oasis)return'oasis';
  const cl=climate(x,z),m=mountainStrength(x,z),s=slopeAt(x,z);
  if(y>18||m>.42)return'mountain';
  if(s>.48||y>10&&cl.moisture<.48)return'rocky';
  if(cl.moisture>.72)return'forest';
  if(cl.moisture>.61)return'grassland';
  if(cl.moisture>.52)return'fertile';
  if(cl.moisture>.39)return'steppe';
  return'desert';
}
function terrainFeatureAt(x,z){if(waterAt(x,z))return'sea';if(coastAt(x,z))return'coast';if(mountainStrength(x,z)>.42||groundY(x,z)>18)return'mountain';if(gorgeStrength(x,z)>.38)return'ravine';return'normal'}
W.SEA_LEVEL=SEA;W.groundY=groundY;W.biomeAt=biomeAt;W.waterAt=waterAt;W.deepWaterAt=deepWaterAt;W.waterDepthAt=waterDepthAt;W.coastAt=coastAt;W.slopeAt=slopeAt;W.climateAt=climate;W.oasisInfoAt=oasisInfoAt;W.terrainFeatureAt=terrainFeatureAt;
if(baseRoad)W.roadAt=(x,z)=>!waterAt(x,z)&&baseRoad(x,z);
if(baseSettlementDef)W.settlementDef=(cx,cz)=>{const s=baseSettlementDef(cx,cz);if(!s)return null;if(s.id===W.starterVillage.id||s.id===W.starterCity.id)return s;const b=biomeAt(s.x,s.z);if(b==='sea'||b==='mountain'||slopeAt(s.x,s.z)>.38)return null;return s};
if(baseSettlementsNearBounds)W.settlementsNearBounds=(...args)=>baseSettlementsNearBounds(...args).filter(s=>{if(s.id===W.starterVillage.id||s.id===W.starterCity.id)return true;const b=biomeAt(s.x,s.z);return b!=='sea'&&b!=='mountain'&&slopeAt(s.x,s.z)<=.38});
if(baseCave)W.caveDefForChunk=(cx,cz)=>{const c=baseCave(cx,cz);return c&&!waterAt(c.x,c.z)?c:null};
window.WildernessGeography47={SEA,groundY,biomeAt,waterAt,deepWaterAt,coastAt,slopeAt,climate,oasisInfoAt,mountainStrength,valleyStrength,gorgeStrength};
})();