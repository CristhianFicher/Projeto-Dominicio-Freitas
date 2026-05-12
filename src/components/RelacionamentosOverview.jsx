import './RelacionamentosOverview.css';

const entidades = [
  {
    nome: 'Estudantes',
    descricao: 'Cadastro principal de alunos acompanhados pelo instituto.',
    campos: ['id (UUID)', 'nome', 'cpf', 'dataNascimento', 'email'],
  },
  {
    nome: 'Empresas',
    descricao: 'Empresas parceiras para encaminhamento e insercao profissional.',
    campos: ['id (UUID)', 'razaoSocial', 'nomeFantasia', 'cnpj', 'numeroContatoRh'],
  },
  {
    nome: 'Funcionarios',
    descricao: 'Equipe interna de apoio e acompanhamento.',
    campos: ['id (UUID)', 'nome', 'email', 'funcao', 'departamento'],
  },
  {
    nome: 'Avaliacoes',
    descricao: 'Avaliacoes por estudante e por tipo de experiencia.',
    campos: ['id (SERIAL)', 'pessoa_id (FK)', 'tipo', 'professor_responsavel', 'q01..q46'],
  },
  {
    nome: 'Relacionamentos',
    descricao: 'Vinculo entre estudante e empresa para encaminhamento e acompanhamento.',
    campos: ['id (UUID)', 'estudanteId (FK)', 'empresaId (FK)', 'tipoRelacao', 'statusRelacao'],
  },
];

const relacionamentos = [
  'Um estudante pode ter varias avaliacoes.',
  'Um estudante pode ter varios relacionamentos com empresas.',
  'Uma empresa pode receber varios estudantes em acompanhamento.',
  'Cada relacionamento referencia exatamente um estudante e uma empresa.',
];

export default function RelacionamentosOverview() {
  return (
    <section className="relacionamentos-overview">
      <header>
        <h2>Visao geral dos relacionamentos</h2>
        <p>Resumo do modelo que hoje esta implementado no backend real da aplicacao.</p>
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
