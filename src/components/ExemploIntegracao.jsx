import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { fetchEstudantes, addEstudante } from '../redux/slices/estudantesSlice';
import './ExemploIntegracao.css';
const estudanteSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'CPF inválido'),
});
const ExemploIntegracao = () => {
  const dispatch = useDispatch();
  const { items: estudantes, status, error } = useSelector(state => state.estudantes);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEstudantes());
    }
  }, [status, dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus(null);
    try {
      await estudanteSchema.validate(formData, { abortEarly: false });
      await dispatch(addEstudante({
        ...formData,
        dataNascimento: '2010-01-01',
        telefone: '(48) 99999-0000',
        endereco: 'Endereco de exemplo',
        nomeResponsavel: 'Responsavel de exemplo',
        telefoneResponsavel: '(48) 99999-0001',
        grauAutismo: 'leve',
      })).unwrap();
      setSubmitStatus('success');
      setFormData({ nome: '', email: '', cpf: '' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setSubmitStatus('error');
        console.error('Erro ao enviar dados:', error);
      }
    }
  };
  return (
    <div className="exemplo-integracao">
      <h2>Exemplo de Integração: Redux + Axios + Yup</h2>
      <div className="secao-formulario">
        <h3>Cadastro de Estudante</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? 'input-error' : ''}
            />
            {errors.nome && <div className="error-message">{errors.nome}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className={errors.cpf ? 'input-error' : ''}
            />
            {errors.cpf && <div className="error-message">{errors.cpf}</div>}
          </div>
          <button type="submit">Cadastrar</button>
          {submitStatus === 'success' && (
            <div className="success-message">Estudante cadastrado com sucesso!</div>
          )}
          {submitStatus === 'error' && (
            <div className="error-message">Erro ao cadastrar estudante. Tente novamente.</div>
          )}
        </form>
      </div>
      <div className="secao-lista">
        <h3>Lista de Estudantes (carregada via Redux/Axios)</h3>
        {status === 'loading' && <div>Carregando...</div>}
        {status === 'failed' && <div>Erro ao carregar dados: {error}</div>}
        {status === 'succeeded' && (
          <ul>
            {estudantes.length === 0 ? (
              <li>Nenhum estudante cadastrado</li>
            ) : (
              estudantes.map(estudante => (
                <li key={estudante.id}>
                  {estudante.nome} - {estudante.email}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className="explicacao">
        <h3>Como as tecnologias estão integradas:</h3>
        <ul>
          <li>
            <strong>Redux:</strong> Gerencia o estado global da aplicação. Os slices 
            (estudantesSlice, empresasSlice, etc.) definem as ações e reducers.
          </li>
          <li>
            <strong>Axios:</strong> Realiza as chamadas HTTP para a API. É usado dentro 
            das thunks do Redux para buscar e enviar dados.
          </li>
          <li>
            <strong>Yup:</strong> Valida os dados do formulário antes de enviá-los, 
            garantindo que estejam no formato correto.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ExemploIntegracao;
