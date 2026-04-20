import React, { useState } from 'react'
import { runPipeline } from '../lib/api.js'

const PAIRS = ['SOL/USDC','JUP/USDC','BONK/SOL','WIF/USDC','RAY/USDC','PYTH/USDC','JTO/USDC']
const STRATEGIES = ['Spot Long','Spot Short','Perp Long 3x','Perp Short 2x','DCA Entry','Yield Farm','Liquidation Capture']
const CONDITIONS = ['Trending Bull','Low Volatility','High Volatility','Pre-News Event','Post-Crash Recovery','Sideways Chop']

const AGENT_META = {
  analyst: { color: 'var(--acid)', bg: 'rgba(0,255,224,0.06)', border: 'rgba(0,255,224,0.2)' },
  researcher: { color: 'var(--amber)', bg: 'rgba(255,184,0,0.06)', border: 'rgba(255,184,0,0.2)' },
  decision: { color: 'var(--green)', bg: 'rgba(0,245,122,0.06)', border: 'rgba(0,245,122,0.2)' },
}

const SENTIMENT_COLOR = { bullish: 'var(--green)', bearish: 'var(--red)', neutral: 'var(--amber)' }

export default function PipelineSection() {
  const [form, setForm] = useState({ pair: 'SOL/USDC', strategy: 'Spot Long', size: 5000, marketCondition: 'Trending Bull' })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [activeStep, setActiveStep] = useState(-1)

  async function run() {
    setLoading(true); setError(null); setData(null); setActiveStep(-1)
    try {
      const result = await runPipeline(form)
      setData(result)
      // Stagger pipeline steps
      for (let i = 0; i <= 4; i++) {
        await new Promise(r => setTimeout(r, i * 300))
        setActiveStep(i)
      }
    } catch (e) {
      setError('Pipeline error. Check API keys.')
    } finally {
      setLoading(false)
    }
  }

  const verdict = data?.decisions?.portfolioManager?.verdict
  const isApproved = verdict === 'APPROVE'

  const STEPS = ['DATA INGEST', 'REGIME CLASS.', 'ANALYSTS ×4', 'RESEARCHERS ×2', 'DECISION LAYER', 'GUARDIAN']

  return (
    <section id="pipeline" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto', borderTop: '1px solid var(--wire)' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acid)', letterSpacing: '0.25em', marginBottom: 12 }}>
          02 — AGENT PIPELINE
        </div>
        <h2 style={{
          fontFamily: 'var(--display)', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 56px)',
          letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 16,
        }}>
          <span style={{ color: 'var(--white)' }}>9 AGENTS. ONE TRADE. </span>
          <span style={{ color: 'var(--acid)' }}>ZERO BLIND SPOTS.</span>
        </h2>
        <p style={{ fontFamily: 'var(--body)', color: 'var(--slate)', fontSize: 16, maxWidth: 560, lineHeight: 1.7 }}>
          Configure a trade proposal. Watch the full multi-agent system debate it —
          analysts, researchers, and decision agents powered by live AI.
        </p>
      </div>

      {/* Form */}
      <div style={{
        background: 'var(--ink2)', border: '1px solid var(--wire)',
        padding: '24px 28px', marginBottom: 28,
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16,
        alignItems: 'end',
      }}>
        {[
          { key: 'pair', label: 'TOKEN PAIR', opts: PAIRS },
          { key: 'strategy', label: 'STRATEGY', opts: STRATEGIES },
          { key: 'marketCondition', label: 'MARKET CONDITION', opts: CONDITIONS },
        ].map(f => (
          <div key={f.key}>
            <label style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>{f.label}</label>
            <select
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              style={{
                width: '100%', background: 'var(--ink)', border: '1px solid var(--wire)',
                color: 'var(--white)', fontFamily: 'var(--mono)', fontSize: 13,
                padding: '9px 12px', outline: 'none', cursor: 'pointer',
              }}
            >
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>SIZE (USDC)</label>
          <input
            type="number" value={form.size}
            onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
            style={{
              width: '100%', background: 'var(--ink)', border: '1px solid var(--wire)',
              color: 'var(--white)', fontFamily: 'var(--mono)', fontSize: 13,
              padding: '9px 12px', outline: 'none',
            }}
          />
        </div>
        <button onClick={run} disabled={loading} style={{
          fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16,
          letterSpacing: '0.12em',
          background: loading ? 'var(--wire)' : 'var(--acid)',
          color: loading ? 'var(--slate2)' : 'var(--ink)',
          border: 'none', padding: '10px 24px', cursor: loading ? 'not-allowed' : 'pointer',
          clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}>
          {loading ? '⟳ RUNNING' : '▶ ANALYZE'}
        </button>
      </div>

      {/* Pipeline progress bar */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
        {STEPS.map((step, i) => {
          const done = activeStep >= i
          const active = activeStep === i && loading
          return (
            <div key={step} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 14px',
              background: done ? 'rgba(0,255,224,0.08)' : 'var(--ink2)',
              border: `1px solid ${done ? 'rgba(0,255,224,0.35)' : 'var(--wire)'}`,
              borderRight: 'none',
              fontFamily: 'var(--mono)', fontSize: 10,
              color: done ? 'var(--acid)' : 'var(--slate2)',
              letterSpacing: '0.1em', whiteSpace: 'nowrap',
              transition: 'all 0.4s',
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `1px solid ${done ? 'var(--acid)' : 'var(--slate3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: done ? 'var(--acid)' : 'var(--slate3)',
                flexShrink: 0,
              }}>{done ? '✓' : i + 1}</span>
              {step}
            </div>
          )
        })}
        <div style={{ borderLeft: '1px solid var(--wire)', flex: 1, background: 'var(--ink2)', minWidth: 20 }} />
      </div>

      {error && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)', padding: '12px 16px', border: '1px solid rgba(255,45,85,0.3)', background: 'rgba(255,45,85,0.06)', marginBottom: 24 }}>{error}</div>
      )}

      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Analysts */}
          <AgentGroup title="ANALYST AGENTS" badge="×4" meta={AGENT_META.analyst}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {(data.analysts || []).map((a, i) => (
                <AgentCard key={i} agent={a} meta={AGENT_META.analyst} />
              ))}
            </div>
          </AgentGroup>

          {/* Researchers */}
          <AgentGroup title="RESEARCHER AGENTS" badge="×2" meta={AGENT_META.researcher}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {(data.researchers || []).map((r, i) => (
                <AgentCard key={i} agent={r} meta={AGENT_META.researcher} />
              ))}
            </div>
          </AgentGroup>

          {/* Decision agents */}
          <AgentGroup title="DECISION AGENTS" badge="×3" meta={AGENT_META.decision}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {[
                { name: 'Trader Agent', icon: '⚡', data: { ...data.decisions?.trader, signal: data.decisions?.trader?.proposal } },
                { name: 'Risk Manager', icon: '⚖️', data: { ...data.decisions?.riskManager, signal: data.decisions?.riskManager?.assessment } },
                { name: 'Portfolio Manager', icon: '🗂️', data: { ...data.decisions?.portfolioManager, signal: data.decisions?.portfolioManager?.decision } },
              ].map((a, i) => <AgentCard key={i} agent={a} meta={AGENT_META.decision} />)}
            </div>
          </AgentGroup>

          {/* Guardian verdict */}
          <div style={{
            background: isApproved ? 'rgba(0,245,122,0.04)' : 'rgba(255,45,85,0.04)',
            border: `1px solid ${isApproved ? 'rgba(0,245,122,0.3)' : 'rgba(255,45,85,0.3)'}`,
            padding: '24px 28px',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.2em', marginBottom: 16 }}>
              🔐 GUARDIAN VETO LAYER — FINAL DECISION
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' }}>
              <div>
                <RiskGauge value={data.decisions?.portfolioManager?.riskScore || 40} label="RISK" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 15, color: 'var(--slate)', lineHeight: 1.7, marginBottom: 12 }}>
                  {data.decisions?.portfolioManager?.verdictReason || '—'}
                </div>
                <ScoreBar label="LIQUIDITY" value={data.decisions?.portfolioManager?.liquidityScore || 75} color="var(--acid)" />
                <ScoreBar label="VOLATILITY" value={data.decisions?.portfolioManager?.volatilityScore || 45} color="var(--amber)" />
              </div>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 28, fontWeight: 800,
                padding: '16px 28px', letterSpacing: '0.1em',
                background: isApproved ? 'rgba(0,245,122,0.12)' : 'rgba(255,45,85,0.12)',
                border: `1px solid ${isApproved ? 'rgba(0,245,122,0.4)' : 'rgba(255,45,85,0.4)'}`,
                color: isApproved ? 'var(--green)' : 'var(--red)',
                textAlign: 'center', whiteSpace: 'nowrap',
              }}>
                {isApproved ? '✓ APPROVED' : '✗ VETOED'}
              </div>
            </div>

            {isApproved && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--wire)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                {[
                  { label: 'PROTOCOL', value: data.decisions?.portfolioManager?.protocol || '—' },
                  { label: 'STOP LOSS', value: `${data.decisions?.riskManager?.stopLossPct || -15}%`, col: 'var(--red)' },
                  { label: 'TAKE PROFIT', value: `+${data.decisions?.riskManager?.takeProfitPct || 45}%`, col: 'var(--green)' },
                  { label: 'EXPECTED APY', value: `~${data.decisions?.portfolioManager?.expectedAPY || 27}%`, col: 'var(--acid)' },
                  { label: 'R:R RATIO', value: data.decisions?.riskManager?.riskReward || '1:3' },
                  { label: 'MEV PROTECTION', value: 'Jito Bundle', col: 'var(--acid)' },
                ].map(e => (
                  <div key={e.label} style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>
                    <div style={{ color: 'var(--slate2)', fontSize: 9, letterSpacing: '0.15em', marginBottom: 3 }}>{e.label}</div>
                    <div style={{ color: e.col || 'var(--white)', fontWeight: 600 }}>{e.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function AgentGroup({ title, badge, meta, children }) {
  return (
    <div style={{ border: '1px solid var(--wire)', background: 'var(--ink2)' }}>
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid var(--wire)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--ink3)',
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: meta.color, boxShadow: `0 0 8px ${meta.color}`,
        }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: meta.color, letterSpacing: '0.15em' }}>{title}</span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 9, color: meta.color,
          background: meta.bg, border: `1px solid ${meta.border}`,
          padding: '1px 8px', letterSpacing: '0.1em',
        }}>{badge}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  )
}

function AgentCard({ agent, meta }) {
  const s = agent.data?.sentiment || 'neutral'
  return (
    <div style={{
      background: 'var(--ink)', border: `1px solid ${meta.border}`,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.12em', marginBottom: 3 }}>
            {agent.icon}
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 15, color: 'var(--white)', fontWeight: 700, letterSpacing: '0.05em' }}>
            {agent.name}
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          color: SENTIMENT_COLOR[s] || 'var(--slate)',
          background: `${SENTIMENT_COLOR[s]}18`,
          border: `1px solid ${SENTIMENT_COLOR[s]}40`,
          padding: '3px 8px', letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>{s}</div>
      </div>
      <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--slate)', lineHeight: 1.55 }}>
        {agent.data?.signal || agent.data?.finding || agent.data?.proposal || agent.data?.assessment || agent.data?.decision || '—'}
      </div>
      {agent.data?.confidence !== undefined && (
        <div style={{ marginTop: 8 }}>
          <ScoreBar label="CONFIDENCE" value={agent.data.confidence} color={meta.color} />
        </div>
      )}
      {agent.data?.score !== undefined && (
        <div style={{ marginTop: 8 }}>
          <ScoreBar label="SAFETY SCORE" value={agent.data.score} color={meta.color} />
        </div>
      )}
      {agent.data?.depthScore !== undefined && (
        <div style={{ marginTop: 8 }}>
          <ScoreBar label="DEPTH SCORE" value={agent.data.depthScore} color={meta.color} />
        </div>
      )}
    </div>
  )
}

function ScoreBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.12em', marginBottom: 3 }}>
        <span>{label}</span><span style={{ color }}>{value}%</span>
      </div>
      <div style={{ height: 3, background: 'var(--wire)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 2, transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}

function RiskGauge({ value, label }) {
  const color = value < 40 ? 'var(--green)' : value < 65 ? 'var(--amber)' : 'var(--red)'
  const r = 28, circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--wire)" strokeWidth="5" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="40" y="44" textAnchor="middle" fontFamily="var(--display)" fontSize="16" fill={color} fontWeight="700">{value}</text>
      </svg>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--slate2)', letterSpacing: '0.15em' }}>{label}</div>
    </div>
  )
                }
                                          
