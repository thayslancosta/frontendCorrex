import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: BG_DARK,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '900px',
        minHeight: '520px',
        borderRadius: '16px',
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
      }}>

        {/* Esquerda - Formulário */}
        <div style={{
          flex: 1,
          background: '#0a0f1a',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: ROYAL,
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 12L6 4l3 6 2-3 2 5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', letterSpacing: '-0.3px' }}>
              CorreX
            </span>
          </div>

          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '6px', lineHeight: 1.3 }}>
            Bem-vindo de volta
          </h1>
          <p style={{ color: MUTED, fontSize: '14px', marginBottom: '36px' }}>
            Sistema de correção de redações com IA
          </p>

          <form onSubmit={handleLogin}>
            <label style={{ color: '#9aaac4', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="professor@escola.com"
              style={{
                width: '100%',
                padding: '11px 14px',
                background: BG_INPUT,
                border: `1px solid ${BORDER}`,
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                marginBottom: '20px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = ROYAL}
              onBlur={(e) => e.target.style.borderColor = BORDER}
            />

            <label style={{ color: '#9aaac4', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '11px 14px',
                background: BG_INPUT,
                border: `1px solid ${BORDER}`,
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                marginBottom: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = ROYAL}
              onBlur={(e) => e.target.style.borderColor = BORDER}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <label style={{ color: MUTED, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: ROYAL }} />
                Lembrar de mim
              </label>
              <a href="#" style={{ color: '#4a7cff', fontSize: '13px', textDecoration: 'none' }}>
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                background: ROYAL,
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#234db0'}
              onMouseLeave={(e) => e.currentTarget.style.background = ROYAL}
            >
              Entrar
            </button>
          </form>
        </div>

        {/* Direita - Painel royal */}
        <div style={{
          flex: 1,
          background: ROYAL_DARK,
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderLeft: `1px solid #1e3060`,
        }}>
          {/* Ícone central */}
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

          <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '600', marginBottom: '12px', lineHeight: 1.3 }}>
            Corrija redações com IA
          </h2>
          <p style={{ color: '#8faad4', fontSize: '14px', lineHeight: '1.7', marginBottom: '40px', maxWidth: '300px' }}>
            Envie redações dos seus alunos e receba correções detalhadas com sugestões de melhoria em segundos.
          </p>

          {/* Métricas */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { num: '500+', label: 'Correções' },
              { num: '50+', label: 'Professores' },
              { num: '98%', label: 'Precisão' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: '700' }}>{item.num}</div>
                <div style={{ color: '#8faad4', fontSize: '12px', marginTop: '2px' }}>{item.label}</div>
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
  );
}
