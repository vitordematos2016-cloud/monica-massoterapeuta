import type { Service } from '../types'

// Conteúdo reescrito a partir dos textos reais publicados em monicanunes.com.br,
// com linguagem mais clara e responsável (sem promessas médicas ou resultados garantidos).
// [INSERIR FOTO REAL] em cada serviço antes da publicação — ver PENDENCIAS_CLIENTE.md.
export const services: Service[] = [
  {
    id: 'massagem-relaxante',
    slug: 'massagem-relaxante',
    name: 'Massagem Relaxante',
    shortSummary:
      'Movimentos suaves e ritmados para aliviar a tensão muscular e promover relaxamento profundo.',
    fullDescription:
      'A massagem relaxante utiliza movimentos suaves e ritmados sobre o corpo, com o objetivo de aliviar a tensão muscular e conduzir a mente a um estado de calma. É uma das experiências mais procuradas por quem deseja simplesmente desacelerar.',
    benefits: [
      'Pode contribuir para a melhoria da circulação sanguínea',
      'Auxilia no alívio da tensão física e mental',
      'Promove sensação de bem-estar e relaxamento',
      'Pode contribuir para uma melhor qualidade do sono',
    ],
    indicatedFor: 'Procurada por pessoas que desejam relaxar e aliviar o estresse do dia a dia.',
    image: '/src/assets/placeholders/service-massagem-relaxante.svg',
    imageAlt: '[INSERIR FOTO REAL] Massagem relaxante',
  },
  {
    id: 'drenagem-linfatica',
    slug: 'drenagem-linfatica',
    name: 'Drenagem Linfática',
    shortSummary:
      'Técnica especializada que estimula o sistema linfático com movimentos suaves e rítmicos.',
    fullDescription:
      'A drenagem linfática é uma técnica de massagem especializada que estimula o sistema linfático por meio de movimentos suaves e rítmicos, favorecendo o equilíbrio dos fluidos do corpo.',
    benefits: [
      'Pode auxiliar na sensação de redução do inchaço',
      'Contribui para a sensação de leveza',
      'Favorece o relaxamento geral do corpo',
      'Os resultados podem variar de pessoa para pessoa',
    ],
    indicatedFor: 'Procurada por pessoas que desejam sentir mais leveza no corpo.',
    image: '/src/assets/placeholders/service-drenagem-linfatica.svg',
    imageAlt: '[INSERIR FOTO REAL] Drenagem linfática',
  },
  {
    id: 'pedras-quentes',
    slug: 'massagem-pedras-quentes',
    name: 'Massagem com Pedras Quentes',
    shortSummary:
      'Pedras aquecidas posicionadas estrategicamente para intensificar a sensação de relaxamento.',
    fullDescription:
      'Nessa experiência, pedras aquecidas são posicionadas estrategicamente sobre o corpo e também utilizadas para realizar movimentos suaves e fluidos, combinando calor reconfortante com técnicas de massagem.',
    benefits: [
      'Pode auxiliar no relaxamento muscular',
      'Contribui para o alívio da sensação de tensão',
      'Promove uma experiência sensorial de tranquilidade',
      'Une o calor das pedras a movimentos terapêuticos suaves',
    ],
    indicatedFor: 'Indicada para quem busca uma experiência envolvente de relaxamento profundo.',
    image: '/src/assets/placeholders/service-pedras-quentes.svg',
    imageAlt: '[INSERIR FOTO REAL] Massagem com pedras quentes',
  },
  {
    id: 'bambuterapia',
    slug: 'bambuterapia',
    name: 'Bambuterapia',
    shortSummary:
      'Bambus de diferentes tamanhos utilizados como extensão das mãos em movimentos suaves e profundos.',
    fullDescription:
      'A bambuterapia utiliza bambus de diferentes tamanhos, que atuam como extensão natural das mãos, em movimentos suaves e profundos que percorrem o corpo, favorecendo o relaxamento muscular.',
    benefits: [
      'Pode contribuir para o relaxamento muscular',
      'Auxilia no alívio da sensação de tensão',
      'Favorece a estimulação da circulação',
      'Contribui para a sensação de bem-estar da pele',
    ],
    indicatedFor: 'Procurada por quem gosta de uma massagem com toque diferenciado e envolvente.',
    image: '/src/assets/placeholders/service-bambuterapia.svg',
    imageAlt: '[INSERIR FOTO REAL] Bambuterapia',
  },
  {
    id: 'gomagem-corporal',
    slug: 'gomagem-corporal',
    name: 'Gomagem Corporal',
    shortSummary:
      'Esfoliantes naturais aplicados em movimentos circulares para renovar suavemente a pele.',
    fullDescription:
      'A gomagem corporal utiliza esfoliantes naturais aplicados em movimentos circulares, com o objetivo de remover suavemente as células da superfície da pele e estimular a circulação.',
    benefits: [
      'Contribui para uma pele com sensação de mais suavidade',
      'Prepara a pele para absorver melhor tratamentos seguintes',
      'Promove sensação de renovação e bem-estar',
      'Auxilia na estimulação da circulação',
    ],
    indicatedFor: 'Indicada para quem deseja cuidar da textura e da sensação de viço da pele.',
    image: '/src/assets/placeholders/service-gomagem-corporal.svg',
    imageAlt: '[INSERIR FOTO REAL] Gomagem corporal',
  },
  {
    id: 'detox-corporal',
    slug: 'detox-corporal',
    name: 'Detox Corporal',
    shortSummary:
      'Conjunto de técnicas voltadas para a sensação de leveza e equilíbrio do corpo.',
    fullDescription:
      'O detox corporal reúne um conjunto de técnicas que trabalham em conjunto com o objetivo de promover uma sensação de leveza, equilíbrio e renovação da energia vital.',
    benefits: [
      'Pode auxiliar na sensação de redução do inchaço',
      'Contribui para uma sensação renovada de leveza',
      'Favorece o bem-estar geral do corpo e da mente',
      'Os resultados podem variar de pessoa para pessoa',
    ],
    indicatedFor: 'Procurada por quem deseja um cuidado dedicado à sensação de vitalidade.',
    image: '/src/assets/placeholders/service-detox-corporal.svg',
    imageAlt: '[INSERIR FOTO REAL] Detox corporal',
  },
  {
    id: 'limpeza-de-pele',
    slug: 'limpeza-de-pele',
    name: 'Limpeza de Pele',
    shortSummary:
      'Procedimento estético que remove impurezas e revitaliza a aparência da pele.',
    fullDescription:
      'A limpeza de pele é um procedimento estético que remove impurezas, com técnicas de extração e esfoliação que ajudam a desobstruir os poros e estimular a renovação da pele.',
    benefits: [
      'Contribui para uma pele com aparência mais radiante',
      'Auxilia na sensação de limpeza profunda',
      'Favorece a saúde da pele no dia a dia',
      'Um cuidado essencial dentro da rotina de bem-estar',
    ],
    indicatedFor: 'Essencial para quem deseja cuidar da aparência e da saúde da pele.',
    image: '/src/assets/placeholders/service-limpeza-de-pele.svg',
    imageAlt: '[INSERIR FOTO REAL] Limpeza de pele',
  },
  {
    id: 'spa-sobrancelhas',
    slug: 'spa-das-sobrancelhas',
    name: 'Spa das Sobrancelhas',
    shortSummary:
      'Técnicas de design, tintura e henna para realçar a beleza natural do olhar.',
    fullDescription:
      'O Spa das Sobrancelhas é um momento dedicado à beleza do olhar, com técnicas de design, tintura e henna que buscam realçar a beleza natural das sobrancelhas.',
    benefits: [
      'Contribui para a valorização do olhar',
      'Pode auxiliar na sensação de autoestima',
      'Um momento de cuidado rápido e agradável',
      'Técnicas adaptadas ao formato natural do rosto',
    ],
    indicatedFor: 'Indicado para quem deseja um cuidado rápido de embelezamento do olhar.',
    image: '/src/assets/placeholders/service-spa-sobrancelhas.svg',
    imageAlt: '[INSERIR FOTO REAL] Spa das sobrancelhas',
  },
]

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug)
