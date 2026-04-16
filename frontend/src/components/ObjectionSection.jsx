import React, { useState } from 'react'

const FAQS = [
  { q: 'Is my wallet safe?', tag: 'SECURITY', a: 'Cortex connects only via cryptographic signature — the same way you sign any Solana transaction. We never access your private keys, and your funds never leave your wallet until a trade executes.' },
  { q: 'What if the agents make a wrong call?', tag: 'RELIABILITY', a: 'That\'s why there are 9 of them. Agents work in adversarial configuration — each built to challenge the others. Any trade must pass 3 separate veto points. If the system is uncertain, it holds.' },
  { q: 'How is this different from Kamino or Drift vaults?', tag: 'DIFFERENTIATION', a: 'Kamino rebalances after price leaves the range — you\'ve already eaten the loss. Drift vaults are managed by humans between rebalances. Cortex detects the regime shift before the price moves.' },
  { q: 'Can I test before committing real capital?', tag: 'TESTING', a: 'Paper trading mode is built in. Full 9-agent pipeline runs against real market conditions with simulated capital. Every decision trace is logged so you can audit exactly what the system decided and why.' },
  { q: 'How do referrals work?', tag: 'WAITLIST', a: 'After signup you get a referral code with 5 uses. Share it to help others get early access and boost your position in the waitlist queue.' },
]

export default function ObjectionSection() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ padding: '80px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
      <div className="section-wrap" style={{ maxWidth: 760 }}>

        <div style={{ marginBottom: 36, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--purple)', marginBottom: 16 }}>// FAQ</div>
          <h2 style={{ fontFamily: 'var(--pixel)', fontSize: 'clamp(14px, 2.5vw, 20px)', lineHeight: 1.7, color: 'var(--white)' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {FAQS.map((f, i) => (
            <div key={i} className="px-card" style={{ borderRadius: 10, cursor: 'pointer' }}
              onClick={() => setOpen(open === i ? null : i)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontFamily: 'var(--pixel)', fontSize: 6,
                    background: 'rgba(124,108,240,0.15)', color: 'var(--purple)',
                    padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap',
                  }}>{f.tag}</span>
                  <span style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--white)', lineHeight: 1.6 }}>{f.q}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--pixel)', fontSize: 14,
                  color: open === i ? 'var(--purple)' : 'var(--muted2)',
                  transition: 'all 0.2s', flexShrink: 0,
                  transform: open === i ? 'rotate(180deg)' : 'none',
                }}>▼</span>
              </div>
              {open === i && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
