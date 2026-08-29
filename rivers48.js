// Wilderness 4.8 - deterministic downhill rivers, carved valleys and fertile banks
(()=>{
const W=window.WildernessWorld;if(!W)return;
const baseGround=W.groundY,baseBiome=W.biomeAt,baseFeature=W.terrainFeatureAt,SEA=W.SEA_LEVEL??0;
const SOURCE=620,STEP=24,MAX_STEPS=88,BUCKET=96;
const rivers=new Map(),buckets=new Map(),ensured=new Set();let serial=0;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
function angleDiff(a,b){let d=(a-b)%(Math.PI*2);if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;return Math.abs(d)}
function bucketKey(x,z){return`${Math.floor(x/BUCKET)},${Math.floor(z/BUCKET)}`}
function pointSeg(px,pz,s){const vx=s.bx-s.ax,vz=s.bz-s.az,wx=px-s.ax,wz=pz-s.az,l2=vx*vx+vz*vz||1,t=clamp((wx*vx+wz*vz)/l2),x=s.ax+vx*t,z=s.az+vz*t;return{d:Math.hypot(px-x,pz-z),t,x,z}}
function indexSegment(s){const pad=s.bank+4,minX=Math.floor((Math.min(s.ax,s.bx)-pad)/BUCKET),maxX=Math.floor((Math.max(s.ax,s.bx)+pad)/BUCKET),minZ=Math.floor((Math.min(s.az,s.bz)-pad)/BUCKET),maxZ=Math.floor((Math.max(s.az,s.bz)+pad)/BUCKET);for(let x=minX;x<=maxX;x++)for(let z=minZ;z<=maxZ;z++){const k=`${x},${z}`,a=buckets.get(k)||[];a.push(s);buckets.set(k,a)}}
function sourceFor(cx,cz){if(W.hash2i(cx,cz,48001)<.72)return null;const x=(cx+.5)*SOURCE+(W.hash2i(cx,cz,48002)-.5)*SOURCE*.62,z=(cz+.5)*SOURCE+(W.hash2i(cx,cz,48003)-.5)*SOURCE*.62,y=baseGround(x,z),cl=W.climateAt?.(x,z)||{moisture:.5},m=window.WildernessGeography47?.mountainStrength?.(x,z)||0;if(y<SEA+5.5||W.waterAt?.(x,z)||W.coastAt?.(x,z)||W.slopeAt?.(x,z)>.72)return null;if(m<.13&&cl.moisture<.52)return null;return{x,z,y}}
function buildRiver(cx,cz){const key=`${cx},${cz}`;if(rivers.has(key))return rivers.get(key);const src=sourceFor(cx,cz);if(!src){rivers.set(key,null);return null}const path=[{x:src.x,z:src.z,y:src.y-.45}],visited=new Set();let x=src.x,z=src.z,heading=W.hash2i(cx,cz,48004)*Math.PI*2,waterY=src.y-.45;for(let n=0;n<MAX_STEPS;n++){
  const here=baseGround(x,z);if(here<SEA+.18||W.waterAt?.(x,z)){break}
  let best=null;for(let k=0;k<16;k++){const a=heading+(k-7.5)*(Math.PI/14),tx=x+Math.sin(a)*STEP,tz=z+Math.cos(a)*STEP,h=baseGround(tx,tz),sea=W.waterAt?.(tx,tz)?-35:0,coast=W.coastAt?.(tx,tz)?-7:0,up=Math.max(0,h-here),turn=angleDiff(a,heading),jitter=W.hash2i(Math.floor(tx/8),Math.floor(tz/8),48100+n)*.36,score=h+up*2.4+turn*.65+jitter+sea+coast;if(!best||score<best.score)best={a,tx,tz,h,score}}
  if(!best)break;const vk=`${Math.round(best.tx/18)},${Math.round(best.tz/18)}`;if(visited.has(vk))break;visited.add(vk);heading=best.a;x=best.tx;z=best.tz;waterY=Math.min(waterY-.035,best.h-.42);path.push({x,z,y:waterY});if(W.waterAt?.(x,z)||baseGround(x,z)<SEA+.2)break;
}
if(path.length<9){rivers.set(key,null);return null}const segs=[];for(let i=0;i<path.length-1;i++){const a=path[i],b=path[i+1],progress=i/Math.max(1,path.length-2),width=1.45+progress*2.55+W.hash2i(cx,cz,48200+i)*.45,bank=width*(4.2+progress*.7),s={id:++serial,river:key,i,ax:a.x,az:a.z,ay:a.y,bx:b.x,bz:b.z,by:b.y,width,bank};segs.push(s);indexSegment(s)}const out={key,source:src,path,segs};rivers.set(key,out);return out}
function ensureAround(x,z){const cx=Math.floor(x/SOURCE),cz=Math.floor(z/SOURCE),ek=`${cx},${cz}`;if(ensured.has(ek))return;ensured.add(ek);for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++)buildRiver(cx+dx,cz+dz)}
function nearestRaw(x,z,max=34){ensureAround(x,z);const r=Math.ceil(max/BUCKET),bx=Math.floor(x/BUCKET),bz=Math.floor(z/BUCKET);let best=null,bd=max;const seen=new Set();for(let dx=-r;dx<=r;dx++)for(let dz=-r;dz<=r;dz++)for(const s of buckets.get(`${bx+dx},${bz+dz}`)||[]){if(seen.has(s.id))continue;seen.add(s.id);const q=pointSeg(x,z,s);if(q.d<bd){bd=q.d;best={...q,segment:s,width:s.width,bank:s.bank,waterY:s.ay+(s.by-s.ay)*q.t}}}return best}
function riverInfoAt(x,z,max=34){return nearestRaw(x,z,max)}
function riverAt(x,z){const q=nearestRaw(x,z,9);return!!q&&q.d<=q.width}
function riverBankAt(x,z,max=25){const q=nearestRaw(x,z,max);return!!q&&q.d<=q.bank}
function groundY(x,z){const base=baseGround(x,z);if(base<SEA-.05)return base;const q=nearestRaw(x,z,34);if(!q)return base;if(W.roadAt?.(x,z)&&q.d<q.width*1.35)return Math.round((Math.max(base,q.waterY+.68))*20)/20;let y=base;if(q.d<q.bank){const v=1-q.d/q.bank;y-=v*v*(.42+q.width*.055)}if(q.d<q.width){const c=1-q.d/q.width;y-=c*c*(.92+q.width*.18)}return Math.round(y*20)/20}
function biomeAt(x,z){const b=baseBiome(x,z);if(b==='sea'||b==='coast'||b==='oasis'||b==='mountain')return b;const q=nearestRaw(x,z,27);if(!q)return b;if(q.d<=q.width*2.5)return'fertile';if(q.d<=q.bank&&b==='desert')return'steppe';if(q.d<=q.bank&&(b==='steppe'||b==='rocky'))return'grassland';return b}
function terrainFeatureAt(x,z){if(riverAt(x,z))return'river';return baseFeature?baseFeature(x,z):'normal'}
function segmentsNearBounds(minX,maxX,minZ,maxZ,pad=26){ensureAround((minX+maxX)/2,(minZ+maxZ)/2);const a=Math.floor((minX-pad)/BUCKET),b=Math.floor((maxX+pad)/BUCKET),c=Math.floor((minZ-pad)/BUCKET),d=Math.floor((maxZ+pad)/BUCKET),out=[],seen=new Set();for(let x=a;x<=b;x++)for(let z=c;z<=d;z++)for(const s of buckets.get(`${x},${z}`)||[]){if(seen.has(s.id))continue;seen.add(s.id);if(Math.max(s.ax,s.bx)<minX-pad||Math.min(s.ax,s.bx)>maxX+pad||Math.max(s.az,s.bz)<minZ-pad||Math.min(s.az,s.bz)>maxZ+pad)continue;out.push(s)}return out}
W.groundY=groundY;W.biomeAt=biomeAt;W.riverInfoAt=riverInfoAt;W.riverAt=riverAt;W.riverBankAt=riverBankAt;W.riverSegmentsNearBounds=segmentsNearBounds;W.terrainFeatureAt=terrainFeatureAt;
window.WildernessRivers48={rivers,buckets,buildRiver,riverInfoAt,riverAt,riverBankAt,segmentsNearBounds,baseGround};
})();