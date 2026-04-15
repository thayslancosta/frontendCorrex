import { useNavigate, useLocation } from 'react-router-dom';

const ROYAL = '#1a3a7c';
const BG = '#070c18';
const BORDER = '#1a2540';
const MUTED = '#6b7a99';

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
  </svg>
);

const IconUpload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 10V2M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCorrecao = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 3h12M2 7h8M2 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 10l1.5 1.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRevisao = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.5 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5.5L10.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 2v4h4M5 9l1.5 1.5L9.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 5l3 3-3 3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navItems = [
  { path: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { path: '/upload', label: 'Nova correção', Icon: IconUpload },
  { path: '/correcao', label: 'Correção', Icon: IconCorrecao },
  { path: '/revisao', label: 'Revisão', Icon: IconRevisao },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      width: '220px',
      minHeight: '100vh',
      background: BG,
      borderRight: `1px solid ${BORDER}`,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 24px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: ROYAL,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 12L6 4l3 6 2-3 2 5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: '600', letterSpacing: '-0.3px' }}>
            CorreX
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(({ path, label, Icon }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: active ? ROYAL : 'transparent',
                  color: active ? '#ffffff' : MUTED,
                  fontSize: '14px',
                  fontWeight: active ? '500' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = '#0f1a30';
                    e.currentTarget.style.color = '#c0cce0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = MUTED;
                  }
                }}
              >
                <Icon />
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 12px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          marginBottom: '4px',
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: ROYAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: 'var(--text-primary)',
            fontWeight: '600',
            flexShrink: 0,
          }}>
            P
          </div>
          <div>
            <div style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>Professor</div>
            <div style={{ color: MUTED, fontSize: '11px' }}>Admin</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: MUTED,
            fontSize: '13px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a0a0a';
            e.currentTarget.style.color = '#e05555';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = MUTED;
          }}
        >
          <IconLogout />
          Sair
        </button>
      </div>
    </div>
  );
}
