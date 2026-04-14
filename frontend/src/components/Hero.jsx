import React, { useEffect, useState } from 'react'

const REGIMES = ['ACCUMULATION', 'MARKUP', 'DISTRIBUTION', 'MARKDOWN', 'CRISIS']
const REGIME_COLORS = {
  ACCUMULATION: '#00f57a', MARKUP: '#00ffe0', DISTRIBUTION: '#ffb800',
  MARKDOWN: '#ff8c00', CRISIS: '#ff2d55'
}

export default function Hero() {
  const [regimeIdx, setRegimeIdx] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRegimeIdx(i => (i + 1) % REGIMES.length), 1800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 400)
    return () => clearInterval(t)
  }, [])

  const regime = REGIMES[regimeIdx]
  const color = REGIME_COLORS[regime]

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(ellipse, rgba(0,255,224,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Live ticker */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        color: 'var(--slate2)', letterSpacing: '0.2em',
        marginBottom: 32,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 8px var(--green)',
          display: 'inline-block',
          animation: 'pulse 2s infinite',
        }} />
        LIVE ON SOLANA MAINNET &nbsp;·&nbsp; 400ms CYCLE &nbsp;·&nbsp; 9 AGENTS ACTIVE
      </div>

      {/* Main headline */}
      <h1 style={{
        fontFamily: 'var(--display)', fontWeight: 800,
        fontSize: 'clamp(44px, 8vw, 96px)',
        lineHeight: 0.95, textAlign: 'center',
        letterSpacing: '-0.02em',
        maxWidth: 900,
        marginBottom: 8,
      }}>
        <span style={{ color: 'var(--white)' }}>THE MARKET IS IN </span>
        <span style={{
          color: color,
          textShadow: `0 0 40px ${color}55`,
          transition: 'color 0.5s, text-shadow 0.5s',
          display: 'inline-block',
        }}>{regime}</span>
      </h1>
      <h1 style={{
        fontFamily: 'var(--display)', fontWeight: 800,
        fontSize: 'clamp(44px, 8vw, 96px)',
        lineHeight: 0.95, textAlign: 'center',
        letterSpacing: '-0.02em',
        maxWidth: 900,
        marginBottom: 40,
        color: 'var(--white)',
      }}>YOUR BOT DOESN'T KNOW.</h1>

      <p style={{
        fontFamily: 'var(--body)', fontWeight: 300,
        fontSize: 'clamp(15px, 2vw, 19px)',
        color: 'var(--slate)', textAlign: 'center',
        maxWidth: 580, lineHeight: 1.7,
        marginBottom: 48,
      }}>
        Cortex deploys 9 specialized AI agents that detect regime shifts,
        debate every trade, and execute with surgical precision.
        <strong style={{ color: 'var(--white)', fontWeight: 500 }}> Not faster automation — intelligent adaptation.</strong>
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#crisis" style={{
          fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12,
          background: 'var(--acid)', color: 'var(--ink)',
          padding: '14px 32px', textDecoration: 'none',
          letterSpacing: '0.12em',
          clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.target.style.boxShadow = '0 0 32px rgba(0,255,224,0.35)'}
          onMouseLeave={e => e.target.style.boxShadow = 'none'}
        >▶ WATCH THE CRISIS SIM</a>
        <a href="#pipeline" style={{
          fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 12,
          background: 'transparent', color: 'var(--acid)',
          padding: '14px 32px', textDecoration: 'none',
          letterSpacing: '0.12em',
          border: '1px solid rgba(0,255,224,0.3)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(0,255,224,0.06)'; e.target.style.borderColor = 'var(--acid)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(0,255,224,0.3)' }}
        >RUN AGENT PIPELINE</a>
      </div>

      {/* Stats strip */}
      <div style={{
        display: 'flex', gap: 0, marginTop: 80,
        border: '1px solid var(--wire)', background: 'var(--ink2)',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'AGENTS', value: '9' },
          { label: 'PIPELINE STEPS', value: '8' },
          { label: 'VETO POINTS', value: '3' },
          { label: 'TICK SPEED', value: '400ms' },
          { label: 'EXECUTION', value: '<50ms' },
        ].map((s, i) => (
          <div key={s.label} style={{
            padding: '16px 28px',
            borderRight: i < 4 ? '1px solid var(--wire)' : 'none',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--acid)', fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.15em', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </section>
  )
}
