import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1,
      background: 'var(--bg2)',
    }}>
      <div style={{ fontFamily: 'var(--pixel)', fontSize: 11, color: 'var(--white)' }}>Cortex</div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { label: 'Terms', href: 'https://waitlist.cortex-agent.xyz/terms' },
          { label: 'Privacy', href: 'https://waitlist.cortex-agent.xyz/privacy' },
          { label: 'Twitter', href: 'https://x.com/cortexagent' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--muted)',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{l.label}</a>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)' }}>
        © 2026 Cortex Agent Team. All rights reserved.
      </div>
    </footer>
  )
}
