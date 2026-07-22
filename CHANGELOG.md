# Changelog

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
