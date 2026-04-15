export function Skeleton({ width = '100%', height = '16px', borderRadius = '6px', style = {} }) {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      background: 'var(--bg-hover)',
      backgroundImage: 'linear-gradient(90deg, var(--bg-hover) 0%, var(--bg-active) 50%, var(--bg-hover) 100%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s ease infinite',
      flexShrink: 0,
      ...style,
    }} />
  );
}

export function SkeletonTable({ rows = 5, cols = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '12px', padding: '12px 18px', borderBottom: '1px solid var(--border)' }}>
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} height="14px" width={j === 0 ? '70%' : '50%'} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px 18px' }}>
      <Skeleton height="11px" width="60%" style={{ marginBottom: '10px' }} />
      <Skeleton height="28px" width="40%" />
    </div>
  );
}
