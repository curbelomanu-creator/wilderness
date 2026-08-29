// Wilderness 5.7 - synchronize breach/capture status with the 5.5 diplomacy card
(()=>{
function loop(){
  const st=window.WildernessSiege57?.state?.active,info=document.getElementById('d55info');
  if(st&&info){
    if(st.breached)info.innerHTML=info.innerHTML.replace(/Puerta:\s*<b>[^<]*<\/b>/,'Puerta: <b>BRECHA</b>');
    if(st.won&&!/RECINTO TOMADO/.test(info.innerHTML))info.innerHTML+='<br><b>RECINTO TOMADO</b>';
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();