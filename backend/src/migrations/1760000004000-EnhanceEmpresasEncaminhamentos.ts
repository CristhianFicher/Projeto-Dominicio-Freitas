import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnhanceEmpresasEncaminhamentos1760000004000 implements MigrationInterface {
  name = 'EnhanceEmpresasEncaminhamentos1760000004000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "telefone" character varying(20);');
    await queryRunner.query('ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "contatoRhNome" character varying(100);');
    await queryRunner.query('ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "contatoRhEmail" character varying(100);');

    await queryRunner.query('ALTER TABLE "encaminhamentos" ADD COLUMN IF NOT EXISTS "dataAdmissao" date;');
    await queryRunner.query('ALTER TABLE "encaminhamentos" ADD COLUMN IF NOT EXISTS "funcao" character varying(100);');
    await queryRunner.query('ALTER TABLE "encaminhamentos" ADD COLUMN IF NOT EXISTS "contatoRh" character varying(100);');
    await queryRunner.query('ALTER TABLE "encaminhamentos" ADD COLUMN IF NOT EXISTS "dataProvavelDesligamento" date;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "encaminhamentos" DROP COLUMN IF EXISTS "dataProvavelDesligamento";');
    await queryRunner.query('ALTER TABLE "encaminhamentos" DROP COLUMN IF EXISTS "contatoRh";');
    await queryRunner.query('ALTER TABLE "encaminhamentos" DROP COLUMN IF EXISTS "funcao";');
    await queryRunner.query('ALTER TABLE "encaminhamentos" DROP COLUMN IF EXISTS "dataAdmissao";');

    await queryRunner.query('ALTER TABLE "empresas" DROP COLUMN IF EXISTS "contatoRhEmail";');
    await queryRunner.query('ALTER TABLE "empresas" DROP COLUMN IF EXISTS "contatoRhNome";');
    await queryRunner.query('ALTER TABLE "empresas" DROP COLUMN IF EXISTS "telefone";');
  }
}
