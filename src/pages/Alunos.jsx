import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAlunos } from '../services/alunoService';

export default function Alunos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [turmaFilter, setTurmaFilter] = useState('Todas as turmas');
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarAlunos = async () => {
      try {
        const dados = await getAlunos();
        console.log('Alunos carregados:', dados);
        
        // Se dados é um objeto com propriedade 'data', usar dados.data
        const alunosArray = Array.isArray(dados) ? dados : (dados?.data || []);
        setAlunos(alunosArray);
        
        if (!alunosArray || alunosArray.length === 0) {
          console.log('Nenhum aluno retornado pela API');
        }
      } catch (err) {
        console.error('Erro ao carregar alunos:', err);
        setErro(err.response?.data?.message || 'Erro ao carregar alunos.');
      } finally {
        setLoading(false);
      }
    };
    
    carregarAlunos();
  }, []);

  const turmas = ['Todas as turmas', ...new Set(alunos.filter(a => a?.nomeTurma).map((a) => a.nomeTurma))];

  const filteredAlunos = alunos.filter((aluno) => {
    if (!aluno?.nome) return false;
    const matchesSearch = (aluno.nome || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTurma = turmaFilter === 'Todas as turmas' || (aluno.nomeTurma === turmaFilter);
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
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0' }}>
            Alunos
          </h1>
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
      </div>
    </div>
  );
}
