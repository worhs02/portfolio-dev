import React, { useState } from 'react'
import './Desktop.css'
import Portfolio from './Portfolio'
import TechStack from './TechStack'

function Desktop() {
  const [openWindows, setOpenWindows] = useState({
    projects: false,
    techStack: false
  })

  const handleDoubleClick = (windowName) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: true
    }))
  }

  const handleCloseWindow = (windowName) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: false
    }))
  }

  return (
    <div className="desktop">
      <div className="desktop-background">
        {/* Desktop Icons */}
        <div className="desktop-icons">
          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('projects')}
          >
            <div className="icon-image folder-icon-desktop">
              <div className="folder-tab-desktop"></div>
              <div className="folder-body-desktop"></div>
            </div>
            <div className="icon-label">Projects</div>
          </div>

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('techStack')}
          >
            <div className="icon-image app-icon-desktop tech-memo-icon">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <g transform="rotate(-3 50 50)">
                  {/* 테이프 */}
                  <rect x="30" y="8" width="40" height="8" rx="2" fill="rgba(150,150,150,0.4)"/>
                  {/* 메모지 */}
                  <rect x="15" y="15" width="70" height="70" rx="6"
                    fill="#FFFACD"
                    stroke="#000"
                    strokeWidth="3"
                    filter="url(#shadow)"/>
                  {/* 톱니바퀴 */}
                  <g transform="translate(50, 50) scale(0.5)">
                    <circle cx="0" cy="0" r="15" fill="#424242" stroke="#222" strokeWidth="2"/>
                    <circle cx="0" cy="0" r="6" fill="#D32F2F"/>
                  </g>
                </g>
              </svg>
            </div>
            <div className="icon-label">Tech Stack & Skills</div>
          </div>
        </div>

        {/* Windows */}
        {openWindows.projects && (
          <Portfolio onClose={() => handleCloseWindow('projects')} />
        )}

        {openWindows.techStack && (
          <TechStack onClose={() => handleCloseWindow('techStack')} />
        )}

        {/* Dock (optional) */}
        <div className="dock">
          <div className="dock-item" onClick={() => handleDoubleClick('projects')}>
            <div className="dock-folder-icon">📁</div>
          </div>
          <div className="dock-item" onClick={() => handleDoubleClick('techStack')}>
            <svg viewBox="0 0 100 100" width="40" height="40">
              <g transform="rotate(-3 50 50)">
                <rect x="30" y="8" width="40" height="8" rx="2" fill="rgba(150,150,150,0.4)"/>
                <rect x="15" y="15" width="70" height="70" rx="6"
                  fill="#FFFACD"
                  stroke="#000"
                  strokeWidth="3"/>
                <g transform="translate(50, 50) scale(0.5)">
                  <circle cx="0" cy="0" r="15" fill="#424242" stroke="#222" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="6" fill="#D32F2F"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Desktop
