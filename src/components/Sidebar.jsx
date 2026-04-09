import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Nova Correção', path: '/upload', icon: '📤' },
    { label: 'Correções', path: '/correcao', icon: '✍️' },
    { label: 'Revisão', path: '/revisao', icon: '📋' },
  ];

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0a0f1a',
      borderRight: '1px solid #1e2a3a',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Logo */}
      <div
        style={{
          color: '#ffffff',
          fontSize: '22px',
          fontWeight: '700',
          marginBottom: '40px',
          paddingLeft: '12px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/dashboard')}
      >
        Corre<span style={{ color: '#4a7cff' }}>X</span>
      </div>

      {/* Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
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
        onClick={() => navigate('/login')}
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
          marginTop: '16px',
          paddingTop: '20px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b6b'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#7a8ba8'}
      >
        <span style={{ fontSize: '18px' }}>🚪</span>
        Sair
      </div>
    </div>
  );
}
