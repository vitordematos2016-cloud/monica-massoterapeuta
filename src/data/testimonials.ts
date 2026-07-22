import type { Testimonial } from '../types'

// Avaliações reais e públicas do perfil do Google Meu Negócio "Estética Mônica Nunes"
// (5,0 de média em 70 avaliações). Nomes e textos coletados diretamente do Google Maps.
// Únicas edições: capitalização padrão dos nomes (Google exibe alguns em minúsculas) e
// o texto do Felipe foi encurtado até o último período completo, pois o Google trunca
// o texto na visualização pública sem login. Datas omitidas propositalmente, conforme
// solicitado. Texto das avaliações preservado como escrito pelos clientes (inclusive
// pequenos desvios de digitação, como "Recomendassimo").
export const testimonials: Testimonial[] = [
  {
    id: 'renata-acklas-benedito',
    authorName: 'Renata Acklas Benedito',
    rating: 5,
    source: 'google',
    text: 'Profissional excelente! Agendei massagem com ela no Hotel Filimahalo para toda minha família. Todos saímos satisfeitos e relaxados. Gostamos muito da atenção, pontualidade e das técnicas aplicadas pela Mônica, além de ser excelente profissional é uma simpatia.',
  },
  {
    id: 'danielle-luiz',
    authorName: 'Danielle Luiz',
    rating: 5,
    source: 'google',
    text: 'Vim para Serra Negra e tive a sorte de encontrar o espaço da Mônica! Fiz uma massagem com pedras e a reflexologia: ela encontrou pontos de tensão e conseguiu aliviá-los muito bem! Me senti leve, relaxada, plena depois da sessão. Ela foi muito simpática e atenciosa, o espaço é bonito e organizado, bem zen. Super indico!',
  },
  {
    id: 'felipe-guimaraes',
    authorName: 'Felipe Guimaraes',
    rating: 5,
    source: 'google',
    text: 'Experiência simplesmente incrível! Atendimento impecável, ambiente acolhedor e extremamente relaxante. Dá pra perceber o cuidado e profissionalismo em cada detalhe, desde a recepção até o final da sessão.',
  },
  {
    id: 'aurea-arashiro',
    authorName: 'Aurea Arashiro',
    rating: 5,
    source: 'google',
    text: 'A Mônica tem técnica e é habilidosa com as mãos. Massagem relaxante, pena que 60 minutos se torna pouco tempo...rs. Recomendassimo!',
  },
  {
    id: 'cristina-cunha',
    authorName: 'Cristina Cunha',
    rating: 5,
    source: 'google',
    text: 'Massagem maravilhosa. Super indico essa profissional maravilhosa.',
  },
]
