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
  const [activeWindow, setActiveWindow] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [minimizedWindows, setMinimizedWindows] = useState({
    projects: false,
    techStack: false
  })

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
    if (activeWindow === windowName) {
      setActiveWindow(null)
    }
  }

  const bringToFront = (windowName, event) => {
    if (event) {
      event.stopPropagation()
    }
    const newZIndex = maxZIndex + 1
    setWindowZIndex(prev => ({
      ...prev,
      [windowName]: newZIndex
    }))
    setMaxZIndex(newZIndex)
    setActiveWindow(windowName)
  }

  const handleMinimize = (windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: true
    }))
    if (activeWindow === windowName) {
      setActiveWindow(null)
    }
  }

  const handleRestore = (windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: false
    }))
    bringToFront(windowName)
  }

  const getMenuItems = () => {
    switch(activeWindow) {
      case 'projects':
        return {
          title: 'Projects',
          menus: {
            '파일': ['새 프로젝트', '열기...', null, '닫기', '저장'],
            '편집': ['실행 취소', '다시 실행', null, '잘라내기', '복사', '붙여넣기'],
            '보기': ['아이콘', '목록', '열', null, '정렬 기준...'],
            '정렬': ['이름', '종류', '날짜', '크기'],
            '도움말': ['Projects 도움말', '키보드 단축키']
          }
        }
      case 'techStack':
        return {
          title: 'Tech Stack',
          menus: {
            '파일': ['새 윈도우', '닫기', null, '저장'],
            '편집': ['실행 취소', '다시 실행', null, '복사', '붙여넣기'],
            '보기': ['실제 크기', '확대', '축소'],
            '윈도우': ['최소화', '확대/축소', null, '모든 윈도우 보기'],
            '도움말': ['Tech Stack 도움말']
          }
        }
      default:
        return {
          title: 'Finder',
          menus: {
            '파일': ['새 Finder 윈도우', '새 폴더', null, '열기', '닫기'],
            '편집': ['실행 취소', '다시 실행', null, '잘라내기', '복사', '붙여넣기', '모두 선택'],
            '보기': ['아이콘', '목록', '열', '갤러리', null, '정렬 기준...'],
            '이동': ['뒤로', '앞으로', null, '데스크탑', '문서', '다운로드'],
            '윈도우': ['최소화', '확대/축소', null, 'Finder 앞으로 가져오기']
          }
        }
    }
  }

  const menuData = getMenuItems()

  const handleBatteryClick = () => {
    const batteryLevel = Math.floor(Math.random() * 100)
    alert(`배터리 잔량: ${batteryLevel}%\n전원 어댑터: ${batteryLevel < 50 ? '연결됨' : '연결 안됨'}`)
  }

  const handleWifiClick = () => {
    const networks = ['My WiFi', 'Guest Network', 'Office WiFi', 'iPhone']
    const connected = networks[0]
    alert(`현재 연결: ${connected}\n\n사용 가능한 네트워크:\n${networks.map(n => n === connected ? `✓ ${n}` : `  ${n}`).join('\n')}`)
  }

  const handleSpotlightClick = () => {
    const searchTerm = prompt('Spotlight 검색:', '')
    if (searchTerm) {
      alert(`"${searchTerm}" 검색 결과:\n\n• Projects 폴더\n• Tech Stack 메모\n• ${searchTerm}.txt`)
    }
  }

  const handleMenuAction = (menuName, action) => {
    setOpenMenu(null)

    switch(action) {
      // 파일 메뉴
      case '새 Finder 윈도우':
      case '새 윈도우':
        // 이미 열려있으면 무시
        break
      case '새 프로젝트':
        handleDoubleClick('projects')
        break
      case '열기':
      case '열기...':
        if (activeWindow) {
          handleDoubleClick(activeWindow)
        }
        break
      case '닫기':
        if (activeWindow) {
          handleCloseWindow(activeWindow)
        }
        break
      case '저장':
        alert('저장되었습니다')
        break

      // 편집 메뉴
      case '실행 취소':
        alert('실행 취소')
        break
      case '다시 실행':
        alert('다시 실행')
        break
      case '잘라내기':
        document.execCommand('cut')
        break
      case '복사':
        document.execCommand('copy')
        break
      case '붙여넣기':
        document.execCommand('paste')
        break
      case '모두 선택':
        document.execCommand('selectAll')
        break

      // 보기 메뉴
      case '아이콘':
      case '목록':
      case '열':
      case '갤러리':
        alert(`${action} 보기로 변경`)
        break
      case '실제 크기':
      case '확대':
      case '축소':
        alert(`${action}`)
        break

      // 이동 메뉴
      case '뒤로':
      case '앞으로':
        alert(`${action}`)
        break
      case '데스크탑':
        setActiveWindow(null)
        Object.keys(openWindows).forEach(key => {
          if (openWindows[key]) handleCloseWindow(key)
        })
        break
      case '문서':
      case '다운로드':
        alert(`${action}로 이동`)
        break

      // 윈도우 메뉴
      case '최소화':
        if (activeWindow) {
          handleMinimize(activeWindow)
        }
        break
      case '확대/축소':
        if (activeWindow) {
          alert('확대/축소 토글')
        }
        break
      case 'Finder 앞으로 가져오기':
      case '모든 윈도우 보기':
        alert(action)
        break

      // 정렬 메뉴
      case '이름':
      case '종류':
      case '날짜':
      case '크기':
        alert(`${action}순으로 정렬`)
        break

      // 도움말 메뉴
      case 'Projects 도움말':
      case 'Tech Stack 도움말':
      case 'Finder 도움말':
        alert(`${menuData.title} 도움말을 표시합니다`)
        break
      case '키보드 단축키':
        alert('키보드 단축키:\n⌘N - 새 윈도우\n⌘W - 닫기\n⌘C - 복사\n⌘V - 붙여넣기')
        break

      default:
        console.log(`메뉴 동작: ${menuName} > ${action}`)
    }
  }

  return (
    <div className="desktop">
      <div className="desktop-background" onClick={() => {
        setActiveWindow(null)
        setOpenMenu(null)
      }}>
        {/* macOS Menu Bar */}
        <div className="macos-menubar" onClick={(e) => e.stopPropagation()}>
          <div className="menubar-left">
            <span className="apple-logo"></span>
            <span className="menu-item menu-title">{menuData.title}</span>
            {Object.keys(menuData.menus).map((menuName, index) => (
              <div key={index} className="menu-item-wrapper">
                <span
                  className={`menu-item ${openMenu === menuName ? 'active' : ''}`}
                  onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)}
                >
                  {menuName}
                </span>
                {openMenu === menuName && (
                  <div className="menu-dropdown">
                    {menuData.menus[menuName].map((item, idx) => (
                      item === null ? (
                        <div key={idx} className="menu-divider"></div>
                      ) : (
                        <div
                          key={idx}
                          className="menu-dropdown-item"
                          onClick={() => handleMenuAction(menuName, item)}
                        >
                          {item}
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="menubar-right">
            <span className="menu-icon" onClick={handleBatteryClick} title="배터리">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="5" width="11" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="1"/>
                <rect x="12" y="7" width="2" height="2" fill="currentColor"/>
                <rect x="3" y="7" width="3" height="2" fill="currentColor"/>
              </svg>
            </span>
            <span className="menu-icon" onClick={handleWifiClick} title="Wi-Fi">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 11 L8 2 L14 11 L11 11 L11 14 L5 14 L5 11 Z" stroke="currentColor" fill="none" strokeWidth="1"/>
                <path d="M4 11 C4 11 4 9 8 9 C12 9 12 11 12 11"/>
              </svg>
            </span>
            <span className="menu-icon" onClick={handleSpotlightClick} title="Spotlight 검색">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="6" cy="6" r="4" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                <line x1="9" y1="9" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="menu-time">{new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
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
        {openWindows.projects && !minimizedWindows.projects && (
          <Portfolio
            onClose={() => handleCloseWindow('projects')}
            isWindow={true}
            onClick={(e) => bringToFront('projects', e)}
            zIndex={windowZIndex.projects}
          />
        )}

        {openWindows.techStack && !minimizedWindows.techStack && (
          <TechStack
            onClose={() => handleCloseWindow('techStack')}
            onClick={(e) => bringToFront('techStack', e)}
            zIndex={windowZIndex.techStack}
          />
        )}

        {/* Dock */}
        <div className="dock">
          <div
            className={`dock-item ${openWindows.projects ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.projects) {
                handleRestore('projects')
              } else {
                handleDoubleClick('projects')
              }
            }}
          >
            <div className="dock-folder-icon">📁</div>
            {openWindows.projects && <div className="dock-indicator"></div>}
          </div>
          <div
            className={`dock-item ${openWindows.techStack ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.techStack) {
                handleRestore('techStack')
              } else {
                handleDoubleClick('techStack')
              }
            }}
          >
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
