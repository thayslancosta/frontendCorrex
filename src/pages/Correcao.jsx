import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ROYAL = '#1a3a7c';
const BORDER = '#1a2540';
const MUTED = '#6b7a99';
const BG_CARD = '#0a0f1a';

const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const erros = [
  { categoria: 'Grammar', erro: 'My hobby is play football', correcao: 'My hobby is playing football' },
  { categoria: 'Vocabulary', erro: 'I like the football very much', correcao: 'I like football very much' },
  { categoria: 'Spelling', erro: 'I practise it evry week', correcao: 'I practice it every week' },
];

const badgeConfig = {
  Grammar: { bg: 'rgba(74,124,255,0.10)', color: '#4a7cff', border: 'rgba(74,124,255,0.25)' },
  Vocabulary: { bg: 'rgba(245,158,11,0.10)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  Spelling: { bg: 'rgba(239,68,68,0.10)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
};

export default function Correcao() {
  const navigate = useNavigate();
  const [editandoTexto, setEditandoTexto] = useState(false);
  const [textoRedacao, setTextoRedacao] = useState('My favorite hobby is playing football. I like the football very much. Every week I play with my friends in the park. I practise it evry week. This sport helps me to stay healthy and happy. It is very important for me.');
  const [feedbackExtra, setFeedbackExtra] = useState('');
  const [notaFinalManual, setNotaFinalManual] = useState(7.5);

  const [notasCriterios, setNotasCriterios] = useState([
    { nome: 'Gramática', nota: 7.0, peso: 30 },
    { nome: 'Vocabulário', nota: 8.0, peso: 25 },
    { nome: 'Coerência', nota: 8.5, peso: 25 },
    { nome: 'Ortografia', nota: 6.5, peso: 20 },
  ]);

  const notaFinal = notasCriterios.reduce((acc, c) => acc + (c.nota * c.peso / 100), 0);

  const handleAtualizarNota = (nome, novaNota) => {
    setNotasCriterios(
      notasCriterios.map((c) => (c.nome === nome ? { ...c, nota: novaNota } : c))
    );
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
            Correção
          </h1>
          <p style={{ color: MUTED, fontSize: '14px' }}>
            Resultado da análise da redação
          </p>
        </div>

        {/* Duas colunas */}
        <div className="split-columns" style={{ marginBottom: '24px' }}>

          {/* Coluna esquerda - Redação original */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: BG_CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '24px',
              height: '100%',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', margin: '0' }}>
                  Redação original
                </h2>
                <button
                  onClick={() => setEditandoTexto(!editandoTexto)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#4a7cff',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: '0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6aa5ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a7cff'}
                >
                  {editandoTexto ? 'Salvar' : 'Editar'}
                </button>
              </div>
              {editandoTexto ? (
                <textarea
                  value={textoRedacao}
                  onChange={(e) => setTextoRedacao(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '180px',
                    background: '#0d1424',
                    border: `1px solid ${BORDER}`,
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    lineHeight: 1.8,
                    padding: '12px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                  onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
                />
              ) : (
                <div style={{ color: '#c0cce0', lineHeight: '1.9', fontSize: '14px' }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {textoRedacao}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Coluna direita - Análise da IA */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: BG_CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '24px',
            }}>
              <h2 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
                Análise da IA
              </h2>

              {/* Nota Final */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ color: '#4a7cff', fontSize: '30px', fontWeight: '700' }}>
                    {notaFinal.toFixed(1)}
                  </span>
                  <span style={{ color: MUTED, fontSize: '16px' }}>/10</span>
                </div>
                <div style={{
                  background: '#111827',
                  height: '6px',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    background: ROYAL,
                    height: '100%',
                    width: `${(notaFinal / 10) * 100}%`,
                    borderRadius: '3px',
                  }} />
                </div>
              </div>

              {/* Nota por Critério */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: '#9aaac4', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '14px' }}>
                  Nota por critério
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {notasCriterios.map((criterio) => (
                    <div key={criterio.nome} style={{
                      borderBottom: `1px solid ${BORDER}`,
                      paddingBottom: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#9aaac4', fontSize: '13px', fontWeight: '600' }}>
                          {criterio.nome} — {criterio.peso}%
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={criterio.nota}
                          onChange={(e) => handleAtualizarNota(criterio.nome, parseFloat(e.target.value))}
                          style={{
                            width: '64px',
                            padding: '6px 10px',
                            background: '#0d1424',
                            border: `1px solid ${BORDER}`,
                            borderRadius: '6px',
                            color: '#ffffff',
                            fontSize: '14px',
                            textAlign: 'center',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                          onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
                        />
                      </div>
                      <div style={{
                        background: '#111827',
                        height: '4px',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          background: '#1a3a7c',
                          height: '100%',
                          width: `${(criterio.nota / 10) * 100}%`,
                          borderRadius: '2px',
                          transition: 'width 0.2s',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Erros */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: '#9aaac4', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '14px' }}>
                  Erros encontrados
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {erros.map((error, i) => {
                    const cfg = badgeConfig[error.categoria];
                    return (
                      <div key={i} style={{
                        borderBottom: i < erros.length - 1 ? `1px solid ${BORDER}` : 'none',
                        paddingBottom: '14px',
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 9px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '500',
                          background: cfg.bg,
                          color: cfg.color,
                          border: `1px solid ${cfg.border}`,
                          marginBottom: '8px',
                        }}>
                          {error.categoria}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '4px', color: '#e07070', fontSize: '13px' }}>
                          <IconX />
                          <span>{error.erro}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', color: '#4ade80', fontSize: '13px' }}>
                          <IconCheck />
                          <span>{error.correcao}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comentário geral */}
              <div>
                <h3 style={{ color: '#9aaac4', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>
                  Comentário geral
                </h3>
                <p style={{ color: '#c0cce0', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>
                  Ótima redação! Você demonstra boa compreensão do vocabulário e estrutura de frases. Trabalhe nos tempos verbais e preposições. Sua criatividade na escrita é evidente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de revisão completa */}
        <div style={{
          background: '#0a0f1a',
          border: `1px solid ${BORDER}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
            Revisão antes de enviar
          </h3>

          {/* Feedback adicional */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>
              Feedback adicional
            </label>
            <textarea
              value={feedbackExtra}
              onChange={(e) => setFeedbackExtra(e.target.value)}
              placeholder="Adicione comentários personalizados para o aluno..."
              style={{
                width: '100%',
                minHeight: '120px',
                background: '#0d1424',
                border: `1px solid ${BORDER}`,
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: '1.8',
                padding: '12px',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
              onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
            />
          </div>

          {/* Nota final ajustável */}
          <div>
            <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>
              Nota final (ajuste manual)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={notaFinalManual}
              onChange={(e) => setNotaFinalManual(parseFloat(e.target.value))}
              style={{
                width: '110px',
                background: '#0d1424',
                border: `1px solid ${BORDER}`,
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                padding: '10px 12px',
                outline: 'none',
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
              onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
            />
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={() => navigate('/revisao')}
          style={{
            width: '100%',
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
          Finalizar revisão
        </button>
      </div>
    </div>
  );
}
