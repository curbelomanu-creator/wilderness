// Wilderness 5.12.9 — scenario political override loaded before nation selection
(()=>{
  const N=window.WildernessNations50;if(!N)return;
  const judah=N.factions?.judah;
  if(judah)judah.king='Josafat';
  if(N.state?.nation==='judah'){
    N.state.king='Josafat';
    try{N.save?.()}catch(_){ }
  }
  window.WildernessPolitics5129=Object.freeze({version:'5.12.9',judahKing:'Josafat'});
})();
