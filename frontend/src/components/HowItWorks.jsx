import React from 'react'

const STEPS = [
  { num: '1', title: 'Connect Your Wallet', body: 'Link via cryptographic signature only. Cortex never sees your private keys. Paper trading mode available — test with zero risk.', detail: 'Non-custodial · Signature only', icon: '🔐' },
  { num: '2', title: 'Choose Your Strategy', body: 'Pick from 7 autonomous strategies. Set your risk parameters once. Stop loss, take profit, position sizing — all configurable.', detail: '7 strategies · 30+ risk params', icon: '⚙️' },
  { num: '3', title: 'Cortex Runs 24/7', body: '9 agents activate. Every 400ms the system ingests data, reclassifies the regime, debates the trade, and executes — or holds — based on Guardian approval.', detail: '9 agents · 400ms cycles · Guardian veto', icon: '⚡' },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '80px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
      <div className="section-wrap">

        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--purple)', marginBottom: 16 }}>// HOW IT WORKS</div>
          <h2 style={{ fontFamily: 'var(--pixel)', fontSize: 'clamp(14px, 2.5vw, 22px)', lineHeight: 1.7, color: 'var(--white)' }}>
            From signup to autonomous. Three steps.
          </h2>
        </div>

        {/* Stepper — like waitlist UI */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0, marginBottom: 40, flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s.num}>
              <div style={{ textAlign: 'center', maxWidth: 200, padding: '0 8px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--purple)', color: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--pixel)', fontSize: 16,
                  margin: '0 auto 12px',
                  boxShadow: '0 0 20px var(--purple-glow)',
                }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', letterSpacing: '0.1em' }}>
                  {['WALLET', 'STRATEGY', 'ACTIVE'][i]}
                </div>
              </div>
              {i < 2 && (
                <div style={{
                  width: 60, height: 2, background: 'var(--border)',
                  marginTop: 24, alignSelf: 'flex-start',
                  flexShrink: 0,
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {STEPS.map((s, i) => (
            <div key={i} className="px-card" style={{ borderRadius: 12, borderTop: '2px solid var(--purple)' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--pixel)', fontSize: 11, color: 'var(--white)', marginBottom: 12, lineHeight: 1.6 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2, marginBottom: 14 }}>{s.body}</p>
              <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--purple)', paddingTop: 10, borderTop: '1px solid var(--border)' }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a href="https://waitlist.cortex-agent.xyz" target="_blank" rel="noopener noreferrer"
            className="px-btn px-btn-primary" style={{ borderRadius: 10, fontSize: 9 }}>
            Get Early Access →
          </a>
        </div>

      </div>
    </section>
  )
}
