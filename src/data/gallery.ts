import type { GalleryImage } from '../types'
import salaAtendimento from '../assets/environment/ambiente-sala-atendimento.webp'
import detalhesVela from '../assets/environment/ambiente-detalhes-vela.webp'
import cafeEPlantas from '../assets/environment/ambiente-cafe-plantas.webp'

// Fotografias reais do ambiente, enviadas pela cliente (pasta AMBIENTE).
// Ordenadas da mais representativa do espaço de atendimento para a mais atmosférica.
export const galleryImages: GalleryImage[] = [
  {
    id: 'sala-atendimento',
    src: salaAtendimento,
    alt: 'Sala de atendimento de Mônica Nunes, com maca preparada, painel de bambu e iluminação aconchegante',
    caption: 'Sala de atendimento',
  },
  {
    id: 'detalhes-vela',
    src: detalhesVela,
    alt: 'Detalhe do ambiente com vela acesa, plantas naturais e elementos de relaxamento',
    caption: 'Detalhes que compõem a experiência',
  },
  {
    id: 'cafe-plantas',
    src: cafeEPlantas,
    alt: 'Momento de acolhimento com uma bebida quente entre plantas naturais',
    caption: 'Um espaço para desacelerar',
  },
]
