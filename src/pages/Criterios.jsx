import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Criterios() {
  const navigate = useNavigate();
  const [criterios, setCriterios] = useState([
    { id: 1, nome: 'Gramática', descricao: 'Uso correto de tempos verbais, concordância e estrutura frasal', peso: 30, ativo: true },
    { id: 2, nome: 'Vocabulário', descricao: 'Variedade e adequação do vocabulário utilizado', peso: 25, ativo: true },
    { id: 3, nome: 'Coerência', descricao: 'Lógica e clareza na organização das ideias', peso: 25, ativo: true },
    { id: 4, nome: 'Ortografia', descricao: 'Grafia correta das palavras', peso: 20, ativo: true },
  ]);

  const [novoNome, setNovoNome] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoPeso, setNovoPeso] = useState('');

  const totalPeso = criterios.reduce((sum, c) => sum + c.peso, 0);

  const handleAdicionarCriterio = () => {
    if (novoNome && novaDescricao && novoPeso) {
      const novoCriterio = {
        id: Math.max(...criterios.map((c) => c.id), 0) + 1,
        nome: novoNome,
        descricao: novaDescricao,
        peso: parseInt(novoPeso),
        ativo: true,
      };
      setCriterios([...criterios, novoCriterio]);
      setNovoNome('');
      setNovaDescricao('');
      setNovoPeso('');
    }
  };

  const handleRemoverCriterio = (id) => {
    setCriterios(criterios.filter((c) => c.id !== id));
  };

  const handleAtualizarPeso = (id, novoPeso) => {
    setCriterios(
      criterios.map((c) => (c.id === id ? { ...c, peso: novoPeso } : c))
    );
  };

  const handleToggleAtivo = (id) => {
    setCriterios(
      criterios.map((c) => (c.id === id ? { ...c, ativo: !c.ativo } : c))
    );
  };

  const indicadorColor = totalPeso === 100 ? '#34d399' : '#f59e0b';
  const indicadorLabel = totalPeso === 100 ? `Os pesos estão corretos (${totalPeso}%)` : `Os pesos somam ${totalPeso}%. O total deve ser 100%.`;

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
            Critérios de avaliação
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7a99', margin: '0' }}>
            Defina os critérios usados pela IA na correção
          </p>
        </div>

        {/* Indicador de Peso */}
        <div
          style={{
            background: totalPeso === 100 ? 'rgba(52, 211, 153, 0.08)' : 'rgba(245, 158, 11, 0.08)',
            border: `1px solid ${indicadorColor}`,
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            color: indicadorColor,
          }}
        >
          {indicadorLabel}
        </div>

        {/* Lista de Critérios */}
        <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
          {criterios.map((criterio) => (
            <div
              key={criterio.id}
              style={{
                background: '#0a0f1a',
                border: '1px solid #1a2540',
                borderRadius: '12px',
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 100px auto auto',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              {/* Toggle */}
              <button
                onClick={() => handleToggleAtivo(criterio.id)}
                style={{
                  width: '40px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: criterio.ativo ? '#34d399' : '#6b7a99',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
                title={criterio.ativo ? 'Desativar' : 'Ativar'}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: '#ffffff',
                    borderRadius: '50%',
                    top: '2px',
                    left: criterio.ativo ? '18px' : '2px',
                    transition: 'left 0.2s',
                  }}
                />
              </button>

              {/* Informações */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' }}>
                  {criterio.nome}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7a99', margin: '0' }}>
                  {criterio.descricao}
                </p>
              </div>

              {/* Peso */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={criterio.peso}
                  onChange={(e) => handleAtualizarPeso(criterio.id, parseInt(e.target.value) || 0)}
                  style={{
                    width: '60px',
                    background: '#0d1424',
                    border: '1px solid #1a2540',
                    color: '#ffffff',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
                />
                <span style={{ color: '#6b7a99', fontSize: '14px' }}>%</span>
              </div>

              {/* Botão Remover */}
              <button
                onClick={() => handleRemoverCriterio(criterio.id)}
                style={{
                  background: 'transparent',
                  border: '1px solid #ff6b6b',
                  color: '#ff6b6b',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  fontSize: '16px',
                  fontWeight: '700',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Formulário Adicionar */}
        <div
          style={{
            background: '#0a0f1a',
            border: '1px solid #1a2540',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 20px 0' }}>
            Adicionar novo critério
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            {/* Nome */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7a99', marginBottom: '6px', fontWeight: '600' }}>
                Nome
              </label>
              <input
                type="text"
                placeholder="Ex: Coesão"
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
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
              />
            </div>

            {/* Descrição */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7a99', marginBottom: '6px', fontWeight: '600' }}>
                Descrição
              </label>
              <input
                type="text"
                placeholder="Ex: Ligação entre ideias e coerência entre parágrafos"
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
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
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            {/* Peso */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7a99', marginBottom: '6px', fontWeight: '600' }}>
                Peso (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                placeholder="Ex: 20"
                value={novoPeso}
                onChange={(e) => setNovoPeso(e.target.value)}
                style={{
                  width: '100px',
                  background: '#0d1424',
                  border: '1px solid #1a2540',
                  color: '#ffffff',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#1a2540'}
              />
            </div>

            {/* Botão Adicionar */}
            <button
              onClick={handleAdicionarCriterio}
              style={{
                background: '#1a3a7c',
                border: 'none',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2547a3'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1a3a7c'}
            >
              Adicionar critério
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
