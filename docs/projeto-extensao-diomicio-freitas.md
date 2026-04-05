# Projeto de Extensao
## Sistema de Acompanhamento Educacional e Profissional

**Instituicao:** Instituto de Educacao Especial Diomicio Freitas  
**Projeto:** Plataforma web para cadastro, avaliacao e encaminhamento de estudantes  
**Repositorio base:** Projeto-Dominicio-Freitas-master  
**Stack principal:** React + Vite no frontend, NestJS + TypeORM + PostgreSQL no backend

## 1. Apresentacao do Projeto

Este projeto foi desenvolvido para apoiar o acompanhamento de estudantes atendidos pelo Instituto de Educacao Especial Diomicio Freitas, com foco em organizacao cadastral, registro de avaliacoes, acompanhamento por funcionarios e vinculacao com empresas parceiras.

O sistema permite controlar os principais dados operacionais da instituicao em um unico ambiente:

- cadastro de estudantes;
- cadastro de empresas parceiras;
- cadastro de funcionarios;
- registro das avaliacoes de experiencia 1 e 2;
- criacao de relacionamentos entre estudantes e empresas;
- visualizacao consolidada em dashboard.

## 2. Objetivo Geral

Centralizar o processo de acompanhamento educacional e de insercao profissional em uma aplicacao web integrada com banco de dados, permitindo registro, consulta, edicao e exclusao de dados relevantes para a rotina da instituicao.

## 3. Identidade do Sistema

O sistema utiliza uma interface administrativa com navegacao superior, dashboard inicial e modulos separados por tema. A linguagem visual atual e institucional, com foco em:

- clareza na leitura dos cadastros;
- rapidez para localizar estudantes, empresas e funcionarios;
- acesso direto as avaliacoes;
- visualizacao objetiva dos vinculos entre estudante e empresa.

No estado atual, a aplicacao possui:

- tela de login com acesso local temporario;
- dashboard com indicadores dos modulos principais;
- menu superior com acesso a Inicio, Estudantes, Avaliacoes, Empresas, Funcionarios e Relacoes;
- formularios de cadastro e edicao;
- listagens com busca e acoes de gerenciamento.

## 4. Acesso ao Sistema

Atualmente o acesso e local, com autenticacao simples para demonstracao:

| Campo | Valor |
| --- | --- |
| Login | `admin` |
| Senha | `admin` |

## 5. Estrutura por Modulos

### 5.1 Dashboard

O dashboard apresenta uma visao geral do sistema com indicadores de:

- estudantes cadastrados;
- empresas inclusivas;
- funcionarios de apoio;
- avaliacoes realizadas.

Tambem exibe:

- acoes rapidas para abrir cadastros e avaliacoes;
- resumo dos relacionamentos entre entidades;
- recursos de apoio;
- atividades recentes.

### 5.2 Modulo de Estudantes

Responsavel pelo cadastro e gerenciamento dos estudantes acompanhados pelo instituto.

**Campos principais do estudante:**

- nome;
- cpf;
- dataNascimento;
- telefone;
- email;
- endereco;
- nomeResponsavel;
- telefoneResponsavel;
- grauAutismo;
- necessidadesEspeciais;
- interesses;
- habilidades;
- objetivosEducacionais;
- objetivosProfissionais;
- observacoes.

**Acoes disponiveis:**

- cadastrar novo estudante;
- listar estudantes;
- buscar por nome, CPF ou email;
- editar cadastro;
- remover cadastro;
- abrir fluxo de avaliacao do estudante.

### 5.3 Modulo de Empresas

Responsavel pelo cadastro das empresas parceiras do projeto.

**Campos principais da empresa:**

- razaoSocial;
- nomeFantasia;
- cnpj;
- ie;
- endereco;
- numeroContatoRh;
- renda;
- areaAtuacao;
- porte;
- observacoes.

**Acoes disponiveis:**

- cadastrar empresa;
- listar empresas;
- buscar por razao social, nome fantasia, CNPJ ou area;
- editar dados;
- remover cadastro.

### 5.4 Modulo de Funcionarios

Responsavel pelo cadastro da equipe de apoio da instituicao.

**Campos principais do funcionario:**

- nome;
- cpf;
- telefone;
- email;
- endereco;
- dataNascimento;
- dataAdmissao;
- funcao;
- departamento;
- salario;
- nivelEscolaridade;
- experiencia;
- observacoes.

**Acoes disponiveis:**

- cadastrar funcionario;
- listar funcionarios;
- buscar por nome, CPF, email ou funcao;
- editar cadastro;
- remover cadastro.

### 5.5 Modulo de Avaliacoes

Este modulo foi adaptado para atender ao formato de atividade com Avaliacao 1 e Avaliacao 2.

Cada estudante pode possuir:

- uma avaliacao do tipo `inicial`;
- uma avaliacao do tipo `acompanhamento`.

**Campos principais da avaliacao:**

- `id`;
- `pessoa_id`;
- `data_avaliacao`;
- `tipo`;
- `professor_responsavel`;
- `q01` ate `q46`;
- `created_at`;
- `updated_at`.

