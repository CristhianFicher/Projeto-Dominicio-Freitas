# Checklist de migracao JSON Server -> API real

Data da revisao: 2026-03-29

## 1) Mapeamento completo das chamadas do front (json-server)

Chamadas encontradas no front:
- `GET/POST/PUT/DELETE /estudantes`
- `GET/POST/PUT/DELETE /empresas`
- `GET/POST/PUT/DELETE /funcionarios`
- `GET/POST/PUT/DELETE /avaliacoes`
- `GET/POST/DELETE /relacionamentos`

Arquivos de origem:
- `src/redux/slices/estudantesSlice.js`
- `src/redux/slices/empresasSlice.js`
- `src/redux/slices/funcionariosSlice.js`
- `src/redux/slices/avaliacoesSlice.js`
- `src/components/RelacionarEstudanteEmpresa.jsx`

## 2) Rotas da API real verificadas com Postman

Status atual:
- Nao foi possivel validar a API real deste projeto neste repositorio.
- A colecao encontrada (`backend/postman/RedCar.postman_collection.json`) pertence a outro projeto e foi desconsiderada.

Pendencia para concluir:
- Receber a colecao Postman correta da API da ONG (ou base URL + endpoints reais).

## 3) Ordem de migracao (prioridade)

1. GET (listagens)
2. POST (criacao)
3. PUT (edicao)
4. DELETE (remocao)
5. Relacionamentos (ajuste de modelo/rota na API real se necessario)

## 4) Primeira funcionalidade (GET)

Status atual:
- A migracao correta para API real foi pausada ate receber o contrato de rotas da API da ONG.
- O front foi revertido para o estado original (sem dependencias do backend RedCar).

---

## Checklist de saida

- [x] Mapeamento das rotas concluido.
- [ ] Rotas da API real verificadas com Postman.
- [x] Plano de migracao definido.
- [ ] Primeira funcionalidade totalmente migrada para API real.
