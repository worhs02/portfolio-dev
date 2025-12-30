import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="flower-decor flower-top-left">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <path d="M25 15 L30 20 L25 25 L20 20 Z M15 25 L20 30 L25 25 L20 20 Z M25 35 L30 30 L25 25 L20 30 Z M35 25 L30 20 L25 25 L30 30 Z" fill="#FFB6C1" stroke="#000" strokeWidth="2"/>
          </svg>
        </div>
        <div className="flower-decor flower-top-right">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path d="M30 10 L40 25 L30 35 L20 25 Z M10 30 L20 40 L30 30 L20 20 Z M30 50 L40 40 L30 30 L20 40 Z M50 30 L40 20 L30 30 L40 40 Z" fill="#DDA0DD" stroke="#000" strokeWidth="2"/>
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="gift-box">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <rect x="10" y="35" width="60" height="40" fill="#FFB6C1" stroke="#000" strokeWidth="2"/>
                <rect x="10" y="25" width="60" height="10" fill="#FFD700" stroke="#000" strokeWidth="2"/>
                <path d="M40 25 L40 75" stroke="#000" strokeWidth="2"/>
                <path d="M25 15 Q25 25 40 25 Q55 25 55 15" fill="none" stroke="#000" strokeWidth="2"/>
              </svg>
            </div>
            <h1 className="hero-title">
              I design ⚡ top<br />
              notch websites
            </h1>
            <button className="btn-portfolio">
              See Portfolio
              <span className="btn-arrow">↗</span>
            </button>
          </div>

          <div className="hero-right">
            <div className="browser-window">
              <div className="browser-header">
                <span className="browser-dot"></span>
                <span className="browser-dot"></span>
              </div>
              <div className="browser-content">
                <div className="medal">🏅</div>
                <div className="smiley">☺</div>
              </div>
              <div className="star-decor">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M20 5 L23 17 L35 17 L25 24 L28 36 L20 29 L12 36 L15 24 L5 17 L17 17 Z" fill="#FF6B6B" stroke="#000" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-bar">
          <span>Figma</span>
          <span>Framer</span>
          <span>Webflow</span>
          <span>Notion</span>
          <span>Lottie</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
