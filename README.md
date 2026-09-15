# sdiascode — Portfólio | Silvio Dias Ferreira

Portfólio pessoal de **Silvio Dias Ferreira**, Engenheiro de Software Backend (.NET, React) — sistemas corporativos estáveis e landing pages de alta conversão.

- **Site:** https://sdiascode.com.br
- **Demo GitHub Pages:** `https://github.com/sdias-code/portifolio-site`
- **Stack:** HTML5 semântico, Tailwind CSS via CDN, CSS custom (`style.css`), JavaScript vanilla (`main.js`, carregado com `defer`)

## Estrutura

```
html/
├── index.html         # página principal (uma única página + formulário)
├── privacidade.html   # Política de Privacidade (LGPD)
├── main.js            # menu mobile + validação/envio do formulário (defer)
├── style.css          # glassmorphism, botões, inputs, pulse-dot, scrollbar
├── favicon.svg        # favicon "sd" em SVG
├── CNAME              # domínio custom (sdiascode.com.br)
├── README.md
└── img/
    ├── app.jpg        # ícone/print do App PRF ADM (usado no site + og:image)
    ├── auditoria.jpg  # (não referenciado no HTML atual)
    └── rank.jpg       # (não referenciado no HTML atual)
```

## Seções do site (`index.html`)

