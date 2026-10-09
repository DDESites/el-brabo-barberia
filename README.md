# El Brabo Barbería — Site institucional

Site moderno e leve para a **El Brabo Barbería**: apresenta serviços, equipe, galeria e
localização, e facilita o agendamento pelo WhatsApp.

Construído em HTML, CSS e JavaScript puros — sem dependências, sem build e com carregamento
rápido (todas as ilustrações são SVG, com poucos KB cada).

A identidade segue a referência da marca: **brasão com rosto e barba, tesouras, estrelas e
arabescos sobre preto profundo com dourado metálico**.

---

## Como executar

**Opção 1 — servidor local (recomendado)**

```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

Depois acesse <http://localhost:8094> (a porta está definida no topo do `server.ps1`).

**Opção 2 — abrir direto**

Basta abrir o arquivo `index.html` no navegador. Funciona offline (as fontes do Google Fonts
caem automaticamente para Georgia/Arial se não houver internet).

---

## Estrutura

```
el-brabo-barberia/
├── index.html          → Início: hero, destaques, serviços, apresentação,
│                          galeria (prévia), depoimentos, localização e chamada final
├── servicos.html       → Lista completa de serviços + como agendar
├── sobre.html          → A barbearia: história, diferenciais, equipe e espaço
├── galeria.html        → Galeria com visualização ampliada (lightbox)
├── contato.html        → Canais, horários, mapa e formulário → WhatsApp
├── css/style.css       → Todo o visual (design tokens no topo do arquivo)
├── js/main.js          → WhatsApp, menu mobile, galeria, animações e formulário
│                          ⚠️ CONFIGURAÇÃO RÁPIDA no topo do arquivo
├── js/depoimentos.js   → Textos dos depoimentos (fácil de trocar)
├── img/                → Brasão, favicon e ilustrações (SVG)
│   ├── emblema.svg         brasão completo (cabeçalho e rodapé)
│   ├── favicon.svg         versão reduzida do símbolo
│   ├── hero-cartaz.svg     cartaz da seção principal
│   ├── espaco.svg          ilustração do espaço
│   ├── ferramentas.svg     ilustração das ferramentas
│   └── galeria-*.svg       6 imagens da galeria
├── docs/PRD.md         → Requisitos do projeto
├── .capturas/          → Capturas de tela das 5 páginas (para conferência)
├── server.ps1          → Servidor local para desenvolvimento
└── referencia-poster.png → Imagem de referência usada na identidade
```

---

## ⚠️ Checklist antes de publicar

Nada abaixo foi inventado como definitivo: tudo está marcado no site com o selo
**“a confirmar”** ou **“preço · a confirmar”**. Substitua pelos dados reais.

| # | Item | Onde alterar |
|---|------|--------------|
| 1 | **Número do WhatsApp** (55 + DDD + número) | topo de `js/main.js` → `WHATSAPP_NUMERO` |
| 2 | **Telefone** para ligação `(61) 99999-9999` | links `tel:` e textos do rodapé/contato em todos os `.html` |
| 3 | **Endereço completo** (rua, número, bairro, cidade) | `contato.html` e `index.html` (seção Onde estamos) |
| 4 | **Coordenadas do mapa** | `contato.html` → `<iframe>` OpenStreetMap e botão "Como chegar" |
| 5 | **Horários de funcionamento** | tabelas em `index.html` e `contato.html` |
| 6 | **Preços e durações dos serviços** | cartões em `servicos.html` e `index.html` (chips `a confirmar`) |
| 7 | **Instagram real** | links `instagram.com/elbrabobarberia` em todas as páginas |
| 8 | **Nomes, fotos e funções da equipe** | `sobre.html` → seção Equipe |
| 9 | **Texto institucional aprovado** | `sobre.html` → seção História |
| 10 | **Depoimentos autorizados** | `js/depoimentos.js` (hoje há 3 textos de exemplo, sem nomes) |
| 11 | **Fotos reais** da barbearia, equipe e trabalhos | substituir os SVGs em `img/` por JPG/WebP otimizados |
| 12 | **Logotipo oficial em vetor** | substituir `img/emblema.svg` e `img/favicon.svg` pelo arquivo oficial |
| 13 | **Imagem de compartilhamento (og:image)** | adicionar a tag em todas as páginas (PNG 1200×630) |

### Como trocar uma ilustração por uma foto

Substitua a tag `<img>` mantendo as proporções e os atributos:

```html
<div class="moldura-ouro revelar">
  <img src="img/espaco.jpg" alt="Descrição da foto" width="960" height="640" loading="lazy">
  <span class="moldura-ouro__etiqueta">Nosso espaço</span>