**Comportamento do modulo:**

- lista os estudantes e mostra o status da Avaliacao 1 e da Avaliacao 2;
- permite iniciar uma nova avaliacao quando o registro ainda nao existe;
- abre em modo de visualizacao quando a avaliacao ja foi cadastrada;
- grava o resultado diretamente na API.

### 5.6 Modulo de Relacionamentos

Este modulo cria o vinculo entre estudante e empresa.

**Campos do relacionamento:**

- estudanteId;
- empresaId;
- tipoRelacao;
- statusRelacao;
- observacoes;
- criadoEm.

**Tipos de relacao previstos:**

- encaminhamento;
- estagio;
- emprego;
- acompanhamento.

**Status previstos:**

- ativo;
- pausado;
- encerrado.

## 6. Telas do Sistema

### 6.1 Tela de Login

Funcao principal:

- validar o acesso ao sistema.

Elementos:

- campo de login;
- campo de senha;
- mensagem de erro para credenciais invalidas;
- botao de entrada;
- exibicao das credenciais temporarias de acesso.

### 6.2 Tela Inicial / Dashboard

Funcao principal:

- apresentar o panorama geral do sistema.

Elementos:

- cards com indicadores;
- painel de visao geral dos relacionamentos;
- atalhos para os principais fluxos;
- bloco de recursos de apoio;
- bloco de atividades recentes.

### 6.3 Tela de Lista de Estudantes

Funcao principal:

- exibir e gerenciar os estudantes cadastrados.

Elementos:

- campo de busca;
- contador de resultados;
- cards individuais;
- botao para nova avaliacao;
- botao para editar;
- botao para remover;
- botao para novo estudante.

### 6.4 Tela de Cadastro e Edicao de Estudante

Secoes:

- dados pessoais;
- endereco e contato;
- responsavel;
- caracteristicas do autismo;
- interesses e habilidades;
- objetivos educacionais e profissionais;
- observacoes adicionais.

### 6.5 Tela de Lista de Empresas

Funcao principal:

- exibir e gerenciar empresas parceiras.

Elementos:

- campo de busca;
- contador de resultados;
- cards com dados empresariais;
- botao de edicao;
- botao de remocao;
- botao para nova empresa.

### 6.6 Tela de Cadastro e Edicao de Empresa

Secoes:

- dados da empresa;
- endereco e contato;
- informacoes empresariais;
- observacoes adicionais.

### 6.7 Tela de Lista de Funcionarios

Funcao principal:

- exibir e gerenciar os funcionarios cadastrados.

Elementos:

- busca;
- cards com informacoes pessoais e profissionais;
- botao de edicao;
- botao de remocao;
- botao para novo funcionario.

### 6.8 Tela de Cadastro e Edicao de Funcionario

Secoes:

- dados pessoais;
- endereco;
- dados profissionais;
- experiencia e qualificacoes;
- observacoes adicionais.

### 6.9 Tela de Lista de Avaliacoes

Funcao principal:

- centralizar o acesso as avaliacoes dos estudantes.

Elementos:

- busca por estudante;
- indicacao de status da avaliacao 1;
- indicacao de status da avaliacao 2;
- data da avaliacao;
- professor responsavel;
- botao para avaliar ou visualizar.

### 6.10 Tela de Avaliacao

Funcao principal:

- registrar o instrumento de avaliacao com 46 perguntas.

Elementos:

- identificacao do estudante;
- selecao do tipo de avaliacao;
- campo de professor responsavel;
- perguntas `q01` a `q46`;
- opcoes de resposta:
  - Sim;
  - Maioria;
  - Raramente;
  - Nao.

Regras da tela:

- se a avaliacao ja existir, a tela entra em modo somente leitura;
- para salvar, todas as perguntas devem estar respondidas;
- para salvar, o professor responsavel deve ser informado.

### 6.11 Tela de Relacionamentos

Funcao principal:

- criar e gerenciar o vinculo entre estudantes e empresas.

Elementos:

- seletor de estudante;
- seletor de empresa;
- seletor de tipo de relacao;
- seletor de status;
- campo de observacoes;
- listagem dos vinculos cadastrados;
- botao para remover vinculo.

## 7. Modelo de Dados e Relacionamentos

### 7.1 Entidades principais

| Entidade | Chave primaria | Finalidade |
| --- | --- | --- |
| estudantes | UUID | Cadastro principal dos estudantes |
| empresas | UUID | Cadastro das empresas parceiras |
| funcionarios | UUID | Cadastro da equipe interna |
| avaliacoes | SERIAL | Registro das avaliacoes de experiencia |
| relacionamentos | UUID | Vinculo entre estudante e empresa |

### 7.2 Relacionamentos do sistema

- um estudante pode possuir varias avaliacoes ao longo do acompanhamento;
- um estudante pode possuir varios relacionamentos com empresas;
- uma empresa pode se relacionar com varios estudantes;
- cada relacionamento referencia exatamente um estudante e uma empresa;
- cada avaliacao referencia um estudante atraves de `pessoa_id`.

