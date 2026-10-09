/* =========================================================
   EL BRABO BARBERÍA — comportamento do site
   ---------------------------------------------------------
   CONFIGURAÇÃO RÁPIDA:
   - WHATSAPP_NUMERO: substitua pelo número real da barbearia
     formato: 55 + DDD + número (sem espaços nem traços)
   - Mensagens: edite os textos nos atributos data-zap
     dos botões dentro dos arquivos .html
   ========================================================= */

const WHATSAPP_NUMERO = "5561999999999"; // ⚠️ SUBSTITUIR pelo número real
const WHATSAPP_PRE_DEFINIDO = true;      // false = botão vira link tel: (sem número)

/* ---------- Helpers ---------- */
function linkWhatsApp(mensagem) {
  if (!WHATSAPP_PRE_DEFINIDO) return "tel:+556199999999";
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- Ícones compartilhados (SVG inline) ---------- */
const ICONES = {
  zap: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7a11 11 0 0 0 4.2 3.7c.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.4z"/></svg>`,
  telefone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>`,
  relogio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  estrela: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
};

/* ---------- Botões de WhatsApp ---------- */
function iniciarLinksZap() {
  document.querySelectorAll("[data-zap]").forEach((el) => {
    el.href = linkWhatsApp(el.dataset.zap);
    if (el.tagName === "A") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
}

/* ---------- Cabeçalho: menu mobile + sombra ---------- */
function iniciarHeader() {
  const header = document.querySelector(".site-header");
  const botao = document.getElementById("btn-menu");
  const nav = document.getElementById("nav-principal");

  function fechar() {
    nav?.classList.remove("aberto");
    botao?.setAttribute("aria-expanded", "false");
    botao?.setAttribute("aria-label", "Abrir menu");
  }

  botao?.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechar));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar();
  });

  document.addEventListener("click", (e) => {
    if (!nav?.classList.contains("aberto")) return;
    if (!nav.contains(e.target) && !botao?.contains(e.target)) fechar();
  });

  const atualizarSombra = () => header?.classList.toggle("sombra", window.scrollY > 8);
  window.addEventListener("scroll", atualizarSombra, { passive: true });
  atualizarSombra();
}

/* ---------- Animação de entrada (discreta) ---------- */
function iniciarRevelar() {
  const itens = document.querySelectorAll(".revelar");
  if (!itens.length) return;

  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    itens.forEach((el) => el.classList.add("visivel"));
    return;
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  itens.forEach((el) => obs.observe(el));
}

/* ---------- Galeria: visualização ampliada ---------- */
function iniciarGaleria() {
  const itens = Array.from(document.querySelectorAll(".item-galeria"));
  if (!itens.length) return;

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector(".lightbox__img");
  const legenda = lightbox.querySelector(".lightbox__legenda");
  const btnFechar = lightbox.querySelector(".lightbox__fechar");
  const btnAnterior = lightbox.querySelector(".lightbox__nav--anterior");
  const btnProximo = lightbox.querySelector(".lightbox__nav--proximo");

  let indice = 0;
  let ultimoFoco = null;

  function mostrar(i) {
    indice = (i + itens.length) % itens.length;
    const item = itens[indice];
    const alvo = item.querySelector("img");
    img.src = alvo.getAttribute("data-ampliada") || alvo.src;
    img.alt = alvo.alt;
    legenda.textContent = item.dataset.legenda || alvo.alt;
    lightbox.classList.add("visivel");
    document.body.style.overflow = "hidden";
    btnFechar.focus();
  }

  function fechar() {
    lightbox.classList.remove("visivel");
    document.body.style.overflow = "";
    img.src = "";
    ultimoFoco?.focus();
  }

  itens.forEach((item, i) => {
    item.addEventListener("click", () => {
      ultimoFoco = item;
      mostrar(i);
    });
  });

  btnFechar?.addEventListener("click", fechar);
  btnAnterior?.addEventListener("click", () => mostrar(indice - 1));
  btnProximo?.addEventListener("click", () => mostrar(indice + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) fechar();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("visivel")) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(indice - 1);
    if (e.key === "ArrowRight") mostrar(indice + 1);
  });
}

/* ---------- Formulário de contato ---------- */
function iniciarFormulario() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  const sucesso = document.getElementById("form-sucesso");
  const btnZap = document.getElementById("sucesso-zap");

  const regras = {
    nome: (v) => v.trim().length >= 2 || "Informe seu nome.",
    whatsapp: (v) => (/^[\d\s()+.-]{10,}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 10)
      || "Informe um telefone válido com DDD.",
    mensagem: (v) => v.trim().length >= 10 || "Escreva uma mensagem com pelo menos 10 caracteres."
  };

  function validarCampo(campo) {
    const regra = regras[campo.name];
    if (!regra) return true;
    const resultado = regra(campo.value);
    const ok = resultado === true;
    const erro = document.getElementById(`erro-${campo.name}`);

    campo.setAttribute("aria-invalid", String(!ok));
    if (erro) {
      erro.classList.toggle("visivel", !ok);
      erro.textContent = ok ? "" : resultado;
    }
    return ok;
  }

  Object.keys(regras).forEach((nome) => {
    const campo = form.elements[nome];
    campo?.addEventListener("blur", () => validarCampo(campo));
    campo?.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const campos = Object.keys(regras).map((n) => form.elements[n]);
    const valido = campos.map(validarCampo).every(Boolean);
    if (!valido) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const dados = new FormData(form);
    const servico = dados.get("servico");
    const msg =
      `Olá! Vim pelo site da El Brabo Barbería e quero agendar um horário.\n\n` +
      `*Nome:* ${dados.get("nome")}\n` +
      `*Telefone:* ${dados.get("whatsapp")}\n` +
      (servico ? `*Serviço:* ${servico}\n` : "") +
      `\n*Mensagem:*\n${dados.get("mensagem")}`;

    if (btnZap) btnZap.href = linkWhatsApp(msg);

    form.querySelector(".campos")?.setAttribute("hidden", "");
    form.querySelector(".formulario__rodape")?.setAttribute("hidden", "");
    sucesso?.classList.add("visivel");
    sucesso?.focus();
  });

  document.getElementById("enviar-novamente")?.addEventListener("click", () => {
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
    form.querySelectorAll(".campo__erro").forEach((e) => e.classList.remove("visivel"));
    form.querySelector(".campos")?.removeAttribute("hidden");
    form.querySelector(".formulario__rodape")?.removeAttribute("hidden");
    sucesso?.classList.remove("visivel");
    form.elements["nome"]?.focus();
  });
}

/* ---------- Depoimentos ---------- */
function renderizarDepoimentos() {
  const caixa = document.getElementById("grade-depoimentos");
  if (!caixa || typeof DEPOIMENTOS === "undefined" || !DEPOIMENTOS.length) return;

  caixa.innerHTML = DEPOIMENTOS.map((d) => `
    <article class="card-depoimento revelar">
      <div class="card-depoimento__estrelas" role="img" aria-label="${d.nota} de 5 estrelas">
        ${ICONES.estrela.repeat(d.nota)}
      </div>
      <p class="card-depoimento__texto">${escapar(d.texto)}</p>
      <div class="card-depoimento__autor">
        <span class="card-depoimento__iniciais" aria-hidden="true">${escapar(d.iniciais)}</span>
        <span>
          <span class="card-depoimento__nome">${escapar(d.nome)}</span>
          <span class="card-depoimento__funcao">${escapar(d.funcao)}</span>
        </span>
      </div>
    </article>
  `).join("");
}

/* ---------- Ano do rodapé ---------- */
function iniciarRodape() {
  const el = document.getElementById("ano");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  iniciarHeader();
  iniciarLinksZap();
  iniciarRodape();
  renderizarDepoimentos();
  iniciarFormulario();
  iniciarGaleria();
  iniciarRevelar();
});
