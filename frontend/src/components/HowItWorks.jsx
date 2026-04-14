import React from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Connect Your Wallet',
    body: 'Link via cryptographic signature only. Cortex never sees your private keys. Paper trading mode available — test strategies with zero risk before committing capital.',
    detail: 'Non-custodial · Signature only · No key exposure',
    icon: '🔐',
  },
  {
    num: '02',
    title: 'Choose Your Strategy',
    body: 'Pick from 7 autonomous strategies: spot trading, perpetual futures, DCA, liquidation capture, yield farming, MEV bundles, and LP management. Set your risk parameters once.',
    detail: '7 strategies · 30+ configurable risk params · Set and forget',
    icon: '⚙️',
  },
  {
    num: '03',
    title: 'Cortex Runs 24/7',
    body: '9 agents activate. Every 400ms the system ingests new data, reclassifies the market regime, debates the optimal move, and executes — or holds — based on what the Guardian approves.',
    detail: '9 agents · 400ms cycles · Guardian veto on every trade',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{
      padding: '100px 24px',
      borderTop: '1px solid var(--wire)',
      background: 'var(--ink2)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--acid)', letterSpacing: '0.25em', marginBottom: 12,
          }}>HOW IT WORKS</div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)',
            letterSpacing: '-0.02em', lineHeight: 1,
            color: 'var(--white)',
          }}>
            FROM SIGNUP TO <span style={{ color: 'var(--acid)' }}>AUTONOMOUS.</span><br />
            THREE STEPS.
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              padding: '40px 36px',
              borderRight: i < 2 ? '1px solid var(--wire)' : 'none',
              position: 'relative',
            }}>
              {/* Connector arrow */}
              {i < 2 && (
                <div style={{
                  position: 'absolute', right: -12, top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--mono)', fontSize: 18,
                  color: 'var(--wire2)', zIndex: 2,
                  display: 'none', // hidden on mobile via CSS
                }}>›</div>
              )}

              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{
                  fontFamily: 'var(--display)', fontWeight: 800,
                  fontSize: 48, color: 'var(--wire2)', lineHeight: 1,
                }}>{s.num}</span>
                <span style={{ fontSize: 32 }}>{s.icon}</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--display)', fontWeight: 700,
                fontSize: 24, letterSpacing: '0.04em',
                color: 'var(--white)', marginBottom: 14,
              }}>{s.title}</h3>

              <p style={{
                fontFamily: 'var(--body)', fontSize: 14,
                color: 'var(--slate)', lineHeight: 1.75,
                marginBottom: 20,
              }}>{s.body}</p>

              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                color: 'var(--acid)', letterSpacing: '0.12em',
                borderTop: '1px solid var(--wire)',
                paddingTop: 14,
              }}>{s.detail}</div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div style={{
          marginTop: 48,
          background: 'var(--ink)',
          border: '1px solid var(--wire)',
          borderLeft: '3px solid var(--acid)',
          padding: '20px 28px',
          display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{
            fontFamily: 'var(--display)', fontSize: 18,
            color: 'var(--acid)', fontWeight: 700, whiteSpace: 'nowrap',
          }}>Under 5 minutes</div>
          <div style={{
            fontFamily: 'var(--body)', fontSize: 14,
            color: 'var(--slate)', lineHeight: 1.6, flex: 1,
          }}>
            From signup to active yield farming in under 5 minutes with pre-configured strategy templates.
            No code. No manual management. No 3AM rebalancing sessions.
          </div>
          <a href="https://waitlist.cortex-agent.xyz" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 11,
              background: 'var(--acid)', color: 'var(--ink)',
              padding: '10px 22px', textDecoration: 'none',
              letterSpacing: '0.12em', whiteSpace: 'nowrap',
              clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.boxShadow = '0 0 20px rgba(0,255,224,0.3)'}
            onMouseLeave={e => e.target.style.boxShadow = 'none'}
          >GET EARLY ACCESS</a>
        </div>
      </div>
    </section>
  )
}
