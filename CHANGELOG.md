# Changelog

## [1.1.2] - Correção: botão "Enviar solicitação" ficava travado

- **Causa real**: a validação de nome exigia duas palavras (nome + sobrenome,
  `includes(' ')`). Quem preenchia só um nome (bem comum) tinha o botão bloqueado sem nenhuma
  explicação visível — e, por estar desabilitado, o clique não disparava nada, então a
  mensagem de erro nunca aparecia.
- Validação de nome simplificada para exigir apenas 2+ caracteres preenchidos, sem exigir
  sobrenome.
- **Data de preferência** e **Período** passaram a ser campos obrigatórios (antes eram
  opcionais), com validação de data feita por comparação de objetos `Date` em horário local
  (evita o bug clássico de fuso horário ao converter string ISO em data).
- Erros de nome, telefone, data e período agora também aparecem assim que o campo perde o foco
  (`onBlur`), e não somente depois de tentar enviar — dá feedback imediato sobre o que falta,
  mesmo com o botão principal desabilitado.

## [1.1.1] - Correção crítica: WhatsApp não abria ao enviar a solicitação

- O envio pelo WhatsApp tinha um atraso artificial (`setTimeout` de 500ms/300ms) entre o clique
  do visitante e a chamada de `window.open()`, usado só para exibir um estado visual de
  "processando". Isso quebrava a abertura em navegadores reais: Chrome, Safari e Firefox só
  permitem `window.open()` sem bloqueio de pop-up quando ele é chamado de forma síncrona, como
  reação direta ao clique — depois de qualquer atraso, o navegador deixa de reconhecer isso como
  gesto do usuário e bloqueia a aba silenciosamente, sem erro visível.
- Corrigido chamando `window.open()` imediatamente, sem nenhum atraso antes. O estado visual de
  "processando" foi removido (não fazia mais sentido, já que não há nada assíncrono para
  esperar antes de abrir o WhatsApp).
- O fallback "Tentar novamente" / "Copiar mensagem" continua funcionando normalmente para os
  casos em que o navegador ainda assim bloquear a aba.

## [1.1.0] - Reorganização completa do agendamento e da mensagem do WhatsApp

- **Etapa "Revisar e agendar" renomeada e reorganizada**: título "Revise e solicite seu
  horário" + texto explicativo. Conteúdo dividido em blocos claros com título e divisória
  próprios: Serviços selecionados, Dados pessoais, Preferência de atendimento, Observações,
  Confirmação e envio.
- **Serviços selecionados**: cada serviço em uma linha com ícone, nome (elemento principal),
  resumo curto (desktop) e botão discreto de remover; contador "N serviços selecionados"; sem
  preços.
- **Formulário**: todos os campos com label visível (nunca só placeholder) — Nome completo,
  Telefone com WhatsApp, Data de preferência, Período, novo campo "Horário aproximado", e
  Observações (opcional). Validação em tempo real (nome incompleto, telefone sem formato
  válido, data passada) com mensagens claras, sem `alert()` nativo.
- **Layout**: duas colunas equilibradas no desktop (serviços + aviso de confirmação à esquerda,
  formulário à direita, coluna esquerda fixa ao rolar) e uma única coluna mobile-first na ordem
  exigida. Elementos flutuantes (WhatsApp, "Minha seleção") somem automaticamente enquanto a
  seção de agendamento está visível na tela (`useFloatingUiSuppressed`, generalizado a partir do
  mecanismo já usado no mapa da Localização).
- **Resumo da solicitação**: recapitula serviços, data, período, horário e contato preenchidos,
  omitindo qualquer campo vazio; aviso final deixa claro que o horário depende de confirmação.
- **Botões**: "Voltar aos serviços" (secundário) e "Enviar solicitação pelo WhatsApp"
  (principal) — desabilitado até os campos obrigatórios serem válidos, com estado de
  processamento antes de abrir o WhatsApp.
- **Mensagem do WhatsApp reescrita** com estrutura profissional (blocos em negrito compatíveis
  com o WhatsApp, linha em branco entre blocos, serviços em lista, campos vazios removidos por
  completo — incluindo o bloco de observações e a linha de horário quando não informados).
- **Feedback pós-envio**: "Solicitação preparada com sucesso." (nunca "confirmado"); se o
  WhatsApp não abrir, oferece "Tentar novamente" e "Copiar mensagem" (com fallback de
  clipboard).

## [1.0.1] - Correção crítica do menu mobile

