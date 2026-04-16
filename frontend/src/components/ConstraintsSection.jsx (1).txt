import React from 'react'

const CONSTRAINTS = [
  { title: 'Pre-signal black swans', body: 'Cortex cannot preempt events with no signal formation. A protocol exploit, a nation-state ban announced off-hours — if there is no on-chain signal before the price moves, the system reacts. It does not predict.', mitigation: 'Ising cascade detector catches correlated systemic moves within 1-3 cycles after signal forms.' },
  { title: 'Novel market structures', body: 'The regime classifier is trained on historical patterns. A new token with no comparable analog degrades classification accuracy. It classifies as the nearest known regime, which may be wrong.', mitigation: 'New token listings are excluded from the strategy pipeline until 200 candles of history exist. Flagged as UNCLASSIFIED.' },
  { title: 'High RPC throughput', body: '400ms tick speed is measured under normal Solana conditions. During high congestion, RPC latency increases. The 400ms cycle can extend to 800ms+. This is a Solana infrastructure constraint.', mitigation: 'Redundant RPC endpoints with automatic failover. Positions are not opened during degraded conditions.' },
  { title: 'Consensus failure rate', body: 'In high-uncertainty regimes, consensus check at Step 4 fails and no trade is proposed. In late distribution or early crisis, this happens 30-45% of the time. The system will appear to "miss" opportunities.', mitigation: 'Every consensus failure is logged with individual agent scores. You can audit exactly why trades were not taken.' },
  { title: 'The Guardian is not a profit guarantee', body: 'The Guardian enforces risk discipline, not profitability. It can approve a trade that loses money. The stop loss triggers. The capital loss is within approved parameters — which means the system worked correctly.', mitigation: 'Approved trades have explicit stop-loss (default -15%) enforced at execution. Losses beyond this trigger automatic closure.' },
]

export default function ConstraintsSection() {
  return (
    <section id="constraints" style={{ padding: '80px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)' }}>
      <div className="section-wrap" style={{ maxWidth: 800 }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--amber)', marginBottom: 16 }}>// WHERE CORTEX BREAKS</div>
          <h2 style={{ fontFamily: 'var(--pixel)', fontSize: 'clamp(14px, 2.5vw, 22px)', lineHeight: 1.7, color: 'var(--white)', marginBottom: 16 }}>
            Real builders expose their constraints.
          </h2>
          <p style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--muted)', lineHeight: 2, maxWidth: 520 }}>
            These are the actual failure modes — not ones we haven't thought about.
            If a pitch doesn't tell you where it breaks, it isn't a real system.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CONSTRAINTS.map((c, i) => (
            <div key={i} className="px-card" style={{ borderRadius: 10, borderLeft: '3px solid var(--amber)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{
                  fontFamily: 'var(--pixel)', fontSize: 7,
                  background: 'rgba(255,71,87,0.15)', color: 'var(--red)',
                  padding: '3px 8px', borderRadius: 4,
                }}>CONSTRAINT</span>
                <h3 style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--white)', lineHeight: 1.6 }}>{c.title}</h3>
              </div>
              <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2, marginBottom: 12 }}>{c.body}</p>
              <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 12px', borderLeft: '2px solid var(--green)' }}>
                <div style={{ fontFamily: 'var(--pixel)', fontSize: 6, color: 'var(--green)', marginBottom: 4 }}>HOW IT'S HANDLED</div>
                <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', lineHeight: 2 }}>{c.mitigation}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a href="#cta" className="px-btn px-btn-primary" style={{ borderRadius: 10, fontSize: 8 }}>
            Get Early Access →
          </a>
        </div>

      </div>
    </section>
  )
}
