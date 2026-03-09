-- =============================================================
-- ATIVIDADE 01 - MODELO LÓGICO (6 TABELAS OBRIGATÓRIAS)
-- Banco alvo: PostgreSQL
-- Entrega: 09/03/2026
-- =============================================================

BEGIN;

-- Remoção em ordem de dependência (caso já existam)
DROP TABLE IF EXISTS encaminhamentos CASCADE;
DROP TABLE IF EXISTS fichas_acompanhamento CASCADE;
DROP TABLE IF EXISTS avaliacoes CASCADE;
DROP TABLE IF EXISTS empresas CASCADE;
DROP TABLE IF EXISTS pessoas CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- 1) usuarios: controle de acesso e recuperação de senha
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  token_recuperacao VARCHAR(255),
  validade_token TIMESTAMP,
  nivel_acesso VARCHAR(20) NOT NULL CHECK (nivel_acesso IN ('admin', 'usuario')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 2) pessoas: dados de alunos/usuários atendidos
CREATE TABLE pessoas (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  data_entrada DATE NOT NULL,
  telefone VARCHAR(20),
  nome_responsavel VARCHAR(100),
  telefone_responsavel VARCHAR(20),
  usa_medicamento BOOLEAN NOT NULL DEFAULT FALSE,
  info_medicamentos TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('ativo', 'inativo')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 3) empresas: empresas parceiras
CREATE TABLE empresas (
  id BIGSERIAL PRIMARY KEY,
  nome_fantasia VARCHAR(100) NOT NULL,
  razao_social VARCHAR(100) NOT NULL,
  cnpj VARCHAR(20) NOT NULL UNIQUE,
  endereco TEXT,
  telefone VARCHAR(20),
  contato_rh_nome VARCHAR(100),
  contato_rh_email VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 4) avaliacoes: questionários 1 e 2 (q01 a q46)
