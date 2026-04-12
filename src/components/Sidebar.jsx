import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h.5"></path>
          <path d="M15 12v-1a3 3 0 0 0-3-3H6"></path>
        </svg>
      )
    },
    { 
      label: 'Nova Correção', 
      path: '/upload', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      )
    },
    { 
      label: 'Turmas', 
      path: '/turmas', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="2"></circle>
          <circle cx="18" cy="6" r="2"></circle>
          <circle cx="12" cy="14" r="2"></circle>
          <line x1="6" y1="8" x2="6" y2="18"></line>
          <line x1="18" y1="8" x2="18" y2="18"></line>
          <line x1="8" y1="14" x2="16" y2="14"></line>
        </svg>
      )
    },
    { 
      label: 'Alunos', 
      path: '/alunos', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      label: 'Critérios', 
      path: '/criterios', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      )
    },
  ];

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
          onClick={() => handleNavigate('/login')}
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
