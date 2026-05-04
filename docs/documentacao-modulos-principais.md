# SUMÁRIO
1. [Introdução](#1-introdução)
2. [Visão Geral do Sistema](#2-visão-geral-do-sistema)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Arquitetura do Sistema](#4-arquitetura-do-sistema)
5. [Banco de Dados](#5-banco-de-dados)
6. [Funcionalidades](#6-funcionalidades)
7. [Manual do Usuário](#7-manual-do-usuário)
8. [Guia de Instalação e Configuração](#8-guia-de-instalação-e-configuração)
9. [Considerações Finais](#9-considerações-finais)
10. [Referências (formato ABNT)](#referências-formato-abnt)
11. [Apêndices](#apêndices)

---

## 1. INTRODUÇÃO

### 1.1. CONTEXTO DO PROJETO
O sistema foi desenvolvido para apoiar o Instituto Diomício Freitas no processo de acompanhamento de estudantes, relacionamento com empresas parceiras e controle de encaminhamentos ao mercado de trabalho. Antes da plataforma, o controle era fragmentado, com baixa padronização e dificuldade de visão gerencial.

O público-alvo principal é composto por professores, coordenadores pedagógicos, equipe de RH/acompanhamento e administradores do sistema.

### 1.2. OBJETIVOS
**Objetivo Geral:**
Centralizar, padronizar e facilitar a gestão dos dados acadêmicos e de inclusão profissional do Instituto.

**Objetivos Específicos:**
- Digitalizar os processos de cadastro, avaliação e acompanhamento.
- Permitir o vínculo entre estudantes e empresas com histórico de encaminhamentos.
- Oferecer indicadores para tomada de decisão por meio de dashboard.

### 1.3. ESCOPO
**O sistema faz:**
- CRUD de estudantes, empresas, funcionários, avaliações e relacionamentos.
- Registro de fichas de acompanhamento.
- Registro de encaminhamentos com status ativo/desligado.
- Dashboard com indicadores e itens recentes.

**O sistema não faz (limitações atuais):**
- Não possui módulo completo de autenticação JWT com recuperação de senha por e-mail.
- Não possui envio de e-mails transacionais.
- Não possui painel analítico com gráficos avançados persistidos.

---

## 2. VISÃO GERAL DO SISTEMA

### 2.1. PÚBLICO-ALVO
- Professores e coordenadores do Instituto.
- Equipe de RH e acompanhamento.
- Administradores do sistema.

### 2.2. PRINCIPAIS FUNCIONALIDADES

| Módulo | Funcionalidade | Descrição |
|---|---|---|
| Cadastros | Pessoas | CRUD de alunos/usuários (estudantes e equipe) |
| Cadastros | Empresas | CRUD de empresas parceiras |
| Avaliações | Questionários | Registro das avaliações 1 e 2 |
| Acompanhamento | Fichas | Registro de visitas, pareceres e evolução |
| Encaminhamentos | Trabalho | Controle de alunos no mercado (ativo/desligado) |
| Dashboard | Indicadores | Visão geral operacional e gerencial |

---

## 3. TECNOLOGIAS UTILIZADAS

| Camada | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| Front-end | React + Vite | React 19 / Vite 7 | Desenvolvimento rápido, componentes reutilizáveis e boa produtividade |
| Back-end | Node.js + NestJS | Node 18+ / NestJS 10 | Arquitetura modular, escalável e padronizada para APIs |
| Banco de Dados | PostgreSQL | 15+ (compatível) | Banco relacional robusto para integridade dos dados |
| ORM | TypeORM | 0.3.x | Migrations e mapeamento de entidades para produtividade |
| Outras | Docker, Git, Postman | atuais do projeto | Padronização de ambiente, versionamento e testes de API |

---

## 4. ARQUITETURA DO SISTEMA

### 4.1. DIAGRAMA DE ARQUITETURA
> Inserir imagem em: `docs/img/arquitetura.png`

### 4.2. DESCRIÇÃO DA ARQUITETURA
A aplicação segue o padrão de camadas:

`[Front-end React]  <->  [API NestJS]  <->  [PostgreSQL]`

No back-end, os módulos são organizados por domínio (estudantes, empresas, avaliações, fichas, encaminhamentos etc.), contendo `controller`, `service`, `dto` e `entity`.

### 4.3. FLUXO DE DADOS
1. Usuário interage na interface web.
2. Front-end chama endpoints REST (`/api/...`).
3. Controller recebe requisição e valida DTO.
4. Service aplica regras de negócio.
5. Repository (TypeORM) persiste/consulta dados no PostgreSQL.
6. API retorna resposta ao front-end.

---

## 5. BANCO DE DADOS

### 5.1. MODELO ENTIDADE-RELACIONAMENTO (DER)
> Inserir imagem em: `docs/img/der.png`

### 5.2. DICIONÁRIO DE DADOS (EXEMPLO)

#### Tabela: `empresas`
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| id | UUID | Sim | Identificador único |
| nomeFantasia | VARCHAR(180) | Sim | Nome fantasia |
| razaoSocial | VARCHAR(180) | Sim | Razão social |
| cnpj | VARCHAR(30) | Sim | CNPJ |
| endereco | TEXT | Sim | Endereço |
| numeroContatoRh | VARCHAR(20) | Sim | Telefone principal RH |
| telefone | VARCHAR(20) | Não | Telefone adicional |
| contatoRhNome | VARCHAR(100) | Não | Nome do contato RH |
| contatoRhEmail | VARCHAR(100) | Não | E-mail do contato RH |
| createdAt | TIMESTAMP | Sim | Data de criação |
| updatedAt | TIMESTAMP | Sim | Data de atualização |

#### Tabela: `encaminhamentos`
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| id | UUID | Sim | Identificador único |
| estudanteId | UUID | Sim | FK para estudante |
| empresaId | UUID | Sim | FK para empresa |
| fichaAcompanhamentoId | UUID | Não | FK opcional para ficha |
| dataEncaminhamento | DATE | Sim | Data do encaminhamento |
| dataAdmissao | DATE | Não | Data de admissão |
| funcao | VARCHAR(100) | Não | Função/cargo |
| contatoRh | VARCHAR(100) | Não | Contato RH |
| dataProvavelDesligamento | DATE | Não | Data provável de desligamento |
| status | VARCHAR(20) | Sim | `ativo` ou `desligado` |
| observacoes | TEXT | Não | Observações gerais |
| createdAt | TIMESTAMP | Sim | Data de criação |
| updatedAt | TIMESTAMP | Sim | Data de atualização |

### 5.3. PRINCIPAIS RELACIONAMENTOS
- pessoas/estudantes 1 --- N avaliações
- pessoas/estudantes 1 --- N fichas_acompanhamento
- pessoas/estudantes 1 --- N encaminhamentos
- empresas 1 --- N encaminhamentos
- empresas 1 --- N fichas_acompanhamento

---

## 6. FUNCIONALIDADES

### 6.1. MÓDULO DE AUTENTICAÇÃO
**Status atual:** parcial
- Login em tela inicial do front-end.
- Proteção de rotas por sessão local.
- Recuperação de senha com token: **não implementada**.

### 6.2. MÓDULO DE PESSOAS
- Cadastrar novo aluno.
- Editar dados do aluno.
- Listar alunos.
- Visualizar detalhes do aluno.

### 6.3. MÓDULO DE EMPRESAS
- Cadastrar nova empresa.
- Editar dados da empresa.
- Listar empresas.
- Visualizar detalhes.
- Buscar por nome (`q`) e por CNPJ (`cnpj`).

### 6.4. MÓDULO DE AVALIAÇÕES
- Cadastrar avaliação (questionário com até 46 perguntas).
- Listar avaliações de uma pessoa.
- Editar avaliação.
- Tipo: inicial ou acompanhamento.

### 6.5. MÓDULO DE FICHAS DE ACOMPANHAMENTO
- Registrar visita/acompanhamento.
- Vincular empresa (opcional).
- Histórico por aluno.

### 6.6. MÓDULO DE ENCAMINHAMENTOS
- Vincular aluno a empresa.
- Registrar data de admissão e função.
- Controlar status (ativo/desligado).
- Filtrar por status, aluno e empresa.
- Histórico do aluno.

### 6.7. DASHBOARD
- Indicadores principais (cards).
- Lista de encaminhamentos recentes.
- Lista de fichas recentes.
- Gráficos avançados: ainda não implementados.

---

## 7. MANUAL DO USUÁRIO

### 7.1. ACESSANDO O SISTEMA
1. Inicie front-end e back-end.
2. Acesse URL local da aplicação.
3. Informe usuário/sessão e entre no sistema.

### 7.2. TELA DE LOGIN
> Inserir print: `docs/img/login.png`

### 7.3. DASHBOARD
> Inserir print: `docs/img/dashboard.png`

### 7.4. CADASTRO DE PESSOAS (ALUNOS)
> Inserir print: `docs/img/alunos.png`

### 7.5. CADASTRO DE EMPRESAS
> Inserir print: `docs/img/empresas.png`

### 7.6. REGISTRO DE AVALIAÇÕES
> Inserir print: `docs/img/avaliacoes.png`

### 7.7. REGISTRO DE FICHAS DE ACOMPANHAMENTO
> Inserir print: `docs/img/fichas.png`

### 7.8. REGISTRO DE ENCAMINHAMENTOS
> Inserir print: `docs/img/encaminhamentos.png`

### 7.9. RECUPERAÇÃO DE SENHA
Funcionalidade prevista para evolução futura.

### 7.10. RELATÓRIOS/EXPORTAÇÕES
Funcionalidade prevista para evolução futura.

---

## 8. GUIA DE INSTALAÇÃO E CONFIGURAÇÃO

### 8.1. PRÉ-REQUISITOS
- Node.js 18+
- PostgreSQL
- Git
- Docker (opcional)

### 8.2. CLONANDO O REPOSITÓRIO
```bash
git clone [url-do-repositorio]
cd Projeto-Dominicio-Freitas
```

### 8.3. CONFIGURANDO O BACK-END
```bash
cd backend
npm install
cp .env.example .env
# editar .env
npm run typeorm:migration:run
npm run start:dev
```

### 8.4. CONFIGURANDO O FRONT-END
```bash
cd ..
npm install
npm run dev
```

### 8.5. VARIÁVEIS DE AMBIENTE
| Variável | Descrição | Exemplo |
|---|---|---|
| DATABASE_URL | String de conexão | `postgres://postgres:postgres@localhost:5433/ong_db` |
| PORT | Porta da API | `3001` |
| JWT_SECRET | Chave para tokens (futuro) | `minha_chave_secreta` |
| SMTP_HOST | Servidor de e-mail (futuro) | `smtp.gmail.com` |

### 8.6. POPULANDO O BANCO COM DADOS INICIAIS
- Executar migrations de schema.
- Executar migration de seed já presente no projeto.

---

## 9. CONSIDERAÇÕES FINAIS

### 9.1. DESAFIOS ENCONTRADOS
- Migração de protótipo para API real.
- Padronização de entidades e integrações entre módulos.
- Evolução de dashboard mantendo desempenho e simplicidade.

### 9.2. MELHORIAS FUTURAS
- Autenticação completa com JWT e recuperação de senha.
- Gráficos avançados no dashboard.
- Logs de auditoria e exportação de relatórios.

### 9.3. AGRADECIMENTOS
Agradecemos ao Instituto Diomício Freitas, ao professor Esp. Jucemar Formigoni Cândido e à turma pelo apoio no desenvolvimento do projeto.

---

## REFERÊNCIAS (FORMATO ABNT)
NESTJS. *NestJS Documentation*. 2026. Disponível em: <https://docs.nestjs.com/>. Acesso em: 13 abr. 2026.

TYPEORM. *TypeORM Documentation*. 2026. Disponível em: <https://typeorm.io/>. Acesso em: 13 abr. 2026.

POSTGRESQL GLOBAL DEVELOPMENT GROUP. *PostgreSQL Documentation*. 2026. Disponível em: <https://www.postgresql.org/docs/>. Acesso em: 13 abr. 2026.

---

## APÊNDICES

### APÊNDICE A – CÓDIGOS DE STATUS HTTP
| Código | Significado |
|---|---|
| 200 | OK |
| 201 | Criado |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno |

### APÊNDICE B – GLOSSÁRIO
| Termo | Definição |
|---|---|
| API | Interface de programação de aplicações |
| CRUD | Create, Read, Update, Delete |
| FK | Chave estrangeira |
| JWT | JSON Web Token |
