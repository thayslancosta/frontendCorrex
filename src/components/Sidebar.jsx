import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Nova Correção', path: '/upload', icon: '📤' },
    { label: 'Correções', path: '/correcao', icon: '✍️' },
    { label: 'Revisão', path: '/revisao', icon: '📋' },
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
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
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
