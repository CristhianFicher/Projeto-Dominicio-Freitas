# Checklist de migracao JSON Server -> API real

Data da revisao: 2026-04-05

## 1) Chamadas do frontend mapeadas

Chamadas confirmadas no frontend atual:

- `GET/POST/PUT/DELETE /estudantes`
- `GET/POST/PUT/DELETE /empresas`
- `GET/POST/PUT/DELETE /funcionarios`
- `GET/POST/PUT/DELETE /avaliacoes`
- `GET/POST/DELETE /relacionamentos`

Arquivos principais:

- `src/redux/slices/estudantesSlice.js`
- `src/redux/slices/empresasSlice.js`
- `src/redux/slices/funcionariosSlice.js`
- `src/redux/slices/avaliacoesSlice.js`
- `src/components/RelacionarEstudanteEmpresa.jsx`

## 2) Validacao da API real

Status atual:

- backend compilado com sucesso em `backend/`
- PostgreSQL local validado via `docker compose`
- migrations executadas/localizadas corretamente
- chamadas HTTP reais executadas com sucesso para:
  - `GET /api/estudantes`
  - `GET /api/empresas`
  - `GET /api/funcionarios`
  - `GET /api/avaliacoes`
  - `GET /api/relacionamentos`
- ciclo completo de `POST`, `PUT` e `DELETE` validado em `estudantes`
- modulo de avaliacoes validado com:
  - `GET /api/avaliacoes`
  - `GET /api/avaliacoes?pessoa_id=<uuid>`
  - `GET /api/avaliacoes/:id`
  - `POST /api/avaliacoes`

Colecao Postman encontrada:

- `backend/postman/ONG.postman_collection.json`

## 3) Ajustes realizados no frontend

- telas de edicao migradas do contexto local legado para Redux + API real
- tela de avaliacao corrigida para ler estudantes/avaliacoes da store real
- payload de avaliacao adaptado para `pessoa_id`, `tipo`, `professor_responsavel` e `q01..q46`
- rota `/relacionamentos` ligada ao componente funcional de relacionamento
- cadastros de estudantes e empresas ajustados para tratar erro real da API com `unwrap()`
- dashboard atualizado para refletir dados vindos da API, e nao mais de `db.json`

## 4) Testes automatizados adicionados

Frontend:

- avaliacao em modo somente leitura quando ja existe registro
- edicao de estudante usando UUID e `PUT` real da API

Backend:

- `EstudantesService`
- `AvaliacoesService`
- `RelacionamentosService`

## Checklist de saida

- [x] Mapeamento das rotas concluido.
- [x] API real validada localmente com chamadas reais.
- [x] Frontend migrado para o backend real nos fluxos criticos.
- [x] Testes automatizados adicionados.
