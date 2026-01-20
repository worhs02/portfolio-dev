import React, { useState, useEffect, useRef } from 'react'
import './SystemSettings.css'

function SystemSettings({ onClose, onClick, zIndex, onMinimize, deviceType = 'desktop' }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 820, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 820, height: 600 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartWindowPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)
  const isMobile = deviceType === 'mobile'
  const isTablet = deviceType === 'tablet'

  const [selectedMenu, setSelectedMenu] = useState('about')

  const profileInfo = {
    name: 'Song Jaegon',
    nameKr: '송재곤',
    role: 'Backend Developer',
    education: '가천대학교 인공지능학과',
    email: 'setiguy@gachon.ac.kr',
    github: 'github.com/worhs02',
    location: 'Seoul, South Korea'
  }

  const careerHistory = [
    { period: '2022.03 ~ 현재', title: '가천대학교 인공지능 전공' },
    { period: '2023.02 ~ 2023.08', title: '연합 레저스포츠 동아리 UNIT 팀장' },
    { period: '2024.09 ~ 2025.02', title: '학술동아리 A.ing' },
    { period: '2025.02 ~ 2025.08', title: 'UMC 가천대 부회장' }
  ]

  const skills = ['Java', 'Spring Boot', 'MySQL', 'iOS', 'UIKit', 'AWS', 'Docker']

  // 윈도우 초기 위치 설정
  useEffect(() => {
    let windowWidth, windowHeight

    if (isTablet) {
      const aspectRatio = 820 / 600
      windowWidth = 820 * 0.85
      windowHeight = 600 * 0.85

      if (windowWidth > window.innerWidth * 0.9) {
        windowWidth = window.innerWidth * 0.9
        windowHeight = windowWidth / aspectRatio
      }
    } else {
      windowWidth = 820
      windowHeight = 600
    }

    setSize({ width: windowWidth, height: windowHeight })
    setPrevSize({ width: windowWidth, height: windowHeight })
    const centerX = (window.innerWidth - windowWidth) / 2
    const centerY = (window.innerHeight - windowHeight) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [isTablet])

  // 타이틀바 드래그
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.settings-titlebar')
    if (!titlebar) return

    const handleMouseDown = (e) => {
      if (e.target.closest('.settings-btn')) return
      if (isMaximized) return
      setIsDragging(true)
      dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    }

    titlebar.addEventListener('mousedown', handleMouseDown)
    return () => {
      titlebar.removeEventListener('mousedown', handleMouseDown)
    }
  }, [position, isMaximized])

  // 마우스 이동 및 리사이즈 처리
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
          newWidth = Math.max(600, resizeStartSize.current.width + deltaX)
        }
        if (resizeDirection.includes('w')) {
          const potentialWidth = resizeStartSize.current.width - deltaX
          if (potentialWidth >= 600) {
            newWidth = potentialWidth
            newX = resizeStartWindowPos.current.x + deltaX
          }
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(400, resizeStartSize.current.height + deltaY)
        }
        if (resizeDirection.includes('n')) {
          const potentialHeight = resizeStartSize.current.height - deltaY
          if (potentialHeight >= 400) {
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

  // 리사이즈 시작
  const handleMouseDownResize = (e, direction) => {
    if (isMaximized) return
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      const currentSize = { width: rect.width, height: rect.height }
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
    } else {
      setPrevSize(size)
      setPrevPosition(position)
      setSize({ width: window.innerWidth, height: window.innerHeight - 25 })
      setPosition({ x: 0, y: 25 })
    }
    setIsMaximized(!isMaximized)
  }

  const menuItems = [
    { id: 'about', label: '이 Mac에 관하여', icon: 'about' },
    { id: 'divider1', type: 'divider', label: '기능 설명' },
    { id: 'desktop', label: '데스크톱', icon: 'desktop' },
    { id: 'wallpaper', label: '배경화면', icon: 'wallpaper' },
    { id: 'menubar', label: '메뉴바', icon: 'menubar' },
    { id: 'dock', label: 'Dock', icon: 'dock' },
    { id: 'divider2', type: 'divider', label: '앱 설명' },
    { id: 'portfolio', label: 'Portfolio 앱', icon: 'portfolio' },
    { id: 'techstack', label: 'TechStack 앱', icon: 'techstack' },
    { id: 'github', label: 'GitHub 앱', icon: 'github' },
    { id: 'mail', label: 'Mail 앱', icon: 'mail' },
  ]

  const renderMenuIcon = (iconType) => {
    const size = 32
    switch (iconType) {
      case 'about':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#64d2ff', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#007AFF', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#aboutGradient)"/>
            <text x="50" y="68" fontSize="50" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic">i</text>
          </svg>
        )
      case 'desktop':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="desktopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#5856d6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#3634a3', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#desktopGradient)"/>
            <rect x="22" y="25" width="56" height="38" rx="3" fill="white"/>
            <rect x="40" y="67" width="20" height="4" fill="white"/>
            <rect x="32" y="71" width="36" height="4" rx="1" fill="white"/>
          </svg>
        )
      case 'wallpaper':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="wallpaperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff9500', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff6b00', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#wallpaperGradient)"/>
            <circle cx="38" cy="38" r="10" fill="white"/>
            <path d="M20 70 L40 50 L55 62 L70 45 L80 55 L80 80 L20 80 Z" fill="white" opacity="0.9"/>
          </svg>
        )
      case 'menubar':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="menubarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#34c759', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#248a3d', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#menubarGradient)"/>
            <rect x="20" y="28" width="60" height="8" rx="2" fill="white"/>
            <rect x="20" y="46" width="60" height="8" rx="2" fill="white"/>
            <rect x="20" y="64" width="60" height="8" rx="2" fill="white"/>
          </svg>
        )
      case 'dock':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="dockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#007aff', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0055d4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#dockGradient)"/>
            <rect x="18" y="65" width="64" height="12" rx="3" fill="white" opacity="0.9"/>
            <rect x="24" y="68" width="10" height="6" rx="1" fill="#007aff"/>
            <rect x="38" y="68" width="10" height="6" rx="1" fill="#007aff"/>
            <rect x="52" y="68" width="10" height="6" rx="1" fill="#007aff"/>
            <rect x="66" y="68" width="10" height="6" rx="1" fill="#007aff"/>
          </svg>
        )
      case 'portfolio':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="folderGradientSettings" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#7CB9E8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5A9FD4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M 15 25 L 15 22 Q 15 18 19 18 L 35 18 Q 37 18 38 20 L 42 25 Z" fill="url(#folderGradientSettings)" stroke="#4A8FB8" strokeWidth="1"/>
            <rect x="15" y="25" width="70" height="55" rx="6" fill="url(#folderGradientSettings)" stroke="#4A8FB8" strokeWidth="1.5"/>
            <rect x="17" y="27" width="66" height="3" rx="2" fill="rgba(255,255,255,0.3)"/>
          </svg>
        )
      case 'techstack':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <g transform="rotate(-3 50 50)">
              <rect x="30" y="8" width="40" height="10" rx="2" fill="rgba(180,180,180,0.7)" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
              <rect x="15" y="15" width="70" height="70" rx="6" fill="#FFFACD" stroke="#000" strokeWidth="3"/>
            </g>
          </svg>
        )
      case 'github':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="#24292e"/>
            <path d="M50,30c-11,0-20,9-20,20c0,8.8,5.7,16.3,13.7,19c1,0.2,1.4-0.4,1.4-1c0-0.5,0-1.7,0-3.4c-5.6,1.2-6.8-2.7-6.8-2.7 c-0.9-2.3-2.2-2.9-2.2-2.9c-1.8-1.2,0.1-1.2,0.1-1.2c2,0.1,3.1,2.1,3.1,2.1c1.8,3.1,4.7,2.2,5.8,1.7c0.2-1.3,0.7-2.2,1.3-2.7 c-4.5-0.5-9.2-2.2-9.2-9.9c0-2.2,0.8-4,2.1-5.4c-0.2-0.5-0.9-2.6,0.2-5.3c0,0,1.7-0.5,5.5,2.1c1.6-0.4,3.3-0.7,5-0.7 c1.7,0,3.4,0.2,5,0.7c3.8-2.6,5.5-2.1,5.5-2.1c1.1,2.8,0.4,4.8,0.2,5.3c1.3,1.4,2.1,3.2,2.1,5.4c0,7.7-4.7,9.4-9.2,9.9 c0.7,0.6,1.4,1.8,1.4,3.7c0,2.7,0,4.8,0,5.5c0,0.5,0.4,1.2,1.4,1c8-2.7,13.7-10.2,13.7-19C70,39,61,30,50,30z" fill="white"/>
          </svg>
        )
      case 'mail':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <defs>
              <linearGradient id="mailGradientSettings" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#5AC8FA', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#007AFF', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#mailGradientSettings)"/>
            <g transform="translate(50, 50)">
              <rect x="-22" y="-14" width="44" height="28" rx="2" fill="white"/>
              <path d="M -22 -14 L 0 2 L 22 -14" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M -22 14 L -6 0" fill="none" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M 22 14 L 6 0" fill="none" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  // Mobile UI
  if (isMobile) {
    return (
      <div className="settings-mobile-container" style={{ zIndex }} onClick={onClick}>
        <div className="mobile-settings-header">
          <h2>설정</h2>
          <button className="mobile-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="mobile-settings-content">
          <div className="mobile-about-section">
            <div className="mobile-profile-card">
              <img src={`${import.meta.env.BASE_URL}profile.png`} alt="Profile" className="mobile-settings-avatar" />
              <div className="mobile-profile-info">
                <h1>{profileInfo.name}</h1>
                <p className="mobile-role">{profileInfo.role}</p>
              </div>
            </div>

            <div className="mobile-info-group">
              <h3>기본 정보</h3>
              <div className="mobile-info-item">
                <span className="mobile-info-label">이름</span>
                <span className="mobile-info-value">{profileInfo.nameKr}</span>
              </div>
              <div className="mobile-info-item">
                <span className="mobile-info-label">학교</span>
                <span className="mobile-info-value">{profileInfo.education}</span>
              </div>
              <div className="mobile-info-item">
                <span className="mobile-info-label">이메일</span>
                <span className="mobile-info-value">{profileInfo.email}</span>
              </div>
              <div className="mobile-info-item">
                <span className="mobile-info-label">GitHub</span>
                <span className="mobile-info-value">{profileInfo.github}</span>
              </div>
            </div>

            <div className="mobile-info-group">
              <h3>학력 및 경력</h3>
              {careerHistory.map((item, index) => (
                <div key={index} className="mobile-career-item">
                  <span className="mobile-career-period">{item.period}</span>
                  <span className="mobile-career-title">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="mobile-info-group">
              <h3>기술 스택</h3>
              <div className="mobile-skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="mobile-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={windowRef}
      className={`settings-window ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex
      }}
      onClick={onClick}
    >
      <div className="settings-titlebar">
        <div className="settings-buttons">
          <button className="settings-btn close" onClick={onClose}></button>
          <button className="settings-btn minimize" onClick={onMinimize}></button>
          <button className="settings-btn maximize" onClick={handleMaximize}></button>
        </div>
        <div className="settings-title">설정</div>
        <div className="settings-buttons-spacer"></div>
      </div>

      <div className="settings-body">
        <div className="settings-sidebar">
          <div className="settings-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="검색" readOnly />
          </div>
          <div className="settings-menu">
            {menuItems.map((item) => {
              if (item.type === 'divider') {
                return (
                  <div key={item.id} className="menu-divider">
                    <span>{item.label}</span>
                  </div>
                )
              }
              return (
                <div
                  key={item.id}
                  className={`settings-menu-item ${selectedMenu === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedMenu(item.id)}
                >
                  {item.icon && <div className="menu-icon">{renderMenuIcon(item.icon)}</div>}
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="settings-content">
          {selectedMenu === 'about' && (
            <div className="about-content">
              <div className="about-header">
                <img src={`${import.meta.env.BASE_URL}profile.png`} alt="Profile" className="about-avatar" />
                <div className="about-title">
                  <h1>{profileInfo.name}</h1>
                  <p className="about-subtitle">{profileInfo.role}</p>
                </div>
              </div>

              <div className="about-details">
                <div className="detail-row">
                  <span className="detail-label">이름</span>
                  <span className="detail-value">{profileInfo.nameKr} ({profileInfo.name})</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">학교</span>
                  <span className="detail-value">{profileInfo.education}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">이메일</span>
                  <span className="detail-value">{profileInfo.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">GitHub</span>
                  <span className="detail-value clickable" onClick={() => window.open('https://github.com/worhs02', '_blank')}>
                    {profileInfo.github}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">위치</span>
                  <span className="detail-value">{profileInfo.location}</span>
                </div>
              </div>

              <div className="about-section">
                <h3>학력 및 경력</h3>
                <div className="career-list">
                  {careerHistory.map((item, index) => (
                    <div key={index} className="career-item">
                      <span className="career-period">{item.period}</span>
                      <span className="career-title">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-section">
                <h3>기술 스택</h3>
                <div className="skills-tags">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'desktop' && (
            <div className="guide-content">
              <h2>데스크톱</h2>
              <p className="guide-intro">macOS 스타일의 인터랙티브한 데스크톱 환경입니다.</p>

              <div className="guide-section">
                <h3>주요 기능</h3>
                <div className="guide-item">
                  <div className="guide-item-title">창 시스템</div>
                  <div className="guide-item-desc">모든 앱은 드래그로 이동 가능한 창으로 열립니다. 타이틀바를 드래그하여 위치를 조정하고, 모서리를 드래그하여 크기를 조절할 수 있습니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">창 컨트롤 버튼</div>
                  <div className="guide-item-desc">
                    <span className="dot red"></span> 빨간색: 창 닫기<br/>
                    <span className="dot yellow"></span> 노란색: 창 최소화 (Dock으로)<br/>
                    <span className="dot green"></span> 초록색: 창 최대화/복원
                  </div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">반응형 디자인</div>
                  <div className="guide-item-desc">데스크톱, 태블릿, 모바일 환경에 맞게 UI가 자동으로 조정됩니다. 모바일에서는 전체 화면 앱 뷰로 전환됩니다.</div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'wallpaper' && (
            <div className="guide-content">
              <h2>배경화면</h2>
              <p className="guide-intro">시간대에 따라 자동으로 변경되는 동적 배경화면 시스템입니다.</p>

              <div className="guide-section">
                <h3>시간대별 배경</h3>
                <div className="guide-item">
                  <div className="guide-item-title">일출 (06:00 - 07:00)</div>
                  <div className="guide-item-desc">따뜻한 노을빛 배경으로 하루의 시작을 표현합니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">낮 (07:00 - 17:00)</div>
                  <div className="guide-item-desc">밝고 선명한 주간 배경이 표시됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">일몰 (17:00 - 19:00)</div>
                  <div className="guide-item-desc">노을빛 배경으로 저녁 분위기를 연출합니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">밤 (19:00 - 06:00)</div>
                  <div className="guide-item-desc">어두운 야간 배경으로 전환됩니다.</div>
                </div>
              </div>

              <div className="guide-section">
                <h3>기술 구현</h3>
                <div className="guide-item">
                  <div className="guide-item-desc">JavaScript Date 객체로 현재 시간을 확인하고, 1분마다 시간대를 체크하여 배경 이미지를 동적으로 교체합니다.</div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'menubar' && (
            <div className="guide-content">
              <h2>메뉴바</h2>
              <p className="guide-intro">macOS 스타일의 상단 메뉴바입니다.</p>

              <div className="guide-section">
                <h3>구성 요소</h3>
                <div className="guide-item">
                  <div className="guide-item-title">Apple 메뉴</div>
                  <div className="guide-item-desc">클릭하면 드롭다운 메뉴가 표시됩니다. "이 Mac에 관하여"를 선택하면 설정 앱이 열립니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">실시간 시계</div>
                  <div className="guide-item-desc">현재 시간이 표시되며, 1분마다 자동으로 업데이트됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">상태 아이콘</div>
                  <div className="guide-item-desc">Wi-Fi, 배터리, 검색 등의 시스템 상태 아이콘이 표시됩니다.</div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'dock' && (
            <div className="guide-content">
              <h2>Dock</h2>
              <p className="guide-intro">macOS 스타일의 앱 런처 Dock입니다.</p>

              <div className="guide-section">
                <h3>기능</h3>
                <div className="guide-item">
                  <div className="guide-item-title">앱 실행</div>
                  <div className="guide-item-desc">Dock의 아이콘을 클릭하면 해당 앱이 실행됩니다. 이미 열려있는 앱은 아이콘 아래에 점으로 표시됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">호버 효과</div>
                  <div className="guide-item-desc">마우스를 올리면 아이콘이 확대되는 macOS 특유의 Magnification 효과가 적용됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">최소화된 창 복원</div>
                  <div className="guide-item-desc">최소화된 앱의 Dock 아이콘을 클릭하면 창이 복원됩니다.</div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'portfolio' && (
            <div className="guide-content">
              <h2>Portfolio 앱</h2>
              <p className="guide-intro">Finder 스타일의 프로젝트 탐색기입니다.</p>

              <div className="guide-section">
                <h3>UI 구성</h3>
                <div className="guide-item">
                  <div className="guide-item-title">사이드바</div>
                  <div className="guide-item-desc">프로젝트 목록이 폴더 형태로 표시됩니다. 폴더를 클릭하면 하위 파일들이 펼쳐집니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">파일 구조</div>
                  <div className="guide-item-desc">각 프로젝트는 README.md, TROUBLESHOOTING.md, CONTRIBUTION.md, RETROSPECTIVE.md 등의 파일로 구성됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">수상 표시</div>
                  <div className="guide-item-desc">수상 이력이 있는 프로젝트는 awards 폴더가 추가로 표시되며, 증명서 링크가 포함됩니다.</div>
                </div>
              </div>

              <div className="guide-section">
                <h3>콘텐츠 렌더링</h3>
                <div className="guide-item">
                  <div className="guide-item-title">Markdown 지원</div>
                  <div className="guide-item-desc">README 등의 파일은 Markdown 형식으로 작성되어 있으며, ReactMarkdown을 통해 렌더링됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">이미지 확대</div>
                  <div className="guide-item-desc">긴 이미지(세로 비율 1:3 이상)는 클릭하여 전체 보기가 가능합니다.</div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'techstack' && (
            <div className="guide-content">
              <h2>TechStack 앱</h2>
              <p className="guide-intro">기술 스택을 시각적으로 보여주는 앱입니다.</p>

              <div className="guide-section">
                <h3>UI 구성</h3>
                <div className="guide-item">
                  <div className="guide-item-title">스플래시 화면</div>
                  <div className="guide-item-desc">앱 실행 시 로딩 애니메이션과 함께 스플래시 화면이 표시됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">스킬 그리드</div>
                  <div className="guide-item-desc">기술 스택이 카드 형태로 그리드에 배치됩니다. 카드를 클릭하면 상세 정보가 표시됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">숙련도 메모</div>
                  <div className="guide-item-desc">포스트잇 스타일의 메모로 숙련도 레벨과 퍼센트를 표시합니다.</div>
                </div>
              </div>

              <div className="guide-section">
                <h3>숙련도 기준</h3>
                <div className="guide-item">
                  <div className="guide-item-desc">
                    프로젝트 경험 횟수를 기준으로 숙련도가 결정됩니다:<br/>
                    - 프로젝트 1회: Beginner<br/>
                    - 프로젝트 2회: Intermediate<br/>
                    - 프로젝트 3회 이상: Advanced
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'github' && (
            <div className="guide-content">
              <h2>GitHub 앱</h2>
              <p className="guide-intro">GitHub 프로필과 기여도를 표시하는 앱입니다.</p>

              <div className="guide-section">
                <h3>주요 기능</h3>
                <div className="guide-item">
                  <div className="guide-item-title">프로필 정보</div>
                  <div className="guide-item-desc">GitHub API를 통해 가져온 프로필 정보(이름, 바이오, 팔로워 등)를 표시합니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">기여도 잔디</div>
                  <div className="guide-item-desc">GitHub의 기여도 그래프(잔디)를 시각화하여 표시합니다. 날짜별 커밋 수에 따라 색상 농도가 달라집니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">Contribute 배터리</div>
                  <div className="guide-item-desc">데스크톱 상단의 배터리 아이콘은 오늘의 GitHub 기여도를 나타냅니다. 기여 횟수에 따라 배터리 레벨이 변경됩니다.</div>
                </div>
              </div>

              <div className="guide-section">
                <h3>데이터 수집</h3>
                <div className="guide-item">
                  <div className="guide-item-title">GitHub Actions</div>
                  <div className="guide-item-desc">30분마다 GitHub Actions가 실행되어 기여도 데이터를 JSON 파일로 저장합니다. 이를 통해 API rate limit 문제를 해결했습니다.</div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'mail' && (
            <div className="guide-content">
              <h2>Mail 앱</h2>
              <p className="guide-intro">방문자가 메시지를 보낼 수 있는 메일 앱입니다.</p>

              <div className="guide-section">
                <h3>기능</h3>
                <div className="guide-item">
                  <div className="guide-item-title">받은 편지함</div>
                  <div className="guide-item-desc">샘플 메시지들이 표시되며, 클릭하면 내용을 확인할 수 있습니다. 읽지 않은 메시지는 파란색 점으로 표시됩니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">메시지 작성</div>
                  <div className="guide-item-desc">"메시지 작성" 버튼을 클릭하면 연락처 폼이 표시됩니다. 이름, 이메일, 제목, 내용을 입력하고 전송할 수 있습니다.</div>
                </div>
                <div className="guide-item">
                  <div className="guide-item-title">실제 메일 전송</div>
                  <div className="guide-item-desc">EmailJS를 통해 실제로 메일이 전송됩니다. 전송 성공 시 확인 메시지가 표시됩니다.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resize handles */}
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
    </div>
  )
}

export default SystemSettings
