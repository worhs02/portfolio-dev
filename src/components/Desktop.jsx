import React, { useState } from 'react'
import './Desktop.css'
import Portfolio from './Portfolio'
import TechStack from './TechStack'
import Velog from './Velog'
import GitHub from './GitHub'
import Modal from './Modal'
import { portfolioItems } from '../data/portfolioData'

function Desktop({ onLogout }) {
  const [openWindows, setOpenWindows] = useState({
    projects: false,
    techStack: false,
    velog: false,
    github: false
  })

  const [windowZIndex, setWindowZIndex] = useState({
    projects: 100,
    techStack: 100,
    velog: 100,
    github: 100
  })

  const [maxZIndex, setMaxZIndex] = useState(100)
  const [activeWindow, setActiveWindow] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [minimizedWindows, setMinimizedWindows] = useState({
    projects: false,
    techStack: false,
    velog: false,
    github: false
  })
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    content: null,
    width: 400
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
      case 'velog':
        return {
          title: 'Velog',
          menus: {
            '파일': ['새로고침', '닫기'],
            '편집': ['복사', '붙여넣기'],
            '보기': ['실제 크기', '확대', '축소'],
            '윈도우': ['최소화', '확대/축소'],
            '도움말': ['Velog 도움말']
          }
        }
      case 'github':
        return {
          title: 'GitHub',
          menus: {
            '파일': ['새로고침', '닫기'],
            '편집': ['복사', '붙여넣기'],
            '보기': ['실제 크기', '확대', '축소'],
            '윈도우': ['최소화', '확대/축소'],
            '도움말': ['GitHub 도움말']
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
    const isCharging = batteryLevel < 50
    setModal({
      isOpen: true,
      title: '배터리',
      width: 350,
      content: (
        <div>
          <h2>배터리 정보</h2>
          <p><strong>잔량:</strong> {batteryLevel}%</p>
          <p><strong>상태:</strong> {isCharging ? '충전 중' : '배터리 사용 중'}</p>
          <p><strong>전원:</strong> {isCharging ? '전원 어댑터 연결됨' : '연결 안됨'}</p>
          <div style={{ marginTop: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '6px' }}>
            <div style={{ background: batteryLevel > 20 ? '#28CA42' : '#FF5F57', height: '8px', borderRadius: '4px', width: `${batteryLevel}%` }}></div>
          </div>
        </div>
      )
    })
  }

  const handleWifiClick = () => {
    const networks = ['My WiFi', 'Guest Network', 'Office WiFi', 'iPhone']
    const connected = networks[0]
    setModal({
      isOpen: true,
      title: 'Wi-Fi',
      width: 350,
      content: (
        <div>
          <h2>Wi-Fi 네트워크</h2>
          <p style={{ marginBottom: '12px' }}><strong>현재 연결:</strong> {connected}</p>
          <ul className="modal-list">
            {networks.map((network, idx) => (
              <li key={idx} className={network === connected ? 'active' : ''}>
                {network === connected ? '✓ ' : ''}{network}
              </li>
            ))}
          </ul>
        </div>
      )
    })
  }

  const handleSpotlightClick = () => {
    setModal({
      isOpen: true,
      title: 'Spotlight 검색',
      width: 600,
      content: (
        <div>
          <input
            type="text"
            className="modal-input"
            placeholder="검색어를 입력하세요..."
            autoFocus
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase()
              if (!searchTerm) {
                setModal(prev => ({
                  ...prev,
                  content: (
                    <div>
                      <input
                        type="text"
                        className="modal-input"
                        placeholder="검색어를 입력하세요..."
                        autoFocus
                        onChange={(e) => handleSpotlightClick()}
                      />
                      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                        검색어를 입력하세요
                      </p>
                    </div>
                  )
                }))
                return
              }

              // 앱 검색
              const apps = [
                { name: 'Projects', icon: '📁', action: () => handleDoubleClick('projects') },
                { name: 'Tech Stack', icon: '💻', action: () => handleDoubleClick('techStack') },
                { name: 'Velog', icon: '📝', action: () => handleDoubleClick('velog') },
                { name: 'GitHub', icon: '🐙', action: () => handleDoubleClick('github') }
              ].filter(app => app.name.toLowerCase().includes(searchTerm))

              // 포트폴리오 프로젝트 검색
              const projects = portfolioItems.filter(item =>
                item.title?.toLowerCase().includes(searchTerm) ||
                item.overview?.toLowerCase().includes(searchTerm) ||
                item.skills?.some(skill => skill.toLowerCase().includes(searchTerm))
              )

              setModal(prev => ({
                ...prev,
                content: (
                  <div>
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="검색어를 입력하세요..."
                      defaultValue={e.target.value}
                      autoFocus
                      onChange={(e) => handleSpotlightClick()}
                    />

                    {apps.length === 0 && projects.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                        "{e.target.value}" 검색 결과가 없습니다
                      </p>
                    ) : (
                      <>
                        {apps.length > 0 && (
                          <>
                            <h3 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                              애플리케이션
                            </h3>
                            <ul className="modal-list">
                              {apps.map((app, idx) => (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    app.action()
                                    setModal({ isOpen: false, title: '', content: null })
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {app.icon} {app.name}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {projects.length > 0 && (
                          <>
                            <h3 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                              프로젝트
                            </h3>
                            <ul className="modal-list">
                              {projects.map((project, idx) => (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    handleDoubleClick('projects')
                                    setModal({ isOpen: false, title: '', content: null })
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {project.emoji} {project.title}
                                  <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                                    {project.overview?.substring(0, 60)}...
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )
              }))
            }}
          />
        </div>
      )
    })
  }

  const handleAppleMenuAction = (action) => {
    setOpenMenu(null)

    switch(action) {
      case '이 Mac에 관하여':
        setModal({
          isOpen: true,
          title: '이 Mac에 관하여',
          width: 400,
          content: (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Portfolio OS</h2>
              <p style={{ fontSize: '14px', color: '#888', margin: '0 0 20px 0' }}>버전 1.0.0</p>
              <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ margin: '4px 0' }}><strong>제작:</strong> Your Name</p>
                <p style={{ margin: '4px 0' }}><strong>기술:</strong> React + Vite</p>
                <p style={{ margin: '4px 0' }}><strong>디자인:</strong> macOS Inspired</p>
              </div>
            </div>
          )
        })
        break
      case '시스템 설정...':
      case 'App Store...':
        setModal({
          isOpen: true,
          title: action.replace('...', ''),
          width: 350,
          content: (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>이 기능은 현재 사용할 수 없습니다.</p>
            </div>
          )
        })
        break
      case '강제 종료...':
        const openWindowsList = Object.entries(openWindows)
          .filter(([_, isOpen]) => isOpen)
          .map(([name, _]) => name === 'projects' ? 'Projects' : 'Tech Stack')
        setModal({
          isOpen: true,
          title: '강제 종료',
          width: 400,
          content: openWindowsList.length > 0 ? (
            <div>
              <h2>실행 중인 앱</h2>
              <ul className="modal-list">
                {openWindowsList.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>실행 중인 앱이 없습니다.</p>
            </div>
          )
        })
        break
      case '잠자기':
        setModal({
          isOpen: true,
          title: '잠자기',
          width: 350,
          content: (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>시스템을 잠자기 모드로 전환합니다.</p>
            </div>
          )
        })
        break
      case '다시 시작...':
        setModal({
          isOpen: true,
          title: '다시 시작',
          width: 400,
          content: (
            <div>
              <p>컴퓨터를 다시 시작하시겠습니까?</p>
              <div className="modal-buttons">
                <button className="modal-button secondary" onClick={() => setModal({ ...modal, isOpen: false })}>
                  취소
                </button>
                <button className="modal-button primary" onClick={() => window.location.reload()}>
                  다시 시작
                </button>
              </div>
            </div>
          )
        })
        break
      case '시스템 종료...':
        setModal({
          isOpen: true,
          title: '시스템 종료',
          width: 400,
          content: (
            <div>
              <p>컴퓨터를 종료하시겠습니까?</p>
              <div className="modal-buttons">
                <button className="modal-button secondary" onClick={() => setModal({ ...modal, isOpen: false })}>
                  취소
                </button>
                <button className="modal-button primary" onClick={() => window.close()}>
                  시스템 종료
                </button>
              </div>
            </div>
          )
        })
        break
      case '잠금':
        if (onLogout) {
          onLogout()
        }
        break
      default:
        console.log(`Apple 메뉴: ${action}`)
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
        setModal({
          isOpen: true,
          title: '저장',
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>✓ 저장되었습니다</p></div>
        })
        break

      // 편집 메뉴
      case '실행 취소':
      case '다시 실행':
        setModal({
          isOpen: true,
          title: action,
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>{action} 완료</p></div>
        })
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
      case '실제 크기':
      case '확대':
      case '축소':
        setModal({
          isOpen: true,
          title: '보기',
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>{action} 보기로 변경되었습니다</p></div>
        })
        break

      // 이동 메뉴
      case '뒤로':
      case '앞으로':
        setModal({
          isOpen: true,
          title: action,
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>{action} 이동</p></div>
        })
        break
      case '데스크탑':
        setActiveWindow(null)
        Object.keys(openWindows).forEach(key => {
          if (openWindows[key]) handleCloseWindow(key)
        })
        break
      case '문서':
      case '다운로드':
        setModal({
          isOpen: true,
          title: '이동',
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>{action}로 이동</p></div>
        })
        break

      // 윈도우 메뉴
      case '최소화':
        if (activeWindow) {
          handleMinimize(activeWindow)
        }
        break
      case '확대/축소':
        if (activeWindow) {
          setModal({
            isOpen: true,
            title: '확대/축소',
            width: 300,
            content: <div style={{ textAlign: 'center', padding: '20px' }}><p>확대/축소 토글</p></div>
          })
        }
        break
      case 'Finder 앞으로 가져오기':
      case '모든 윈도우 보기':
        setModal({
          isOpen: true,
          title: action,
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>{action}</p></div>
        })
        break

      // 정렬 메뉴
      case '이름':
      case '종류':
      case '날짜':
      case '크기':
        setModal({
          isOpen: true,
          title: '정렬',
          width: 300,
          content: <div style={{ textAlign: 'center', padding: '20px' }}><p>{action}순으로 정렬되었습니다</p></div>
        })
        break

      // 도움말 메뉴
      case 'Projects 도움말':
      case 'Tech Stack 도움말':
      case 'Finder 도움말':
        setModal({
          isOpen: true,
          title: '도움말',
          width: 400,
          content: (
            <div>
              <h2>{menuData.title} 도움말</h2>
              <p>이 앱에 대한 도움말을 표시합니다.</p>
            </div>
          )
        })
        break
      case '키보드 단축키':
        setModal({
          isOpen: true,
          title: '키보드 단축키',
          width: 400,
          content: (
            <div>
              <h2>키보드 단축키</h2>
              <ul className="modal-list">
                <li>⌘N - 새 윈도우</li>
                <li>⌘W - 닫기</li>
                <li>⌘C - 복사</li>
                <li>⌘V - 붙여넣기</li>
                <li>⌘X - 잘라내기</li>
                <li>⌘A - 모두 선택</li>
              </ul>
            </div>
          )
        })
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
            <div className="menu-item-wrapper">
              <span
                className={`apple-logo ${openMenu === 'apple' ? 'active' : ''}`}
                onClick={() => setOpenMenu(openMenu === 'apple' ? null : 'apple')}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                  <path d="M11.8 8.5c0-1.5 0.8-2.8 2-3.5-0.8-1.1-2-1.8-3.5-1.8-1.4 0-2.2 0.7-3.3 0.7-1.1 0-2-0.7-3.3-0.7C1.5 3.2 0 4.8 0 7.5c0 1.8 0.7 3.7 1.6 5.2 0.8 1.2 1.5 2.3 2.6 2.3 1 0 1.4-0.6 2.8-0.6 1.4 0 1.7 0.6 2.8 0.6 1.1 0 1.9-1.2 2.6-2.3 0.5-0.8 0.7-1.2 1.1-2.1-2.1-0.8-2.7-3.9-0.7-5.1zM9.5 2.2c0.6-0.7 1-1.7 0.9-2.7-0.9 0.1-1.9 0.6-2.5 1.3-0.6 0.7-1 1.6-0.9 2.6 1 0.1 2-0.5 2.5-1.2z"/>
                </svg>
              </span>
              {openMenu === 'apple' && (
                <div className="menu-dropdown">
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('이 Mac에 관하여')}>
                    이 Mac에 관하여
                  </div>
                  <div className="menu-divider"></div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('시스템 설정...')}>
                    시스템 설정...
                  </div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('App Store...')}>
                    App Store...
                  </div>
                  <div className="menu-divider"></div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('강제 종료...')}>
                    강제 종료...
                  </div>
                  <div className="menu-divider"></div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('잠자기')}>
                    잠자기
                  </div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('다시 시작...')}>
                    다시 시작...
                  </div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('시스템 종료...')}>
                    시스템 종료...
                  </div>
                  <div className="menu-divider"></div>
                  <div className="menu-dropdown-item" onClick={() => handleAppleMenuAction('잠금')}>
                    잠금
                  </div>
                </div>
              )}
            </div>
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
            <span className="menu-icon" onClick={handleWifiClick} title="Wi-Fi">
              <svg width="18" height="13" viewBox="0 0 18 13" fill="currentColor">
                <path d="M9 11 C8.5 11 8 11.5 8 12 C8 12.5 8.5 13 9 13 C9.5 13 10 12.5 10 12 C10 11.5 9.5 11 9 11Z"/>
                <path d="M9 8 C7 8 5.5 9 4.5 10 L6 11 C6.5 10.5 7.5 10 9 10 C10.5 10 11.5 10.5 12 11 L13.5 10 C12.5 9 11 8 9 8Z" opacity="0.8"/>
                <path d="M9 5 C6 5 3.5 6.5 2 8 L3.5 9.5 C4.5 8.5 6.5 7 9 7 C11.5 7 13.5 8.5 14.5 9.5 L16 8 C14.5 6.5 12 5 9 5Z" opacity="0.6"/>
                <path d="M9 2 C5 2 2 3.5 0.5 5 L2 6.5 C3 5.5 5.5 4 9 4 C12.5 4 15 5.5 16 6.5 L17.5 5 C16 3.5 13 2 9 2Z" opacity="0.4"/>
              </svg>
            </span>
            <span className="menu-icon" onClick={handleBatteryClick} title="배터리">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <rect x="1" y="2" width="16" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="17.5" y="4.5" width="1.5" height="3" rx="0.5" fill="currentColor"/>
                <rect x="2.5" y="3.5" width="6" height="5" rx="0.5" fill="currentColor"/>
              </svg>
            </span>
            <span className="menu-icon" onClick={handleSpotlightClick} title="Spotlight 검색">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="9.5" y1="9.5" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('velog')}
          >
            <div className="icon-image app-icon-desktop velog-icon">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <rect x="10" y="10" width="80" height="80" rx="12" fill="#20C997"/>
                <text x="50" y="65" fontSize="48" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">V</text>
              </svg>
            </div>
            <div className="icon-label">Velog</div>
          </div>

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('github')}
          >
            <div className="icon-image app-icon-desktop github-icon">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <rect x="10" y="10" width="80" height="80" rx="12" fill="#24292e"/>
                <path d="M50,30c-11,0-20,9-20,20c0,8.8,5.7,16.3,13.7,19c1,0.2,1.4-0.4,1.4-1c0-0.5,0-1.7,0-3.4c-5.6,1.2-6.8-2.7-6.8-2.7 c-0.9-2.3-2.2-2.9-2.2-2.9c-1.8-1.2,0.1-1.2,0.1-1.2c2,0.1,3.1,2.1,3.1,2.1c1.8,3.1,4.7,2.2,5.8,1.7c0.2-1.3,0.7-2.2,1.3-2.7 c-4.5-0.5-9.2-2.2-9.2-9.9c0-2.2,0.8-4,2.1-5.4c-0.2-0.5-0.9-2.6,0.2-5.3c0,0,1.7-0.5,5.5,2.1c1.6-0.4,3.3-0.7,5-0.7 c1.7,0,3.4,0.2,5,0.7c3.8-2.6,5.5-2.1,5.5-2.1c1.1,2.8,0.4,4.8,0.2,5.3c1.3,1.4,2.1,3.2,2.1,5.4c0,7.7-4.7,9.4-9.2,9.9 c0.7,0.6,1.4,1.8,1.4,3.7c0,2.7,0,4.8,0,5.5c0,0.5,0.4,1.2,1.4,1c8-2.7,13.7-10.2,13.7-19C70,39,61,30,50,30z" fill="white"/>
              </svg>
            </div>
            <div className="icon-label">GitHub</div>
          </div>
        </div>

        {/* Windows */}
        {openWindows.projects && !minimizedWindows.projects && (
          <Portfolio
            onClose={() => handleCloseWindow('projects')}
            isWindow={true}
            onClick={(e) => bringToFront('projects', e)}
            zIndex={windowZIndex.projects}
            onMinimize={() => handleMinimize('projects')}
          />
        )}

        {openWindows.techStack && !minimizedWindows.techStack && (
          <TechStack
            onClose={() => handleCloseWindow('techStack')}
            onClick={(e) => bringToFront('techStack', e)}
            zIndex={windowZIndex.techStack}
            onMinimize={() => handleMinimize('techStack')}
          />
        )}

        {openWindows.velog && !minimizedWindows.velog && (
          <Velog
            onClose={() => handleCloseWindow('velog')}
            onClick={(e) => bringToFront('velog', e)}
            zIndex={windowZIndex.velog}
            onMinimize={() => handleMinimize('velog')}
          />
        )}

        {openWindows.github && !minimizedWindows.github && (
          <GitHub
            onClose={() => handleCloseWindow('github')}
            onClick={(e) => bringToFront('github', e)}
            zIndex={windowZIndex.github}
            onMinimize={() => handleMinimize('github')}
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
          <div
            className={`dock-item ${openWindows.velog ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.velog) {
                handleRestore('velog')
              } else {
                handleDoubleClick('velog')
              }
            }}
          >
            <svg viewBox="0 0 100 100" width="40" height="40">
              <rect x="10" y="10" width="80" height="80" rx="12" fill="#20C997"/>
              <text x="50" y="65" fontSize="48" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">V</text>
            </svg>
            {openWindows.velog && <div className="dock-indicator"></div>}
          </div>
          <div
            className={`dock-item ${openWindows.github ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.github) {
                handleRestore('github')
              } else {
                handleDoubleClick('github')
              }
            }}
          >
            <svg viewBox="0 0 100 100" width="40" height="40">
              <rect x="10" y="10" width="80" height="80" rx="12" fill="#24292e"/>
              <path d="M50,30c-11,0-20,9-20,20c0,8.8,5.7,16.3,13.7,19c1,0.2,1.4-0.4,1.4-1c0-0.5,0-1.7,0-3.4c-5.6,1.2-6.8-2.7-6.8-2.7 c-0.9-2.3-2.2-2.9-2.2-2.9c-1.8-1.2,0.1-1.2,0.1-1.2c2,0.1,3.1,2.1,3.1,2.1c1.8,3.1,4.7,2.2,5.8,1.7c0.2-1.3,0.7-2.2,1.3-2.7 c-4.5-0.5-9.2-2.2-9.2-9.9c0-2.2,0.8-4,2.1-5.4c-0.2-0.5-0.9-2.6,0.2-5.3c0,0,1.7-0.5,5.5,2.1c1.6-0.4,3.3-0.7,5-0.7 c1.7,0,3.4,0.2,5,0.7c3.8-2.6,5.5-2.1,5.5-2.1c1.1,2.8,0.4,4.8,0.2,5.3c1.3,1.4,2.1,3.2,2.1,5.4c0,7.7-4.7,9.4-9.2,9.9 c0.7,0.6,1.4,1.8,1.4,3.7c0,2.7,0,4.8,0,5.5c0,0.5,0.4,1.2,1.4,1c8-2.7,13.7-10.2,13.7-19C70,39,61,30,50,30z" fill="white"/>
            </svg>
            {openWindows.github && <div className="dock-indicator"></div>}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        width={modal.width}
      >
        {modal.content}
      </Modal>
    </div>
  )
}

export default Desktop
