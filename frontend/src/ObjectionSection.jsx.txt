import React, { useState } from 'react'

const OBJECTIONS = [
  {
    q: 'Is my wallet safe? Do you hold my keys?',
    a: 'Never. Cortex connects only via cryptographic signature — the same way you sign a transaction on any Solana dApp. We never access your private keys, and your funds never leave your wallet until a trade executes. Every trade passes through the Guardian veto layer before it touches the chain.',
    tag: 'SECURITY',
  },
  {
    q: 'What if the agents make a wrong call?',
    a: 'That\'s exactly why there are 9 of them. Agents work in adversarial configuration — each one is built to challenge the others. Before any trade executes, it must pass 3 separate veto points and the Guardian\'s 9-component risk score. No single agent can force a trade through. If the system is uncertain, it holds.',
    tag: 'RELIABILITY',
  },
  {
    q: 'How is this different from Kamino or Drift vaults?',
    a: 'Kamino and Drift are exceptional at execution in a known environment. Cortex is built for survival in an unknown one. Kamino rebalances after price leaves the range — you\'ve already eaten the loss. Drift vaults are managed by humans between rebalances and are blind to regime. Cortex detects the regime shift before the price moves.',
    tag: 'DIFFERENTIATION',
  },
  {
    q: 'What happens during a black swan event?',
    a: 'Cortex runs Ising cascade detection as part of its Guardian layer — specifically designed to identify systemic risk events where everything moves together. When systemic risk is detected, the system enforces hard capital limits and blocks all execution regardless of what individual agents propose. Survival over profit, always.',
    tag: 'RISK MANAGEMENT',
  },
  {
    q: 'The waitlist says ~254 people. Is this real?',
    a: 'Yes. Cortex is in closed early access on Solana mainnet. The waitlist is the real entry point — signup requires wallet connect and email verification. Referrals move you up the queue. The system is live, the architecture is built, and the team is deploying in waves.',
    tag: 'LEGITIMACY',
  },
  {
    q: 'Can I test it before committing real capital?',
    a: 'Paper trading mode is built in. You can run the full 9-agent pipeline — regime detection, adversarial debate, Guardian veto — against real market conditions with simulated capital. Every decision trace is logged so you can audit exactly what the system decided and why.',
    tag: 'TESTING',
  },
]

export default function ObjectionSection() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{
      padding: '100px 24px',
      borderTop: '1px solid var(--wire)',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--amber)', letterSpacing: '0.25em', marginBottom: 12,
          }}>OBJECTION HANDLING</div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            letterSpacing: '-0.02em', lineHeight: 1,
            color: 'var(--white)',
          }}>
            THE QUESTIONS<br />
            <span style={{ color: 'var(--amber)' }}>YOU SHOULD ASK.</span>
          </h2>
        </div>

        {/* FAQ accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--wire)' }}>
          {OBJECTIONS.map((o, i) => (
            <div
              key={i}
              style={{
                background: open === i ? 'var(--ink2)' : 'var(--ink)',
                transition: 'background 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '20px 24px',
                  background: 'none', border: 'none',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 9,
                    color: open === i ? 'var(--amber)' : 'var(--slate3)',
                    letterSpacing: '0.15em',
                    background: open === i ? 'rgba(255,184,0,0.1)' : 'var(--ink3)',
                    border: `1px solid ${open === i ? 'rgba(255,184,0,0.3)' : 'var(--wire)'}`,
                    padding: '2px 8px', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}>{o.tag}</span>
                  <span style={{
                    fontFamily: 'var(--body)', fontSize: 15,
                    color: open === i ? 'var(--white)' : 'var(--slate)',
                    fontWeight: open === i ? 500 : 400,
                    transition: 'color 0.2s',
                  }}>{o.q}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 18,
                  color: open === i ? 'var(--amber)' : 'var(--slate3)',
                  transition: 'all 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  flexShrink: 0,
                }}>+</span>
              </button>

              {open === i && (
                <div style={{
                  padding: '0 24px 20px 24px',
                  paddingLeft: 'calc(24px + 14px + 60px)',
                  animation: 'dropIn 0.2s ease',
                }}>
                  <p style={{
                    fontFamily: 'var(--body)', fontSize: 14,
                    color: 'var(--slate)', lineHeight: 1.8,
                    borderLeft: '2px solid rgba(255,184,0,0.4)',
                    paddingLeft: 16,
                  }}>{o.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
