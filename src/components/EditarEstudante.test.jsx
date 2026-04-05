import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import EditarEstudante from './EditarEstudante';
import api from '../services/api';
import { renderWithProvidersAndRouter } from '../test/renderWithProviders';

const mock = new MockAdapter(api);

afterEach(() => {
  mock.reset();
});

describe('EditarEstudante', () => {
  it('envia atualizacao usando o id UUID vindo da API', async () => {
    const estudanteId = '11111111-1111-1111-1111-111111111111';
    const user = userEvent.setup();

    mock.onPut(`/estudantes/${estudanteId}`).reply((config) => [
      200,
      {
        id: estudanteId,
        ...JSON.parse(config.data),
      },
    ]);

    renderWithProvidersAndRouter(<EditarEstudante />, {
      route: `/editar-estudante/${estudanteId}`,
      path: '/editar-estudante/:id',
      preloadedState: {
        estudantes: {
          items: [
            {
              id: estudanteId,
              nome: 'Ana Souza',
              cpf: '12345678901',
              dataNascimento: '2010-05-10',
              telefone: '48999990001',
              email: 'ana@ong.org',
              endereco: 'Rua A, 100',
              nomeResponsavel: 'Maria Souza',
              telefoneResponsavel: '48999990002',
              grauAutismo: 'leve',
              necessidadesEspeciais: '',
              interesses: '',
              habilidades: '',
              objetivosEducacionais: '',
              objetivosProfissionais: '',
              observacoes: '',
            },
          ],
          status: 'succeeded',
          error: null,
        },
        empresas: { items: [], status: 'idle', error: null },
        funcionarios: { items: [], status: 'idle', error: null },
        avaliacoes: { items: [], status: 'idle', error: null },
      },
    });

    const nomeInput = screen.getByLabelText('Nome Completo *');
    await user.clear(nomeInput);
    await user.type(nomeInput, 'Ana Souza Atualizada');

    await user.click(screen.getByRole('button', { name: 'Salvar Alteracoes' }));

    await waitFor(() => {
      expect(screen.getByText('Estudante atualizado com sucesso.')).toBeInTheDocument();
    });

    expect(mock.history.put).toHaveLength(1);
    expect(mock.history.put[0].url).toBe(`/estudantes/${estudanteId}`);
    expect(JSON.parse(mock.history.put[0].data)).toMatchObject({
      nome: 'Ana Souza Atualizada',
      cpf: '12345678901',
    });
  });
});
