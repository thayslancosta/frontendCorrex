import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getDashboard } from '../services/dashboardService';
import { getUser } from '../services/authService';

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
    { label: 'Total de correções', value: dados.totalCorrecoes ?? 0 },
    { label: 'Alunos ativos',      value: dados.alunosAtivos ?? 0 },
    { label: 'Média geral',        value: Number(dados.mediaGeral ?? 0).toFixed(1) },
    { label: 'Pendentes',          value: dados.pendentes ?? 0 },
  ] : [];

  const recentes = dados?.correcoesRecentes ?? [];

  const labelStatus = (s) => {
    if (s === 'CORRIGIDA') return { label: 'Corrigida', cls: 'badge-success' };
    if (s === 'REVISADA')  return { label: 'Revisada',  cls: 'badge-info' };
    return { label: 'Pendente', cls: 'badge-warning' };
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content">
        <div className="section-header">
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Bem-vindo de volta, {user?.nome ?? 'Professor'}
          </p>
        </div>

        {loading && <p style={{ color: 'var(--text-secondary)', padding: '40px 0' }}>Carregando...</p>}
        {erro    && <p style={{ color: 'var(--error)', padding: '40px 0' }}>{erro}</p>}

        {dados && (
          <>
            <div className="stats-grid">
              {stats.map(({ label, value }) => (
                <div key={label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>{label}</div>
                  <div style={{ fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', margin: 0 }}>Correções recentes</h2>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Ver todas</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Aluno', 'Turma', 'Nota', 'Data', 'Status'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 18px', fontSize: '11px', fontWeight: '500', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentes.map((item, i) => {
                      const st = labelStatus(item.status);
                      return (
                        <tr
                          key={item.id ?? i}
                          style={{ borderBottom: i < recentes.length - 1 ? '1px solid var(--border)' : 'none' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '11px 18px', color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>{item.aluno}</td>
                          <td style={{ padding: '11px 18px', color: 'var(--text-secondary)', fontSize: '13px' }}>{item.turma}</td>
                          <td style={{ padding: '11px 18px', color: 'var(--text-primary)', fontSize: '13px' }}>{item.nota != null ? Number(item.nota).toFixed(1) : '—'}</td>
                          <td style={{ padding: '11px 18px', color: 'var(--text-secondary)', fontSize: '13px' }}>{item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '—'}</td>
                          <td style={{ padding: '11px 18px' }}><span className={`badge ${st.cls}`}>{st.label}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
