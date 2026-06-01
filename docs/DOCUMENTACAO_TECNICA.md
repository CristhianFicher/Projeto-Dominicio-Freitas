# DOCUMENTAÇÃO TÉCNICA – ESTRUTURA COMPLETA

## Projeto Diomício Freitas

## 1. INTRODUÇÃO

### Contexto do projeto

O Projeto Diomício Freitas é uma aplicação full stack para apoiar a gestão de uma organização que acompanha estudantes, empresas parceiras, funcionários, avaliações, fichas de acompanhamento, encaminhamentos e relacionamentos entre estudantes e empresas.

A solução é composta por um front-end web em React/Vite, uma API em NestJS/Node.js e um banco de dados PostgreSQL. A aplicação centraliza registros operacionais e oferece telas para cadastro, edição, consulta e análise de indicadores por meio de dashboard.

### Objetivos

- Centralizar o cadastro de estudantes, empresas e funcionários.
- Registrar avaliações vinculadas aos estudantes.
- Controlar relacionamentos e encaminhamentos entre estudantes e empresas.
- Manter fichas de acompanhamento para histórico de evolução e próximos passos.
- Disponibilizar indicadores consolidados para acompanhamento administrativo.
- Proteger rotas sensíveis com autenticação por token.

### Escopo

O escopo atual inclui:

- autenticação de usuário administrador;
- CRUD de estudantes;
- CRUD de empresas;
- CRUD de funcionários;
- CRUD de avaliações;
- CRUD de relacionamentos;
- cadastro e atualização de fichas de acompanhamento;
- cadastro, atualização e mudança de status de encaminhamentos;
- dashboard com visão geral do sistema;
- documentação de instalação, API e variáveis de ambiente.

## 2. ARQUITETURA

### Visão geral

A arquitetura segue o modelo cliente-servidor:

- O navegador executa o front-end React.
- O front-end consome a API REST usando Axios.
- A API NestJS aplica validações, regras de negócio e persistência via TypeORM.
- O PostgreSQL armazena os dados relacionais.
- As migrations do TypeORM versionam a estrutura do banco.

### Diagrama de arquitetura

```mermaid
flowchart LR
    Usuario[Usuário no navegador]
    Frontend[Front-end React + Vite]
    Axios[Axios / Redux Toolkit]
    API[API REST NestJS]
    Auth[AuthGuard + Token HMAC/JWT-like]
    Services[Services de negócio]
    TypeORM[TypeORM]
    DB[(PostgreSQL)]

    Usuario --> Frontend
    Frontend --> Axios
    Axios -->|HTTP /api| API
    API --> Auth
    API --> Services
    Services --> TypeORM
    TypeORM --> DB
```

### Organização principal do repositório

| Caminho | Responsabilidade |
| --- | --- |
| `src/` | Front-end React, componentes, telas, Redux e integração com API. |
| `backend/src/` | Back-end NestJS com módulos, controllers, services, entidades e autenticação. |
| `backend/src/modules/` | Módulos de domínio: estudantes, empresas, funcionários, avaliações, relacionamentos, fichas, encaminhamentos, dashboard e auth. |
| `backend/src/migrations/` | Migrations do TypeORM para criação e alteração do schema. |
| `backend/postman/` | Coleção Postman para teste da API. |
| `docs/` | Documentações do projeto. |

## 3. TECNOLOGIAS

