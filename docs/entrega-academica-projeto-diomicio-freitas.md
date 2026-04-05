# ESUCRI

## Curso: Sistemas de Informacao
## Disciplina: Projeto de Extensao IV

\
\
\
\
\
\

# SISTEMA DE ACOMPANHAMENTO EDUCACIONAL E PROFISSIONAL
## Instituto de Educacao Especial Diomicio Freitas

\
\
\
\

**Academicos:** Cristhian Quoghi, Ghustavo Cardoso e Isaque Oliveira  
**Professor:** Jucemar  
**Polo / Cidade:** Criciuma  
**Data:** 30/03/2026

---

## Resumo

Este documento apresenta o projeto de desenvolvimento de um sistema web voltado ao acompanhamento educacional e profissional de estudantes atendidos pelo Instituto de Educacao Especial Diomicio Freitas. A aplicacao foi estruturada para centralizar o cadastro de estudantes, empresas e funcionarios, alem de permitir o registro de avaliacoes de experiencia e a criacao de vinculos entre estudantes e empresas parceiras. O sistema utiliza frontend em React com Vite, backend em NestJS e persistencia de dados em PostgreSQL, oferecendo integracao completa entre interface, API e banco de dados.

**Palavras-chave:** inclusao, acompanhamento educacional, avaliacao, sistema web, empregabilidade.

## Sumario

1. Introducao
2. Objetivos
3. Justificativa
4. Escopo do Projeto
5. Arquitetura e Tecnologias
6. Descricao dos Modulos
7. Telas do Sistema
8. Modelo de Dados e Relacionamentos
9. Endpoints da API
10. Fluxo de Utilizacao
11. Requisitos Funcionais
12. Requisitos Nao Funcionais
13. Cronograma Resumido e Status
14. Validacao e Testes
15. Consideracoes Finais

## 1. Introducao

O uso da tecnologia como apoio a processos de inclusao educacional e profissional contribui para maior organizacao institucional, melhor rastreabilidade das informacoes e mais seguranca na tomada de decisao. Dentro desse contexto, o presente projeto foi desenvolvido com o objetivo de oferecer uma plataforma capaz de registrar e acompanhar dados relevantes sobre estudantes, empresas parceiras, equipe de apoio e avaliacoes de desempenho.

O sistema foi pensado para atender a uma rotina administrativa e pedagogica, possibilitando o cadastro estruturado dos estudantes, o acompanhamento de evolucao por meio de avaliacoes e a vinculacao dos alunos a oportunidades de encaminhamento, estagio, emprego e acompanhamento junto a empresas parceiras.

## 2. Objetivos

### 2.1 Objetivo Geral

Desenvolver um sistema web integrado com banco de dados para apoiar o acompanhamento educacional e profissional dos estudantes atendidos pelo Instituto de Educacao Especial Diomicio Freitas.

### 2.2 Objetivos Especificos

- cadastrar estudantes com informacoes pessoais, familiares, educacionais e profissionais;
- cadastrar empresas parceiras com dados institucionais e de contato;
- cadastrar funcionarios responsaveis pelo apoio e acompanhamento;
- registrar avaliacoes de experiencia com perguntas estruturadas;
- vincular estudantes a empresas por meio de relacionamentos;
- disponibilizar consultas, edicoes e remocoes de dados por interface web;
- integrar frontend, backend e banco de dados em uma unica solucao.

## 3. Justificativa

Instituicoes que trabalham com inclusao social e profissional necessitam manter registros organizados, confiaveis e de facil consulta. Quando essas informacoes ficam dispersas em arquivos avulsos ou processos manuais, o acompanhamento se torna mais lento, sujeito a erros e dificil de auditar.

Este projeto busca resolver esse problema por meio de um sistema centralizado, no qual os dados principais ficam registrados em banco, expostos por API REST e consumidos por uma interface administrativa unica. Dessa forma, o acompanhamento do estudante se torna mais consistente, e a instituicao ganha mais controle sobre seu fluxo de cadastro, avaliacao e relacionamento com empresas.

## 4. Escopo do Projeto

O projeto contempla os seguintes modulos funcionais:

- dashboard com indicadores do sistema;
- autenticacao local para acesso administrativo;
- modulo de estudantes;
- modulo de empresas;
- modulo de funcionarios;
- modulo de avaliacoes de experiencia;
- modulo de relacionamentos entre estudantes e empresas.

Nao fazem parte do escopo atual:

- controle de perfis de usuario com permissao avancada;
- autenticacao real com token e recuperacao de senha;
- emissao automatica de relatorios em PDF;
- integracao com sistemas externos.

