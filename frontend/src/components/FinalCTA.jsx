import React from 'react'

export default function FinalCTA() {
  return (
    <section id="cta" style={{ padding: '80px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)' }}>
      <div className="section-wrap" style={{ textAlign: 'center', maxWidth: 680 }}>

        {/* People joined badge — matches waitlist page */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(124,108,240,0.15)',
          border: '1px solid rgba(124,108,240,0.4)',
          borderRadius: 24, padding: '8px 20px', marginBottom: 40,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px #00e676', display: 'inline-block', animation: 'blink 2s infinite' }} />
          <span style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--white)' }}>299 people joined</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--pixel)', fontSize: 'clamp(16px, 3vw, 28px)',
          lineHeight: 1.7, color: 'var(--white)', marginBottom: 20,
        }}>
          Secure your spot in<br />the next generation
        </h2>

        <p style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--muted)', lineHeight: 2, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
          Regime-aware. Adversarially validated. Guardian-vetoed.
          The only DeFi system built for survival in an unknown market.
          24/7, no human required.
        </p>

        {/* Stats grid like waitlist */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 8, marginBottom: 40,
        }}>
          {[
            { icon: '🧠', val: '9 AI Agents', sub: 'adversarial consensus' },
            { icon: '🔐', val: 'Guardian Veto', sub: '3 veto points' },
            { icon: '⚡', val: '<50ms', sub: 'execution via Jito' },
            { icon: '🌐', val: '24/7', sub: 'no human required' },
          ].map((v, i) => (
            <div key={i} className="px-card" style={{ borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{v.icon}</div>
              <div style={{ fontFamily: 'var(--pixel)', fontSize: 10, color: 'var(--purple)', marginBottom: 4 }}>{v.val}</div>
              <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)' }}>{v.sub}</div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <a href="https://waitlist.cortex-agent.xyz" target="_blank" rel="noopener noreferrer"
          className="px-btn px-btn-primary"
          style={{ borderRadius: 12, fontSize: 11, padding: '16px 48px', display: 'inline-block', marginBottom: 16 }}
          onMouseEnter={e => e.target.style.boxShadow = '0 0 32px var(--purple-glow)'}
          onMouseLeave={e => e.target.style.boxShadow = 'none'}
        >
          Join Waitlist →
        </a>

        <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', marginTop: 12 }}>
          waitlist.cortex-agent.xyz · Referrals give priority access
        </div>

        {/* Protocol strip */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', marginBottom: 16 }}>BUILT ON</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['SOLANA','JUPITER','DRIFT','HELIUS','PYTH','OPENSERV'].map(p => (
              <span key={p} style={{
                fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)',
                padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 6,
                background: 'var(--card)',
              }}>{p}</span>
            ))}
          </div>
        </div>

      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </section>
  )
}
