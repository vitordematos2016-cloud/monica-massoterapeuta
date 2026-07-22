import type { ProcessStep } from '../types'

export const processSteps: ProcessStep[] = [
  {
    id: 'escolha',
    order: 1,
    title: 'Escolha a experiência',
    description: 'Navegue pelas experiências e descubra qual combina com o momento que você deseja viver.',
  },
  {
    id: 'preferencia',
    order: 2,
    title: 'Informe sua preferência de dia e período',
    description: 'Compartilhe o melhor dia e período para o seu atendimento.',
  },
  {
    id: 'conversa',
    order: 3,
    title: 'Converse com a Mônica',
    description: 'Seu pedido chega pelo WhatsApp para confirmarmos os detalhes com você.',
  },
  {
    id: 'confirmacao',
    order: 4,
    title: 'Confirme seu horário',
    description: 'Após a confirmação da disponibilidade, seu horário fica reservado.',
  },
  {
    id: 'momento',
    order: 5,
    title: 'Viva seu momento de cuidado',
    description: 'Chegou a hora de desacelerar e se cuidar com toda a atenção que você merece.',
  },
]
