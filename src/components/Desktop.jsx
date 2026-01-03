import React, { useState } from 'react'
import './Desktop.css'
import Portfolio from './Portfolio'
import TechStack from './TechStack'

function Desktop() {
  const [openWindows, setOpenWindows] = useState({
    projects: false,
    techStack: false
  })

  const [windowZIndex, setWindowZIndex] = useState({
    projects: 100,
    techStack: 100
  })

  const [maxZIndex, setMaxZIndex] = useState(100)

  const handleDoubleClick = (windowName) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: true
    }))
    bringToFront(windowName)
  }

  const handleCloseWindow = (windowName) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: false
    }))
  }

  const bringToFront = (windowName) => {
    const newZIndex = maxZIndex + 1
    setWindowZIndex(prev => ({
      ...prev,
      [windowName]: newZIndex
    }))
    setMaxZIndex(newZIndex)
  }

  return (
    <div className="desktop">
      <div className="desktop-background">
        {/* macOS Menu Bar */}
        <div className="macos-menubar">
          <div className="menubar-left">
            <span className="apple-logo"></span>
            <span className="menu-item">Finder</span>
            <span className="menu-item">파일</span>
            <span className="menu-item">편집</span>
            <span className="menu-item">보기</span>
            <span className="menu-item">이동</span>
          </div>
          <div className="menubar-right">
            <span className="menu-icon">🔋</span>
            <span className="menu-icon">📶</span>
            <span className="menu-icon">🔍</span>
            <span className="menu-time">오후 2:39</span>
          </div>
        </div>

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
                  <rect x="30" y="8" width="40" height="10" rx="2" fill="rgba(180,180,180,0.7)" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                  {/* 메모지 */}
                  <rect x="15" y="15" width="70" height="70" rx="6"
                    fill="#FFFACD"
                    stroke="#000"
                    strokeWidth="3"
                    filter="url(#shadow)"/>
                </g>
              </svg>
            </div>
            <div className="icon-label">Tech Stack & Skills</div>
          </div>
        </div>

        {/* Windows */}
        {openWindows.projects && (
          <Portfolio
            onClose={() => handleCloseWindow('projects')}
            isWindow={true}
            onClick={() => bringToFront('projects')}
            zIndex={windowZIndex.projects}
          />
        )}

        {openWindows.techStack && (
          <TechStack
            onClose={() => handleCloseWindow('techStack')}
            onClick={() => bringToFront('techStack')}
            zIndex={windowZIndex.techStack}
          />
        )}

        {/* Dock */}
        <div className="dock">
          <div className={`dock-item ${openWindows.projects ? 'active' : ''}`} onClick={() => handleDoubleClick('projects')}>
            <div className="dock-folder-icon">📁</div>
            {openWindows.projects && <div className="dock-indicator"></div>}
          </div>
          <div className={`dock-item ${openWindows.techStack ? 'active' : ''}`} onClick={() => handleDoubleClick('techStack')}>
            <svg viewBox="0 0 100 100" width="40" height="40">
              <g transform="rotate(-3 50 50)">
                <rect x="30" y="8" width="40" height="10" rx="2" fill="rgba(180,180,180,0.7)" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                <rect x="15" y="15" width="70" height="70" rx="6"
                  fill="#FFFACD"
                  stroke="#000"
                  strokeWidth="3"/>
              </g>
            </svg>
            {openWindows.techStack && <div className="dock-indicator"></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Desktop
