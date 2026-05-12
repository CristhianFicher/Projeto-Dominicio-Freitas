import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitOngSchema1760000000000 implements MigrationInterface {
  name = 'InitOngSchema1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

    await queryRunner.query(`
      CREATE TABLE "estudantes" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "nome" character varying(150) NOT NULL,
        "cpf" character varying(20) NOT NULL,
        "dataNascimento" date NOT NULL,
        "telefone" character varying(20) NOT NULL,
        "email" character varying(180) NOT NULL,
        "endereco" text NOT NULL,
        "nomeResponsavel" character varying(150),
        "telefoneResponsavel" character varying(20),
        "grauAutismo" character varying(20),
        "necessidadesEspeciais" text,
        "interesses" text,
        "habilidades" text,
        "objetivosEducacionais" text,
        "objetivosProfissionais" text,
        "observacoes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_estudantes_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "empresas" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "razaoSocial" character varying(180) NOT NULL,
        "nomeFantasia" character varying(180) NOT NULL,
        "cnpj" character varying(30) NOT NULL,
        "ie" character varying(30),
        "endereco" text NOT NULL,
        "numeroContatoRh" character varying(20) NOT NULL,
        "renda" double precision NOT NULL DEFAULT 0,
        "areaAtuacao" character varying(120) NOT NULL,
        "porte" character varying(20) NOT NULL,
        "observacoes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_empresas_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "funcionarios" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "nome" character varying(150) NOT NULL,
        "cpf" character varying(20) NOT NULL,
        "telefone" character varying(20) NOT NULL,
        "email" character varying(180) NOT NULL,
        "endereco" text NOT NULL,
        "dataNascimento" date NOT NULL,
        "dataAdmissao" date NOT NULL,
        "funcao" character varying(120) NOT NULL,
        "departamento" character varying(40) NOT NULL,
        "salario" double precision NOT NULL DEFAULT 0,
        "nivelEscolaridade" character varying(40),
        "experiencia" text,
        "observacoes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_funcionarios_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "avaliacoes" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "estudanteId" uuid NOT NULL,
        "tipoAvaliacao" integer NOT NULL,
        "dataAvaliacao" date NOT NULL,
        "respostas" jsonb NOT NULL DEFAULT '{}'::jsonb,
        "observacoes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_avaliacoes_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_avaliacao_estudante_tipo" UNIQUE ("estudanteId", "tipoAvaliacao"),
        CONSTRAINT "FK_avaliacoes_estudante" FOREIGN KEY ("estudanteId") REFERENCES "estudantes"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "relacionamentos" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "estudanteId" uuid NOT NULL,
        "empresaId" uuid NOT NULL,
        "tipoRelacao" character varying(40) NOT NULL DEFAULT 'encaminhamento',
        "statusRelacao" character varying(20) NOT NULL DEFAULT 'ativo',
        "observacoes" text,
        "criadoEm" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_relacionamentos_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_relacionamentos_estudante" FOREIGN KEY ("estudanteId") REFERENCES "estudantes"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_relacionamentos_empresa" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);

    await queryRunner.query('CREATE INDEX "IDX_avaliacoes_estudante" ON "avaliacoes" ("estudanteId");');
    await queryRunner.query('CREATE INDEX "IDX_relacionamentos_estudante" ON "relacionamentos" ("estudanteId");');
    await queryRunner.query('CREATE INDEX "IDX_relacionamentos_empresa" ON "relacionamentos" ("empresaId");');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_relacionamentos_empresa";');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_relacionamentos_estudante";');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_avaliacoes_estudante";');
    await queryRunner.query('DROP TABLE IF EXISTS "relacionamentos";');
    await queryRunner.query('DROP TABLE IF EXISTS "avaliacoes";');
    await queryRunner.query('DROP TABLE IF EXISTS "funcionarios";');
    await queryRunner.query('DROP TABLE IF EXISTS "empresas";');
    await queryRunner.query('DROP TABLE IF EXISTS "estudantes";');
  }
}
