import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAvaliacao, fetchAvaliacoes } from '../redux/slices/avaliacoesSlice';
import { fetchEstudantes } from '../redux/slices/estudantesSlice';
import './avaliacao.css';

const PERGUNTAS = [
  'Atende as regras?',
  'Socializa com o grupo?',
  'Isola-se do grupo?',
  'Possui tolerancia a frustracao?',
  'Respeita colegas e professores?',
  'Faz relatos fantasiosos?',
  'Concentra-se nas atividades?',
  'Tem iniciativa?',
  'Apresenta sonolencia durante as atividades?',
  'Tem alteracoes intensas de humor?',
  'Tem oscilacao repentina de humor?',
  'Irrita-se com facilidade?',
  'Apresenta ansiedade?',
  'Escuta quando colegas falam?',
  'Escuta e segue orientacoes dos professores?',
  'Mantem-se em sala de aula?',
  'Desloca-se muito na sala?',
  'Fala de forma excessiva?',
  'E pontual?',
  'E assiduo?',
  'Demonstra desejo de trabalhar?',
  'Apropria-se de algo que nao e seu?',
  'Mantem habito de banho diario?',
  'Mantem escovacao adequada?',
  'Cuida da aparencia e limpeza do uniforme?',
  'Tem autonomia nesses habitos?',
  'Sem medicacao apresenta oscilacoes?',
  'Tem meio de conseguir receitas e medicacoes?',
  'Traz materiais organizados?',
  'Usa transporte coletivo?',
  'Tem iniciativa nas atividades propostas?',
  'Localiza-se no espaco da instituicao?',
  'Situa-se nas trocas de sala e atividades?',
  'Interage com pares?',
  'Interage em grupo?',
  'Cria conflitos e intrigas?',
  'Promove harmonia?',
  'Faz intrigas entre colegas e professores?',
  'Tem interesse em atividades extraclasses?',
  'Familia participa e apoia na instituicao?',
  'Existe superprotecao familiar na autonomia?',
  'Usuario traz relatos negativos da familia?',
  'Usuario traz relatos positivos da familia?',
  'Familia incentiva busca por autonomia?',
  'Familia incentiva insercao no mercado de trabalho?',
  'Traz documentos enviados pela instituicao assinados?',
];

const OPCOES = [
  { value: 'sim', label: 'Sim' },
  { value: 'maioria', label: 'Maioria das vezes' },
  { value: 'rara', label: 'Raramente' },
  { value: 'nao', label: 'Nao' },
];

