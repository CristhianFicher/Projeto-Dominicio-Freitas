import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedOngData1760000001000 implements MigrationInterface {
  name = 'SeedOngData1760000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "estudantes" ("id", "nome", "cpf", "dataNascimento", "telefone", "email", "endereco", "nomeResponsavel", "telefoneResponsavel", "grauAutismo") VALUES
      ('11111111-1111-1111-1111-111111111111', 'Ana Souza', '12345678901', '2010-05-10', '48999990001', 'ana@ong.org', 'Rua A, 100', 'Maria Souza', '48999990002', 'leve'),
      ('22222222-2222-2222-2222-222222222222', 'Bruno Lima', '98765432100', '2009-08-15', '48999990003', 'bruno@ong.org', 'Rua B, 200', 'Carlos Lima', '48999990004', 'moderado');
    `);

    await queryRunner.query(`
      INSERT INTO "empresas" ("id", "razaoSocial", "nomeFantasia", "cnpj", "ie", "endereco", "numeroContatoRh", "renda", "areaAtuacao", "porte") VALUES
      ('33333333-3333-3333-3333-333333333333', 'Tech Inclusao LTDA', 'Tech Inclusao', '00111222000199', '123456789', 'Avenida Central, 500', '48999990010', 2000000, 'Tecnologia', 'media'),
      ('44444444-4444-4444-4444-444444444444', 'Comercio Social SA', 'Comercio Social', '99888777000155', '987654321', 'Rua Mercado, 45', '48999990020', 1200000, 'Comercio', 'pequena');
    `);

    await queryRunner.query(`
      INSERT INTO "funcionarios" ("id", "nome", "cpf", "telefone", "email", "endereco", "dataNascimento", "dataAdmissao", "funcao", "departamento", "salario", "nivelEscolaridade") VALUES
      ('55555555-5555-5555-5555-555555555555', 'Juliana Alves', '11222333444', '48999990030', 'juliana@ong.org', 'Rua C, 300', '1990-01-01', '2024-02-01', 'Pedagoga', 'inclusao', 4500, 'pos-graduacao');
    `);

    await queryRunner.query(`
      INSERT INTO "relacionamentos" ("id", "estudanteId", "empresaId", "tipoRelacao", "statusRelacao", "observacoes") VALUES
      ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'encaminhamento', 'ativo', 'Primeiro contato com RH.');
    `);

    await queryRunner.query(`
      INSERT INTO "avaliacoes" ("id", "estudanteId", "tipoAvaliacao", "dataAvaliacao", "respostas", "observacoes") VALUES
      ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 1, '2026-03-01', '{"pergunta_0":"sim","pergunta_1":"maioria"}'::jsonb, 'Bom engajamento inicial.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "avaliacoes" WHERE "id"='77777777-7777-7777-7777-777777777777';`);
    await queryRunner.query(`DELETE FROM "relacionamentos" WHERE "id"='66666666-6666-6666-6666-666666666666';`);
    await queryRunner.query(`DELETE FROM "funcionarios" WHERE "id"='55555555-5555-5555-5555-555555555555';`);
    await queryRunner.query(`DELETE FROM "empresas" WHERE "id" IN ('33333333-3333-3333-3333-333333333333','44444444-4444-4444-4444-444444444444');`);
    await queryRunner.query(`DELETE FROM "estudantes" WHERE "id" IN ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222');`);
  }
}
