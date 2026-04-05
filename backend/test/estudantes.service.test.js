const assert = require('node:assert/strict');
const test = require('node:test');

require('reflect-metadata');

const { NotFoundException } = require('@nestjs/common');
const { EstudantesService } = require('../dist/modules/estudantes/estudantes.service');

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

test('EstudantesService lista estudantes em ordem decrescente de criacao', async () => {
  const repo = createRepositoryMock();
  const estudantes = [{ id: '1' }, { id: '2' }];
  repo.findResult = estudantes;

  const service = new EstudantesService(repo);
  const resultado = await service.list();

  assert.deepEqual(resultado, estudantes);
  assert.deepEqual(repo.calls.find[0][0], { order: { createdAt: 'DESC' } });
});

test('EstudantesService atualiza um estudante existente', async () => {
  const repo = createRepositoryMock();
  const estudante = { id: '1', nome: 'Ana' };
  repo.findOneResult = estudante;
  repo.saveResult = { id: '1', nome: 'Ana Atualizada' };

  const service = new EstudantesService(repo);
  const resultado = await service.update('1', { nome: 'Ana Atualizada' });

  assert.equal(resultado.nome, 'Ana Atualizada');
  assert.deepEqual(repo.calls.findOne[0][0], { where: { id: '1' } });
  assert.deepEqual(repo.calls.merge[0], [estudante, { nome: 'Ana Atualizada' }]);
  assert.deepEqual(repo.calls.save[0], [estudante]);
});

test('EstudantesService dispara erro quando o estudante nao existe', async () => {
  const repo = createRepositoryMock();
  repo.findOneResult = null;

  const service = new EstudantesService(repo);

  await assert.rejects(() => service.get('inexistente'), NotFoundException);
});
