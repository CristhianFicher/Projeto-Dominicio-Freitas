import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvaliacoes } from '../redux/slices/avaliacoesSlice';
import { fetchEstudantes } from '../redux/slices/estudantesSlice';
import './ListaAvaliacoes.css';

const ListaAvaliacoes = () => {
  const dispatch = useDispatch();
  const { items: estudantes, status: estudantesStatus } = useSelector((state) => state.estudantes);
  const { items: avaliacoes, status: avaliacoesStatus } = useSelector((state) => state.avaliacoes);

  const navigate = useNavigate();
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    if (estudantesStatus === 'idle') dispatch(fetchEstudantes());
    if (avaliacoesStatus === 'idle') dispatch(fetchAvaliacoes());
  }, [dispatch, estudantesStatus, avaliacoesStatus]);

  const estudantesFiltrados = estudantes.filter((estudante) =>
    (estudante.nome || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (estudante.cpf || '').includes(filtro) ||
    (estudante.email || '').toLowerCase().includes(filtro.toLowerCase())
  );

  const getAvaliacao = (estudanteId, tipoAvaliacao) =>
    avaliacoes.find(
      (item) =>
        String(item.estudanteId) === String(estudanteId) &&
        String(item.tipoAvaliacao) === String(tipoAvaliacao)
    );

  const handleAvaliarClick = (estudante, tipoAvaliacao) => {
    navigate(`/avaliacao?estudante=${estudante.id}&tipo=${tipoAvaliacao}`);
  };

  const formatarData = (data) => {
    if (!data) return 'Sem data';
    const parsed = new Date(data);
    return Number.isNaN(parsed.getTime()) ? 'Sem data' : parsed.toLocaleDateString('pt-BR');
  };

  return (
    <div className="lista-avaliacoes">
      <div className="avaliacoes-header">
        <div className="header-content">
          <h1>Avaliacoes de desempenho</h1>
          <p>Acompanhe e gerencie as avaliacoes dos estudantes</p>
        </div>
      </div>

      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou email"
            value={filtro}
            onChange={(event) => setFiltro(event.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">BUSCA</span>
        </div>
        <div className="contador">
          {estudantesFiltrados.length} de {estudantes.length} estudantes
        </div>
      </div>

      <div className="avaliacoes-grid">
        {estudantesFiltrados.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">LISTA</div>
            <h3>Nenhum estudante encontrado</h3>
            <p>
              {filtro
                ? 'Nenhum estudante corresponde aos criterios de busca.'
                : 'Ainda nao ha estudantes cadastrados no sistema.'}
            </p>
          </div>
        ) : (
          estudantesFiltrados.map((estudante) => {
            const avaliacao1 = getAvaliacao(estudante.id, 1);
            const avaliacao2 = getAvaliacao(estudante.id, 2);

            return (
              <div key={estudante.id} className="estudante-card">
                <div className="estudante-header">
                  <div className="estudante-avatar">{(estudante.nome || 'U').charAt(0).toUpperCase()}</div>
                  <div className="estudante-info">
                    <h3 className="estudante-nome">{estudante.nome || 'Sem nome'}</h3>
                    <p className="estudante-cpf">CPF: {estudante.cpf || 'Nao informado'}</p>
                    <p className="estudante-email">{estudante.email || 'Nao informado'}</p>
                  </div>
                </div>

                <div className="avaliacoes-section">
                  <h4>Avaliacoes</h4>
                  <div className="avaliacoes-lista">
                    <div className="avaliacao-item">
                      <div className="avaliacao-info">
                        <span className="avaliacao-tipo">Avaliacao 1a experiencia</span>
                        <span className="avaliacao-data">{formatarData(avaliacao1?.dataAvaliacao)}</span>
                      </div>
                      <div className="avaliacao-actions">
                        <span className={`status-badge ${avaliacao1 ? 'concluida' : 'pendente'}`}>
                          {avaliacao1 ? 'Concluida' : 'Pendente'}
                        </span>
                        <button className={`btn-avaliar ${avaliacao1 ? 'concluida' : 'pendente'}`} onClick={() => handleAvaliarClick(estudante, 1)}>
                          {avaliacao1 ? 'Ver' : 'Avaliar'}
                        </button>
                      </div>
                    </div>

                    <div className="avaliacao-item">
                      <div className="avaliacao-info">
                        <span className="avaliacao-tipo">Avaliacao 2a experiencia</span>
                        <span className="avaliacao-data">{formatarData(avaliacao2?.dataAvaliacao)}</span>
                      </div>
                      <div className="avaliacao-actions">
                        <span className={`status-badge ${avaliacao2 ? 'concluida' : 'pendente'}`}>
                          {avaliacao2 ? 'Concluida' : 'Pendente'}
                        </span>
                        <button className={`btn-avaliar ${avaliacao2 ? 'concluida' : 'pendente'}`} onClick={() => handleAvaliarClick(estudante, 2)}>
                          {avaliacao2 ? 'Ver' : 'Avaliar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default ListaAvaliacoes;
