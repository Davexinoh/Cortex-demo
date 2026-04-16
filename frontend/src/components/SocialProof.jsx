import React from 'react'

const PROTOCOLS = ['SOLANA','JUPITER','DRIFT','HELIUS','PYTH','RAYDIUM','ORCA','MARINADE','JITO','OPENSERV']

export default function SocialProof() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg2)', padding: '16px 0',
      overflow: 'hidden', position: 'relative', zIndex: 1,
    }}>
      <div style={{
        fontFamily: 'var(--pixel)', fontSize: 7,
        color: 'var(--muted2)', letterSpacing: '0.15em',
        textAlign: 'center', marginBottom: 12,
      }}>INTEGRATED PROTOCOLS</div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 60,
          background: 'linear-gradient(90deg, var(--bg2), transparent)', zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 60,
          background: 'linear-gradient(-90deg, var(--bg2), transparent)', zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', gap: 0, animation: 'scroll 22s linear infinite', width: 'max-content' }}>
          {[...PROTOCOLS, ...PROTOCOLS].map((p, i) => (
            <div key={i} style={{
              fontFamily: 'var(--pixel)', fontSize: 8,
              color: 'var(--muted)', padding: '4px 24px',
              borderRight: '1px solid var(--border)', whiteSpace: 'nowrap',
            }}>{p}</div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  )
}
