import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <Portfolio isWindow={false} />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
