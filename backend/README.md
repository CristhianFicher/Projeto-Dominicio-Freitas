# ONG Backend

API NestJS com TypeORM e PostgreSQL para o projeto Diomicio Freitas.

## Funcionalidades

- CRUD de estudantes
- CRUD de empresas
- CRUD de funcionarios
- CRUD de avaliacoes
- CRUD de relacionamentos
- migrations iniciais e seed de dados
- modulo de avaliacoes adaptado para `pessoa_id`, `tipo`, `professor_responsavel` e `q01..q46`

## Requisitos

- Node 18+
- Docker Desktop ou PostgreSQL acessivel localmente

## Ambiente

Copie o arquivo de exemplo:

```bash
copy .env.example .env
```

Valores padrao:

```env
PORT=3001
DATABASE_URL=postgres://postgres:postgres@localhost:5433/ong_db
```

## Subir o banco

```bash
docker compose up -d
```

## Instalar dependencias

```bash
npm install
```

## Rodar migrations

```bash
npm run typeorm:migration:run
```

## Iniciar a API

```bash
npm run start:dev
```

## Testes e validacao

```bash
npm run build
npm run test
```

O script de testes cobre os servicos de estudantes, avaliacoes e relacionamentos sem depender de banco externo.

## Endpoints principais

- `GET/POST/GET:id/PUT:id/DELETE:id /api/estudantes`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/empresas`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/funcionarios`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/avaliacoes`
- `GET /api/avaliacoes?pessoa_id=<uuid>`
- `GET/POST/GET:id/PUT:id/DELETE:id /api/relacionamentos`

## Estrutura importante

- `src/main.ts`: bootstrap da API, CORS e `ValidationPipe`
- `src/app.module.ts`: modulos e conexao principal do TypeORM
- `src/migrations/1760000000000-InitOngSchema.ts`: schema inicial
- `src/migrations/1760000001000-SeedOngData.ts`: seed inicial
- `src/migrations/1760000002000-AdaptAvaliacoesToActivity.ts`: adaptacao do modulo de avaliacoes para a entrega
