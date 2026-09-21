# Terralma - Direção e plano do novo site

site atual: https://arquiteturaterralma.com.br/

## Objetivo deste primeiro modelo

Criar uma versão demonstrável, premium e totalmente responsiva do site da Terralma. Ela não deve parecer uma correção visual do site atual, mas uma nova experiência: mais editorial, silenciosa e focada na qualidade dos projetos.

O conceito é **Terra + Alma**:

- **Terra:** matéria, arquitetura, pedra, madeira, argila, luz natural e vegetação.
- **Alma:** presença, bem-estar, memória e um projeto pensado para quem vive ali.

Evitar aparência de site corporativo, muitos cards, textos longos, sombras, gradientes fortes, carrosséis automáticos e efeitos que possam distorcer o layout. O resultado precisa transmitir cuidado, autoria e maturidade.

## Identidade visual

### Tipografia

| Uso | Fonte | Direção |
|---|---|---|
| Títulos, nomes de projetos e frases de impacto | Poiret One Regular | Grande, arejada e editorial. Usar com intenção, nunca em textos longos. |
| Navegação, categorias, botões, textos e números | Questrial Regular | Legível, discreta e funcional. |

### Cores

| Papel | Cor |
|---|---|
| Terracota principal | `#76351A` |
| Off-white | `#F2E8DE` |
| Terracota clara | `#9B5438` |
| Texto escuro | `#2B1A12` |

Usar o terracota principal como cor de marca. Não criar um terceiro tom de terracota nos componentes. Hover pode escurecer levemente a mesma cor.

### Regras de composição

- Fundo predominante off-white, com blocos terracota como pausas de ritmo.
- Fotos grandes, com proporções variadas e bastante área de respiro ao redor.
- Bordas arredondadas consistentes: `20px` desktop e `16px` mobile.
- Container máximo: `1440px`; padding lateral: `48px` desktop, `24px` tablet, `18px` mobile.
- Textos com largura controlada. Não usar parágrafos corridos em largura total.
- Animações pequenas e elegantes: reveal de imagem, mudança de opacidade e deslocamento máximo de 12px. Respeitar `prefers-reduced-motion`.
- Não usar scroll horizontal da página. Só os trilhos de projetos podem arrastar horizontalmente.

## Arquitetura do site

1. **Home** - narrativa curta, projetos em primeiro plano e convite para conversa.
2. **A Terralma** - história, visão da Camila, biofilia e processo.
3. **Serviços** - o que é entregue e como a Terralma pode ajudar.
4. **Projetos** - índice filtrável por Arquitetura, Interiores e Comercial.
5. **Projeto individual** - galeria editorial, organizada em sequência espacial.
6. **Contato** - formulário curto e WhatsApp.

Navegação: `Início | A Terralma | Serviços | Projetos` + botão discreto `Iniciar um projeto`.

No mobile, usar menu fullscreen simples. O botão circular de WhatsApp deve ficar fixo no canto inferior direito em todas as páginas, sem cobrir CTAs ou controles de galeria.

## Home - fluxo de experiência

### 1. Hero: impacto imediato

- Foto ou vídeo de arquitetura em tela inteira, com crop bem definido para desktop e mobile.
- Logo pequeno no topo e navegação com contraste correto.
- Título: **Arquitetura que se sente.**
- CTA primário: `Iniciar um projeto`.
- Não colocar uma caixa grande de texto central. A foto e a frase devem respirar.

### 2. Manifesto curto

Bloco terracota ou off-white com uma frase curta e forte sobre projetar espaços que acolhem, funcionam e têm identidade. Deve substituir a sensação de texto institucional do site atual.

### 3. Projetos em destaque

- Título: **Nossos projetos**.
- Categorias em Questrial, caixa alta e negrito: `ARQUITETURA | INTERIORES | COMERCIAL`.
- Cada categoria contém um trilho horizontal arrastável de fotos de projetos diferentes, com cantos arredondados.
- Mostrar no desktop cerca de 2,3 cards por vez e no mobile 1,15 card: a próxima imagem aparecendo comunica que existe mais conteúdo.
- Incluir setas discretas no desktop e arraste nativo no touch. Sem autoplay.
- Cada card abre o projeto correspondente. Não repetir a mesma imagem ou o mesmo projeto na mesma faixa.

### 4. A Terralma

Foto vertical da Camila integrada ao layout, com texto curto ao lado.

Título sugerido: **A frente da Terralma está Camila Vargas, arquiteta e fundadora do escritório.**

Conteúdo: 2 parágrafos curtos sobre escuta, projetos autorais, natureza e rotina. Sem bloco branco sobreposto.

CTA centralizado: `Conheça a Terralma` e link para `/a-terralma`.

### 5. Biofilia

Imagem ampla com overlay sutil somente onde o texto estiver.

Título: **A biofilia como base da arquitetura.**

Mensagem central: biofilia não é acrescentar plantas como decoração; é pensar luz, ventilação, materiais, vistas e a relação cotidiana entre pessoas e natureza.

CTA opcional: `Conheça nosso olhar` para a página A Terralma.

### 6. Encerramento / contato

Uma imagem tátil, humana ou de detalhe de material, em vez de repetir uma foto genérica.

Texto: **Vamos dar o primeiro passo?**

CTA: `Iniciar um projeto`.

## A Terralma

1. Hero de imagem com a frase `Arquitetura e interiores em Atibaia, São Paulo e região.` centralizada sobre a imagem, no eixo horizontal e vertical.
2. Seção da Camila: retrato, texto enxuto e CTA centralizado `Conheça nossos serviços`, levando para `/servicos`.
3. Seção Biofilia com o texto revisado pela cliente, em Questrial com iniciais maiúsculas.
4. Processo em quatro etapas, visual e simples: `Imersão`, `Fase Terra`, `Fase Alma`, `Projeto Executivo`.
5. CTA final.

