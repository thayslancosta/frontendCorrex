import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getTurmas, createTurma } from '../services/turmaService';

export default function Turmas() {
  const navigate = useNavigate();
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [criando, setCriando] = useState(false);
  const [nomaNova, setNomaNova] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getTurmas()
      .then((dados) => {
        const lista = Array.isArray(dados) ? dados : (dados?.content || dados || []);
        setTurmas(lista);
      })
      .catch(() => setErro('Erro ao carregar turmas.'))
      .finally(() => setLoading(false));
  }, []);

  const handleCriarTurma = async () => {
    if (!nomaNova.trim()) return;
    setCriando(true);
    try {
      const nova = await createTurma({ nome: nomaNova.trim() });
      setTurmas((prev) => [...prev, nova]);
      setNomaNova('');
      setShowForm(false);
    } catch {
      alert('Erro ao criar turma. Tente novamente.');
    } finally {
      setCriando(false);
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
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer',
            padding: '0',
            marginBottom: '20px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Turmas
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>
              Gerencie suas turmas e alunos
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              background: 'var(--accent)',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            {showForm ? 'Cancelar' : 'Nova turma'}
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'var(--bg-base)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
          }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
                Nome da turma
              </label>
              <input
                type="text"
                placeholder="Ex: Inglês C1"
                value={nomaNova}
                onChange={(e) => setNomaNova(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCriarTurma()}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              />
            </div>
            <button
              onClick={handleCriarTurma}
              disabled={criando || !nomaNova.trim()}
              style={{
                background: criando ? '#0f2252' : 'var(--accent)',
                border: 'none',
                color: 'var(--text-primary)',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: criando ? 'not-allowed' : 'pointer',
                opacity: criando ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {criando ? 'Criando...' : 'Criar turma'}
            </button>
          </div>
        )}

        {loading && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>Carregando turmas...</p>}
        {erro && <p style={{ color: 'var(--error)', textAlign: 'center', padding: '40px' }}>{erro}</p>}
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
                background: 'var(--bg-base)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {/* Header do Card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                    {turma.nome}
                  </h3>
                </div>
                <span
                  style={{
                    background: turma.ativa ? 'rgba(52, 211, 153, 0.12)' : 'rgba(107, 122, 153, 0.12)',
                    color: turma.ativa ? 'var(--success)' : 'var(--text-secondary)',
                    border: `1px solid ${turma.ativa ? 'var(--success)' : 'var(--text-secondary)'}`,
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
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 4px 0' }}>Alunos</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-link)' }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', margin: '0' }}>
                      {turma.totalAlunos}
                    </p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 4px 0' }}>Média geral</p>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', margin: '0' }}>
                    {turma.mediaGeral != null ? Number(turma.mediaGeral).toFixed(1) : '—'}
                  </p>
                </div>
              </div>

              {/* Botão */}
              <button
                onClick={() => navigate('/alunos')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--text-link)',
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
