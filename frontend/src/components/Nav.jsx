import React, { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 24px',
      background: scrolled ? 'rgba(10,10,15,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s',
      height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{
        fontFamily: 'var(--pixel)', fontSize: 13,
        color: 'var(--white)', letterSpacing: '0.05em',
      }}>Cortex</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {[
          { label: 'Why Bots Fail', href: '#problem' },
          { label: 'Crisis Sim', href: '#crisis' },
          { label: 'Pipeline', href: '#pipeline' },
          { label: 'Constraints', href: '#constraints' },
        ].map(l => (
          <a key={l.href} href={l.href} style={{
            fontFamily: 'var(--pixel)', fontSize: 8,
            color: 'var(--muted)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{l.label}</a>
        ))}
        <a href="https://waitlist.cortex-agent.xyz"
          target="_blank" rel="noopener noreferrer"
          className="px-btn px-btn-primary"
          style={{ fontSize: 8, padding: '8px 16px', borderRadius: 8 }}
        >Join Waitlist</a>
      </div>
    </nav>
  )
}
