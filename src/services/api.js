import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const DEMO_STORAGE_KEY = 'demoApiData';

const initialDemoData = {
  estudantes: [
    {
      id: 'demo-estudante-1',
      nome: 'Ana Silva',
      cpf: '12345678900',
      dataNascimento: '2008-03-15',
      telefone: '48999990000',
      email: 'ana.silva@email.com',
      endereco: 'Rua das Flores, 100',
      nomeResponsavel: 'Maria Silva',
      telefoneResponsavel: '48988880000',
      grauAutismo: 'leve',
      observacoes: 'Cadastro demonstrativo para apresentacao sem backend.',
    },
  ],
  empresas: [
    {
      id: 'demo-empresa-1',
      razaoSocial: 'Tech Inclusao Ltda',
      nomeFantasia: 'Tech Inclusao',
      cnpj: '12345678000190',
      telefone: '4833330000',
      email: 'contato@techinclusao.com',
      endereco: 'Av. Central, 500',
      setor: 'tecnologia',
      responsavel: 'Carlos Souza',
      renda: 0,
      observacoes: 'Empresa parceira demonstrativa.',
    },
  ],
  funcionarios: [
    {
      id: 'demo-funcionario-1',
      nome: 'Mariana Costa',
      cpf: '98765432100',
      telefone: '48977770000',
      email: 'mariana@ong.org',
      endereco: 'Rua da ONG, 45',
      dataNascimento: '1990-06-20',
      dataAdmissao: '2024-02-01',
      funcao: 'Coordenadora',
      departamento: 'inclusao',
      salario: 3500,
      nivelEscolaridade: 'superior-completo',
      experiencia: 'Acompanhamento pedagogico',
      observacoes: 'Funcionario demonstrativo.',
    },
  ],
  avaliacoes: [],
  relacionamentos: [],
};

const hasLocalStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const clone = (value) => JSON.parse(JSON.stringify(value));

const getDemoData = () => {
  if (!hasLocalStorage()) return clone(initialDemoData);

  const stored = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(initialDemoData));
    return clone(initialDemoData);
  }

  return {
    ...clone(initialDemoData),
    ...JSON.parse(stored),
  };
};

const saveDemoData = (data) => {
  if (hasLocalStorage()) {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
  }
};

const createDemoId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `demo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createResponse = (config, data, status = 200) => ({
  data,
  status,
  statusText: status === 204 ? 'No Content' : 'OK',
  headers: {},
  config,
});

const normalizePath = (config) => {
  const url = config?.url || '';
  const base = config?.baseURL || API_URL;
  const fullUrl = new URL(url, base.endsWith('/') ? base : `${base}/`);
  return fullUrl.pathname.replace(/^\/api/, '').replace(/^\//, '');
};

const buildDashboard = (data) => ({
  resumo: {
    estudantes: data.estudantes.length,
    empresas: data.empresas.length,
    funcionarios: data.funcionarios.length,
    avaliacoes: data.avaliacoes.length,
    fichasAcompanhamento: 0,
    encaminhamentosAtivos: data.relacionamentos.filter((item) => item.statusRelacao === 'ativo' || item.status === 'ativo').length,
    encaminhamentosDesligados: data.relacionamentos.filter((item) => item.statusRelacao === 'encerrado' || item.status === 'desligado').length,
  },
  encaminhamentosRecentes: data.relacionamentos.slice(-5).reverse().map((item) => ({
    id: item.id,
    empresaId: item.empresaId,
    status: item.statusRelacao || item.status || 'ativo',
  })),
  fichasRecentes: [],
});

const demoLogin = (config) => {
  const { username = '', password = '' } = config.data ? JSON.parse(config.data) : {};
  const isValid = username.trim().toLowerCase() === 'admin' && password === 'admin';

  if (!isValid) {
    return Promise.reject({
      response: {
        data: { message: 'Login ou senha invalidos' },
        status: 401,
      },
    });
  }

  return createResponse(config, {
    accessToken: 'demo-presentation-token',
    tokenType: 'Bearer',
    user: {
      name: 'Administrador',
      email: 'admin@local',
      username: 'admin',
    },
  });
};

const handleDemoRequest = (config) => {
  const method = (config.method || 'get').toLowerCase();
  const [collection, id] = normalizePath(config).split('/');

  if (collection === 'auth' && id === 'login' && method === 'post') {
    return demoLogin(config);
  }

  const data = getDemoData();

  if (collection === 'dashboard' && method === 'get') {
    return createResponse(config, buildDashboard(data));
  }

  if (!Object.prototype.hasOwnProperty.call(data, collection)) {
    return Promise.reject({ response: { data: { message: 'Rota demo nao encontrada' }, status: 404 } });
  }

  if (method === 'get') {
    if (!id) return createResponse(config, data[collection]);

    const item = data[collection].find((entry) => String(entry.id) === String(id));
    return item
      ? createResponse(config, item)
      : Promise.reject({ response: { data: { message: 'Registro nao encontrado' }, status: 404 } });
  }

  if (method === 'post') {
    const body = config.data ? JSON.parse(config.data) : {};
    const item = {
      id: body.id || createDemoId(),
      ...body,
      criadoEm: body.criadoEm || new Date().toISOString(),
    };

    data[collection] = [item, ...data[collection]];
    saveDemoData(data);
    return createResponse(config, item, 201);
  }

  if (method === 'put' || method === 'patch') {
    const body = config.data ? JSON.parse(config.data) : {};
    const index = data[collection].findIndex((entry) => String(entry.id) === String(id));

    if (index === -1) {
      return Promise.reject({ response: { data: { message: 'Registro nao encontrado' }, status: 404 } });
    }

    const item = { ...data[collection][index], ...body, id: data[collection][index].id };
    data[collection][index] = item;
    saveDemoData(data);
    return createResponse(config, item);
  }

  if (method === 'delete') {
    data[collection] = data[collection].filter((entry) => String(entry.id) !== String(id));
    saveDemoData(data);
    return createResponse(config, null, 204);
  }

  return Promise.reject({ response: { data: { message: 'Metodo demo nao suportado' }, status: 405 } });
};

const shouldUseDemoFallback = (error) => {
  if (import.meta.env.VITE_DEMO_API === 'true') return true;
  return !error.response;
};

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = hasLocalStorage() ? window.localStorage.getItem('authToken') : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (shouldUseDemoFallback(error)) {
      return handleDemoRequest(error.config);
    }

    return Promise.reject(error);
  }
);

export default api;
