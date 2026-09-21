Farol Web Design

Crie interfaces refinadas, coerentes e responsivas, sem aparência genérica de template ou site produzido por IA.

A estética deve nascer da marca, do conteúdo, das imagens e das referências recebidas. Não imponha uma linguagem visual pronta ao projeto.

Regras obrigatórias

Não use numerais decorativos antes de títulos, etapas, serviços, projetos, benefícios ou itens, como 01, 02, 03, a menos que o usuário peça explicitamente ou a numeração seja necessária para compreensão.

Não use travessão em nenhum texto visível do site. Reescreva com vírgula, ponto, dois-pontos ou parênteses.

Quando o usuário fornecer uma paleta, trabalhe a partir dela. Não substitua cores, acrescente cores de marca arbitrárias ou aplique o padrão visual preferido pelo modelo.

Converta a paleta recebida em papéis funcionais e crie contraste por luminosidade, proporção de uso, fundos, superfícies, bordas e texto.

Defina um sistema de botões e reutilize-o no site inteiro. Não altere altura, raio, tipografia, ícone, padding ou comportamento a cada seção.

Preserve o sistema, os componentes, os tokens, a arquitetura, as rotas e os padrões do projeto existente antes de criar alternativas.

Não redesenhe uma página existente sem autorização. Em revisões, preserve a intenção visual e corrija os problemas encontrados.

Não invente textos finais, depoimentos, métricas, clientes, prêmios ou informações comerciais. Use conteúdo fornecido, sinalize placeholders ou peça o que falta.

Leitura do projeto

Antes de criar ou alterar a interface, identifique:

objetivo principal da página;

público e contexto de uso;

ação mais importante para o visitante;

ordem real de prioridade do conteúdo;

personalidade e posicionamento da marca;

materiais disponíveis, como paleta, logotipo, tipografia, fotos e referências;

restrições técnicas e padrões existentes no repositório;

o que deve ser preservado e o que pode ser reinterpretado.

Se houver referências visuais, extraia princípios, não apenas elementos isolados. Observe composição, proporção, alinhamento, densidade, ritmo, tipografia, tratamento fotográfico e comportamento responsivo.

Quando algum detalhe estiver ambíguo, escolha a solução mais simples que preserve a direção geral e registre a suposição de forma breve.

Análise de interface

Ao analisar uma referência ou apresentar uma proposta, organize a resposta com os títulos abaixo, sem numerá-los. Cada parte deve registrar decisões específicas que permitam reproduzir a interface.

Estrutura de layout

Explique container, grid, colunas, largura útil, alinhamentos, distribuição de conteúdo e estratégia responsiva. Indique o que ocupa a largura total e o que permanece contido.

Ordem das seções

Liste as seções na ordem exata em que aparecem e explique a função de cada uma na narrativa e na conversão. Questione se uma seção é redundante, precoce ou longa demais.

Navegação

Descreva cabeçalho, itens, CTA, estados ativos, dropdowns, comportamento fixo ou transparente, transição durante rolagem e padrão mobile. O menu mobile deve ser navegável, previsível e fácil de fechar.

Tipografia

Defina famílias, papéis, pesos, tamanhos fluidos, altura de linha, largura de leitura, uso de caixa alta e contraste hierárquico. A combinação deve corresponder à marca e continuar legível.

Sistema de cores

Mapeie cores para funções: fundo principal, fundo alternativo, superfície, texto principal, texto secundário, ação, borda, foco, erro e sucesso quando necessários. Explique combinações de contraste e proporção aproximada de uso.

Espaçamento e ritmo

Defina espaçamento interno, distância entre blocos, respiro entre seções, gaps e alinhamentos recorrentes. Diferencie intencionalmente seções densas, editoriais e contemplativas.

Tratamento de imagens

Explique função, enquadramento, proporção, corte, posição focal, overlay, legenda, carregamento e adaptação para mobile. Fotografia forte deve participar da composição, não preencher uma caixa genérica.

Cards e blocos de conteúdo

Explique quando o conteúdo precisa de contenção visual e quando tipografia e espaço são suficientes. Defina superfície, borda, raio, sombra, alinhamento, ícones e variações sem transformar todo conteúdo em card.

Botões e chamadas para ação

