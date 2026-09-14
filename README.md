# sdiascode — Portfólio | Silvio Dias Ferreira

Portfólio pessoal de **Silvio Dias Ferreira**, Engenheiro de Software Backend (.NET, React) — sistemas corporativos estáveis e landing pages de alta conversão.

- **Site:** https://sdiascode.com.br
- **Demo GitHub Pages:** `https://github.com/sdias-code/portifolio-site`
- **Stack:** HTML5 semântico, Tailwind CSS via CDN, CSS custom (`style.css`), JavaScript vanilla

## Estrutura

```
html/
├── index.html
├── style.css
├── README.md
└── img/
    ├── app.jpg
    ├── auditoria.jpg
    └── rank.jpg
```

## Seções do site (`index.html`)

1. **Header / Navbar** — logo `sdiascode`, links âncora + CTA WhatsApp + menu mobile (`#mobile-menu-btn`)
2. **Hero** — badge `Engenharia de Software • .NET • React • Minimal APIs`, banner com grid + glow, título `Sistemas Corporativos Estáveis e Landing Pages de Alta Conversão`, CTAs `Solicitar Orçamento` / `Conhecer App PRF ADM`, grid de métricas (+20 Anos, +4 Anos SAD/MS, 1º Lugar SEO, 100%)
3. **Sobre Mim (`#sobre`)** — badge `Trajetória & Filosofia`, bio + card `Tech Stack Principal` (.NET 8/9, C#, React, Web API, Clean Architecture, SQL Server/Oracle, Docker, Java/Spring)
4. **Serviços (`#servicos`)** — 3 cards: Engenharia & Manutenção .NET / Front-End React / Landing Pages de Alta Conversão
5. **Casos de Sucesso (`#casos-sucesso`)** — estudo de caso Kayzen Terapias: `1º Lugar do Google em 90 Dias`, métricas 100/100, 90 dias, zero anúncios + prints `img/auditoria.jpg` e `img/rank.jpg`
6. **Produtos (`#produtos`)** — App PRF ADM Quiz & Simulados (Flutter + SQLite, offline), CTA para https://concurso.sdiascode.com.br + `img/app.jpg`
7. **Contato (`#contato` / Vamos Conversar)** — CTA `Iniciar Conversa no WhatsApp` + formulário de contato (nome, e-mail, descrição) via FormSubmit para `assistenciapc.ms@gmail.com`
8. **Rodapé** — GitHub, LinkedIn, Instagram, App PRF ADM + copyright 2026

## Formulário de contato

- `action="https://formsubmit.co/assistenciapc.ms@gmail.com"` com `_subject`, `_template=table`, `_captcha=false`, honeypot `_honey`
- Validação HTML5 (`required`, `type=email`, `minlength=20 maxlength=1000`) + JS custom com contador `0 / 1000`, mensagens `role=alert` e foco no primeiro inválido
- Regras: nome mín. 2 chars, e-mail válido, descrição 20–1000 chars, placeholder: `Digite nesta area qual a sua necessidade e como podemos atende-lo.`
- **Ativação:** no primeiro envio, confirme o e-mail de ativação do FormSubmit em `assistenciapc.ms@gmail.com`.

## Estilos (`style.css`)

- `body` — fundo `#070a12`, fonte Plus Jakarta Sans
- `.glass-panel` + `.glass-panel-hover` — glassmorphism usado nos cards
- `.text-gradient` — gradiente `#38bdf8 → #60a5fa → #93c5fd` com `background-clip: text`
- `.bg-glow-blob` — glow do hero, responsivo `min(500px, 100vw)`
- Scrollbar custom WebKit + fallback Firefox (`scrollbar-width/color`)
- Âncoras com `scroll-mt-28` para compensar o header fixo `h-20`

## SEO

- `title`, `description`, `keywords`, `robots`, Open Graph, `lang="pt-BR"`, headings hierárquicos, `alt` nas imagens, labels associadas no form.

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
