import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFuncionarios, updateFuncionario } from '../redux/slices/funcionariosSlice';
import '../CadastroFuncionario/cadastroFuncionarios.css';

const INITIAL_FORM_DATA = {
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
  observacoes: '',
};

const EditarFuncionario = () => {
  const dispatch = useDispatch();
  const { items: funcionarios, status } = useSelector((state) => state.funcionarios);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFuncionarios());
    }
  }, [dispatch, status]);

  const funcionario = useMemo(
    () => funcionarios.find((item) => String(item.id) === String(id)),
    [funcionarios, id],
  );

  useEffect(() => {
    if (funcionario) {
      setFormData({
        ...INITIAL_FORM_DATA,
        ...funcionario,
      });
      return;
    }

    if (status === 'succeeded') {
      navigate('/funcionarios');
    }
  }, [funcionario, navigate, status]);

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
      await dispatch(
        updateFuncionario({
          id,
          funcionario: {
            ...formData,
            salario: parseFloat(formData.salario) || 0,
          },
        }),
      ).unwrap();

      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/funcionarios');
      }, 1200);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if ((status === 'idle' || status === 'loading') && !funcionario) {
    return (
      <div className="cadastro-page">
        <div className="cadastro-container">
          <div className="cadastro-header">
            <div className="header-content">
              <div>
                <h1>Editar Funcionario</h1>
                <p>Carregando dados do funcionario...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <Link to="/funcionarios" className="back-button">
            ← Voltar a Lista de Funcionarios
          </Link>
          <div className="header-content">
            <div className="header-icon">FN</div>
            <div>
              <h1>Editar Funcionario</h1>
              <p>Atualize as informacoes do funcionario</p>
            </div>
          </div>
        </div>
        <form className="cadastro-form" onSubmit={handleSubmit}>
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
                  Data de Admissao *
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
            <h3>Endereco</h3>
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
            <h3>Dados Profissionais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="funcao">
                  Funcao/Cargo *
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
                  <option value="ti">Tecnologia da Informacao</option>
                  <option value="rh">Recursos Humanos</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="comercial">Comercial</option>
                  <option value="operacoes">Operacoes</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="inclusao">Inclusao e Acessibilidade</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="salario">
                  Salario
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
                  Nivel de Escolaridade
                </label>
                <select
                  id="nivelEscolaridade"
                  name="nivelEscolaridade"
                  value={formData.nivelEscolaridade}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o nivel</option>
                  <option value="fundamental">Ensino Fundamental</option>
                  <option value="medio">Ensino Medio</option>
                  <option value="superior-incompleto">Superior Incompleto</option>
                  <option value="superior-completo">Superior Completo</option>
                  <option value="pos-graduacao">Pos-graduacao</option>
                  <option value="mestrado">Mestrado</option>
                  <option value="doutorado">Doutorado</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Experiencia e Qualificacoes</h3>
            <div className="form-group full-width">
              <label htmlFor="experiencia">
                Experiencia Profissional
              </label>
              <textarea
                id="experiencia"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleInputChange}
                placeholder="Descreva a experiencia profissional relevante"
                rows="4"
              />
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
                placeholder="Informacoes adicionais relevantes sobre o funcionario"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? 'Funcionario atualizado com sucesso.' : 'Erro ao atualizar funcionario. Tente novamente.'}
            </div>
          )}
          <button
            type="submit"
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Atualizando...' : 'Atualizar Funcionario'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarFuncionario;
