import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Turmas() {
  const navigate = useNavigate();

  const turmas = [
    { id: 1, nome: 'Inglês A2', alunos: 12, media: 7.1, ativa: true },
    { id: 2, nome: 'Inglês B1', alunos: 9, media: 7.8, ativa: true },
    { id: 3, nome: 'Inglês B2', alunos: 15, media: 8.2, ativa: true },
    { id: 4, nome: 'Espanhol B1', alunos: 8, media: 6.9, ativa: false },
  ];

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0' }}>
              Turmas
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7a99', margin: '0' }}>
              Gerencie suas turmas e alunos
            </p>
          </div>
          <button
            onClick={() => navigate('/turmas/nova')}
            style={{
              background: '#1a3a7c',
              border: 'none',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2547a3'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1a3a7c'}
          >
            Nova turma
          </button>
        </div>

        {/* Grid de Turmas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {turmas.map((turma) => (
            <div
              key={turma.id}
              style={{
                background: '#0a0f1a',
                border: '1px solid #1a2540',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1a2540'}
            >
              {/* Header do Card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' }}>
                    {turma.nome}
                  </h3>
                </div>
                <span
                  style={{
                    background: turma.ativa ? 'rgba(52, 211, 153, 0.12)' : 'rgba(107, 122, 153, 0.12)',
                    color: turma.ativa ? '#34d399' : '#6b7a99',
                    border: `1px solid ${turma.ativa ? '#34d399' : '#6b7a99'}`,
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                >
                  {turma.ativa ? 'Ativa' : 'Inativa'}
                </span>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 4px 0' }}>Alunos</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#4a7cff' }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '0' }}>
                      {turma.alunos}
                    </p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 4px 0' }}>Média geral</p>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '0' }}>
                    {turma.media.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Botão */}
              <button
                onClick={() => navigate('/alunos')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid #1a3a7c',
                  color: '#4a7cff',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 58, 124, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Ver alunos
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
