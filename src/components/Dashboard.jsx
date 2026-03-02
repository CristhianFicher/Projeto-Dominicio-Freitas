import { Link } from 'react-router-dom';
import './Dashboard.css';
import RelacionamentosOverview from './RelacionamentosOverview';
const Dashboard = () => {
  const stats = [
    {
      title: 'Estudantes Cadastrados',
      value: '247',
      change: '+15%',
      changeType: 'positive',
      icon: '🎓',
      color: 'blue',
      description: 'Pessoas autistas em busca de educação'
    },
    {
      title: 'Empresas Inclusivas',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: '🏢',
      color: 'green',
      description: 'Empresas comprometidas com inclusão'
    },
    {
      title: 'Oportunidades de Trabalho',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: '💼',
      color: 'purple',
      description: 'Vagas adaptadas para autistas'
    },
    {
      title: 'Avaliações Realizadas',
      value: '423',
      change: '+25%',
      changeType: 'positive',
      icon: '📊',
      color: 'orange',
      description: 'Avaliações de habilidades e interesses'
    }
  ];
  const quickActions = [
    {
      title: 'Cadastrar Estudante',
      description: 'Registrar novo estudante autista no sistema',
      icon: '🎓',
      link: '/novo-estudante',
      color: 'blue'
    },
    {
      title: 'Cadastrar Empresa',
      description: 'Registrar empresa inclusiva parceira',
      icon: '🏢',
      link: '/nova-empresa',
      color: 'green'
    },
    {
      title: 'Cadastrar Funcionário',
      description: 'Registrar funcionário de apoio',
      icon: '👨‍💼',
      link: '/novo-funcionario',
      color: 'purple'
    },
    {
      title: 'Avaliar Habilidades',
      description: 'Realizar avaliação de habilidades e interesses',
      icon: '📊',
      link: '/avaliacoes',
      color: 'orange'
    }
  ];
  const recentActivities = [
    {
      action: 'Novo estudante cadastrado',
      user: 'João Silva',
      time: '2 horas atrás',
      type: 'success',
      icon: '✅'
    },
    {
      action: 'Empresa inclusiva adicionada',
      user: 'TechCorp Ltda',
      time: '4 horas atrás',
      type: 'info',
      icon: 'ℹ️'
    },
    {
      action: 'Avaliação de habilidades concluída',
      user: 'Maria Santos',
      time: '6 horas atrás',
      type: 'success',
      icon: '✅'
    },
    {
      action: 'Nova oportunidade de trabalho',
      user: 'Empresa ABC',
      time: '1 dia atrás',
      type: 'warning',
      icon: '⚠️'
    }
  ];
  const resources = [
    {
      title: 'Guia de Estudos',
      description: 'Estratégias de aprendizado adaptadas',
      icon: '📚',
      link: '#'
    },
    {
      title: 'Preparação para Entrevistas',
      description: 'Dicas para entrevistas de trabalho',
      icon: '💬',
      link: '#'
    },
    {
      title: 'Desenvolvimento de Habilidades',
      description: 'Programas de capacitação profissional',
      icon: '🚀',
      link: '#'
    },
    {
      title: 'Suporte Psicológico',
      description: 'Acompanhamento especializado',
      icon: '🤝',
      link: '#'
    }
  ];
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Instituto de Educação Especial Diomício Freitas</h1>
        <p>Conectando pessoas autistas com oportunidades de educação e trabalho</p>
      </div>
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-description">{stat.description}</div>
              <div className={`stat-change ${stat.changeType}`}>
                <span className="change-icon">
                  {stat.changeType === 'positive' ? '↗' : '↘'}
                </span>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      <RelacionamentosOverview />
      <div className="dashboard-content">
        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>🚀 Ações Rápidas</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`quick-action-card ${action.color}`}
              >
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
        {/* Resources */}
        <div className="dashboard-section">
          <h2>📚 Recursos de Apoio</h2>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-icon">{resource.icon}</div>
                <div className="resource-content">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
                <button className="resource-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Activities */}
        <div className="dashboard-section">
          <h2>📈 Atividades Recentes</h2>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">{activity.icon}</div>
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
