// Wilderness 5.7 - prevents normal follower AI/collision recovery from fighting siege operators and climbers
(()=>{
if(typeof followers==='undefined'||typeof updateFollowers!=='function')return;
const base=updateFollowers;
updateFollowers=function(dt){
  const paused=[];
  for(const f of followers){if(!f||(!f.__siege57Controlled&&!f.__siege57Climb))continue;paused.push([f,f.alive]);f.alive=false}
  try{return base(dt)}finally{for(const [f,a] of paused)f.alive=a}
};
function keepClimbSafe(){
  const C=window.WildernessCollision45?.state;
  if(C?.safe)for(const f of followers)if(f?.__siege57Climb&&f.mesh)C.safe.set(f,f.mesh.position.clone());
  requestAnimationFrame(keepClimbSafe);
}
requestAnimationFrame(keepClimbSafe);
window.WildernessSiege57Control={installed:true};
})();