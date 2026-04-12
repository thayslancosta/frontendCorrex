import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getTurmas } from '../services/turmaService';
import { getAlunos } from '../services/alunoService';
import { enviarRedacaoTexto, enviarRedacaoArquivo } from '../services/redacaoService';
import api from '../services/api';

const ROYAL = '#1a3a7c';
const BORDER = '#1a2540';
const MUTED = '#6b7a99';
const BG_CARD = '#0a0f1a';
const BG_INPUT = '#0d1424';

const IconFile = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M9 4h12l8 8v20a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#4a7cff" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M21 4v8h8" stroke="#4a7cff" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M18 20v-7M15 16l3-3 3 3" stroke="#4a7cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFileSmall = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 1h6l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const IconRemove = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Upload() {
  const navigate = useNavigate();
  const [modoEntrada, setModoEntrada] = useState('arquivo');
  const [turma, setTurma] = useState('');
  const [idioma, setIdioma] = useState('');
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [rawFiles, setRawFiles] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState('');
  const [showNovoAluno, setShowNovoAluno] = useState(false);
  const [novoAlunoNome, setNovoAlunoNome] = useState('');
  const [novoAlunoEmail, setNovoAlunoEmail] = useState('');
  const [novoAlunoTurmaId, setNovoAlunoTurmaId] = useState('');
  const [criandoAluno, setCriandoAluno] = useState(false);
  const [erroAluno, setErroAluno] = useState('');

  useEffect(() => {
    getTurmas().then(setTurmas).catch(() => {});
    getAlunos()
      .then((data) => {
        const lista = Array.isArray(data) ? data : (data.content ?? []);
        setAlunos(lista);
      })
      .catch(() => {});
  }, []);

  const handleCriarAluno = async () => {
    if (!novoAlunoNome.trim() || !novoAlunoTurmaId) {
      setErroAluno('Nome e turma são obrigatórios.');
      return;
    }
    setCriandoAluno(true);
    setErroAluno('');
    try {
      const { data } = await api.post('/alunos', {
        nome: novoAlunoNome.trim(),
        email: novoAlunoEmail.trim() || undefined,
        turmaId: parseInt(novoAlunoTurmaId),
      });
      setAlunos((prev) => [...prev, data]);
      setAlunoId(String(data.id));
      setShowNovoAluno(false);
      setNovoAlunoNome('');
      setNovoAlunoEmail('');
      setNovoAlunoTurmaId('');
    } catch {
      setErroAluno('Erro ao criar aluno. Verifique os dados.');
    } finally {
      setCriandoAluno(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const newRaw = Array.from(e.dataTransfer.files);
      setRawFiles((prev) => [...prev, ...newRaw]);
      setFiles((prev) => [...prev, ...newRaw.map((f) => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB' }))]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      const newRaw = Array.from(e.target.files);
      setRawFiles((prev) => [...prev, ...newRaw]);
      setFiles((prev) => [...prev, ...newRaw.map((f) => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB' }))]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setRawFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const selectStyle = {
    width: '100%',
    padding: '11px 14px',
    background: BG_INPUT,
    border: `1px solid ${BORDER}`,
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="page-content">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '600', marginBottom: '4px' }}>
            Nova correção
          </h1>
          <p style={{ color: MUTED, fontSize: '14px' }}>
            Envie redações para correção automática com IA
          </p>
        </div>

        {/* Selects */}
        <div className="form-grid" style={{ marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '7px' }}>
              Turma
            </label>
            <select value={turma} onChange={(e) => setTurma(e.target.value)} style={selectStyle}>
              <option value="">Selecione uma turma</option>
              {turmas.map((t) => (
                <option key={t.id} value={String(t.id)}>{t.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '7px' }}>
              Idioma da redação
            </label>
            <select value={idioma} onChange={(e) => setIdioma(e.target.value)} style={selectStyle}>
              <option value="">Selecione um idioma</option>
              <option value="en">Inglês</option>
              <option value="es">Espanhol</option>
              <option value="fr">Francês</option>
            </select>
          </div>
        </div>

        {/* Seleção de Aluno */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '7px', fontWeight: '600' }}>
            Aluno
          </label>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select
              value={alunoId}
              onChange={(e) => setAlunoId(e.target.value)}
              style={{ ...selectStyle, flex: 1 }}
            >
              <option value="">Selecione um aluno</option>
              {alunos.map((a) => (
                <option key={a.id} value={String(a.id)}>{a.nome} — {a.nomeTurma}</option>
              ))}
            </select>

            <button
              onClick={() => { setShowNovoAluno((v) => !v); setErroAluno(''); }}
              style={{
                background: 'transparent',
                border: `1px solid ${BORDER}`,
                color: '#4a7cff',
                padding: '11px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1a3a7c'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = BORDER}
            >
              {showNovoAluno ? 'Cancelar' : '+ Novo aluno'}
            </button>
          </div>

          {/* Mini-formulário de criação de aluno */}
          {showNovoAluno && (
            <div style={{
              marginTop: '12px',
              background: '#0a0f1a',
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '20px',
            }}>
              <p style={{ color: '#9aaac4', fontSize: '13px', fontWeight: '600', margin: '0 0 16px 0' }}>
                Criar novo aluno
              </p>

              {erroAluno && (
                <div style={{
                  background: 'rgba(255,107,107,0.08)',
                  border: '1px solid #ff6b6b',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginBottom: '12px',
                  color: '#ff6b6b',
                  fontSize: '13px',
                }}>
                  {erroAluno}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: '#9aaac4', fontSize: '12px', marginBottom: '5px' }}>Nome *</label>
                  <input
                    type="text"
                    placeholder="Ex: Maria Silva"
                    value={novoAlunoNome}
                    onChange={(e) => setNovoAlunoNome(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: BG_INPUT,
                      border: `1px solid ${BORDER}`,
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = ROYAL}
                    onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#9aaac4', fontSize: '12px', marginBottom: '5px' }}>Email (opcional)</label>
                  <input
                    type="email"
                    placeholder="Ex: maria@email.com"
                    value={novoAlunoEmail}
                    onChange={(e) => setNovoAlunoEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: BG_INPUT,
                      border: `1px solid ${BORDER}`,
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = ROYAL}
                    onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: '#9aaac4', fontSize: '12px', marginBottom: '5px' }}>Turma *</label>
                  <select
                    value={novoAlunoTurmaId}
                    onChange={(e) => setNovoAlunoTurmaId(e.target.value)}
                    style={{ ...selectStyle }}
                  >
                    <option value="">Selecione uma turma</option>
                    {turmas.map((t) => (
                      <option key={t.id} value={String(t.id)}>{t.nome}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleCriarAluno}
                  disabled={criandoAluno}
                  style={{
                    background: criandoAluno ? '#0f2252' : ROYAL,
                    border: 'none',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: criandoAluno ? 'not-allowed' : 'pointer',
                    opacity: criandoAluno ? 0.7 : 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {criandoAluno ? 'Criando...' : 'Criar aluno'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0',
          border: `1px solid ${BORDER}`,
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '24px',
          width: 'fit-content',
        }}>
          <button
            onClick={() => setModoEntrada('arquivo')}
            style={{
              background: modoEntrada === 'arquivo' ? ROYAL : BG_CARD,
              color: modoEntrada === 'arquivo' ? '#ffffff' : MUTED,
              border: 'none',
              padding: '10px 20px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.15s',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              if (modoEntrada !== 'arquivo') e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={(e) => {
              if (modoEntrada !== 'arquivo') e.currentTarget.style.background = BG_CARD;
            }}
          >
            Enviar arquivo
          </button>
          <button
            onClick={() => setModoEntrada('texto')}
            style={{
              background: modoEntrada === 'texto' ? ROYAL : BG_CARD,
              color: modoEntrada === 'texto' ? '#ffffff' : MUTED,
              border: 'none',
              padding: '10px 20px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.15s',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              if (modoEntrada !== 'texto') e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={(e) => {
              if (modoEntrada !== 'texto') e.currentTarget.style.background = BG_CARD;
            }}
          >
            Digitar redação
          </button>
        </div>

        {modoEntrada === 'arquivo' && (
          <>
        {/* Drag and Drop */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? '#4a7cff' : BORDER}`,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            background: dragActive ? 'rgba(74,124,255,0.05)' : 'transparent',
            transition: 'border-color 0.2s, background 0.2s',
            marginBottom: '24px',
            cursor: 'pointer',
          }}
        >
          <input
            type="file"
            id="fileInput"
            onChange={handleFileSelect}
            multiple
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.txt"
          />
          <label htmlFor="fileInput" style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <IconFile />
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
                Arraste arquivos aqui ou clique para selecionar
              </div>
              <div style={{ color: MUTED, fontSize: '13px' }}>
                PDF, DOC, DOCX ou TXT — máx. 10 MB por arquivo
              </div>
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#9aaac4', fontSize: '13px', fontWeight: '500', marginBottom: '10px' }}>
              {files.length} arquivo{files.length > 1 ? 's' : ''} adicionado{files.length > 1 ? 's' : ''}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {files.map((file, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: BG_CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: '#4a7cff' }}>
                      <IconFileSmall />
                    </div>
                    <div>
                      <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>{file.name}</div>
                      <div style={{ color: MUTED, fontSize: '11px', marginTop: '2px' }}>{file.size}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: MUTED,
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '4px',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = MUTED}
                  >
                    <IconRemove />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
          </>
        )}

        {modoEntrada === 'texto' && (
          <>
            {/* Campo Redação */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', color: '#9aaac4', fontSize: '13px', marginBottom: '7px', fontWeight: '600' }}>
                Redação
              </label>
              <textarea
                placeholder="Digite ou cole aqui a redação do aluno..."
                value={textoDigitado}
                onChange={(e) => setTextoDigitado(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '280px',
                  padding: '14px',
                  background: BG_INPUT,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  lineHeight: 1.9,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = ROYAL}
                onBlur={(e) => e.currentTarget.style.borderColor = BORDER}
              />
            </div>

            {/* Contador de palavras */}
            <div style={{ color: MUTED, fontSize: '12px', textAlign: 'right', marginBottom: '24px' }}>
              {textoDigitado.trim().split(/\s+/).filter(Boolean).length} palavras
            </div>
          </>
        )}

        {/* Botão */}
        <button
          onClick={async () => {
            if (!turma || !idioma) { alert('Selecione turma e idioma.'); return; }
            if (!alunoId) { alert('Selecione um aluno.'); return; }
            setEnviando(true);
            try {
              let data;
              if (modoEntrada === 'texto') {
                data = await enviarRedacaoTexto({
                  alunoId: parseInt(alunoId),
                  turmaId: parseInt(turma),
                  idioma,
                  texto: textoDigitado.trim(),
                });
              } else {
                const formData = new FormData();
                rawFiles.forEach((f) => formData.append('arquivo', f));
                formData.append('alunoId', alunoId);
                formData.append('turmaId', turma);
                formData.append('idioma', idioma);
                data = await enviarRedacaoArquivo(formData);
              }
              navigate('/correcao', { state: { redacaoId: data.id } });
            } catch {
              alert('Erro ao enviar redação. Tente novamente.');
            } finally {
              setEnviando(false);
            }
          }}
          disabled={enviando || !alunoId || (modoEntrada === 'arquivo' ? files.length === 0 : textoDigitado.trim() === '')}
          style={{
            width: '100%',
            padding: '13px 24px',
            background: (enviando || !alunoId || (modoEntrada === 'arquivo' ? files.length === 0 : textoDigitado.trim() === '')) ? '#0f1a2e' : ROYAL,
            color: (enviando || !alunoId || (modoEntrada === 'arquivo' ? files.length === 0 : textoDigitado.trim() === '')) ? MUTED : '#ffffff',
            border: `1px solid ${(enviando || !alunoId || (modoEntrada === 'arquivo' ? files.length === 0 : textoDigitado.trim() === '')) ? BORDER : ROYAL}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: (enviando || !alunoId || (modoEntrada === 'arquivo' ? files.length === 0 : textoDigitado.trim() === '')) ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => {
            if (modoEntrada === 'arquivo') {
              if (files.length > 0 && alunoId && !enviando) e.currentTarget.style.background = '#234db0';
            } else {
              if (alunoId && textoDigitado.trim() !== '' && !enviando) e.currentTarget.style.background = '#234db0';
            }
          }}
          onMouseLeave={(e) => {
            if (modoEntrada === 'arquivo') {
              if (files.length > 0 && alunoId && !enviando) e.currentTarget.style.background = ROYAL;
            } else {
              if (alunoId && textoDigitado.trim() !== '' && !enviando) e.currentTarget.style.background = ROYAL;
            }
          }}
        >
          {enviando ? 'Enviando...' : 'Enviar para correção'}
        </button>
      </div>
    </div>
  );
}
