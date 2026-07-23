/* VILLA — componentes compartilhados (header, footer, zap) + interações
   Edição em um só lugar. Troque WHATSAPP/INSTAGRAM/TELEFONE se mudar. */
const VILLA = {
  whatsapp: "5516997373078",          // (16) 99737-3078
  telefoneLabel: "(16) 99737-3078",
  instagram: "https://www.instagram.com/villa_mobiliariosobmedida/",
  instaHandle: "@villa_mobiliariosobmedida",
  cidade: "São Carlos · SP"
};
VILLA.zapMsg = (txt) =>
  `https://wa.me/${VILLA.whatsapp}?text=${encodeURIComponent(txt || "Olá! Vim pelo site e quero falar sobre meu projeto.")}`;

function navHTML(ativo){
  const item = (href,label,key)=>`<li><a href="${href}" class="${ativo===key?'ativo':''}">${label}</a></li>`;
  return `
  <header>
    <div class="wrap nav">
      <a href="index.html" class="logo"><img src="img/Villa%20logo_branco.png" alt="Villa Sob Medida"></a>
      <button class="menu-toggle" aria-label="Abrir menu" onclick="document.getElementById('menu').classList.toggle('aberto')">☰</button>
      <nav>
        <ul id="menu">
          ${item('index.html','Início','home')}
          ${item(ativo==='home'?'#diferenciais':'index.html#diferenciais','Diferenciais','diferenciais')}
          ${item('projetos.html','Projetos','projetos')}
          ${item('sobre.html','Sobre','sobre')}
          ${item('contato.html','Contato','contato')}
          <li><a class="btn" href="${VILLA.zapMsg()}" target="_blank" rel="noopener">Iniciar projeto</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function footerHTML(){
  return `
  <footer class="dark">
    <div class="wrap">
      <div>
        <div class="logo" style="margin-bottom:14px"><img src="img/Villa%20logo_branco.png" alt="Villa Sob Medida"></div>
        <p style="max-width:34ch;font-size:.9rem">Móveis planejados sob medida em ${VILLA.cidade}. Onde cada detalhe faz a diferença.</p>
      </div>
      <div>
        <h3>Navegação</h3>
        <ul>
          <li><a href="index.html#diferenciais">Diferenciais</a></li>
          <li><a href="projetos.html">Projetos</a></li>
          <li><a href="sobre.html">Sobre a Villa</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </div>
      <div>
        <h3>Fale com a Villa</h3>
        <ul>
          <li><a href="${VILLA.zapMsg()}" target="_blank" rel="noopener">WhatsApp ${VILLA.telefoneLabel}</a></li>
          <li><a href="${VILLA.instagram}" target="_blank" rel="noopener">Instagram ${VILLA.instaHandle}</a></li>
          <li><a href="contato.html">Iniciar meu projeto</a></li>
        </ul>
      </div>
      <div class="assina">
        <span>© <span id="ano"></span> Villa Mobiliário Sob Medida</span>
        <span>Identidade e site por <strong>Adois Comunicação Integrativa</strong></span>
      </div>
    </div>
  </footer>
  <a class="zap" href="${VILLA.zapMsg()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.748-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/></svg>
  </a>`;
}

document.addEventListener('DOMContentLoaded',()=>{
  const h=document.getElementById('villa-header');
  if(h) h.outerHTML=navHTML(document.body.dataset.pagina);
  const f=document.getElementById('villa-footer');
  if(f) f.outerHTML=footerHTML();
  const a=document.getElementById('ano'); if(a) a.textContent=new Date().getFullYear();

  // filtros de projetos
  document.querySelectorAll('.filtro').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filtro').forEach(b=>b.classList.remove('ativo'));
      btn.classList.add('ativo');
      const cat=btn.dataset.cat;
      document.querySelectorAll('.galeria .card').forEach(c=>{
        c.classList.toggle('oculto', cat!=='todos' && c.dataset.cat!==cat);
      });
    });
  });

  // abas de padrões
  document.querySelectorAll('.aba').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.aba').forEach(b=>b.classList.remove('ativo'));
      btn.classList.add('ativo');
      const g=btn.dataset.grupo;
      document.querySelectorAll('[data-grupo-painel]').forEach(p=>{
        p.style.display = (p.dataset.grupoPainel===g)?'grid':'none';
      });
    });
  });

  // formulários -> abrem WhatsApp já preenchidos (sem backend, ideal pra hospedagem estática)
  document.querySelectorAll('.form-zap, #form-orcamento').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const d=new FormData(form);
      const txt=`Olá, Villa! Sou ${d.get('nome')||'—'}.`
        +`\nAmbiente de interesse: ${d.get('ambiente')||'—'}`
        +(d.get('cidade')?`\nCidade: ${d.get('cidade')}`:'')
        +(d.get('arquiteto')?`\nSou arquiteto(a)/designer: ${d.get('arquiteto')}`:'')
        +(d.get('mensagem')?`\nMensagem: ${d.get('mensagem')}`:'')
        +(d.get('telefone')?`\nMeu WhatsApp: ${d.get('telefone')}`:'');
      window.open(VILLA.zapMsg(txt),'_blank','noopener');
    });
  });
});
