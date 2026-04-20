// ─── Hardcoded demo data — no backend needed ──────────────────────────────────

const CRISIS_DATA = {
  depeg: {
    scenario: {
      name: 'Stablecoin Depeg',
      context: 'USDC begins depegging. Price drops from $1.00 to $0.91 in 8 minutes. SOL drops 22% in 90 minutes. Liquidity on Orca/Raydium craters.',
      asset: 'SOL/USDC',
    },
    staticBot: {
      status: 'LIQUIDATED',
      finalPnL: '-41%',
      steps: [
        { time: 'T+0:00', action: 'Normal operation. No signals detected.', outcome: 'Holds position', pnl: '0%' },
        { time: 'T+2:30', action: 'Price drop detected. Within threshold. No action.', outcome: 'Still holding', pnl: '-6%' },
        { time: 'T+8:00', action: 'Stop loss triggered at -15%.', outcome: 'Sells into the panic', pnl: '-15%' },
        { time: 'T+15:00', action: '"Dip buy" rule triggers at -20%.', outcome: 'Re-enters — wrong call', pnl: '-20%' },
        { time: 'T+90:00', action: 'Margin call. Forced liquidation.', outcome: 'Account wiped', pnl: '-41%' },
      ],
    },
    regime: {
      initialRegime: 'DISTRIBUTION',
      detectedRegime: 'CRISIS',
      confidencePct: 87,
      detectionLeadMinutes: 4,
      signals: [
        { source: 'Helius on-chain stream', signal: 'Whale wallet exits detected 4 minutes before price drop' },
        { source: 'Pyth oracle', signal: 'Price volatility 6x above 30-day average — abnormal spike forming' },
        { source: 'Drift funding rates', signal: 'Funding went deeply negative — leveraged longs fleeing en masse' },
        { source: 'Orca liquidity depth', signal: 'Bid-side liquidity dropped 70% in 90 seconds' },
      ],
      summary: 'CRISIS regime detected with 87% confidence, 4 minutes before the main price collapse — capital repositioned before the flush.',
    },
    cortex: {
      status: 'CAPITAL PRESERVED',
      finalPnL: '+2.1%',
      capitalPreserved: '100%',
      steps: [
        { time: 'T-4:00', agent: 'Regime Classifier', action: 'Hawkes process detects unusual event clustering. MSM probability shifts toward CRISIS at 73%.', outcome: 'Alert dispatched to all 9 agents', status: 'ALERT' },
        { time: 'T-2:00', agent: '4 Analyst Agents', action: 'All 4 analysts independently confirm: liquidity thinning, smart money exiting, funding rates inverting.', outcome: 'Consensus: defensive posture required', status: 'DEFENSIVE' },
        { time: 'T+0:00', agent: 'Risk Manager', action: 'Hard capital limits enforced. All leveraged positions closed. Capital moved to stable assets.', outcome: 'Portfolio fully protected before crash', status: 'PROTECTED' },
        { time: 'T+8:00', agent: 'Guardian', action: 'Guardian vetoes all buy signals from reactive agents during the flush. No re-entry permitted.', outcome: 'Zero exposure during -22% SOL drop', status: 'SAFE' },
        { time: 'T+90:00', agent: 'Portfolio Manager', action: 'Crisis regime probability falls below 40%. Controlled re-entry initiated with tight sizing.', outcome: 'Positioned for recovery with preserved capital', status: 'POSITIONED' },
      ],
    },
  },
  liquidation: {
    scenario: {
      name: 'Cascade Liquidation',
      context: 'A whale wallet gets liquidated on Marginfi triggering $40M in cascade liquidations. BTC drops 12% in 4 minutes.',
      asset: 'BTC/USDC',
    },
    staticBot: {
      status: 'LIQUIDATED',
      finalPnL: '-38%',
      steps: [
        { time: 'T+0:00', action: 'Holding BTC long position. No risk signals.', outcome: 'Full exposure', pnl: '0%' },
        { time: 'T+1:00', action: 'Cascade begins. Bot detects nothing unusual.', outcome: 'Still holding', pnl: '-5%' },
        { time: 'T+4:00', action: 'Stop loss at -12% triggers. Sells into 5x slippage.', outcome: 'Executes at -18% due to slippage', pnl: '-18%' },
        { time: 'T+10:00', action: 'Mean reversion rule fires. Buys the "dip".', outcome: 'Re-enters into continued sell pressure', pnl: '-24%' },
        { time: 'T+30:00', action: 'Second stop loss triggers. No margin left.', outcome: 'Liquidated', pnl: '-38%' },
      ],
    },
    regime: {
      initialRegime: 'MARKUP',
      detectedRegime: 'CRISIS',
      confidencePct: 91,
      detectionLeadMinutes: 2,
      signals: [
        { source: 'Helius on-chain stream', signal: 'Large Marginfi position flagged for liquidation risk 2 min before execution' },
        { source: 'Pyth oracle', signal: 'BTC/USDC spread widening — market makers pulling liquidity' },
        { source: 'Drift funding rates', signal: 'Perp funding flipped negative sharply — long squeeze forming' },
        { source: 'Orca liquidity depth', signal: 'Cascading liquidation detected across 3 connected wallets' },
      ],
      summary: 'CRISIS regime detected 2 minutes before cascade peak — Cortex exited all positions before the $40M liquidation chain triggered.',
    },
    cortex: {
      status: 'CAPITAL PRESERVED',
      finalPnL: '+1.4%',
      capitalPreserved: '100%',
      steps: [
        { time: 'T-2:00', agent: 'Regime Classifier', action: 'On-chain liquidation risk flags detected. CRISIS probability rises to 81%.', outcome: 'Immediate alert to all agents', status: 'ALERT' },
        { time: 'T-1:00', agent: '4 Analyst Agents', action: 'Smart money tracker confirms large wallet de-risking. Sentiment: unanimously bearish.', outcome: 'Consensus reached in 1 cycle', status: 'DEFENSIVE' },
        { time: 'T+0:00', agent: 'Risk Manager', action: 'All BTC exposure closed. Hard stop on new entries until regime clears.', outcome: 'Zero exposure entering cascade', status: 'PROTECTED' },
        { time: 'T+4:00', agent: 'Guardian', action: 'Multiple buy signals from reactive agents vetoed. Slippage 5x — execution blocked.', outcome: 'Avoided all bad fills during the crash', status: 'SAFE' },
        { time: 'T+30:00', agent: 'Portfolio Manager', action: 'Liquidation cascade complete. Regime stabilising. Cautious re-entry approved.', outcome: 'Capital intact, bought the actual bottom', status: 'POSITIONED' },
      ],
    },
  },
  flashcrash: {
    scenario: {
      name: 'Flash Crash Event',
      context: 'Unexpected regulatory headline drops. SOL drops 18% in 11 minutes. Smart money exits quietly before the dump.',
      asset: 'SOL/USDC',
    },
    staticBot: {
      status: 'LIQUIDATED',
      finalPnL: '-33%',
      steps: [
        { time: 'T+0:00', action: 'Trending bull strategy active. Full SOL long.', outcome: 'Normal operation', pnl: '0%' },
        { time: 'T+3:00', action: 'Price drops 8%. Below threshold. No action yet.', outcome: 'Still holding', pnl: '-8%' },
        { time: 'T+7:00', action: 'Stop loss triggers at -15%.', outcome: 'Sells at the worst moment', pnl: '-15%' },
        { time: 'T+11:00', action: 'Dip buy rule fires at perceived "bottom".', outcome: 'Enters as selling continues', pnl: '-22%' },
        { time: 'T+45:00', action: 'Position underwater. Auto-close triggered.', outcome: 'Liquidated', pnl: '-33%' },
      ],
    },
    regime: {
      initialRegime: 'MARKUP',
      detectedRegime: 'MARKDOWN',
      confidencePct: 83,
      detectionLeadMinutes: 6,
      signals: [
        { source: 'Helius on-chain stream', signal: 'Smart money wallets quietly reducing SOL exposure 6 min before headline' },
        { source: 'Pyth oracle', signal: 'SOL/USDC implied volatility spiking on short-dated options' },
        { source: 'Drift funding rates', signal: 'Funding rate compression — institutions hedging exposure' },
        { source: 'Orca liquidity depth', signal: 'Ask-side depth increasing sharply — sellers positioning ahead of news' },
      ],
      summary: 'MARKDOWN regime detected 6 minutes before the headline hit — smart money exit pattern identified through on-chain flow analysis.',
    },
    cortex: {
      status: 'CAPITAL PRESERVED',
      finalPnL: '+3.2%',
      capitalPreserved: '100%',
      steps: [
        { time: 'T-6:00', agent: 'Regime Classifier', action: 'Smart money outflow pattern detected. Regime probability shifts: MARKUP → MARKDOWN at 83%.', outcome: 'System enters defensive mode', status: 'ALERT' },
        { time: 'T-3:00', agent: '4 Analyst Agents', action: 'On-chain flow, options data, and sentiment all confirm: distribution occurring quietly.', outcome: 'Unanimous bearish consensus', status: 'DEFENSIVE' },
        { time: 'T+0:00', agent: 'Risk Manager', action: 'SOL long positions reduced to zero. Capital held in USDC. No new longs permitted.', outcome: 'Full capital preservation before dump', status: 'PROTECTED' },
        { time: 'T+11:00', agent: 'Guardian', action: 'Reactive buy signals during dump vetoed. MARKDOWN regime still active — no entries.', outcome: 'Avoided entire -18% move', status: 'SAFE' },
        { time: 'T+45:00', agent: 'Portfolio Manager', action: 'Regime stabilises. Oversold conditions confirmed. Controlled re-entry at 18% discount.', outcome: 'Re-entered at the bottom with full capital', status: 'POSITIONED' },
      ],
    },
  },
}

