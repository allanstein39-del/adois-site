// Header solid on scroll (home only — has .js-scroll-header)
(function(){
  var h=document.querySelector('.site-header.js-scroll-header');
  if(h){
    var onScroll=function(){ h.classList.toggle('solid', window.scrollY>40); };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }
  // Mobile menu
  var burger=document.querySelector('.burger'), nav=document.querySelector('.nav');
  if(burger&&nav){ burger.addEventListener('click',function(){ nav.classList.toggle('open'); }); }
  // Scroll reveal
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.12});
    document.querySelectorAll('.fade').forEach(function(el){io.observe(el);});
  } else {
    document.querySelectorAll('.fade').forEach(function(el){el.classList.add('in');});
  }
  // Newsletter / forms — no backend: open mail client
  document.querySelectorAll('form[data-mailto]').forEach(function(f){
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var to=f.getAttribute('data-mailto');
      var subj=encodeURIComponent(f.getAttribute('data-subject')||'Contato pelo site');
      var lines=[];
      f.querySelectorAll('[name]').forEach(function(i){ if(i.value) lines.push(i.previousElementSibling? i.previousElementSibling.textContent+': '+i.value : i.value); });
      window.location.href='mailto:'+to+'?subject='+subj+'&body='+encodeURIComponent(lines.join('\n'));
    });
  });
})();
