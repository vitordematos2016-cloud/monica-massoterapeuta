# Pendências antes da publicação — Mônica Nunes

Este documento reúne tudo que precisa ser confirmado ou recebido da cliente antes de publicar
o site. Nenhuma dessas pendências é exibida para o visitante final — todas ficam registradas
apenas neste arquivo e em comentários no código.

## 1. Fotografias (prioridade alta)

O site atual (monicanunes.com.br) não possui nenhuma fotografia real de qualidade da
profissional, do ambiente ou dos atendimentos — apenas um vídeo de banco de imagens genérico
no topo da página. Nenhuma foto foi inventada ou gerada artificialmente.

Solicitar à cliente:
- [ ] 1 foto profissional de rosto/meio corpo para a seção "Sobre" (retrato, boa iluminação).
- [ ] 1 foto para o Hero (retrato ou foto do ambiente em uso).
- [ ] 3 a 8 fotos do ambiente/espaço de atendimento para a Galeria (recepção, sala de massagem,
      detalhes, materiais/produtos utilizados).
- [ ] Fotos de cada um dos 8 serviços, se disponíveis (opcional, mas recomendado).
- [ ] Logotipo em arquivo vetorial (SVG/AI) ou PNG em alta resolução, caso exista. Não foi
      encontrado nenhum logotipo no site atual — a versão atual usa apenas o nome estilizado.

Enquanto as fotos não chegam, o código usa composições visuais orgânicas temporárias
(gradientes e formas em `src/components/sections/Hero.tsx`, `About.tsx` e `ServiceCard.tsx`),
claramente marcadas com comentários `[INSERIR FOTO ...]`.

## 2. Depoimentos reais — ✅ resolvido com avaliações do Google

O site atual exibia 5 imagens de print de depoimentos (capturas de tela), sem texto extraível de
forma confiável e sem confirmação de autorização de uso. Em vez de usar essas imagens, localizei
o perfil real do Google Meu Negócio **"Estética Mônica Nunes"** (5,0 de média em 70 avaliações)
e usei 5 avaliações públicas reais (nome, nota em estrelas e texto, sem datas) em
`src/data/testimonials.ts`. Nenhum nome, texto ou nota foi inventado.

- [ ] Confirmar com a cliente se esses 5 nomes/textos podem permanecer publicados (são
      avaliações públicas do Google, mas o ideal é o ok explícito dela).
- [ ] Opcional: pedir para a cliente indicar outras avaliações do Google que prefira destacar,
      ou fornecer depoimentos adicionais por escrito.
- [ ] O Google Meu Negócio tem pelo menos 4 fotos próprias (recepção/fachada e uma foto de
      pedras quentes em atendimento) — ver item 1, pode ajudar a resolver a falta de fotos.

## 2.1 Divergência de endereço encontrada no Google

O Google Meu Negócio da Mônica informa um endereço **diferente** do que está no site atual:
**Rua Padre João Batista Lavello, 107, Centro, Serra Negra - SP, 13930-095** (vs. "Rua Antônio
Rici - Estância Suíça" do site antigo). Pode ser uma mudança de endereço não atualizada no site,
ou um erro de cadastro em uma das duas fontes.

- [ ] **Confirmar com a cliente qual endereço está correto/atual** antes de publicar — o site
      novo (`src/data/siteConfig.ts`) ainda usa o endereço do site antigo até essa confirmação.

## 3. Confirmações de conteúdo

- [ ] **Horário de atendimento**: o site atual informa 08:00–19:30 todos os dias da semana,
      inclusive domingo — mas o Google Meu Negócio da Mônica informa **09:00–17:00** todos os
      dias. São horários diferentes em cada fonte; confirmar qual está correto antes de publicar
      (`src/data/siteConfig.ts`, campo `hours`).
- [ ] **Endereço**: "Rua Antônio Rici - Estância Suíça, Serra Negra - SP" não tem número
      informado no site atual. Confirmar número/complemento.
- [ ] **Instagram**: confirmar se `@monica_nunes_estetica` continua sendo o perfil correto e
      ativo (o acesso automatizado ao Instagram foi bloqueado durante a auditoria e não pôde
      ser verificado visualmente).
- [ ] **Facebook**: confirmar se a página `facebook.com/110053860814292` ("Estética Monica
      Nunes") continua ativa.
- [ ] Confirmar se existem promoções/descontos vigentes (a pergunta do FAQ foi mantida de forma
      genérica, sem valores, pois nenhum valor foi informado no site atual).

## 4. Domínio de publicação

- [ ] O domínio usado no código (`monica-nunes.matossolucoes.com`) é provisório. Definir e
      atualizar o domínio/subdomínio definitivo em `index.html` (meta tags, canonical, JSON-LD)
      e em `src/data/siteConfig.ts` (`siteUrl`) antes de publicar.

## 5. Repositório e deploy

- [ ] Criar repositório GitHub dedicado para este projeto (nunca reaproveitar repositório de
      outro cliente).
- [ ] Configurar GitHub Secrets de FTP (Hostinger) próprios deste repositório, quando o domínio
      definitivo for definido.
