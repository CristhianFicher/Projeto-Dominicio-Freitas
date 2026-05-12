const assert = require('node:assert/strict');
const test = require('node:test');

require('reflect-metadata');

const { NotFoundException } = require('@nestjs/common');
const { AvaliacoesService } = require('../dist/modules/avaliacoes/avaliacoes.service');

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

test('AvaliacoesService lista avaliacoes filtrando por pessoa_id', async () => {
  const repo = createRepositoryMock();
  repo.findResult = [];

  const service = new AvaliacoesService(repo);
  await service.list('11111111-1111-1111-1111-111111111111');

  assert.deepEqual(repo.calls.find[0][0], {
    where: { pessoa_id: '11111111-1111-1111-1111-111111111111' },
    order: { data_avaliacao: 'DESC', created_at: 'DESC' },
  });
});

test('AvaliacoesService cria avaliacao com o payload da atividade', async () => {
  const repo = createRepositoryMock();
  repo.saveResult = { id: 1, tipo: 'inicial' };

  const service = new AvaliacoesService(repo);
  const payload = {
    pessoa_id: '11111111-1111-1111-1111-111111111111',
    data_avaliacao: '2026-03-30',
    tipo: 'inicial',
    professor_responsavel: 'Jucemar',
    q01: 'Sim',
    q02: 'Maioria',
    q46: 'Sim',
  };

  await service.create(payload);

  assert.deepEqual(repo.calls.create[0][0], payload);
  assert.deepEqual(repo.calls.save[0][0], payload);
});

test('AvaliacoesService dispara erro quando a avaliacao nao existe', async () => {
  const repo = createRepositoryMock();
  repo.findOneResult = null;

  const service = new AvaliacoesService(repo);

  await assert.rejects(() => service.get(999), NotFoundException);
});
