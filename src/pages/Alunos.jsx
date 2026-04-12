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
    getAlunos()
      .then(setAlunos)
      .catch(() => setErro('Erro ao carregar alunos.'))
      .finally(() => setLoading(false));
  }, []);

  const turmas = ['Todas as turmas', ...new Set(alunos.map((a) => a.nomeTurma))];

  const filteredAlunos = alunos.filter((aluno) => {
    const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTurma = turmaFilter === 'Todas as turmas' || aluno.nomeTurma === turmaFilter;
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

        {loading && <p style={{ color: '#6b7a99', padding: '40px', textAlign: 'center' }}>Carregando alunos...</p>}
        {erro && <p style={{ color: '#ef4444', padding: '40px', textAlign: 'center' }}>{erro}</p>}

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
                  <td style={{ padding: '12px', color: '#6b7a99', fontSize: '14px' }}>{aluno.nomeTurma}</td>
                  <td style={{ padding: '12px', color: '#ffffff', fontSize: '14px' }}>
                    {aluno.mediaGeral != null ? Number(aluno.mediaGeral).toFixed(1) : '—'}
                  </td>
                  <td style={{ padding: '12px', color: '#ffffff', fontSize: '14px' }}>{aluno.totalRedacoes}</td>
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
      </div>
    </div>
  );
}