- Corrigido bug em que o conteúdo da página (avaliações, textos, botões) aparecia "vazando"
  por entre os itens do menu mobile aberto, com os botões flutuantes (WhatsApp, Minha seleção)
  sempre visíveis por cima. Causa raiz: o menu era `position: fixed` dentro do `<header>`, que
  passou a ter `backdrop-filter` (blur) quando o menu abre — isso cria um novo "containing
  block" para elementos fixos, colapsando a altura do menu para 0px e revelando o conteúdo por
  trás.
- Solução: o painel do menu mobile agora é renderizado via `createPortal` direto em
  `document.body`, totalmente fora do cabeçalho, com fundo sólido opaco e `z-index` acima de
  todos os elementos flutuantes do site (WhatsApp, Minha seleção, aviso de cookies, painel do
  carrinho).
- Aproveitado para adicionar fechamento por tecla Esc e foco preso dentro do menu enquanto
  aberto (`useFocusTrap`, já usado em modais do site), reforçando a acessibilidade.
- Versão desktop não foi alterada.

## [1.0.0] - Primeira publicação

- Criado o pipeline de deploy (`.github/workflows/deploy.yml`): build do projeto e envio de
  `dist/` via FTP ao Hostinger a cada push em `main`.
- Domínio definitivo aplicado em todo o projeto (meta tags, canonical, JSON-LD, `siteUrl`,
  `robots.txt`, `sitemap.xml`): `https://monica-massoterapeuta.matossolucoes.com`.
- Repositório dedicado `vitordematos2016-cloud/monica-massoterapeuta` conectado; `dev` mesclada
  em `main` e enviada ao GitHub, disparando o primeiro deploy.

## [0.9.2] - Endereço correto confirmado pela cliente

- Substituído o endereço do site antigo ("Rua Antônio Rici - Estância Suíça") pelo endereço
  correto e atual, confirmado pela cliente conforme o cadastro no Google: **Rua Padre João
  Batista Lavello, 107 - Centro, Serra Negra - SP, 13930-095**.
- Atualizado em `siteConfig.ts` (incluindo novo campo `zipCode`), no JSON-LD (`streetAddress` +
  `postalCode`) e refletido automaticamente na seção Localização e no Rodapé.

## [0.9.1] - Coordenadas reais no mapa da Localização

- Adicionadas as coordenadas reais confirmadas pela cliente
  (`-22.612817022671564, -46.70073503968954`) em `siteConfig.ts`.
- Mapa incorporado e botão "Abrir no Google Maps" passaram a usar as coordenadas diretamente
  (em vez de buscar pelo texto do endereço) — corrige o mapa aparecer "pela metade", coberto por
  um painel de detalhes do local que o Google exibia ao interpretar a busca por texto como uma
  ficha de estabelecimento.
- JSON-LD (dados estruturados) ganhou o campo `geo` (`GeoCoordinates`) com a coordenada real,
  reforçando o SEO local.

## [0.9.0] - Carrossel de Avaliações redesenhado (uma avaliação por vez + botões "folha")

- O carrossel de depoimentos deixou de ser uma faixa de cards com rolagem horizontal e passou a
  mostrar **uma avaliação por vez**, com indicador de posição ("1 de 5") e controles
  centralizados abaixo do card — nunca mais nas laterais, para não atrapalhar a leitura no
  celular.
- Criados botões de navegação com **formato orgânico de folha** (`leaf-btn-prev` /
  `leaf-btn-next` em `index.css`, `border-radius` assimétrico espelhado entre si), coerente com
  o `.blob-shape` já usado no resto do site. Área de toque de 48×48px (acima do mínimo de
  44×44), sem neon, sombra pesada ou aparência genérica.
- Navegação completa: clique, arraste (swipe) no celular, setas do teclado quando o carrossel
  está em foco, e loop elegante (da última avaliação volta para a primeira e vice-versa).
  Anúncio acessível via `aria-live` para leitores de tela.
- Transição suave (fade) ao trocar de avaliação; largura do card fixa, altura se adapta ao
  tamanho de cada texto. Nenhum texto, nome ou nota das avaliações reais foi alterado.
- Botão "Ver todas as avaliações no Google" permanece abaixo dos controles, com espaçamento
  generoso entre os elementos.

## [0.8.0] - Galeria do ambiente com fotos reais

- Seção Galeria preenchida com 3 fotos reais do espaço de atendimento, enviadas pela cliente
  (`src/assets/environment/`), recortadas em 3:4 e otimizadas em WebP.
