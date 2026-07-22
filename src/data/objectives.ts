import type { Objective } from '../types'

export const objectives: Objective[] = [
  {
    id: 'relaxar',
    label: 'Quero relaxar',
    description: 'Experiências voltadas para desacelerar o corpo e a mente.',
    serviceSlugs: ['massagem-relaxante', 'massagem-pedras-quentes'],
  },
  {
    id: 'aliviar-tensao',
    label: 'Quero aliviar a sensação de tensão',
    description: 'Técnicas que trabalham diretamente a musculatura tensionada.',
    serviceSlugs: ['massagem-relaxante', 'bambuterapia', 'massagem-pedras-quentes'],
  },
  {
    id: 'cuidar-da-pele',
    label: 'Quero cuidar da pele',
    description: 'Cuidados estéticos para a saúde e a aparência da pele.',
    serviceSlugs: ['limpeza-de-pele', 'gomagem-corporal', 'spa-das-sobrancelhas'],
  },
  {
    id: 'sentir-leveza',
    label: 'Quero sentir mais leveza',
    description: 'Experiências associadas à sensação de leveza no corpo.',
    serviceSlugs: ['drenagem-linfatica', 'detox-corporal'],
  },
  {
    id: 'autocuidado',
    label: 'Quero viver um momento de autocuidado',
    description: 'Um momento só seu, dedicado inteiramente a você.',
    serviceSlugs: ['spa-das-sobrancelhas', 'massagem-relaxante'],
  },
  {
    id: 'nao-sei',
    label: 'Não sei qual escolher',
    description: 'Converse com a Mônica e receba uma recomendação personalizada.',
    serviceSlugs: [],
    isFallback: true,
  },
]
