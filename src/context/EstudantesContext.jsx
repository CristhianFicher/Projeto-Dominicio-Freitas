import { createContext, useContext, useState } from 'react';
const EstudantesContext = createContext();
export const useEstudantes = () => {
  const context = useContext(EstudantesContext);
  if (!context) {
    throw new Error('useEstudantes deve ser usado dentro de um EstudantesProvider');
  }
  return context;
};
export const EstudantesProvider = ({ children }) => {
  const [estudantes, setEstudantes] = useState([
    {
      id: 1,
      nome: 'João Silva',
      cpf: '123.456.789-00',
      dataNascimento: '2000-05-15',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      endereco: 'Rua das Flores, 123, Centro, São Paulo - SP',
      nomeResponsavel: 'Maria Silva',
      telefoneResponsavel: '(11) 88888-8888',
      grauAutismo: 'leve',
      necessidadesEspeciais: 'Precisa de ambiente calmo para concentração',
      interesses: 'Tecnologia, Programação',
      habilidades: 'Memória visual, atenção aos detalhes',
      objetivosEducacionais: 'Completar curso de programação',
      objetivosProfissionais: 'Trabalhar como desenvolvedor',
      observacoes: 'Estudante muito dedicado e focado'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cpf: '987.654.321-00',
      dataNascimento: '1998-03-22',
      telefone: '(11) 77777-7777',
      email: 'maria@email.com',
      endereco: 'Av. Paulista, 456, Bela Vista, São Paulo - SP',
      nomeResponsavel: 'Carlos Santos',
      telefoneResponsavel: '(11) 66666-6666',
      grauAutismo: 'moderado',
      necessidadesEspeciais: 'Suporte para comunicação social',
      interesses: 'Arte, Design',
      habilidades: 'Criatividade, pensamento visual',
      objetivosEducacionais: 'Cursar design gráfico',
      objetivosProfissionais: 'Trabalhar como designer',
      observacoes: 'Muito criativa e expressiva através da arte'
    }
  ]);
  const adicionarEstudante = (novoEstudante) => {
    const id = Math.max(...estudantes.map(e => e.id), 0) + 1;
    setEstudantes(prev => [...prev, { ...novoEstudante, id }]);
  };
  const editarEstudante = (id, dadosAtualizados) => {
    setEstudantes(prev => 
      prev.map(estudante => 
        estudante.id === id 
          ? { ...estudante, ...dadosAtualizados }
          : estudante
      )
    );
  };
  const removerEstudante = (id) => {
    setEstudantes(prev => prev.filter(estudante => estudante.id !== id));
  };
  const obterEstudantePorId = (id) => {
    return estudantes.find(estudante => estudante.id === id);
  };
  return (
    <EstudantesContext.Provider value={{
      estudantes,
      adicionarEstudante,
      editarEstudante,
      removerEstudante,
      obterEstudantePorId
    }}>
      {children}
    </EstudantesContext.Provider>
  );
};
