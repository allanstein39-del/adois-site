// nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), {passive:true});
}

// menu mobile
const burger = document.querySelector('.nav-burger');
const menu = document.getElementById('menuMobile');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }));
}

// faq
document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const body = item.querySelector('.faq-body');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    body.style.maxHeight = open ? body.scrollHeight + 'px' : 0;
  });
});

// depoimentos: setas
const track = document.getElementById('depoTrack');
if (track) {
  document.querySelectorAll('.depo-nav button').forEach(b => {
    b.addEventListener('click', () => {
      const card = track.querySelector('.depo-card');
      track.scrollBy({left: (card.offsetWidth + 20) * b.dataset.dir, behavior:'smooth'});
    });
  });
}

// ler mais
document.querySelectorAll('.lermais').forEach(b => {
  b.addEventListener('click', () => {
    const p = document.getElementById(b.dataset.alvo);
    const aberto = p.classList.toggle('clamp');
    b.textContent = aberto ? 'Ler depoimento completo' : 'Mostrar menos';
  });
});

// contagem animada dos números (home)
const conta = el => {
  const alvo = parseInt(el.dataset.count, 10);
  const prefixo = el.dataset.prefix || '';
  const sufixo = el.dataset.suffix || '';
  const dur = 1400;
  const ini = performance.now();
  const passo = agora => {
    const t = Math.min((agora - ini) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefixo + Math.round(alvo * eased) + sufixo;
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
};
const contadores = document.querySelectorAll('[data-count]');
if (contadores.length) {
  const reduz = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const ioNum = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      if (reduz) {
        e.target.textContent = (e.target.dataset.prefix || '') + e.target.dataset.count + (e.target.dataset.suffix || '');
      } else {
        conta(e.target);
      }
      ioNum.unobserve(e.target);
    }
  }), {threshold:.4});
  contadores.forEach(el => ioNum.observe(el));
}

// filtros da galeria
const filtros = document.querySelectorAll('.gal-filtros button');
if (filtros.length) {
  const fotos = document.querySelectorAll('.gal-grid figure');
  const grid = document.querySelector('.gal-grid');
  filtros.forEach(f => f.addEventListener('click', () => {
    filtros.forEach(x => x.classList.remove('ativo'));
    f.classList.add('ativo');
    const cat = f.dataset.cat;
    grid.classList.toggle('destacada', cat === 'todas');
    fotos.forEach(fig => fig.classList.toggle('oculta', cat !== 'todas' && fig.dataset.cat !== cat));
  }));
}

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.12});
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// evita o flash do traço amarelo (.slash) antes das fontes carregarem
(function(){
  var show = function(){ document.documentElement.classList.add('fonts-ready'); };
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(show); }
  setTimeout(show, 1200);
})();
