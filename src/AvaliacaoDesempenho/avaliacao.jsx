import './avaliacao.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { useEstudantes } from '../context/EstudantesContext';
import { useAvaliacoes } from '../context/AvaliacoesContext';
import { useDispatch } from 'react-redux';
import { addAvaliacao } from '../redux/slices/avaliacoesSlice';
export default function Avaliacao() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { obterEstudantePorId } = useEstudantes();
  const { obterAvaliacaoPorEstudanteETipo } = useAvaliacoes();
  const estudanteId = searchParams.get('estudante');
  const tipoFromUrl = searchParams.get('tipo');
  const estudante = estudanteId ? obterEstudantePorId(parseInt(estudanteId)) : null;
  const [tipoAvaliacao, setTipoAvaliacao] = useState(tipoFromUrl || "1");
  const avaliacaoExistente = estudanteId && tipoAvaliacao ? 
    obterAvaliacaoPorEstudanteETipo(parseInt(estudanteId), parseInt(tipoAvaliacao)) : null;
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const [formData, setFormData] = useState(avaliacaoExistente?.respostas || {});
  const [observacoes, setObservacoes] = useState(avaliacaoExistente?.observacoes || '');
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
      [`pergunta_${perguntaIndex}`]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await dispatch(addAvaliacao({
        estudanteId: parseInt(estudanteId),
        tipoAvaliacao: parseInt(tipoAvaliacao),
        dataAvaliacao: new Date().toISOString().split('T')[0],
        respostas: formData,
        observacoes: observacoes
      }));
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
  return (
    <div className="avaliacao-body">
      <Link to="/avaliacoes" className="avaliacao-back">← Voltar às Avaliações</Link>
      <div className="avaliacao-container">
        <h2 className="avaliacao-title">
          {isReadOnly ? 'Visualizar' : 'Avaliação'} {tipoAvaliacao}ª Experiência
          {estudante && ` - ${estudante.nome}`}
        </h2>
        {isReadOnly && (
          <div className="avaliacao-info">
            <p><strong>Data da Avaliação:</strong> {avaliacaoExistente?.dataAvaliacao}</p>
            <p><strong>Status:</strong> Concluída</p>
          </div>
        )}
        <form className="avaliacao-form" onSubmit={handleSubmit}>
          <label className="avaliacao-label">
            Tipo de Avaliação:
            <select
              className="avaliacao-input"
              value={tipoAvaliacao}
              onChange={(e) => setTipoAvaliacao(e.target.value)}
              disabled={tipoFromUrl || isReadOnly} // Desabilitar se veio da URL ou se é visualização
            >
              <option value="1">Avaliação 1</option>
              <option value="2">Avaliação 2</option>
            </select>
          </label>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="avaliacao-label">
              {index + 1} - {pergunta}
              <select 
                className="avaliacao-input" 
                name={`pergunta_${index}`}
                value={formData[`pergunta_${index}`] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                required={!isReadOnly}
                disabled={isReadOnly}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="maioria">Maioria das vezes</option>
                <option value="rara">Raramente</option>
                <option value="nao">Não</option>
              </select>
            </div>
          ))}
          <label className="avaliacao-label">
            Observações:
            <textarea 
              className="avaliacao-input" 
              rows="4" 
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              disabled={isReadOnly}
            />
          </label>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? (
                <>
                  Avaliação salva com sucesso! 🎉
                </>
              ) : (
                <>
                  Erro ao salvar avaliação. Tente novamente.
                </>
              )}
            </div>
          )}
          {!isReadOnly && (
            <button 
              type="submit" 
              className={`avaliacao-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Avaliação'}
            </button>
          )}
          {isReadOnly && (
            <div className="avaliacao-actions">
              <Link to="/avaliacoes" className="avaliacao-button">
                Voltar às Avaliações
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
