import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpresas, deleteEmpresa } from '../redux/slices/empresasSlice';
import './ListaEstudantes.css';

const ListaEmpresas = () => {
  const dispatch = useDispatch();
  const { items: empresas, status } = useSelector((state) => state.empresas);

  const [filtro, setFiltro] = useState('');
  const [empresaParaRemover, setEmpresaParaRemover] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmpresas());
    }
  }, [status, dispatch]);

  const empresasFiltradas = empresas.filter((empresa) =>
    (empresa.razaoSocial || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (empresa.nomeFantasia || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (empresa.cnpj || '').includes(filtro) ||
    (empresa.areaAtuacao || '').toLowerCase().includes(filtro.toLowerCase())
  );

  const handleRemoverEmpresa = (id) => {
    dispatch(deleteEmpresa(id));
    setEmpresaParaRemover(null);
  };

  const formatarMoeda = (valor) => {
    if (valor == null || Number.isNaN(Number(valor))) return 'Nao informado';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));
  };

  const getPorteLabel = (porte) => {
    const portes = {
      micro: 'Microempresa',
      pequena: 'Pequena empresa',
      media: 'Media empresa',
      grande: 'Grande empresa',
    };

    return portes[porte] || 'Nao informado';
  };

  return (
    <div className="lista-estudantes">
      <div className="lista-header">
        <div className="header-content">
          <h1>Lista de empresas</h1>
          <p>Gerencie as empresas parceiras do sistema</p>
        </div>
        <Link to="/nova-empresa" className="btn-novo-estudante">
          <span className="btn-icon">+</span>
          Nova empresa
        </Link>
      </div>

      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por razao social, fantasia, CNPJ ou area"
            value={filtro}
            onChange={(event) => setFiltro(event.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">BUSCA</span>
        </div>
        <div className="contador">
          {empresasFiltradas.length} de {empresas.length} empresas
        </div>
      </div>

      <div className="estudantes-grid">
        {empresasFiltradas.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">EMPRESAS</div>
            <h3>Nenhuma empresa encontrada</h3>
            <p>
              {filtro
                ? 'Nenhuma empresa corresponde aos criterios de busca.'
                : 'Ainda nao ha empresas cadastradas no sistema.'}
            </p>
            {!filtro && (
              <Link to="/nova-empresa" className="btn-cadastrar">
                Cadastrar primeira empresa
              </Link>
            )}
          </div>
        ) : (
          empresasFiltradas.map((empresa) => (
            <div key={empresa.id} className="estudante-card">
              <div className="estudante-header">
                <div className="estudante-avatar">{(empresa.nomeFantasia || 'E').charAt(0).toUpperCase()}</div>
                <div className="estudante-info">
                  <h3 className="estudante-nome">{empresa.razaoSocial || 'Sem razao social'}</h3>
                  <p className="estudante-cpf">CNPJ: {empresa.cnpj || 'Nao informado'}</p>
                  <p className="estudante-email">{empresa.nomeFantasia || 'Nao informado'}</p>
                </div>
                <div className="estudante-acoes">
                  <Link to={`/editar-empresa/${empresa.id}`} className="btn-editar" title="Editar empresa">
                    ED
                  </Link>
                  <button className="btn-remover" onClick={() => setEmpresaParaRemover(empresa)} title="Remover empresa">
                    RM
                  </button>
                </div>
              </div>

              <div className="estudante-detalhes">
                <div className="detalhe-item">
                  <span className="detalhe-label">Nome fantasia:</span>
                  <span className="detalhe-valor">{empresa.nomeFantasia || 'Nao informado'}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Area de atuacao:</span>
                  <span className="detalhe-valor">{empresa.areaAtuacao || 'Nao informado'}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Porte:</span>
                  <span className="detalhe-valor">{getPorteLabel(empresa.porte)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Faturamento:</span>
                  <span className="detalhe-valor">{formatarMoeda(empresa.renda)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Contato RH:</span>
                  <span className="detalhe-valor">{empresa.numeroContatoRh || 'Nao informado'}</span>
                </div>
                {empresa.observacoes && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Observacoes:</span>
                    <span className="detalhe-valor">{empresa.observacoes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {empresaParaRemover && (
        <div className="estudantes-modal-overlay">
          <div className="estudantes-modal" role="dialog" aria-modal="true">
            <div className="estudantes-modal-header">
              <h3>Confirmar remocao</h3>
              <button className="estudantes-modal-close" onClick={() => setEmpresaParaRemover(null)}>
                X
              </button>
            </div>
            <div className="estudantes-modal-content">
              <p>
                Tem certeza que deseja remover a empresa <strong>{empresaParaRemover.razaoSocial}</strong>?
              </p>
              <p className="estudantes-modal-warning">Esta acao nao pode ser desfeita.</p>
            </div>
            <div className="estudantes-modal-actions">
              <button className="estudantes-btn-cancelar" onClick={() => setEmpresaParaRemover(null)}>
                Cancelar
              </button>
              <button className="estudantes-btn-confirmar" onClick={() => handleRemoverEmpresa(empresaParaRemover.id)}>
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaEmpresas;