export default function Avaliacao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { obterEstudantePorId } = useEstudantes();
  const { obterAvaliacaoPorEstudanteETipo } = useAvaliacoes();
  const estudanteId = searchParams.get('estudante');
  const tipoFromUrl = searchParams.get('tipo');

  const { items: estudantes, status: estudantesStatus } = useSelector((state) => state.estudantes);
  const { items: avaliacoes, status: avaliacoesStatus } = useSelector((state) => state.avaliacoes);

  const [tipoAvaliacao, setTipoAvaliacao] = useState(tipoFromUrl || '1');
  const [formData, setFormData] = useState({});
  const [observacoes, setObservacoes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isReadOnly] = useState(!!avaliacaoExistente);
  const perguntas = [
    "Atende as regras?",
    "Socializa com o grupo?",
    "Isola-se do grupo?",
    "Possui tolerância a frustração?",
    "Respeita colega e professores?",
    "Faz relatos fantasiosos?",
    "Concentra-se nas atividades?",
    "Tem iniciativa?",
    "Sonolência durante as atividades em sala de aula?",
    "Alterações intensas de humor?",
    "Indica oscilação repentina de humor?",
    "Irrita-se com facilidade?",
    "Ansiedade?",
    "Escuta quando seus colegas falam?",
    "Escuta e segue orientação dos professores?",
    "Mantém-se em sala de aula?",
    "Desloca-se muito na sala?",
    "Fala demasiadamente?",
    "É pontual?",
    "É assíduo?",
    "Demonstra desejo de trabalhar?",
    "Apropria-se indevidamente daquilo que não é seu?",
    "Indica hábito de banho diário?",
    "Indica hábito de escovação e qualidade na escovação?",
    "Indica cuidado com a aparência e limpeza do uniforme?",
    "Indica autonomia quanto a estes hábitos?",
    "Indica falta do uso de medicação com oscilações de comportamento?",
    "Tem meio articulado de conseguir receitas e aquisições das medicações?",
    "Traz seus materiais organizados?",
    "Usa transporte coletivo?",
    "Tem iniciativa diante das atividades propostas?",
    "Localiza-se no espaço da Instituição?",
    "Situa-se nas trocas de sala e atividades?",
    "Interage par a par?",
    "Interage em grupo?",
    "Cria conflitos e intrigas?",
    "Promove a harmonia?",
    "Faz intrigas entre colegas x professores?",
    "Demonstra interesse em participar das atividades extraclasses?",
    "Existe interação/participação da família em apoio ao usuário na Instituição?",
    "Existe superproteção por parte da família quanto a autonomia do usuário?",
    "Usuário traz relatos negativos da família (de forma geral)?",
    "Usuário traz relatos positivos da família (de forma geral)?",
    "Existe incentivo quanto a busca de autonomia para o usuário por parte da família?",
    "Existe incentivo quanto a inserção do usuário no mercado de trabalho por parte da família?",
    "Traz os documentos enviados pela Instituição assinado?",
  ];
  const handleInputChange = (perguntaIndex, value) => {
    setFormData(prev => ({
      ...prev,
      [`pergunta_${perguntaIndex}`]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!estudanteId || !respostasCompletas) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await dispatch(
        addAvaliacao({
          estudanteId: String(estudanteId),
          tipoAvaliacao: Number(tipoAvaliacao),
          dataAvaliacao: new Date().toISOString().split('T')[0],
          respostas: formData,
          observacoes,
        })
      ).unwrap();

      setSubmitStatus('success');
      setTimeout(() => {
        window.location.href = '/avaliacoes';
      }, 2000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!estudanteId) {
    return (
      <div className="avaliacao-body">
        <div className="avaliacao-container">
          <h2 className="avaliacao-title">Avaliacao</h2>
          <p>Estudante nao informado.</p>
          <Link to="/avaliacoes" className="avaliacao-button">Voltar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="avaliacao-body">
      <Link to="/avaliacoes" className="avaliacao-back">Voltar para avaliacoes</Link>
      <div className="avaliacao-container">
        <h2 className="avaliacao-title">
          {isReadOnly ? 'Visualizar avaliacao' : 'Avaliacao'} {tipoAvaliacao}a experiencia
          {estudante ? ` - ${estudante.nome}` : ''}
        </h2>

        <form className="avaliacao-form" onSubmit={handleSubmit}>
          <div className="avaliacao-label">
            <span>Tipo de avaliacao</span>
            <div className="tipo-botoes" role="radiogroup" aria-label="Tipo de avaliacao">
              {[1, 2].map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  className={`tipo-botao ${String(tipoAvaliacao) === String(tipo) ? 'active' : ''}`}
                  onClick={() => setTipoAvaliacao(String(tipo))}
                  disabled={Boolean(tipoFromUrl) || isReadOnly}
                >
                  Avaliacao {tipo}
                </button>
              ))}
            </div>
          </div>

          {PERGUNTAS.map((pergunta, index) => {
            const key = `pergunta_${index}`;
            const selected = formData[key] || '';

            return (
              <fieldset key={key} className="avaliacao-question" disabled={isReadOnly}>
                <legend>{index + 1} - {pergunta}</legend>
                <div className="avaliacao-options">
                  {OPCOES.map((opcao) => (
                    <label
                      key={opcao.value}
                      className={`option-pill ${selected === opcao.value ? 'selected' : ''} ${isReadOnly ? 'readonly' : ''}`}
                    >
                      <input
                        type="radio"
                        name={key}
                        value={opcao.value}
                        checked={selected === opcao.value}
                        onChange={() => handleOptionChange(index, opcao.value)}
                        required={!isReadOnly}
                      />
                      <span>{opcao.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}

          <label className="avaliacao-label">
            Observacoes
            <textarea
              className="avaliacao-input"
              rows="4"
              value={observacoes}
              onChange={(event) => setObservacoes(event.target.value)}
              disabled={isReadOnly}
            />
          </label>

          {submitStatus === 'success' && <div className="submit-status success">Avaliacao salva com sucesso.</div>}
          {submitStatus === 'error' && <div className="submit-status error">Preencha todas as respostas antes de salvar.</div>}

          {!isReadOnly && (
            <button type="submit" className={`avaliacao-button ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting || !respostasCompletas}>
              {isSubmitting ? 'Salvando...' : 'Salvar avaliacao'}
            </button>
          )}

          {isReadOnly && (
            <div className="avaliacao-actions">
              <Link to="/avaliacoes" className="avaliacao-button">Voltar para avaliacoes</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
