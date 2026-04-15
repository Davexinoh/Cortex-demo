import React from 'react'

// Section question: "Where does Cortex actually fail?"
// ≤12 word answer: "Pre-signal events, novel structures, high throughput — all degrade accuracy."

const CONSTRAINTS = [
  {
    title: 'Pre-signal black swans',
    honest: 'Cortex cannot preempt events that have no signal formation. A protocol exploit at the smart contract level, a nation-state ban announced off-hours, or an exchange insolvency — if there is no on-chain signal before the price moves, the system reacts. It does not predict.',
    mitigation: 'The Guardian\'s Ising cascade detector catches correlated systemic moves within 1–3 cycles after signal forms. This is faster than a human trader but not instantaneous.',
  },
  {
    title: 'Novel market structures',
    honest: 'The regime classifier is trained on historical patterns. A genuinely new market structure — a token with no comparable analog, a new derivative product with no funding rate history — degrades classification accuracy. The system will classify it as the nearest known regime, which may be wrong.',
    mitigation: 'New token listings are automatically excluded from the strategy pipeline until 200 candles of history exist. They are flagged as UNCLASSIFIED and no trades are proposed.',
  },
  {
    title: 'High RPC throughput conditions',
    honest: 'The 400ms tick speed is measured under normal Solana network conditions. During high congestion events — major token launches, network stress — RPC latency increases. The 400ms cycle can extend to 800ms or longer. This is a Solana infrastructure constraint, not a Cortex one, but it affects the system.',
    mitigation: 'Cortex uses redundant RPC endpoints with automatic failover. Decision cycles that exceed 2x the normal latency are flagged in the audit log and positions are not opened during degraded conditions.',
  },
  {
    title: 'Consensus failure rate',
    honest: 'When 4 analyst agents disagree strongly, the consensus check at Step 4 fails and no trade is proposed. In high-uncertainty regimes (late distribution, early crisis), this happens frequently. The system will appear to "miss" opportunities that a human trader might take. This is intentional.',
    mitigation: 'The system logs every consensus failure with the individual agent scores. You can audit exactly why trades were not taken. The failure rate in sideways/uncertain markets typically runs 30–45% of proposals.',
  },
  {
    title: 'The Guardian is not a profit guarantee',
    honest: 'The Guardian enforces risk discipline, not profitability. It can approve a trade that loses money. The stop loss triggers. The capital loss is within the approved parameters — which means the system worked correctly. Losses are expected, constrained, and logged.',
    mitigation: 'Approved trades have explicit stop-loss parameters (default -15%) enforced at execution. Losses beyond this trigger automatic position closure regardless of any subsequent agent signals.',
  },
]

export default function ConstraintsSection() {
  return (
    <section id="constraints" style={{
      padding: '100px 24px',
      borderTop: '1px solid var(--wire)',
      background: 'var(--ink2)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header — one question */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--amber)', letterSpacing: '0.25em', marginBottom: 12,
          }}>WHERE CORTEX BREAKS</div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.02em', lineHeight: 1,
            color: 'var(--white)', marginBottom: 14,
          }}>
            REAL BUILDERS EXPOSE<br />
            <span style={{ color: 'var(--amber)' }}>THEIR CONSTRAINTS.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--body)', fontSize: 15,
            color: 'var(--slate)', lineHeight: 1.7, maxWidth: 560,
          }}>
            These are the actual failure modes. Not edge cases we haven't thought about —
            ones the system was specifically designed around.
            If a pitch doesn't tell you where it breaks, it isn't a real system.
          </p>
        </div>

        {/* Constraints */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--wire)' }}>
          {CONSTRAINTS.map((c, i) => (
            <div key={i} style={{
              background: 'var(--ink)',
              padding: '24px 28px',
              borderLeft: '3px solid rgba(255,184,0,0.4)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 9,
                  color: 'var(--red)', background: 'rgba(255,45,85,0.08)',
                  border: '1px solid rgba(255,45,85,0.2)',
                  padding: '2px 8px', letterSpacing: '0.12em',
                  whiteSpace: 'nowrap', marginTop: 2,
                }}>CONSTRAINT</span>
                <h3 style={{
                  fontFamily: 'var(--display)', fontWeight: 700,
                  fontSize: 18, color: 'var(--white)', letterSpacing: '0.04em',
                }}>{c.title}</h3>
              </div>

              <p style={{
                fontFamily: 'var(--body)', fontSize: 14,
                color: 'var(--slate)', lineHeight: 1.75, marginBottom: 14,
              }}>{c.honest}</p>

              <div style={{
                background: 'var(--ink2)',
                border: '1px solid var(--wire)',
                borderLeft: '2px solid var(--green)',
                padding: '12px 16px',
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 8,
                  color: 'var(--green)', letterSpacing: '0.15em',
                  display: 'block', marginBottom: 4,
                }}>HOW IT'S HANDLED</span>
                <p style={{
                  fontFamily: 'var(--body)', fontSize: 13,
                  color: 'var(--slate2)', lineHeight: 1.7,
                }}>{c.mitigation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chain to CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--wire)' }} />
          <a href="#cta" style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'var(--acid)', letterSpacing: '0.15em',
            textDecoration: 'none', border: '1px solid rgba(0,255,224,0.3)',
            padding: '8px 20px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(0,255,224,0.06)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >GET EARLY ACCESS →</a>
          <div style={{ flex: 1, height: 1, background: 'var(--wire)' }} />
        </div>

      </div>
    </section>
  )
}
