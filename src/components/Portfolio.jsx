import React, { useState, useEffect, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import './Portfolio.css'
import { portfolioItems } from '../data/portfolioData'

function Portfolio() {
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const bookRef = useRef(null)
  const displayedItems = showAll ? portfolioItems : portfolioItems.slice(0, 4)

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

  const totalPages = selectedProject?.github ? 5 : 4

  const getPageTitle = () => {
    const titles = [
      '📝 프로젝트 개요',
      '👥 진행 인원',
      '🛠️ 기술 스택',
      '🔧 트러블슈팅',
      '🔗 GitHub'
    ]
    return titles[currentPage]
  }

  const goToPage = (pageNum) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(pageNum)
    }
  }

  const onFlip = (e) => {
    setCurrentPage(e.data)
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
          <div className="diary-wrapper">
            <div className="diary-content" onClick={(e) => e.stopPropagation()}>
              <button className="diary-close" onClick={() => setSelectedProject(null)}>
                ✕
              </button>

              <div className="diary-header">
              <div className="diary-date">{selectedProject.period}</div>
              <h2 className="diary-title">{selectedProject.title}</h2>
              {selectedProject.award && (
                <div className="diary-award">{selectedProject.award}</div>
              )}
            </div>

            <div className="diary-body">
              <HTMLFlipBook
                width={430}
                height={500}
                size="stretch"
                minWidth={315}
                maxWidth={430}
                minHeight={400}
                maxHeight={500}
                showCover={false}
                ref={bookRef}
                onFlip={onFlip}
                className="flip-book"
              >
                <div className="diary-page">
                  <div className="diary-section">
                    <h3 className="diary-section-title">📝 프로젝트 개요</h3>
                    <p className="diary-text">{selectedProject.overview}</p>
                  </div>
                </div>

                <div className="diary-page">
                  <div className="diary-section">
                    <h3 className="diary-section-title">👥 진행 인원</h3>
                    <p className="diary-text">{selectedProject.team}</p>
                  </div>
                </div>

                <div className="diary-page">
                  <div className="diary-section">
                    <h3 className="diary-section-title">🛠️ 기술 스택</h3>
                    <div className="diary-skills">
                      {selectedProject.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="diary-page">
                  <div className="diary-section">
                    <h3 className="diary-section-title">🔧 트러블슈팅</h3>
                    <ul className="diary-list">
                      {selectedProject.troubleshooting.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedProject.github && (
                  <div className="diary-page">
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
                )}
              </HTMLFlipBook>
            </div>
            </div>

            <div className="diary-tabs">
              <button
                className={`diary-tab tab-1 ${currentPage === 0 ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPage(0);
                }}
                title="프로젝트 개요"
              >
                📝
              </button>
              <button
                className={`diary-tab tab-2 ${currentPage === 1 ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPage(1);
                }}
                title="진행 인원"
              >
                👥
              </button>
              <button
                className={`diary-tab tab-3 ${currentPage === 2 ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPage(2);
                }}
                title="기술 스택"
              >
                🛠️
              </button>
              <button
                className={`diary-tab tab-4 ${currentPage === 3 ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPage(3);
                }}
                title="트러블슈팅"
              >
                🔧
              </button>
              {selectedProject.github && (
                <button
                  className={`diary-tab tab-5 ${currentPage === 4 ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPage(4);
                  }}
                  title="GitHub"
                >
                  🔗
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio
