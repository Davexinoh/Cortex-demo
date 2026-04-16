import React from 'react'

export default function ProblemSection() {
  return (
    <section id="problem" style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
      <div className="section-wrap">

        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--pixel)', fontSize: 8,
            color: 'var(--purple)', marginBottom: 16,
          }}>// THE PROBLEM</div>
          <h2 style={{
            fontFamily: 'var(--pixel)', fontSize: 'clamp(14px, 2.5vw, 22px)',
            lineHeight: 1.7, color: 'var(--white)', marginBottom: 16, maxWidth: 620,
          }}>Regime shifts break static bots. Every single time.</h2>
          <p style={{
            fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--muted)',
            lineHeight: 2, maxWidth: 540,
          }}>
            A strategy optimized for markup bleeds in markdown.
            A mean-reversion bot that thrives in sideways chop
            gets liquidated when momentum spikes. This isn't bad luck. It's math.
          </p>
        </div>

        {/* Regime failure table */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: 'var(--pixel)', fontSize: 7,
            color: 'var(--muted2)', marginBottom: 12,
          }}>WHAT YOUR BOT DOES IN EACH REGIME ↓</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { regime: 'ACCUMULATION', color: '#00e676', market: 'Smart money quietly builds. Low vol.', botDoes: 'Sits idle or exits — reads as dead market', fail: 'Misses entire setup. Enters late on markup.' },
              { regime: 'MARKUP', color: '#7c6cf0', market: 'Trend confirmed. Momentum prints.', botDoes: 'Enters long. Works — for now.', fail: 'Can\'t detect when markup becomes distribution.' },
              { regime: 'DISTRIBUTION', color: '#ffa502', market: 'Looks bullish. Smart money is leaving.', botDoes: 'Still reads bullish. Adds to position.', fail: 'Fully long when the rug pulls. Max drawdown.' },
              { regime: 'MARKDOWN', color: '#ff6b35', market: 'Confirmed downtrend. Every bounce is a trap.', botDoes: 'Stop triggers. Then dip-buy rule fires.', fail: 'Sells the bottom. Buys the dead cat. Liquidated.' },
              { regime: 'CRISIS', color: '#ff4757', market: 'Liquidity collapses. Slippage 5x.', botDoes: 'All rules fire simultaneously. Conflict.', fail: 'No risk limits enforced. Position blown.' },
            ].map((r, i) => (
              <div key={r.regime} className="px-card" style={{
                borderRadius: 8,
                borderLeft: `3px solid ${r.color}`,
                display: 'grid',
                gridTemplateColumns: '120px 1fr 1fr',
                gap: 16, alignItems: 'start',
                padding: '14px 16px',
              }}>
                <div style={{
                  fontFamily: 'var(--pixel)', fontSize: 8,
                  color: r.color,
                }}>{r.regime}</div>
                <div>
                  <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', marginBottom: 4 }}>MARKET</div>
                  <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--muted)', lineHeight: 1.8 }}>{r.market}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--red)', marginBottom: 4 }}>FAILURE MODE</div>
                  <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--muted)', lineHeight: 1.8 }}>{r.fail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitation callout */}
        <div className="px-card" style={{
          borderRadius: 10, borderLeft: '3px solid var(--amber)',
          marginBottom: 32,
        }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--amber)', marginBottom: 8 }}>// LIMITATION</div>
          <p style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--muted)', lineHeight: 2 }}>
            Detecting regime shifts in real time is genuinely hard.
            Most systems claim to do it. Few expose how.
            The next section shows what signals Cortex uses,
            what happens when they conflict, and what it does when it isn't sure.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="#crisis" className="px-btn px-btn-primary" style={{ borderRadius: 10, fontSize: 8 }}>
            How does Cortex detect shifts? →
          </a>
        </div>

      </div>
    </section>
  )
}
