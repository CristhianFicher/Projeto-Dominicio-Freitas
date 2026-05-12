import { createContext, useContext, useState } from 'react';
const FuncionariosContext = createContext();
export const useFuncionarios = () => {
  const context = useContext(FuncionariosContext);
  if (!context) {
    throw new Error('useFuncionarios deve ser usado dentro de um FuncionariosProvider');
  }
  return context;
};
export const FuncionariosProvider = ({ children }) => {
  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: 'Ana Silva',
      cpf: '111.222.333-44',
      telefone: '(11) 99999-1111',
      email: 'ana.silva@techsol.com',
      endereco: 'Rua A, 123, Centro, São Paulo - SP',
      dataNascimento: '1985-03-15',
      dataAdmissao: '2020-01-15',
      funcao: 'Desenvolvedora Senior',
      departamento: 'ti',
      salario: 8000,
      nivelEscolaridade: 'superior-completo',
      experiencia: '10 anos de experiência em desenvolvimento web e mobile',
      observacoes: 'Especialista em acessibilidade digital'
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      cpf: '555.666.777-88',
      telefone: '(11) 99999-2222',
      email: 'carlos.santos@inclusao.com',
      endereco: 'Av. B, 456, Vila Madalena, São Paulo - SP',
      dataNascimento: '1990-07-22',
      dataAdmissao: '2021-06-01',
      funcao: 'Analista de Inclusão',
      departamento: 'inclusao',
      salario: 6500,
      nivelEscolaridade: 'pos-graduacao',
      experiencia: '5 anos trabalhando com inclusão de pessoas com deficiência',
      observacoes: 'Formação em psicologia e especialização em inclusão'
    }
  ]);
  const adicionarFuncionario = (novoFuncionario) => {
    const id = Math.max(...funcionarios.map(f => f.id), 0) + 1;
    setFuncionarios(prev => [...prev, { ...novoFuncionario, id }]);
  };
  const editarFuncionario = (id, dadosAtualizados) => {
    setFuncionarios(prev => 
      prev.map(funcionario => 
        funcionario.id === id 
          ? { ...funcionario, ...dadosAtualizados }
          : funcionario
      )
    );
  };
  const removerFuncionario = (id) => {
    setFuncionarios(prev => prev.filter(funcionario => funcionario.id !== id));
  };
  const obterFuncionarioPorId = (id) => {
    return funcionarios.find(funcionario => funcionario.id === id);
  };
  return (
    <FuncionariosContext.Provider value={{
      funcionarios,
      adicionarFuncionario,
      editarFuncionario,
      removerFuncionario,
      obterFuncionarioPorId
    }}>
      {children}
    </FuncionariosContext.Provider>
  );
};