Defina CTA principal, secundário e links textuais, com dimensões, estados, contraste, ícones e regras de uso. Explique qual ação domina em cada etapa da página.

Sensação geral do design

Resuma estética, personalidade, tom emocional e impressão de uso com termos concretos. Relacione essa sensação às decisões anteriores, evitando descrições vagas como moderno ou premium sem explicação.

Sistema visual

Resolva primeiro tokens e padrões compartilhados. Faça ajustes locais apenas quando houver uma razão clara.

Cores

Quando houver uma paleta fornecida:

mantenha suas cores como fonte de verdade;

identifique qual cor suporta grandes áreas e qual deve aparecer apenas como acento;

derive tons mais claros ou escuros somente quando forem necessários para contraste, estados ou superfícies;

prefira variações construídas a partir das cores recebidas em vez de introduzir novas cores;

verifique contraste de texto, controles, links, foco e elementos sobre imagens;

não force todas as cores da paleta a aparecerem com o mesmo peso.

Registre as funções em tokens semânticos:

:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-accent: ...;
  --color-accent-contrast: ...;
  --color-border: ...;
  --color-focus: ...;
}

Não aplique gradientes, glassmorphism, blur, glow ou cores roxo e azul por padrão. Use efeitos apenas quando fizerem parte da direção visual e tiverem função clara.

Tipografia

Crie uma escala curta e coerente. Evite tamanhos isolados definidos para corrigir cada elemento.

Use clamp() quando a escala precisar responder ao viewport. Limite títulos grandes em telas amplas e revise quebras de linha em todas as faixas.

Como ponto de partida, textos corridos podem usar largura entre 45ch e 65ch e line-height entre 1.45 e 1.7. Ajuste conforme família, tamanho e contexto.

Não faça todos os títulos parecerem equivalentes. Hierarquia deve resultar de tamanho, peso, contraste, largura, posição e espaço, não apenas de fonte grande.

Espaçamento

Use uma escala compartilhada. Os valores podem mudar conforme o projeto, mas as relações devem permanecer reconhecíveis.

:root {
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;
  --space-7: 9rem;
}

Evite valores arbitrários sem justificativa visual. Se muitos elementos exigirem exceções, corrija o sistema.

Containers e grid

Use containers previsíveis, margens laterais confortáveis e alinhamentos compartilhados. Conteúdo importante não deve encostar na borda.

.container {
  width: min(100% - 2.5rem, 80rem);
  margin-inline: auto;
}

Ajuste conforme o projeto. Em mobile, use em geral de 20px a 24px de margem lateral. Em desktop, impeça crescimento indefinido. Uma lógica próxima de 12 colunas pode orientar alinhamentos, mas não precisa aparecer literalmente.

Botões

Crie um componente único com variantes deliberadas, normalmente primária, secundária e textual. Defina padrões compartilhados para:

altura mínima e área clicável;

padding horizontal;

tipografia e peso;

raio e borda;

ícone e distância do texto;

estado normal, hover, focus-visible, active e disabled;

comportamento em fundos claros, escuros e fotográficos.

O mesmo tipo de botão deve parecer e se comportar da mesma forma em header, hero, seções internas, formulários e rodapé. Uma exceção exige motivo funcional ou solicitação explícita.

Não transforme todo link em botão. Não use várias cores de CTA competindo entre si.

Cards

Cards devem expressar agrupamento real, ação ou comparação. Não use automaticamente a fórmula fundo branco, borda cinza, sombra, ícone, título e texto.

Defina poucos raios e níveis de elevação. Em projetos editoriais, arquitetônicos, hoteleiros, imobiliários e gastronômicos, considere composição, fotografia e espaço antes de adicionar caixas.

Imagens

Preserve proporção e ponto focal. Nunca distorça imagens. Use object-fit: cover apenas quando o corte for aceitável e controle object-position quando necessário.

Planeje enquadramentos adequados para desktop e mobile. Não esconda a parte mais importante da fotografia para manter uma proporção arbitrária.

Otimize formato, dimensões, srcset, carregamento e prioridade. A imagem principal não deve sofrer lazy loading quando isso prejudicar a primeira dobra.

Ícones e grafismos

Use uma família coerente, com espessura e estilo compatíveis. Não misture ícones preenchidos, lineares e ilustrações sem intenção.

Ícones não substituem títulos claros. Não adicione ícones a todos os itens apenas para ornamentar.

