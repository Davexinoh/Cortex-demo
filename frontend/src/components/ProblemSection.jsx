import React from 'react'

// Section question: "What breaks static bots?"
// ≤12 word answer: "Regime shifts. Static strategies break when market personality changes."
// Flow: Claim → Evidence → Limitation → Next question

export default function ProblemSection() {
  return (
    <section id="problem" style={{ padding: '100px 24px', borderTop: '1px solid var(--wire)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* CLAIM — dominant, single message */}
        <div style={{ maxWidth: 680, marginBottom: 64 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--red)', letterSpacing: '0.25em', marginBottom: 16,
          }}>CLAIM</div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            letterSpacing: '-0.02em', lineHeight: 1.05,
            color: 'var(--white)', marginBottom: 16,
          }}>
            REGIME SHIFTS BREAK STATIC BOTS.<br />
            <span style={{ color: 'var(--red)' }}>EVERY SINGLE TIME.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--body)', fontSize: 15,
            color: 'var(--slate)', lineHeight: 1.75, maxWidth: 520,
          }}>
            A strategy optimized for markup bleeds in markdown. A mean-reversion bot
            that thrives in sideways chop gets liquidated when momentum spikes.
            This isn't bad luck. It's math.
          </p>
        </div>

        {/* EVIDENCE — the 5 regimes with concrete failure modes */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9,
            color: 'var(--slate2)', letterSpacing: '0.2em', marginBottom: 16,
          }}>EVIDENCE — WHAT YOUR BOT DOES IN EACH REGIME</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--wire)' }}>
            {[
              {
                regime: 'ACCUMULATION', color: '#00f57a',
                what: 'Smart money quietly builds positions. Price moves sideways with low volatility.',
                botDoes: 'Interprets as dead market. Either exits or sits idle.',
                botFails: 'Misses the entire setup phase. Enters late on markup.',
              },
              {
                regime: 'MARKUP', color: '#00ffe0',
                what: 'Trend confirmed. Momentum strategies print. Volume expands.',
                botDoes: 'Trend-following rules trigger. Enters long.',
                botFails: 'Works — until distribution begins. Bot can\'t tell the difference.',
              },
              {
                regime: 'DISTRIBUTION', color: '#ffb800',
                what: 'Price looks bullish on the surface. Smart money is quietly exiting.',
                botDoes: 'Still reads as bullish. Adds to positions or holds.',
                botFails: 'Fully long when the rug pulls. Maximum drawdown exposure.',
              },
              {
                regime: 'MARKDOWN', color: '#ff8c00',
                what: 'Confirmed downtrend. Every bounce is a trap.',
                botDoes: 'Stop loss triggers. Then "dip buy" rule fires on the bounce.',
                botFails: 'Sells the real bottom. Buys the dead cat. Liquidated on continuation.',
              },
              {
                regime: 'CRISIS', color: '#ff2d55',
                what: 'Liquidity collapses. Slippage 5x normal. Everything correlates to 1.',
                botDoes: 'All rules fire simultaneously. Conflicting signals. Paralysis or panic.',
                botFails: 'No risk limits enforced. Position blown in minutes.',
              },
            ].map((r, i) => (
              <div key={r.regime} style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 1fr 1fr',
                gap: 0,
                background: 'var(--ink2)',
              }}>
                {/* Regime label */}
                <div style={{
                  padding: '16px 16px',
                  borderRight: '1px solid var(--wire)',
                  borderLeft: `3px solid ${r.color}`,
                  display: 'flex', alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10,
                    color: r.color, letterSpacing: '0.12em',
                  }}>{r.regime}</span>
                </div>
                {/* What's happening */}
                <div style={{ padding: '16px', borderRight: '1px solid var(--wire)' }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 8,
                    color: 'var(--slate3)', letterSpacing: '0.15em', marginBottom: 4,
                  }}>MARKET REALITY</div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--slate)', lineHeight: 1.6 }}>
                    {r.what}
                  </div>
                </div>
                {/* Bot does */}
                <div style={{ padding: '16px', borderRight: '1px solid var(--wire)' }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 8,
                    color: 'var(--slate3)', letterSpacing: '0.15em', marginBottom: 4,
                  }}>BOT DOES</div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--slate)', lineHeight: 1.6 }}>
                    {r.botDoes}
                  </div>
                </div>
                {/* Bot fails */}
                <div style={{ padding: '16px' }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 8,
                    color: 'var(--red)', letterSpacing: '0.15em', marginBottom: 4,
                  }}>FAILURE MODE</div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--slate)', lineHeight: 1.6 }}>
                    {r.botFails}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIMITATION — honest */}
        <div style={{
          background: 'var(--ink2)',
          border: '1px solid var(--wire)',
          borderLeft: '3px solid var(--amber)',
          padding: '20px 24px', marginBottom: 40,
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9,
            color: 'var(--amber)', letterSpacing: '0.2em', marginBottom: 8,
          }}>LIMITATION</div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--slate)', lineHeight: 1.7 }}>
            Detecting regime shifts in real time is genuinely hard. Most systems claim to do it.
            Few expose how. The next section shows exactly what signals Cortex uses,
            what happens when they conflict, and what the system does when it isn't sure.
          </p>
        </div>

        {/* NEXT QUESTION — leads into crisis section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--wire)' }} />
          <a href="#crisis" style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'var(--acid)', letterSpacing: '0.15em',
            textDecoration: 'none',
            border: '1px solid rgba(0,255,224,0.3)',
            padding: '8px 20px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(0,255,224,0.06)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >HOW DOES CORTEX DETECT SHIFTS? →</a>
          <div style={{ flex: 1, height: 1, background: 'var(--wire)' }} />
        </div>

      </div>
    </section>
  )
}
