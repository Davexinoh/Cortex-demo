import React, { useEffect, useState } from 'react'

const REGIMES = [
  { label: 'ACCUMULATION', color: '#00e676' },
  { label: 'MARKUP', color: '#7c6cf0' },
  { label: 'DISTRIBUTION', color: '#ffa502' },
  { label: 'MARKDOWN', color: '#ff6b35' },
  { label: 'CRISIS', color: '#ff4757' },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const [count] = useState(299)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % REGIMES.length), 2000)
    return () => clearInterval(t)
  }, [])

  const regime = REGIMES[idx]

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 60px',
      position: 'relative', zIndex: 1,
      textAlign: 'center',
    }}>
      {/* People joined badge — like waitlist */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: 'rgba(124,108,240,0.15)',
        border: '1px solid rgba(124,108,240,0.4)',
        borderRadius: 24,
        padding: '8px 20px', marginBottom: 48,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 8px #00e676',
          display: 'inline-block',
          animation: 'blink 2s infinite',
        }} />
        <span style={{
          fontFamily: 'var(--pixel)', fontSize: 10,
          color: 'var(--white)',
        }}>{count} people joined</span>
      </div>

      {/* Main headline */}
      <h1 style={{
        fontFamily: 'var(--pixel)', fontWeight: 400,
        fontSize: 'clamp(18px, 3.5vw, 36px)',
        lineHeight: 1.6, letterSpacing: '0.02em',
        marginBottom: 16, maxWidth: 700,
        color: 'var(--white)',
      }}>
        Your bot has one strategy.
      </h1>
      <h1 style={{
        fontFamily: 'var(--pixel)', fontWeight: 400,
        fontSize: 'clamp(18px, 3.5vw, 36px)',
        lineHeight: 1.6,
        marginBottom: 32, maxWidth: 700,
        color: regime.color,
        transition: 'color 0.5s',
        textShadow: `0 0 30px ${regime.color}66`,
      }}>
        Markets have five.
      </h1>

      {/* Regime indicator */}
      <div style={{
        display: 'flex', gap: 0,
        marginBottom: 48,
        border: '1px solid var(--border)',
        borderRadius: 8, overflow: 'hidden',
      }}>
        {REGIMES.map((r, i) => (
          <div key={r.label} style={{
            padding: '8px 14px',
            background: i === idx ? `${r.color}20` : 'var(--card)',
            borderRight: i < 4 ? '1px solid var(--border)' : 'none',
            borderTop: `2px solid ${i === idx ? r.color : 'transparent'}`,
            transition: 'all 0.4s',
          }}>
            <span style={{
              fontFamily: 'var(--pixel)', fontSize: 7,
              color: i === idx ? r.color : 'var(--muted2)',
              transition: 'color 0.4s',
            }}>{r.label}</span>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--pixel)', fontSize: 9,
        color: 'var(--muted)', maxWidth: 480,
        lineHeight: 2, marginBottom: 40,
      }}>
        Cortex deploys 9 AI agents that detect regime shifts,
        debate every trade, and execute with surgical precision.
        24/7. No human required.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#problem" className="px-btn px-btn-primary"
          style={{ borderRadius: 10, fontSize: 9 }}>
          See Why Bots Fail →
        </a>
        <a href="https://waitlist.cortex-agent.xyz"
          target="_blank" rel="noopener noreferrer"
          className="px-btn px-btn-outline"
          style={{ borderRadius: 10, fontSize: 9 }}>
          Join Waitlist
        </a>
      </div>

      {/* Stats strip */}
      <div style={{
        display: 'flex', gap: 0, marginTop: 64,
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 12, overflow: 'hidden', flexWrap: 'wrap',
      }}>
        {[
          { val: '9', label: 'AI Agents' },
          { val: '8', label: 'Pipeline Steps' },
          { val: '3', label: 'Veto Points' },
          { val: '400ms', label: 'Tick Speed' },
          { val: '<50ms', label: 'Execution' },
        ].map((s, i, arr) => (
          <div key={s.label} style={{
            padding: '16px 24px',
            borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
            textAlign: 'center', minWidth: 100,
          }}>
            <div style={{
              fontFamily: 'var(--pixel)', fontSize: 16,
              color: 'var(--purple)', marginBottom: 6,
            }}>{s.val}</div>
            <div style={{
              fontFamily: 'var(--pixel)', fontSize: 7,
              color: 'var(--muted)',
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
      `}</style>
    </section>
  )
}
