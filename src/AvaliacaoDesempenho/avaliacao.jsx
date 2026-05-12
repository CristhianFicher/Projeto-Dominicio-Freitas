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
  { value: 'Sim', label: 'Sim' },
  { value: 'Maioria', label: 'Maioria' },
  { value: 'Raramente', label: 'Raramente' },
  { value: 'Nao', label: 'Nao' },
];

function getTipoApi(tipoTela) {
  return String(tipoTela) === '2' ? 'acompanhamento' : 'inicial';
}

function buildEmptyAnswers() {
  return Object.fromEntries(
    PERGUNTAS.map((_, index) => [`q${String(index + 1).padStart(2, '0')}`, '']),
  );
}

export default function Avaliacao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estudanteId = searchParams.get('estudante');
  const tipoFromUrl = searchParams.get('tipo');

  const { items: estudantes, status: estudantesStatus } = useSelector((state) => state.estudantes);
  const { items: avaliacoes, status: avaliacoesStatus } = useSelector((state) => state.avaliacoes);

  const [tipoAvaliacao, setTipoAvaliacao] = useState(tipoFromUrl || '1');
  const [respostas, setRespostas] = useState(() => buildEmptyAnswers());
  const [professorResponsavel, setProfessorResponsavel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (estudantesStatus === 'idle') {
      dispatch(fetchEstudantes());
    }

    if (avaliacoesStatus === 'idle') {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacoesStatus, dispatch, estudantesStatus]);

  const estudante = useMemo(
    () => estudantes.find((item) => String(item.id) === String(estudanteId)),
    [estudantes, estudanteId],
  );

  const tipoApi = useMemo(() => getTipoApi(tipoAvaliacao), [tipoAvaliacao]);

  const avaliacaoExistente = useMemo(
    () =>
      avaliacoes.find(
        (item) =>
          String(item.pessoa_id) === String(estudanteId) &&
          String(item.tipo) === String(tipoApi),
      ),
    [avaliacoes, estudanteId, tipoApi],
  );

  const isReadOnly = Boolean(avaliacaoExistente);
  const respostasCompletas = useMemo(
    () => Object.values(respostas).every(Boolean),
    [respostas],
  );

  useEffect(() => {
    if (avaliacaoExistente) {
      const nextRespostas = buildEmptyAnswers();
      Object.keys(nextRespostas).forEach((key) => {
        nextRespostas[key] = avaliacaoExistente[key] || '';
      });
      setRespostas(nextRespostas);
      setProfessorResponsavel(avaliacaoExistente.professor_responsavel || '');
      setSubmitStatus(null);
      return;
    }

    setRespostas(buildEmptyAnswers());
    setProfessorResponsavel('');
    setSubmitStatus(null);
  }, [avaliacaoExistente]);

  const handleOptionChange = (questionKey, value) => {
    if (isReadOnly) {
      return;
    }

    setRespostas((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!estudanteId || !respostasCompletas || !professorResponsavel || isReadOnly) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await dispatch(
        addAvaliacao({
          pessoa_id: String(estudanteId),
          data_avaliacao: new Date().toISOString().split('T')[0],
          tipo: tipoApi,
          professor_responsavel: professorResponsavel,
          ...respostas,
        }),
      ).unwrap();

      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/avaliacoes');
      }, 1200);
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

  if ((estudantesStatus === 'idle' || estudantesStatus === 'loading') && !estudante) {
    return (
      <div className="avaliacao-body">
        <div className="avaliacao-container">
          <h2 className="avaliacao-title">Avaliacao</h2>
          <p>Carregando estudante...</p>
        </div>
      </div>
    );
  }

  if (!estudante) {
    return (
      <div className="avaliacao-body">
        <div className="avaliacao-container">
          <h2 className="avaliacao-title">Avaliacao</h2>
          <p>Estudante nao encontrado.</p>
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
          {` - ${estudante.nome}`}
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
                  disabled={Boolean(tipoFromUrl) || isSubmitting}
                >
                  Avaliacao {tipo}
                </button>
              ))}
            </div>
          </div>

          <label className="avaliacao-label">
            Professor responsavel
            <input
              className="avaliacao-input"
              type="text"
              value={professorResponsavel}
              onChange={(event) => setProfessorResponsavel(event.target.value)}
              disabled={isReadOnly}
              required
            />
          </label>

          {PERGUNTAS.map((pergunta, index) => {
            const questionKey = `q${String(index + 1).padStart(2, '0')}`;
            const selected = respostas[questionKey] || '';

            return (
              <fieldset key={questionKey} className="avaliacao-question" disabled={isReadOnly}>
                <legend>{index + 1} - {pergunta}</legend>
                <div className="avaliacao-options">
                  {OPCOES.map((opcao) => (
                    <label
                      key={opcao.value}
                      className={`option-pill ${selected === opcao.value ? 'selected' : ''} ${isReadOnly ? 'readonly' : ''}`}
                    >
                      <input
                        type="radio"
                        name={questionKey}
                        value={opcao.value}
                        checked={selected === opcao.value}
                        onChange={() => handleOptionChange(questionKey, opcao.value)}
                        required={!isReadOnly}
                      />
                      <span>{opcao.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}

          {submitStatus === 'success' && <div className="submit-status success">Avaliacao salva com sucesso.</div>}
          {submitStatus === 'error' && <div className="submit-status error">Nao foi possivel salvar a avaliacao.</div>}

          {!isReadOnly && (
            <button type="submit" className={`avaliacao-button ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting || !respostasCompletas || !professorResponsavel}>
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
