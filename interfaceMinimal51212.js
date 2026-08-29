// Wilderness 5.12.12 — strict minimal HUD, desktop + mobile
(()=>{
  if(window.WildernessInterfaceMinimal51212)return;
  const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  const style=document.createElement('style');
  style.textContent=`
    #nation51hud,#build08btn,#favor58hud,#historical52card{display:none!important}
    #diplomacy55:not(.w51212-open){display:none!important}
    #diplomacy55.w51212-open{display:block!important}
    .w51212-legacy-hide{display:none!important}
    #w5128sheet{grid-template-columns:1fr 1fr!important;max-height:min(72dvh,520px);overflow:auto}
    #w5128sheet .w51212-extra{display:block!important;position:static!important;width:auto!important;height:auto!important;transform:none!important}
    @media(pointer:coarse),(max-width:820px){#w5128sheet{max-height:calc(100dvh - 80px);overflow:auto}}
  `;
  document.head.appendChild(style);

  function tagLooseLegacy(){
    for(const b of qa('body > button')){
      if(b.id==='w5128menuBtn'||b.closest?.('#w5128sheet'))continue;
      const t=(b.textContent||'').trim().toUpperCase();
      if(t==='SOCIEDAD'||t==='REINO')b.classList.add('w51212-legacy-hide');
    }
    for(const d of qa('body > div')){
      if(d.id||d===q('#w5128menu')||d===q('#w5128orders'))continue;
      const t=(d.textContent||'').trim().toUpperCase();
      if(t.startsWith('SOCIEDAD · 0.9'))d.classList.add('w51212-legacy-hide');
    }
  }

  function closeCity(){q('#diplomacy55')?.classList.remove('w51212-open')}
  let cityTimer=0;
  function showCity(){
    const p=q('#diplomacy55');if(!p)return;
    p.classList.add('w51212-open');clearTimeout(cityTimer);cityTimer=setTimeout(closeCity,6500);
  }
  function closeOtherModals(){
    closeCity();q('#world-modal')?.classList.remove('open');window.WildernessWorldMap5124?.close?.();window.WildernessOptions5103?.close?.();
  }
  function addMenuActions(){
    const sheet=q('#w5128sheet');if(!sheet||sheet.dataset.w51212)return;sheet.dataset.w51212='1';
    const actions=[
      ['city','CIUDAD'],['build','CONSTRUIR'],['society','SOCIEDAD'],['realm','REINO'],['favor','FAVOR']
    ];
    for(const [a,label] of actions){const b=document.createElement('button');b.className='w51212-extra';b.dataset.x=a;b.textContent=label;sheet.appendChild(b)}
    sheet.addEventListener('pointerdown',e=>{
      const b=e.target.closest?.('[data-x]');if(!b)return;e.preventDefault();e.stopPropagation();
      q('#w5128menu')?.classList.remove('open');closeOtherModals();
      switch(b.dataset.x){
        case'city':showCity();break;
        case'build':{const S=window.WildernessSettlement;if(S?.state?.founded)S.openMenu?.();else S?.found?.();break}
        case'society':window.WildernessSociety?.open?.();break;
        case'realm':window.WildernessRelease?.open?.();break;
        case'favor':window.WildernessFavor58?.openAbilities?.();break;
      }
    },true);
  }
  function enforce(){tagLooseLegacy();addMenuActions()}
  enforce();
  const mo=new MutationObserver(enforce);mo.observe(document.body,{childList:true,subtree:false});
  setInterval(enforce,1200);
  addEventListener('keydown',e=>{if(e.code==='Escape')closeCity()},true);
  window.WildernessInterfaceMinimal51212=Object.freeze({version:'5.12.12',enforce,showCity,closeCity});
})();
