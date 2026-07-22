export const siteConfig = {
  businessName: 'Mônica Nunes',
  businessFullName: 'Mônica Nunes Estética e Massoterapia',
  tagline: 'Seu corpo merece esse carinho.',
  subtitle:
    'Massoterapia, estética e cuidado personalizado para você desacelerar, aliviar as tensões e recuperar o equilíbrio.',
  city: 'Serra Negra',
  state: 'SP',
  // Endereço confirmado no site atual, sem número de imóvel informado.
  // [CONFIRMAR NÚMERO/COMPLEMENTO DO ENDEREÇO COM A CLIENTE]
  address: {
    street: 'Rua Antônio Rici',
    neighborhood: 'Estância Suíça',
    city: 'Serra Negra',
    state: 'SP',
    country: 'Brasil',
    full: 'Rua Antônio Rici - Estância Suíça, Serra Negra - SP, Brasil',
  },
  phoneDisplay: '(19) 99845-0082',
  whatsappNumber: '5519998450082',
  email: 'monicacazotto1@gmail.com',
  social: {
    // [CONFIRMAR PERFIL DO INSTAGRAM] — confirmado como @monica_nunes_estetica no site atual,
    // mas o acesso automatizado ao Instagram foi bloqueado durante a auditoria.
    instagram: 'https://www.instagram.com/monica_nunes_estetica/',
    facebook: 'https://www.facebook.com/110053860814292',
  },
  // Link oficial gerado pelo recurso "Compartilhar" do próprio Google Maps para o perfil
  // real "Estética Mônica Nunes" (5,0 de média em 70 avaliações), localizado durante a
  // pesquisa de avaliações. Não é um endereço inventado.
  googleReviewsUrl: 'https://maps.app.goo.gl/hQ1QXFDsGR86HUfUA',
  // O site atual informa o mesmo horário todos os dias da semana, inclusive domingo.
  // [CONFIRMAR HORÁRIO DE ATENDIMENTO] — verificar com a cliente se realmente atende
  // todos os dias, inclusive domingos, das 08:00 às 19:30, ou se é um erro do template antigo.
  hours: [
    { day: 'Segunda-feira', time: '08:00 – 19:30' },
    { day: 'Terça-feira', time: '08:00 – 19:30' },
    { day: 'Quarta-feira', time: '08:00 – 19:30' },
    { day: 'Quinta-feira', time: '08:00 – 19:30' },
    { day: 'Sexta-feira', time: '08:00 – 19:30' },
    { day: 'Sábado', time: '08:00 – 19:30' },
    { day: 'Domingo', time: '08:00 – 19:30' },
  ],
  paymentMethods: ['Dinheiro', 'Pix', 'Cartão de débito', 'Cartão de crédito'],
  // Domínio provisório — ajustar para o domínio/subdomínio definitivo antes da publicação.
  // [CONFIRMAR DOMÍNIO DEFINITIVO DE PUBLICAÇÃO]
  siteUrl: 'https://monica-nunes.matossolucoes.com',
} as const

export const NAV_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre a Mônica' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'contato', label: 'Contato' },
] as const