| Camada | Tecnologia | Versão | Justificativa |
| --- | --- | --- | --- |
| Front-end | React | 19.1.1 | Biblioteca principal para construção da interface web em componentes. |
| Front-end | Vite | 7.1.0 | Ferramenta de build e desenvolvimento rápido para aplicações React. |
| Front-end | Redux Toolkit | 2.9.2 | Gerenciamento de estado para listas, cadastros e integrações com a API. |
| Front-end | React Router DOM | 7.8.1 | Controle de rotas internas da aplicação. |
| Front-end | Axios | 1.13.0 | Cliente HTTP usado para consumir a API. |
| Back-end | Node.js | 18+ | Runtime JavaScript recomendado para executar a API NestJS. |
| Back-end | NestJS | 10.4.13 | Framework modular para criação de APIs REST com TypeScript. |
| Back-end | TypeScript | 5.6.3 | Tipagem estática para aumentar segurança e manutenção do código. |
| Back-end | TypeORM | 0.3.20 | ORM usado para mapear entidades e executar migrations no PostgreSQL. |
| Banco de dados | PostgreSQL | 16 no Docker Compose | Banco relacional usado para persistência dos dados do sistema. |
| Testes | Vitest | 3.2.4 | Testes automatizados do front-end. |
| Testes | Node test runner | Node 18+ | Testes automatizados dos services do back-end. |

## 4. BANCO DE DADOS

### Diagrama DER

```mermaid
erDiagram
    ESTUDANTES ||--o{ AVALIACOES : possui
    ESTUDANTES ||--o{ RELACIONAMENTOS : participa
    EMPRESAS ||--o{ RELACIONAMENTOS : recebe
    ESTUDANTES ||--o{ FICHAS_ACOMPANHAMENTO : possui
    EMPRESAS ||--o{ FICHAS_ACOMPANHAMENTO : relacionada
    ESTUDANTES ||--o{ ENCAMINHAMENTOS : encaminhado
    EMPRESAS ||--o{ ENCAMINHAMENTOS : destino
    FICHAS_ACOMPANHAMENTO ||--o{ ENCAMINHAMENTOS : referencia

    ESTUDANTES {
        uuid id PK
        varchar nome
        varchar cpf
        date dataNascimento
        varchar telefone
        varchar email
        text endereco
        varchar nomeResponsavel
        varchar telefoneResponsavel
        varchar grauAutismo
        text necessidadesEspeciais
        text interesses
        text habilidades
        text objetivosEducacionais
        text objetivosProfissionais
        text observacoes
        timestamp createdAt
        timestamp updatedAt
    }

    EMPRESAS {
        uuid id PK
        varchar razaoSocial
        varchar nomeFantasia
        varchar cnpj
        varchar ie
        text endereco
        varchar numeroContatoRh
        varchar telefone
        varchar contatoRhNome
        varchar contatoRhEmail
        float renda
        varchar areaAtuacao
        varchar porte
        text observacoes
        timestamp createdAt
        timestamp updatedAt
    }

    AVALIACOES {
        int id PK
        uuid pessoa_id FK
        date data_avaliacao
        varchar tipo
        varchar professor_responsavel
        varchar q01_q46
        timestamp created_at
        timestamp updated_at
    }

    RELACIONAMENTOS {
        uuid id PK
        uuid estudanteId FK
        uuid empresaId FK
        varchar tipoRelacao
        varchar statusRelacao
        text observacoes
        timestamptz criadoEm
        timestamptz updatedAt
    }

    FICHAS_ACOMPANHAMENTO {
        uuid id PK
        uuid estudanteId FK
        uuid empresaId FK
        date dataRegistro
        varchar status
        text descricao
        text proximosPassos
        timestamp createdAt
        timestamp updatedAt
    }

    ENCAMINHAMENTOS {
        uuid id PK
        uuid estudanteId FK
        uuid empresaId FK
        uuid fichaAcompanhamentoId FK
        date dataEncaminhamento
        date dataAdmissao
        varchar funcao
        varchar contatoRh
        date dataProvavelDesligamento
        varchar status
        text observacoes
        timestamp createdAt
        timestamp updatedAt
    }
```

### Dicionário de dados

