import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOverview = async () => {
      try {
        setLoading(true);
        const response = await api.get('/dashboard');
        setOverview(response.data);
      } catch {
        setError('Não foi possível carregar o dashboard agora.');
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

    const statCards = useMemo(() => ([
    { title: 'Estudantes', value: overview?.resumo?.estudantes || 0, color: 'blue', hint: 'Pessoas acompanhadas' },
    { title: 'Empresas', value: overview?.resumo?.empresas || 0, color: 'green', hint: 'Parceiras ativas' },
    { title: 'Avaliações', value: overview?.resumo?.avaliacoes || 0, color: 'orange', hint: 'Registros aplicados' },
    { title: 'Fichas', value: overview?.resumo?.fichasAcompanhamento || 0, color: 'purple', hint: 'Acompanhamentos ativos' },
    { title: 'Enc. Ativos', value: overview?.resumo?.encaminhamentosAtivos || 0, color: 'teal', hint: 'Em andamento' },
    { title: 'Enc. Desligados', value: overview?.resumo?.encaminhamentosDesligados || 0, color: 'red', hint: 'Ciclos encerrados' },
  ]), [overview]);

  const quickActions = [
    { title: 'Nova ficha', link: '/relacionamentos', icon: 'FC' },
    { title: 'Novo encaminhamento', link: '/relacionamentos', icon: 'EN' },
    { title: 'Nova avaliação', link: '/avaliacoes', icon: 'AV' },
    { title: 'Empresas', link: '/empresas', icon: 'EM' },
  ];

  return (
    <div className="dashboard-v2">
      <div className="dashboard-v2-header">
        <div>
          <p className="dashboard-v2-tag">Aba exclusiva de gestão</p>
          <h1>Dashboard de acompanhamento</h1>
          <p className="dashboard-v2-subtitle">
            Visão completa de estudantes, empresas, fichas e encaminhamentos em um só lugar.
          </p>
        </div>
        <Link to="/relacionamentos" className="dashboard-v2-cta">Criar encaminhamento</Link>
      </div>

      {loading && <div className="dashboard-v2-feedback">Carregando dados do painel...</div>}
      {error && !loading && <div className="dashboard-v2-feedback error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="dashboard-v2-stats">
            {statCards.map((stat) => (
              <article key={stat.title} className={`dash-card ${stat.color}`}>
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <small>{stat.hint}</small>
              </article>
            ))}
          </div>

          <div className="dashboard-v2-grid">
            <section className="dash-panel">
              <header>
                <h2>Encaminhamentos recentes</h2>
              </header>
              <div className="timeline-list">
                {(overview?.encaminhamentosRecentes || []).map((item) => (
                  <div key={item.id} className="timeline-item">
                    <p>Empresa: {item.empresaId}</p>
                    <span>Status: {item.status}</span>
                  </div>
                ))}
                {!overview?.encaminhamentosRecentes?.length && <p>Nenhum encaminhamento recente.</p>}
              </div>
            </section>

            <section className="dash-panel">
              <header>
                <h2>Fichas recentes</h2>
              </header>
              <div className="timeline-list">
                {(overview?.fichasRecentes || []).map((item) => (
                  <div key={item.id} className="timeline-item">
                    <p>{item.descricao}</p>
                    <span>Status: {item.status}</span>
                  </div>
                ))}
                {!overview?.fichasRecentes?.length && <p>Nenhuma ficha recente.</p>}
              </div>
            </section>
          </div>

          <section className="dash-panel actions">
            <header>
              <h2>Ações rápidas</h2>
            </header>
            <div className="quick-grid">
              {quickActions.map((action) => (
                <Link to={action.link} key={action.title} className="quick-card">
                  <span>{action.icon}</span>
                  <div>
                    <h3>{action.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;

