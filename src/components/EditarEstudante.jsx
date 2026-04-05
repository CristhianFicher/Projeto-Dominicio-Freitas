import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstudantes, updateEstudante } from '../redux/slices/estudantesSlice';
import './EditarEstudante.css';

const INITIAL_FORM_DATA = {
  nome: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
  email: '',
  endereco: '',
  nomeResponsavel: '',
  telefoneResponsavel: '',
  grauAutismo: '',
  necessidadesEspeciais: '',
  interesses: '',
  habilidades: '',
  objetivosEducacionais: '',
  objetivosProfissionais: '',
  observacoes: '',
};

const EditarEstudante = () => {
  const dispatch = useDispatch();
  const { items: estudantes, status } = useSelector((state) => state.estudantes);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEstudantes());
    }
  }, [dispatch, status]);

  const estudante = useMemo(
    () => estudantes.find((item) => String(item.id) === String(id)),
    [estudantes, id],
  );

  useEffect(() => {
    if (estudante) {
      setFormData({
        ...INITIAL_FORM_DATA,
        ...estudante,
      });
      return;
    }

    if (status === 'succeeded') {
      navigate('/cadastroAlunos');
    }
  }, [estudante, navigate, status]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await dispatch(updateEstudante({ id, estudante: formData })).unwrap();
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/cadastroAlunos');
      }, 1200);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if ((status === 'idle' || status === 'loading') && !estudante) {
    return (
      <div className="editar-page">
        <div className="editar-container">
          <div className="editar-header">
            <div className="header-content">
              <div>
                <h1>Editar Estudante</h1>
                <p>Carregando dados do estudante...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-page">
      <div className="editar-container">
        <div className="editar-header">
          <Link to="/cadastroAlunos" className="back-button">
            ← Voltar a Lista de Estudantes
          </Link>
          <div className="header-content">
            <div className="header-icon">ED</div>
            <div>
              <h1>Editar Estudante</h1>
              <p>Atualize as informacoes do estudante</p>
            </div>
          </div>
        </div>
        <form className="editar-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Dados Pessoais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite o nome completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">
                  CPF *
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dataNascimento">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Endereco e Contato</h3>
            <div className="form-group full-width">
              <label htmlFor="endereco">
                Endereco Completo *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
                placeholder="Rua, numero, bairro, cidade, estado"
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Responsavel</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nomeResponsavel">
                  Nome do Responsavel *
                </label>
                <input
                  type="text"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome completo do responsavel"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefoneResponsavel">
                  Telefone do Responsavel *
                </label>
                <input
                  type="tel"
                  id="telefoneResponsavel"
                  name="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={handleInputChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Caracteristicas do Autismo</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="grauAutismo">
                  Grau do Espectro Autista
                </label>
                <select
                  id="grauAutismo"
                  name="grauAutismo"
                  value={formData.grauAutismo}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o grau</option>
                  <option value="leve">Leve (Nivel 1)</option>
                  <option value="moderado">Moderado (Nivel 2)</option>
                  <option value="severa">Severo (Nivel 3)</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="necessidadesEspeciais">
                  Necessidades Especiais
                </label>
                <textarea
                  id="necessidadesEspeciais"
                  name="necessidadesEspeciais"
                  value={formData.necessidadesEspeciais}
                  onChange={handleInputChange}
                  placeholder="Descreva as necessidades especiais e adaptacoes necessarias"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Interesses e Habilidades</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="interesses">
                  Areas de Interesse
                </label>
                <input
                  type="text"
                  id="interesses"
                  name="interesses"
                  value={formData.interesses}
                  onChange={handleInputChange}
                  placeholder="Ex: Tecnologia, Arte, Ciencias, etc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="habilidades">
                  Habilidades Especiais
                </label>
                <input
                  type="text"
                  id="habilidades"
                  name="habilidades"
                  value={formData.habilidades}
                  onChange={handleInputChange}
                  placeholder="Ex: Memoria visual, atencao aos detalhes, etc."
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Objetivos Educacionais e Profissionais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="objetivosEducacionais">
                  Objetivos Educacionais
                </label>
                <textarea
                  id="objetivosEducacionais"
                  name="objetivosEducacionais"
                  value={formData.objetivosEducacionais}
                  onChange={handleInputChange}
                  placeholder="Descreva os objetivos educacionais do estudante"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="objetivosProfissionais">
                  Objetivos Profissionais
                </label>
                <textarea
                  id="objetivosProfissionais"
                  name="objetivosProfissionais"
                  value={formData.objetivosProfissionais}
                  onChange={handleInputChange}
                  placeholder="Descreva os objetivos profissionais do estudante"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Observacoes Adicionais</h3>
            <div className="form-group full-width">
              <label htmlFor="observacoes">
                Observacoes Importantes
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="Informacoes adicionais relevantes sobre o estudante"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? 'Estudante atualizado com sucesso.' : 'Erro ao atualizar estudante. Tente novamente.'}
            </div>
          )}
          <div className="form-actions">
            <Link to="/cadastroAlunos" className="btn-cancelar">
              Cancelar
            </Link>
            <button
              type="submit"
              className={`btn-salvar ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alteracoes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEstudante;