#### `estudantes`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | UUID | Sim | Identificador único do estudante. |
| `nome` | varchar(150) | Sim | Nome completo do estudante. |
| `cpf` | varchar(20) | Sim | CPF do estudante. |
| `dataNascimento` | date | Sim | Data de nascimento. |
| `telefone` | varchar(20) | Sim | Telefone de contato. |
| `email` | varchar(180) | Sim | E-mail de contato. |
| `endereco` | text | Sim | Endereço do estudante. |
| `nomeResponsavel` | varchar(150) | Não | Nome do responsável. |
| `telefoneResponsavel` | varchar(20) | Não | Telefone do responsável. |
| `grauAutismo` | varchar(20) | Não | Grau de autismo informado. |
| `necessidadesEspeciais` | text | Não | Necessidades específicas. |
| `interesses` | text | Não | Interesses do estudante. |
| `habilidades` | text | Não | Habilidades identificadas. |
| `objetivosEducacionais` | text | Não | Objetivos educacionais. |
| `objetivosProfissionais` | text | Não | Objetivos profissionais. |
| `observacoes` | text | Não | Observações gerais. |
| `createdAt` | timestamp | Sim | Data de criação do registro. |
| `updatedAt` | timestamp | Sim | Data da última atualização. |

#### `empresas`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | UUID | Sim | Identificador único da empresa. |
| `razaoSocial` | varchar(180) | Sim | Razão social. |
| `nomeFantasia` | varchar(180) | Sim | Nome fantasia. |
| `cnpj` | varchar(30) | Sim | CNPJ da empresa. |
| `ie` | varchar(30) | Não | Inscrição estadual. |
| `endereco` | text | Sim | Endereço da empresa. |
| `numeroContatoRh` | varchar(20) | Sim | Telefone principal do RH. |
| `telefone` | varchar(20) | Não | Telefone alternativo. |
| `contatoRhNome` | varchar(100) | Não | Nome do contato de RH. |
| `contatoRhEmail` | varchar(100) | Não | E-mail do contato de RH. |
| `renda` | float | Sim | Valor financeiro associado, com padrão `0`. |
| `areaAtuacao` | varchar(120) | Sim | Área de atuação. |
| `porte` | varchar(20) | Sim | Porte da empresa. |
| `observacoes` | text | Não | Observações gerais. |
| `createdAt` | timestamp | Sim | Data de criação do registro. |
| `updatedAt` | timestamp | Sim | Data da última atualização. |

#### `funcionarios`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | UUID | Sim | Identificador único do funcionário. |
| `nome` | varchar(150) | Sim | Nome completo. |
| `cpf` | varchar(20) | Sim | CPF do funcionário. |
| `telefone` | varchar(20) | Sim | Telefone de contato. |
| `email` | varchar(180) | Sim | E-mail de contato. |
| `endereco` | text | Sim | Endereço. |
| `dataNascimento` | date | Sim | Data de nascimento. |
| `dataAdmissao` | date | Sim | Data de admissão. |
| `funcao` | varchar(120) | Sim | Função exercida. |
| `departamento` | varchar(40) | Sim | Departamento. |
| `salario` | float | Sim | Salário, com padrão `0`. |
| `nivelEscolaridade` | varchar(40) | Não | Escolaridade. |
| `experiencia` | text | Não | Experiência profissional. |
| `observacoes` | text | Não | Observações gerais. |
| `createdAt` | timestamp | Sim | Data de criação do registro. |
| `updatedAt` | timestamp | Sim | Data da última atualização. |

#### `avaliacoes`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | serial/int | Sim | Identificador da avaliação. |
| `pessoa_id` | UUID | Sim | Referência ao estudante avaliado. |
| `data_avaliacao` | date | Sim | Data da avaliação. |
| `tipo` | varchar(20) | Sim | Tipo da avaliação: `inicial` ou `acompanhamento`. |
| `professor_responsavel` | varchar(100) | Sim | Professor responsável pela avaliação. |
| `q01` a `q46` | varchar(20) | Não | Respostas do formulário de avaliação. |
| `created_at` | timestamp | Sim | Data de criação do registro. |
| `updated_at` | timestamp | Sim | Data da última atualização. |

Regra importante: a combinação `pessoa_id + tipo` é única, evitando duas avaliações do mesmo tipo para o mesmo estudante.

