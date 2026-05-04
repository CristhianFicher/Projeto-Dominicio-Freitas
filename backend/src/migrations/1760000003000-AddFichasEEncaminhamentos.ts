import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFichasEEncaminhamentos1760000003000 implements MigrationInterface {
  name = 'AddFichasEEncaminhamentos1760000003000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "fichas_acompanhamento" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "estudanteId" uuid NOT NULL,
        "empresaId" uuid,
        "dataRegistro" date NOT NULL,
        "status" character varying(20) NOT NULL DEFAULT 'ativo',
        "descricao" text NOT NULL,
        "proximosPassos" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_fichas_acompanhamento_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_fichas_estudante" FOREIGN KEY ("estudanteId") REFERENCES "estudantes"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_fichas_empresa" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE NO ACTION
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "encaminhamentos" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "estudanteId" uuid NOT NULL,
        "empresaId" uuid NOT NULL,
        "fichaAcompanhamentoId" uuid,
        "dataEncaminhamento" date NOT NULL,
        "status" character varying(20) NOT NULL DEFAULT 'ativo',
        "observacoes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_encaminhamentos_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_encaminhamentos_estudante" FOREIGN KEY ("estudanteId") REFERENCES "estudantes"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_encaminhamentos_empresa" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_encaminhamentos_ficha" FOREIGN KEY ("fichaAcompanhamentoId") REFERENCES "fichas_acompanhamento"("id") ON DELETE SET NULL ON UPDATE NO ACTION
      );
    `);

    await queryRunner.query('CREATE INDEX "IDX_fichas_estudante" ON "fichas_acompanhamento" ("estudanteId");');
    await queryRunner.query('CREATE INDEX "IDX_fichas_empresa" ON "fichas_acompanhamento" ("empresaId");');
    await queryRunner.query('CREATE INDEX "IDX_encaminhamentos_estudante" ON "encaminhamentos" ("estudanteId");');
    await queryRunner.query('CREATE INDEX "IDX_encaminhamentos_empresa" ON "encaminhamentos" ("empresaId");');
    await queryRunner.query('CREATE INDEX "IDX_encaminhamentos_status" ON "encaminhamentos" ("status");');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_encaminhamentos_status";');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_encaminhamentos_empresa";');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_encaminhamentos_estudante";');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_fichas_empresa";');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_fichas_estudante";');
    await queryRunner.query('DROP TABLE IF EXISTS "encaminhamentos";');
    await queryRunner.query('DROP TABLE IF EXISTS "fichas_acompanhamento";');
  }
}
