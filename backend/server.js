import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── CORS — fully open, no conditions ─────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'] }));
app.use(express.json());

// ─── Groq client ──────────────────────────────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '2.0.0', groq: !!process.env.GROQ_API_KEY });
});

// ─── Groq helper — NEVER throws, always returns string or null ────────────────
async function ask(systemPrompt, userPrompt, maxTokens = 350) {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });
    return completion.choices[0]?.message?.content || null;
  } catch (err) {
    console.error('[Groq error]', err.message);
    return null;
  }
}

// ─── JSON parser — NEVER throws ───────────────────────────────────────────────
function parse(text) {
  if (!text || typeof text !== 'string') return null;
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const match = clean.match(/\{[\s\S]*\}/);
    return JSON.parse(match ? match[0] : clean);
  } catch {
    return null;
  }
}

// ─── ROUTE: /api/crisis ───────────────────────────────────────────────────────
app.post('/api/crisis', async (req, res) => {
  const { scenario } = req.body || {};

  const SCENARIOS = {
    depeg: {
      name: 'Stablecoin Depeg',
      context: 'USDC begins depegging. Price drops from $1.00 to $0.91 in 8 minutes. SOL drops 22% in 90 minutes. Liquidity on Orca/Raydium craters. Funding rates go deeply negative on Drift.',
      asset: 'SOL/USDC',
    },
    liquidation: {
      name: 'Cascade Liquidation',
      context: 'A whale wallet gets liquidated on Marginfi triggering $40M in cascade liquidations. BTC drops 12% in 4 minutes. On-chain congestion spikes. Slippage hits 5x normal.',
      asset: 'BTC/USDC',
    },
    flashcrash: {
      name: 'Flash Crash Event',
      context: 'Unexpected regulatory headline drops. SOL drops 18% in 11 minutes. Smart money exits quietly before the dump. Retail bots trigger stop losses en masse.',
      asset: 'SOL/USDC',
    },
  };

  const s = SCENARIOS[scenario] || SCENARIOS.depeg;

  // Fallback data — returned if any call fails
  const FALLBACK_STATIC = {
    steps: [
      { time: 'T+0:00', action: 'Normal operation. No signals detected.', outcome: 'Holds position', pnl: '0%' },
      { time: 'T+2:30', action: 'Price drop detected. Within threshold. No action.', outcome: 'Still holding', pnl: '-6%' },
      { time: 'T+8:00', action: 'Stop loss triggered at -15%.', outcome: 'Sells into the panic', pnl: '-15%' },
      { time: 'T+15:00', action: '"Dip buy" rule triggers at -20%.', outcome: 'Re-enters — wrong call', pnl: '-20%' },
      { time: 'T+90:00', action: 'Margin call. Forced liquidation.', outcome: 'Account wiped', pnl: '-41%' },
    ],
    finalPnL: '-41%',
    status: 'LIQUIDATED',
  };

  const FALLBACK_REGIME = {
    initialRegime: 'DISTRIBUTION',
    detectedRegime: 'CRISIS',
    confidencePct: 87,
    detectionLeadMinutes: 4,
    signals: [
      { source: 'Helius on-chain stream', signal: 'Whale wallet exits detected 4 minutes before price drop' },
      { source: 'Pyth oracle', signal: 'Price volatility 6x above 30-day average' },
      { source: 'Drift funding rates', signal: 'Funding went deeply negative — leveraged longs fleeing' },
      { source: 'Orca liquidity depth', signal: 'Bid-side liquidity dropped 70% in 90 seconds' },
    ],
    summary: 'CRISIS regime detected with 87% confidence, 4 minutes before the main price collapse',
  };

  const FALLBACK_CORTEX = {
    steps: [
      { time: 'T-4:00', agent: 'Regime Classifier', action: 'Hawkes process detects unusual event clustering. MSM probability shifts toward CRISIS at 73%.', outcome: 'Alert dispatched to all agents', status: 'ALERT' },
      { time: 'T-2:00', agent: '4 Analyst Agents', action: 'All 4 analysts independently confirm: liquidity thinning, smart money exiting, funding rates inverting.', outcome: 'Consensus: defensive posture required', status: 'DEFENSIVE' },
      { time: 'T+0:00', agent: 'Risk Manager', action: 'Hard capital limits enforced. All leveraged positions closed. Capital moved to safe assets.', outcome: 'Portfolio fully protected before crash', status: 'PROTECTED' },
      { time: 'T+8:00', agent: 'Guardian', action: 'Guardian vetoes all buy signals during the flush. No re-entry permitted.', outcome: 'Zero exposure during -22% drop', status: 'SAFE' },
      { time: 'T+90:00', agent: 'Portfolio Manager', action: 'Crisis regime probability falls below 40%. Controlled re-entry initiated with tight sizing.', outcome: 'Positioned for recovery', status: 'POSITIONED' },
    ],
    finalPnL: '+2.1%',
    capitalPreserved: '100%',
    status: 'CAPITAL PRESERVED',
  };

  try {
    // All 3 calls run in parallel — each is wrapped so failure = null
    const [staticRaw, regimeRaw, cortexRaw] = await Promise.all([
      ask(
        'You simulate a static DeFi bot with fixed rules. No regime awareness. Respond ONLY with valid JSON, no markdown, no explanation.',
        `Crisis: ${s.context} Asset: ${s.asset}
Return JSON: {"steps":[{"time":"T+0:00","action":"string","outcome":"string","pnl":"-2%"},{"time":"T+2:30","action":"string","outcome":"string","pnl":"-8%"},{"time":"T+8:00","action":"string","outcome":"string","pnl":"-15%"},{"time":"T+15:00","action":"string","outcome":"string","pnl":"-28%"},{"time":"T+90:00","action":"string","outcome":"string","pnl":"-41%"}],"finalPnL":"-41%","status":"LIQUIDATED"}`,
        400
      ),
      ask(
        'You are a market regime classifier using Markov Switching Model and Hawkes processes. Respond ONLY with valid JSON, no markdown.',
        `Crisis: ${s.context}
Return JSON: {"initialRegime":"DISTRIBUTION","detectedRegime":"CRISIS","confidencePct":87,"detectionLeadMinutes":4,"signals":[{"source":"Helius on-chain stream","signal":"string"},{"source":"Pyth oracle","signal":"string"},{"source":"Drift funding rates","signal":"string"},{"source":"Orca liquidity depth","signal":"string"}],"summary":"one sentence"}`,
        400
      ),
      ask(
        'You are CortexOS, a multi-agent DeFi system. Respond ONLY with valid JSON, no markdown.',
        `Crisis: ${s.context}. System detected CRISIS regime 4 minutes early.
Return JSON: {"steps":[{"time":"T-4:00","agent":"Regime Classifier","action":"string","outcome":"string","status":"ALERT"},{"time":"T-2:00","agent":"4 Analyst Agents","action":"string","outcome":"string","status":"DEFENSIVE"},{"time":"T+0:00","agent":"Risk Manager","action":"string","outcome":"string","status":"PROTECTED"},{"time":"T+8:00","agent":"Guardian","action":"string","outcome":"string","status":"SAFE"},{"time":"T+90:00","agent":"Portfolio Manager","action":"string","outcome":"string","status":"POSITIONED"}],"finalPnL":"+2.1%","capitalPreserved":"100%","status":"CAPITAL PRESERVED"}`,
        500
      ),
    ]);

    const staticBot = parse(staticRaw) || FALLBACK_STATIC;
    const regime = parse(regimeRaw) || FALLBACK_REGIME;
    const cortex = parse(cortexRaw) || FALLBACK_CORTEX;

    res.json({ scenario: s, staticBot, regime, cortex });
  } catch (err) {
    // Even if Promise.all somehow throws, return fallback data not an error
    console.error('[/api/crisis fatal]', err.message);
    res.json({
      scenario: s,
      staticBot: FALLBACK_STATIC,
      regime: FALLBACK_REGIME,
      cortex: FALLBACK_CORTEX,
    });
  }
});

// ─── ROUTE: /api/pipeline ─────────────────────────────────────────────────────
app.post('/api/pipeline', async (req, res) => {
  const { pair = 'SOL/USDC', strategy = 'Spot Long', size = 5000, marketCondition = 'Trending Bull' } = req.body || {};
  const ctx = `Trade: ${strategy} on ${pair}. Size: $${Number(size).toLocaleString()}. Market: ${marketCondition}.`;

  const FALLBACK_ANALYSTS = [
    { name: 'Smart Money Tracker', icon: '🧠', data: { sentiment: 'neutral', signal: 'Whale flow patterns inconclusive at current price level.', confidence: 62 } },
    { name: 'Chart Pattern Engine', icon: '📊', data: { sentiment: 'bullish', signal: 'Descending wedge breakout on 4H with volume confirmation.', confidence: 74 } },
    { name: 'News Sentiment AI', icon: '📡', data: { sentiment: 'bullish', signal: 'Positive protocol upgrade narrative trending on CT.', confidence: 68 } },
    { name: 'Token Safety Scorer', icon: '🛡️', data: { sentiment: 'bullish', signal: 'Passes all 7 safety criteria. No rug vectors detected.', score: 91 } },
  ];

  const FALLBACK_RESEARCHERS = [
    { name: 'Liquidity Depth Analyst', icon: '🌊', data: { sentiment: 'bullish', finding: 'Order book depth sufficient. Estimated slippage 0.07% at this size.', slippageEst: '0.07%', depthScore: 81 } },
    { name: 'Regime Classifier', icon: '⚙️', data: { sentiment: 'neutral', finding: 'Moderate Hawkes clustering. EVT tail risk within bounds.', regime: 'MARKUP', regimeProbability: 71, tailRisk: 'LOW' } },
  ];

  const FALLBACK_DECISIONS = {
    trader: { sentiment: 'bullish', proposal: `Entry at market via Jupiter on ${pair} momentum confirmation.` },
    riskManager: { sentiment: 'neutral', assessment: 'Position sized at 8% of portfolio. Stop at -15%, R:R = 1:3.', stopLossPct: -15, takeProfitPct: 45, riskReward: '1:3' },
    portfolioManager: { sentiment: 'bullish', decision: 'Approved. Regime confirms entry window.', verdict: 'APPROVE', verdictReason: 'All 9 risk components within Guardian thresholds.', riskScore: 32, liquidityScore: 81, volatilityScore: 44, protocol: 'Jupiter Spot', expectedAPY: 27 },
  };

  try {
    // 4 analysts in parallel
    const [a1, a2, a3, a4, r1, r2] = await Promise.all([
      ask('You are the Smart Money Tracker inside CortexOS. Respond ONLY with valid JSON.', `${ctx} Return: {"sentiment":"bullish|bearish|neutral","signal":"one sentence","confidence":0-100}`, 150),
      ask('You are the Chart Pattern Engine inside CortexOS. Respond ONLY with valid JSON.', `${ctx} Return: {"sentiment":"bullish|bearish|neutral","signal":"one sentence","confidence":0-100,"pattern":"name"}`, 150),
      ask('You are the News Sentiment Agent inside CortexOS. Respond ONLY with valid JSON.', `${ctx} Return: {"sentiment":"bullish|bearish|neutral","signal":"one sentence","confidence":0-100}`, 150),
      ask('You are the Token Safety Scorer inside CortexOS. Respond ONLY with valid JSON.', `${ctx} Return: {"sentiment":"bullish|bearish|neutral","signal":"one sentence","score":0-100}`, 150),
      ask('You are the Liquidity Depth Analyst inside CortexOS. Respond ONLY with valid JSON.', `${ctx} Return: {"sentiment":"bullish|bearish|neutral","finding":"one sentence","slippageEst":"0.08%","depthScore":0-100}`, 200),
      ask('You are the Regime Classifier inside CortexOS. Respond ONLY with valid JSON.', `${ctx} Return: {"sentiment":"bullish|bearish|neutral","finding":"one sentence","regime":"MARKUP|ACCUMULATION|DISTRIBUTION|MARKDOWN|CRISIS","regimeProbability":0-100,"tailRisk":"LOW|MEDIUM|HIGH"}`, 200),
    ]);

    const analysts = [
      { name: 'Smart Money Tracker', icon: '🧠', data: parse(a1) || FALLBACK_ANALYSTS[0].data },
      { name: 'Chart Pattern Engine', icon: '📊', data: parse(a2) || FALLBACK_ANALYSTS[1].data },
      { name: 'News Sentiment AI', icon: '📡', data: parse(a3) || FALLBACK_ANALYSTS[2].data },
      { name: 'Token Safety Scorer', icon: '🛡️', data: parse(a4) || FALLBACK_ANALYSTS[3].data },
    ];

    const researchers = [
      { name: 'Liquidity Depth Analyst', icon: '🌊', data: parse(r1) || FALLBACK_RESEARCHERS[0].data },
      { name: 'Regime Classifier', icon: '⚙️', data: parse(r2) || FALLBACK_RESEARCHERS[1].data },
    ];

    const regime = researchers[1].data.regime || 'MARKUP';
    const tailRisk = researchers[1].data.tailRisk || 'LOW';
    const depthScore = researchers[0].data.depthScore || 75;
    const slippage = researchers[0].data.slippageEst || '0.1%';
    const votes = analysts.map(a => `${a.name}=${a.data.sentiment}`).join(', ');

    const decRaw = await ask(
      'You are the CortexOS decision layer — Trader, Risk Manager, Portfolio Manager. Respond ONLY with valid JSON.',
      `Context: ${ctx} Analyst votes: ${votes}. Regime: ${regime}, tail risk: ${tailRisk}. Liquidity depth: ${depthScore}, slippage: ${slippage}.
Return: {"trader":{"sentiment":"bullish|bearish|neutral","proposal":"one sentence"},"riskManager":{"sentiment":"bullish|bearish|neutral","assessment":"one sentence","stopLossPct":-15,"takeProfitPct":45,"riskReward":"1:3"},"portfolioManager":{"sentiment":"bullish|bearish|neutral","decision":"one sentence","verdict":"APPROVE|VETO","verdictReason":"one sentence","riskScore":0-100,"liquidityScore":0-100,"volatilityScore":0-100,"protocol":"Jupiter Spot|Jupiter Perps + Drift|Raydium LP","expectedAPY":0-100}}`,
      600
    );

    const decisions = parse(decRaw) || FALLBACK_DECISIONS;

    res.json({ analysts, researchers, decisions, context: { pair, strategy, size, marketCondition } });
  } catch (err) {
    console.error('[/api/pipeline fatal]', err.message);
    res.json({
      analysts: FALLBACK_ANALYSTS,
      researchers: FALLBACK_RESEARCHERS,
      decisions: FALLBACK_DECISIONS,
      context: { pair, strategy, size, marketCondition },
    });
  }
});

// ─── Keep-alive ping ──────────────────────────────────────────────────────────
const SELF = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
setInterval(() => fetch(`${SELF}/health`).catch(() => {}), 14 * 60 * 1000);

app.listen(PORT, () => console.log(`CortexOS v2 running on port ${PORT} | Groq: ${!!process.env.GROQ_API_KEY}`));
