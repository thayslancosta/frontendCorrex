import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Upload() {
  const navigate = useNavigate();
  const [turma, setTurma] = useState('');
  const [idioma, setIdioma] = useState('');
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#05080f', fontFamily: "'Segoe UI', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
            Nova Correção
          </h1>
          <p style={{ color: '#7a8ba8', fontSize: '14px' }}>
            Envie redações para correção automática com IA
          </p>
        </div>

        {/* Selects */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Turma
            </label>
            <select
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111827',
                border: '1px solid #1e2a3a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <option value="">Selecione uma turma</option>
              <option value="en-a2">Inglês A2</option>
              <option value="en-b1">Inglês B1</option>
              <option value="en-b2">Inglês B2</option>
              <option value="es-b1">Espanhol B1</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Idioma da Redação
            </label>
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111827',
                border: '1px solid #1e2a3a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <option value="">Selecione um idioma</option>
              <option value="en">Inglês</option>
              <option value="es">Espanhol</option>
              <option value="fr">Francês</option>
            </select>
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            height: '200px',
            border: dragActive ? '2px dashed #4a7cff' : '2px dashed #1e2a3a',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: dragActive ? 'rgba(74, 124, 255, 0.05)' : 'transparent',
            transition: 'all 0.3s',
            marginBottom: '24px',
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
          <label htmlFor="fileInput" style={{ cursor: 'pointer', textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '32px', marginBottom: '12px' }}>📄</span>
            <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
              Arraste arquivos aqui ou clique para selecionar
            </span>
            <span style={{ color: '#7a8ba8', fontSize: '13px' }}>
              PDF, DOC, DOCX ou TXT (máx. 10MB)
            </span>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              Arquivos adicionados ({files.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {files.map((file, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: '#0a0f1a',
                    border: '1px solid #1e2a3a',
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>{file.name}</div>
                    <div style={{ color: '#7a8ba8', fontSize: '12px', marginTop: '4px' }}>{file.size}</div>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '4px 8px',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() => navigate('/correcao')}
          style={{
            width: '100%',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #4a7cff 0%, #3b5ec9 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          Enviar para Correção
        </button>
      </div>
    </div>
  );
}
