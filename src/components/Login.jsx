import React, { useState, useEffect } from 'react';
import './Login.css';
import { FaSignInAlt, FaSpinner, FaTimes } from 'react-icons/fa';
import { MdEmail, MdLock, MdCheckCircle } from 'react-icons/md';
const Login = ({ onLogin, onClose }) => {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpa erro quando usuário digita
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.email === 'admin@esucri.com' && formData.password === 'admin123') {
          onLogin({ email: formData.email, name: 'Administrador' });
          onClose();
        } else {
          setError('Email ou senha incorretos');
        }
      } else if (mode === 'reset') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.currentPassword !== 'admin123') {
          setError('Senha atual incorreta');
          setIsLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('As novas senhas não coincidem');
          setIsLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setError('A nova senha deve ter pelo menos 6 caracteres');
          setIsLoading(false);
          return;
        }
        const newPassword = formData.newPassword;
        setMessage('Sua senha foi alterada com sucesso!');
        setTimeout(() => {
          setMode('login');
          setMessage('');
          setFormData(prev => ({
            ...prev,
            password: newPassword, // Atualiza a senha para o login
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }));
        }, 3000);
      } else if (mode === 'recover') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessage('Instruções para recuperar sua senha foram enviadas para seu email.');
        setTimeout(() => {
          setMode('login');
          setMessage('');
        }, 3000);
      }
    } catch {
      setError('Erro ao processar sua solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setMessage('');
    setFormData(prev => ({
      ...prev,
      password: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };
  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <h2>{mode === 'login' ? 'Bem-vindo!' : mode === 'reset' ? 'Resetar Senha' : 'Recuperar Senha'}</h2>
          <p>Portal de Inclusão para Pessoas Autistas</p>
          <button className="login-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>
          {mode === 'login' && (
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Sua senha"
                  required
                />
              </div>
            </div>
          )}
          {mode === 'reset' && (
            <>
              <div className="form-group">
                <label htmlFor="currentPassword">Senha Atual</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha atual"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Digite sua nova senha"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme sua nova senha"
                    required
                  />
                </div>
              </div>
            </>
          )}
          {error && (
            <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {error}
            </div>
          )}
          {message && (
            <div className="success-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="8,12 11,15 16,9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {message}
            </div>
          )}
          <button 
            type="submit" 
            className={`login-submit ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
                {mode === 'login' ? 'Entrando...' : mode === 'reset' ? 'Resetando...' : 'Recuperando...'}
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H15" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {mode === 'login' ? 'Entrar no Portal' : mode === 'reset' ? 'Resetar Senha' : 'Recuperar Senha'}
              </>
            )}
          </button>
          <div className="login-options">
            {mode === 'login' ? (
              <>
                <button type="button" className="text-button" onClick={() => switchMode('reset')}>
                  Resetar Senha
                </button>
                <button type="button" className="text-button" onClick={() => switchMode('recover')}>
                  Recuperar Senha
                </button>
              </>
            ) : (
              <button type="button" className="text-button" onClick={() => switchMode('login')}>
                Voltar para Login
              </button>
            )}
          </div>
        </form>
        <div className="login-footer">
          {mode === 'login' && (
            <div className="credentials-info">
              <h4>🔑 Credenciais de Teste</h4>
              <div className="credentials">
                <p><strong>Email:</strong> admin@esucri.com</p>
                <p><strong>Senha:</strong> admin123</p>
              </div>
            </div>
          )}
          {mode === 'reset' && (
            <div className="info-box">
              <h4>ℹ️ Resetar Senha</h4>
              <p>Informe sua senha atual e defina uma nova senha.</p>
            </div>
          )}
          {mode === 'recover' && (
            <div className="info-box">
              <h4>ℹ️ Recuperar Senha</h4>
              <p>Informe seu email para receber instruções de como recuperar sua senha.</p>
            </div>
          )}
          <div className="support-info">
            <p>💙 Portal dedicado à inclusão de pessoas autistas</p>
            <p>🎓 Educação • 💼 Trabalho • 🤝 Suporte</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
