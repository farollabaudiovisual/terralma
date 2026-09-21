# Terralma — primeira etapa

Home demonstrativa em Astro. Somente a rota `/` foi criada. O briefing da Terralma prevalece sobre a skill Farol Web Design.

## Visualizar localmente

Requer Node.js 22.12+.

```powershell
npm install
npm run dev
```

Abra http://127.0.0.1:4321. Se a porta estiver ocupada, use o endereço informado pelo terminal.

```powershell
npm run build
npm run preview
npm test
```

Os testes usam Chromium do Playwright. Em uma nova máquina, instale-o com `npx playwright install chromium`.

## Arquivos e organização

- `src/pages/index.astro`: Home completa; nenhuma outra página.
- `src/layouts/BaseLayout.astro`: documento, metadados e componentes compartilhados.
- `src/components/`: Header, MobileMenu, Button, SectionHeading, Footer e FloatingWhatsApp; Brand, Icon, ProjectCard, ProjectRail e PreviewDialogs dão suporte à Home.
- `src/styles/tokens.css`: fontes locais, cores, tipografia, espaçamento, container e raios.
- `src/styles/global.css`: estilos globais, componentes e composição responsiva.
- `src/scripts/site.ts`: menu, prévias, trilhos e proteção contra sobreposição do WhatsApp.
- `src/data/site.ts`: navegação, serviços e configuração do contato oficial.
- `src/data/projects.ts` e `src/data/real-projects.json`: fonte única dos projetos reais exibidos na Home, agrupados por categoria.
- `public/fonts/`, `public/logo/`, `public/images/brand/`: cópias para a web dos arquivos fornecidos.
- `public/images/placeholders/`: imagens auxiliares das seções que ainda aguardam material aprovado.
- `public/assets/real-projects/`: cópias técnicas otimizadas dos projetos reais; a única fonte de verdade continua sendo `images/`.
- `scripts/prepare-assets.mjs`: preparação das cópias e download das referências; executar com `npm run assets` quando necessário.
- `scripts/prepare-project-assets.mjs`: seleciona e otimiza uma capa por projeto a partir de `images/`, preservando a origem e a contagem de imagens para as galerias futuras.
- `tests/home.spec.js` e `playwright.config.js`: validação responsiva e interações.
- `astro.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`, `.gitignore`: configuração do projeto.

Os originais em `fonts/`, `logo/` e `images/`, assim como os dois documentos de orientação, foram preservados. As fontes TTF fornecidas são servidas localmente, com preload e `font-display: swap`.

## Decisões desta demonstração

- A navegação aponta para âncoras reais da Home. Os futuros caminhos `/a-terralma`, `/servicos` e `/projetos` ainda não foram implementados.
- A Home mostra 10 projetos de Arquitetura, 11 de Interiores e 2 Comerciais, todos com capas reais otimizadas a partir da pasta `images/`. Os cards abrem uma prévia acessível; não existem páginas individuais nesta etapa.
- A imagem fornecida de Camila agora é o hero principal e também aparece na seção A Terralma. Os placeholders restantes são usados apenas nas seções que ainda aguardam imagens aprovadas.
- O padrão `logo/pattern_terralma.png` aparece com baixa opacidade no manifesto para criar textura de marca sem competir com o texto.
- A foto fornecida da Camila é horizontal; foi aplicada com recorte vertical, sem distorção. Um retrato aprovado pode substituí-la futuramente.
- WhatsApp, Instagram, TikTok e e-mail estão configurados em `src/data/site.ts`. O WhatsApp abre com a mensagem pré-preenchida “Vim do site e gostaria de mais informações.”
- Os textos de apresentação, serviços e biofilia são propostas para aprovação.
- A prévia usa `noindex, nofollow`. Remover apenas quando o conteúdo final estiver aprovado para publicação.

## Validação

As verificações cobrem 360, 390, 768, 1024, 1440 e 1920px: overflow, carregamento de imagens e fontes, âncoras, trilhos, menu por teclado/Escape, prévias, serviços, contato e movimento reduzido. Capturas ficam em `test-results/` após `npm test`.

Referência técnica: [documentação oficial do Astro](https://docs.astro.build/en/install-and-setup/). As URLs de origem das fotografias estão no manifesto de placeholders.
