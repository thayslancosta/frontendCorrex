import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../services/authService';

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 3H7a2.5 2.5 0 0 0 0 5h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 8v-1a2 2 0 0 0-2-2H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconUpload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 10v2.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <polyline points="11.5 5.5 8 2 4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="2" x2="8" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconTurmas = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 12c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconAlunos = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 14c0-2.761 2.239-4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 14c0-2 1-3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconCriterios = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="13" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
    { path: '/upload', label: 'Nova correção', Icon: IconUpload },
    { path: '/correcao', label: 'Correção', Icon: null },
    { path: '/revisao', label: 'Revisão', Icon: null },
    { path: '/turmas', label: 'Turmas', Icon: IconTurmas },
    { path: '/alunos', label: 'Alunos', Icon: IconAlunos },
    { path: '/criterios', label: 'Critérios', Icon: IconCriterios },
  ];

  const menuItems = navItems.map(item => ({
    label: item.label,
    path: item.path,
    icon: item.Icon ? <item.Icon /> : null,
  }));

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div
      className="sidebar-shell"
      style={{
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div className="sidebar-top">
        {/* Logo */}
        <div
          className="sidebar-brand"
          style={{
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
          onClick={() => handleNavigate('/dashboard')}
        >
          Corre<span style={{ color: '#4a7cff' }}>X</span>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`sidebar-menu-area ${isMenuOpen ? 'open' : ''}`}>
        {/* Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className="sidebar-item"
                onClick={() => handleNavigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(74, 124, 255, 0.12)' : 'transparent',
                  color: isActive ? '#4a7cff' : '#7a8ba8',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {typeof item.icon === 'string' ? (
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  ) : (
                    <span style={{ color: 'inherit' }}>{item.icon}</span>
                  )}
                </span>
                {item.label}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="sidebar-logout"
          onClick={() => { logout(); navigate('/'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#7a8ba8',
            fontSize: '14px',
            borderTop: '1px solid #1e2a3a',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b6b'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#7a8ba8'}
        >
          <span style={{ fontSize: '18px' }}>🚪</span>
          Sair
        </div>
      </div>
    </div>
  );
}
