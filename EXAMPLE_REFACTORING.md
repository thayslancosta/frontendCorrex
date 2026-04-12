# 📚 Exemplo: Refatorando Dashboard.jsx

## Versão Atual (com problemas em mobile)

```jsx
// ❌ PROBLEMA: Padding e font sizes fixos
<div style={{ marginBottom: '32px' }}>
  <h1 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '600', marginBottom: '4px' }}>
    Dashboard
  </h1>
  <p style={{ color: MUTED, fontSize: '14px' }}>
    Bem-vindo de volta, Professor
  </p>
</div>

// ❌ PROBLEMA: Padding fixo em cards
<div key={label} style={{
  background: BG_CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: '12px',
  padding: '20px',  // Muito grande em mobile!
}}>
```

## Versão Refatorada (Responsiva)

```jsx
// ✅ SOLUÇÃO: Use classes responsivas
<div className="section-header">
  <h1 className="header-section" style={{ color: '#ffffff' }}>
    Dashboard
  </h1>
  <p style={{ color: MUTED }}>
    Bem-vindo de volta, Professor
  </p>
</div>

// ✅ SOLUÇÃO: Use classes para cards
<div key={label} className="card-wrapper">
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
    <span style={{ color: MUTED, fontSize: '13px' }}>{label}</span>
    <div style={{
      width: '32px',
      height: '32px',
      background: `${accent}55`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: accentColor,
    }}>
      <Icon />
    </div>
  </div>
  <div style={{ color: '#ffffff', fontSize: '28px', fontWeight: '600' }}>{value}</div>
</div>
```

## Tabela Refatorada

**Antes:**
```jsx
<div style={{
  background: BG_CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: '12px',
  padding: '24px',  // Muito em mobile
}}>
  {/* Tabela grande que não cabe */}
  <div className="table-wrap">
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      {/* ... */}
    </table>
  </div>
</div>
```

**Depois:**
```jsx
<div className="card-wrapper" style={{ padding: '16px 12px' }}>
  <div className="card-header">
    <h2>Correções recentes</h2>
    <button className="link-button">Ver todas</button>
  </div>
  
  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          {['Aluno', 'Turma', 'Nota', 'Data', 'Status'].map((h) => (
            <th key={h} style={{
              color: MUTED,
              fontSize: '11px',
              fontWeight: '500',
              textAlign: 'left',
              padding: '10px 8px',
              borderBottom: `1px solid ${BORDER}`,
            }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recentCorrections.map((item, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #0d1424' }}>
            <td style={{ padding: '10px 8px', color: '#ffffff' }}>
              {item.aluno}
            </td>
            <td style={{ padding: '10px 8px', color: MUTED }}>
              {item.turma}
            </td>
            <td style={{ padding: '10px 8px', fontWeight: '600' }}>
              {item.nota ?? '—'}
            </td>
            <td style={{ padding: '10px 8px', color: MUTED }}>
              {item.data}
            </td>
            <td style={{ padding: '10px 8px' }}>
              <span className={`badge badge-${item.status === 'Corrigida' ? 'success' : 'warning'}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

## O que muda?

| Propriedade | Antes | Depois (Mobile) | Desktop |
|---|---|---|---|
| padding cards | `20px` | `16px 12px` | `20px` |
| padding table | `24px` | `16px 12px` | `24px` |
| h1 fontSize | `22px` | já responsivo via `h1` css | `24px` |
| table padding | `13px 14px` | `10px 8px` | `13px 14px` |

## Checklist para Refatorar Dashboard

- [ ] Header section → use `.section-header` class
- [ ] Padding de cards → reduzir em mobile via CSS
- [ ] Tabelas → padding de `<td>` reduzido (10px 8px)
- [ ] Badges → use `.badge` classes
- [ ] Spacing entre seções → use `.mb-l`, `.gap-l`
- [ ] Testar em 375px, 768px, 1024px

## Resultado Esperado

✅ Dashboard fica responsivo  
✅ Sem mudanças na lógica React  
✅ Apenas ajustes de estilo  
✅ Reutiliza classes CSS já prontas  

---

**Dica**: Faça um componente por vez. Teste em mobile após cada mudança!
