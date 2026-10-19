# Portfólio — Vinicius

Portfólio pessoal estático, responsivo e acessível, desenvolvido com HTML, CSS e JavaScript puro.

**Site publicado:** https://portfolio-vinicius-tan.vercel.app

## Estrutura

```text
portfolio-vinicius/
├── dist/
│   ├── assets/
│   │   └── vinicius-linkedin.webp
│   ├── favicon.svg
│   ├── index.html
│   ├── robots.txt
│   ├── script.js
│   ├── sitemap.xml
│   └── styles.css
├── .gitignore
├── DEPLOY.md
└── README.md
```

## Recursos

- Tema escuro/claro persistente
- Menu responsivo e navegação ativa
- Efeito de digitação e partículas em canvas
- Animações no scroll com suporte a `prefers-reduced-motion`
- Botão para copiar e-mail
- SEO e Open Graph
- HTML semântico, foco visível e navegação por teclado

## Executar localmente

Abra `dist/index.html` diretamente no navegador ou use um servidor estático:

```bash
npx serve dist
```

## Personalização rápida

- Conteúdo: `dist/index.html`
- Cores e layout: variáveis no topo de `dist/styles.css`
- Interações: `dist/script.js`
- Foto: altere o `src` da imagem dentro de `.portrait-frame`

## Próximas melhorias

1. Publicar o blog com CMS headless e páginas individuais otimizadas para SEO.
2. Criar READMEs com screenshots, arquitetura e decisões técnicas em cada projeto.
3. Adicionar analytics com foco em privacidade e eventos de conversão dos botões de contato.