### 7.3 Observacao tecnica importante

Para aderir ao projeto atual, o campo `pessoa_id` da tabela `avaliacoes` referencia o estudante existente por UUID. Ou seja, o contrato da API segue o nome da atividade, mas a chave vinculada continua sendo a da tabela `estudantes`.

## 8. Endpoints Principais

### 8.1 Estudantes

- `GET /api/estudantes`
- `GET /api/estudantes/:id`
- `POST /api/estudantes`
- `PUT /api/estudantes/:id`
- `DELETE /api/estudantes/:id`

### 8.2 Empresas

- `GET /api/empresas`
- `GET /api/empresas/:id`
- `POST /api/empresas`
- `PUT /api/empresas/:id`
- `DELETE /api/empresas/:id`

### 8.3 Funcionarios

- `GET /api/funcionarios`
- `GET /api/funcionarios/:id`
- `POST /api/funcionarios`
- `PUT /api/funcionarios/:id`
- `DELETE /api/funcionarios/:id`

### 8.4 Avaliacoes

- `GET /api/avaliacoes`
- `GET /api/avaliacoes?pessoa_id=<uuid>`
- `GET /api/avaliacoes/:id`
- `POST /api/avaliacoes`
- `PUT /api/avaliacoes/:id`
- `DELETE /api/avaliacoes/:id`

### 8.5 Relacionamentos

- `GET /api/relacionamentos`
- `GET /api/relacionamentos/:id`
- `POST /api/relacionamentos`
- `PUT /api/relacionamentos/:id`
- `DELETE /api/relacionamentos/:id`

## 9. Requisitos Funcionais

- permitir login local para acesso ao sistema;
- cadastrar, listar, editar e remover estudantes;
- cadastrar, listar, editar e remover empresas;
- cadastrar, listar, editar e remover funcionarios;
- listar avaliacoes existentes por estudante;
- cadastrar avaliacao inicial;
- cadastrar avaliacao de acompanhamento;
- consultar o detalhe de uma avaliacao;
- filtrar avaliacoes por estudante usando `pessoa_id`;
- cadastrar relacionamentos entre estudantes e empresas;
- remover relacionamentos;
- apresentar indicadores no dashboard.

## 10. Requisitos Nao Funcionais

- interface responsiva para desktop e mobile;
- persistencia de dados em PostgreSQL;
- API REST com NestJS;
- frontend React com navegacao por rotas;
- validacao de dados no backend;
- integracao via Axios e Redux Toolkit;
- testes automatizados para frontend e backend;
- organizacao modular de codigo para facilitar manutencao.

## 11. Fluxo de Uso Sugerido

Ordem recomendada para uso do sistema:

1. realizar login com usuario administrativo;
2. cadastrar estudantes;
3. cadastrar empresas parceiras;
4. cadastrar funcionarios de apoio;
5. criar relacionamentos entre estudante e empresa;
6. registrar Avaliacao 1 para o estudante;
7. registrar Avaliacao 2 conforme acompanhamento;
8. consultar dashboard e listas para monitorar a operacao.

## 12. Regras de Negocio e Alertas

- o sistema nao permite salvar avaliacao sem estudante informado;
- o sistema nao permite salvar avaliacao sem professor responsavel;
- o sistema nao permite salvar avaliacao com perguntas em branco;
- o sistema impede duplicidade de avaliacao por estudante e tipo;
- o sistema alerta quando um vinculo ativo entre estudante e empresa ja existe;
- remocoes exigem confirmacao nas telas de listagem;
- erros de integracao com a API retornam mensagem de falha ao usuario.

## 13. Validacao Tecnica do Projeto

Validacoes ja executadas no projeto:

- build do frontend;
- build do backend;
- testes automatizados do frontend;
- testes automatizados do backend;
- chamadas reais para os endpoints principais;
- validacao real do fluxo de avaliacoes com listagem, filtro, detalhe e cadastro.

## 14. Checklist de Entrega

- modulo de estudantes funcional;
- modulo de empresas funcional;
- modulo de funcionarios funcional;
- modulo de relacionamentos funcional;
- modulo de avaliacoes adaptado para `pessoa_id`, `tipo`, `professor_responsavel` e `q01..q46`;
- integracao frontend com backend;
- banco de dados PostgreSQL configurado;
- endpoints REST implementados;
- testes automatizados adicionados;
- documentacao do projeto atualizada.

## 15. Possiveis Ajustes Futuros

- substituir autenticacao local por autenticacao real com usuarios;
- gerar relatorios de avaliacoes por estudante;
- incluir historico de evolucao por periodo;
- ampliar controle de perfis e permissoes;
- exportar dados para PDF ou planilhas;
- adicionar testes end-to-end no navegador.

## 16. Observacao Final

Este documento foi montado a partir da implementacao real existente no repositorio e segue a linha estrutural do modelo apresentado no PDF de referencia. Caso voce queira, o proximo passo pode ser converter este material para um formato mais academico, com capa, integrantes, disciplina, professor, data e sumario prontos para entrega.
