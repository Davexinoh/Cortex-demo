import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import SocialProof from './components/SocialProof.jsx'
import ProblemSection from './components/ProblemSection.jsx'
import CrisisSection from './components/CrisisSection.jsx'
import PipelineSection from './components/PipelineSection.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ObjectionSection from './components/ObjectionSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Grid background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,255,224,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,224,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        {/* 1. Hero — value prop + CTA */}
        <Hero />
        {/* 2. Social proof — protocol logos */}
        <SocialProof />
        {/* 3. Problem / Agitation */}
        <ProblemSection />
        {/* 4. Solution — Crisis Simulation */}
        <CrisisSection />
        {/* 5. Features / Benefits — Agent Pipeline */}
        <PipelineSection />
        {/* 6. How It Works — 3 steps */}
        <HowItWorks />
        {/* 7. Objection Handling */}
        <ObjectionSection />
        {/* 8. Final CTA */}
        <FinalCTA />
        {/* 9. Footer */}
        <Footer />
      </div>
    </div>
  )
}