</div>
```

Na galeria, os itens são botões com legenda em `data-legenda`:

```html
<button class="item-galeria revelar" type="button" data-legenda="Corte degradê">
  <img src="img/galeria-corte.jpg" alt="Descrição da foto" width="640" height="480" loading="lazy">
  <span class="item-galeria__etiqueta">Corte</span>
</button>
```

Dica: converta as fotos para **WebP** e redimensione para no máximo 1600 px de largura — o
site continua rápido e o visual não muda.

---

## Identidade visual

A interface segue a referência da marca:

| Papel | Cor |
|-------|-----|
| Base | preto `#090909` e grafite `#131211` / `#1c1a18` |
| Texto | branco quente `#E8E5DF` e neutros quentes `#b5b0a7` |
| Ações e destaques | ouro claro `#E1AE45` (com brilho `#F0CB7B`) |
| Ornamentos, molduras e linhas | dourado envelhecido `#A87525` |

O efeito metálico do dourado vem de gradientes verticais (`#F0CB7B → #E1AE45 → #A87525`)
usados em botões, ornamentos e textos de destaque.

- **Títulos e marca:** Cinzel (serifada estreita, inspirada no lettering “EL BRABO”)
- **Textos e controles:** Inter (sem serifa, alta legibilidade)
- **Toques promocionais:** Italianno (cursiva, usada com moderação)

Tudo está centralizado em `css/style.css` (bloco `:root`) — mudando as variáveis ali, o site
inteiro acompanha.

O brasão (`img/emblema.svg`) preserva os elementos da referência: tesouras cruzadas no topo,
arco de cinco estrelas, rosto com topete e barba, postes de barbeiro laterais e arabescos
dourados.

---

## Funcionalidades

- **Botão flutuante de WhatsApp** em todas as páginas (fixo no canto).
- **Todos os botões de agendamento** abrem o WhatsApp com mensagem pronta (atributo
  `data-zap` em cada botão — edite o texto direto no HTML).
- **Galeria com lightbox**: clique para ampliar, navegue com setas do teclado e feche com `Esc`.
- **Menu mobile** com botão hambúrguer, fecha com `Esc` ou ao tocar num link.
- **Formulário de contato** que gera a mensagem e só envia após a confirmação do visitante
  (nenhum dado sai automaticamente).
- **Mapa** OpenStreetMap + botão “Como chegar” (Google Maps).
- **Links clicáveis** para telefone, Instagram e endereço.
- **Animações discretas** de entrada, desligadas automaticamente para quem usa a preferência
  “reduzir movimento” no sistema.
- **Acessibilidade:** link “pular para o conteúdo”, navegação por teclado, foco visível dourado,
  contraste alto, `alt` em todas as imagens e `aria-current` na página ativa.
- **Impressão:** estilos de impressão já preparados (cabeçalho e botões saem).

---

## Desempenho

- HTML, CSS e JS pequenos e sem dependências externas além das fontes.
- Imagens em **SVG** (vetoriais, pesam poucos KB e escalam em qualquer tela).
- `loading="lazy"` nas imagens abaixo da dobra.
- Testado sem estouro horizontal de 360 px (celular) até desktop.

---

## Evoluções possíveis (previstas no PRD)

- Agendamento integrado com escolha de serviço, profissional e horário.
- Área administrativa para atualizar serviços, preços e horários.
- Fotos reais autorizadas substituindo as ilustrações.
- Pagamento online, loja virtual e programa de fidelidade (fora do escopo da v1).
