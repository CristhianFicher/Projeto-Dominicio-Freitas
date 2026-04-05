import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Avaliacao from './avaliacao';
import { renderWithProvidersAndRouter } from '../test/renderWithProviders';

describe('Avaliacao', () => {
  it('abre em modo somente leitura quando a avaliacao ja existe', () => {
    const estudanteId = '11111111-1111-1111-1111-111111111111';

    renderWithProvidersAndRouter(<Avaliacao />, {
      route: `/avaliacao?estudante=${estudanteId}&tipo=1`,
      path: '/avaliacao',
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
            },
          ],
          status: 'succeeded',
          error: null,
        },
        avaliacoes: {
          items: [
            {
              id: 1,
              pessoa_id: estudanteId,
              tipo: 'inicial',
              data_avaliacao: '2026-03-01',
              professor_responsavel: 'Jucemar',
              q01: 'Sim',
              q02: 'Maioria',
            },
          ],
          status: 'succeeded',
          error: null,
        },
        empresas: { items: [], status: 'idle', error: null },
        funcionarios: { items: [], status: 'idle', error: null },
      },
    });

    expect(screen.getByText(/Visualizar avaliacao 1a experiencia/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jucemar')).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Salvar avaliacao' })).not.toBeInTheDocument();
  });
});
