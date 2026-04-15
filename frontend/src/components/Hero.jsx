import React, { useEffect, useState } from 'react'

const REGIME_CYCLE = [
  { label: 'ACCUMULATION', color: '#00f57a', desc: 'Smart money quietly builds' },
  { label: 'MARKUP', color: '#00ffe0', desc: 'Trend confirmed, momentum takes over' },
  { label: 'DISTRIBUTION', color: '#ffb800', desc: 'Looks bullish. Smart money is leaving.' },
  { label: 'MARKDOWN', color: '#ff8c00', desc: 'Confirmed downtrend, protect capital' },
  { label: 'CRISIS', color: '#ff2d55', desc: 'Liquidity collapses. Survival mode.' },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % REGIME_CYCLE.length), 2000)
    return () => clearInterval(t)
  }, [])

  const regime = REGIME_CYCLE[idx]

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 80px',
      position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>
      <div style={{
        position: 'absolute', top: '42%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 400,
        background: `radial-gradient(ellipse, ${regime.color}0d 0%, transparent 70%)`,
        transition: 'background 0.6s',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--mono)', fontSize: 10,
        color: 'var(--slate2)', letterSpacing: '0.2em',
        border: '1px solid var(--wire)',
        background: 'var(--ink2)',
        padding: '6px 16px', marginBottom: 48,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--green)', boxShadow: '0 0 8px #00f57a',
          display: 'inline-block', animation: 'heroLive 2s infinite',
        }} />
        LIVE ON SOLANA · 9 AGENTS ACTIVE
      </div>

      <h1 style={{
        fontFamily: 'var(--display)', fontWeight: 800,
        fontSize: 'clamp(36px, 6.5vw, 80px)',
        lineHeight: 1, letterSpacing: '-0.025em',
        marginBottom: 20, maxWidth: 820, color: 'var(--white)',
      }}>
        YOUR BOT HAS ONE STRATEGY.
        <br />
        <span style={{ color: 'var(--acid)' }}>MARKETS HAVE FIVE.</span>
      </h1>

      <p style={{
        fontFamily: 'var(--body)', fontWeight: 300,
        fontSize: 'clamp(15px, 1.8vw, 18px)',
        color: 'var(--slate)', maxWidth: 500,
        lineHeight: 1.75, marginBottom: 16,
      }}>
        Right now the market is in{' '}
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 13,
          color: regime.color, fontWeight: 600, transition: 'color 0.4s',
        }}>{regime.label}</span>
        . {regime.desc}.
        <br />
        <span style={{ color: 'var(--slate2)', fontSize: 13 }}>
          Your bot doesn't know. Cortex does.
        </span>
      </p>

      <div style={{ display: 'flex', gap: 0, marginBottom: 48, border: '1px solid var(--wire)' }}>
        {REGIME_CYCLE.map((r, i) => (
          <div key={r.label} style={{
            padding: '8px 16px',
            background: i === idx ? `${r.color}15` : 'var(--ink2)',
            borderRight: i < 4 ? '1px solid var(--wire)' : 'none',
            borderTop: `2px solid ${i === idx ? r.color : 'transparent'}`,
            transition: 'all 0.4s',
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 9,
              color: i === idx ? r.color : 'var(--slate3)',
              letterSpacing: '0.15em', transition: 'color 0.4s',
            }}>{r.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#problem" style={{
          fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16,
          letterSpacing: '0.1em', background: 'var(--acid)', color: 'var(--ink)',
          padding: '14px 36px', textDecoration: 'none',
          clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.target.style.boxShadow = '0 0 32px rgba(0,255,224,0.35)'}
          onMouseLeave={e => e.target.style.boxShadow = 'none'}
        >SEE WHY BOTS FAIL →</a>
        <a href="https://waitlist.cortex-agent.xyz" target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 11,
            letterSpacing: '0.12em', background: 'transparent', color: 'var(--slate)',
            padding: '14px 28px', textDecoration: 'none',
            border: '1px solid var(--wire)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--acid)'; e.target.style.color = 'var(--acid)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--wire)'; e.target.style.color = 'var(--slate)' }}
        >JOIN WAITLIST</a>
      </div>

      <style>{`
        @keyframes heroLive {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.8); }
        }
      `}</style>
    </section>
  )
}
