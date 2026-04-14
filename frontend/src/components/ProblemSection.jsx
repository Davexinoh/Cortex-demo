import React, { useState } from 'react'

const PROBLEMS = [
  {
    icon: '⚡',
    title: 'Automation without adaptation',
    body: 'Your bot runs fixed rules — buy when RSI hits 30, sell at 70. It was optimized for one regime. When the market shifts, it doesn\'t know. It keeps executing the same playbook into a completely different environment.',
    stat: '90%', statLabel: 'of bots fail in regime transitions',
  },
  {
    icon: '📉',
    title: 'One brain is a liability',
    body: 'A single strategy has a single blind spot. When that blind spot aligns with a market event — a depeg, a liquidation cascade, a regulatory headline — there\'s nothing to catch the error. You find out at liquidation.',
    stat: '$40M+', statLabel: 'lost in a single cascade event, Feb 2025',
  },
  {
    icon: '🕰️',
    title: 'Reacting is already too late',
    body: 'Static bots react to price. By the time price moves, smart money already exited. Kamino rebalances after price leaves the range — you\'ve already eaten the impermanent loss. Drift vaults are blind to regime. The market moves fast. Your bot moves slower.',
    stat: '4 min', statLabel: 'before crash — when Cortex detects the shift',
  },
]

export default function ProblemSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="problem" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 56, maxWidth: 640 }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--red)', letterSpacing: '0.25em', marginBottom: 12,
        }}>THE PROBLEM</div>
        <h2 style={{
          fontFamily: 'var(--display)', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 56px)',
          letterSpacing: '-0.02em', lineHeight: 1,
          marginBottom: 16, color: 'var(--white)',
        }}>
          AUTOMATION WITHOUT <span style={{ color: 'var(--red)' }}>ADAPTATION</span><br />
          IS A FASTER WAY TO LOSE.
        </h2>
        <p style={{
          fontFamily: 'var(--body)', color: 'var(--slate)',
          fontSize: 16, lineHeight: 1.75,
        }}>
          The market has moods. Your bot has one. Crypto cycles through completely
          different phases — accumulation, markup, distribution, markdown, crisis —
          and a strategy that wins in one regime <em style={{ color: 'var(--white)' }}>destroys capital in another.</em>
        </p>
      </div>

      {/* Problem cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--wire)' }}>
        {PROBLEMS.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? 'rgba(255,45,85,0.05)' : 'var(--ink2)',
              padding: '32px 28px',
              borderTop: `2px solid ${hovered === i ? 'var(--red)' : 'transparent'}`,
              transition: 'all 0.25s',
              cursor: 'default',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
            <h3 style={{
              fontFamily: 'var(--display)', fontWeight: 700,
              fontSize: 20, letterSpacing: '0.04em',
              color: 'var(--white)', marginBottom: 12,
            }}>{p.title}</h3>
            <p style={{
              fontFamily: 'var(--body)', fontSize: 14,
              color: 'var(--slate)', lineHeight: 1.75, marginBottom: 24,
            }}>{p.body}</p>
            <div style={{
              borderTop: '1px solid var(--wire)', paddingTop: 16,
              display: 'flex', alignItems: 'baseline', gap: 10,
            }}>
              <span style={{
                fontFamily: 'var(--display)', fontSize: 28,
                color: 'var(--red)', fontWeight: 700,
              }}>{p.stat}</span>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                color: 'var(--slate2)', letterSpacing: '0.1em',
              }}>{p.statLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Regime phases */}
      <div style={{ marginTop: 48 }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          color: 'var(--slate2)', letterSpacing: '0.2em',
          marginBottom: 16, textAlign: 'center',
        }}>THE 5 MARKET REGIMES — YOUR BOT TREATS THEM ALL THE SAME</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { label: 'ACCUMULATION', color: '#00f57a', desc: 'Smart money quietly building' },
            { label: 'MARKUP', color: '#00ffe0', desc: 'Trend confirmed, momentum' },
            { label: 'DISTRIBUTION', color: '#ffb800', desc: 'Looks bullish. Smart money leaving.' },
            { label: 'MARKDOWN', color: '#ff8c00', desc: 'Confirmed downtrend' },
            { label: 'CRISIS', color: '#ff2d55', desc: 'Liquidity collapses. Survival.' },
          ].map((r, i) => (
            <div key={r.label} style={{
              flex: 1, padding: '14px 12px',
              background: `${r.color}10`,
              borderTop: `3px solid ${r.color}`,
              borderRight: i < 4 ? '1px solid var(--wire)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 9,
                color: r.color, letterSpacing: '0.12em',
                marginBottom: 6,
              }}>{r.label}</div>
              <div style={{
                fontFamily: 'var(--body)', fontSize: 11,
                color: 'var(--slate2)', lineHeight: 1.5,
              }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
