import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstudantes } from '../redux/slices/estudantesSlice';
import { fetchEmpresas } from '../redux/slices/empresasSlice';
import api from '../services/api';
import './RelacionarEstudanteEmpresa.css';

const RelacionarEstudanteEmpresa = () => {
  const dispatch = useDispatch();
  const { items: estudantes, status: estudantesStatus } = useSelector((state) => state.estudantes);
  const { items: empresas, status: empresasStatus } = useSelector((state) => state.empresas);

  const [estudanteId, setEstudanteId] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [tipoRelacao, setTipoRelacao] = useState('encaminhamento');
  const [statusRelacao, setStatusRelacao] = useState('ativo');
  const [observacoes, setObservacoes] = useState('');

  const [relacionamentos, setRelacionamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (estudantesStatus === 'idle') dispatch(fetchEstudantes());
    if (empresasStatus === 'idle') dispatch(fetchEmpresas());
  }, [dispatch, estudantesStatus, empresasStatus]);

  const carregarRelacionamentos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/relacionamentos');
      setRelacionamentos(Array.isArray(response.data) ? response.data : []);
    } catch {
      setRelacionamentos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarRelacionamentos();
  }, []);

  const opcoesEstudantes = useMemo(
    () => estudantes.map((item) => ({ id: String(item.id), nome: item.nome || 'Sem nome' })),
    [estudantes]
  );

  const opcoesEmpresas = useMemo(
    () => empresas.map((item) => ({ id: String(item.id), nome: item.nomeFantasia || item.razaoSocial || 'Sem nome' })),
    [empresas]
  );

  const getNomeEstudante = (id) => opcoesEstudantes.find((item) => item.id === String(id))?.nome || 'Nao encontrado';
  const getNomeEmpresa = (id) => opcoesEmpresas.find((item) => item.id === String(id))?.nome || 'Nao encontrada';

  const handleVincular = async (event) => {
    event.preventDefault();
    setFeedback('');

    if (!estudanteId || !empresaId) {
      setFeedback('Selecione estudante e empresa para vincular.');
      return;
    }

    const duplicado = relacionamentos.some(
      (item) => String(item.estudanteId) === String(estudanteId) && String(item.empresaId) === String(empresaId) && item.statusRelacao === 'ativo'
    );

    if (duplicado) {
      setFeedback('Este vinculo ja existe como ativo.');
      return;
    }

    try {
      const payload = {
        estudanteId: String(estudanteId),
        empresaId: String(empresaId),
        tipoRelacao,
        statusRelacao,
        observacoes,
        criadoEm: new Date().toISOString(),
      };

      const response = await api.post('/relacionamentos', payload);
      setRelacionamentos((prev) => [response.data, ...prev]);

      setEmpresaId('');
      setEstudanteId('');
      setTipoRelacao('encaminhamento');
      setStatusRelacao('ativo');
      setObservacoes('');
      setFeedback('Vinculo criado com sucesso.');
    } catch {
      setFeedback('Nao foi possivel salvar o vinculo.');
    }
  };

  const handleRemover = async (id) => {
    try {
      await api.delete(`/relacionamentos/${id}`);
      setRelacionamentos((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch {
      setFeedback('Nao foi possivel remover o vinculo.');
    }
  };

  return (
    <div className="relacao-page">
      <section className="relacao-card">
        <h1>Relacionar estudante com empresa</h1>
        <p>Crie e gerencie os vinculos para encaminhamento e acompanhamento.</p>

        <form className="relacao-form" onSubmit={handleVincular}>
          <label>
            Estudante
            <select value={estudanteId} onChange={(event) => setEstudanteId(event.target.value)} required>
              <option value="">Selecione</option>
              {opcoesEstudantes.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </select>
          </label>

          <label>
            Empresa
            <select value={empresaId} onChange={(event) => setEmpresaId(event.target.value)} required>
              <option value="">Selecione</option>
              {opcoesEmpresas.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </select>
          </label>

          <label>
            Tipo de relacao
            <select value={tipoRelacao} onChange={(event) => setTipoRelacao(event.target.value)}>
              <option value="encaminhamento">Encaminhamento</option>
              <option value="estagio">Estagio</option>
              <option value="emprego">Emprego</option>
              <option value="acompanhamento">Acompanhamento</option>
            </select>
          </label>

          <label>
            Status
            <select value={statusRelacao} onChange={(event) => setStatusRelacao(event.target.value)}>
              <option value="ativo">Ativo</option>
              <option value="pausado">Pausado</option>
              <option value="encerrado">Encerrado</option>
            </select>
          </label>

          <label className="full-row">
            Observacoes
            <textarea
              rows="3"
              value={observacoes}
              onChange={(event) => setObservacoes(event.target.value)}
              placeholder="Informacoes adicionais do vinculo"
            />
          </label>

          <button type="submit" className="btn-vincular">Salvar vinculo</button>
        </form>

        {feedback && <div className="relacao-feedback">{feedback}</div>}
      </section>

      <section className="relacao-card">
        <h2>Vinculos cadastrados</h2>
        {isLoading ? (
          <p>Carregando vinculos...</p>
        ) : relacionamentos.length === 0 ? (
          <p>Nenhum vinculo cadastrado.</p>
        ) : (
          <div className="relacao-lista">
            {relacionamentos.map((item) => (
              <article key={item.id} className="relacao-item">
                <div>
                  <h3>{getNomeEstudante(item.estudanteId)}</h3>
                  <p>Empresa: {getNomeEmpresa(item.empresaId)}</p>
                  <p>Tipo: {item.tipoRelacao || 'Nao informado'}</p>
                  <p>Status: {item.statusRelacao || 'Nao informado'}</p>
                  {item.observacoes && <p>Obs: {item.observacoes}</p>}
                </div>
                <button className="btn-remover-relacao" onClick={() => handleRemover(item.id)}>
                  Remover
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RelacionarEstudanteEmpresa;
