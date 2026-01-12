import React, { useState, useEffect, useRef } from 'react'
import './Services.css'
import { techStackData } from '../data/portfolioData'

function TechStack({ onClose, onClick, zIndex }) {
  const skills = techStackData

  const [selectedSkill, setSelectedSkill] = useState(skills[0])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  const windowRef = useRef(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  // 스플래시 화면 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000) // 2초 후 스플래시 숨김

    return () => clearTimeout(timer)
  }, [])

  // 초기 중앙 배치
  useEffect(() => {
    const centerX = (window.innerWidth - 1240) / 2  // 1200px + padding 40px
    const centerY = (window.innerHeight - 700) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [])

  // Auto-rotate skill display
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedSkill(currentSkill => {
        const currentIndex = skills.findIndex(skill => skill.id === currentSkill.id)
        const nextIndex = (currentIndex + 1) % skills.length
        return skills[nextIndex]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 타이틀바에 드래그 이벤트 연결
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.window-header')
    if (!titlebar) return

    const handleMouseDownDrag = (e) => {
      if (e.target.closest('.window-dots') || e.target.closest('.dot')) {
        return
      }

      setIsDragging(true)
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
      e.preventDefault()
    }

    titlebar.addEventListener('mousedown', handleMouseDownDrag)
    titlebar.style.cursor = 'grab'

    return () => {
      titlebar.removeEventListener('mousedown', handleMouseDownDrag)
    }
  }, [position, showSplash])

  // 타이틀바 커서 업데이트
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.window-header')
    if (titlebar) {
      titlebar.style.cursor = isDragging ? 'grabbing' : 'grab'
    }
  }, [isDragging])

  // 마우스 이동 처리
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragStartPos.current.x
        const newY = e.clientY - dragStartPos.current.y

        const maxX = window.innerWidth - 100
        const maxY = window.innerHeight - 50

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, position])

  return (
    <div
      ref={windowRef}
      className="tech-stack-window"
      onClick={onClick}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex || 100
      }}
    >
      {showSplash ? (
        <div className="splash-screen">
          <div className="splash-screen-inner">
            <div className="splash-content">
              <svg viewBox="0 0 100 100" width="120" height="120" className="splash-icon">
                <defs>
                  <filter id="splash-shadow">
                    <feDropShadow dx="3" dy="3" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <g transform="rotate(-3 50 50)">
                  <rect x="30" y="8" width="40" height="10" rx="2" fill="rgba(180,180,180,0.7)" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                  <rect x="15" y="15" width="70" height="70" rx="6"
                    fill="#FFFACD"
                    stroke="#000"
                    strokeWidth="3"
                    filter="url(#splash-shadow)"/>
                </g>
              </svg>
              <h1 className="splash-title">Tech Stack & Skills</h1>
              <div className="splash-loader">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="skills-showcase">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot" onClick={onClose} style={{ cursor: 'pointer', background: '#FF5F57' }}></span>
              <span className="dot" style={{ background: '#FFBD2E' }}></span>
              <span className="dot" style={{ background: '#28CA42' }}></span>
            </div>
            <div className="url-bar">
              <span className="url-icon">🔒</span>
              <span className="url-text">Tech Stack & Skills ☺</span>
            </div>
          </div>
          <div className="window-content">
            <div className="main-skill-display">
              <div className="main-skill-image">
                <img src={selectedSkill.image} alt={selectedSkill.name} />
              </div>
              <div className="main-skill-info">
                <p className="skill-label">CURRENTLY SELECTED</p>
                <h3 className="skill-name">{selectedSkill.name}</h3>
                <p className="skill-description">{selectedSkill.description}</p>
              </div>
              <div className="skill-memo">
                <div className="memo-header">Proficiency</div>
                <div className="memo-level">{selectedSkill.proficiency}</div>
                <div className="memo-bar">
                  <div className="memo-bar-fill" style={{ width: `${selectedSkill.level}%` }}></div>
                </div>
                <div className="memo-percentage">{selectedSkill.level}%</div>
              </div>
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`skill-card ${selectedSkill.id === skill.id ? 'active' : ''}`}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <img src={skill.image} alt={skill.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default TechStack
