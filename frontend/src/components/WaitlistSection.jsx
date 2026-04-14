import React from 'react'

export default function WaitlistSection() {
  return (
    <section id="waitlist" style={{
      padding: '100px 24px',
      borderTop: '1px solid var(--wire)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,255,224,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acid)', letterSpacing: '0.25em', marginBottom: 16 }}>
          03 — EARLY ACCESS
        </div>
        <h2 style={{
          fontFamily: 'var(--display)', fontWeight: 800,
          fontSize: 'clamp(36px, 6vw, 68px)',
          letterSpacing: '-0.02em', lineHeight: 1,
          marginBottom: 20,
        }}>
          <span style={{ color: 'var(--white)' }}>YOUR PORTFOLIO </span>
          <span style={{ color: 'var(--acid)', textShadow: '0 0 40px rgba(0,255,224,0.3)' }}>NEVER SLEEPS.</span>
          <br />
          <span style={{ color: 'var(--white)' }}>NEITHER DOES </span>
          <span style={{ color: 'var(--acid)' }}>CORTEX.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--body)', color: 'var(--slate)',
          fontSize: 17, lineHeight: 1.7, marginBottom: 36,
        }}>
          Cortex is deploying on Solana. Get early access to the full 9-agent trading engine —
          regime detection, adversarial debate, Guardian veto, and 24/7 autonomous execution.
        </p>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 0, justifyContent: 'center',
          border: '1px solid var(--wire)', background: 'var(--ink2)',
          marginBottom: 36,
        }}>
          {[
            { val: '9', label: 'AI Agents' },
            { val: '5', label: 'Market Regimes' },
            { val: '3', label: 'Veto Points' },
            { val: '24/7', label: 'Autonomous' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '16px 24px',
              borderRight: i < 3 ? '1px solid var(--wire)' : 'none',
              flex: 1,
            }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 28, color: 'var(--acid)', fontWeight: 700 }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.12em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://waitlist.cortex-agent.xyz"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 20, letterSpacing: '0.12em',
            background: 'var(--acid)', color: 'var(--ink)',
            padding: '18px 52px', textDecoration: 'none',
            clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
            transition: 'all 0.2s',
            marginBottom: 16,
          }}
          onMouseEnter={e => { e.target.style.background = '#00ccb4'; e.target.style.boxShadow = '0 0 40px rgba(0,255,224,0.35)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--acid)'; e.target.style.boxShadow = 'none' }}
        >
          SECURE YOUR SPOT →
        </a>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--slate2)', letterSpacing: '0.12em', marginTop: 12 }}>
          waitlist.cortex-agent.xyz · Referrals move you up the list
        </div>

        {/* Built on */}
        <div style={{
          marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--wire)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate3)', letterSpacing: '0.15em' }}>BUILT ON</span>
          {['SOLANA', 'JUPITER', 'DRIFT', 'HELIUS', 'PYTH', 'OPENSERV'].map(p => (
            <span key={p} style={{
              fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)',
              letterSpacing: '0.15em', padding: '4px 10px',
              border: '1px solid var(--wire)',
            }}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
