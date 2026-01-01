import React, { useState } from 'react'
import './Desktop.css'
import Portfolio from './Portfolio'

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
            <div className="icon-image app-icon-desktop">
              <div className="app-icon-inner">
                <span className="app-emoji">☺</span>
              </div>
            </div>
            <div className="icon-label">Tech Stack & Skills</div>
          </div>
        </div>

        {/* Windows */}
        {openWindows.projects && (
          <div className="window-wrapper">
            <Portfolio onClose={() => handleCloseWindow('projects')} />
          </div>
        )}

        {openWindows.techStack && (
          <div className="window-wrapper">
            <div className="tech-window">
              <div className="finder-titlebar">
                <div className="finder-controls">
                  <span
                    className="finder-btn close"
                    onClick={() => handleCloseWindow('techStack')}
                  ></span>
                  <span className="finder-btn minimize"></span>
                  <span className="finder-btn maximize"></span>
                </div>
                <div className="finder-title">Tech Stack & Skills ☺</div>
              </div>
              <div className="tech-content">
                <h2>Tech Stack & Skills Coming Soon!</h2>
                <p>This window will show your tech stack and skills.</p>
              </div>
            </div>
          </div>
        )}

        {/* Dock (optional) */}
        <div className="dock">
          <div className="dock-item" onClick={() => handleDoubleClick('projects')}>
            <div className="dock-folder-icon">📁</div>
          </div>
          <div className="dock-item" onClick={() => handleDoubleClick('techStack')}>
            <div className="dock-app-icon">☺</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Desktop
