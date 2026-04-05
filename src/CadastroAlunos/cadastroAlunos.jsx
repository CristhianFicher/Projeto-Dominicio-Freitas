import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEstudante } from '../redux/slices/estudantesSlice';
import * as yup from 'yup';
import './cadastroAlunos.css';
const validationSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'CPF inválido'),
  dataNascimento: yup.date().required('Data de nascimento é obrigatória').max(new Date(), 'Data não pode ser futura'),
  telefone: yup.string().required('Telefone é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  endereco: yup.string().required('Endereço é obrigatório'),
  nomeResponsavel: yup.string(),
  telefoneResponsavel: yup.string(),
  grauAutismo: yup.string().required('Grau de autismo é obrigatório'),
  necessidadesEspeciais: yup.string(),
  interesses: yup.string(),
  habilidades: yup.string(),
  objetivosEducacionais: yup.string(),
  objetivosProfissionais: yup.string(),
  observacoes: yup.string()
});
export default function CadastroAlunos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    observacoes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await new Promise(resolve => setTimeout(resolve, 1500));
      await dispatch(addEstudante(formData)).unwrap();
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/cadastroAlunos');
      }, 2000);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <Link to="/cadastroAlunos" className="back-button">
            ← Voltar à Lista de Estudantes
          </Link>
          <div className="header-content">
            <div className="header-icon">🎓</div>
            <div>
              <h1>Cadastro de Estudante</h1>
              <p>Registre um novo estudante autista no sistema de inclusão</p>
            </div>
          </div>
        </div>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>👤 Dados Pessoais</h3>
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
                  className={errors.nome ? 'input-error' : ''}
                />
                {errors.nome && <div className="error-message">{errors.nome}</div>}
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
            <h3>🏠 Endereço e Contato</h3>
            <div className="form-group full-width">
              <label htmlFor="endereco">
                Endereço Completo *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
                placeholder="Rua, número, bairro, cidade, estado"
              />
            </div>
          </div>
          <div className="form-section">
            <h3>👨‍👩‍👧‍👦 Responsável</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nomeResponsavel">
                  Nome do Responsável *
                </label>
                <input
                  type="text"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome completo do responsável"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefoneResponsavel">
                  Telefone do Responsável *
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
            <h3>🧠 Características do Autismo</h3>
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
                  <option value="leve">Leve (Nível 1)</option>
                  <option value="moderado">Moderado (Nível 2)</option>
                  <option value="severa">Severo (Nível 3)</option>
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
                  placeholder="Descreva as necessidades especiais e adaptações necessárias"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🎯 Interesses e Habilidades</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="interesses">
                  Áreas de Interesse
                </label>
                <input
                  type="text"
                  id="interesses"
                  name="interesses"
                  value={formData.interesses}
                  onChange={handleInputChange}
                  placeholder="Ex: Tecnologia, Arte, Ciências, etc."
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
                  placeholder="Ex: Memória visual, atenção aos detalhes, etc."
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🎓 Objetivos Educacionais e Profissionais</h3>
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
            <h3>📝 Observações Adicionais</h3>
            <div className="form-group full-width">
              <label htmlFor="observacoes">
                Observações Importantes
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="Informações adicionais relevantes sobre o estudante"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? (
                <>
                  Estudante cadastrado com sucesso! 🎉
                </>
              ) : (
                <>
                  Erro ao cadastrar estudante. Tente novamente.
                </>
              )}
            </div>
          )}
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                Cadastrando...
              </>
            ) : (
              <>
                Cadastrar Estudante
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
