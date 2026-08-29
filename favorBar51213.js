// Wilderness 5.12.13 — compact FAVOR DE ELOHIM bar below life
(()=>{
  if(window.WildernessFavorBar51213)return;
  function install(){
    const hud=document.getElementById('w3hud'),life=document.getElementById('w3life'),favor=document.getElementById('favor58hud');
    if(!hud||!life||!favor)return false;
    favor.querySelector('span')&&(favor.querySelector('span').textContent='FAVOR DE ELOHIM');
    if(favor.parentElement!==hud)life.insertAdjacentElement('afterend',favor);
    return true;
  }
  const style=document.createElement('style');style.textContent=`
    #favor58hud{display:block!important;position:static!important;z-index:auto!important;left:auto!important;top:auto!important;width:104px!important;height:auto!important;margin:5px 0 0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#d9f1de!important;text-align:left!important;pointer-events:auto!important;font:800 5.5px/1 ui-monospace,monospace!important;text-shadow:0 1px 2px #000!important}
    #favor58hud>span{display:block!important;margin:0 0 3px!important;letter-spacing:.06em!important;white-space:nowrap!important;opacity:.82!important}
    #favor58hud i{display:block!important;width:104px!important;height:5px!important;border:0!important;border-radius:8px!important;background:#07120dbb!important;overflow:hidden!important;box-shadow:0 1px 5px #0008!important}
    #favor58hud i b{display:block!important;height:100%!important;background:#4c9a78!important;transition:width .25s!important}
    #favor58hud em{display:none!important}
    @media(pointer:coarse),(max-width:820px){#favor58hud{width:78px!important;margin-top:4px!important;font-size:4.5px!important}#favor58hud i{width:78px!important;height:4px!important}}
  `;document.head.appendChild(style);
  if(!install()){const t=setInterval(()=>{if(install())clearInterval(t)},300);setTimeout(()=>clearInterval(t),12000)}
  window.WildernessFavorBar51213=Object.freeze({version:'5.12.13',install});
})();
