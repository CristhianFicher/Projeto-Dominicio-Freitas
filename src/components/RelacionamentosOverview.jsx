import './RelacionamentosOverview.css';

const entidades = [
  {
    nome: 'Usuários',
    descricao: 'Controle de acesso (login, recuperação e perfis).',
    campos: ['id (PK)', 'nome', 'email (único)', 'senha_hash', 'token_recuperacao', 'validade_token', 'nivel_acesso'],
  },
  {
    nome: 'Pessoas',
    descricao: 'Cadastro base de alunos/usuários do instituto.',
    campos: ['id (PK)', 'nome', 'data_nascimento', 'data_entrada', 'status'],
  },
  {
    nome: 'Empresas',
    descricao: 'Empresas parceiras para inclusão no mercado de trabalho.',
    campos: ['id (PK)', 'nome_fantasia', 'razao_social', 'cnpj', 'contato_rh_nome'],
  },
  {
    nome: 'Avaliações',
    descricao: 'Experiências e avaliações por pessoa.',
    campos: ['id (PK)', 'pessoa_id (FK)', 'data_avaliacao', 'tipo'],
  },
  {
    nome: 'Fichas de Acompanhamento',
    descricao: 'Visitas e parecer técnico por pessoa/empresa.',
    campos: ['id (PK)', 'pessoa_id (FK)', 'empresa_id (FK)', 'data_visita', 'parecer_geral'],
  },
  {
    nome: 'Encaminhamentos',
    descricao: 'Acompanhamento do processo de encaminhamento profissional.',
    campos: ['id (PK)', 'pessoa_id (FK)', 'empresa_id (FK)', 'data_admissao', 'status'],
  },
];

const relacionamentos = [
  'Uma Pessoa pode ter várias Avaliações.',
  'Uma Pessoa pode ter várias Fichas de Acompanhamento.',
  'Uma Empresa pode receber várias Fichas e Encaminhamentos.',
  'Uma Pessoa pode participar de vários Encaminhamentos.',
];

export default function RelacionamentosOverview() {
  return (
    <section className="relacionamentos-overview">
      <header>
        <h2>🧩 Visão geral dos relacionamentos</h2>
        <p>Estrutura de dados referência para preparar o front-end para integração com backend.</p>
      </header>

      <div className="entidades-grid">
        {entidades.map((entidade) => (
          <article key={entidade.nome} className="entidade-card">
            <h3>{entidade.nome}</h3>
            <p>{entidade.descricao}</p>
            <ul>
              {entidade.campos.map((campo) => (
                <li key={campo}>{campo}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="relacoes-box">
        <h3>Relacionamentos principais</h3>
        <ul>
          {relacionamentos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
