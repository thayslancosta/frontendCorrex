import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAlunos } from '../services/alunoService';
import api from '../services/api';
import { getTurmas } from '../services/turmaService';

export default function Alunos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [turmaFilter, setTurmaFilter] = useState('Todas as turmas');
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [turmasSelect, setTurmasSelect] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaTurmaId, setNovaTurmaId] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erroModal, setErroModal] = useState('');

  useEffect(() => {
    const carregarAlunos = async () => {
      try {
        const dados = await getAlunos();
        const alunosArray = Array.isArray(dados) ? dados : (dados?.content || []);
        setAlunos(alunosArray);
      } catch (err) {
        setErro(err.response?.data?.message || 'Erro ao carregar alunos.');
      } finally {
        setLoading(false);
      }
    };
    
    carregarAlunos();
  }, []);

  useEffect(() => {
    getTurmas()
      .then(setTurmasSelect)
      .catch(() => {});
  }, []);

  const handleCriarAluno = async () => {
    if (!novoNome.trim() || !novaTurmaId) {
      setErroModal('Nome e turma são obrigatórios.');
      return;
    }
    setSalvando(true);
    setErroModal('');
    try {
      const { data } = await api.post('/alunos', {
        nome: novoNome.trim(),
        email: novoEmail.trim() || undefined,
        turmaId: parseInt(novaTurmaId),
      });
      setAlunos((prev) => [...prev, data]);
      setShowModal(false);
      setNovoNome('');
      setNovoEmail('');
      setNovaTurmaId('');
    } catch {
      setErroModal('Erro ao cadastrar aluno. Verifique os dados.');
    } finally {
      setSalvando(false);
    }
  };

  const turmas = ['Todas as turmas', ...new Set(alunos.filter(a => a?.turma).map((a) => a.turma))];

  const filteredAlunos = alunos.filter((aluno) => {
    if (!aluno?.nome) return false;
    const matchesSearch = (aluno.nome || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTurma = turmaFilter === 'Todas as turmas' || (aluno.turma === turmaFilter);
    return matchesSearch && matchesTurma;
  });

  const formatarData = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  const getInitials = (nome) => {
    const parts = nome.split(' ');
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', margin: '0' }}>
              Alunos
            </h1>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: '#1a3a7c',
                border: 'none',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2547a3'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1a3a7c'}
            >
              + Novo aluno
            </button>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7a99', margin: '0 0 24px 0' }}>
            Busque e gerencie seus alunos
          </p>

          {/* Search e Filter */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            {/* Search Input */}
            <div style={{ flex: 1, position: 'relative' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7a99"
                strokeWidth="2"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Buscar aluno pelo nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0d1424',
                  border: '1px solid #1a2540',
                  color: '#ffffff',
                  padding: '10px 12px 10px 40px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
              />
            </div>

            {/* Filter Select */}
            <select
              value={turmaFilter}
              onChange={(e) => setTurmaFilter(e.target.value)}
              style={{
                background: '#0d1424',
                border: '1px solid #1a2540',
                color: '#ffffff',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                minWidth: '180px',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
            >
              {turmas.map((turma) => (
                <option key={turma} value={turma}>
                  {turma}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            color: '#6b7a99',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #1a2540',
                borderTop: '3px solid #4a7cff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px',
              }}></div>
              <p style={{ margin: 0 }}>Carregando alunos...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        )}

        {erro && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            color: '#ef4444',
            padding: '40px',
            textAlign: 'center',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '16px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Erro ao carregar</p>
            <p style={{ margin: '0', fontSize: '14px', color: '#ef4444' }}>{erro}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !erro && (
          <>
            {/* Tabela de Alunos */}
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  borderSpacing: '0',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid #1a2540',
                      backgroundColor: '#0a0f1a',
                    }}
                  >
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7a99' }}>Nome</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7a99' }}>Turma</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7a99' }}>Média</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7a99' }}>Redações</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7a99' }}>Última atividade</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7a99' }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlunos.map((aluno, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: '1px solid #1a2540',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(26, 58, 124, 0.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '12px', color: '#ffffff', fontSize: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: '#1a3a7c',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '700',
                              color: '#4a7cff',
                            }}
                          >
                            {getInitials(aluno.nome)}
                          </div>
                          {aluno.nome}
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#6b7a99', fontSize: '14px' }}>{aluno.nomeTurma || '—'}</td>
                      <td style={{ padding: '12px', color: '#ffffff', fontSize: '14px' }}>
                        {aluno.mediaGeral != null ? Number(aluno.mediaGeral).toFixed(1) : '—'}
                      </td>
                      <td style={{ padding: '12px', color: '#ffffff', fontSize: '14px' }}>{aluno.totalRedacoes || 0}</td>
                      <td style={{ padding: '12px', color: '#6b7a99', fontSize: '14px' }}>{formatarData(aluno.ultimaAtividade)}</td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => navigate('/redacoes-aluno', { state: { alunoId: aluno.id, alunoNome: aluno.nome } })}
                          style={{
                            background: 'transparent',
                            border: '1px solid #1a3a7c',
                            color: '#4a7cff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
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
                          Ver redações
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAlunos.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7a99' }}>
                Nenhum aluno encontrado.
              </div>
            )}
          </>
        )}
        {/* Modal Novo Aluno */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <div
              style={{
                background: '#0a0f1a',
                border: '1px solid #1a2540',
                borderRadius: '16px',
                padding: '32px',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              }}
            >
              {/* Header do Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700', margin: 0 }}>
                  Novo aluno
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6b7a99',
                    fontSize: '20px',
                    cursor: 'pointer',
                    lineHeight: 1,
                    padding: '4px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6b7a99'}
                >
                  ×
                </button>
              </div>

              {/* Erro do Modal */}
              {erroModal && (
                <div style={{
                  background: 'rgba(255,107,107,0.08)',
                  border: '1px solid #ff6b6b',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  color: '#ff6b6b',
                  fontSize: '13px',
                }}>
                  {erroModal}
                </div>
              )}

              {/* Campo Nome */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7a99', marginBottom: '6px', fontWeight: '600' }}>
                  Nome *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0d1424',
                    border: '1px solid #1a2540',
                    color: '#ffffff',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
                />
              </div>

              {/* Campo Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7a99', marginBottom: '6px', fontWeight: '600' }}>
                  Email <span style={{ fontWeight: '400', color: '#4a5568' }}>(opcional)</span>
                </label>
                <input
                  type="email"
                  placeholder="Ex: maria@email.com"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0d1424',
                    border: '1px solid #1a2540',
                    color: '#ffffff',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
                />
              </div>

              {/* Campo Turma */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7a99', marginBottom: '6px', fontWeight: '600' }}>
                  Turma *
                </label>
                <select
                  value={novaTurmaId}
                  onChange={(e) => setNovaTurmaId(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0d1424',
                    border: '1px solid #1a2540',
                    color: novaTurmaId ? '#ffffff' : '#6b7a99',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
                >
                  <option value="">Selecione uma turma</option>
                  {turmasSelect.map((t) => (
                    <option key={t.id} value={String(t.id)}>{t.nome}</option>
                  ))}
                </select>
              </div>

              {/* Botões */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '11px',
                    background: 'transparent',
                    border: '1px solid #1a2540',
                    borderRadius: '8px',
                    color: '#6b7a99',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2a3a5a'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a2540'; e.currentTarget.style.color = '#6b7a99'; }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCriarAluno}
                  disabled={salvando}
                  style={{
                    flex: 1,
                    padding: '11px',
                    background: salvando ? '#0f2252' : '#1a3a7c',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: salvando ? 'not-allowed' : 'pointer',
                    opacity: salvando ? 0.7 : 1,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { if (!salvando) e.currentTarget.style.background = '#2547a3'; }}
                  onMouseLeave={(e) => { if (!salvando) e.currentTarget.style.background = '#1a3a7c'; }}
                >
                  {salvando ? 'Cadastrando...' : 'Cadastrar aluno'}
                </button>
              </div>
            </div>
          </div>
        )}      </div>
    </div>
  );
}
