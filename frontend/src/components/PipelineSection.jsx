import React, { useState } from 'react'
import { runPipeline } from '../lib/api.js'

// Section question: "What happens to every trade before it executes?"
// ≤12 word answer: "Input → scored → debated → vetoed → executed or killed."
// Every step: input / transformation / output visible

const PAIRS = ['SOL/USDC','JUP/USDC','BONK/SOL','WIF/USDC','RAY/USDC','PYTH/USDC','JTO/USDC']
const STRATEGIES = ['Spot Long','Spot Short','Perp Long 3x','Perp Short 2x','DCA Entry','Yield Farm','Liquidation Capture']
const CONDITIONS = ['Trending Bull','Low Volatility','High Volatility','Pre-News Event','Post-Crash Recovery','Sideways Chop']

function SentimentBadge({ sentiment }) {
  const map = {
    bullish: { color: 'var(--green)', bg: 'rgba(0,245,122,0.1)', border: 'rgba(0,245,122,0.3)' },
    bearish: { color: 'var(--red)', bg: 'rgba(255,45,85,0.1)', border: 'rgba(255,45,85,0.3)' },
    neutral: { color: 'var(--amber)', bg: 'rgba(255,184,0,0.1)', border: 'rgba(255,184,0,0.3)' },
  }
  const s = map[sentiment] || map.neutral
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: 9,
      color: s.color, background: s.bg,
      border: `1px solid ${s.border}`,
      padding: '2px 8px', letterSpacing: '0.12em',
    }}>{(sentiment || 'neutral').toUpperCase()}</span>
  )
}

function ScoreBar({ value, color = 'var(--acid)', label }) {
  const w = Math.min(100, Math.max(0, value || 0))
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 9,
        color: 'var(--slate2)', letterSpacing: '0.1em', marginBottom: 3,
      }}>
        <span>{label}</span>
        <span style={{ color }}>{w}</span>
      </div>
      <div style={{ height: 3, background: 'var(--wire)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${w}%`,
          background: color, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

// A single pipeline step rendered as input/transform/output
function PipelineStep({ stepNum, title, input, transform, output, children, accent = 'var(--acid)' }) {
  return (
    <div style={{
      background: 'var(--ink2)',
      border: '1px solid var(--wire)',
      borderLeft: `3px solid ${accent}`,
      marginBottom: 1,
    }}>
      {/* Step header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid var(--wire)',
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'var(--ink3)',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
          color: accent, letterSpacing: '0.1em',
        }}>STEP {stepNum}</span>
        <span style={{
          fontFamily: 'var(--display)', fontSize: 15,
          color: 'var(--white)', letterSpacing: '0.05em', fontWeight: 700,
        }}>{title}</span>
      </div>

      {/* Input / Transform / Output row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: 0, borderBottom: children ? '1px solid var(--wire)' : 'none',
      }}>
        <div style={{ padding: '14px 18px', borderRight: '1px solid var(--wire)' }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 8,
            color: 'var(--slate3)', letterSpacing: '0.2em', marginBottom: 6,
          }}>INPUT</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--slate)', lineHeight: 1.6 }}>
            {input}
          </div>
        </div>
        <div style={{ padding: '14px 18px', borderRight: '1px solid var(--wire)' }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 8,
            color: 'var(--slate3)', letterSpacing: '0.2em', marginBottom: 6,
          }}>TRANSFORMATION</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--slate)', lineHeight: 1.6 }}>
            {transform}
          </div>
        </div>
        <div style={{ padding: '14px 18px' }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 8,
            color: accent, letterSpacing: '0.2em', marginBottom: 6,
          }}>OUTPUT</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--white)', lineHeight: 1.6, fontWeight: 500 }}>
            {output}
          </div>
        </div>
      </div>

      {/* Agent cards if present */}
      {children && <div style={{ padding: 16 }}>{children}</div>}
    </div>
  )
}

function AgentCard({ icon, name, type, sentiment, signal, scoreLabel, scoreValue, extra, accent }) {
  return (
    <div style={{
      background: 'var(--ink)',
      border: '1px solid var(--wire)',
      padding: '14px 16px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 8,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 8,
            color: 'var(--slate3)', letterSpacing: '0.15em', marginBottom: 3,
          }}>{type} {icon}</div>
          <div style={{
            fontFamily: 'var(--display)', fontSize: 14,
            color: 'var(--white)', fontWeight: 700,
          }}>{name}</div>
        </div>
        <SentimentBadge sentiment={sentiment} />
      </div>
      <p style={{
        fontFamily: 'var(--body)', fontSize: 12,
        color: 'var(--slate)', lineHeight: 1.6, marginBottom: 10,
      }}>{signal || '—'}</p>
      {scoreLabel && scoreValue !== undefined && (
        <ScoreBar label={scoreLabel} value={scoreValue} color={accent || 'var(--acid)'} />
      )}
      {extra && (
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--slate2)', marginTop: 6,
        }}>{extra}</div>
      )}
    </div>
  )
}