- Grid redesenhado especificamente para 3 itens: coluna única no mobile (prioridade da maioria
  dos visitantes, fotos grandes e fáceis de ver) e 3 colunas equilibradas do tablet para cima —
  sem espaços vazios, todas do mesmo tamanho.
- Cada foto ganhou legenda (`figcaption`) e lightbox de ampliação já existente continua
  funcionando normalmente.

## [0.7.0] - Foto do Hero com recorte orgânico real

- A foto do Hero deixou de usar um retângulo de cantos arredondados (`rounded-[2.5rem]`) e
  passou a usar exatamente a mesma máscara orgânica e assimétrica (`blob-shape`) já usada nos
  elementos decorativos do site — sem cantos retos, sem fundo branco, sem card visível ao redor
  da fotografia.
- Foto recortada novamente (menos "zoom", mais margem nas laterais e embaixo) para que o rosto
  e as mãos cruzadas fiquem confortavelmente dentro da área visível da máscara orgânica, mesmo
  com o corte mais acentuado que ela faz nos cantos.

## [0.6.0] - Identidade "Mônica Nunes / Massoterapeuta" e ajustes finos de fotos

- Adicionado "Massoterapeuta" logo abaixo de "Mônica Nunes" em três lugares: logotipo do
  cabeçalho (`Logo.tsx`), animação de abertura (`IntroSplash.tsx`) e no título principal da
  seção Início (`Hero.tsx`), que agora exibe nome + profissão antes da frase de destaque "Seu
  corpo merece esse carinho.". Tamanhos responsivos com `clamp()` para caber sem cortes de
  320px a telas grandes.
- Removida a borda (`ring`) sutil ao redor da foto do Hero, apontada como indesejada.
- Foto da seção Sobre recortada novamente com mais espaço acima da cabeça — o corte anterior
  deixava o topo do cabelo quase tocando a borda da moldura orgânica.

## [0.5.0] - Reescrita da seção de Localização (mobile-first) e recorte das fotos

- **Localização**: título corrigido para "Venha nos visitar" (removido "Ou melhor" em todo o
  site). Seção reescrita com abordagem mobile-first real: no celular, ordem exata
  label → título → texto → endereço → botão "Abrir no Google Maps" → botão "Copiar endereço" →
  mapa → aviso de agendamento; no desktop/tablet largo (≥1024px), duas colunas equilibradas
  (conteúdo à esquerda, mapa à direita, altura igual).
- Mapa com camada "Toque para interagir com o mapa" no primeiro toque (mobile e desktop),
  evitando que o iframe capture a rolagem da página antes da ativação; após tocar, o próprio
  embed do Google exige Ctrl+scroll para zoom, reforçando a proteção contra scroll-jacking.
- Botão flutuante do WhatsApp agora se esconde suavemente (fade + escala) sempre que o mapa da
  Localização está visível na tela, para nunca cobrir os controles do mapa
  (`src/utils/mapVisibilityEvent.ts` + `IntersectionObserver` em `Location.tsx`).
- "Copiar endereço" ganhou fallback (`document.execCommand('copy')`) para navegadores sem
  suporte à Clipboard API, além do feedback "Endereço copiado" que já existia.
- **Fotos do Hero e Sobre recortadas manualmente** (Pillow) para enquadrar exatamente 4:5 sem
  depender do corte automático do navegador — rosto, ombros e mãos bem centralizados dentro da
  moldura do card, removendo espaço vazio excessivo ao redor da foto original.

## [0.4.0] - Fotos profissionais reais no Hero e Sobre

- Substituídas as composições orgânicas temporárias do Hero e da seção Sobre por 2 retratos
  profissionais reais de Mônica Nunes, enviados pela cliente (`src/assets/professional/`),
  otimizados para WebP (~39KB cada, 1000px de largura).
- Hero ganhou layout em duas colunas no desktop (texto + retrato emoldurado organicamente);
  no mobile o retrato aparece abaixo do texto/CTAs, mantendo a altura da seção controlada.
- Seção Sobre passou a exibir o retrato dentro da máscara orgânica já existente no design.
- Cards de serviço e Galeria continuam com placeholder — aguardando fotos do ambiente e dos
  atendimentos (ver [PENDENCIAS_CLIENTE.md](./PENDENCIAS_CLIENTE.md)).

## [0.3.0] - Seleção múltipla de serviços ("Minha seleção") e ajustes de UX

