// Wilderness 5.12.9 — scenario political override loaded before nation selection
(()=>{
  const N=window.WildernessNations50;if(!N)return;
  const judah=N.factions?.judah,israel=N.factions?.israel;
  if(judah)judah.king='Acaz';
  if(israel)israel.king='Pécaj';
  if(N.state?.nation==='judah')N.state.king='Acaz';
  if(N.state?.nation==='israel')N.state.king='Pécaj';
  try{N.save?.()}catch(_){ }
  window.WildernessPolitics5129=Object.freeze({version:'5.12.9',judahKing:'Acaz',israelKing:'Pécaj'});
})();
