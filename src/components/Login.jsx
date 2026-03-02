import { useState } from 'react';
import './Login.css';

const DEFAULT_USER = 'admin';
const DEFAULT_PASSWORD = 'admin';

const Login = ({ onLogin, onClose, lockScreen = false }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 600));

    const isValidLogin =
      credentials.username.trim().toLowerCase() === DEFAULT_USER &&
      credentials.password === DEFAULT_PASSWORD;

    if (!isValidLogin) {
      setError('Login ou senha inválidos. Use admin / admin.');
      setIsLoading(false);
      return;
    }

    onLogin({
      name: 'Administrador',
      email: 'admin@local',
      username: DEFAULT_USER,
    });

    setIsLoading(false);
    if (!lockScreen && onClose) {
      onClose();
    }
  };

  return (
    <div className={`login-overlay ${lockScreen ? 'locked' : ''}`}>
      <div className="login-container">
        <div className="login-header">
          <h2>Acesso restrito</h2>
          <p>Faça login para acessar o sistema.</p>
          {!lockScreen && onClose && (
            <button className="login-close" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Login</label>
            <div className="input-wrapper">
              <input
                id="username"
                name="username"
                type="text"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Digite seu login"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className={`login-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? 'Validando...' : 'Entrar no Portal'}
          </button>
        </form>

        <div className="login-footer">
          <div className="credentials-info">
            <h4>🔑 Credenciais temporárias</h4>
            <div className="credentials">
              <p><strong>Login:</strong> admin</p>
              <p><strong>Senha:</strong> admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
