import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      background: '#05080f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        display: 'flex',
        width: '900px',
        minHeight: '500px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Lado esquerdo - Formulário */}
        <div style={{
          flex: 1,
          background: '#0a0f1a',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '8px',
          }}>
            Bem-vindo ao <span style={{ color: '#4a7cff' }}>CorreX</span>
          </h1>
          <p style={{
            color: '#7a8ba8',
            fontSize: '14px',
            marginBottom: '32px',
          }}>
            Sistema de correção de redações com IA
          </p>

          <form onSubmit={handleLogin}>
            <label style={{ color: '#a0aec0', fontSize: '13px', marginBottom: '6px', display: 'block' }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="professor@escola.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111827',
                border: '1px solid #1e2a3a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                marginBottom: '20px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <label style={{ color: '#a0aec0', fontSize: '13px', marginBottom: '6px', display: 'block' }}>
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111827',
                border: '1px solid #1e2a3a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                marginBottom: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px',
            }}>
              <label style={{ color: '#7a8ba8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#4a7cff' }} />
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
                padding: '14px',
                background: 'linear-gradient(135deg, #4a7cff, #3b5ec9)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Entrar
            </button>
          </form>
        </div>

        {/* Lado direito - Painel azul */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #0c1a3d, #142952)',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(74, 124, 255, 0.15)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            fontSize: '36px',
          }}>
            ✏️
          </div>
          <h2 style={{
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '12px',
          }}>
            Corrija redações com IA
          </h2>
          <p style={{
            color: '#7a8ba8',
            fontSize: '14px',
            lineHeight: '1.6',
            maxWidth: '280px',
          }}>
            Envie redações dos seus alunos e receba correções detalhadas com sugestões de melhoria em segundos.
          </p>

          <div style={{
            display: 'flex',
            gap: '24px',
            marginTop: '32px',
          }}>
            {[
              { num: '500+', label: 'Correções' },
              { num: '50+', label: 'Professores' },
              { num: '98%', label: 'Precisão' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: '#4a7cff', fontSize: '20px', fontWeight: '700' }}>{item.num}</div>
                <div style={{ color: '#7a8ba8', fontSize: '12px', marginTop: '4px' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}