# Projeto Diomicio Freitas

Aplicacao full stack para cadastro e acompanhamento de estudantes, empresas, funcionarios, avaliacoes e relacionamentos.

## Status atual

- Frontend React/Vite integrado com a API real via Redux Toolkit + Axios.
- Backend NestJS + TypeORM + PostgreSQL validado localmente.
- Fluxos de listagem, cadastro, edicao, avaliacao e relacionamentos apontam para a API em `http://localhost:3001/api`.
- O modulo de avaliacoes foi adaptado ao contrato da atividade com `pessoa_id`, `tipo`, `professor_responsavel` e `q01..q46`.
- Testes automatizados adicionados para frontend e backend.

## Tecnologias

- Frontend: React, Vite, Redux Toolkit, React Router, Axios
- Backend: NestJS, TypeORM, PostgreSQL
- Testes: Vitest no frontend e Node test runner no backend


## Documentação

- [Manual do Usuário](docs/MANUAL_USUARIO.md): guia de uso do sistema com instruções sobre login, cadastros, avaliações, encaminhamentos, dashboard e FAQ.

## Como rodar

### 1. Frontend

```bash
npm install
npm run dev
```

O frontend usa a API definida em `src/services/api.js`, atualmente com `baseURL` em `http://localhost:3001/api`.

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env
docker compose up -d
npm run typeorm:migration:run
npm run start:dev
```

Variaveis esperadas no `.env`:

```env
PORT=3001
DATABASE_URL=postgres://postgres:postgres@localhost:5433/ong_db
```

## Validacoes executadas

### Backend

- `npm run build`
- subida da API com PostgreSQL local
- chamada real para:
  - `GET /api/estudantes`
  - `GET /api/empresas`
  - `GET /api/funcionarios`
  - `GET /api/avaliacoes`
  - `GET /api/relacionamentos`
- ciclo completo de `POST`, `PUT` e `DELETE` em `estudantes`
- validacao real do modulo de avaliacoes com:
  - `GET /api/avaliacoes`
  - `GET /api/avaliacoes?pessoa_id=...`
  - `GET /api/avaliacoes/:id`
  - `POST /api/avaliacoes`

### Frontend

- `npm run lint`
- `npm run build`
- revisao dos fluxos que ainda estavam presos ao estado local antigo
- migracao das telas de edicao e avaliacao para Redux + API real
- inclusao da rota funcional `/relacionamentos`

## Testes automatizados

### Frontend

```bash
npm run test
```

Cobertura adicionada:

- tela de avaliacao em modo somente leitura quando ja existe avaliacao
- tela de edicao de estudante enviando `PUT` com UUID da API

### Backend

```bash
cd backend
npm run test
```

Cobertura adicionada:

- comportamento basico do `EstudantesService`
- comportamento do `AvaliacoesService`
- comportamento do `RelacionamentosService`, incluindo conversao de `criadoEm`

## Endpoints principais

- `GET/POST/GET:id/PUT:id/DELETE:id /api/estudantes`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/empresas`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/funcionarios`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/avaliacoes`
- `GET /api/avaliacoes?pessoa_id=<uuid>`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/relacionamentos`

## Observacoes

- O backend usa UUID como chave primaria.
- Em avaliacoes, o campo `id` e serial e `pessoa_id` referencia um estudante via UUID.
- O frontend ainda possui arquivos legados de contexto em `src/context`, mas o fluxo ativo da aplicacao usa Redux e a API real.
