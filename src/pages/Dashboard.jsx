import Sidebar from '../components/Sidebar';

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

const stats = [
  { label: 'Total de correções', value: '127', Icon: IconCorrections, accent: '#1a3a7c' },
  { label: 'Alunos ativos', value: '34', Icon: IconStudents, accent: '#0f5a3a' },
  { label: 'Média geral', value: '7.4', Icon: IconAverage, accent: '#7a4a00' },
  { label: 'Pendentes', value: '5', Icon: IconPending, accent: '#7a1a1a' },
];

const recentCorrections = [
  { aluno: 'Maria Silva', turma: 'Inglês B2', nota: 8.5, data: '08/04/2026', status: 'Corrigida' },
  { aluno: 'João Santos', turma: 'Inglês A2', nota: 6.2, data: '07/04/2026', status: 'Corrigida' },
  { aluno: 'Ana Costa', turma: 'Espanhol B1', nota: 9.0, data: '07/04/2026', status: 'Corrigida' },
  { aluno: 'Pedro Lima', turma: 'Inglês B1', nota: null, data: '08/04/2026', status: 'Pendente' },
  { aluno: 'Lucas Oliveira', turma: 'Inglês A2', nota: null, data: '08/04/2026', status: 'Pendente' },
];

export default function Dashboard() {
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
            Bem-vindo de volta, Professor
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
                    key={i}
                    style={{ borderBottom: i < recentCorrections.length - 1 ? `1px solid ${BG_ROW}` : 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#0d1424'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px', color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>{item.aluno}</td>
                    <td style={{ padding: '10px', color: MUTED, fontSize: '12px' }}>{item.turma}</td>
                    <td style={{ padding: '10px', color: item.nota ? '#ffffff' : MUTED, fontSize: '13px', fontWeight: '600' }}>
                      {item.nota ?? '—'}
                    </td>
                    <td style={{ padding: '10px', color: MUTED, fontSize: '12px' }}>{item.data}</td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge badge-${item.status === 'Corrigida' ? 'success' : 'warning'}`}>
                        {item.status}
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
