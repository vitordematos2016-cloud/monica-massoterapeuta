# Changelog

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
