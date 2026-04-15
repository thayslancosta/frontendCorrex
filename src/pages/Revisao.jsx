import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getRedacao, revisarRedacao } from '../services/redacaoService';

const badgeConfig = {
  Grammar:    { bg: 'var(--info-muted)',    color: 'var(--info)',    border: 'var(--info)'    },
  Vocabulary: { bg: 'var(--warning-muted)', color: 'var(--warning)', border: 'var(--warning)' },
  Spelling:   { bg: 'var(--error-muted)',   color: 'var(--error)',   border: 'var(--error)'   },
  Style:      { bg: 'var(--success-muted)', color: 'var(--success)', border: 'var(--success)' },
};

export default function Revisao() {
  const navigate = useNavigate();
  const location = useLocation();
  const redacaoId = location.state?.redacaoId;

  const [redacao, setRedacao] = useState(null);
  const [nota, setNota] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!redacaoId) { setErro('ID da redação não fornecido'); setLoading(false); return; }
    const carregar = async () => {
      try {
        const data = await getRedacao(redacaoId);
        setRedacao(data);
        setNota(data.nota || '');
      } catch { setErro('Erro ao carregar redação'); }
      finally { setLoading(false); }
    };
    carregar();
  }, [redacaoId]);

  const handleSubmit = async () => {
    if (!nota || nota < 0 || nota > 10) { alert('Nota deve estar entre 0 e 10'); return; }
    setEnviando(true);
    try {
      await revisarRedacao(redacaoId, { nota: parseFloat(nota), feedback: feedback.trim() });
      alert('Revisão enviada com sucesso!');
      navigate('/dashboard');
    } catch { alert('Erro ao enviar revisão. Tente novamente.'); }
    finally { setEnviando(false); }
  };

  const inp = { background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: '0', marginBottom: '20px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Voltar
        </button>

        <div style={{ marginBottom: '28px' }}>
          <h1>Revisão</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Revise e finalize antes de enviar ao aluno</p>
        </div>

        {loading && <p style={{ color: 'var(--text-secondary)', padding: '40px 0' }}>Carregando redação...</p>}
        {erro    && <p style={{ color: 'var(--error)', padding: '40px 0' }}>{erro}</p>}

        {redacao && (
          <>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px', marginBottom: '16px' }}>
              <div className="review-info" style={{ marginBottom: '24px' }}>
                {[
                  { label: 'Aluno', value: redacao.alunoNome || 'N/A' },
                  { label: 'Turma', value: redacao.nomeTurma || 'N/A' },
                  { label: 'Data',  value: redacao.dataCriacao ? new Date(redacao.dataCriacao).toLocaleDateString('pt-BR') : 'N/A' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>{label}</div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '24px' }} />

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>Nota final</label>
                <input type="number" min="0" max="10" step="0.1" value={nota}
                  onChange={(e) => setNota(parseFloat(e.target.value) || '')}
                  disabled={enviando}
                  style={{ ...inp, width: '110px', padding: '9px 12px' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>Feedback para o aluno</label>
                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}
                  disabled={enviando}
                  placeholder="Adicione comentários personalizados para o aluno..."
                  style={{ ...inp, width: '100%', minHeight: '110px', padding: '10px 12px', fontFamily: 'inherit', resize: 'vertical', opacity: enviando ? 0.5 : 1 }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {redacao.erros && redacao.erros.length > 0 && (
                <div>
                  <h3 style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Erros encontrados</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {redacao.erros.map((error, i) => {
                      const cfg = badgeConfig[error.categoria] || { bg: 'var(--bg-hover)', color: 'var(--text-secondary)', border: 'var(--border)' };
                      return (
                        <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', background: cfg.bg, color: cfg.color, flexShrink: 0 }}>{error.categoria}</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{error.erro}</span>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>→</span>
                          <span style={{ color: 'var(--success)', fontSize: '13px' }}>{error.correcao}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="review-actions">
              <button onClick={() => navigate(-1)} disabled={enviando}
                style={{ flex: 1, padding: '11px 24px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500', cursor: enviando ? 'not-allowed' : 'pointer', opacity: enviando ? 0.5 : 1 }}
                onMouseEnter={(e) => { if (!enviando) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                onMouseLeave={(e) => { if (!enviando) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
              >Voltar</button>
              <button onClick={handleSubmit} disabled={enviando || !nota}
                style={{ flex: 1, padding: '11px 24px', background: (enviando || !nota) ? 'var(--bg-active)' : 'var(--accent)', color: (enviando || !nota) ? 'var(--text-tertiary)' : '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: (enviando || !nota) ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={(e) => { if (!enviando && nota) e.currentTarget.style.background = 'var(--accent-hover)'; }}
                onMouseLeave={(e) => { if (!enviando && nota) e.currentTarget.style.background = 'var(--accent)'; }}
              >{enviando ? 'Enviando...' : 'Enviar ao aluno'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
