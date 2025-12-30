import React from 'react'
import './Portfolio.css'
import { portfolioItems } from '../data/portfolioData'

function Portfolio() {

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <h2 className="portfolio-title">
          My Portfolio
          <span className="title-decor">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <path d="M25 5 L28 22 L25 25 L22 22 Z M5 25 L22 28 L25 25 L22 22 Z M25 45 L22 28 L25 25 L28 28 Z M45 25 L28 22 L25 25 L28 28 Z M15 15 L20 20 L25 25 M35 15 L30 20 L25 25 M15 35 L20 30 L25 25 M35 35 L30 30 L25 25" stroke="#87CEEB" strokeWidth="2" fill="none"/>
            </svg>
          </span>
        </h2>

        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-card">
              <div className="portfolio-image">
                <div className="placeholder-img" style={{ backgroundColor: item.color }}>
                  {item.id === 1 && <div className="img-content">✏️📝</div>}
                  {item.id === 2 && <div className="img-content dark">💻🖥️</div>}
                  {item.id === 3 && <div className="img-content">🎨🖌️</div>}
                  {item.id === 4 && <div className="img-content">🔍✨</div>}
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#" className="portfolio-link">↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
