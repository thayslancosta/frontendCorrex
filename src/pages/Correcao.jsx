import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PageTransition } from '../components/PageTransition';
import { getRedacao, recorrigirRedacao } from '../services/redacaoService';

const badgeConfig = {
  Grammar: { bg: 'var(--info-muted)', color: 'var(--info)' },
  Vocabulary: { bg: 'var(--warning-muted)', color: 'var(--warning)' },
  Spelling: { bg: 'var(--error-muted)', color: 'var(--error)' },
  Style: { bg: 'var(--success-muted)', color: 'var(--success)' },
};

export default function Correcao() {
  const navigate = useNavigate();
  const location = useLocation();
  const redacaoId = location.state?.redacaoId;

  const [redacao, setRedacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [editandoTexto, setEditandoTexto] = useState(false);
  const [textoRedacao, setTextoRedacao] = useState('');
  const [feedbackExtra, setFeedbackExtra] = useState('');
  const [notaFinalManual, setNotaFinalManual] = useState('');
  const [notasCriterios, setNotasCriterios] = useState([]);
  const [recorrigindo, setRecorrigindo] = useState(false);
  const [erroRecorrecao, setErroRecorrecao] = useState('');

  useEffect(() => {
    if (!redacaoId) {
      setErro('Nenhuma redação foi selecionada.');
      setLoading(false);
      return;
    }

    const carregar = async () => {
      try {
        const data = await getRedacao(redacaoId);
        setRedacao(data);
        setTextoRedacao(data.textoEditado || data.textoOriginal || '');
        setFeedbackExtra(data.correcao?.feedbackExtra || '');
        setNotaFinalManual(data.correcao?.notaFinalManual ?? data.correcao?.notaFinal ?? '');
        setNotasCriterios(data.correcao?.notas ?? []);
      } catch {
        setErro('Erro ao carregar a correção da redação.');
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [redacaoId]);

  const inp = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const correcao = redacao?.correcao;
  const erros = correcao?.erros ?? [];
  const notaCalculada = notasCriterios.reduce(
    (total, criterio) => total + Math.max(0, Math.min(Number(criterio.nota) || 0, Number(criterio.peso) || 0)),
    0
  );
  const notaExibida = notaCalculada;

  useEffect(() => {
    setNotaFinalManual(notaCalculada.toFixed(1));
  }, [notaCalculada]);

  const handleAtualizarNota = (nomeCriterio, novaNota) => {
    setNotasCriterios((atuais) =>
      atuais.map((criterio) =>
        criterio.nomeCriterio === nomeCriterio
          ? {
              ...criterio,
              nota: Number.isNaN(novaNota)
                ? ''
                : Math.max(0, Math.min(novaNota, Number(criterio.peso) || 0)),
            }
          : criterio
      )
    );
  };

  const handleToggleEdicaoTexto = async () => {
    if (editandoTexto) {
      if (!redacaoId || !redacao) {
        setEditandoTexto(false);
        return;
      }

      const textoBase = redacao.textoEditado || redacao.textoOriginal || '';
      if (!textoRedacao.trim() || textoRedacao.trim() === textoBase.trim()) {
        setEditandoTexto(false);
        return;
      }

      setErroRecorrecao('');
      setRecorrigindo(true);
      try {
        const data = await recorrigirRedacao(redacaoId, { textoEditado: textoRedacao });
        setRedacao(data);
        setTextoRedacao(data.textoEditado || data.textoOriginal || '');
        setFeedbackExtra(data.correcao?.feedbackExtra || '');
        setNotaFinalManual(data.correcao?.notaFinalManual ?? data.correcao?.notaFinal ?? '');
        setNotasCriterios(data.correcao?.notas ?? []);
      } catch {
        setErroRecorrecao('Não foi possível recorrigir a redação automaticamente.');
      } finally {
        setRecorrigindo(false);
        setEditandoTexto(false);
      }
      return;
    }

    setEditandoTexto(true);
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content">
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: '0', marginBottom: '20px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>

        <PageTransition>
          <div style={{ marginBottom: '28px' }}>
            <h1>Correção</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Resultado da análise da redação</p>
            {recorrigindo && <p style={{ color: 'var(--accent)', fontSize: '13px', marginTop: '8px' }}>Recorrigindo texto editado...</p>}
            {erroRecorrecao && <p style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px' }}>{erroRecorrecao}</p>}
          </div>

          {loading && <p style={{ color: 'var(--text-secondary)', padding: '40px 0' }}>Carregando correção...</p>}
          {erro && <p style={{ color: 'var(--error)', padding: '40px 0' }}>{erro}</p>}

          {!loading && !erro && redacao && (
            <>
              <div style={{ marginBottom: '18px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Aluno</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>{redacao.nomeAluno || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Turma</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>{redacao.turma || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Status</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>{redacao.status || 'N/A'}</div>
                </div>
              </div>

              <div className="split-columns" style={{ marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h2 style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>Redação</h2>
                      <button
                        onClick={handleToggleEdicaoTexto}
                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '0' }}
                      >
                        {editandoTexto ? 'Salvar' : 'Editar'}
                      </button>
                    </div>
                    {editandoTexto ? (
                      <textarea
                        value={textoRedacao}
                        onChange={(e) => setTextoRedacao(e.target.value)}
                        style={{ ...inp, width: '100%', minHeight: '220px', padding: '12px', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.8' }}
                      />
                    ) : (
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '14px', margin: 0, whiteSpace: 'pre-wrap' }}>
                        {textoRedacao || 'Texto não disponível.'}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '20px' }}>Análise da IA</h2>

                    <div style={{ marginBottom: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ color: 'var(--text-primary)', fontSize: '30px', fontWeight: '600' }}>{Number(notaExibida).toFixed(1)}</span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '16px' }}>/100</span>
                      </div>
                      <div style={{ background: 'var(--bg-hover)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ background: 'var(--accent)', height: '100%', width: `${Math.max(0, Math.min(Number(notaExibida), 100))}%`, borderRadius: '3px', transition: 'width 0.3s' }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Critérios</div>
                      {notasCriterios.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Nenhum critério retornado.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {notasCriterios.map((criterio) => (
                            <div key={criterio.nomeCriterio}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{criterio.nomeCriterio} — 0 a {criterio.peso}</span>
                                <input
                                  type="number"
                                  min="0"
                                  max={criterio.peso}
                                  step="0.1"
                                  value={criterio.nota ?? ''}
                                  onChange={(e) => handleAtualizarNota(criterio.nomeCriterio, parseFloat(e.target.value))}
                                  style={{ ...inp, width: '64px', padding: '5px 8px', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ background: 'var(--bg-hover)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ background: 'var(--accent)', height: '100%', width: `${criterio.peso ? ((Number(criterio.nota) || 0) / criterio.peso) * 100 : 0}%`, borderRadius: '2px' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Erros encontrados</div>
                      {erros.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Nenhum erro destacado.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {erros.map((error, i) => {
                            const cfg = badgeConfig[error.categoria] || { bg: 'var(--bg-hover)', color: 'var(--text-secondary)' };
                            return (
                              <div key={`${error.categoria}-${i}`} style={{ borderBottom: i < erros.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '14px' }}>
                                <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', background: cfg.bg, color: cfg.color, marginBottom: '8px' }}>
                                  {error.categoria}
                                </span>
                                <div style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '4px' }}>{error.textoOriginal}</div>
                                <div style={{ color: 'var(--success)', fontSize: '13px' }}>{error.textoCorrigido}</div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Comentário geral</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>
                        {correcao?.comentarioGeral || 'Comentário não disponível.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '20px' }}>Revisão antes de enviar</h3>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>Feedback adicional</label>
                    <textarea
                      value={feedbackExtra}
                      onChange={(e) => setFeedbackExtra(e.target.value)}
                      style={{ ...inp, width: '100%', minHeight: '120px', padding: '12px', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.8' }}
                    />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>Nota final (ajuste manual)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={notaFinalManual}
                    readOnly
                    style={{ ...inp, width: '110px', padding: '9px 12px', textAlign: 'center' }}
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  navigate('/revisao', {
                    state: {
                      redacaoId: redacao.id,
                      draft: {
                        textoEditado: textoRedacao,
                        feedbackExtra,
                        notaFinalManual: notaFinalManual === '' ? '' : Number(notaFinalManual),
                        notasCriterios,
                      },
                    },
                  })
                }
                style={{ width: '100%', padding: '12px 24px', background: 'var(--accent)', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
              >
                Finalizar revisão
              </button>
            </>
          )}
        </PageTransition>
      </div>
    </div>
  );
}
