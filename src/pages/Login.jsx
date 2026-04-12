import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const ROYAL = '#1a3a7c';
const ROYAL_DARK = '#122b5e';
const BG_DARK = '#070c18';
const BG_INPUT = '#0d1424';
const BORDER = '#1a2540';
const MUTED = '#6b7a99';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setErro('E-mail ou senha incorretos.');
      } else {
        setErro('Erro ao conectar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-container">
        {/* Esquerda - Formulário */}
        <div className="login-form-panel">
          {/* Logo */}
          <div className="login-logo">
            <div style={{
              width: '36px',
              height: '36px',
              background: ROYAL,
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 12L6 4l3 6 2-3 2 5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: '#ffffff', fontWeight: '600', letterSpacing: '-0.3px' }}>
              CorreX
            </span>
          </div>

          <h1 className="login-heading" style={{ color: '#ffffff' }}>
            Bem-vindo de volta
          </h1>
          <p className="login-subheading" style={{ color: MUTED }}>
            Sistema de correção de redações com IA
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="professor@escola.com"
                className="form-input"
                style={{
                  background: BG_INPUT,
                  border: `1px solid ${BORDER}`,
                  color: '#ffffff',
                }}
                onFocus={(e) => e.target.style.borderColor = ROYAL}
                onBlur={(e) => e.target.style.borderColor = BORDER}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{
                  background: BG_INPUT,
                  border: `1px solid ${BORDER}`,
                  color: '#ffffff',
                }}
                onFocus={(e) => e.target.style.borderColor = ROYAL}
                onBlur={(e) => e.target.style.borderColor = BORDER}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <label style={{ color: MUTED, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: ROYAL }} />
                Lembrar de mim
              </label>
              <a href="#" style={{ color: '#4a7cff', fontSize: '13px', textDecoration: 'none' }}>
                Esqueceu a senha?
              </a>
            </div>

            {erro && (
              <div style={{
                background: 'rgba(255, 107, 107, 0.08)',
                border: '1px solid #ff6b6b',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '16px',
                color: '#ff6b6b',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              style={{
                background: loading ? '#0f2252' : ROYAL,
                color: '#ffffff',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#234db0'; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = ROYAL; }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Direita - Painel royal */}
        <div className="login-image-panel" style={{ background: ROYAL_DARK }}>
          {/* Ícone central */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: '80%',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', marginBottom: '12px', lineHeight: 1.3 }}>
              Corrija redações com IA
            </h2>
            <p style={{ color: '#8faad4', fontSize: '14px', lineHeight: '1.7', marginBottom: '40px' }}>
              Envie redações dos seus alunos e receba correções detalhadas com sugestões de melhoria em segundos.
            </p>

            {/* Métricas */}
            <div className="login-metrics">
              {[
                { num: '500+', label: 'Correções' },
                { num: '50+', label: 'Professores' },
                { num: '98%', label: 'Precisão' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700' }}>{item.num}</div>
                  <div style={{ color: '#8faad4', fontSize: '11px', marginTop: '2px' }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '36px 0' }} />

            {/* Feature list */}
            {[
              'Análise gramatical automática',
              'Pontuação detalhada por critério',
              'Feedback personalizado por aluno',
            ].map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ color: '#c8d8f0', fontSize: '13px' }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
