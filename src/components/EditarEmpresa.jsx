import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpresas, updateEmpresa } from '../redux/slices/empresasSlice';
import '../CadastroEmpresas/cadastroEmpresas.css';

const INITIAL_FORM_DATA = {
  razaoSocial: '',
  nomeFantasia: '',
  cnpj: '',
  ie: '',
  endereco: '',
  numeroContatoRh: '',
  renda: '',
  areaAtuacao: '',
  porte: '',
  observacoes: '',
};

const EditarEmpresa = () => {
  const dispatch = useDispatch();
  const { items: empresas, status } = useSelector((state) => state.empresas);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmpresas());
    }
  }, [dispatch, status]);

  const empresa = useMemo(
    () => empresas.find((item) => String(item.id) === String(id)),
    [empresas, id],
  );

  useEffect(() => {
    if (empresa) {
      setFormData({
        ...INITIAL_FORM_DATA,
        ...empresa,
      });
      return;
    }

    if (status === 'succeeded') {
      navigate('/empresas');
    }
  }, [empresa, navigate, status]);

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
        updateEmpresa({
          id,
          empresa: {
            ...formData,
            renda: parseFloat(formData.renda) || 0,
          },
        }),
      ).unwrap();

      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/empresas');
      }, 1200);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if ((status === 'idle' || status === 'loading') && !empresa) {
    return (
      <div className="cadastro-page">
        <div className="cadastro-container">
          <div className="cadastro-header">
            <div className="header-content">
              <div>
                <h1>Editar Empresa</h1>
                <p>Carregando dados da empresa...</p>
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
          <Link to="/empresas" className="back-button">
            ← Voltar a Lista de Empresas
          </Link>
          <div className="header-content">
            <div className="header-icon">EM</div>
            <div>
              <h1>Editar Empresa</h1>
              <p>Atualize as informacoes da empresa</p>
            </div>
          </div>
        </div>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Dados da Empresa</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="razaoSocial">
                  Razao Social *
                </label>
                <input
                  type="text"
                  id="razaoSocial"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite a razao social"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nomeFantasia">
                  Nome Fantasia *
                </label>
                <input
                  type="text"
                  id="nomeFantasia"
                  name="nomeFantasia"
                  value={formData.nomeFantasia}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite o nome fantasia"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnpj">
                  CNPJ *
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  required
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ie">
                  IE (Inscricao Estadual)
                </label>
                <input
                  type="text"
                  id="ie"
                  name="ie"
                  value={formData.ie}
                  onChange={handleInputChange}
                  placeholder="Digite a inscricao estadual"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Endereco e Contato</h3>
            <div className="form-grid">
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
              <div className="form-group">
                <label htmlFor="numeroContatoRh">
                  Contato RH *
                </label>
                <input
                  type="tel"
                  id="numeroContatoRh"
                  name="numeroContatoRh"
                  value={formData.numeroContatoRh}
                  onChange={handleInputChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Informacoes Empresariais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="areaAtuacao">
                  Area de Atuacao *
                </label>
                <input
                  type="text"
                  id="areaAtuacao"
                  name="areaAtuacao"
                  value={formData.areaAtuacao}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Tecnologia, Consultoria, etc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="porte">
                  Porte da Empresa *
                </label>
                <select
                  id="porte"
                  name="porte"
                  value={formData.porte}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione o porte</option>
                  <option value="micro">Microempresa</option>
                  <option value="pequena">Pequena Empresa</option>
                  <option value="media">Media Empresa</option>
                  <option value="grande">Grande Empresa</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="renda">
                  Faturamento Anual
                </label>
                <input
                  type="number"
                  id="renda"
                  name="renda"
                  value={formData.renda}
                  onChange={handleInputChange}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
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
                placeholder="Informacoes adicionais relevantes sobre a empresa"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? 'Empresa atualizada com sucesso.' : 'Erro ao atualizar empresa. Tente novamente.'}
            </div>
          )}
          <button
            type="submit"
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Atualizando...' : 'Atualizar Empresa'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarEmpresa;
