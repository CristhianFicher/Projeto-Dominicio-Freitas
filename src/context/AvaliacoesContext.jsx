import { createContext, useContext, useState } from 'react';
const AvaliacoesContext = createContext();
export const useAvaliacoes = () => {
  const context = useContext(AvaliacoesContext);
  if (!context) {
    throw new Error('useAvaliacoes deve ser usado dentro de um AvaliacoesProvider');
  }
  return context;
};
export const AvaliacoesProvider = ({ children }) => {
  const [avaliacoes, setAvaliacoes] = useState([
    {
      id: 1,
      estudanteId: 1,
      tipoAvaliacao: 1,
      dataAvaliacao: '2024-01-15',
      respostas: {
        pergunta_0: 'sim',
        pergunta_1: 'maioria',
        pergunta_2: 'nao',
      },
      observacoes: 'Estudante demonstrou boa evolução',
      status: 'concluida'
    },
    {
      id: 2,
      estudanteId: 1,
      tipoAvaliacao: 2,
      dataAvaliacao: '2024-02-15',
      respostas: {
        pergunta_0: 'sim',
        pergunta_1: 'sim',
        pergunta_2: 'maioria',
      },
      observacoes: 'Excelente progresso nas habilidades sociais',
      status: 'concluida'
    },
    {
      id: 3,
      estudanteId: 2,
      tipoAvaliacao: 1,
      dataAvaliacao: '2024-01-20',
      respostas: {
        pergunta_0: 'rara',
        pergunta_1: 'maioria',
        pergunta_2: 'sim',
      },
      observacoes: 'Precisa de mais apoio em algumas áreas',
      status: 'concluida'
    }
  ]);
  const adicionarAvaliacao = (novaAvaliacao) => {
    const id = Math.max(...avaliacoes.map(a => a.id), 0) + 1;
    setAvaliacoes(prev => [...prev, { ...novaAvaliacao, id, status: 'concluida' }]);
  };
  const obterAvaliacaoPorEstudanteETipo = (estudanteId, tipoAvaliacao) => {
    return avaliacoes.find(a => 
      a.estudanteId === estudanteId && a.tipoAvaliacao === parseInt(tipoAvaliacao)
    );
  };
  const obterAvaliacoesPorEstudante = (estudanteId) => {
    return avaliacoes.filter(a => a.estudanteId === estudanteId);
  };
  const verificarAvaliacaoPendente = (estudanteId, tipoAvaliacao) => {
    const avaliacao = obterAvaliacaoPorEstudanteETipo(estudanteId, tipoAvaliacao);
    return !avaliacao;
  };
  return (
    <AvaliacoesContext.Provider value={{
      avaliacoes,
      adicionarAvaliacao,
      obterAvaliacaoPorEstudanteETipo,
      obterAvaliacoesPorEstudante,
      verificarAvaliacaoPendente
    }}>
      {children}
    </AvaliacoesContext.Provider>
  );
};
