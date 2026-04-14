import React, { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 32px',
      background: scrolled ? 'rgba(4,8,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,255,224,0.08)' : '1px solid transparent',
      transition: 'all 0.3s',
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <CortexLogo />
        <div>
          <div style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 18, letterSpacing: '0.12em',
            color: 'var(--acid)',
            textShadow: '0 0 24px rgba(0,255,224,0.4)',
          }}>CORTEX</div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9,
            color: 'var(--slate2)', letterSpacing: '0.2em',
            marginTop: -2,
          }}>MULTI-AGENT ENGINE</div>
        </div>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Problem', 'Crisis Sim', 'Pipeline', 'How It Works'].map((item, i) => (
          <a
            key={item}
            href={['#problem', '#crisis', '#pipeline', '#how'][i]}
            style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              color: 'var(--slate)', letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--acid)'}
            onMouseLeave={e => e.target.style.color = 'var(--slate)'}
          >{item}</a>
        ))}
        <a
          href="https://waitlist.cortex-agent.xyz"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            background: 'var(--acid)', color: 'var(--ink)',
            padding: '7px 18px', letterSpacing: '0.1em',
            textDecoration: 'none', fontWeight: 700,
            transition: 'all 0.2s',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
          onMouseEnter={e => { e.target.style.background = '#00ccb4'; e.target.style.boxShadow = '0 0 20px rgba(0,255,224,0.3)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--acid)'; e.target.style.boxShadow = 'none' }}
        >JOIN WAITLIST</a>
      </div>
    </nav>
  )
}

function CortexLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <polygon points="18,2 33,10 33,26 18,34 3,26 3,10"
        fill="none" stroke="rgba(0,255,224,0.5)" strokeWidth="1.5" />
      <polygon points="18,8 27,13 27,23 18,28 9,23 9,13"
        fill="none" stroke="rgba(0,255,224,0.25)" strokeWidth="1" />
      <circle cx="18" cy="18" r="5" fill="rgba(0,255,224,0.9)" />
      <circle cx="18" cy="18" r="8" fill="none" stroke="rgba(0,255,224,0.15)" strokeWidth="1" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = 13, cx = 18 + r * Math.cos(deg * Math.PI / 180), cy = 18 + r * Math.sin(deg * Math.PI / 180)
        return <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(0,255,224,0.6)" />
      })}
    </svg>
  )
}
