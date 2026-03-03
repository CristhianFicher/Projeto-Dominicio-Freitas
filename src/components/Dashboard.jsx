import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstudantes } from '../redux/slices/estudantesSlice';
import { fetchEmpresas } from '../redux/slices/empresasSlice';
import { fetchFuncionarios } from '../redux/slices/funcionariosSlice';
import { fetchAvaliacoes } from '../redux/slices/avaliacoesSlice';
import RelacionamentosOverview from './RelacionamentosOverview';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { items: estudantes, status: estudantesStatus } = useSelector((state) => state.estudantes);
  const { items: empresas, status: empresasStatus } = useSelector((state) => state.empresas);
  const { items: funcionarios, status: funcionariosStatus } = useSelector((state) => state.funcionarios);
  const { items: avaliacoes, status: avaliacoesStatus } = useSelector((state) => state.avaliacoes);

  useEffect(() => {
    if (estudantesStatus === 'idle') dispatch(fetchEstudantes());
    if (empresasStatus === 'idle') dispatch(fetchEmpresas());
    if (funcionariosStatus === 'idle') dispatch(fetchFuncionarios());
    if (avaliacoesStatus === 'idle') dispatch(fetchAvaliacoes());
  }, [dispatch, estudantesStatus, empresasStatus, funcionariosStatus, avaliacoesStatus]);

  const stats = [
    {
      title: 'Estudantes cadastrados',
      value: estudantes.length,
      icon: 'ES',
      color: 'blue',
      description: 'Registros em estudantes (db.json)',
    },
    {
      title: 'Empresas inclusivas',
      value: empresas.length,
      icon: 'EM',
      color: 'green',
      description: 'Registros em empresas (db.json)',
    },
    {
      title: 'Funcionarios de apoio',
      value: funcionarios.length,
      icon: 'FN',
      color: 'purple',
      description: 'Registros em funcionarios (db.json)',
    },
    {
      title: 'Avaliacoes realizadas',
      value: avaliacoes.length,
      icon: 'AV',
      color: 'orange',
      description: 'Registros em avaliacoes (db.json)',
    },
  ];

  const quickActions = [
    { title: 'Cadastrar estudante', description: 'Registrar novo estudante no sistema', icon: 'ES', link: '/novo-estudante', color: 'blue' },
    { title: 'Cadastrar empresa', description: 'Registrar nova empresa parceira', icon: 'EM', link: '/nova-empresa', color: 'green' },
    { title: 'Cadastrar funcionario', description: 'Registrar colaborador de apoio', icon: 'FN', link: '/novo-funcionario', color: 'purple' },
    { title: 'Nova avaliacao', description: 'Iniciar uma avaliacao de desempenho', icon: 'AV', link: '/avaliacoes', color: 'orange' },
    { title: 'Relacionar estudante e empresa', description: 'Criar vinculos de encaminhamento', icon: 'RL', link: '/relacionamentos', color: 'teal' },
  ];

  const recentActivities = [
    { action: 'Estudante cadastrado', user: 'Cadastro ativo', time: 'agora', type: 'success' },
    { action: 'Empresa atualizada', user: 'Cadastro ativo', time: 'agora', type: 'info' },
    { action: 'Avaliacao registrada', user: 'Fluxo em uso', time: 'agora', type: 'success' },
  ];

  const resources = [
    { title: 'Guia de estudos', description: 'Metodos de ensino adaptados' },
    { title: 'Roteiro de entrevista', description: 'Boas praticas para selecao' },
    { title: 'Plano de habilidades', description: 'Evolucao tecnica e comportamental' },
    { title: 'Suporte familiar', description: 'Orientacoes de acompanhamento' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Instituto de Educacao Especial Diomicio Freitas</h1>
        <p>Conectando pessoas autistas com oportunidades de educacao e trabalho</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.title} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>

      <RelacionamentosOverview />

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Acoes rapidas</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.link} className={`quick-action-card ${action.color}`}>
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
                <div className="action-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recursos de apoio</h2>
          <div className="resources-grid">
            {resources.map((resource) => (
              <div key={resource.title} className="resource-card">
                <div className="resource-content">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Atividades recentes</h2>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={`${activity.action}-${activity.type}`} className={`activity-item ${activity.type}`}>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-user">{activity.user}</div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