const PIPELINE_DATA = {
  'SOL/USDC': {
    analysts: [
      { name: 'Smart Money Tracker', icon: '🧠', data: { sentiment: 'bullish', signal: 'Institutional wallets accumulating SOL quietly — net inflow $4.2M in last 6 hours.', confidence: 78 } },
      { name: 'Chart Pattern Engine', icon: '📊', data: { sentiment: 'bullish', signal: 'Ascending triangle breakout forming on 4H with volume expansion confirming move.', confidence: 74, pattern: 'Ascending Triangle Breakout' } },
      { name: 'News Sentiment AI', icon: '📡', data: { sentiment: 'neutral', signal: 'Mixed signals — Solana upgrade narrative positive but broader macro uncertainty present.', confidence: 55 } },
      { name: 'Token Safety Scorer', icon: '🛡️', data: { sentiment: 'bullish', signal: 'SOL passes all 7 safety criteria. No oracle manipulation risk. Liquidity lock verified.', score: 94 } },
    ],
    researchers: [
      { name: 'Liquidity Depth Analyst', icon: '🌊', data: { sentiment: 'bullish', finding: 'Order book depth strong on Orca and Raydium. Estimated slippage 0.06% at $5K size.', slippageEst: '0.06%', depthScore: 87 } },
      { name: 'Regime Classifier', icon: '⚙️', data: { sentiment: 'bullish', finding: 'MARKUP regime confirmed at 76% probability. Hawkes clustering low. EVT tail risk: LOW.', regime: 'MARKUP', regimeProbability: 76, tailRisk: 'LOW' } },
    ],
    decisions: {
      trader: { sentiment: 'bullish', proposal: 'Enter SOL long at market via Jupiter — momentum confirmed, regime aligned, entry window optimal.' },
      riskManager: { sentiment: 'bullish', assessment: 'Position sized at 8% of portfolio. Hard stop at -15%, take profit at +45%. R:R = 1:3.', stopLossPct: -15, takeProfitPct: 45, riskReward: '1:3' },
      portfolioManager: { sentiment: 'bullish', decision: 'Approved. MARKUP regime, bullish consensus across 3/4 analysts, liquidity sufficient.', verdict: 'APPROVE', verdictReason: 'All 9 Guardian risk components within acceptable thresholds. Trade approved for execution.', riskScore: 28, liquidityScore: 87, volatilityScore: 38, protocol: 'Jupiter Spot', expectedAPY: 31 },
    },
  },
  'JUP/USDC': {
    analysts: [
      { name: 'Smart Money Tracker', icon: '🧠', data: { sentiment: 'neutral', signal: 'Mixed whale signals — some accumulation offset by protocol team wallet movements.', confidence: 52 } },
      { name: 'Chart Pattern Engine', icon: '📊', data: { sentiment: 'bearish', signal: 'Double top forming on daily chart. Resistance at $0.82 rejected twice this week.', confidence: 68, pattern: 'Double Top Rejection' } },
      { name: 'News Sentiment AI', icon: '📡', data: { sentiment: 'neutral', signal: 'JUP governance vote pending — outcome unclear, market waiting for direction.', confidence: 48 } },
      { name: 'Token Safety Scorer', icon: '🛡️', data: { sentiment: 'bullish', signal: 'JUP passes safety scoring. Audited contracts, distributed holders, no rug vectors.', score: 89 } },
    ],
    researchers: [
      { name: 'Liquidity Depth Analyst', icon: '🌊', data: { sentiment: 'neutral', finding: 'Moderate liquidity on Jupiter. Slippage estimate 0.14% at this size — elevated.', slippageEst: '0.14%', depthScore: 63 } },
      { name: 'Regime Classifier', icon: '⚙️', data: { sentiment: 'neutral', finding: 'DISTRIBUTION signals emerging at 61% probability. Hawkes clustering moderate. EVT risk: MEDIUM.', regime: 'DISTRIBUTION', regimeProbability: 61, tailRisk: 'MEDIUM' } },
    ],
    decisions: {
      trader: { sentiment: 'neutral', proposal: 'Entry signal is weak — double top resistance and distribution regime reduce conviction significantly.' },
      riskManager: { sentiment: 'bearish', assessment: 'Consensus below threshold. Risk/reward unfavorable at current entry. Position size would need reduction to 4%.', stopLossPct: -12, takeProfitPct: 28, riskReward: '1:2.3' },
      portfolioManager: { sentiment: 'bearish', decision: 'Vetoed. DISTRIBUTION regime + bearish chart pattern + consensus below 0.5 threshold.', verdict: 'VETO', verdictReason: 'Consensus score -0.25 below threshold. DISTRIBUTION regime detected. Guardian blocked execution.', riskScore: 67, liquidityScore: 63, volatilityScore: 71, protocol: 'N/A', expectedAPY: 0 },
    },
  },
  default: {
    analysts: [
      { name: 'Smart Money Tracker', icon: '🧠', data: { sentiment: 'neutral', signal: 'Whale flow patterns inconclusive at current price level. No clear directional bias.', confidence: 55 } },
      { name: 'Chart Pattern Engine', icon: '📊', data: { sentiment: 'bullish', signal: 'Descending wedge breakout on 4H with volume confirmation on the move.', confidence: 71, pattern: 'Descending Wedge Breakout' } },
      { name: 'News Sentiment AI', icon: '📡', data: { sentiment: 'bullish', signal: 'Positive protocol upgrade narrative trending on CT. Community sentiment elevated.', confidence: 64 } },
      { name: 'Token Safety Scorer', icon: '🛡️', data: { sentiment: 'bullish', signal: 'Passes all 7 safety criteria. No rug vectors detected. Oracle risk: minimal.', score: 91 } },
    ],
    researchers: [
      { name: 'Liquidity Depth Analyst', icon: '🌊', data: { sentiment: 'bullish', finding: 'Order book depth sufficient for this position size. Estimated slippage 0.08% on entry.', slippageEst: '0.08%', depthScore: 79 } },
      { name: 'Regime Classifier', icon: '⚙️', data: { sentiment: 'neutral', finding: 'MARKUP regime at 68% probability. Moderate Hawkes clustering. EVT tail risk within bounds.', regime: 'MARKUP', regimeProbability: 68, tailRisk: 'LOW' } },
    ],
    decisions: {
      trader: { sentiment: 'bullish', proposal: 'Entry at market via Jupiter — momentum confirmed by wedge breakout, regime aligned.' },
      riskManager: { sentiment: 'neutral', assessment: 'Position sized at 8% of portfolio. Stop at -15%, take profit at +45%. Risk/reward 1:3.', stopLossPct: -15, takeProfitPct: 45, riskReward: '1:3' },
      portfolioManager: { sentiment: 'bullish', decision: 'Approved. Regime confirms entry window. Diversification maintained within limits.', verdict: 'APPROVE', verdictReason: 'All 9 risk components within Guardian thresholds. Consensus passed at +0.50.', riskScore: 34, liquidityScore: 79, volatilityScore: 42, protocol: 'Jupiter Spot', expectedAPY: 27 },
    },
  },
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function runCrisis(scenario) {
  await delay(1800)
  return CRISIS_DATA[scenario] || CRISIS_DATA.depeg
}

export async function runPipeline({ pair, strategy, size, marketCondition }) {
  await delay(2200)
  const data = PIPELINE_DATA[pair] || PIPELINE_DATA.default

  const dangerousConditions = ['High Volatility', 'Pre-News Event']
  if (dangerousConditions.includes(marketCondition) && data.decisions.portfolioManager.verdict === 'APPROVE') {
    return {
      ...data,
      decisions: {
        ...data.decisions,
        portfolioManager: {
          ...data.decisions.portfolioManager,
          verdict: 'VETO',
          verdictReason: 'High Volatility condition detected. Guardian blocked execution — tail risk elevated beyond acceptable threshold.',
          riskScore: 72,
          volatilityScore: 81,
        },
      },
    }
  }

  return data
         }
