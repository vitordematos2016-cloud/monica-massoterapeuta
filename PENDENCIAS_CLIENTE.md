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

## 2. Depoimentos reais

O site atual exibe 5 imagens de print de depoimentos (capturas de tela), sem texto extraível de
forma confiável e sem confirmação de autorização de uso (podem conter nomes/fotos de terceiros
sem consentimento explícito para uso no novo site). Nenhum depoimento foi inventado.

- [ ] Solicitar depoimentos reais em texto, com autorização da cliente para publicar o nome.
- [ ] Alternativa: solicitar o link direto das avaliações públicas do Google/Facebook para
      referenciar ou incorporar.

A seção de Avaliações (`src/components/sections/Testimonials.tsx`) já está pronta para exibir
os depoimentos assim que `src/data/testimonials.ts` for preenchido — hoje está vazio.

## 3. Confirmações de conteúdo

- [ ] **Horário de atendimento**: o site atual informa 08:00–19:30 todos os dias da semana,
      inclusive domingo. Confirmar se isso está correto ou se é um erro do template antigo
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