-- Opção adotada: VARCHAR(10) para respostas como Sim/Não/Maioria/Raras.
CREATE TABLE avaliacoes (
  id BIGSERIAL PRIMARY KEY,
  pessoa_id BIGINT NOT NULL,
  data_avaliacao DATE NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('inicial', 'acompanhamento')),
  professor_responsavel VARCHAR(100) NOT NULL,

  q01 VARCHAR(10), q02 VARCHAR(10), q03 VARCHAR(10), q04 VARCHAR(10), q05 VARCHAR(10),
  q06 VARCHAR(10), q07 VARCHAR(10), q08 VARCHAR(10), q09 VARCHAR(10), q10 VARCHAR(10),
  q11 VARCHAR(10), q12 VARCHAR(10), q13 VARCHAR(10), q14 VARCHAR(10), q15 VARCHAR(10),
  q16 VARCHAR(10), q17 VARCHAR(10), q18 VARCHAR(10), q19 VARCHAR(10), q20 VARCHAR(10),
  q21 VARCHAR(10), q22 VARCHAR(10), q23 VARCHAR(10), q24 VARCHAR(10), q25 VARCHAR(10),
  q26 VARCHAR(10), q27 VARCHAR(10), q28 VARCHAR(10), q29 VARCHAR(10), q30 VARCHAR(10),
  q31 VARCHAR(10), q32 VARCHAR(10), q33 VARCHAR(10), q34 VARCHAR(10), q35 VARCHAR(10),
  q36 VARCHAR(10), q37 VARCHAR(10), q38 VARCHAR(10), q39 VARCHAR(10), q40 VARCHAR(10),
  q41 VARCHAR(10), q42 VARCHAR(10), q43 VARCHAR(10), q44 VARCHAR(10), q45 VARCHAR(10),
  q46 VARCHAR(10),

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_avaliacoes_pessoa
    FOREIGN KEY (pessoa_id)
    REFERENCES pessoas(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ck_avaliacoes_q01 CHECK (q01  IS NULL OR q01  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q02 CHECK (q02  IS NULL OR q02  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q03 CHECK (q03  IS NULL OR q03  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q04 CHECK (q04  IS NULL OR q04  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q05 CHECK (q05  IS NULL OR q05  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q06 CHECK (q06  IS NULL OR q06  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q07 CHECK (q07  IS NULL OR q07  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q08 CHECK (q08  IS NULL OR q08  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q09 CHECK (q09  IS NULL OR q09  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q10 CHECK (q10  IS NULL OR q10  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q11 CHECK (q11  IS NULL OR q11  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q12 CHECK (q12  IS NULL OR q12  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q13 CHECK (q13  IS NULL OR q13  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q14 CHECK (q14  IS NULL OR q14  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q15 CHECK (q15  IS NULL OR q15  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q16 CHECK (q16  IS NULL OR q16  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q17 CHECK (q17  IS NULL OR q17  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q18 CHECK (q18  IS NULL OR q18  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q19 CHECK (q19  IS NULL OR q19  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q20 CHECK (q20  IS NULL OR q20  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q21 CHECK (q21  IS NULL OR q21  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q22 CHECK (q22  IS NULL OR q22  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q23 CHECK (q23  IS NULL OR q23  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q24 CHECK (q24  IS NULL OR q24  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q25 CHECK (q25  IS NULL OR q25  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q26 CHECK (q26  IS NULL OR q26  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q27 CHECK (q27  IS NULL OR q27  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q28 CHECK (q28  IS NULL OR q28  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q29 CHECK (q29  IS NULL OR q29  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q30 CHECK (q30  IS NULL OR q30  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q31 CHECK (q31  IS NULL OR q31  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q32 CHECK (q32  IS NULL OR q32  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q33 CHECK (q33  IS NULL OR q33  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q34 CHECK (q34  IS NULL OR q34  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q35 CHECK (q35  IS NULL OR q35  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q36 CHECK (q36  IS NULL OR q36  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q37 CHECK (q37  IS NULL OR q37  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q38 CHECK (q38  IS NULL OR q38  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q39 CHECK (q39  IS NULL OR q39  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q40 CHECK (q40  IS NULL OR q40  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q41 CHECK (q41  IS NULL OR q41  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q42 CHECK (q42  IS NULL OR q42  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q43 CHECK (q43  IS NULL OR q43  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q44 CHECK (q44  IS NULL OR q44  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q45 CHECK (q45  IS NULL OR q45  IN ('Sim', 'Não', 'Maioria', 'Raras')),
  CONSTRAINT ck_avaliacoes_q46 CHECK (q46  IS NULL OR q46  IN ('Sim', 'Não', 'Maioria', 'Raras'))
);

CREATE INDEX idx_avaliacoes_pessoa_id ON avaliacoes (pessoa_id);
CREATE INDEX idx_avaliacoes_data ON avaliacoes (data_avaliacao);

-- 5) fichas_acompanhamento: visitas e acompanhamento
CREATE TABLE fichas_acompanhamento (
  id BIGSERIAL PRIMARY KEY,
  pessoa_id BIGINT NOT NULL,
  empresa_id BIGINT,
  data_visita DATE NOT NULL,
  contato_rh VARCHAR(100),
  parecer_geral TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_fichas_pessoa
    FOREIGN KEY (pessoa_id)
    REFERENCES pessoas(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_fichas_empresa
    FOREIGN KEY (empresa_id)
    REFERENCES empresas(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE INDEX idx_fichas_pessoa_id ON fichas_acompanhamento (pessoa_id);
CREATE INDEX idx_fichas_empresa_id ON fichas_acompanhamento (empresa_id);

-- 6) encaminhamentos: alunos encaminhados ao trabalho
CREATE TABLE encaminhamentos (
  id BIGSERIAL PRIMARY KEY,
  pessoa_id BIGINT NOT NULL,
  empresa_id BIGINT NOT NULL,
  data_admissao DATE,
  funcao VARCHAR(100),
  contato_rh VARCHAR(100),
  data_provavel_desligamento DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('ativo', 'desligado')),
  observacoes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_encaminhamentos_pessoa
    FOREIGN KEY (pessoa_id)
    REFERENCES pessoas(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_encaminhamentos_empresa
    FOREIGN KEY (empresa_id)
    REFERENCES empresas(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE INDEX idx_encaminhamentos_pessoa_id ON encaminhamentos (pessoa_id);
CREATE INDEX idx_encaminhamentos_empresa_id ON encaminhamentos (empresa_id);

COMMIT;

-- =============================================================
-- RELACIONAMENTOS IMPLEMENTADOS:
-- pessoas 1 --- N avaliacoes
-- pessoas 1 --- N fichas_acompanhamento
-- pessoas 1 --- N encaminhamentos
-- empresas 1 --- N fichas_acompanhamento
-- empresas 1 --- N encaminhamentos
-- usuarios (independente)
-- =============================================================
