import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Revisao() {
  const navigate = useNavigate();
  const [nota, setNota] = useState(7.5);
  const [feedback, setFeedback] = useState('');

  const erros = [
    {
      categoria: 'Grammar',
      erro: 'I like the football very much',
      correcao: 'I like football very much',
    },
    {
      categoria: 'Vocabulary',
      erro: 'I practise it evry week',
      correcao: 'I practice it every week',
    },
    {
      categoria: 'Spelling',
      erro: 'My hobby is play football',
      correcao: 'My hobby is playing football',
    },
  ];

  const getBadgeColor = (categoria) => {
    const colors = {
      Grammar: '#4a7cff',
      Vocabulary: '#f59e0b',
      Spelling: '#ef4444',
    };
    return colors[categoria] || '#7a8ba8';
  };

  const handleSubmit = () => {
    alert('Correção enviada com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#05080f', fontFamily: "'Segoe UI', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
            Revisão
          </h1>
          <p style={{ color: '#7a8ba8', fontSize: '14px' }}>
            Revise e finalize a correção antes de enviar ao aluno
          </p>
        </div>

        {/* Main Card */}
        <div style={{
          background: '#0a0f1a',
          border: '1px solid #1e2a3a',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          {/* Student Info */}
          <div style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}>
            <div>
              <div style={{ color: '#7a8ba8', fontSize: '12px', fontWeight: '500', marginBottom: '4px', textTransform: 'uppercase' }}>
                Aluno
              </div>
              <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600' }}>
                Maria Silva
              </div>
            </div>
            <div>
              <div style={{ color: '#7a8ba8', fontSize: '12px', fontWeight: '500', marginBottom: '4px', textTransform: 'uppercase' }}>
                Turma
              </div>
              <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600' }}>
                Inglês B2
              </div>
            </div>
            <div>
              <div style={{ color: '#7a8ba8', fontSize: '12px', fontWeight: '500', marginBottom: '4px', textTransform: 'uppercase' }}>
                Data
              </div>
              <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600' }}>
                08/04/2026
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderBottom: '1px solid #1e2a3a', margin: '20px 0' }} />

          {/* Final Grade */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Nota Final
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={nota}
              onChange={(e) => setNota(parseFloat(e.target.value))}
              style={{
                width: '120px',
                padding: '12px 16px',
                background: '#111827',
                border: '1px solid #1e2a3a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Feedback TextArea */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Feedback para o Aluno
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Adicione comentários personalizados para o aluno..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px 16px',
                background: '#111827',
                border: '1px solid #1e2a3a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                fontFamily: "'Segoe UI', sans-serif",
                resize: 'vertical',
              }}
            />
          </div>

          {/* Error Summary */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
              Resumo dos Erros
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {erros.map((error, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 16px',
                    background: '#131b2e',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      borderRadius: '16px',
                      fontSize: '10px',
                      fontWeight: '600',
                      background: `${getBadgeColor(error.categoria)}20`,
                      color: getBadgeColor(error.categoria),
                      marginRight: '8px',
                    }}>
                      {error.categoria}
                    </span>
                    <span style={{ color: '#cbd5e1', fontSize: '12px' }}>
                      {error.erro} → <span style={{ color: '#22c55e' }}>{error.correcao}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => navigate('/correcao')}
            style={{
              flex: 1,
              padding: '14px 24px',
              background: 'transparent',
              border: '1px solid #1e2a3a',
              borderRadius: '8px',
              color: '#7a8ba8',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.04)';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#7a8ba8';
            }}
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #4a7cff 0%, #3b5ec9 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            Enviar ao Aluno
          </button>
        </div>
      </div>
    </div>
  );
}
