import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstudantes, deleteEstudante } from '../redux/slices/estudantesSlice';
import './ListaEstudantes.css';

const ListaEstudantes = () => {
  const dispatch = useDispatch();
  const { items: estudantes, status } = useSelector((state) => state.estudantes);

  const [filtro, setFiltro] = useState('');
  const [estudanteParaRemover, setEstudanteParaRemover] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEstudantes());
    }
  }, [status, dispatch]);

  const estudantesFiltrados = estudantes.filter((estudante) =>
    (estudante.nome || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (estudante.cpf || '').includes(filtro) ||
    (estudante.email || '').toLowerCase().includes(filtro.toLowerCase())
  );

  const handleRemoverEstudante = (id) => {
    dispatch(deleteEstudante(id));
    setEstudanteParaRemover(null);
  };

  const formatarData = (data) => {
    if (!data) return 'Nao informado';
    const parsed = new Date(data);
    return Number.isNaN(parsed.getTime()) ? 'Nao informado' : parsed.toLocaleDateString('pt-BR');
  };

  const getGrauAutismoLabel = (grau) => {
    const graus = {
      leve: 'Leve (Nivel 1)',
      moderado: 'Moderado (Nivel 2)',
      severa: 'Severo (Nivel 3)',
    };

    return graus[grau] || 'Nao informado';
  };

  return (
    <div className="lista-estudantes">
      <div className="lista-header">
        <div className="header-content">
          <h1>Lista de estudantes</h1>
          <p>Gerencie os estudantes cadastrados no sistema</p>
        </div>
        <Link to="/novo-estudante" className="btn-novo-estudante">
          <span className="btn-icon">+</span>
          Novo estudante
        </Link>
      </div>

      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou email"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">BUSCA</span>
        </div>
        <div className="contador">
          {estudantesFiltrados.length} de {estudantes.length} estudantes
        </div>
      </div>

      <div className="estudantes-grid">
        {estudantesFiltrados.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">LISTA</div>
            <h3>Nenhum estudante encontrado</h3>
            <p>
              {filtro
                ? 'Nenhum estudante corresponde aos criterios de busca.'
                : 'Ainda nao ha estudantes cadastrados no sistema.'}
            </p>
            {!filtro && (
              <Link to="/novo-estudante" className="btn-cadastrar">
                Cadastrar primeiro estudante
              </Link>
            )}
          </div>
        ) : (
          estudantesFiltrados.map((estudante) => (
            <div key={estudante.id} className="estudante-card">
              <div className="estudante-header">
                <div className="estudante-avatar">{(estudante.nome || 'U').charAt(0).toUpperCase()}</div>
                <div className="estudante-info">
                  <h3 className="estudante-nome">{estudante.nome || 'Sem nome'}</h3>
                  <p className="estudante-cpf">CPF: {estudante.cpf || 'Nao informado'}</p>
                  <p className="estudante-email">{estudante.email || 'Nao informado'}</p>
                </div>
                <div className="estudante-acoes">
                  <Link to={`/avaliacao?estudante=${estudante.id}`} className="btn-avaliacao" title="Avaliar desempenho">
                    AV
                  </Link>
                  <Link to={`/editar-estudante/${estudante.id}`} className="btn-editar" title="Editar estudante">
                    ED
                  </Link>
                  <button className="btn-remover" onClick={() => setEstudanteParaRemover(estudante)} title="Remover estudante">
                    RM
                  </button>
                </div>
              </div>

              <div className="estudante-detalhes">
                <div className="detalhe-item">
                  <span className="detalhe-label">Data de nascimento:</span>
                  <span className="detalhe-valor">{formatarData(estudante.dataNascimento)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Grau do autismo:</span>
                  <span className="detalhe-valor">{getGrauAutismoLabel(estudante.grauAutismo)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Responsavel:</span>
                  <span className="detalhe-valor">{estudante.nomeResponsavel || 'Nao informado'}</span>
                </div>
                {estudante.interesses && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Interesses:</span>
                    <span className="detalhe-valor">{estudante.interesses}</span>
                  </div>
                )}
                {estudante.habilidades && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Habilidades:</span>
                    <span className="detalhe-valor">{estudante.habilidades}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {estudanteParaRemover && (
        <div className="estudantes-modal-overlay">
          <div className="estudantes-modal" role="dialog" aria-modal="true">
            <div className="estudantes-modal-header">
              <h3>Confirmar remocao</h3>
              <button className="estudantes-modal-close" onClick={() => setEstudanteParaRemover(null)}>
                X
              </button>
            </div>
            <div className="estudantes-modal-content">
              <p>
                Tem certeza que deseja remover o estudante <strong>{estudanteParaRemover.nome}</strong>?
              </p>
              <p className="estudantes-modal-warning">Esta acao nao pode ser desfeita.</p>
            </div>
            <div className="estudantes-modal-actions">
              <button className="estudantes-btn-cancelar" onClick={() => setEstudanteParaRemover(null)}>
                Cancelar
              </button>
              <button className="estudantes-btn-confirmar" onClick={() => handleRemoverEstudante(estudanteParaRemover.id)}>
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaEstudantes;
