import React from 'react'

export default function FinalCTA() {
  return (
    <section id="cta" style={{
      padding: '100px 24px',
      borderTop: '1px solid var(--wire)',
      position: 'relative', overflow: 'hidden',
      background: 'var(--ink2)',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,255,224,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {/* Urgency label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--amber)', letterSpacing: '0.2em',
          border: '1px solid rgba(255,184,0,0.3)',
          background: 'rgba(255,184,0,0.06)',
          padding: '6px 16px', marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', display: 'inline-block', animation: 'livePulse 2s infinite' }} />
          EARLY ACCESS — LIMITED SPOTS
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'var(--display)', fontWeight: 800,
          fontSize: 'clamp(36px, 6vw, 72px)',
          letterSpacing: '-0.02em', lineHeight: 1,
          marginBottom: 20,
        }}>
          <span style={{ color: 'var(--white)' }}>YOUR PORTFOLIO </span>
          <span style={{ color: 'var(--acid)', textShadow: '0 0 40px rgba(0,255,224,0.3)' }}>NEVER SLEEPS.</span>
          <br />
          <span style={{ color: 'var(--white)' }}>NEITHER DOES CORTEX.</span>
        </h2>

        {/* Value summary */}
        <p style={{
          fontFamily: 'var(--body)', color: 'var(--slate)',
          fontSize: 17, lineHeight: 1.7, marginBottom: 40,
        }}>
          Regime-aware. Adversarially validated. Guardian-vetoed.
          The only DeFi system built for survival in an unknown market —
          not just execution in a known one.
        </p>

        {/* Value bullets */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 1, background: 'var(--wire)',
          marginBottom: 40,
        }}>
          {[
            { icon: '🧠', val: '9 AI Agents', sub: 'adversarial consensus' },
            { icon: '🔐', val: 'Guardian Veto', sub: '3 veto points' },
            { icon: '⚡', val: '<50ms exec', sub: 'via Jito MEV bundles' },
            { icon: '🌐', val: '24/7 active', sub: 'no human required' },
          ].map((v, i) => (
            <div key={i} style={{
              background: 'var(--ink)',
              padding: '20px 16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{v.icon}</div>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 18,
                color: 'var(--acid)', fontWeight: 700, marginBottom: 4,
              }}>{v.val}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 9,
                color: 'var(--slate2)', letterSpacing: '0.12em',
              }}>{v.sub}</div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <a
          href="https://waitlist.cortex-agent.xyz"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 22, letterSpacing: '0.12em',
            background: 'var(--acid)', color: 'var(--ink)',
            padding: '20px 56px', textDecoration: 'none',
            clipPath: 'polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%)',
            transition: 'all 0.2s',
            marginBottom: 14,
          }}
          onMouseEnter={e => { e.target.style.background = '#00ccb4'; e.target.style.boxShadow = '0 0 48px rgba(0,255,224,0.4)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--acid)'; e.target.style.boxShadow = 'none' }}
        >
          SECURE YOUR SPOT →
        </a>

        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--slate2)', letterSpacing: '0.12em',
          marginTop: 4,
        }}>
          waitlist.cortex-agent.xyz · Referrals give priority access
        </div>

        {/* Protocol strip */}
        <div style={{
          marginTop: 56, paddingTop: 32,
          borderTop: '1px solid var(--wire)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 12, flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate3)', letterSpacing: '0.15em' }}>BUILT ON</span>
          {['SOLANA', 'JUPITER', 'DRIFT', 'HELIUS', 'PYTH', 'OPENSERV'].map(p => (
            <span key={p} style={{
              fontFamily: 'var(--mono)', fontSize: 9,
              color: 'var(--slate2)', letterSpacing: '0.15em',
              padding: '4px 12px', border: '1px solid var(--wire)',
              background: 'var(--ink)',
            }}>{p}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </section>
  )
}
