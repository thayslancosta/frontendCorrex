import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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
  { categoria: 'Grammar',    erro: 'My hobby is play football',     correcao: 'My hobby is playing football'  },
  { categoria: 'Vocabulary', erro: 'I like the football very much', correcao: 'I like football very much'      },
  { categoria: 'Spelling',   erro: 'I practise it evry week',       correcao: 'I practice it every week'      },
];

const badgeConfig = {
  Grammar:    { bg: 'var(--info-muted)',    color: 'var(--info)'    },
  Vocabulary: { bg: 'var(--warning-muted)', color: 'var(--warning)' },
  Spelling:   { bg: 'var(--error-muted)',   color: 'var(--error)'   },
};

export default function Correcao() {
  const navigate = useNavigate();
  const [editandoTexto, setEditandoTexto] = useState(false);
  const [textoRedacao, setTextoRedacao] = useState('My favorite hobby is playing football. I like the football very much. Every week I play with my friends in the park. I practise it evry week. This sport helps me to stay healthy and happy. It is very important for me.');
  const [feedbackExtra, setFeedbackExtra] = useState('');
  const [notaFinalManual, setNotaFinalManual] = useState(7.5);
  const [notasCriterios, setNotasCriterios] = useState([
    { nome: 'Gramática',   nota: 7.0, peso: 30 },
    { nome: 'Vocabulário', nota: 8.0, peso: 25 },
    { nome: 'Coerência',   nota: 8.5, peso: 25 },
    { nome: 'Ortografia',  nota: 6.5, peso: 20 },
  ]);

  const notaFinal = notasCriterios.reduce((acc, c) => acc + (c.nota * c.peso / 100), 0);

  const handleAtualizarNota = (nome, novaNota) => {
    setNotasCriterios(notasCriterios.map((c) => (c.nome === nome ? { ...c, nota: novaNota } : c)));
  };

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

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content">

        <button onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: '0', marginBottom: '20px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>

        <div style={{ marginBottom: '28px' }}>
          <h1>Correção</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Resultado da análise da redação</p>
        </div>

        <div className="split-columns" style={{ marginBottom: '24px' }}>

          {/* Coluna esquerda — Redação */}
          <div style={{ flex: 1 }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>Redação original</h2>
                <button onClick={() => setEditandoTexto(!editandoTexto)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '0' }}>
                  {editandoTexto ? 'Salvar' : 'Editar'}
                </button>
              </div>
              {editandoTexto ? (
                <textarea value={textoRedacao} onChange={(e) => setTextoRedacao(e.target.value)}
                  style={{ ...inp, width: '100%', minHeight: '180px', padding: '12px', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.8 }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
              ) : (
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '14px', margin: 0, whiteSpace: 'pre-wrap' }}>{textoRedacao}</p>
              )}
            </div>
          </div>

          {/* Coluna direita — Análise */}
          <div style={{ flex: 1 }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '20px' }}>Análise da IA</h2>

              {/* Nota */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '30px', fontWeight: '600' }}>{notaFinal.toFixed(1)}</span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '16px' }}>/10</span>
                </div>
                <div style={{ background: 'var(--bg-hover)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--accent)', height: '100%', width: `${(notaFinal / 10) * 100}%`, borderRadius: '3px', transition: 'width 0.3s' }} />
                </div>
              </div>

              {/* Critérios */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Critérios</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {notasCriterios.map((criterio) => (
                    <div key={criterio.nome}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{criterio.nome} — {criterio.peso}%</span>
                        <input type="number" min="0" max="10" step="0.1" value={criterio.nota}
                          onChange={(e) => handleAtualizarNota(criterio.nome, parseFloat(e.target.value))}
                          style={{ ...inp, width: '64px', padding: '5px 8px', textAlign: 'center' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
                      </div>
                      <div style={{ background: 'var(--bg-hover)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ background: 'var(--accent)', height: '100%', width: `${(criterio.nota / 10) * 100}%`, borderRadius: '2px', transition: 'width 0.2s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Erros */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Erros encontrados</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {erros.map((error, i) => {
                    const cfg = badgeConfig[error.categoria] || { bg: 'var(--bg-hover)', color: 'var(--text-secondary)' };
                    return (
                      <div key={i} style={{ borderBottom: i < erros.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '14px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', background: cfg.bg, color: cfg.color, marginBottom: '8px' }}>
                          {error.categoria}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '4px', color: 'var(--error)', fontSize: '13px' }}>
                          <IconX /><span>{error.erro}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', color: 'var(--success)', fontSize: '13px' }}>
                          <IconCheck /><span>{error.correcao}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comentário geral */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Comentário geral</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>
                  Ótima redação! Você demonstra boa compreensão do vocabulário e estrutura de frases. Trabalhe nos tempos verbais e preposições. Sua criatividade na escrita é evidente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Revisão antes de enviar */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '20px' }}>Revisão antes de enviar</h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>Feedback adicional</label>
            <textarea value={feedbackExtra} onChange={(e) => setFeedbackExtra(e.target.value)}
              placeholder="Adicione comentários personalizados para o aluno..."
              style={{ ...inp, width: '100%', minHeight: '120px', padding: '12px', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.8' }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>Nota final (ajuste manual)</label>
            <input type="number" min="0" max="10" step="0.1" value={notaFinalManual}
              onChange={(e) => setNotaFinalManual(parseFloat(e.target.value))}
              style={{ ...inp, width: '110px', padding: '9px 12px', textAlign: 'center' }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
          </div>
        </div>

        <button onClick={() => navigate('/revisao')}
          style={{ width: '100%', padding: '12px 24px', background: 'var(--accent)', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}>
          Finalizar revisão
        </button>
      </div>
    </div>
  );
}
