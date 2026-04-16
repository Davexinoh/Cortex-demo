import React, { useState } from 'react'
import { runPipeline } from '../lib/api.js'

const PAIRS = ['SOL/USDC','JUP/USDC','BONK/SOL','WIF/USDC','RAY/USDC','PYTH/USDC']
const STRATEGIES = ['Spot Long','Spot Short','Perp Long 3x','Perp Short 2x','DCA Entry','Yield Farm']
const CONDITIONS = ['Trending Bull','Low Volatility','High Volatility','Pre-News Event','Post-Crash','Sideways Chop']

function StepBox({ num, title, input, transform, output, accent = 'var(--purple)', children }) {
  return (
    <div className="px-card" style={{ borderRadius: 12, borderLeft: `3px solid ${accent}`, marginBottom: 8 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--border)',
      }}>
        <span style={{
          fontFamily: 'var(--pixel)', fontSize: 10,
          background: accent, color: 'var(--bg)',
          padding: '4px 10px', borderRadius: 6,
        }}>STEP {num}</span>
        <span style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--white)' }}>{title}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: children ? 14 : 0 }}>
        {[
          { label: 'INPUT', value: input, color: 'var(--muted2)' },
          { label: 'TRANSFORMATION', value: transform, color: 'var(--muted2)' },
          { label: 'OUTPUT', value: output, color: accent },
        ].map(col => (
          <div key={col.label} style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontFamily: 'var(--pixel)', fontSize: 6, color: col.color, marginBottom: 6, letterSpacing: '0.1em' }}>{col.label}</div>
            <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2, whiteSpace: 'pre-line' }}>{col.value}</div>
          </div>
        ))}
      </div>

      {children && <div>{children}</div>}
    </div>
  )
}

