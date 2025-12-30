import React from 'react'
import './CTA.css'

function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-box">
          <div className="flower-decor flower-cta">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <path d="M30 10 L35 25 L30 30 L25 25 Z M10 30 L25 35 L30 30 L25 25 Z M30 50 L25 35 L30 30 L35 35 Z M50 30 L35 25 L30 30 L35 35 Z" fill="#DDA0DD" stroke="#000" strokeWidth="2"/>
            </svg>
          </div>
          <h2>Let's start designing your project</h2>
          <p>
            Want to see how to transform your brand into a<br />
            unique style, sent us a message
          </p>
          <button className="btn-message">
            Send us message
            <span className="btn-arrow">↗</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA
