# Mônica Nunes — Estética e Massoterapia

Landing page premium para Mônica Nunes, massoterapeuta e esteticista em Serra Negra - SP.

Construída a partir de uma auditoria completa do site anterior (monicanunes.com.br), mantendo
todo o conteúdo real (serviços, FAQ, contato, endereço) e substituindo a estrutura por uma
experiência autoral, acolhedora e responsiva. Veja [PENDENCIAS_CLIENTE.md](./PENDENCIAS_CLIENTE.md)
para tudo que ainda precisa ser confirmado ou recebido da cliente antes da publicação.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- lucide-react (ícones)

## Estrutura

```
src/
  components/
    layout/     Header, Footer, WhatsAppFloatButton, CookieConsent, IntroSplash
    sections/   Hero, Highlights, About, Services, ObjectivePicker, Process,
                Gallery, Testimonials, Faq, Location, Booking, Contact
    forms/      BookingForm
    ui/         Button, Container, SectionHeading, Reveal, Modal
  context/      SelectionContext (serviço selecionado para agendamento)
  data/         siteConfig, services, faq, objectives, process, gallery, testimonials
  hooks/        useInView, useActiveSection, useScrollLock, useFocusTrap
  utils/        whatsapp, dateValidation, clipboard
  types/        tipos compartilhados
```

## Comandos

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção (tsc -b && vite build)
npm run lint      # oxlint
npm run preview   # pré-visualização do build
```

## Fluxo de agendamento

O formulário de agendamento não confirma horários automaticamente — ele monta uma mensagem
formatada e abre o WhatsApp da Mônica (`+55 19 99845-0082`) para que a confirmação seja feita
diretamente com a cliente.
