import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const shortcuts = [
    {
      title: 'Dashboard Inteligente',
      description: 'Acompanhe métricas, encaminhamentos e evolução em uma aba dedicada.',
      to: '/dashboard',
      tag: 'Novo',
    },
    {
      title: 'Gestão de Estudantes',
      description: 'Cadastre, edite e acompanhe estudantes em poucos cliques.',
      to: '/cadastroAlunos',
      tag: 'Operação',
    },
    {
      title: 'Rede de Empresas',
      description: 'Fortaleça parcerias e acompanhe oportunidades de inclusão.',
      to: '/empresas',
      tag: 'Parcerias',
    },
  ];

  return (
    <section className="home-page">
      <div className="home-hero">
        <p className="home-badge">Plataforma Diomício Freitas</p>
        <h1>Central de gestão e inclusão profissional</h1>
        <p>
          Organize estudantes, empresas, encaminhamentos e avaliações com mais clareza.
          Agora o dashboard fica em uma aba exclusiva para análise completa.
        </p>
        <div className="home-hero-actions">
          <Link to="/dashboard" className="home-btn primary">Abrir dashboard</Link>
          <Link to="/relacionamentos" className="home-btn secondary">Criar relacionamento</Link>
        </div>
      </div>

      <div className="home-shortcuts">
        {shortcuts.map((item) => (
          <Link key={item.title} to={item.to} className="shortcut-card">
            <span>{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
