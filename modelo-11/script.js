document.addEventListener('DOMContentLoaded',()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  menuButton?.addEventListener('click',()=>{
    const open=nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Abrir menú');
  }));

  const reveals=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){reveals.forEach(el=>el.classList.add('is-visible'));}
  else{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px -30px'});
    reveals.forEach(el=>observer.observe(el));
  }

  document.querySelectorAll('.filters button').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(item=>item.classList.remove('is-active'));
    button.classList.add('is-active');
  }));

  const details=document.querySelectorAll('.faq-list details');
  details.forEach(item=>item.addEventListener('toggle',()=>{
    if(item.open)details.forEach(other=>{if(other!==item)other.open=false;});
  }));

  document.querySelectorAll('[data-lead]').forEach(link=>link.addEventListener('click',()=>{
    if(typeof window.fbq==='function')window.fbq('track','Lead');
  }));
});
