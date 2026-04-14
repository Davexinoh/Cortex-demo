const BASE = import.meta.env.VITE_API_URL || '/api'

export async function runCrisis(scenario) {
  const res = await fetch(`${BASE}/crisis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario }),
  })
  if (!res.ok) throw new Error('Crisis API failed')
  return res.json()
}

export async function runPipeline(params) {
  const res = await fetch(`${BASE}/pipeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error('Pipeline API failed')
  return res.json()
}
