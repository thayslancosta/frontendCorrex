# 📱 Guia de Responsividade do CorreX

## O que foi corrigido

### 1. **CSS Base**
- ✅ `mobile-first.css` - Novo sistema de breakpoints e classes responsivas
- ✅ `App.css` - Estilos utilitários e componentes responsivos
- ✅ `index.css` - Resetar CSS com escalas responsivas
- ✅ `Login.jsx` - Refatorado com classes CSS (layout agora empilha em mobile)

### 2. **Breakpoints Utilizados**
```
- Mobile (≤640px):   foco em 1 coluna, padding/font reduzidos
- Tablet (641-1023px): layout intermediário, 2-3 colunas
- Desktop (≥1024px):  sidebar fixa, layout completo
```

### 3. **Principais Mudanças**

#### Login Page
- Layout empilhado em mobile (sem painel de imagem)
- Padding e fontes reduzidas dinamicamente
- Inputs com fonte adequada para evitar zoom no iOS
- Mensagens flexíveis que se ajustam ao espaço

#### Sidebar
- Ícones em grade 2 colunas no mobile → 3 no tablet → 1 coluna no desktop
- Menu toggle (hamburger) que desaparece em desktop
- Navegação empilhada em mobile, horizontal em desktop

#### Stats Grid
- 1 coluna em mobile
- 2 colunas em tablet
- 4 colunas em desktop

#### Tabelas
- Scroll horizontal em mobile
- Padding menor em telas pequenas
- Fontes reduzidas progressivamente

## Como Aplicar aos Outros Componentes

### Padrão para Componentes Novos

#### ❌ Evite (inline styles fixos)
```jsx
<div style={{
  padding: '32px 48px',
  fontSize: '18px',
  display: 'flex'
}}>
```

#### ✅ Use (classes CSS + overrides mínimos)
```jsx
<div className="page-content">
  {/* Classe já traz padding responsivo */}
</div>

<div className="login-form-panel">
  {/* Classes definem espaçamento responsivo */}
</div>
```

### Exemplo de Refatoração

**Antes:**
```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  padding: '32px',
}}>
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

**Depois:**
```jsx
<div className="container gap-l" style={{ 
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
}}>
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

## Classes CSS Disponíveis

### Spacing (Margin Bottom)
- `.mb-s` → 8px
- `.mb-m` → 16px
- `.mb-l` → 24px
- `.mb-xl` → 32px

### Gaps (Flex/Grid)
- `.gap-s` → 8px
- `.gap-m` → 16px
- `.gap-l` → 24px

### Texto
- `.text-muted` → cor muted
- `.text-primary` → branco
- `.text-accent` → azul

### Componentes
- `.page-content` → área principal com padding responsivo
- `.stats-grid` → grid responsivo de cards
- `.table-wrap` → wrapper para tabelas com scroll
- `.login-shell`, `.login-container`, `.login-form-panel` → login responsivo
- `.sidebar-shell`, `.sidebar-nav` → sidebar responsivo

## Media Queries Principais

```css
/* Mobile First */
@media (min-width: 640px) { /* Tablet Small */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Desktop Large */ }
```

## Checklist para Novos Componentes

- [ ] Usar classes CSS ao invés de inline styles quando possível
- [ ] Testar em mobile (640px), tablet (768px) e desktop (1024px)
- [ ] Font sizes reduzem em mobile: h1 (18→20→22→24px)
- [ ] Padding diminui: mobile 16px → desktop 32px
- [ ] Grids usam `minmax()` para responsividade automática
- [ ] Inputs têm font-size ≥16px em mobile (evita zoom)
- [ ] Nenhum elemento tem width fixa > 100% do container
- [ ] Tabelas têm `overflow-x: auto` com scroll suave

## Variáveis CSS Disponíveis

```css
:root {
  --color-royal: #1a3a7c;
  --color-border: #1a2540;
  --color-muted: #6b7a99;
  --color-bg-card: #0a0f1a;
  --color-accent: #4a7cff;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

Use: `background: var(--color-bg-card);`

## Componentes que Precisam de Refatoração

Próximas prioridades:
1. `Dashboard.jsx` - Cards e tabelas
2. `Correcao.jsx`, `Revisao.jsx` - Layouts com múltiplas colunas
3. Outros componentes de página

## Dicas Finais

1. **Mobile First**: sempre comece com mobile, depois expanda
2. **Sem widths fixas**: use `max-width`, `flex`, `grid` com `minmax()`
3. **Fonts escaladas**: use `@media` para alterar tamanhos progressivamente
4. **Touch-friendly**: botões mínimo 44x44px, gaps entre clicáveis ≥8px
5. **Imágenes**: use `max-width: 100%` para imagens responsivas
6. **Overflow**: sempre trate overflow em mobile com scroll suave

---

**Status**: Melhorias aplicadas em Login. Próximo: Dashboard e outros componentes.
