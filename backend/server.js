import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', version: '1.0.0' }));

// ─── Groq helper ─────────────────────────────────────────────────────────────
async function askGroq(systemPrompt, userPrompt, maxTokens = 300) {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  });
  return completion.choices[0]?.message?.content || '';
}

// ─── Gemini helper ────────────────────────────────────────────────────────────
async function askGemini(prompt, maxTokens = 400) {
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}

function safeParseJSON(text) {
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

// ─── ROUTE: Crisis Scenario ───────────────────────────────────────────────────
// Returns the step-by-step crisis simulation data
app.post('/api/crisis', async (req, res) => {
  const { scenario } = req.body;

  const scenarios = {
    depeg: {
      name: 'Stablecoin Depeg',
      context: 'USDC begins depegging. Price drops from $1.00 to $0.91 in 8 minutes. SOL drops 22% in 90 minutes. Liquidity on Orca/Raydium craters. Funding rates go deeply negative on Drift.',
      asset: 'SOL/USDC',
      date: 'March 2025',
    },
    liquidation: {
      name: 'Cascade Liquidation',
      context: 'A whale wallet gets liquidated on Marginfi triggering $40M in cascade liquidations. BTC drops 12% in 4 minutes. On-chain congestion spikes. Slippage hits 5x normal.',
      asset: 'BTC/USDC',
      date: 'Feb 2025',
    },
    flashcrash: {
      name: 'Flash Crash Event',
      context: 'Unexpected regulatory headline drops. SOL drops 18% in 11 minutes. Smart money exits quietly before the dump. Retail bots trigger stop losses en masse creating further selling pressure.',
      asset: 'SOL/USDC',
      date: 'Jan 2025',
    },
  };

  const s = scenarios[scenario] || scenarios.depeg;

  try {
    // Run static bot analysis and Cortex analysis in parallel
    const [staticBotRaw, regimeRaw] = await Promise.all([
      askGroq(
        'You are simulating a dumb static DeFi trading bot with fixed rules. You only react to price changes. You have no regime awareness. Respond ONLY with valid JSON, no markdown.',
        `Crisis scenario: ${s.context}
Asset: ${s.asset}

Simulate what a static bot does, step by step. Return JSON:
{
  "steps": [
    {"time": "T+0:00", "action": "string", "outcome": "string", "pnl": "e.g. -2%"},
    {"time": "T+2:30", "action": "string", "outcome": "string", "pnl": "e.g. -8%"},
    {"time": "T+8:00", "action": "string", "outcome": "string", "pnl": "e.g. -15%"},
    {"time": "T+15:00", "action": "string", "outcome": "string", "pnl": "e.g. -28%"},
    {"time": "T+90:00", "action": "string", "outcome": "string", "pnl": "e.g. -41%"}
  ],
  "finalPnL": "-41%",
  "status": "LIQUIDATED"
}`,
        400
      ),
      askGroq(
        'You are the Cortex regime classifier on Solana. You detect market phases using Markov Switching Model, Hawkes processes, and cross-asset correlation. Respond ONLY with valid JSON.',
        `Crisis: ${s.context}
Classify the regime transition. Return JSON:
{
  "initialRegime": "ACCUMULATION|MARKUP|DISTRIBUTION|MARKDOWN|CRISIS",
  "detectedRegime": "CRISIS",
  "confidencePct": 87,
  "detectionLeadMinutes": 4,
  "signals": [
    {"source": "Helius on-chain stream", "signal": "string describing what was detected"},
    {"source": "Pyth oracle", "signal": "string"},
    {"source": "Drift funding rates", "signal": "string"},
    {"source": "Orca liquidity depth", "signal": "string"}
  ],
  "summary": "One sentence: what regime shift was detected and when"
}`,
        400
      )
    ]);

    const staticBot = safeParseJSON(staticBotRaw) || {
      steps: [
        { time: 'T+0:00', action: 'Normal operation — no signals', outcome: 'Holds position', pnl: '0%' },
        { time: 'T+2:30', action: 'Price drop detected. No action (within threshold)', outcome: 'Still holding', pnl: '-6%' },
        { time: 'T+8:00', action: 'Stop loss triggered at -15%', outcome: 'Sells into panic', pnl: '-15%' },
        { time: 'T+15:00', action: '"Dip buy" rule triggers at -20%', outcome: 'Re-enters — wrong', pnl: '-20%' },
        { time: 'T+90:00', action: 'Margin call. Forced liquidation.', outcome: 'Account wiped', pnl: '-41%' }
      ],
      finalPnL: '-41%',
      status: 'LIQUIDATED'
    };

    const regime = safeParseJSON(regimeRaw) || {
      initialRegime: 'DISTRIBUTION',
      detectedRegime: 'CRISIS',
      confidencePct: 87,
      detectionLeadMinutes: 4,
      signals: [
        { source: 'Helius on-chain stream', signal: 'Whale wallet exits detected 4 min before price drop' },
        { source: 'Pyth oracle', signal: 'Price volatility 6x above 30-day average' },
        { source: 'Drift funding rates', signal: 'Funding went deeply negative — leveraged longs fleeing' },
        { source: 'Orca liquidity depth', signal: 'Bid-side liquidity dropped 70% in 90 seconds' }
      ],
      summary: 'CRISIS regime detected with 87% confidence, 4 minutes before the main price collapse'
    };

    // Cortex response steps via Gemini
    const cortexRaw = await askGemini(
      `You are CortexOS, a multi-agent DeFi system on Solana. Crisis: ${s.context}. The system detected a regime shift to CRISIS with ${regime.confidencePct}% confidence, ${regime.detectionLeadMinutes} minutes before the main crash.

Describe what Cortex did step by step. Return ONLY valid JSON, no markdown:
{
  "steps": [
    {"time": "T-4:00", "agent": "Regime Classifier", "action": "string — what was detected early", "outcome": "string", "status": "DEFENSIVE"},
    {"time": "T-2:00", "agent": "4 Analyst Agents", "action": "string — what analysts flagged", "outcome": "string", "status": "ALERT"},
    {"time": "T+0:00", "agent": "Risk Manager", "action": "string — risk response", "outcome": "string", "status": "PROTECTED"},
    {"time": "T+8:00", "agent": "Guardian", "action": "string — guardian action during crash", "outcome": "string", "status": "SAFE"},
    {"time": "T+90:00", "agent": "Portfolio Manager", "action": "string — post-crisis positioning", "outcome": "string", "status": "POSITIONED"}
  ],
  "finalPnL": "+2.1%",
  "capitalPreserved": "100%",
  "status": "CAPITAL PRESERVED"
}`,
      500
    );

    const cortexSteps = safeParseJSON(cortexRaw) || {
      steps: [
        { time: 'T-4:00', agent: 'Regime Classifier', action: 'Hawkes process detects unusual event clustering. MSM probability shifts toward CRISIS at 73%.', outcome: 'Alert dispatched to all agents', status: 'ALERT' },
        { time: 'T-2:00', agent: '4 Analyst Agents', action: 'All 4 analysts independently confirm: liquidity thinning, smart money exiting, funding rates inverting.', outcome: 'Consensus: defensive posture required', status: 'DEFENSIVE' },
        { time: 'T+0:00', agent: 'Risk Manager', action: 'Hard capital limits enforced. All leveraged positions closed. Capital moved to safe assets.', outcome: 'Portfolio fully protected before crash', status: 'PROTECTED' },
        { time: 'T+8:00', agent: 'Guardian', action: 'Guardian vetoes all buy signals from reactive agents during the flush. No re-entry permitted.', outcome: 'Zero exposure during -22% drop', status: 'SAFE' },
        { time: 'T+90:00', agent: 'Portfolio Manager', action: 'Crisis regime probability falls below 40%. Controlled re-entry initiated with tight sizing.', outcome: 'Positioned for recovery', status: 'POSITIONED' }
      ],
      finalPnL: '+2.1%',
      capitalPreserved: '100%',
      status: 'CAPITAL PRESERVED'
    };

    res.json({ scenario: s, staticBot, regime, cortex: cortexSteps });
  } catch (err) {
    console.error('Crisis API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── ROUTE: Agent Pipeline ────────────────────────────────────────────────────
app.post('/api/pipeline', async (req, res) => {
  const { pair, strategy, size, marketCondition } = req.body;

  const context = `Trade: ${strategy} on ${pair}. Size: $${Number(size).toLocaleString()}. Market condition: ${marketCondition}.`;

  try {
    // Run all 4 analyst agents in parallel via Groq
    const [a1Raw, a2Raw, a3Raw, a4Raw] = await Promise.all([
      askGroq(
        'You are the Smart Money Tracker agent inside CortexOS. You analyze whale wallets, institutional flows, and on-chain accumulation/distribution patterns on Solana. Be sharp and specific. Respond ONLY with valid JSON.',
        `${context} Return JSON: {"sentiment":"bullish|bearish|neutral","signal":"one sharp sentence","confidence":0-100,"keyData":"one specific on-chain data point"}`,
        150
      ),
      askGroq(
        'You are the Chart Pattern Engine inside CortexOS. You identify technical patterns, support/resistance, volume profiles on Solana DEX data. Be precise. Respond ONLY with valid JSON.',
        `${context} Return JSON: {"sentiment":"bullish|bearish|neutral","signal":"one sentence pattern observation","confidence":0-100,"pattern":"pattern name"}`,
        150
      ),
      askGroq(
        'You are the News & Sentiment Agent inside CortexOS. You process crypto Twitter, news feeds, and protocol announcements in real time. Respond ONLY with valid JSON.',
        `${context} Return JSON: {"sentiment":"bullish|bearish|neutral","signal":"one sentence on current narrative","confidence":0-100,"source":"where the signal came from"}`,
        150
      ),
      askGroq(
        'You are the Token Safety Scorer inside CortexOS. You run 7-factor safety analysis: contract audit, liquidity lock, team doxxing, holder concentration, rug vectors, protocol history, oracle manipulation risk. Respond ONLY with valid JSON.',
        `${context} Return JSON: {"sentiment":"bullish|bearish|neutral","signal":"one sentence safety summary","score":0-100,"flags":[]}`,
        150
      ),
    ]);

    const analysts = [
      { name: 'Smart Money Tracker', icon: '🧠', data: safeParseJSON(a1Raw) || { sentiment: 'neutral', signal: 'Whale flow patterns inconclusive at current price level.', confidence: 62, keyData: 'Net flow: -$2.1M in last 4 hours' } },
      { name: 'Chart Pattern Engine', icon: '📊', data: safeParseJSON(a2Raw) || { sentiment: 'bullish', signal: 'Descending wedge breakout on 4H with volume confirmation.', confidence: 74, pattern: 'Descending Wedge Breakout' } },
      { name: 'News Sentiment AI', icon: '📡', data: safeParseJSON(a3Raw) || { sentiment: 'bullish', signal: 'Positive protocol upgrade narrative trending on CT.', confidence: 68, source: 'Crypto Twitter / official Discord' } },
      { name: 'Token Safety Scorer', icon: '🛡️', data: safeParseJSON(a4Raw) || { sentiment: 'bullish', signal: 'Passes all 7 safety criteria. No rug vectors detected.', score: 91, flags: [] } },
    ];

    // Researchers via Groq
    const [r1Raw, r2Raw] = await Promise.all([
      askGroq(
        'You are the Liquidity Depth Analyst inside CortexOS. You analyze order book depth, slippage curves, bid-ask spreads, and liquidity distribution across Orca, Raydium and Jupiter. Respond ONLY with valid JSON.',
        `${context} Analyst votes: ${analysts.map(a => a.data.sentiment).join(', ')}. Return JSON: {"sentiment":"bullish|bearish|neutral","finding":"one sentence liquidity analysis","slippageEst":"0.08%","depthScore":0-100}`,
        200
      ),
      askGroq(
        'You are the Regime Classifier inside CortexOS. You run Markov Switching, Hawkes process event clustering, and EVT tail risk analysis. Respond ONLY with valid JSON.',
        `${context} Market condition: ${marketCondition}. Return JSON: {"sentiment":"bullish|bearish|neutral","finding":"one sentence regime analysis","regime":"MARKUP|ACCUMULATION|DISTRIBUTION|MARKDOWN|CRISIS","regimeProbability":0-100,"tailRisk":"LOW|MEDIUM|HIGH"}`,
        200
      ),
    ]);

    const researchers = [
      { name: 'Liquidity Depth Analyst', icon: '🌊', data: safeParseJSON(r1Raw) || { sentiment: 'bullish', finding: 'Order book depth sufficient. Estimated slippage 0.07% at this size.', slippageEst: '0.07%', depthScore: 81 } },
      { name: 'Regime Classifier', icon: '⚙️', data: safeParseJSON(r2Raw) || { sentiment: 'neutral', finding: 'Moderate Hawkes clustering. EVT tail risk within bounds.', regime: 'MARKUP', regimeProbability: 71, tailRisk: 'LOW' } },
    ];

    // Decision agents via Gemini
    const decisionRaw = await askGemini(
      `You are the CortexOS decision layer. Full context: ${context}
Analyst consensus: ${analysts.map(a => `${a.name}=${a.data.sentiment}`).join(', ')}.
Regime: ${researchers[1].data.regime || 'MARKUP'}, tail risk: ${researchers[1].data.tailRisk || 'LOW'}.
Liquidity: depth score ${researchers[0].data.depthScore || 75}, slippage est ${researchers[0].data.slippageEst || '0.1%'}.

Return ONLY valid JSON, no markdown:
{
  "trader": {"sentiment":"bullish|bearish|neutral","proposal":"one sentence entry rationale"},
  "riskManager": {"sentiment":"bullish|bearish|neutral","assessment":"one sentence on position sizing and risk limits","stopLossPct":-15,"takeProfitPct":45,"riskReward":"1:3"},
  "portfolioManager": {
    "sentiment":"bullish|bearish|neutral",
    "decision":"one sentence final portfolio-level call",
    "verdict":"APPROVE|VETO",
    "verdictReason":"one sentence explaining the Guardian verdict",
    "riskScore":0-100,
    "liquidityScore":0-100,
    "volatilityScore":0-100,
    "protocol":"Jupiter Spot|Jupiter Perps + Drift|Raydium LP|DCA via Jupiter",
    "expectedAPY":0-100
  }
}`,
      600
    );

    const decisions = safeParseJSON(decisionRaw) || {
      trader: { sentiment: 'bullish', proposal: `Entry at market via Jupiter on ${pair} momentum confirmation.` },
      riskManager: { sentiment: 'neutral', assessment: 'Position sized at 8% of portfolio. Stop at -15%, R:R = 1:3.', stopLossPct: -15, takeProfitPct: 45, riskReward: '1:3' },
      portfolioManager: { sentiment: 'bullish', decision: 'Approved. Regime confirms entry window. Diversification maintained.', verdict: 'APPROVE', verdictReason: 'All 9 risk components within Guardian thresholds.', riskScore: 32, liquidityScore: 81, volatilityScore: 44, protocol: 'Jupiter Spot', expectedAPY: 27 }
    };

    res.json({ analysts, researchers, decisions, context: { pair, strategy, size, marketCondition } });
  } catch (err) {
    console.error('Pipeline API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`CortexOS backend running on port ${PORT}`));