function AgentMini({ name, icon, sentiment, signal, score, scoreLabel }) {
  const sc = { bullish: 'var(--green)', bearish: 'var(--red)', neutral: 'var(--amber)' }
  const c = sc[sentiment] || sc.neutral
  return (
    <div style={{
      background: 'var(--bg3)', borderRadius: 8, padding: '12px',
      borderTop: `2px solid ${c}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--white)' }}>{icon} {name}</span>
        <span style={{
          fontFamily: 'var(--pixel)', fontSize: 7,
          color: c, background: `${c}18`, padding: '2px 6px', borderRadius: 4,
        }}>{sentiment}</span>
      </div>
      <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 8 }}>{signal || '—'}</p>
      {score !== undefined && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--pixel)', fontSize: 6, color: 'var(--muted2)', marginBottom: 4 }}>
            <span>{scoreLabel}</span><span style={{ color: c }}>{score}</span>
          </div>
          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, score || 0)}%`, background: c, transition: 'width 1s ease' }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function PipelineSection() {
  const [form, setForm] = useState({ pair: 'SOL/USDC', strategy: 'Spot Long', size: 5000, marketCondition: 'Trending Bull' })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function run() {
    setLoading(true); setError(null); setData(null)
    try { setData(await runPipeline(form)) }
    catch { setError('Pipeline failed. Check API keys.') }
    finally { setLoading(false) }
  }

  const pm = data?.decisions?.portfolioManager
  const rm = data?.decisions?.riskManager
  const tr = data?.decisions?.trader
  const isApproved = pm?.verdict === 'APPROVE'
  const bullish = (data?.analysts || []).filter(a => a.data?.sentiment === 'bullish').length
  const bearish = (data?.analysts || []).filter(a => a.data?.sentiment === 'bearish').length
  const consensusScore = data ? ((bullish - bearish) / 4).toFixed(2) : null
  const consensusPassed = consensusScore !== null && Math.abs(parseFloat(consensusScore)) >= 0.5

  return (
    <section id="pipeline" style={{ padding: '80px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)' }}>
      <div className="section-wrap">

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--purple)', marginBottom: 16 }}>// AGENT PIPELINE</div>
          <h2 style={{
            fontFamily: 'var(--pixel)', fontSize: 'clamp(14px, 2.5vw, 22px)',
            lineHeight: 1.7, color: 'var(--white)', marginBottom: 16, maxWidth: 600,
          }}>What happens to a trade before it executes.</h2>
          <p style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: 'var(--muted)', lineHeight: 2, maxWidth: 520 }}>
            Every step shows exactly what the system receives,
            what it does with it, and what it outputs.
          </p>
        </div>

        {/* Form */}
        <div className="px-card" style={{
          borderRadius: 12, marginBottom: 24,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12, alignItems: 'end',
        }}>
          {[
            { key: 'pair', label: 'TOKEN PAIR', opts: PAIRS },
            { key: 'strategy', label: 'STRATEGY', opts: STRATEGIES },
            { key: 'marketCondition', label: 'CONDITION', opts: CONDITIONS },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', display: 'block', marginBottom: 6 }}>{f.label}</label>
              <select value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
                  color: 'var(--white)', fontFamily: 'var(--pixel)', fontSize: 8,
                  padding: '8px 10px', outline: 'none', cursor: 'pointer', borderRadius: 6,
                }}>
                {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted2)', display: 'block', marginBottom: 6 }}>SIZE (USDC)</label>
            <input type="number" value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
              style={{
                width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
                color: 'var(--white)', fontFamily: 'var(--pixel)', fontSize: 8,
                padding: '8px 10px', outline: 'none', borderRadius: 6,
              }} />
          </div>
          <button onClick={run} disabled={loading}
            className="px-btn px-btn-primary"
            style={{ borderRadius: 8, fontSize: 8, width: '100%', opacity: loading ? 0.6 : 1 }}>
            {loading ? '⟳ Running' : '▶ Run Pipeline'}
          </button>
        </div>

        {error && (
          <div className="px-card" style={{ borderLeft: '3px solid var(--red)', borderRadius: 10, marginBottom: 16 }}>
            <p style={{ fontFamily: 'var(--pixel)', fontSize: 8, color: 'var(--red)' }}>{error}</p>
          </div>
        )}

        {/* Pipeline steps — always visible, output fills after run */}
        <StepBox num="1" title="DATA INGESTION" accent="var(--purple)"
          input={`OHLCV 200 candles\nFunding rates\nOrder book depth\nHelius on-chain stream`}
          transform={`Normalize timestamps\nAlign frequencies\nCompute derived metrics`}
          output={data ? `Pair: ${form.pair}\nSize: $${Number(form.size).toLocaleString()}\nCondition: ${form.marketCondition}\nSnapshot: ready` : `Market snapshot\n{price, vol, spread,\nfunding, depth}\n→ dispatched`}
        />

        <StepBox num="2" title="REGIME CLASSIFICATION" accent="var(--amber)"
          input={`Market snapshot\n200 candles OHLCV\nFunding rate delta\nCross-asset correlation`}
          transform={`Markov Switching Model\nHawkes process clustering\nEVT tail risk score`}
          output={data ? `Regime: ${data.researchers?.[1]?.data?.regime || form.marketCondition.toUpperCase()}\nConfidence: ${data.researchers?.[1]?.data?.regimeProbability || '—'}%\nTail risk: ${data.researchers?.[1]?.data?.tailRisk || '—'}` : `REGIME + confidence\n→ dispatched\nto analysts`}
        />

        <StepBox num="3" title="ANALYST REPORTS (×4 INDEPENDENT)" accent="var(--purple)"
          input={`Regime classification\nMarket snapshot\nAgents work independently\nno cross-communication`}
          transform={`4 agents score in parallel\nEach outputs sentiment\n+ confidence on -1 to +1`}
          output={data ? (data.analysts || []).map(a => {
            const s = a.data?.sentiment
            const c = a.data?.confidence || a.data?.score || 50
            const score = s === 'bullish' ? `+${(c/100).toFixed(2)}` : s === 'bearish' ? `-${(c/100).toFixed(2)}` : '0.00'
            return `${a.name?.split(' ')[0]}: ${score}`
          }).join('\n') : `SmartMoney: ±0.xx\nChart: ±0.xx\nSentiment: ±0.xx\nSafety: ±0.xx`}
        >
          {data && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {(data.analysts || []).map((a, i) => (
                <AgentMini key={i} icon={a.icon} name={a.name}
                  sentiment={a.data?.sentiment} signal={a.data?.signal || a.data?.finding}
                  score={a.data?.score ?? a.data?.confidence}
                  scoreLabel={a.data?.score !== undefined ? 'SAFETY SCORE' : 'CONFIDENCE'} />
              ))}
            </div>
          )}
        </StepBox>

        <StepBox num="4" title="ADVERSARIAL DEBATE + CONSENSUS CHECK" accent="var(--purple)"
          input={`4 analyst scores\nRegime classification\nConsensus threshold: ≥0.5`}
          transform={`Aggregate weighted scores\n|consensus| < 0.5 → no trade\nResearchers stress-test view`}
          output={data && consensusScore !== null
            ? `Score: ${consensusScore}\nThreshold: ≥0.50\n${consensusPassed ? '✓ PASSED' : '✗ FAILED'}\nBullish: ${bullish}/4  Bearish: ${bearish}/4`
            : `Consensus score: —\nPASSED or FAILED\n→ awaiting run`}
        >
          {data && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
              {(data.researchers || []).map((r, i) => (
                <AgentMini key={i} icon={r.icon} name={r.name}
                  sentiment={r.data?.sentiment} signal={r.data?.finding}
                  score={r.data?.depthScore ?? r.data?.regimeProbability}
                  scoreLabel={r.data?.depthScore !== undefined ? 'DEPTH SCORE' : 'REGIME PROB'} />
              ))}
            </div>
          )}
        </StepBox>

        <StepBox num="5" title="TRADE PROPOSAL" accent="var(--green)"
          input={`Consensus result\nRegime + tail risk\nLiquidity depth\nPortfolio state`}
          transform={`Trader agent sizes entry\nSets stop + take-profit\nBased on regime-adjusted vol`}
          output={data && tr
            ? `${form.strategy.toUpperCase()}\nSize: $${Number(form.size).toLocaleString()}\nStop: ${rm?.stopLossPct ?? -15}%\nTP: +${rm?.takeProfitPct ?? 45}%\nR:R = ${rm?.riskReward ?? '1:3'}`
            : `{side, size,\nentry, stop, tp}\n→ awaiting run`}
        >
          {data && tr && (
            <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontFamily: 'var(--pixel)', fontSize: 6, color: 'var(--muted2)', marginBottom: 6 }}>TRADER REASONING</div>
              <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2 }}>{tr.proposal || '—'}</p>
              {rm && <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted2)' }}>RISK MGR: </span>{rm.assessment}
              </p>}
            </div>
          )}
        </StepBox>

        <StepBox num="6" title="RISK ASSESSMENT — 30 PARAMETERS" accent="var(--amber)"
          input={`Trade proposal\nPortfolio state\nRegime + tail risk\nLiquidity depth`}
          transform={`Score 30 risk params\nCheck position limits\nDrawdown ceiling check\nLiquidation distance`}
          output={data && pm
            ? `Risk: ${pm.riskScore ?? 0}/100\nLiquidity: ${pm.liquidityScore ?? 0}/100\nVolatility: ${pm.volatilityScore ?? 0}/100\n${(pm.riskScore ?? 0) < 45 ? '✓ Within limits' : '⚠ Elevated'}`
            : `Risk score: 0-100\nLiquidity: 0-100\nVolatility: 0-100\n→ awaiting run`}
        >
          {data && pm && (
            <div style={{ maxWidth: 300 }}>
              {[
                { label: 'COMPOSITE RISK', val: pm.riskScore ?? 0, color: (pm.riskScore ?? 0) < 45 ? 'var(--green)' : (pm.riskScore ?? 0) < 70 ? 'var(--amber)' : 'var(--red)' },
                { label: 'LIQUIDITY', val: pm.liquidityScore ?? 0, color: 'var(--purple)' },
                { label: 'VOLATILITY', val: pm.volatilityScore ?? 0, color: (pm.volatilityScore ?? 0) < 50 ? 'var(--green)' : 'var(--amber)' },
              ].map(b => (
                <div key={b.label} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--pixel)', fontSize: 6, color: 'var(--muted2)', marginBottom: 3 }}>
                    <span>{b.label}</span><span style={{ color: b.color }}>{b.val}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${b.val}%`, background: b.color, transition: 'width 1s ease', borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </StepBox>

        <StepBox num="7" title="PORTFOLIO MANAGER APPROVAL" accent="var(--purple)"
          input={`Risk scores\nTrade proposal\nPortfolio allocation\nRegime classification`}
          transform={`Reviews full picture\nChecks diversification\nAllocation limits\nRegime fit`}
          output={data && pm ? `Decision: ${pm.verdict}\n${pm.decision || '—'}` : `APPROVE or REJECT\n+ reasoning\n→ awaiting run`}
        />

        <StepBox num="8" title="GUARDIAN VETO — FINAL EXECUTION"
          accent={data ? (isApproved ? 'var(--green)' : 'var(--red)') : 'var(--border2)'}
          input={`PM decision\nAll risk scores\nIsing cascade detector\nSystem-wide risk state`}
          transform={`9-component evaluation\nIsing cascade check\nNo override path exists`}
          output={data && pm
            ? `VERDICT: ${pm.verdict}\n${pm.verdictReason || '—'}\nProtocol: ${pm.protocol || '—'}\nAPY: ~${pm.expectedAPY || '—'}%`
            : `APPROVED or VETOED\n+ reason + protocol\n→ awaiting run`}
        >
          {data && pm && (
            <div style={{
              background: isApproved ? 'rgba(0,230,118,0.06)' : 'rgba(255,71,87,0.06)',
              border: `1px solid ${isApproved ? 'rgba(0,230,118,0.3)' : 'rgba(255,71,87,0.3)'}`,
              borderRadius: 10, padding: '16px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: isApproved ? 16 : 0 }}>
                <span style={{
                  fontFamily: 'var(--pixel)', fontSize: 18,
                  color: isApproved ? 'var(--green)' : 'var(--red)',
                }}>{isApproved ? '✓ APPROVED' : '✗ VETOED'}</span>
                <span style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 1.9 }}>
                  {pm.verdictReason}
                </span>
              </div>
              {isApproved && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
                  {[
                    { label: 'PROTOCOL', value: pm.protocol, color: 'var(--purple)' },
                    { label: 'STOP LOSS', value: `${rm?.stopLossPct ?? -15}%`, color: 'var(--red)' },
                    { label: 'TAKE PROFIT', value: `+${rm?.takeProfitPct ?? 45}%`, color: 'var(--green)' },
                    { label: 'EXP. APY', value: `~${pm.expectedAPY}%`, color: 'var(--purple)' },
                    { label: 'MEV', value: 'Jito Bundle', color: 'var(--purple)' },
                  ].map(e => (
                    <div key={e.label} style={{ background: 'var(--bg3)', borderRadius: 6, padding: '8px 10px' }}>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 6, color: 'var(--muted2)', marginBottom: 4 }}>{e.label}</div>
                      <div style={{ fontFamily: 'var(--pixel)', fontSize: 9, color: e.color }}>{e.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </StepBox>

        {/* Limitation */}
        <div className="px-card" style={{ borderRadius: 10, borderLeft: '3px solid var(--amber)', marginTop: 8 }}>
          <div style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--amber)', marginBottom: 8 }}>// WHERE THIS BREAKS</div>
          <p style={{ fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--muted)', lineHeight: 2 }}>
            Consensus failure at Step 4 terminates the pipeline cleanly — no trade generated.
            Under high Solana RPC congestion, 400ms cycle extends to 800ms+.
            New token listings skip regime classification until 200 candles exist.
            Guardian at Step 8 has no override path — not even from Portfolio Manager.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a href="#how" className="px-btn px-btn-primary" style={{ borderRadius: 10, fontSize: 8 }}>
            How do I get started? →
          </a>
        </div>
      </div>
    </section>
  )
}
