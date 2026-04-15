import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const colors = {
    success: { bg: 'var(--success-muted)', border: 'var(--success)', color: 'var(--success)', icon: '✓' },
    error:   { bg: 'var(--error-muted)',   border: 'var(--error)',   color: 'var(--error)',   icon: '✕' },
    info:    { bg: 'var(--info-muted)',    border: 'var(--info)',    color: 'var(--info)',    icon: 'i' },
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
        {toasts.map(({ id, message, type }) => {
          const c = colors[type] || colors.success;
          return (
            <div key={id}
              style={{
                background: 'var(--bg-surface)',
                border: `1px solid ${c.border}`,
                borderLeft: `4px solid ${c.border}`,
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minWidth: '260px',
                maxWidth: '380px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                pointerEvents: 'all',
                animation: 'toastIn 0.25s ease',
              }}
            >
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: c.bg, color: c.color, fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {c.icon}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-primary)', flex: 1, lineHeight: 1.4 }}>{message}</span>
              <button onClick={() => removeToast(id)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: '0', flexShrink: 0 }}>×</button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