export default function PipelineSection() {
  const [form, setForm] = useState({
    pair: 'SOL/USDC', strategy: 'Spot Long',
    size: 5000, marketCondition: 'Trending Bull',
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function run() {
    setLoading(true); setError(null); setData(null)
    try {
      const result = await runPipeline(form)
      setData(result)
    } catch (e) {
      setError('Pipeline failed. Check your API keys in the backend.')
    } finally {
      setLoading(false)
    }
  }

  const pm = data?.decisions?.portfolioManager
  const rm = data?.decisions?.riskManager
  const tr = data?.decisions?.trader
  const isApproved = pm?.verdict === 'APPROVE'
  const riskScore = pm?.riskScore ?? 0
  const liqScore = pm?.liquidityScore ?? 0
  const volScore = pm?.volatilityScore ?? 0

  // Derive consensus score from analyst sentiments
  const analystVotes = (data?.analysts || []).map(a => a.data?.sentiment)
  const bullishCount = analystVotes.filter(v => v === 'bullish').length
  const bearishCount = analystVotes.filter(v => v === 'bearish').length
  const consensusScore = analystVotes.length
    ? ((bullishCount - bearishCount) / analystVotes.length).toFixed(2)
    : null
  const consensusPassed = consensusScore !== null && Math.abs(parseFloat(consensusScore)) >= 0.5

  return (
    <section id="pipeline" style={{
      padding: '100px 24px',
      borderTop: '1px solid var(--wire)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section header — one question */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--acid)', letterSpacing: '0.25em', marginBottom: 12,
          }}>AGENT PIPELINE — EVERY TRADE</div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.02em', lineHeight: 1,
            color: 'var(--white)', marginBottom: 12,
          }}>
            WHAT HAPPENS TO A TRADE<br />
            <span style={{ color: 'var(--acid)' }}>BEFORE IT EXECUTES.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--body)', fontSize: 15,
            color: 'var(--slate)', maxWidth: 540, lineHeight: 1.7,
          }}>
            Configure a proposal. Every step below shows exactly what the system
            receives, what it does with it, and what it outputs.
            Nothing is hidden behind a loading spinner.
          </p>
        </div>

        {/* Input form */}
        <div style={{
          background: 'var(--ink2)', border: '1px solid var(--wire)',
          padding: '20px 24px', marginBottom: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 14, alignItems: 'end',
        }}>
          {[
            { key: 'pair', label: 'TOKEN PAIR', opts: PAIRS },
            { key: 'strategy', label: 'STRATEGY', opts: STRATEGIES },
            { key: 'marketCondition', label: 'MARKET CONDITION', opts: CONDITIONS },
          ].map(f => (
            <div key={f.key}>
              <label style={{
                fontFamily: 'var(--mono)', fontSize: 9,
                color: 'var(--slate2)', letterSpacing: '0.15em',
                display: 'block', marginBottom: 6,
              }}>{f.label}</label>
              <select value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  width: '100%', background: 'var(--ink)',
                  border: '1px solid var(--wire)',
                  color: 'var(--white)', fontFamily: 'var(--mono)',
                  fontSize: 12, padding: '8px 10px', outline: 'none', cursor: 'pointer',
                }}>
                {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label style={{
              fontFamily: 'var(--mono)', fontSize: 9,
              color: 'var(--slate2)', letterSpacing: '0.15em',
              display: 'block', marginBottom: 6,
            }}>SIZE (USDC)</label>
            <input type="number" value={form.size}
              onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
              style={{
                width: '100%', background: 'var(--ink)',
                border: '1px solid var(--wire)',
                color: 'var(--white)', fontFamily: 'var(--mono)',
                fontSize: 12, padding: '8px 10px', outline: 'none',
              }} />
          </div>
          <button onClick={run} disabled={loading} style={{
            fontFamily: 'var(--display)', fontWeight: 800, fontSize: 15,
            letterSpacing: '0.1em',
            background: loading ? 'var(--wire)' : 'var(--acid)',
            color: loading ? 'var(--slate2)' : 'var(--ink)',
            border: 'none', padding: '9px 20px',
            cursor: loading ? 'not-allowed' : 'pointer',
            clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
            transition: 'all 0.2s',
          }}>
            {loading ? '⟳ RUNNING' : '▶ RUN PIPELINE'}
          </button>
        </div>

        {error && (
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)',
            padding: '12px 16px', border: '1px solid rgba(255,45,85,0.3)',
            background: 'rgba(255,45,85,0.06)', marginBottom: 16,
          }}>{error}</div>
        )}

        {/* Static pipeline structure — always visible */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--wire)' }}>

          {/* STEP 1 — Data Ingestion */}
          <PipelineStep
            stepNum="1" title="DATA INGESTION"
            accent="var(--acid)"
            input={`OHLCV (200 candles)\nFunding rates: Drift + Zeta\nOrder book: Orca + Raydium\nSocial: Birdeye sentiment\nOn-chain: Helius stream`}
            transform={`Normalize timestamps\nAlign data frequencies\nCompute derived metrics\n(volatility, spread, depth)`}
            output={data
              ? `Market snapshot ready\nPair: ${form.pair}\nSize: $${Number(form.size).toLocaleString()}\nStrategy: ${form.strategy}\nCondition: ${form.marketCondition}`
              : `Structured snapshot\n{price, vol, spread,\nfunding, depth}\n→ dispatched to agents`
            }
          />

          {/* STEP 2 — Regime Classification */}
          <PipelineStep
            stepNum="2" title="REGIME CLASSIFICATION"
            accent="var(--amber)"
            input={`Market snapshot\nLast 200 candles OHLCV\nFunding rate delta\nCross-asset correlation`}
            transform={`Markov Switching Model\non volatility + trend.\nHawkes process event\nclustering analysis.\nEVT tail risk score.`}
            output={data
              ? `Regime: ${data.researchers?.[1]?.data?.regime || form.marketCondition.toUpperCase()}\nConfidence: ${data.researchers?.[1]?.data?.regimeProbability || '—'}%\nTail risk: ${data.researchers?.[1]?.data?.tailRisk || '—'}\n→ dispatched to analysts`
              : `REGIME_NAME\nConfidence: 0–100%\nTail risk: LOW/MED/HIGH\n→ awaiting run`
            }
          />

          {/* STEP 3 — Analyst Reports */}
          <PipelineStep
            stepNum="3" title="ANALYST REPORTS (×4 INDEPENDENT)"
            accent="var(--acid)"
            input={`Regime classification\nMarket snapshot\nEach agent works\nindependently — no\ncommunication between them`}
            transform={`4 agents score in\nparallel. Each outputs\na sentiment + confidence\nscore on a -1 to +1\nscale.`}
            output={data
              ? (() => {
                  const scores = (data.analysts || []).map(a => {
                    const s = a.data?.sentiment
                    const score = s === 'bullish' ? '+' + ((a.data?.confidence || 50) / 100).toFixed(2)
                      : s === 'bearish' ? '-' + ((a.data?.confidence || 50) / 100).toFixed(2) : '0.00'
                    return `${a.name?.split(' ')[0]}: ${score}`
                  })
                  return scores.join('\n') + `\n→ sent to debate layer`
                })()
              : `SmartMoney: ±0.xx\nChart: ±0.xx\nSentiment: ±0.xx\nSafety: ±0.xx\n→ awaiting run`
            }
          >
            {data && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 10,
              }}>
                {(data.analysts || []).map((a, i) => (
                  <AgentCard
                    key={i}
                    icon={a.icon} name={a.name} type="ANALYST"
                    sentiment={a.data?.sentiment}
                    signal={a.data?.signal || a.data?.finding}
                    scoreLabel={a.data?.score !== undefined ? 'SAFETY SCORE' : 'CONFIDENCE'}
                    scoreValue={a.data?.score ?? a.data?.confidence}
                    accent="var(--acid)"
                  />
                ))}
              </div>
            )}
          </PipelineStep>

          {/* STEP 4 — Adversarial Debate */}
          <PipelineStep
            stepNum="4" title="ADVERSARIAL DEBATE + CONSENSUS CHECK"
            accent="var(--purple, #b069ff)"
            input={`4 analyst scores\nRegime classification\nConsensus threshold: ≥0.5\nweighted agreement`}
            transform={`Aggregate scores.\nCompute weighted consensus.\nIf |consensus| < 0.5\n→ no trade proposed.\nResearchers stress-test\nthe dominant view.`}
            output={data && consensusScore !== null
              ? `Consensus score: ${consensusScore}\nThreshold: ≥0.50\nResult: ${consensusPassed ? '✓ PASSED → trade proposed' : '✗ FAILED → no trade generated'}\nBullish votes: ${bullishCount}/4\nBearish votes: ${bearishCount}/4`
              : `Consensus score: —\nThreshold: ≥0.50\nResult: PASSED or FAILED\n→ awaiting run`
            }
          >
            {data && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 10,
              }}>
                {(data.researchers || []).map((r, i) => (
                  <AgentCard
                    key={i}
                    icon={r.icon} name={r.name} type="RESEARCHER"
                    sentiment={r.data?.sentiment}
                    signal={r.data?.finding}
                    scoreLabel={r.data?.depthScore !== undefined ? 'DEPTH SCORE' : 'REGIME PROB.'}
                    scoreValue={r.data?.depthScore ?? r.data?.regimeProbability}
                    extra={r.data?.slippageEst ? `Est. slippage: ${r.data.slippageEst}` : r.data?.tailRisk ? `Tail risk: ${r.data.tailRisk}` : null}
                    accent="var(--amber)"
                  />
                ))}
              </div>
            )}
          </PipelineStep>

          {/* STEP 5 — Trade Proposal */}
          <PipelineStep
            stepNum="5" title="TRADE PROPOSAL"
            accent="var(--green)"
            input={`Consensus result\nRegime + tail risk\nLiquidity depth score\nPortfolio state`}
            transform={`Trader agent sizes\nthe entry. Sets stop\nand take-profit targets\nbased on regime-adjusted\nvolatility.`}
            output={data && tr
              ? `Side: ${form.strategy.toUpperCase()}\nSize: $${Number(form.size).toLocaleString()}\nEntry: market\nStop: ${rm?.stopLossPct ?? -15}%\nTP: +${rm?.takeProfitPct ?? 45}%\nR:R = ${rm?.riskReward ?? '1:3'}`
              : `{side, size, entry,\nstop, take-profit}\n→ awaiting run`
            }
          >
            {data && tr && (
              <div style={{
                background: 'var(--ink)',
                border: '1px solid var(--wire)',
                padding: '14px 16px',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 9,
                  color: 'var(--slate3)', letterSpacing: '0.15em', marginBottom: 6,
                }}>TRADER AGENT REASONING</div>
                <p style={{
                  fontFamily: 'var(--body)', fontSize: 13,
                  color: 'var(--slate)', lineHeight: 1.7,
                }}>{tr.proposal || '—'}</p>
                {rm && (
                  <p style={{
                    fontFamily: 'var(--body)', fontSize: 13,
                    color: 'var(--slate)', lineHeight: 1.7, marginTop: 8,
                    borderTop: '1px solid var(--wire)', paddingTop: 8,
                  }}><span style={{ color: 'var(--slate2)', fontFamily: 'var(--mono)', fontSize: 10 }}>RISK MGR: </span>{rm.assessment}</p>
                )}
              </div>
            )}
          </PipelineStep>

          {/* STEP 6 — Risk Assessment */}
          <PipelineStep
            stepNum="6" title="RISK ASSESSMENT — 30 PARAMETERS"
            accent="var(--amber)"
            input={`Trade proposal\nCurrent portfolio state\nRegime + tail risk\nLiquidity depth score\nVolatility index`}
            transform={`Score 30 risk params.\nCheck position limits,\ndrawdown ceiling,\ncorrelation exposure,\nliquidation distance.`}
            output={data && pm
              ? `Risk score: ${riskScore}/100\nLiquidity: ${liqScore}/100\nVolatility: ${volScore}/100\n${riskScore < 45 ? '✓ Within Guardian limits' : riskScore < 70 ? '⚠ Elevated — flagged' : '✗ Exceeds limits'}`
              : `Risk score: 0–100\nLiquidity: 0–100\nVolatility: 0–100\n→ awaiting run`
            }
          >
            {data && pm && (
              <div style={{ maxWidth: 360 }}>
                <ScoreBar
                  label="COMPOSITE RISK"
                  value={riskScore}
                  color={riskScore < 45 ? 'var(--green)' : riskScore < 70 ? 'var(--amber)' : 'var(--red)'}
                />
                <ScoreBar label="LIQUIDITY DEPTH" value={liqScore} color="var(--acid)" />
                <ScoreBar
                  label="VOLATILITY EXPOSURE"
                  value={volScore}
                  color={volScore < 50 ? 'var(--green)' : volScore < 70 ? 'var(--amber)' : 'var(--red)'}
                />
              </div>
            )}
          </PipelineStep>

          {/* STEP 7 — Portfolio Manager Approval */}
          <PipelineStep
            stepNum="7" title="PORTFOLIO MANAGER APPROVAL"
            accent="var(--acid)"
            input={`Risk scores\nTrade proposal\nPortfolio allocation\nRegime classification`}
            transform={`Portfolio Manager reviews\nfull picture. Checks\ndiversification, allocation\nlimits, regime fit.\nOutputs approve or reject.`}
            output={data && pm
              ? `Decision: ${pm.verdict}\n${pm.decision || '—'}`
              : `APPROVE or REJECT\n+ reasoning\n→ awaiting run`
            }
          />

          {/* STEP 8 — Guardian Execution */}
          <PipelineStep
            stepNum="8" title="GUARDIAN VETO — FINAL EXECUTION"
            accent={data ? (isApproved ? 'var(--green)' : 'var(--red)') : 'var(--slate2)'}
            input={`Portfolio manager decision\nAll prior risk scores\nIsis cascade detector\nSystem-wide risk state`}
            transform={`9-component weighted\nevaluation. Ising cascade\ncheck for systemic risk.\nIf any component fails\n→ hard veto, no override.`}
            output={data && pm
              ? `VERDICT: ${pm.verdict}\nReason: ${pm.verdictReason || '—'}\nProtocol: ${pm.protocol || '—'}\nExpected APY: ~${pm.expectedAPY || '—'}%`
              : `APPROVED or VETOED\n+ reason + protocol\n→ awaiting run`
            }
          >
            {data && pm && (
              <div style={{
                background: isApproved ? 'rgba(0,245,122,0.04)' : 'rgba(255,45,85,0.04)',
                border: `1px solid ${isApproved ? 'rgba(0,245,122,0.3)' : 'rgba(255,45,85,0.3)'}`,
                padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{
                    fontFamily: 'var(--display)', fontSize: 32, fontWeight: 800,
                    color: isApproved ? 'var(--green)' : 'var(--red)',
                    letterSpacing: '0.05em',
                  }}>
                    {isApproved ? '✓ APPROVED' : '✗ VETOED'}
                  </div>
                  <div style={{
                    fontFamily: 'var(--body)', fontSize: 14,
                    color: 'var(--slate)', lineHeight: 1.6, flex: 1,
                  }}>{pm.verdictReason || '—'}</div>
                </div>

                {isApproved && (
                  <div style={{
                    marginTop: 16, paddingTop: 14,
                    borderTop: '1px solid var(--wire)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 12,
                  }}>
                    {[
                      { label: 'PROTOCOL', value: pm.protocol || '—', color: 'var(--acid)' },
                      { label: 'STOP LOSS', value: `${rm?.stopLossPct ?? -15}%`, color: 'var(--red)' },
                      { label: 'TAKE PROFIT', value: `+${rm?.takeProfitPct ?? 45}%`, color: 'var(--green)' },
                      { label: 'EXPECTED APY', value: `~${pm.expectedAPY || '—'}%`, color: 'var(--acid)' },
                      { label: 'RISK:REWARD', value: rm?.riskReward || '1:3', color: 'var(--white)' },
                      { label: 'MEV PROTECTION', value: 'Jito Bundle', color: 'var(--acid)' },
                    ].map(e => (
                      <div key={e.label}>
                        <div style={{
                          fontFamily: 'var(--mono)', fontSize: 8,
                          color: 'var(--slate3)', letterSpacing: '0.15em', marginBottom: 3,
                        }}>{e.label}</div>
                        <div style={{
                          fontFamily: 'var(--mono)', fontSize: 13,
                          color: e.color, fontWeight: 600,
                        }}>{e.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </PipelineStep>

        </div>

        {/* LIMITATION */}
        <div style={{
          marginTop: 24,
          background: 'var(--ink2)', border: '1px solid var(--wire)',
          borderLeft: '3px solid var(--amber)',
          padding: '20px 24px',
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9,
            color: 'var(--amber)', letterSpacing: '0.2em', marginBottom: 8,
          }}>WHERE THE PIPELINE BREAKS</div>
          <p style={{
            fontFamily: 'var(--body)', fontSize: 14,
            color: 'var(--slate)', lineHeight: 1.75,
          }}>
            If consensus fails at Step 4, no trade is generated — the pipeline terminates cleanly.
            Under high Solana RPC congestion, Step 1 latency increases and the 400ms cycle extends.
            Step 2 requires minimum 200 candles — new token listings skip regime classification and
            are flagged as unclassified. The Guardian at Step 8 can veto even after Portfolio Manager
            approval — it has no override path.
          </p>
        </div>

        {/* Chain to next section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--wire)' }} />
          <a href="#how" style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'var(--acid)', letterSpacing: '0.15em',
            textDecoration: 'none', border: '1px solid rgba(0,255,224,0.3)',
            padding: '8px 20px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(0,255,224,0.06)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >HOW DO I GET STARTED? →</a>
          <div style={{ flex: 1, height: 1, background: 'var(--wire)' }} />
        </div>

      </div>
    </section>
  )
}
