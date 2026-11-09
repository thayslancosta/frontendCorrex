import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getCriterios, createCriterio, updateCriterio, deleteCriterio } from '../services/criterioService';
import { PageTransition } from '../components/PageTransition';
import { useToast } from '../components/Toast';

export default function Criterios() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [criterios, setCriterios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoPeso, setNovoPeso] = useState('');

  useEffect(() => {
    getCriterios()
      .then((dados) => setCriterios(Array.isArray(dados) ? dados : (dados?.content || dados || [])))
      .catch(() => setErro('Erro ao carregar critérios.'))
      .finally(() => setLoading(false));
  }, []);

  const totalPeso = criterios.reduce((sum, c) => sum + c.peso, 0);

  const handleAdicionarCriterio = async () => {
    if (!novoNome || !novaDescricao || !novoPeso) return;
    try {
      const novo = await createCriterio({ nome: novoNome, descricao: novaDescricao, peso: parseInt(novoPeso) });
      setCriterios((prev) => [...prev, novo]);
      setNovoNome(''); setNovaDescricao(''); setNovoPeso('');
    } catch { addToast('Erro ao adicionar critério.', 'error'); }
  };

  const handleRemoverCriterio = async (id) => {
    try { await deleteCriterio(id); setCriterios((prev) => prev.filter((c) => c.id !== id)); }
    catch { addToast('Erro ao remover critério.', 'error'); }
  };

  const handleAtualizarPeso = async (id, peso) => {
    const criterio = criterios.find((c) => c.id === id);
    if (!criterio) return;
    try {
      const atualizado = await updateCriterio(id, { ...criterio, peso });
      setCriterios((prev) => prev.map((c) => (c.id === id ? atualizado : c)));
    } catch { addToast('Erro ao atualizar peso.', 'error'); }
  };

  const handleToggleAtivo = async (id) => {
    const criterio = criterios.find((c) => c.id === id);
    if (!criterio) return;
    try {
      const atualizado = await updateCriterio(id, { ...criterio, ativo: !criterio.ativo });
      setCriterios((prev) => prev.map((c) => (c.id === id ? atualizado : c)));
    } catch { addToast('Erro ao atualizar critério.', 'error'); }
  };

  const indicadorColor = totalPeso === 100 ? 'var(--success)' : 'var(--warning)';
  const inp = { background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-content">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: '0', marginBottom: '20px' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Voltar
        </button>

        <PageTransition>
          {loading && <p style={{ color: 'var(--text-secondary)', padding: '40px', textAlign: 'center' }}>Carregando critérios...</p>}
        {erro    && <p style={{ color: 'var(--error)', padding: '40px', textAlign: 'center' }}>{erro}</p>}

        <div style={{ marginBottom: '28px' }}>
          <h1>Critérios de avaliação</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Defina os critérios usados pela IA na correção</p>
        </div>

        <div style={{ background: totalPeso === 100 ? 'var(--success-muted)' : 'var(--warning-muted)', border: `1px solid ${indicadorColor}`, borderRadius: '8px', padding: '10px 16px', marginBottom: '24px', fontSize: '13px', fontWeight: '500', color: indicadorColor }}>
          {totalPeso === 100 ? `Os pesos estão corretos (${totalPeso}%)` : `Os pesos somam ${totalPeso}%. O total deve ser 100%.`}
        </div>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '28px' }}>
          {criterios.map((criterio) => (
            <div key={criterio.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px 20px', display: 'grid', gridTemplateColumns: 'auto 1fr 100px auto', gap: '16px', alignItems: 'center' }}>
              <button onClick={() => handleToggleAtivo(criterio.id)} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', background: criterio.ativo ? 'var(--success)' : 'var(--text-tertiary)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', width: '16px', height: '16px', background: 'white', borderRadius: '50%', top: '2px', left: criterio.ativo ? '18px' : '2px', transition: 'left 0.2s' }} />
              </button>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>{criterio.nome}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{criterio.descricao}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="number" min="1" max="100" value={criterio.peso}
                  onChange={(e) => handleAtualizarPeso(criterio.id, parseInt(e.target.value) || 0)}
                  style={{ ...inp, width: '60px', padding: '5px 8px', textAlign: 'center' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
                <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>%</span>
              </div>
              <button onClick={() => handleRemoverCriterio(criterio.id)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-tertiary)', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--error)'; e.currentTarget.style.color = 'var(--error)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}>×</button>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', margin: '0 0 20px 0' }}>Adicionar novo critério</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Nome</label>
              <input type="text" placeholder="Ex: Coesão" value={novoNome} onChange={(e) => setNovoNome(e.target.value)}
                style={{ ...inp, width: '100%', padding: '9px 12px' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Descrição</label>
              <input type="text" placeholder="Ex: Ligação entre ideias e coerência" value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)}
                style={{ ...inp, width: '100%', padding: '9px 12px' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Peso (%)</label>
              <input type="number" min="1" max="100" placeholder="Ex: 20" value={novoPeso} onChange={(e) => setNovoPeso(e.target.value)}
                style={{ ...inp, width: '100px', padding: '9px 12px' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>
            <button onClick={handleAdicionarCriterio}
              style={{ background: 'var(--accent)', border: 'none', color: '#ffffff', padding: '9px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}>
              Adicionar critério
            </button>
          </div>
        </div>
        </PageTransition>
      </div>
    </div>
  );
}