## 5. Arquitetura e Tecnologias

O sistema foi desenvolvido com arquitetura separada entre frontend e backend.

### 5.1 Frontend

- React
- Vite
- Redux Toolkit
- React Router
- Axios

### 5.2 Backend

- NestJS
- TypeORM
- PostgreSQL

### 5.3 Testes

- Vitest no frontend
- Node test runner no backend

### 5.4 Integracao

O frontend consome a API por meio da base `http://localhost:3001/api`, permitindo comunicacao com os modulos de estudantes, empresas, funcionarios, avaliacoes e relacionamentos.

## 6. Descricao dos Modulos

### 6.1 Dashboard

Apresenta uma visao consolidada do sistema com indicadores de estudantes, empresas, funcionarios e avaliacoes, alem de atalhos para os principais fluxos operacionais.

### 6.2 Modulo de Estudantes

Permite cadastrar, listar, editar e remover estudantes. O formulario contempla dados pessoais, endereco, responsavel, grau do espectro, interesses, habilidades e objetivos educacionais e profissionais.

### 6.3 Modulo de Empresas

Permite cadastrar e gerenciar empresas parceiras com dados como razao social, nome fantasia, CNPJ, contato de RH, area de atuacao, porte e observacoes.

### 6.4 Modulo de Funcionarios

Permite cadastrar e gerenciar os funcionarios envolvidos no processo de apoio e acompanhamento institucional.

### 6.5 Modulo de Avaliacoes

Foi adaptado para atender ao formato solicitado na atividade academica. Cada avaliacao possui:

- `pessoa_id`;
- `data_avaliacao`;
- `tipo`;
- `professor_responsavel`;
- perguntas `q01` a `q46`.

O sistema permite registrar uma avaliacao inicial e uma avaliacao de acompanhamento por estudante, com bloqueio de duplicidade por tipo.

### 6.6 Modulo de Relacionamentos

Permite criar vinculos entre estudantes e empresas, definindo tipo de relacao, status e observacoes. Esse modulo organiza o acompanhamento de encaminhamentos e oportunidades.

## 7. Telas do Sistema

### 7.1 Tela de Login

Responsavel por liberar o acesso administrativo ao sistema. Atualmente utiliza credenciais locais para demonstracao.

### 7.2 Tela Inicial

Exibe indicadores, atalhos, visao dos relacionamentos e resumo operacional.

### 7.3 Tela de Estudantes

Apresenta busca por nome, CPF ou email, alem de acoes para avaliar, editar e remover registros.

### 7.4 Tela de Cadastro de Estudante

Organiza o preenchimento em secoes:

- dados pessoais;
- endereco e contato;
- responsavel;
- caracteristicas do autismo;
- interesses e habilidades;
- objetivos educacionais e profissionais;
- observacoes.

### 7.5 Tela de Empresas

Lista as empresas cadastradas e oferece busca, edicao e remocao.

### 7.6 Tela de Cadastro de Empresa

Organiza o preenchimento em:

- dados da empresa;
- endereco e contato;
- informacoes empresariais;
- observacoes adicionais.

### 7.7 Tela de Funcionarios

Lista os funcionarios cadastrados e oferece busca, edicao e remocao.

### 7.8 Tela de Cadastro de Funcionario

Organiza o preenchimento em:

- dados pessoais;
- endereco;
- dados profissionais;
- experiencia e qualificacoes;
- observacoes adicionais.

### 7.9 Tela de Avaliacoes

Centraliza a situacao das Avaliacoes 1 e 2 para cada estudante, com visualizacao do status e acesso ao formulario correspondente.

### 7.10 Tela de Avaliacao

Permite responder as 46 perguntas da avaliacao com as opcoes:

- Sim;
- Maioria;
- Raramente;
- Nao.

Tambem exige o preenchimento do professor responsavel e salva o resultado diretamente na API.

### 7.11 Tela de Relacionamentos

Permite selecionar estudante e empresa, definir tipo e status da relacao, registrar observacoes e remover vinculos existentes.

## 8. Modelo de Dados e Relacionamentos

As principais entidades do sistema sao:

| Entidade | Identificador | Finalidade |
| --- | --- | --- |
| estudantes | UUID | cadastro dos alunos |
| empresas | UUID | cadastro das empresas parceiras |
| funcionarios | UUID | cadastro da equipe de apoio |
| avaliacoes | SERIAL | registro das avaliacoes de experiencia |
| relacionamentos | UUID | vinculo entre estudante e empresa |

Principais relacionamentos:

