import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const IconDashboard = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/></svg>;
const IconUpload = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 10V2M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const IconCorrecao = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h12M2 7h8M2 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 10l1.5 1.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconRevisao = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.5 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5.5L10.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 2v4h4M5 9l1.5 1.5L9.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconTurmas = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 14c0-3.314 2.686-5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const IconAlunos = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 13.5c0-2.5 2-4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M9.5 13.5c0-2 1-3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const IconCriterios = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 7.5h7M2 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const IconLogout = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 5l3 3-3 3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const navItems = [
  { path: '/dashboard', label: 'Dashboard',    Icon: IconDashboard },
  { path: '/upload',    label: 'Nova correção', Icon: IconUpload    },
  { path: '/correcao',  label: 'Correção',      Icon: IconCorrecao  },
  { path: '/revisao',   label: 'Revisão',       Icon: IconRevisao   },
  { path: '/turmas',    label: 'Turmas',        Icon: IconTurmas    },
  { path: '/alunos',    label: 'Alunos',        Icon: IconAlunos    },
  { path: '/criterios', label: 'Critérios',     Icon: IconCriterios },
];

const NAV_CONTENT = ({ navigate, location, theme, toggle, onNavigate }) => (
  <>
    {/* Logo */}
    <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 10.5L5 4l2.5 5 2-3 2.5 4.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '600' }}>CorreX</span>
      </div>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {navItems.map(({ path, label, Icon }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => { navigate(path); onNavigate && onNavigate(); }}
              style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 10px', borderRadius: '6px', border: 'none', background: active ? 'var(--bg-active)' : 'transparent', color: active ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '14px', fontWeight: active ? '500' : '400', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'background 0.1s, color 0.1s' }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
            >
              <Icon />{label}
            </button>
          );
        })}
      </div>
    </nav>

    {/* Footer */}
    <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', marginBottom: '2px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', fontWeight: '600', flexShrink: 0 }}>P</div>
        <div>
          <div style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: '500' }}>Professor</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Admin</div>
        </div>
      </div>
      <button onClick={toggle}
        style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--text-tertiary)', fontSize: '13px', cursor: 'pointer', width: '100%', marginBottom: '2px', transition: 'background 0.15s, color 0.15s' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
      >
        {theme === 'dark'
          ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1v1M7.5 13v1M1 7.5h1M13 7.5h1M3 3l.7.7M11.3 11.3l.7.7M3 12l.7-.7M11.3 3.7l.7-.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          : <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M12.5 8.5A5.5 5.5 0 016 2a5.5 5.5 0 100 11 5.5 5.5 0 006.5-4.5z" stroke="currentColor" strokeWidth="1.3"/></svg>
        }
        {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      </button>
      <button onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--text-tertiary)', fontSize: '13px', cursor: 'pointer', width: '100%', transition: 'background 0.15s, color 0.15s' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--error-muted)'; e.currentTarget.style.color = 'var(--error)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
      >
        <IconLogout />Sair
      </button>
    </div>
  </>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar (≥ 768px) ── */}
      <div style={{ width: '220px', minHeight: '100vh', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', left: 0, top: 0, zIndex: 100 }}
        className="sidebar-desktop">
        <NAV_CONTENT navigate={navigate} location={location} theme={theme} toggle={toggle} />
      </div>

      {/* ── Mobile topbar (< 768px) ── */}
      <div style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '12px 16px', alignItems: 'center', justifyContent: 'space-between' }}
        className="sidebar-mobile-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '26px', height: '26px', background: 'var(--accent)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 10.5L5 4l2.5 5 2-3 2.5 4.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '600' }}>CorreX</span>
        </div>
        <button onClick={() => setMenuAberto(!menuAberto)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {menuAberto
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          }
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {menuAberto && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 199, display: 'flex' }} className="sidebar-mobile-overlay">
          <div onClick={() => setMenuAberto(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'relative', width: '260px', background: 'var(--bg-surface)', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: '56px', zIndex: 1 }}>
            <NAV_CONTENT navigate={navigate} location={location} theme={theme} toggle={toggle} onNavigate={() => setMenuAberto(false)} />
          </div>
        </div>
      )}

      {/* ── CSS responsivo ── */}
      <style>{`
        @media (max-width: 767px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile-bar { display: flex !important; }
          .page-content { margin-left: 0 !important; padding: 76px 16px 24px !important; }
        }
        @media (min-width: 768px) {
          .sidebar-mobile-bar { display: none !important; }
          .sidebar-mobile-overlay { display: none !important; }
        }
      `}</style>
    </>
  );
}
