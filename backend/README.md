ONG Backend (NestJS + TypeORM + PostgreSQL)

Overview
- API NestJS alinhada ao front atual.
- CRUDs completos para:
  - estudantes
  - empresas
  - funcionarios
  - avaliacoes
  - relacionamentos
- Banco PostgreSQL com migration inicial + seed.

Requirements
- Node 18+
- Docker (opcional, para banco local rapido)

Environment
1. Copie `.env.example` para `.env`
2. Ajuste se necessario:
   - `PORT=3001`
   - `DATABASE_URL=postgres://postgres:postgres@localhost:5433/ong_db`

Run Postgres (Docker)
```bash
cd backend
docker compose up -d
```

Install
```bash
cd backend
npm install
```

Run migrations
```bash
npm run typeorm:migration:run
```

Start API
```bash
npm run start:dev
```

Main endpoints
- `GET/POST/GET:id/PUT:id/DELETE:id /estudantes`
- `GET/POST/GET:id/PUT:id/DELETE:id /empresas`
- `GET/POST/GET:id/PUT:id/DELETE:id /funcionarios`
- `GET/POST/GET:id/PUT:id/DELETE:id /avaliacoes`
- `GET/POST/GET:id/PUT:id/DELETE:id /relacionamentos`

Migrations
- `src/migrations/1760000000000-InitOngSchema.ts`
- `src/migrations/1760000001000-SeedOngData.ts`

Notes
- CORS e ValidationPipe globais estao ativos em `src/main.ts`.
- O backend usa UUID como chave primaria.
