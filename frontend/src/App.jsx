import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import SocialProof from './components/SocialProof.jsx'
import ProblemSection from './components/ProblemSection.jsx'
import CrisisSection from './components/CrisisSection.jsx'
import PipelineSection from './components/PipelineSection.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ConstraintsSection from './components/ConstraintsSection.jsx'
import ObjectionSection from './components/ObjectionSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

// Progressive chain — each section answers one question, ends with the next
// Hero:        "Your bot has one strategy. Markets have five."
// Social:      Protocol proof — these are the integrations
// Problem:     "What breaks static bots?" → regime failure table
// Crisis:      "What does regime failure look like in practice?" → live sim
// Pipeline:    "What does Cortex do instead?" → input/transform/output per step
// HowItWorks:  "How do I get started?" → 3 steps
// Constraints: "Where does it break?" → honest failure modes
// Objections:  "What questions should I ask?" → FAQ
// FinalCTA:    "Why now?" → waitlist

export default function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,255,224,0.013) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,224,0.013) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <SocialProof />
        <ProblemSection />
        <CrisisSection />
        <PipelineSection />
        <HowItWorks />
        <ConstraintsSection />
        <ObjectionSection />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  )
}
