# Documentação dos Módulos Principais

## 1. Introdução

### Contexto
Este sistema apoia o Instituto Diomício Freitas na gestão de estudantes, empresas parceiras, avaliações e encaminhamentos para inclusão profissional.

### Objetivo geral
Centralizar processos acadêmicos e de inclusão em uma plataforma única, com API e interface web.

### Objetivos específicos
- Gerenciar cadastro de estudantes, empresas e funcionários.
- Registrar avaliações e evolução.
- Registrar encaminhamentos com status ativo/desligado.
- Disponibilizar visão gerencial via dashboard.

### Escopo
Inclui backend NestJS + PostgreSQL, frontend React, coleção Postman e documentação técnica/operacional.

## 2. Visão Geral

### Público-alvo
- Equipe administrativa.
- Coordenadores pedagógicos.
- Equipe de integração com empresas.

### Principais funcionalidades
- CRUD de estudantes, empresas e funcionários.
- Avaliações por estudante.
- Relacionamentos e encaminhamentos com empresa.
- Dashboard com visão resumida.

## 3. Tecnologias
- **Node.js 18+**: runtime backend.
- **NestJS 10**: framework da API.
- **TypeORM 0.3**: mapeamento ORM e migrations.
- **PostgreSQL**: persistência relacional.
- **React + Vite**: frontend SPA.
- **Redux Toolkit**: estado global em módulos existentes.
- **Postman**: testes de integração por coleção.

## 4. Arquitetura
Fluxo principal:
1. Frontend React chama endpoints `/api/*`.
2. Controllers NestJS recebem requisições.
3. Services aplicam regras de negócio.
4. Repositórios TypeORM persistem/consultam no PostgreSQL.
5. Dashboard agrega informações de múltiplos módulos.

## 5. Banco de Dados

### DER (resumo textual)
- `estudantes` 1:N `avaliacoes`
- `estudantes` 1:N `fichas_acompanhamento`
- `empresas` 1:N `fichas_acompanhamento`
- `estudantes` 1:N `encaminhamentos`
- `empresas` 1:N `encaminhamentos`
- `fichas_acompanhamento` 1:N `encaminhamentos` (opcional)

### Dicionário resumido
- `empresas`: id (uuid), razaoSocial, nomeFantasia, cnpj, endereco, numeroContatoRh, telefone, contatoRhNome, contatoRhEmail...
- `encaminhamentos`: id (uuid), estudanteId, empresaId, dataEncaminhamento, dataAdmissao, funcao, contatoRh, dataProvavelDesligamento, status.
- `fichas_acompanhamento`: id (uuid), estudanteId, empresaId, dataRegistro, status, descricao.

## 6. Funcionalidades por módulo
- **Empresas**: CRUD + busca por nome (`q`) e CNPJ (`cnpj`).
- **Encaminhamentos**: CRUD + filtro por `status`, `pessoa_id`/`estudanteId`, `empresa_id`/`empresaId`.
- **Fichas**: cadastro e listagem de acompanhamento.
- **Dashboard**: visão consolidada de indicadores e itens recentes.

## 7. Manual do Usuário

### Passo a passo básico
1. Entrar no sistema.
2. Usar menu **Empresas** para cadastrar e consultar empresas.
3. Criar relacionamento/encaminhamento na área de relacionamentos.
4. Acompanhar status e volume na aba **Dashboard**.

### Prints
- Adicionar prints reais em `docs/img/` (home, dashboard, cadastro de empresa, encaminhamento).

## 8. Instalação
```bash
# Backend
cd backend
npm install
npm run typeorm:migration:run
npm run start:dev

# Frontend
cd ..
npm install
npm run dev
```

## 9. Checklist para a aula

- [x] CRUD de empresas funcionando (POST, GET, PUT, DELETE)
- [x] Busca de empresas por nome/CNPJ
- [x] Encaminhamento vinculando aluno e empresa
- [x] Status do encaminhamento atualizando (ativo/desligado)
- [x] Estrutura da documentação criada (arquivo .md)
- [ ] Primeiro print do sistema adicionado à documentação
- [x] Módulos principais integrados
