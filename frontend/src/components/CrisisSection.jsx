import React, { useState } from 'react'
import { runCrisis } from '../lib/api.js'

const SCENARIOS = [
  { id: 'depeg', label: 'Stablecoin Depeg', icon: '💀', sub: 'USDC drops to $0.91 · SOL -22% in 90min' },
  { id: 'liquidation', label: 'Cascade Liquidation', icon: '⚡', sub: '$40M whale liquidated · BTC -12% in 4min' },
  { id: 'flashcrash', label: 'Flash Crash', icon: '🌊', sub: 'Regulatory headline · SOL -18% in 11min' },
]

const STATUS_COLORS = {
  LIQUIDATED: 'var(--red)', 'CAPITAL PRESERVED': 'var(--green)',
  DEFENSIVE: 'var(--amber)', ALERT: 'var(--amber)',
  PROTECTED: 'var(--green)', SAFE: 'var(--green)', POSITIONED: 'var(--acid)',
}

export default function CrisisSection() {
  const [selected, setSelected] = useState('depeg')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [phase, setPhase] = useState(0) // animation phase

  async function simulate() {
    setLoading(true)
    setError(null)
    setData(null)
    setPhase(0)
    try {
      const result = await runCrisis(selected)
      setData(result)
      // Stagger reveal phases
      setTimeout(() => setPhase(1), 200)
      setTimeout(() => setPhase(2), 600)
      setTimeout(() => setPhase(3), 1200)
    } catch (e) {
      setError('Failed to run simulation. Check your API keys.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="crisis" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--acid)', letterSpacing: '0.25em',
          marginBottom: 12,
        }}>01 — CRISIS SIMULATION</div>
        <h2 style={{
          fontFamily: 'var(--display)', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 56px)',
          letterSpacing: '-0.02em', lineHeight: 1,
          marginBottom: 16,
        }}>
          <span style={{ color: 'var(--white)' }}>THE CRASH ALREADY </span>
          <span style={{ color: 'var(--red)', textShadow: '0 0 30px rgba(255,45,85,0.3)' }}>HAPPENED.</span>
          <br />
          <span style={{ color: 'var(--slate)' }}>CORTEX KNEW FIRST.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--body)', color: 'var(--slate)',
          fontSize: 16, maxWidth: 560, lineHeight: 1.7,
        }}>
          Pick a real market crisis. Watch a static bot get liquidated step by step.
          Then watch Cortex detect the regime shift <em style={{ color: 'var(--white)' }}>before the crash</em> and preserve capital.
        </p>
      </div>

      {/* Scenario picker */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        {SCENARIOS.map(s => (
          <button key={s.id} onClick={() => setSelected(s.id)} style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            padding: '12px 20px', cursor: 'pointer',
            background: selected === s.id ? 'rgba(255,45,85,0.12)' : 'var(--ink2)',
            border: selected === s.id ? '1px solid var(--red)' : '1px solid var(--wire)',
            color: selected === s.id ? 'var(--white)' : 'var(--slate)',
            transition: 'all 0.2s',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon} {s.label}</div>
            <div style={{ fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.12em' }}>{s.sub}</div>
          </button>
        ))}
      </div>

      {/* Run button */}
      <button onClick={simulate} disabled={loading} style={{
        fontFamily: 'var(--display)', fontWeight: 800,
        fontSize: 18, letterSpacing: '0.12em',
        background: loading ? 'var(--ink3)' : 'var(--red)',
        color: loading ? 'var(--slate2)' : 'var(--white)',
        border: 'none', padding: '16px 40px',
        cursor: loading ? 'not-allowed' : 'pointer',
        marginBottom: 40,
        clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
        transition: 'all 0.2s',
        boxShadow: loading ? 'none' : '0 0 28px rgba(255,45,85,0.2)',
      }}>
        {loading ? '⟳ SIMULATING...' : '▶ RUN CRISIS SIMULATION'}
      </button>

      {error && (
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 12,
          color: 'var(--red)', padding: '12px 16px',
          border: '1px solid rgba(255,45,85,0.3)',
          background: 'rgba(255,45,85,0.06)', marginBottom: 24,
        }}>{error}</div>
      )}

      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Regime detection card */}
          {phase >= 1 && (
            <div style={{
              background: 'var(--ink2)', border: '1px solid rgba(0,255,224,0.2)',
              padding: '24px 28px',
              animation: 'fadeUp 0.5s ease both',
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--acid)',
                letterSpacing: '0.2em', marginBottom: 16,
              }}>⚙ REGIME CLASSIFIER — MARKOV SWITCHING MODEL</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'INITIAL REGIME', value: data.regime?.initialRegime || '—', color: 'var(--amber)' },
                  { label: 'DETECTED REGIME', value: data.regime?.detectedRegime || '—', color: 'var(--red)' },
                  { label: 'CONFIDENCE', value: `${data.regime?.confidencePct || 0}%`, color: 'var(--acid)' },
                  { label: 'LEAD TIME', value: `${data.regime?.detectionLeadMinutes || 0} min early`, color: 'var(--green)' },
                ].map(m => (
                  <div key={m.label} style={{ borderLeft: `2px solid ${m.color}`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.15em', marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: m.color, fontWeight: 700 }}>{m.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(data.regime?.signals || []).map((sig, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    fontFamily: 'var(--mono)', fontSize: 11,
                    padding: '6px 10px', background: 'var(--ink3)',
                    border: '1px solid var(--wire)',
                  }}>
                    <span style={{ color: 'var(--acid)', whiteSpace: 'nowrap' }}>[{sig.source}]</span>
                    <span style={{ color: 'var(--slate)' }}>{sig.signal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Side by side comparison */}
          {phase >= 2 && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              animation: 'fadeUp 0.5s ease both',
            }}>
              {/* Static bot */}
              <div style={{
                background: 'rgba(255,45,85,0.04)',
                border: '1px solid rgba(255,45,85,0.25)',
                padding: '20px 24px',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 9,
                  color: 'var(--red)', letterSpacing: '0.2em', marginBottom: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span>✗ STATIC BOT</span>
                  <span style={{
                    background: 'rgba(255,45,85,0.15)', padding: '2px 10px',
                    fontFamily: 'var(--display)', fontSize: 13, letterSpacing: '0.1em',
                    color: 'var(--red)',
                  }}>{data.staticBot?.status || 'LIQUIDATED'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {(data.staticBot?.steps || []).map((step, i) => (
                    <div key={i} style={{
                      padding: '8px 10px', background: 'var(--ink)',
                      border: '1px solid var(--wire)',
                      display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10,
                    }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--slate2)' }}>{step.time}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--slate)', lineHeight: 1.4 }}>{step.action}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: step.pnl?.startsWith('-') ? 'var(--red)' : 'var(--green)', marginTop: 2 }}>
                          {step.pnl} · {step.outcome}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 16, padding: '10px 14px',
                  background: 'rgba(255,45,85,0.1)', border: '1px solid rgba(255,45,85,0.3)',
                  fontFamily: 'var(--display)', fontSize: 24, color: 'var(--red)',
                  textAlign: 'center', letterSpacing: '0.05em',
                }}>
                  FINAL: {data.staticBot?.finalPnL || '—'}
                </div>
              </div>

              {/* Cortex */}
              <div style={{
                background: 'rgba(0,245,122,0.03)',
                border: '1px solid rgba(0,245,122,0.2)',
                padding: '20px 24px',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 9,
                  color: 'var(--green)', letterSpacing: '0.2em', marginBottom: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span>✓ CORTEX AGENT</span>
                  <span style={{
                    background: 'rgba(0,245,122,0.12)', padding: '2px 10px',
                    fontFamily: 'var(--display)', fontSize: 13, letterSpacing: '0.1em',
                    color: 'var(--green)',
                  }}>{data.cortex?.status || 'CAPITAL PRESERVED'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {(data.cortex?.steps || []).map((step, i) => (
                    <div key={i} style={{
                      padding: '8px 10px', background: 'var(--ink)',
                      border: '1px solid var(--wire)',
                      display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10,
                    }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: step.time?.startsWith('T-') ? 'var(--acid)' : 'var(--slate2)' }}>{step.time}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--acid)', letterSpacing: '0.1em', marginBottom: 2 }}>{step.agent}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--slate)', lineHeight: 1.4 }}>{step.action}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: STATUS_COLORS[step.status] || 'var(--green)', marginTop: 2 }}>
                          ● {step.status} · {step.outcome}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 16, padding: '10px 14px',
                  background: 'rgba(0,245,122,0.08)', border: '1px solid rgba(0,245,122,0.25)',
                  fontFamily: 'var(--display)', fontSize: 24, color: 'var(--green)',
                  textAlign: 'center', letterSpacing: '0.05em',
                }}>
                  FINAL: {data.cortex?.finalPnL || '+2.1%'} · {data.cortex?.capitalPreserved || '100%'} PRESERVED
                </div>
              </div>
            </div>
          )}

          {/* Insight callout */}
          {phase >= 3 && (
            <div style={{
              background: 'var(--ink2)', border: '1px solid var(--wire2)',
              padding: '20px 28px',
              borderLeft: '3px solid var(--acid)',
              animation: 'fadeUp 0.5s ease both',
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)',
                letterSpacing: '0.2em', marginBottom: 8,
              }}>CORTEX INTELLIGENCE SUMMARY</div>
              <p style={{
                fontFamily: 'var(--body)', fontSize: 15, color: 'var(--slate)',
                lineHeight: 1.7,
              }}>
                {data.regime?.summary || 'Regime shift detected before the market crash. Capital preserved through adversarial agent consensus.'}
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
              }
      
