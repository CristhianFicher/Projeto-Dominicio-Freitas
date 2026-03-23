# Checklist de migração JSON Server -> API real

## 1) Mapeamento das chamadas atuais do JSON Server (front)

Base atual: `src/services/api.js` com `baseURL` padrão `http://localhost:3001`.

### Rotas usadas hoje no front (Redux thunks)
- `GET /estudantes` (agora migrado para API real em `GET /clients`)
- `POST /estudantes`
- `PUT /estudantes/:id`
- `DELETE /estudantes/:id`
- `GET /empresas`
- `POST /empresas`
- `PUT /empresas/:id`
- `DELETE /empresas/:id`
- `GET /funcionarios`
- `POST /funcionarios`
- `PUT /funcionarios/:id`
- `DELETE /funcionarios/:id`
- `GET /avaliacoes`
- `POST /avaliacoes`
- `PUT /avaliacoes/:id`
- `DELETE /avaliacoes/:id`

## 2) Rotas já existentes na API real (verificadas via coleção Postman)

Arquivo fonte: `backend/postman/RedCar.postman_collection.json`.

- `GET /dashboard`
- `GET /parts`
- `POST /parts`
- `GET /revisions`
- `POST /revisions`
- `GET /clients`
- `POST /clients`
- `GET /suppliers`
- `POST /suppliers`
- `GET /team`
- `POST /team`

## 3) Ordem de migração (prioridade)

1. **Leituras (GET) de listas** (menor risco):
   - Estudantes -> `GET /clients` ✅ (iniciado e concluído na fase 1)
   - Empresas -> mapear para endpoint real correspondente (a definir)
   - Funcionários -> mapear para endpoint real correspondente (a definir)
   - Avaliações -> endpoint real específico (a definir)

2. **Criação (POST)**
3. **Atualização (PUT/PATCH)**
4. **Exclusão (DELETE)**

## 4) Primeira funcionalidade migrada (GET)

### Escopo
- Tela/lista de estudantes (`fetchEstudantes`) não depende mais de `GET /estudantes` do JSON Server.
- Agora usa **API real**: `GET /clients`.

### Arquivo alterado
- `src/redux/slices/estudantesSlice.js`

### Regra de mapeamento aplicada
- `client.name` -> `estudante.nome`
- `client.email` -> `estudante.email`
- Campos ausentes no modelo antigo recebem valores padrão para não quebrar a UI.

---

## Checklist de saída

- [x] Mapeamento das rotas concluído.
- [x] Rotas da API real verificadas com Postman (coleção do projeto).
- [x] Plano de migração definido.
- [x] Primeira funcionalidade já em andamento.
- [x] Pelo menos uma funcionalidade totalmente migrada para API (GET Estudantes).
