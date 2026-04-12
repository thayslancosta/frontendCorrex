import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getRedacao, revisarRedacao } from '../services/redacaoService';

const ROYAL = '#1a3a7c';
const BORDER = '#1a2540';
const MUTED = '#6b7a99';
const BG_CARD = '#0a0f1a';
const BG_INPUT = '#0d1424';
const BG_ROW = '#0d1424';

const badgeConfig = {
  Grammar: { bg: 'rgba(74,124,255,0.10)', color: '#4a7cff', border: 'rgba(74,124,255,0.25)' },
  Vocabulary: { bg: 'rgba(245,158,11,0.10)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  Spelling: { bg: 'rgba(239,68,68,0.10)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
};

const inputStyle = {
  background: BG_INPUT,
  border: `1px solid ${BORDER}`,
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
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
    if (!redacaoId) {
      setErro('ID da redação não fornecido');
      setLoading(false);
      return;
    }
    
    const carregarRedacao = async () => {
      try {
        const data = await getRedacao(redacaoId);
        setRedacao(data);
        setNota(data.nota || '');
      } catch (err) {
        setErro('Erro ao carregar redação');
      } finally {
        setLoading(false);
      }
    };
    
    carregarRedacao();
  }, [redacaoId]);

  const handleSubmit = async () => {
    if (!nota || nota < 0 || nota > 10) {
      alert('Nota deve estar entre 0 e 10');
      return;
    }
    setEnviando(true);
    try {
      await revisarRedacao(redacaoId, { nota: parseFloat(nota), feedback: feedback.trim() });
      alert('Revisão enviada com sucesso!');
      navigate('/dashboard');
    } catch {
      alert('Erro ao enviar revisão. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="page-content">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: 'none',
            color: '#6b7a99',
            fontSize: '13px',
            cursor: 'pointer',
            padding: '0',
            marginBottom: '20px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b7a99'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '600', marginBottom: '4px' }}>
            Revisão
          </h1>
          <p style={{ color: MUTED, fontSize: '14px' }}>
            Revise e finalize antes de enviar ao aluno
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: MUTED, padding: '40px 20px' }}>
            Carregando redação...
          </div>
        ) : erro ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '40px 20px' }}>
            {erro}
          </div>
        ) : redacao ? (
          <>
            {/* Card principal */}
            <div style={{
              background: BG_CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '28px',
              marginBottom: '20px',
            }}>
              {/* Info do aluno */}
              <div className="review-info" style={{ marginBottom: '24px' }}>
                {[
                  { label: 'Aluno', value: redacao.alunoNome || 'N/A' },
                  { label: 'Turma', value: redacao.nomeTurma || 'N/A' },
                  { label: 'Data', value: redacao.dataCriacao ? new Date(redacao.dataCriacao).toLocaleDateString('pt-BR') : 'N/A' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ color: MUTED, fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '5px' }}>
                      {label}
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: '500' }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: '24px' }} />

              {/* Nota */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '7px' }}>
                  Nota final
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={nota}
                  onChange={(e) => setNota(parseFloat(e.target.value) || '')}
                  disabled={enviando}
                  style={{ ...inputStyle, width: '110px', padding: '10px 14px' }}
                  onFocus={(e) => e.target.style.borderColor = ROYAL}
                  onBlur={(e) => e.target.style.borderColor = BORDER}
                />
              </div>

              {/* Feedback */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '7px' }}>
                  Feedback para o aluno
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  disabled={enviando}
                  placeholder="Adicione comentários personalizados para o aluno..."
                  style={{
                    ...inputStyle,
                    width: '100%',
                    minHeight: '110px',
                    padding: '11px 14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    opacity: enviando ? 0.5 : 1,
                  }}
                  onFocus={(e) => e.target.style.borderColor = ROYAL}
                  onBlur={(e) => e.target.style.borderColor = BORDER}
                />
              </div>

              {/* Resumo de erros */}
              {redacao.erros && redacao.erros.length > 0 && (
                <div>
                  <h3 style={{ color: '#9aaac4', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '12px' }}>
                    Resumo dos erros
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {redacao.erros.map((error, i) => {
                      const cfg = badgeConfig[error.categoria] || { bg: 'rgba(100,100,100,0.10)', color: '#888888', border: 'rgba(100,100,100,0.25)' };
                      return (
                        <div key={i} style={{
                          padding: '11px 14px',
                          background: BG_ROW,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          flexWrap: 'wrap',
                        }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '500',
                            background: cfg.bg,
                            color: cfg.color,
                            border: `1px solid ${cfg.border}`,
                            flexShrink: 0,
                          }}>
                            {error.categoria}
                          </span>
                          <span style={{ color: '#9aaac4', fontSize: '13px' }}>
                            {error.erro}
                          </span>
                          <span style={{ color: MUTED, fontSize: '13px' }}>→</span>
                          <span style={{ color: '#4ade80', fontSize: '13px' }}>
                            {error.correcao}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Botões de ação */}
            <div className="review-actions" style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => navigate('/correcao')}
                disabled={enviando}
                style={{
                  flex: 1,
                  padding: '13px 24px',
                  background: 'transparent',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '8px',
                  color: MUTED,
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: enviando ? 'not-allowed' : 'pointer',
                  opacity: enviando ? 0.5 : 1,
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!enviando) {
                    e.currentTarget.style.borderColor = '#2a3a5a';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!enviando) {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.color = MUTED;
                  }
                }}
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={enviando || !nota}
                style={{
                  flex: 1,
                  padding: '13px 24px',
                  background: (enviando || !nota) ? '#0f1a2e' : ROYAL,
                  color: (enviando || !nota) ? MUTED : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: (enviando || !nota) ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!enviando && nota) e.currentTarget.style.background = '#234db0';
                }}
                onMouseLeave={(e) => {
                  if (!enviando && nota) e.currentTarget.style.background = ROYAL;
                }}
              >
                {enviando ? 'Enviando...' : 'Enviar ao aluno'}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