- **Seleção múltipla de serviços**: clicar em "Selecionar serviço" não abre mais o WhatsApp nem
  leva direto ao agendamento — o serviço é adicionado a "Minha seleção" (`SelectionContext`
  reescrito para lista ordenada de slugs, sem duplicatas). Card ganha contorno dourado fosco,
  selo "Selecionado" e o botão vira "Remover da seleção", sem alterar o tamanho do card.
- **Botão flutuante "Minha seleção · N"** (`CartButton`), visível apenas quando há itens e o
  painel está fechado, posicionado no canto oposto ao botão de WhatsApp para nunca sobrepor.
- **Painel "Minha seleção"** (`CartPanel`): painel lateral direito no computador, gaveta inferior
  (bottom sheet) no celular — mesmo componente, responsivo por breakpoint `lg`. Abre sozinho
  suavemente apenas na primeira seleção da sessão; fecha por botão, Esc ou clique fora. Lista os
  serviços na ordem escolhida, com resumo curto e remoção individual. "Limpar seleção" pede
  confirmação simples quando há mais de um item; "Revisar e agendar" fica desabilitado com a
  seleção vazia e leva à seção de agendamento sem abrir o WhatsApp.
- **Agendamento vira "Revise sua experiência"**: mostra todos os serviços selecionados
  (removíveis), botão "Voltar aos serviços", e o formulário (nome, telefone, data, período,
  observações, consentimento). Mensagem final do WhatsApp lista todos os serviços selecionados
  em tópicos, só é enviada no clique de "Enviar pedido pelo WhatsApp".
- **Recarregamento da página**: a animação de abertura com o nome agora aparece em todo
  recarregamento real (não apenas uma vez por sessão), dura ~2s, e a página sempre volta ao
  topo (`scrollRestoration = 'manual'` + `scrollTo(..., behavior: 'instant')`).
- **Botão "Ver todas as avaliações no Google"** abaixo do carrossel de Avaliações, apontando
  para o link oficial gerado pelo Google (`siteConfig.googleReviewsUrl`), em nova aba.
- Feedback acessível: região `aria-live` anuncia adições/remoções da seleção para leitores de
  tela; botões usam `aria-pressed` e `aria-label` descritivos.

## [0.2.0] - Avaliações reais do Google

- Seção de Avaliações preenchida com 5 avaliações reais e públicas do perfil "Estética Mônica
  Nunes" no Google (5,0 de média em 70 avaliações): nome, estrelas e texto, sem datas.
- Novo campo `rating` no tipo `Testimonial` e componente de estrelas visual + selo "Google" no
  card.
- `aggregateRating` real (5.0/70) adicionado aos dados estruturados (JSON-LD) para SEO local.
- Descoberta durante a pesquisa: o Google Meu Negócio informa endereço e horário de
  atendimento diferentes dos publicados no site antigo — registrado em
  [PENDENCIAS_CLIENTE.md](./PENDENCIAS_CLIENTE.md) para confirmação com a cliente antes da
  publicação.

## [0.1.0] - Primeira versão

- Auditoria completa do site anterior (monicanunes.com.br): conteúdo, serviços, FAQ, contato,
  redes sociais e problemas identificados (template "Coming Soon" residual, ausência de SEO,
  ausência de fotos reais).
- Novo projeto React 19 + Vite + TypeScript + Tailwind CSS v4.
- Identidade visual autoral (paleta verde-oliva/terracota/areia, tipografia Playfair Display +
  Poppins), com abertura animada única por sessão.
- Header fixo com navegação por âncoras, menu mobile acessível e destaque de seção ativa.
- Seções: Hero, Cuidado que se adapta a você, Sobre, Experiências (8 serviços reais com modal
  detalhado), Escolha pelo que você precisa sentir, Processo de atendimento, Galeria (preparada,
  vazia até receber fotos reais), Avaliações (preparada, vazia até receber depoimentos reais),
  Perguntas frequentes (acordeão acessível, 12 perguntas reais), Localização (com mapa
  incorporado e cópia de endereço), Agendamento (formulário com validação e envio via
  WhatsApp) e Contato/Horários.
- Rodapé com navegação, redes sociais, políticas (Privacidade, Cookies, Termos de Uso).
- Botão flutuante de WhatsApp e aviso de cookies.
- SEO: meta tags completas, Open Graph, dados estruturados (HealthAndBeautyBusiness + FAQPage),
  sitemap, robots.txt, manifest.
- Nenhuma informação foi inventada: preços, formação, avaliações e fotos ausentes ficam
  documentados em [PENDENCIAS_CLIENTE.md](./PENDENCIAS_CLIENTE.md).
