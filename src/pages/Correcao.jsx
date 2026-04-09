import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Correcao() {
  const navigate = useNavigate();

  const erros = [
    {
      categoria: 'Grammar',
      erro: 'My hobby is play football',
      correcao: 'My hobby is playing football',
    },
    {
      categoria: 'Vocabulary',
      erro: 'I like the football very much',
      correcao: 'I like football very much',
    },
    {
      categoria: 'Spelling',
      erro: 'I practise it evry week',
      correcao: 'I practice it every week',
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

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="page-content">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
            Correção
          </h1>
          <p style={{ color: '#7a8ba8', fontSize: '14px' }}>
            Resultado da análise da redação
          </p>
        </div>

        {/* Two Columns */}
        <div className="split-columns">
          {/* Left Column - Original Text */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: '#0a0f1a',
              border: '1px solid #1e2a3a',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <h2 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
                Redação Original
              </h2>
              <div style={{ color: '#c9d1d9', lineHeight: '1.8', fontSize: '14px' }}>
                <p>
                  My favorite hobby is playing football.{' '}
                  <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                    I like the football very much
                  </span>
                  . Every week I play with my friends in the park. {' '}
                  <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                    I practise it evry week
                  </span>
                  . This sport helps me to stay healthy and happy. It is very important for me.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - AI Analysis */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: '#0a0f1a',
              border: '1px solid #1e2a3a',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <h2 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>
                Análise da IA
              </h2>

              {/* Score */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  color: '#4a7cff',
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '16px',
                }}>
                  7.5 / 10
                </div>

                {/* Progress Bar */}
                <div style={{
                  background: '#1e2a3a',
                  height: '8px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    background: '#4a7cff',
                    height: '100%',
                    width: '75%',
                    borderRadius: '4px',
                  }} />
                </div>
              </div>

              {/* Errors Found */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Erros Encontrados
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {erros.map((error, i) => (
                    <div key={i} style={{ borderBottom: i < erros.length - 1 ? '1px solid #1e2a3a' : 'none', paddingBottom: '16px' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: `${getBadgeColor(error.categoria)}20`,
                          color: getBadgeColor(error.categoria),
                          marginBottom: '8px',
                        }}>
                          {error.categoria}
                        </span>
                      </div>
                      <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '4px' }}>
                        ✗ {error.erro}
                      </div>
                      <div style={{ color: '#22c55e', fontSize: '13px' }}>
                        ✓ {error.correcao}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Comment */}
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Comentário Geral
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>
                  Ótima redação! Você demonstra boa compreensão do vocabulário e estrutura de frases. Trabalhe nos tempos verbais e preposições. Continue praticando e sua nota melhorará significativamente. Sua criatividade na escrita é evidente!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/revisao')}
          style={{
            width: '100%',
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
          Finalizar Revisão
        </button>
      </div>
    </div>
  );
}
