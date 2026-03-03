import './RelacionamentosOverview.css';

import { Link } from 'react-router-dom';

const entidades = [
  {
    nome: 'Usuarios',
    descricao: 'Controle de acesso (login, recuperacao e perfis).',
    campos: ['id (PK)', 'nome', 'email (unico)', 'senha_hash', 'token_recuperacao', 'validade_token', 'nivel_acesso'],
  },
  {
    nome: 'Pessoas',
    descricao: 'Cadastro base de alunos e usuarios do instituto.',
    campos: ['id (PK)', 'nome', 'data_nascimento', 'data_entrada', 'status'],
  },
  {
    nome: 'Empresas',
    descricao: 'Empresas parceiras para inclusao no mercado de trabalho.',
    campos: ['id (PK)', 'nome_fantasia', 'razao_social', 'cnpj', 'contato_rh_nome'],
  },
  {
    nome: 'Avaliacoes',
    descricao: 'Experiencias e avaliacoes por pessoa.',
    campos: ['id (PK)', 'pessoa_id (FK)', 'data_avaliacao', 'tipo'],
  },
  {
    nome: 'Fichas de Acompanhamento',
    descricao: 'Visitas e parecer tecnico por pessoa e empresa.',
    campos: ['id (PK)', 'pessoa_id (FK)', 'empresa_id (FK)', 'data_visita', 'parecer_geral'],
  },
  {
    nome: 'Encaminhamentos',
    descricao: 'Acompanhamento do processo de encaminhamento profissional.',
    campos: ['id (PK)', 'pessoa_id (FK)', 'empresa_id (FK)', 'data_admissao', 'status'],
  },
];

const relacionamentos = [
  'Uma pessoa pode ter varias avaliacoes.',
  'Uma pessoa pode ter varias fichas de acompanhamento.',
  'Uma empresa pode receber varias fichas e encaminhamentos.',
  'Uma pessoa pode participar de varios encaminhamentos.',
];

const anexosPlanejados = [
  { alvo: 'Pessoas', detalhes: 'RG, CPF, laudos e termos (chave pessoa_id)' },
  { alvo: 'Avaliacoes', detalhes: 'Evidencias e relatorios de experiencia (chave pessoa_id)' },
  { alvo: 'Fichas de Acompanhamento', detalhes: 'Relatorios de visita e parecer tecnico (pessoa_id + empresa_id)' },
  { alvo: 'Encaminhamentos', detalhes: 'Contratos, exames e comprovantes (pessoa_id + empresa_id)' },
];

export default function RelacionamentosOverview() {
  return (
    <section className="relacionamentos-overview">
      <header>
        <h2>Visao geral dos relacionamentos</h2>
        <p>Estrutura de dados de referencia para preparar o front-end para integracao com backend.</p>
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

      <div className="anexos-box">
        <div className="anexos-header">
          <div>
            <h3>Planejamento de anexos</h3>
            <p>Mapa de onde os documentos devem se conectar na integracao futura.</p>
          </div>
          <div className="anexos-actions">
            <span className="badge">pronto para backend</span>
            <Link to="/relacionamentos" className="anexos-link">
              Abrir tela de vinculos
            </Link>
          </div>
        </div>
        <div className="anexos-grid">
          {anexosPlanejados.map((anexo) => (
            <article key={anexo.alvo} className="anexo-card">
              <h4>{anexo.alvo}</h4>
              <p>{anexo.detalhes}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
