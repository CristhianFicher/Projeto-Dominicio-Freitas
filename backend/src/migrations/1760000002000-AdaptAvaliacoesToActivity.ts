import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdaptAvaliacoesToActivity1760000002000 implements MigrationInterface {
  name = 'AdaptAvaliacoesToActivity1760000002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_avaliacoes_estudante";');
    await queryRunner.query('DROP TABLE IF EXISTS "avaliacoes";');

    await queryRunner.query(`
      CREATE TABLE "avaliacoes" (
        "id" SERIAL NOT NULL,
        "pessoa_id" uuid NOT NULL,
        "data_avaliacao" date NOT NULL,
        "tipo" character varying(20) NOT NULL,
        "professor_responsavel" character varying(100) NOT NULL,
        "q01" character varying(20),
        "q02" character varying(20),
        "q03" character varying(20),
        "q04" character varying(20),
        "q05" character varying(20),
        "q06" character varying(20),
        "q07" character varying(20),
        "q08" character varying(20),
        "q09" character varying(20),
        "q10" character varying(20),
        "q11" character varying(20),
        "q12" character varying(20),
        "q13" character varying(20),
        "q14" character varying(20),
        "q15" character varying(20),
        "q16" character varying(20),
        "q17" character varying(20),
        "q18" character varying(20),
        "q19" character varying(20),
        "q20" character varying(20),
        "q21" character varying(20),
        "q22" character varying(20),
        "q23" character varying(20),
        "q24" character varying(20),
        "q25" character varying(20),
        "q26" character varying(20),
        "q27" character varying(20),
        "q28" character varying(20),
        "q29" character varying(20),
        "q30" character varying(20),
        "q31" character varying(20),
        "q32" character varying(20),
        "q33" character varying(20),
        "q34" character varying(20),
        "q35" character varying(20),
        "q36" character varying(20),
        "q37" character varying(20),
        "q38" character varying(20),
        "q39" character varying(20),
        "q40" character varying(20),
        "q41" character varying(20),
        "q42" character varying(20),
        "q43" character varying(20),
        "q44" character varying(20),
        "q45" character varying(20),
        "q46" character varying(20),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_avaliacoes_id" PRIMARY KEY ("id"),
        CONSTRAINT "CHK_avaliacoes_tipo" CHECK ("tipo" IN ('inicial', 'acompanhamento')),
        CONSTRAINT "UQ_avaliacoes_pessoa_tipo" UNIQUE ("pessoa_id", "tipo"),
        CONSTRAINT "FK_avaliacoes_pessoa" FOREIGN KEY ("pessoa_id") REFERENCES "estudantes"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);

    await queryRunner.query('CREATE INDEX "IDX_avaliacoes_pessoa" ON "avaliacoes" ("pessoa_id");');

    await queryRunner.query(`
      INSERT INTO "avaliacoes" (
        "pessoa_id",
        "data_avaliacao",
        "tipo",
        "professor_responsavel",
        "q01",
        "q02",
        "q03"
      ) VALUES (
        '11111111-1111-1111-1111-111111111111',
        '2026-03-01',
        'inicial',
        'Jucemar',
        'Sim',
        'Maioria',
        'Nao'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_avaliacoes_pessoa";');
    await queryRunner.query('DROP TABLE IF EXISTS "avaliacoes";');

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

    await queryRunner.query('CREATE INDEX "IDX_avaliacoes_estudante" ON "avaliacoes" ("estudanteId");');
  }
}
