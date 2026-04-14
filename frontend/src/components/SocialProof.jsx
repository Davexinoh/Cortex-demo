import React from 'react'

const PROTOCOLS = [
  'SOLANA', 'JUPITER', 'DRIFT', 'HELIUS', 'PYTH', 'RAYDIUM', 'ORCA', 'MARINADE', 'JITO', 'OPENSERV'
]

export default function SocialProof() {
  return (
    <div style={{
      borderTop: '1px solid var(--wire)',
      borderBottom: '1px solid var(--wire)',
      background: 'var(--ink2)',
      padding: '20px 32px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Label */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 9,
        color: 'var(--slate3)', letterSpacing: '0.25em',
        textAlign: 'center', marginBottom: 16,
      }}>INTEGRATED PROTOCOLS</div>

      {/* Scrolling strip */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(90deg, var(--ink2), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(-90deg, var(--ink2), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex', gap: 0,
          animation: 'scrollLeft 20s linear infinite',
          width: 'max-content',
        }}>
          {[...PROTOCOLS, ...PROTOCOLS].map((p, i) => (
            <div key={i} style={{
              fontFamily: 'var(--display)', fontSize: 14,
              color: 'var(--slate2)', letterSpacing: '0.2em',
              padding: '6px 28px',
              borderRight: '1px solid var(--wire)',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}>{p}</div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
