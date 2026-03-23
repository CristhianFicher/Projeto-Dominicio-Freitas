import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEmpresa } from '../redux/slices/empresasSlice';
import './cadastroEmpresas.css';
export default function CadastroEmpresas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    ie: '',
    endereco: '',
    numeroContatoRh: '',
    renda: '',
    areaAtuacao: '',
    porte: '',
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      await dispatch(addEmpresa({
        ...formData,
        renda: parseFloat(formData.renda) || 0
      }));
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/empresas');
      }, 2000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <Link to="/empresas" className="back-button">
            ← Voltar à Lista de Empresas
          </Link>
          <div className="header-content">
            <div className="header-icon">🏢</div>
            <div>
              <h1>Cadastro de Empresa</h1>
              <p>Registre uma nova empresa parceira no sistema de inclusão</p>
            </div>
          </div>
        </div>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>🏢 Dados da Empresa</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="razaoSocial">
                  Razão Social *
                </label>
                <input
                  type="text"
                  id="razaoSocial"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite a razão social"
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
                  IE (Inscrição Estadual) *
                </label>
                <input
                  type="text"
                  id="ie"
                  name="ie"
                  value={formData.ie}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite a inscrição estadual"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🏠 Endereço e Contato</h3>
            <div className="form-grid">
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
            <h3>💼 Informações Empresariais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="areaAtuacao">
                  Área de Atuação *
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
                  <option value="media">Média Empresa</option>
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
                placeholder="Informações adicionais relevantes sobre a empresa"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? (
                <>
                  Empresa cadastrada com sucesso! 🎉
                </>
              ) : (
                <>
                  Erro ao cadastrar empresa. Tente novamente.
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
                Cadastrar Empresa
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
