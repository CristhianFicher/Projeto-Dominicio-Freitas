import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFuncionario } from '../redux/slices/funcionariosSlice';
import './cadastroFuncionarios.css';
export default function CadastroFuncionario() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    dataNascimento: '',
    dataAdmissao: '',
    funcao: '',
    departamento: '',
    salario: '',
    nivelEscolaridade: '',
    experiencia: '',
    observacoes: ''
  });
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
    try {
      const funcionarioData = {
        ...formData,
        salario: parseFloat(formData.salario) || 0
      };
      await dispatch(addFuncionario(funcionarioData)).unwrap();
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/funcionarios');
      }, 2000);
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <Link to="/funcionarios" className="back-button">
            ← Voltar à Lista de Funcionários
          </Link>
          <div className="header-content">
            <div className="header-icon">👥</div>
            <div>
              <h1>Cadastro de Funcionário</h1>
              <p>Registre um novo funcionário no sistema de inclusão</p>
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
                <label htmlFor="telefone">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="funcionario@empresa.com"
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
                <label htmlFor="dataAdmissao">
                  Data de Admissão *
                </label>
                <input
                  type="date"
                  id="dataAdmissao"
                  name="dataAdmissao"
                  value={formData.dataAdmissao}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🏠 Endereço</h3>
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
            <h3>💼 Dados Profissionais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="funcao">
                  Função/Cargo *
                </label>
                <input
                  type="text"
                  id="funcao"
                  name="funcao"
                  value={formData.funcao}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Desenvolvedor, Analista, etc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="departamento">
                  Departamento *
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione o departamento</option>
                  <option value="ti">Tecnologia da Informação</option>
                  <option value="rh">Recursos Humanos</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="comercial">Comercial</option>
                  <option value="operacoes">Operações</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="inclusao">Inclusão e Acessibilidade</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="salario">
                  Salário
                </label>
                <input
                  type="number"
                  id="salario"
                  name="salario"
                  value={formData.salario}
                  onChange={handleInputChange}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nivelEscolaridade">
                  Nível de Escolaridade
                </label>
                <select
                  id="nivelEscolaridade"
                  name="nivelEscolaridade"
                  value={formData.nivelEscolaridade}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o nível</option>
                  <option value="fundamental">Ensino Fundamental</option>
                  <option value="medio">Ensino Médio</option>
                  <option value="superior-incompleto">Superior Incompleto</option>
                  <option value="superior-completo">Superior Completo</option>
                  <option value="pos-graduacao">Pós-graduação</option>
                  <option value="mestrado">Mestrado</option>
                  <option value="doutorado">Doutorado</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🎯 Experiência e Qualificações</h3>
            <div className="form-group full-width">
              <label htmlFor="experiencia">
                Experiência Profissional
              </label>
              <textarea
                id="experiencia"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleInputChange}
                placeholder="Descreva a experiência profissional relevante"
                rows="4"
              />
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
                placeholder="Informações adicionais relevantes sobre o funcionário"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? (
                <>
                  Funcionário cadastrado com sucesso! 🎉
                </>
              ) : (
                <>
                  Erro ao cadastrar funcionário. Tente novamente.
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
                Cadastrar Funcionário
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
