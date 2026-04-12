import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getDashboard } from '../services/dashboardService';
import { getUser } from '../services/authService';

const ROYAL = '#1a3a7c';
const BORDER = '#1a2540';
const MUTED = '#6b7a99';
const BG_CARD = '#0a0f1a';
const BG_ROW = '#0d1424';

const IconCorrections = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 4h14M2 8h10M2 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 11l1.5 1.5L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStudents = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 16c0-3.314 2.686-5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 16c0-2.5 1.5-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconAverage = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 14l4-4 3 3 4-5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPending = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);


export default function Dashboard() {
  const user = getUser();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    getDashboard()
      .then(setDados)
      .catch(() => setErro('Erro ao carregar o dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  const stats = dados ? [
    { label: 'Total de correções', value: String(dados.totalCorrecoes),        Icon: IconCorrections, accent: '#1a3a7c' },
    { label: 'Alunos ativos',      value: String(dados.alunosAtivos),          Icon: IconStudents,    accent: '#0f5a3a' },
    { label: 'Média geral',        value: Number(dados.mediaGeral).toFixed(1), Icon: IconAverage,     accent: '#7a4a00' },
    { label: 'Pendentes',          value: String(dados.correcoesPendentes),    Icon: IconPending,     accent: '#7a1a1a' },
  ] : [];

  const recentCorrections = dados?.correcoesRecentes ?? [];

  const formatarData = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  const labelStatus = (status) => {
    if (status === 'CORRIGIDA') return 'Corrigida';
    if (status === 'PENDENTE')  return 'Pendente';
    return 'Em correção';
  };

  if (loading) return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a99' }}>
        Carregando...
      </div>
    </div>
  );

  if (erro) return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
        {erro}
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="page-content">
        {/* Header */}
        <div className="section-header">
          <h1 style={{ color: '#ffffff', marginBottom: '4px' }}>
            Dashboard
          </h1>
          <p style={{ color: MUTED }}>
            Bem-vindo de volta, {user?.nome ?? 'Professor'}
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="stats-grid">
          {stats.map(({ label, value, Icon, accent }) => (
            <div key={label} className="card-wrapper" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ color: MUTED, fontSize: '12px' }}>{label}</span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: `${accent}55`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: accent === '#1a3a7c' ? '#6a9fff' : accent === '#0f5a3a' ? '#22c55e' : accent === '#7a4a00' ? '#f59e0b' : '#ef4444',
                  flexShrink: 0,
                }}>
                  <Icon />
                </div>
              </div>
              <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabela */}
        <div className="card-wrapper" style={{ padding: '12px' }}>
          <div className="card-header">
            <h2 style={{ color: '#ffffff', marginBottom: '0' }}>
              Correções recentes
            </h2>
            <a href="#" style={{
              fontSize: '12px',
              color: '#4a7cff',
              padding: '4px 10px',
              border: '1px solid #1a3a7c',
              borderRadius: '6px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              Ver todas
            </a>
          </div>

          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Aluno', 'Turma', 'Nota', 'Data', 'Status'].map((h) => (
                    <th key={h} style={{
                      color: MUTED,
                      fontSize: '11px',
                      fontWeight: '500',
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderBottom: `1px solid ${BORDER}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentCorrections.map((item, i) => (
                  <tr
                    key={item.id ?? i}
                    style={{ borderBottom: i < recentCorrections.length - 1 ? `1px solid ${BG_ROW}` : 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#0d1424'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px', color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>{item.nomeAluno}</td>
                    <td style={{ padding: '10px', color: MUTED, fontSize: '12px' }}>{item.nomeTurma}</td>
                    <td style={{ padding: '10px', color: item.notaFinal != null ? '#ffffff' : MUTED, fontSize: '13px', fontWeight: '600' }}>
                      {item.notaFinal != null ? Number(item.notaFinal).toFixed(1) : '—'}
                    </td>
                    <td style={{ padding: '10px', color: MUTED, fontSize: '12px' }}>{formatarData(item.dataEnvio)}</td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge badge-${item.status === 'CORRIGIDA' ? 'success' : 'warning'}`}>
                        {labelStatus(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
