import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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

const erros = [
  { categoria: 'Grammar', erro: 'I like the football very much', correcao: 'I like football very much' },
  { categoria: 'Vocabulary', erro: 'I practise it evry week', correcao: 'I practice it every week' },
  { categoria: 'Spelling', erro: 'My hobby is play football', correcao: 'My hobby is playing football' },
];

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
  const [nota, setNota] = useState(7.5);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    alert('Correção enviada com sucesso!');
    navigate('/dashboard');
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
              { label: 'Aluno', value: 'Maria Silva' },
              { label: 'Turma', value: 'Inglês B2' },
              { label: 'Data', value: '08/04/2026' },
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
              onChange={(e) => setNota(parseFloat(e.target.value))}
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
              placeholder="Adicione comentários personalizados para o aluno..."
              style={{
                ...inputStyle,
                width: '100%',
                minHeight: '110px',
                padding: '11px 14px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
              onFocus={(e) => e.target.style.borderColor = ROYAL}
              onBlur={(e) => e.target.style.borderColor = BORDER}
            />
          </div>

          {/* Resumo de erros */}
          <div>
            <h3 style={{ color: '#9aaac4', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '12px' }}>
              Resumo dos erros
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {erros.map((error, i) => {
                const cfg = badgeConfig[error.categoria];
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
        </div>

        {/* Botões de ação */}
        <div className="review-actions">
          <button
            onClick={() => navigate('/correcao')}
            style={{
              flex: 1,
              padding: '13px 24px',
              background: 'transparent',
              border: `1px solid ${BORDER}`,
              borderRadius: '8px',
              color: MUTED,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2a3a5a';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER;
              e.currentTarget.style.color = MUTED;
            }}
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '13px 24px',
              background: ROYAL,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#234db0'}
            onMouseLeave={(e) => e.currentTarget.style.background = ROYAL}
          >
            Enviar ao aluno
          </button>
        </div>
      </div>
    </div>
  );
}
