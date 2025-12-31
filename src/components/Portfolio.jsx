import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import { portfolioItems } from '../data/portfolioData'

function Portfolio() {
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const displayedItems = showAll ? portfolioItems : portfolioItems.slice(0, 4)

  const goToPage = (pageNum) => {
    if (pageNum === currentPage || isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage(pageNum)
      setIsFlipping(false)
    }, 1200)
  }

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      setCurrentPage(0)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const pages = [
    { id: 0, icon: '📝', title: '프로젝트 개요' },
    { id: 1, icon: '👥', title: '진행 인원' },
    { id: 2, icon: '🛠️', title: '기술 스택' },
    { id: 3, icon: '🔧', title: '트러블슈팅' },
  ]

  if (selectedProject?.github) {
    pages.push({ id: 4, icon: '🔗', title: 'GitHub' })
  }

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
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-card"
              onClick={() => setSelectedProject(item)}
            >
              {item.award && (
                <div className="award-sticker">
                  {item.award}
                </div>
              )}
              <div className="portfolio-image">
                <div className="placeholder-img" style={{ backgroundColor: item.color }}>
                  <div className="img-content">{item.emoji}</div>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{item.title}</h3>
                <p className="project-period">{item.period}</p>
              </div>
            </div>
          ))}
        </div>

        {portfolioItems.length > 4 && (
          <div className="portfolio-more">
            <button
              className="more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? '접기 ↑' : '더보기 ↓'}
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="diary-modal" onClick={() => setSelectedProject(null)}>
          <div className="diary-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="diary-close" onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            {/* Page 0 - 프로젝트 개요 */}
            <div className={`diary-content ${currentPage === 0 ? 'active' : currentPage > 0 ? 'flipped' : 'hidden'}`}>
              <div className="diary-header">
                <div className="diary-date">{selectedProject.period}</div>
                <h2 className="diary-title">{selectedProject.title}</h2>
                {selectedProject.award && (
                  <div className="diary-award">{selectedProject.award}</div>
                )}
              </div>
              <div className="diary-body">
                <div className="diary-section">
                  <h3 className="diary-section-title">📝 프로젝트 개요</h3>
                  <p className="diary-text">{selectedProject.overview}</p>
                </div>
              </div>
              <div className="diary-pagination">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    className={`page-btn ${currentPage === page.id ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page.id)}
                    title={page.title}
                  >
                    {page.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Page 1 - 진행 인원 */}
            <div className={`diary-content ${currentPage === 1 ? 'active' : currentPage > 1 ? 'flipped' : 'hidden'}`}>
              <div className="diary-header">
                <div className="diary-date">{selectedProject.period}</div>
                <h2 className="diary-title">{selectedProject.title}</h2>
                {selectedProject.award && (
                  <div className="diary-award">{selectedProject.award}</div>
                )}
              </div>
              <div className="diary-body">
                <div className="diary-section">
                  <h3 className="diary-section-title">👥 진행 인원</h3>
                  <p className="diary-text">{selectedProject.team}</p>
                </div>
              </div>
              <div className="diary-pagination">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    className={`page-btn ${currentPage === page.id ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page.id)}
                    title={page.title}
                  >
                    {page.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Page 2 - 기술 스택 */}
            <div className={`diary-content ${currentPage === 2 ? 'active' : currentPage > 2 ? 'flipped' : 'hidden'}`}>
              <div className="diary-header">
                <div className="diary-date">{selectedProject.period}</div>
                <h2 className="diary-title">{selectedProject.title}</h2>
                {selectedProject.award && (
                  <div className="diary-award">{selectedProject.award}</div>
                )}
              </div>
              <div className="diary-body">
                <div className="diary-section">
                  <h3 className="diary-section-title">🛠️ 기술 스택</h3>
                  <div className="diary-skills">
                    {selectedProject.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="diary-pagination">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    className={`page-btn ${currentPage === page.id ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page.id)}
                    title={page.title}
                  >
                    {page.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Page 3 - 트러블슈팅 */}
            <div className={`diary-content ${currentPage === 3 ? 'active' : currentPage > 3 ? 'flipped' : 'hidden'}`}>
              <div className="diary-header">
                <div className="diary-date">{selectedProject.period}</div>
                <h2 className="diary-title">{selectedProject.title}</h2>
                {selectedProject.award && (
                  <div className="diary-award">{selectedProject.award}</div>
                )}
              </div>
              <div className="diary-body">
                <div className="diary-section">
                  <h3 className="diary-section-title">🔧 트러블슈팅</h3>
                  <ul className="diary-list">
                    {selectedProject.troubleshooting.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="diary-pagination">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    className={`page-btn ${currentPage === page.id ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page.id)}
                    title={page.title}
                  >
                    {page.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Page 4 - GitHub */}
            {selectedProject.github && (
              <div className={`diary-content ${currentPage === 4 ? 'active' : currentPage > 4 ? 'flipped' : 'hidden'}`}>
                <div className="diary-header">
                  <div className="diary-date">{selectedProject.period}</div>
                  <h2 className="diary-title">{selectedProject.title}</h2>
                  {selectedProject.award && (
                    <div className="diary-award">{selectedProject.award}</div>
                  )}
                </div>
                <div className="diary-body">
                  <div className="diary-section">
                    <h3 className="diary-section-title">🔗 GitHub</h3>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="diary-link"
                    >
                      {selectedProject.github}
                    </a>
                  </div>
                </div>
                <div className="diary-pagination">
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      className={`page-btn ${currentPage === page.id ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page.id)}
                      title={page.title}
                    >
                      {page.icon}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio
