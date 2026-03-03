import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFuncionarios, deleteFuncionario } from '../redux/slices/funcionariosSlice';
import './ListaEstudantes.css';

const ListaFuncionarios = () => {
  const dispatch = useDispatch();
  const { items: funcionarios, status } = useSelector((state) => state.funcionarios);

  const [filtro, setFiltro] = useState('');
  const [funcionarioParaRemover, setFuncionarioParaRemover] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFuncionarios());
    }
  }, [status, dispatch]);

  const funcionariosFiltrados = funcionarios.filter((funcionario) =>
    (funcionario.nome || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (funcionario.cpf || '').includes(filtro) ||
    (funcionario.email || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (funcionario.funcao || '').toLowerCase().includes(filtro.toLowerCase())
  );

  const handleRemoverFuncionario = (id) => {
    dispatch(deleteFuncionario(id));
    setFuncionarioParaRemover(null);
  };

  const formatarData = (data) => {
    if (!data) return 'Nao informado';
    const parsed = new Date(data);
    return Number.isNaN(parsed.getTime()) ? 'Nao informado' : parsed.toLocaleDateString('pt-BR');
  };

  const formatarMoeda = (valor) => {
    if (valor == null || Number.isNaN(Number(valor))) return 'Nao informado';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));
  };

  const getDepartamentoLabel = (departamento) => {
    const departamentos = {
      ti: 'Tecnologia da informacao',
      rh: 'Recursos humanos',
      financeiro: 'Financeiro',
      comercial: 'Comercial',
      operacoes: 'Operacoes',
      administrativo: 'Administrativo',
      inclusao: 'Inclusao e acessibilidade',
    };

    return departamentos[departamento] || 'Nao informado';
  };

  const getEscolaridadeLabel = (nivel) => {
    const niveis = {
      fundamental: 'Ensino fundamental',
      medio: 'Ensino medio',
      'superior-incompleto': 'Superior incompleto',
      'superior-completo': 'Superior completo',
      'pos-graduacao': 'Pos-graduacao',
      mestrado: 'Mestrado',
      doutorado: 'Doutorado',
    };

    return niveis[nivel] || 'Nao informado';
  };

  return (
    <div className="lista-estudantes">
      <div className="lista-header">
        <div className="header-content">
          <h1>Lista de funcionarios</h1>
          <p>Gerencie os funcionarios cadastrados no sistema</p>
        </div>
        <Link to="/novo-funcionario" className="btn-novo-estudante">
          <span className="btn-icon">+</span>
          Novo funcionario
        </Link>
      </div>

      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por nome, CPF, email ou funcao"
            value={filtro}
            onChange={(event) => setFiltro(event.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">BUSCA</span>
        </div>
        <div className="contador">
          {funcionariosFiltrados.length} de {funcionarios.length} funcionarios
        </div>
      </div>

      <div className="estudantes-grid">
        {funcionariosFiltrados.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">FUNCIONARIOS</div>
            <h3>Nenhum funcionario encontrado</h3>
            <p>
              {filtro
                ? 'Nenhum funcionario corresponde aos criterios de busca.'
                : 'Ainda nao ha funcionarios cadastrados no sistema.'}
            </p>
            {!filtro && (
              <Link to="/novo-funcionario" className="btn-cadastrar">
                Cadastrar primeiro funcionario
              </Link>
            )}
          </div>
        ) : (
          funcionariosFiltrados.map((funcionario) => (
            <div key={funcionario.id} className="estudante-card">
              <div className="estudante-header">
                <div className="estudante-avatar">{(funcionario.nome || 'F').charAt(0).toUpperCase()}</div>
                <div className="estudante-info">
                  <h3 className="estudante-nome">{funcionario.nome || 'Sem nome'}</h3>
                  <p className="estudante-cpf">CPF: {funcionario.cpf || 'Nao informado'}</p>
                  <p className="estudante-email">{funcionario.email || 'Nao informado'}</p>
                </div>
                <div className="estudante-acoes">
                  <Link to={`/editar-funcionario/${funcionario.id}`} className="btn-editar" title="Editar funcionario">
                    ED
                  </Link>
                  <button className="btn-remover" onClick={() => setFuncionarioParaRemover(funcionario)} title="Remover funcionario">
                    RM
                  </button>
                </div>
              </div>

              <div className="estudante-detalhes">
                <div className="detalhe-item">
                  <span className="detalhe-label">Funcao:</span>
                  <span className="detalhe-valor">{funcionario.funcao || 'Nao informado'}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Departamento:</span>
                  <span className="detalhe-valor">{getDepartamentoLabel(funcionario.departamento)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Data de admissao:</span>
                  <span className="detalhe-valor">{formatarData(funcionario.dataAdmissao)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Escolaridade:</span>
                  <span className="detalhe-valor">{getEscolaridadeLabel(funcionario.nivelEscolaridade)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Salario:</span>
                  <span className="detalhe-valor">{formatarMoeda(funcionario.salario)}</span>
                </div>
                {funcionario.experiencia && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Experiencia:</span>
                    <span className="detalhe-valor">{funcionario.experiencia}</span>
                  </div>
                )}
                {funcionario.observacoes && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Observacoes:</span>
                    <span className="detalhe-valor">{funcionario.observacoes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {funcionarioParaRemover && (
        <div className="estudantes-modal-overlay">
          <div className="estudantes-modal" role="dialog" aria-modal="true">
            <div className="estudantes-modal-header">
              <h3>Confirmar remocao</h3>
              <button className="estudantes-modal-close" onClick={() => setFuncionarioParaRemover(null)}>
                X
              </button>
            </div>
            <div className="estudantes-modal-content">
              <p>
                Tem certeza que deseja remover o funcionario <strong>{funcionarioParaRemover.nome}</strong>?
              </p>
              <p className="estudantes-modal-warning">Esta acao nao pode ser desfeita.</p>
            </div>
            <div className="estudantes-modal-actions">
              <button className="estudantes-btn-cancelar" onClick={() => setFuncionarioParaRemover(null)}>
                Cancelar
              </button>
              <button className="estudantes-btn-confirmar" onClick={() => handleRemoverFuncionario(funcionarioParaRemover.id)}>
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaFuncionarios;
