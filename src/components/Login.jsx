import { useState } from 'react';
import api from '../services/api';
import './Login.css';

const Login = ({ onLogin, onClose, lockScreen = false }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError('');
    setRecoveryMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('authToken', data.accessToken);
      onLogin(data.user);

      if (!lockScreen && onClose) {
        onClose();
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Login ou senha invalidos.';
      setError(Array.isArray(message) ? message.join(', ') : message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverPassword = () => {
    setRecoveryMessage('Procure o administrador para redefinir sua senha.');
    setError('');
  };

  return (
    <div className={`login-overlay ${lockScreen ? 'locked' : ''}`}>
      <div className="login-container">
        <div className="login-grid">
          <section className="login-hero">
            <span className="brand-pill">Projeto Diomicio Freitas</span>
            <h2>Acesso restrito</h2>
            <p>Faca login para acessar o sistema.</p>
            <div className="relationship-chips">
              <span>Estudantes</span>
              <span>Empresas</span>
              <span>Avaliacoes</span>
              <span>Encaminhamentos</span>
            </div>
          </section>

          <section className="login-form-card">
            {!lockScreen && onClose && (
              <button className="login-close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}

            <div className="login-header">
              <p className="login-eyebrow">Portal</p>
              <h2>Entrar no sistema</h2>
              <p className="login-subtitle">Use suas credenciais para continuar.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Login</label>
                <div className="input-wrapper">
                  <input id="username" name="username" type="text" value={credentials.username} onChange={handleInputChange} placeholder="Digite seu login" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <div className="input-wrapper">
                  <input id="password" name="password" type="password" value={credentials.password} onChange={handleInputChange} placeholder="Digite sua senha" required />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}
              {recoveryMessage && <div className="recovery-message">{recoveryMessage}</div>}

              <button type="submit" className={`login-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? 'Validando...' : 'Entrar no Portal'}
              </button>
              <button type="button" className="forgot-password" onClick={handleRecoverPassword}>
                Esqueci minha senha
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
