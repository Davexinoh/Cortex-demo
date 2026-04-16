import React, { useState } from 'react'
import { runCrisis } from '../lib/api.js'

const SCENARIOS = [
  { id: 'depeg', label: 'Stablecoin Depeg', sub: 'USDC → $0.91 · SOL -22% in 90min' },
  { id: 'liquidation', label: 'Cascade Liquidation', sub: '$40M whale liquidated · BTC -12% in 4min' },
  { id: 'flashcrash', label: 'Flash Crash', sub: 'Regulatory headline · SOL -18% in 11min' },
]

export default function CrisisSection() {
  const [selected, setSelected] = useState('depeg')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function simulate() {
    setLoading(true); setError(null); setData(null)
    try {
      setData(await runCrisis(selected))
    } catch { setError('Simulation failed. Check API keys.') }
    finally { setLoading(false) }
  }

  const STATUS_COLOR = {
    LIQUIDATED: 'var(--red)', 'CAPITAL PRESERVED': 'var(--green)',
    DEFENSIVE: 'var(--amber)', ALERT: 'var(--amber)',
    PROTECTED: 'var(--green)', SAFE: 'var(--green)', POSITIONED: 'var(--purple)',
  }

  return (
    <section id="crisis" style={{ padding: '80px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)' }}>
      <div className="section-wrap">

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--purple)', marginBottom: 16 }}>
            // CRISIS SIMULATION
          </div>
          <h2 style={{
            fontFamily: 'var(--pixel)', fontSize: 'clamp(14px, 2.5vw, 22px)',
            lineHeight: 1.7, color: 'var(--white)', marginBottom: 16, maxWidth: 600,
          }}>The crash already happened. Cortex knew first.</h2>
          <p style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--muted)', lineHeight: 2, maxWidth: 520 }}>
            Pick a real market crisis. Watch a static bot get liquidated step by step.
            Then watch Cortex detect the regime shift before the crash.
          </p>
        </div>

        {/* Scenario selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {SCENARIOS.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              fontFamily: 'var(--pixel)', fontSize: 8,
              padding: '12px 16px', cursor: 'pointer',
              background: selected === s.id ? 'rgba(255,71,87,0.15)' : 'var(--card)',
              border: `1px solid ${selected === s.id ? 'var(--red)' : 'var(--border)'}`,
              color: selected === s.id ? 'var(--white)' : 'var(--muted)',
              borderRadius: 10, textAlign: 'left', transition: 'all 0.2s',
            }}>
              <div style={{ marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 7, color: 'var(--muted2)' }}>{s.sub}</div>
            </button>
          ))}
        </div>

        <button onClick={simulate} disabled={loading} style={{
          fontFamily: 'var(--pixel)', fontSize: 9,
          background: loading ? 'var(--card)' : 'var(--red)',
          color: loading ? 'var(--muted)' : 'var(--white)',
          border: 'none', padding: '14px 28px', cursor: loading ? 'not-allowed' : 'pointer',
          borderRadius: 10, marginBottom: 32, transition: 'all 0.2s',
        }}>
          {loading ? '⟳ Simulating...' : '▶ Run Crisis Simulation'}
        </button>

        {error && (
          <div className="px-card" style={{ borderLeft: '3px solid var(--red)', borderRadius: 10, marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--red)' }}>{error}</p>
          </div>
        )}

        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Regime detection */}
            <div className="px-card" style={{ borderRadius: 12, borderLeft: '3px solid var(--purple)' }}>
              <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--purple)', marginBottom: 16 }}>
                ⚙ REGIME CLASSIFIER — MARKOV SWITCHING MODEL
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'INITIAL REGIME', value: data.regime?.initialRegime, color: 'var(--amber)' },
                  { label: 'DETECTED', value: data.regime?.detectedRegime, color: 'var(--red)' },
                  { label: 'CONFIDENCE', value: `${data.regime?.confidencePct}%`, color: 'var(--purple)' },
                  { label: 'LEAD TIME', value: `${data.regime?.detectionLeadMinutes} min`, color: 'var(--green)' },
                ].map(m => (
                  <div key={m.label} style={{
                    background: 'var(--bg3)', borderRadius: 8, padding: '12px',
                    borderTop: `2px solid ${m.color}`,
                  }}>
                    <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', marginBottom: 6 }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--pixel)', fontSize: 12, color: m.color }}>{m.value || '—'}</div>
                  </div>
                ))}
              </div>
              {(data.regime?.signals || []).map((sig, i) => (
                <div key={i} style={{
                  background: 'var(--bg3)', borderRadius: 6, padding: '8px 12px',
                  marginBottom: 6, fontFamily: 'var(--pixel)', fontSize: 7,
                  display: 'flex', gap: 12,
                }}>
                  <span style={{ color: 'var(--purple)', whiteSpace: 'nowrap' }}>[{sig.source}]</span>
                  <span style={{ color: 'var(--muted)' }}>{sig.signal}</span>
                </div>
              ))}
            </div>

            {/* Side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* Static bot */}
              <div className="px-card" style={{ borderRadius: 12, borderTop: '2px solid var(--red)' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
                }}>
                  <span style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--red)' }}>✗ Static Bot</span>
                  <span style={{
                    fontFamily: 'var(--pixel)', fontSize: 7,
                    background: 'rgba(255,71,87,0.15)', color: 'var(--red)',
                    padding: '3px 8px', borderRadius: 6,
                  }}>{data.staticBot?.status || 'LIQUIDATED'}</span>
                </div>
                {(data.staticBot?.steps || []).map((step, i) => (
                  <div key={i} style={{
                    background: 'var(--bg3)', borderRadius: 6,
                    padding: '8px 10px', marginBottom: 6,
                    display: 'grid', gridTemplateColumns: '52px 1fr',
                    gap: 8,
                  }}>
                    <span style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)' }}>{step.time}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 1.8 }}>{step.action}</div>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: step.pnl?.startsWith('-') ? 'var(--red)' : 'var(--green)', marginTop: 2 }}>
                        {step.pnl}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{
                  background: 'rgba(255,71,87,0.1)', borderRadius: 8,
                  padding: '10px', marginTop: 8, textAlign: 'center',
                  fontFamily: 'var(--pixel)', fontSize: 14, color: 'var(--red)',
                }}>
                  {data.staticBot?.finalPnL || '—'}
                </div>
              </div>

              {/* Cortex */}
              <div className="px-card" style={{ borderRadius: 12, borderTop: '2px solid var(--green)' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
                }}>
                  <span style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--green)' }}>✓ Cortex</span>
                  <span style={{
                    fontFamily: 'var(--pixel)', fontSize: 7,
                    background: 'rgba(0,230,118,0.1)', color: 'var(--green)',
                    padding: '3px 8px', borderRadius: 6,
                  }}>{data.cortex?.status || 'CAPITAL PRESERVED'}</span>
                </div>
                {(data.cortex?.steps || []).map((step, i) => (
                  <div key={i} style={{
                    background: 'var(--bg3)', borderRadius: 6,
                    padding: '8px 10px', marginBottom: 6,
                    display: 'grid', gridTemplateColumns: '52px 1fr',
                    gap: 8,
                  }}>
                    <span style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: step.time?.startsWith('T-') ? 'var(--purple)' : 'var(--muted2)' }}>{step.time}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--purple)', marginBottom: 2 }}>{step.agent}</div>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 1.8 }}>{step.action}</div>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: STATUS_COLOR[step.status] || 'var(--green)', marginTop: 2 }}>
                        ● {step.status}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{
                  background: 'rgba(0,230,118,0.08)', borderRadius: 8,
                  padding: '10px', marginTop: 8, textAlign: 'center',
                  fontFamily: 'var(--pixel)', fontSize: 12, color: 'var(--green)',
                }}>
                  {data.cortex?.finalPnL} · {data.cortex?.capitalPreserved} preserved
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="px-card" style={{ borderRadius: 10, borderLeft: '3px solid var(--purple)' }}>
              <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', marginBottom: 8 }}>CORTEX INTELLIGENCE SUMMARY</div>
              <p style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--muted)', lineHeight: 2 }}>
                {data.regime?.summary}
              </p>
            </div>

          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="#pipeline" className="px-btn px-btn-primary" style={{ borderRadius: 10, fontSize: 8 }}>
            What does Cortex do instead? →
          </a>
        </div>

      </div>
    </section>
  )
}
