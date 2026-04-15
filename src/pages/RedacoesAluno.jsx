import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function RedacoesAluno() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alunoId, alunoNome } = location.state || {};

  const [redacoes, setRedacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!alunoId) { setErro('Aluno não identificado.'); setLoading(false); return; }
    api.get(`/redacoes/aluno/${alunoId}`)
      .then(({ data }) => setRedacoes(Array.isArray(data) ? data : (data?.content || [])))
      .catch(() => setErro('Erro ao carregar redações.'))
      .finally(() => setLoading(false));
  }, [alunoId]);

  const labelStatus = (s) => {
    if (s === 'CORRIGIDA') return { label: 'Corrigida', color: '#34d399', bg: 'rgba(52,211,153,0.1)' };
    if (s === 'REVISADA')  return { label: 'Revisada',  color: '#4a7cff', bg: 'rgba(74,124,255,0.1)' };
    return { label: 'Pendente', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content">
        <button
          onClick={() => navigate(-1)}
          style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:'none', color:'var(--text-secondary)', fontSize:'13px', cursor:'pointer', padding:'0', marginBottom:'20px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            Redações de {alunoNome || 'Aluno'}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>
            Histórico de redações enviadas
          </p>
        </div>

        {loading && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>Carregando...</p>}
        {erro    && <p style={{ color: 'var(--error)', textAlign: 'center', padding: '40px' }}>{erro}</p>}

        {!loading && !erro && redacoes.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>Nenhuma redação encontrada.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {redacoes.map((r) => {
            const st = labelStatus(r.status);
            return (
              <div key={r.id} style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '15px' }}>
                      Redação #{r.id}
                    </span>
                    <span style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}`, padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      {st.label}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {r.idioma === 'en' ? 'Inglês' : r.idioma === 'es' ? 'Espanhol' : r.idioma}
                    {r.nota != null && <span style={{ marginLeft: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>Nota: {Number(r.nota).toFixed(1)}</span>}
                  </div>
                </div>
                {r.status !== 'PENDENTE' && (
                  <button
                    onClick={() => navigate('/correcao', { state: { redacaoId: r.id } })}
                    style={{ background: 'var(--accent)', border: 'none', color: 'var(--text-primary)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
                  >
                    Ver correção
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