## Serviços

Manter os quatro serviços da marca, mas reduzir o peso de texto e eliminar a aparência de cards empilhados.

- Projetos de Arquitetura e Interiores
- Curadoria do Lar Ideal
- Projetos para Prefeitura
- Acompanhamento de Obra

No desktop, usar uma composição editorial assimétrica de duas colunas com fotos de apoio. No mobile, transformar cada serviço em bloco vertical com imagem, título, 2-3 linhas de explicação e uma lista curta quando necessário.

## Projetos e páginas individuais

### Página índice

- Fundo off-white, título `Projetos` em Poiret One.
- Filtros: `Todos`, `Arquitetura`, `Interiores`, `Comercial`.
- Grade com fotos originais preferencialmente quadradas, não forçar todos os assets em retângulos iguais.
- Nome em minúsculas, usando Poiret One.
- Único terracota de marca em botões, filtros ativos e detalhes.

### Regras de dados e curadoria

Antes de publicar, criar uma fonte de dados única para cada projeto com: nome correto, categoria, capa correta, imagens e ordem da galeria. Isso impede erros como misturar fotos de outros apartamentos ou duplicar um projeto.

Ordem obrigatória de uma galeria:

1. Chegada: fachada, hall ou vista geral.
2. Ambientes sociais.
3. Ambientes de serviço.
4. Ambientes íntimos.
5. Externos, detalhes e fechamento.

Para cada ambiente, agrupar perspectivas semelhantes. Exemplo: todas as imagens da cama em sequência, depois armários, e assim por diante. Não embaralhar internos e externos.

### Projeto individual

- Hero com capa, nome e categoria.
- Uma frase curta opcional, sem descrever tudo.
- Galeria de imagens em sequência, sem mosaico aleatório.
- `Projeto anterior` e `Próximo projeto` ao final.
- CTA de contato discreto após a galeria.

## Responsividade - requisitos inegociáveis

- Mobile é uma composição própria, não apenas desktop comprimido.
- Testar em 360px, 390px, 768px, 1024px, 1440px e 1920px.
- Não permitir distorção ao redimensionar; usar `aspect-ratio`, `object-fit: cover`, limites de largura e `clamp()` para tipografia.
- Não usar altura fixa para blocos com texto.
- Não permitir que seções que expandem empurrem ou estiquem seções seguintes de forma incorreta.
- Navbar, carrosséis, filtros e WhatsApp devem continuar acessíveis por teclado e touch.
- Garantir contraste de texto sobre imagem com overlay adaptativo, nunca escurecendo a foto inteira sem necessidade.

## Ordem de execução rápida

1. Criar tokens de cor, tipo, espaçamento, raio e breakpoints.
2. Montar a Home completa com imagens de placeholder bem escolhidas e layout final.
3. Implementar navegação, footer e botão flutuante de WhatsApp.
4. Construir a página A Terralma e Serviços reutilizando os mesmos componentes.
5. Criar dados de projetos + índice de projetos + template individual.
6. Inserir as imagens reais, validar nomes, capas, categorias e sequências de cada galeria.
7. Testar responsividade e navegação em viewport real; corrigir antes de mostrar à cliente.

## Prompt de implementação para colar no Codex

```text
Implemente um novo site para o escritório de arquitetura Terralma usando este arquivo TERRALMA_SITE_BRIEF.md como fonte de verdade.

Prioridades: experiência premium/editorial, imagens protagonistas, muito respiro, responsividade impecável e boa acessibilidade. Não reutilize a composição visual do site atual. Use Poiret One para títulos e nomes de projetos; Questrial para navegação, corpo, categorias e botões. Use a paleta #76351A, #F2E8DE e #9B5438, sem criar novos tons de terracota para componentes.

Comece pela Home e construa a estrutura de todas as páginas em seguida. Use componentes reutilizáveis: Header, MobileMenu, SectionHeading, ProjectRail, ProjectCard, CTA, Footer e FloatingWhatsApp. Crie uma fonte de dados única para projetos, contendo nome, categoria, capa e imagens em ordem. A galeria precisa obedecer a uma sequência espacial coerente e nunca misturar imagens de projetos diferentes.

O layout deve funcionar em 360px, 390px, 768px, 1024px, 1440px e 1920px. Evite alturas fixas em conteúdo textual e use aspect-ratio/object-fit para imagens. Não deve existir scroll horizontal na página, distorção ao redimensionar ou carrossel automático. Carrosséis de projetos precisam permitir arraste no touch, botões acessíveis no desktop e mostrar parte do próximo card.

Implemente primeiro com assets de placeholder nomeados claramente onde as imagens reais ainda não estiverem disponíveis. Antes de finalizar, revise em desktop e mobile e corrija qualquer overflow, corte ruim de imagem, contraste insuficiente e falha de interação.
```

## Materiais ainda necessários antes da versão final

- Arquivos do logo e as duas fontes em formato web (`.woff2`, de preferência).
- Fotos aprovadas para a Home e uma capa correta para cada projeto.
- Texto final revisado de Biofilia e da apresentação da Camila.
- Link oficial de WhatsApp e canais sociais.
- Lista final de projetos, categorias e imagens na ordem correta.

## Canais oficiais

- Instagram: https://www.instagram.com/arquiteturaterralma/
- TikTok: https://www.tiktok.com/@arquiteturaterralma
- WhatsApp: https://wa.me/5511988217611?text=Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.
- E-mail comercial: comercial@arquiteturaterralma.com.br

O WhatsApp deve abrir diretamente com a mensagem pré-preenchida: `Vim do site e gostaria de mais informações.`
