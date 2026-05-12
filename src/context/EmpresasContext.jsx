import { createContext, useContext, useState } from 'react';
const EmpresasContext = createContext();
export const useEmpresas = () => {
  const context = useContext(EmpresasContext);
  if (!context) {
    throw new Error('useEmpresas deve ser usado dentro de um EmpresasProvider');
  }
  return context;
};
export const EmpresasProvider = ({ children }) => {
  const [empresas, setEmpresas] = useState([
    {
      id: 1,
      razaoSocial: 'Tech Solutions Ltda',
      nomeFantasia: 'TechSol',
      cnpj: '12.345.678/0001-90',
      ie: '123456789',
      endereco: 'Av. Paulista, 1000, Bela Vista, São Paulo - SP',
      numeroContatoRh: '(11) 99999-9999',
      renda: 5000000,
      areaAtuacao: 'Tecnologia',
      porte: 'Média',
      observacoes: 'Empresa focada em inclusão e diversidade'
    },
    {
      id: 2,
      razaoSocial: 'Inclusão Digital S.A.',
      nomeFantasia: 'Inclusão Digital',
      cnpj: '98.765.432/0001-10',
      ie: '987654321',
      endereco: 'Rua das Flores, 500, Centro, Rio de Janeiro - RJ',
      numeroContatoRh: '(21) 88888-8888',
      renda: 2000000,
      areaAtuacao: 'Consultoria',
      porte: 'Pequena',
      observacoes: 'Especializada em inclusão de pessoas com deficiência'
    }
  ]);
  const adicionarEmpresa = (novaEmpresa) => {
    const id = Math.max(...empresas.map(e => e.id), 0) + 1;
    setEmpresas(prev => [...prev, { ...novaEmpresa, id }]);
  };
  const editarEmpresa = (id, dadosAtualizados) => {
    setEmpresas(prev => 
      prev.map(empresa => 
        empresa.id === id 
          ? { ...empresa, ...dadosAtualizados }
          : empresa
      )
    );
  };
  const removerEmpresa = (id) => {
    setEmpresas(prev => prev.filter(empresa => empresa.id !== id));
  };
  const obterEmpresaPorId = (id) => {
    return empresas.find(empresa => empresa.id === id);
  };
  return (
    <EmpresasContext.Provider value={{
      empresas,
      adicionarEmpresa,
      editarEmpresa,
      removerEmpresa,
      obterEmpresaPorId
    }}>
      {children}
    </EmpresasContext.Provider>
  );
};