#### `relacionamentos`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | UUID | Sim | Identificador único do relacionamento. |
| `estudanteId` | UUID | Sim | Referência ao estudante. |
| `empresaId` | UUID | Sim | Referência à empresa. |
| `tipoRelacao` | varchar(40) | Sim | Tipo da relação, com padrão `encaminhamento`. |
| `statusRelacao` | varchar(20) | Sim | Status da relação, com padrão `ativo`. |
| `observacoes` | text | Não | Observações sobre a relação. |
| `criadoEm` | timestamptz | Sim | Data de criação. |
| `updatedAt` | timestamptz | Sim | Data da última atualização. |

#### `fichas_acompanhamento`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | UUID | Sim | Identificador único da ficha. |
| `estudanteId` | UUID | Sim | Referência ao estudante. |
| `empresaId` | UUID | Não | Referência à empresa associada. |
| `dataRegistro` | date | Sim | Data do registro de acompanhamento. |
| `status` | varchar(20) | Sim | Status da ficha, com padrão `ativo`. |
| `descricao` | text | Sim | Descrição do acompanhamento. |
| `proximosPassos` | text | Não | Próximos passos recomendados. |
| `createdAt` | timestamp | Sim | Data de criação do registro. |
| `updatedAt` | timestamp | Sim | Data da última atualização. |

#### `encaminhamentos`

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | UUID | Sim | Identificador único do encaminhamento. |
| `estudanteId` | UUID | Sim | Referência ao estudante encaminhado. |
| `empresaId` | UUID | Sim | Referência à empresa destino. |
| `fichaAcompanhamentoId` | UUID | Não | Referência opcional à ficha de acompanhamento. |
| `dataEncaminhamento` | date | Sim | Data do encaminhamento. |
| `dataAdmissao` | date | Não | Data de admissão, quando houver. |
| `funcao` | varchar(100) | Não | Função prevista ou exercida. |
| `contatoRh` | varchar(100) | Não | Contato de RH da empresa. |
| `dataProvavelDesligamento` | date | Não | Data provável de desligamento. |
| `status` | varchar(20) | Sim | Status do encaminhamento, com padrão `ativo`. |
| `observacoes` | text | Não | Observações gerais. |
| `createdAt` | timestamp | Sim | Data de criação do registro. |
| `updatedAt` | timestamp | Sim | Data da última atualização. |

## 5. API (ENDPOINTS)

A API utiliza o prefixo global `/api`. Portanto, todos os endpoints abaixo devem ser chamados a partir da base `http://localhost:3001/api` em ambiente local.

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Autentica o usuário e retorna token de acesso. | Não |

Exemplo de corpo:

```json
{
  "username": "admin",
  "password": "admin"
}
```

### Estudantes

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/estudantes` | Lista estudantes. | Sim |
| `GET` | `/api/estudantes/{id}` | Busca estudante por ID. | Sim |
| `POST` | `/api/estudantes` | Cria estudante. | Sim |
| `PUT` | `/api/estudantes/{id}` | Atualiza estudante. | Sim |
| `DELETE` | `/api/estudantes/{id}` | Remove estudante. | Sim |

### Empresas

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/empresas` | Lista empresas. Aceita filtros `q` e `cnpj`. | Sim |
| `GET` | `/api/empresas/{id}` | Busca empresa por ID. | Sim |
| `POST` | `/api/empresas` | Cria empresa. | Sim |
| `PUT` | `/api/empresas/{id}` | Atualiza empresa. | Sim |
| `DELETE` | `/api/empresas/{id}` | Remove empresa. | Sim |

