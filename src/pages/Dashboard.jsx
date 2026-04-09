import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const stats = [
    { label: 'Total de Correções', value: '127', icon: '✍️', color: '#4a7cff' },
    { label: 'Alunos Ativos', value: '34', icon: '👥', color: '#22c55e' },
    { label: 'Média Geral', value: '7.4', icon: '📈', color: '#f59e0b' },
    { label: 'Pendentes', value: '5', icon: '⏳', color: '#ef4444' },
  ];

  const recentCorrections = [
    { aluno: 'Maria Silva', turma: 'Inglês B2', nota: 8.5, data: '08/04/2026', status: 'Corrigida' },
    { aluno: 'João Santos', turma: 'Inglês A2', nota: 6.2, data: '07/04/2026', status: 'Corrigida' },
    { aluno: 'Ana Costa', turma: 'Espanhol B1', nota: 9.0, data: '07/04/2026', status: 'Corrigida' },
    { aluno: 'Pedro Lima', turma: 'Inglês B1', nota: null, data: '08/04/2026', status: 'Pendente' },
    { aluno: 'Lucas Oliveira', turma: 'Inglês A2', nota: null, data: '08/04/2026', status: 'Pendente' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#05080f', fontFamily: "'Segoe UI', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
            Dashboard
          </h1>
          <p style={{ color: '#7a8ba8', fontSize: '14px' }}>
            Bem-vindo de volta, Professor!
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: '#0a0f1a',
              border: '1px solid #1e2a3a',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ color: '#7a8ba8', fontSize: '13px' }}>{stat.label}</span>
                <span style={{ fontSize: '20px' }}>{stat.icon}</span>
              </div>
              <div style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabela de correções recentes */}
        <div style={{
          background: '#0a0f1a',
          border: '1px solid #1e2a3a',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <h2 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            Correções Recentes
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Aluno', 'Turma', 'Nota', 'Data', 'Status'].map((header) => (
                  <th key={header} style={{
                    color: '#7a8ba8',
                    fontSize: '12px',
                    fontWeight: '500',
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderBottom: '1px solid #1e2a3a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentCorrections.map((item, i) => (
                <tr key={i} style={{ borderBottom: i < recentCorrections.length - 1 ? '1px solid #131b2e' : 'none' }}>
                  <td style={{ padding: '14px 16px', color: '#ffffff', fontSize: '14px' }}>{item.aluno}</td>
                  <td style={{ padding: '14px 16px', color: '#7a8ba8', fontSize: '14px' }}>{item.turma}</td>
                  <td style={{ padding: '14px 16px', color: item.nota ? '#ffffff' : '#7a8ba8', fontSize: '14px', fontWeight: '600' }}>
                    {item.nota ?? '—'}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#7a8ba8', fontSize: '14px' }}>{item.data}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: item.status === 'Corrigida' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      color: item.status === 'Corrigida' ? '#22c55e' : '#f59e0b',
                    }}>
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
  );
}
