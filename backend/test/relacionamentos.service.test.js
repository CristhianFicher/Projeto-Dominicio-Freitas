const assert = require('node:assert/strict');
const test = require('node:test');

require('reflect-metadata');

const { RelacionamentosService } = require('../dist/modules/relacionamentos/relacionamentos.service');

function createRepositoryMock() {
  const repo = {
    calls: {
      find: [],
      findOne: [],
      save: [],
      create: [],
      merge: [],
      remove: [],
    },
    findResult: undefined,
    findOneResult: undefined,
    saveResult: undefined,
    createResult: undefined,
    async find(...args) {
      repo.calls.find.push(args);
      return repo.findResult;
    },
    async findOne(...args) {
      repo.calls.findOne.push(args);
      return repo.findOneResult;
    },
    async save(...args) {
      repo.calls.save.push(args);
      return repo.saveResult ?? args[0];
    },
    create(...args) {
      repo.calls.create.push(args);
      return repo.createResult ?? args[0];
    },
    merge(...args) {
      repo.calls.merge.push(args);
      Object.assign(args[0], args[1]);
      return args[0];
    },
    async remove(...args) {
      repo.calls.remove.push(args);
      return args[0];
    },
  };

  return repo;
}

test('RelacionamentosService cria relacionamento convertendo criadoEm para Date', async () => {
  const repo = createRepositoryMock();
  const criadoEm = '2026-04-05T12:00:00.000Z';
  repo.saveResult = {
    id: '1',
    estudanteId: '11111111-1111-1111-1111-111111111111',
    empresaId: '22222222-2222-2222-2222-222222222222',
  };

  const service = new RelacionamentosService(repo);
  await service.create({
    estudanteId: '11111111-1111-1111-1111-111111111111',
    empresaId: '22222222-2222-2222-2222-222222222222',
    tipoRelacao: 'encaminhamento',
    statusRelacao: 'ativo',
    observacoes: 'Primeiro contato',
    criadoEm,
  });

  assert.equal(repo.calls.create.length, 1);
  assert.equal(repo.calls.create[0][0].criadoEm.toISOString(), criadoEm);
});

test('RelacionamentosService lista relacionamentos por criadoEm descrescente', async () => {
  const repo = createRepositoryMock();
  repo.findResult = [];

  const service = new RelacionamentosService(repo);
  await service.list();

  assert.deepEqual(repo.calls.find[0][0], { order: { criadoEm: 'DESC' } });
});