Responsividade

Desenvolva de forma fluida e mobile-first quando a base do projeto permitir. Mobile não é desktop encolhido.

Prefira Grid, Flexbox, minmax(), auto-fit, clamp(), unidades relativas e containers. Use breakpoints quando a composição precisar mudar, não para remendar cada elemento.

Revise pelo menos mobile estreito, mobile amplo, tablet em retrato, notebook estreito, desktop comum e desktop largo.

Em cada faixa, verifique ordem do conteúdo, quebras de títulos, largura de leitura, navegação, imagens, CTAs, formulários, overlays e overflow horizontal.

Áreas interativas devem ter aproximadamente 44px ou mais quando possível. Não ignore a faixa entre 768px e 1100px, onde composições de duas colunas frequentemente ficam comprimidas.

Acessibilidade e usabilidade

Use HTML semântico e hierarquia correta de headings.

Garanta navegação por teclado e focus-visible perceptível.

Não use apenas cor para transmitir significado.

Forneça labels, mensagens de erro úteis e estados de interação.

Escreva textos alternativos conforme a função da imagem.

Respeite prefers-reduced-motion.

Evite animações que atrasem leitura, navegação ou ação.

Preserve contraste adequado, inclusive sobre fotografias e nos estados de hover.

Direção visual sem aparência genérica

Evite por padrão:

numerais decorativos em série;

textos centralizados em quase todas as seções;

títulos gigantes usados apenas para preencher espaço;

três cards idênticos para explicar qualquer assunto;

badges sem função;

sombras em todos os componentes;

raios excessivos e iguais em tudo;

excesso de microcopy;

muitas fontes, cores, ícones ou efeitos;

palavras vazias como transforme, eleve, revolucione e experiência única sem evidência concreta;

layouts SaaS aplicados a marcas que pedem uma linguagem editorial, sensorial ou autoral.

Busque uma assinatura visual específica em composição, tipografia, imagem, ritmo ou interação. Não tente criar originalidade acumulando efeitos.

Implementação

Antes de escrever novos estilos, procure componentes e tokens existentes. Reutilize padrões compatíveis e evite criar um sistema paralelo.

Fluxo de trabalho:

compreender objetivo, conteúdo e referências;

auditar o sistema existente;

definir ou confirmar tokens de cor, tipografia, espaço, container, raio e movimento;

montar estrutura e hierarquia;

implementar componentes reutilizáveis;

adaptar a composição às diferentes larguras;

validar visualmente e funcionalmente;

corrigir primeiro causas sistêmicas e só então exceções reais.

Ao implementar a partir de screenshots, use-os como fonte de verdade para layout, hierarquia, proporção, densidade e comportamento. Traduza a referência para os padrões do projeto, sem copiar defeitos ou criar uma arquitetura paralela.

Revisão de página pronta

Em uma revisão, identifique a causa de cada problema antes de editar. Corrija primeiro overflow, hierarquia, quebras de texto, grids comprimidos, imagens deformadas, margens, alinhamentos, componentes divergentes, contraste, navegação mobile, áreas clicáveis e espaçamento.

Não redesenhe apenas porque existe outra solução possível. Preserve decisões intencionais que funcionam.

Validação final

Compare o resultado com referências e requisitos em desktop, tablet e mobile. Use inspeção visual no navegador quando disponível e itere até que estrutura, hierarquia, espaçamento e comportamento estejam coerentes.

Confirme:

a paleta fornecida foi respeitada e tem contraste suficiente;

componentes equivalentes seguem os mesmos padrões;

botões equivalentes mantêm variante, tamanho e comportamento;

não há numerais decorativos adicionados sem pedido;

não há travessões em textos visíveis;

nenhuma seção parece um bloco genérico sem relação com a marca;

conteúdo principal e ação prioritária são reconhecíveis rapidamente;

não há overflow, imagens deformadas ou quebras frágeis;

foco, teclado, movimento reduzido e estados interativos foram considerados;

suposições relevantes foram registradas brevemente.

Princípio final

Quando for possível escolher entre várias correções locais e uma melhoria no sistema que resolva o conjunto, prefira melhorar o sistema.

O objetivo é criar uma interface coerente, específica para a marca e robusta em diferentes tamanhos e contextos de uso.