- um estudante pode possuir varias avaliacoes;
- um estudante pode possuir varios relacionamentos com empresas;
- uma empresa pode possuir varios estudantes vinculados;
- cada relacionamento referencia exatamente um estudante e uma empresa;
- cada avaliacao referencia um estudante por meio do campo `pessoa_id`.

Observacao tecnica:

No projeto atual, `pessoa_id` referencia o estudante existente via UUID, mantendo compatibilidade com a base ja estruturada do sistema.

## 9. Endpoints da API

### 9.1 Estudantes

- `GET /api/estudantes`
- `GET /api/estudantes/:id`
- `POST /api/estudantes`
- `PUT /api/estudantes/:id`
- `DELETE /api/estudantes/:id`

### 9.2 Empresas

- `GET /api/empresas`
- `GET /api/empresas/:id`
- `POST /api/empresas`
- `PUT /api/empresas/:id`
- `DELETE /api/empresas/:id`

### 9.3 Funcionarios

- `GET /api/funcionarios`
- `GET /api/funcionarios/:id`
- `POST /api/funcionarios`
- `PUT /api/funcionarios/:id`
- `DELETE /api/funcionarios/:id`

### 9.4 Avaliacoes

- `GET /api/avaliacoes`
- `GET /api/avaliacoes?pessoa_id=<uuid>`
- `GET /api/avaliacoes/:id`
- `POST /api/avaliacoes`
- `PUT /api/avaliacoes/:id`
- `DELETE /api/avaliacoes/:id`

### 9.5 Relacionamentos

- `GET /api/relacionamentos`
- `GET /api/relacionamentos/:id`
- `POST /api/relacionamentos`
- `PUT /api/relacionamentos/:id`
- `DELETE /api/relacionamentos/:id`

## 10. Fluxo de Utilizacao

O uso recomendado do sistema segue a ordem:

1. realizar login administrativo;
2. cadastrar estudantes;
3. cadastrar empresas;
4. cadastrar funcionarios;
5. criar relacionamentos entre estudantes e empresas;
6. registrar a Avaliacao 1;
7. registrar a Avaliacao 2;
8. acompanhar os indicadores no dashboard.

## 11. Requisitos Funcionais

- permitir acesso administrativo ao sistema;
- cadastrar, listar, editar e remover estudantes;
- cadastrar, listar, editar e remover empresas;
- cadastrar, listar, editar e remover funcionarios;
- listar avaliacoes por estudante;
- cadastrar avaliacao inicial;
- cadastrar avaliacao de acompanhamento;
- consultar detalhe de avaliacao;
- filtrar avaliacoes por `pessoa_id`;
- cadastrar e remover relacionamentos;
- exibir indicadores no dashboard.

## 12. Requisitos Nao Funcionais

- interface responsiva;
- persistencia em PostgreSQL;
- API REST estruturada;
- separacao entre frontend e backend;
- validacao de dados;
- integracao com Redux Toolkit e Axios;
- testes automatizados;
- organizacao modular de codigo.

## 13. Cronograma Resumido e Status

| Etapa | Situacao |
| --- | --- |
| levantamento dos modulos principais | concluido |
| estruturacao do backend | concluido |
| estruturacao do frontend | concluido |
| integracao com API real | concluido |
| adaptacao do modulo de avaliacoes | concluido |
| atualizacao da documentacao | concluido |
| testes automatizados | concluido |

## 14. Validacao e Testes

O projeto foi validado tecnicamente por meio de:

- build do frontend;
- build do backend;
- testes automatizados no frontend;
- testes automatizados no backend;
- chamadas reais para os endpoints principais;
- validacao real do fluxo de avaliacoes com listagem, filtro, detalhe e cadastro.

Os testes cobrem pontos relevantes como:

- comportamento da tela de avaliacao;
- envio de edicao de estudante;
- comportamento de servicos de estudantes;
- comportamento de servicos de avaliacoes;
- comportamento de servicos de relacionamentos.

## 15. Consideracoes Finais

O sistema desenvolvido atende ao objetivo de centralizar o acompanhamento educacional e profissional dos estudantes do Instituto de Educacao Especial Diomicio Freitas. A aplicacao oferece uma base funcional consistente, com interface integrada a uma API real, banco de dados persistente e estrutura modular adequada para evolucoes futuras.

Como continuidade, o projeto pode receber melhorias como autenticacao completa, perfis de permissao, emissao de relatorios e testes end-to-end. Ainda assim, no estado atual, a solucao ja entrega os principais fluxos necessarios para cadastro, avaliacao e acompanhamento institucional.
