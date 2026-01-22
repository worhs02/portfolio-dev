import React, { useState, useEffect, useRef } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { portfolioItems } from '../data/portfolioData'
import './GitHub.css'

function GitHub({ onClose, onClick, zIndex, onMinimize, deviceType = 'desktop' }) {
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const isMobile = deviceType === 'mobile'
  const isTablet = deviceType === 'tablet'
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 1040, height: 700 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 1040, height: 700 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartWindowPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)

  // GitHub 데이터 가져오기 (static JSON에서)
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        console.log('Fetching GitHub data from static JSON...')

        // public/github-data.json에서 데이터 가져오기
        const response = await fetch(`${import.meta.env.BASE_URL}github-data.json`)
        if (!response.ok) {
          throw new Error(`Failed to fetch github-data.json: ${response.status}`)
        }

        const data = await response.json()

        // 데이터 설정
        setUserData(data.user)
        setRepos(data.repos || [])

        // 선택된 연도의 contributions 설정
        setContributions(data.contributions[selectedYear] || [])

        console.log('✅ GitHub data loaded from static JSON')
        setLoading(false)
      } catch (error) {
        console.error('❌ GitHub 데이터 가져오기 실패:', error)
        setUserData(null)
        setRepos([])
        setContributions([])
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [selectedYear])

  // 초기 중앙 배치
  useEffect(() => {
    let windowWidth, windowHeight
    const aspectRatio = 1040 / 700

    if (isTablet) {
      // 태블릿: 60% 크기
      windowWidth = 1040 * 0.6 // 624px
      windowHeight = 700 * 0.6 // 420px

      if (windowWidth > window.innerWidth * 0.9) {
        windowWidth = window.innerWidth * 0.9
        windowHeight = windowWidth / aspectRatio
      }
      if (windowHeight > window.innerHeight * 0.85) {
        windowHeight = window.innerHeight * 0.85
        windowWidth = windowHeight * aspectRatio
      }
    } else {
      windowWidth = 1040
      windowHeight = 700
    }

    setSize({ width: windowWidth, height: windowHeight })
    setPrevSize({ width: windowWidth, height: windowHeight })
    const centerX = (window.innerWidth - windowWidth) / 2
    const centerY = (window.innerHeight - windowHeight) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [isTablet])

  // 타이틀바 드래그
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.github-titlebar')
    if (!titlebar) return

    const handleMouseDown = (e) => {
      if (e.target.closest('.github-controls')) return
      if (isMaximized) return

      setIsDragging(true)
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
      e.preventDefault()
    }

    titlebar.addEventListener('mousedown', handleMouseDown)
    titlebar.style.cursor = 'grab'

    return () => {
      titlebar.removeEventListener('mousedown', handleMouseDown)
    }
  }, [position, isMaximized])

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

      if (isResizing && resizeDirection) {
        const deltaX = e.clientX - resizeStartPos.current.x
        const deltaY = e.clientY - resizeStartPos.current.y

        let newWidth = resizeStartSize.current.width
        let newHeight = resizeStartSize.current.height
        let newX = position.x
        let newY = position.y

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(400, resizeStartSize.current.width + deltaX)
        }
        if (resizeDirection.includes('w')) {
          const potentialWidth = resizeStartSize.current.width - deltaX
          if (potentialWidth >= 400) {
            newWidth = potentialWidth
            newX = resizeStartWindowPos.current.x + deltaX
          }
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(300, resizeStartSize.current.height + deltaY)
        }
        if (resizeDirection.includes('n')) {
          const potentialHeight = resizeStartSize.current.height - deltaY
          if (potentialHeight >= 300) {
            newHeight = potentialHeight
            newY = resizeStartWindowPos.current.y + deltaY
          }
        }

        setSize({ width: newWidth, height: newHeight })
        if (newX !== position.x || newY !== position.y) {
          setPosition({ x: newX, y: newY })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, resizeDirection, position, size])

  // 타이틀바 커서 업데이트
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.github-titlebar')
    if (titlebar) {
      titlebar.style.cursor = isDragging ? 'grabbing' : 'grab'
    }
  }, [isDragging])

  const handleRefresh = async () => {
    setLoading(true)
    try {
      console.log('Refreshing GitHub data...')

      // cache를 무시하고 다시 가져오기 (timestamp 추가)
      const response = await fetch(`${import.meta.env.BASE_URL}github-data.json?t=${Date.now()}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch github-data.json: ${response.status}`)
      }

      const data = await response.json()

      setUserData(data.user)
      setRepos(data.repos || [])
      setContributions(data.contributions[selectedYear] || [])

      console.log('✅ GitHub data refreshed')
      setLoading(false)
    } catch (error) {
      console.error('❌ 새로고침 실패:', error)
      setLoading(false)
    }
  }

  const handleMouseDownResize = (e, direction) => {
    if (isMaximized) return

    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      const currentSize = {
        width: rect.width,
        height: rect.height
      }
      setSize(currentSize)
      resizeStartSize.current = currentSize
    }

    setIsResizing(true)
    setResizeDirection(direction)
    resizeStartPos.current = { x: e.clientX, y: e.clientY }
    resizeStartWindowPos.current = { ...position }
    e.preventDefault()
    e.stopPropagation()
  }

  const handleMaximize = () => {
    if (isMaximized) {
      setSize(prevSize)
      setPosition(prevPosition)
      setIsMaximized(false)
    } else {
      setPrevSize(size)
      setPrevPosition(position)
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 28
      })
      setPosition({ x: 0, y: 28 })
      setIsMaximized(true)
    }
  }

  // Mobile UI
  if (isMobile) {
    return (
      <div className="github-mobile-container" style={{ zIndex }} onClick={onClick}>
        {/* Mobile Header */}
        <div className="mobile-github-header">
          <h2>GitHub</h2>
          <button className="mobile-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Mobile Content */}
        <div className="mobile-github-content">
          {loading ? (
            <div className="mobile-loading">데이터 로딩 중...</div>
          ) : !userData ? (
            <div className="mobile-error">
              GitHub 데이터를 불러올 수 없습니다.<br/>
              브라우저 콘솔을 확인해주세요.
            </div>
          ) : (
            <div className="mobile-github-profile">
              {/* Mobile Profile Header */}
              <div className="mobile-profile-header">
                <img src={userData.avatar_url} alt={userData.name} className="mobile-github-avatar" />
                <h1>{userData.name || userData.login}</h1>
                <p className="mobile-username">@{userData.login}</p>
                {userData.bio && <p className="mobile-bio">{userData.bio}</p>}
              </div>

              {/* Mobile Stats */}
              <div className="mobile-stats-container">
                <div className="mobile-stat-item">
                  <strong>{userData.public_repos}</strong>
                  <span>repositories</span>
                </div>
                <div className="mobile-stat-item">
                  <strong>{userData.followers}</strong>
                  <span>followers</span>
                </div>
                <div className="mobile-stat-item">
                  <strong>{userData.following}</strong>
                  <span>following</span>
                </div>
              </div>

              {/* Mobile Contributions */}
              <div className="mobile-contributions">
                <div className="mobile-contributions-header">
                  <h2>Contribution Graph</h2>
                  <div className="mobile-year-selector">
                    {(() => {
                      const currentYear = new Date().getFullYear()
                      const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
                      return years.map(year => (
                        <button
                          key={year}
                          className={`mobile-year-btn ${selectedYear === year ? 'active' : ''}`}
                          onClick={() => setSelectedYear(year)}
                        >
                          {year}
                        </button>
                      ))
                    })()}
                  </div>
                </div>
                <div className="mobile-github-calendar">
                  <GitHubCalendar
                    username="worhs02"
                    year={selectedYear}
                    showWeekdayLabels
                    theme={{
                      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                      dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
                    }}
                  />
                </div>
              </div>

              {/* Mobile Repositories */}
              <div className="mobile-repositories">
                <h2>My Projects</h2>
                <div className="mobile-repo-list">
                  {portfolioItems.map(project => (
                    <div
                      key={project.id}
                      className="mobile-repo-card"
                      onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <h3>{project.title}</h3>
                      <p className="mobile-repo-description">{project.skills?.slice(0, 3).join(', ') || 'No description'}</p>
                      <div className="mobile-repo-stats">
                        {project.skills?.[0] && <span className="mobile-language">● {project.skills[0]}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }

  // Desktop UI
  return (
    <div
      ref={windowRef}
      className={`github-window ${isDragging ? 'dragging' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        zIndex,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`
      }}
      onClick={onClick}
    >
      {/* 리사이즈 핸들 */}
      {!isMaximized && (
        <>
          <div className="resize-handle resize-n" onMouseDown={(e) => handleMouseDownResize(e, 'n')} />
          <div className="resize-handle resize-s" onMouseDown={(e) => handleMouseDownResize(e, 's')} />
          <div className="resize-handle resize-e" onMouseDown={(e) => handleMouseDownResize(e, 'e')} />
          <div className="resize-handle resize-w" onMouseDown={(e) => handleMouseDownResize(e, 'w')} />
          <div className="resize-handle resize-ne" onMouseDown={(e) => handleMouseDownResize(e, 'ne')} />
          <div className="resize-handle resize-nw" onMouseDown={(e) => handleMouseDownResize(e, 'nw')} />
          <div className="resize-handle resize-se" onMouseDown={(e) => handleMouseDownResize(e, 'se')} />
          <div className="resize-handle resize-sw" onMouseDown={(e) => handleMouseDownResize(e, 'sw')} />
        </>
      )}

      <div className="github-titlebar">
        <div className="github-controls">
          <span className="github-btn close" onClick={onClose}></span>
          <span className="github-btn minimize" onClick={onMinimize}></span>
          <span className="github-btn maximize" onClick={handleMaximize}></span>
        </div>
      </div>

      <div className="github-toolbar">
        <div className="github-nav-buttons">
          <button className="nav-btn" onClick={handleRefresh} title="새로고침">⟳</button>
        </div>
        <div className="github-url-bar">
          <input
            type="text"
            value="https://github.com/worhs02"
            readOnly
            className="url-input"
            placeholder="URL"
            onClick={() => window.open('https://github.com/worhs02', '_blank')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="github-content">
        {loading ? (
          <div className="loading">데이터 로딩 중...</div>
        ) : !userData ? (
          <div className="error">
            GitHub 데이터를 불러올 수 없습니다.<br/>
            브라우저 콘솔을 확인해주세요.
          </div>
        ) : (
          <div className="github-profile">
            {/* 프로필 헤더 */}
            <div className="profile-header">
              {/* 프로필 사진 */}
              <div className="avatar-container">
                <img src={userData.avatar_url} alt={userData.name} className="github-profile-avatar" />
              </div>

              {/* 이름/아이디 */}
              <div className="name-container">
                <h1>{userData.name || userData.login}</h1>
                <p className="username">@{userData.login}</p>
                {userData.bio && <p className="bio">{userData.bio}</p>}
              </div>

              {/* 레포지토리 정보 */}
              <div className="stats-container">
                <div className="stats">
                  <div className="stat-item">
                    <strong>{userData.public_repos}</strong>
                    <span>repositories</span>
                  </div>
                  <div className="stat-item">
                    <strong>{userData.followers}</strong>
                    <span>followers</span>
                  </div>
                  <div className="stat-item">
                    <strong>{userData.following}</strong>
                    <span>following</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 잔디 (Contribution Graph) */}
            <div className="contributions">
              <div className="contributions-header">
                <h2>Contribution Graph</h2>
                <div className="year-selector">
                  {(() => {
                    const currentYear = new Date().getFullYear()
                    const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
                    return years.map(year => (
                      <button
                        key={year}
                        className={`year-btn ${selectedYear === year ? 'active' : ''}`}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </button>
                    ))
                  })()}
                </div>
              </div>
              <div className="github-calendar-wrapper">
                <GitHubCalendar
                  username="worhs02"
                  year={selectedYear}
                  showWeekdayLabels
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
                  }}
                />
              </div>
            </div>

            {/* 최근 레포지토리 */}
            <div className="repositories">
              <h2>My Projects</h2>
              <div className="repo-grid">
                {portfolioItems.map(project => (
                  <div
                    key={project.id}
                    className="repo-card"
                    onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <h3>{project.title}</h3>
                    <p className="repo-description">{project.skills?.slice(0, 3).join(', ') || 'No description'}</p>
                    <div className="repo-stats">
                      {project.skills?.[0] && <span className="language">● {project.skills[0]}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default GitHub