### Funcionários

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/funcionarios` | Lista funcionários. | Sim |
| `GET` | `/api/funcionarios/{id}` | Busca funcionário por ID. | Sim |
| `POST` | `/api/funcionarios` | Cria funcionário. | Sim |
| `PUT` | `/api/funcionarios/{id}` | Atualiza funcionário. | Sim |
| `DELETE` | `/api/funcionarios/{id}` | Remove funcionário. | Sim |

### Avaliações

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/avaliacoes` | Lista avaliações. Aceita filtro `pessoa_id`. | Sim |
| `GET` | `/api/avaliacoes/{id}` | Busca avaliação por ID. | Sim |
| `POST` | `/api/avaliacoes` | Cria avaliação. | Sim |
| `PUT` | `/api/avaliacoes/{id}` | Atualiza avaliação. | Sim |
| `DELETE` | `/api/avaliacoes/{id}` | Remove avaliação. | Sim |

### Relacionamentos

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/relacionamentos` | Lista relacionamentos entre estudantes e empresas. | Sim |
| `GET` | `/api/relacionamentos/{id}` | Busca relacionamento por ID. | Sim |
| `POST` | `/api/relacionamentos` | Cria relacionamento. | Sim |
| `PUT` | `/api/relacionamentos/{id}` | Atualiza relacionamento. | Sim |
| `DELETE` | `/api/relacionamentos/{id}` | Remove relacionamento. | Sim |

### Fichas de acompanhamento

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/fichas` | Lista fichas de acompanhamento. | Sim |
| `GET` | `/api/fichas/{id}` | Busca ficha por ID. | Sim |
| `POST` | `/api/fichas` | Cria ficha de acompanhamento. | Sim |
| `PUT` | `/api/fichas/{id}` | Atualiza ficha de acompanhamento. | Sim |

### Encaminhamentos

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/encaminhamentos` | Lista encaminhamentos. Aceita filtros `status`, `empresa_id` e `pessoa_id`. | Não aplicado no controller atual |
| `GET` | `/api/encaminhamentos/{id}` | Busca encaminhamento por ID. | Não aplicado no controller atual |
| `POST` | `/api/encaminhamentos` | Cria encaminhamento. | Não aplicado no controller atual |
| `PUT` | `/api/encaminhamentos/{id}` | Atualiza encaminhamento. | Não aplicado no controller atual |
| `PATCH` | `/api/encaminhamentos/{id}/status` | Atualiza somente o status do encaminhamento. | Não aplicado no controller atual |

### Dashboard

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `GET` | `/api/dashboard` | Retorna visão geral e indicadores do sistema. | Não aplicado no controller atual |

## 6. INSTALAÇÃO

### Pré-requisitos

- Node.js 18 ou superior.
- npm.
- Docker e Docker Compose, caso use o PostgreSQL via container.
- Git.

### Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Projeto-Dominicio-Freitas
```

### Instalar e executar o front-end

```bash
npm install
npm run dev
```

Por padrão, o front-end consome a API em:

```text
http://localhost:3001/api
```

### Configurar e executar o back-end

```bash
cd backend
npm install
cp .env.example .env
```

No Windows, caso `cp` não esteja disponível, use:

```bash
copy .env.example .env
```

### Subir PostgreSQL com Docker

```bash
docker compose up -d
```

### Executar migrations

```bash
npm run typeorm:migration:run
```

### Iniciar API em modo desenvolvimento

```bash
npm run start:dev
```

### Gerar build do back-end

```bash
npm run build
```

### Executar testes

Front-end:

```bash
npm run test
```

Back-end:

```bash
cd backend
npm run test
```

## 7. VARIÁVEIS DE AMBIENTE

Arquivo esperado no back-end: `backend/.env`.

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `PORT` | Porta em que a API NestJS será iniciada. | `3001` |
| `DATABASE_URL` | String de conexão com o PostgreSQL. | `postgres://postgres:postgres@localhost:5433/ong_db` |
| `JWT_SECRET` | Chave usada para assinar e validar o token de autenticação. Em produção, deve ser forte e secreta. | `minha_chave_segura` |

Exemplo completo:

```env
PORT=3001
DATABASE_URL=postgres://postgres:postgres@localhost:5433/ong_db
JWT_SECRET=minha_chave_segura
```