1. **Header / Navbar** — logo `sdiascode`, links âncora + CTA WhatsApp + menu mobile (`#mobile-menu-btn`)
2. **Hero** — badge `Engenharia de Software • .NET • React • Minimal APIs`, banner com grid + glow, título `Sistemas Corporativos Estáveis e Landing Pages de Alta Conversão`, CTAs `Solicitar Orçamento` / `Conhecer App PRF ADM`, grid de métricas (+20 Anos, +4 Anos SAD/MS, 1º Lugar SEO, 100%)
3. **Sobre Mim (`#sobre`)** — badge `Trajetória & Filosofia`, bio + card `Tech Stack Principal` (.NET 8/9, C#, React, Web API, Clean Architecture, SQL Server/Oracle, Docker, Java/Spring)
4. **Serviços (`#servicos`)** — 3 cards: Engenharia & Manutenção .NET / Front-End React / Landing Pages de Alta Conversão
5. **Casos de Sucesso (`#casos-sucesso`)** — 2 estudos de caso: App de Concursos em produção (Flutter, offline-first, métricas de retenção/usuários/downloads) e Kayzen Cursos e Terapias (site institucional, SEO local, integração WhatsApp)
6. **Produtos (`#produtos`)** — App PRF ADM Quiz & Simulados (Flutter + SQLite, offline), CTA para https://concurso.sdiascode.com.br + `img/app.jpg`
7. **Contato (`#contato` / Vamos Conversar)** — CTA `Iniciar Conversa no WhatsApp` + formulário de contato (nome, e-mail, descrição) via FormSubmit para `assistenciapc.ms@gmail.com`, com checkbox obrigatório de aceite da Política de Privacidade
8. **Rodapé** — GitHub, LinkedIn, Instagram, App PRF ADM, Privacidade + copyright 2026
9. **Privacidade (`privacidade.html`)** — página dedicada à Política de Privacidade (ver seção abaixo), linkada no checkbox do formulário e no rodapé

## Formulário de contato

- `action="https://formsubmit.co/assistenciapc.ms@gmail.com"` com `_subject`, `_template=table`, `_captcha=false`, honeypot `_honey`
- Validação JS custom em `main.js` (o form usa `novalidate`, então a validação nativa é desligada): contador `0 / 1000`, mensagens `role=alert` e foco no primeiro inválido
- Regras: nome mín. 2 chars, e-mail válido, descrição 20–1000 chars, placeholder: `Digite nesta area qual a sua necessidade e como podemos atende-lo.`
- **Ativação:** no primeiro envio, confirme o e-mail de ativação do FormSubmit em `assistenciapc.ms@gmail.com`.

## Política de Privacidade (LGPD)

- Página dedicada: **`privacidade.html`** — layout no mesmo padrão visual do site (Tailwind + `style.css`), com identificação (Silvio Dias Ferreira, pessoa física, controlador/operador), dados coletados (Nome, E-mail, Descrição), finalidade (orçamentos e contatos profissionais), direitos do usuário (confirmação/correção/exclusão via `assistenciapc.ms@gmail.com`, assunto `Exclusão de dados — LGPD`) e segurança (confidencial, sem compartilhamento com terceiros), conforme a Lei nº 13.709/2018.
- **Consentimento no formulário (`index.html`):** checkbox obrigatório `Li e concordo com a [Política de Privacidade]` acima do botão; o botão `Enviar mensagem` nasce `disabled` e só habilita após a marcação (`syncSubmitState()` em `main.js`); sem o aceite, o envio é bloqueado com mensagem de erro.
- **Evidência no e-mail (log):** a cada envio, o JS preenche dois campos hidden que seguem no corpo do e-mail (template `table` do FormSubmit):
  - `[Segurança e LGPD] Consentimento` — `O usuário marcou o checkbox e aceitou os termos da Política de Privacidade.`
  - `[Segurança e LGPD] Data/Hora` — data/hora do envio em `pt-BR` (`America/Campo_Grande`), servindo como histórico/log de cada consentimento.

## JavaScript (`main.js`)

- Carregado no `<head>` do `index.html` via `<script src="main.js" defer></script>` (não bloqueia a renderização; executa após o parsing, antes do `DOMContentLoaded`).
- Todo o comportamento fica dentro de um listener `DOMContentLoaded`: menu mobile (toggle + `aria-expanded`, fecha ao clicar em link), validação dos campos, contador da descrição, controle do checkbox LGPD e envio AJAX com `fetch` (`Accept: application/json`), incluindo estados `Enviando...`, sucesso e erro.
- Sem dependências — apenas JS puro (Vanilla).

## Estilos (`style.css`)

- `body` — fundo `#070a12`, texto `#cbd5e1` (equivale a `text-slate-300`), fonte Plus Jakarta Sans
- `.glass-panel` + `.glass-panel-hover` — glassmorphism usado nos cards
- `.text-gradient` — gradiente `#38bdf8 → #60a5fa → #93c5fd` com `background-clip: text`
- `.bg-glow-blob` — glow do hero, responsivo `min(500px, 100vw)`
- `.btn-primary` / `.btn-secondary` — gradientes + sombras + hover + `:disabled` centralizados (evitam repetir blocos Tailwind nos ~10 botões/CTAs)
- `.pulse-dot` (`::before`/`::after` + `@keyframes pulse-ring`) — substitui o bloco de spans `animate-ping` repetido nos badges
- `.form-input` / `.form-input-error` — estilo único dos campos + estado de erro (foco com anel `sky-500/30`); o JS alterna só `form-input-error`
- Scrollbar custom WebKit + fallback Firefox (`scrollbar-width/color`)
- `@media (prefers-reduced-motion: reduce)` — desativa animações/transições para quem prefere
- Âncoras com `scroll-mt-28` para compensar o header fixo `h-20`

## SEO

- `title`, `description`, `keywords`, `robots`, Open Graph (`og:image`, `og:locale`), Twitter Card, `canonical`, `theme-color`, `favicon.svg`, `lang="pt-BR"`, headings hierárquicos, `alt` + `width/height` + `loading="lazy"` nas imagens, labels associadas no form, `aria-hidden` em decorativos e `aria-expanded` no menu mobile.

## Rodar localmente

```bash
# na pasta html/
python3 -m http.server 8000
# abrir http://localhost:8000
```

Ou apenas abra `index.html` no navegador (recomendado via servidor para paths/Fontes funcionarem).

## Contato

- WhatsApp: https://wa.me/5567993298231
- E-mail (form): assistenciapc.ms@gmail.com
- GitHub: https://github.com/sdias-code
- LinkedIn: https://www.linkedin.com/in/sdias2026/
- Instagram: https://www.instagram.com/sdiascode.dev/
