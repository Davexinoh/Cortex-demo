import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--wire)',
      padding: '24px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
    }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 16, color: 'var(--acid)', letterSpacing: '0.15em', fontWeight: 800 }}>
        CORTEX
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.12em', textAlign: 'center' }}>
        AUTONOMOUS DEFI EXECUTION ON SOLANA · POWERED BY OPENSERV · © 2026
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { label: 'X / TWITTER', href: 'https://x.com/cortexagent' },
          { label: 'GITHUB', href: 'https://github.com/cortextradeagent' },
          { label: 'WAITLIST', href: 'https://waitlist.cortex-agent.xyz' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)',
            letterSpacing: '0.15em', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--acid)'}
            onMouseLeave={e => e.target.style.color = 'var(--slate2)'}
          >{l.label}</a>
        ))}
      </div>
    </footer>
  )
}
