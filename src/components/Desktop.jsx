import React, { useState, useEffect } from 'react'
import './Desktop.css'
import Portfolio from './Portfolio'
import TechStack from './TechStack'
import Velog from './Velog'
import GitHub from './GitHub'
import Mail from './Mail'
import SystemSettings from './SystemSettings'
import Terminal from './Terminal'
import Modal from './Modal'
import { portfolioItems } from '../data/portfolioData'
import { getDeviceType, isMobile } from '../utils/deviceDetect'

function Desktop({ onLogout }) {
  const [openWindows, setOpenWindows] = useState({
    projects: false,
    techStack: false,
    velog: false,
    github: false,
    mail: false,
    settings: false,
    terminal: false
  })

  const [windowZIndex, setWindowZIndex] = useState({
    projects: 100,
    techStack: 100,
    velog: 100,
    github: 100,
    mail: 100,
    settings: 100,
    terminal: 100
  })

  const [maxZIndex, setMaxZIndex] = useState(100)
  const [activeWindow, setActiveWindow] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [minimizedWindows, setMinimizedWindows] = useState({
    projects: false,
    techStack: false,
    velog: false,
    github: false,
    mail: false,
    settings: false,
    terminal: false
  })
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    content: null,
    width: 400
  })
  const [currentWifi, setCurrentWifi] = useState('My WiFi')

  // GitHub 오늘의 커밋 수 상태
  const [todayCommits, setTodayCommits] = useState(0)
  const [batteryPercent, setBatteryPercent] = useState(100)
  const [wifiSpeed, setWifiSpeed] = useState({
    download: 150,
    upload: 80
  })

  // 디바이스 타입 감지
  const [deviceType, setDeviceType] = useState(() => getDeviceType())

  // 시간대별 배경 필터 상태
  const [timeOfDay, setTimeOfDay] = useState(() => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 7) {
      return 'sunrise'
    } else if (hour >= 7 && hour < 17) {
      return 'day'
    } else if (hour >= 17 && hour < 19) {
      return 'sunset'
    } else {
      return 'night'
    }
  })

  // 현재 시간 상태
  const [currentTime, setCurrentTime] = useState(new Date())

  // 디바이스 타입 감지 및 업데이트
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 시간대 감지 및 업데이트 (일출/일몰 기준)
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()

      // 일출: 6-7시, 일몰: 17-19시 (한국 기준 대략적인 시간)
      if (hour >= 6 && hour < 7) {
        setTimeOfDay('sunrise') // 일출 (노을 이미지)
      } else if (hour >= 7 && hour < 17) {
        setTimeOfDay('day') // 낮 (낮 이미지)
      } else if (hour >= 17 && hour < 19) {
        setTimeOfDay('sunset') // 일몰 (노을 이미지)
      } else {
        setTimeOfDay('night') // 밤 (밤 이미지)
      }
    }

    updateTimeOfDay()
    // 1분마다 시간대 체크
    const interval = setInterval(updateTimeOfDay, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // 시계 업데이트 (1분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // GitHub 전날 기여도 가져오기 (전날 contribution = 오늘 배터리)
  useEffect(() => {
    const fetchYesterdayContributions = async () => {
      try {
        // 전날 날짜 계산
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]
        console.log('전날 날짜:', yesterdayStr)

        // github-data.json에서 데이터 가져오기
        const response = await fetch(`${import.meta.env.BASE_URL}github-data.json?t=${Date.now()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch github-data.json')
        }

        const data = await response.json()
        const yearKey = yesterday.getFullYear()
        const contributions = data.contributions[yearKey] || []

        // 전날 날짜의 기여도 찾기
        const yesterdayContribution = contributions.find(day => day.date === yesterdayStr)
        const yesterdayCount = yesterdayContribution?.count || 0

        console.log('전날 기여도:', yesterdayCount)
        setTodayCommits(yesterdayCount)

        // 전날 기여도에 따라 오늘 배터리 퍼센트 설정
        let percent = 100
        if (yesterdayCount === 0) {
          percent = 100 // 기여가 없으면 100%
        } else if (yesterdayCount <= 5) {
          percent = 70 // 5개 이하면 70%
        } else if (yesterdayCount <= 10) {
          percent = 50 // 10개 이하면 50%
        } else if (yesterdayCount <= 15) {
          percent = 30 // 15개 이하면 30%
        } else {
          percent = 10 // 그 이상이면 10%
        }

        console.log('배터리 퍼센트:', percent)
        setBatteryPercent(percent)
      } catch (error) {
        console.error('GitHub 기여도 가져오기 실패:', error)
        setTodayCommits(0)
        setBatteryPercent(100)
      }
    }

    fetchYesterdayContributions()
  }, [])

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
      case 'settings':
        return {
          title: '설정',
          menus: {
            '파일': ['닫기'],
            '편집': ['복사', '붙여넣기'],
            '보기': ['실제 크기', '확대', '축소'],
            '윈도우': ['최소화', '확대/축소'],
            '도움말': ['설정 도움말']
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
    const isCharging = batteryPercent < 100

    // 전날 날짜 계산
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    let statusMessage = ''
    if (todayCommits === 0) {
      statusMessage = '어제 쉬었으니 오늘은 열심히 해볼까요?'
    } else if (todayCommits <= 5) {
      statusMessage = '어제 가볍게 코딩했네요!'
    } else if (todayCommits <= 10) {
      statusMessage = '어제 열심히 했어요!'
    } else if (todayCommits <= 15) {
      statusMessage = '어제 정말 많이 하셨네요!'
    } else {
      statusMessage = '어제 불태웠군요! 오늘은 좀 쉬어도 돼요'
    }

    setModal({
      isOpen: true,
      title: 'GitHub Contribute',
      width: 400,
      content: (
        <div style={{ padding: '8px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#007AFF', marginBottom: '8px' }}>
              {todayCommits}
            </div>
            <div style={{ fontSize: '16px', color: '#666', marginBottom: '4px' }}>
              어제의 Contribute
            </div>
            <div style={{ fontSize: '14px', color: '#999' }}>
              {yesterday.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>배터리 잔량</div>
            <div style={{ background: '#e0e0e0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{
                background: batteryPercent > 50 ? '#28CA42' : batteryPercent > 20 ? '#FFBD2E' : '#FF5F57',
                height: '100%',
                borderRadius: '6px',
                width: `${batteryPercent}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '8px', color: '#333' }}>
              {batteryPercent}%
            </div>
          </div>

          <div style={{ background: '#f0f7ff', padding: '14px', borderRadius: '8px', border: '1px solid #d0e7ff' }}>
            <div style={{ fontSize: '14px', color: '#007AFF', lineHeight: '1.6' }}>
              {statusMessage}
            </div>
          </div>
        </div>
      )
    })
  }

  const handleWifiClick = () => {
    const networks = [
      { name: 'My WiFi', signal: 4, secure: true },
      { name: 'Guest Network', signal: 3, secure: false },
      { name: 'Office WiFi', signal: 3, secure: true },
      { name: 'iPhone', signal: 2, secure: true },
      { name: 'Cafe WiFi', signal: 1, secure: false }
    ]

    const getSignalIcon = (strength) => {
      return (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <rect x="0" y="10" width="3" height="4" fill={strength >= 1 ? '#333' : '#ddd'} rx="0.5"/>
          <rect x="5" y="7" width="3" height="7" fill={strength >= 2 ? '#333' : '#ddd'} rx="0.5"/>
          <rect x="10" y="4" width="3" height="10" fill={strength >= 3 ? '#333' : '#ddd'} rx="0.5"/>
          <rect x="15" y="0" width="3" height="14" fill={strength >= 4 ? '#333' : '#ddd'} rx="0.5"/>
        </svg>
      )
    }

    const renderWifiModal = (wifi, speed) => (
      <div>
        <div style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#333' }}>
            현재 연결: <strong>{wifi}</strong>
          </h3>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
            <div>
              <span style={{ color: '#28CA42' }}>↓</span> {speed.download} KB/s
            </div>
            <div>
              <span style={{ color: '#007AFF' }}>↑</span> {speed.upload} KB/s
            </div>
          </div>
        </div>

        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          사용 가능한 네트워크
        </h3>
        <ul className="modal-list" style={{ margin: 0 }}>
          {networks.map((network, idx) => (
            <li
              key={idx}
              onClick={() => handleNetworkSwitch(network.name)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: network.name === wifi ? '#e3f2fd' : 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {network.name === wifi && <span style={{ color: '#007AFF' }}>✓</span>}
                <span>{network.name}</span>
                {network.secure && <span style={{ fontSize: '12px' }}>🔒</span>}
              </div>
              <span style={{ fontSize: '12px', color: '#999' }}>
                {getSignalIcon(network.signal)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )

    const handleNetworkSwitch = (networkName) => {
      const newSpeed = {
        download: Math.floor(Math.random() * 200) + 50,
        upload: Math.floor(Math.random() * 100) + 30
      }
      setCurrentWifi(networkName)
      setWifiSpeed(newSpeed)

      // 모달 컨텐츠 즉시 업데이트
      setModal(prev => ({
        ...prev,
        content: renderWifiModal(networkName, newSpeed)
      }))
    }

    setModal({
      isOpen: true,
      title: 'Wi-Fi',
      width: 400,
      content: renderWifiModal(currentWifi, wifiSpeed)
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

  // 시간대별 배경 이미지 스타일 계산
  const getBackgroundStyle = () => {
    const images = {
      sunrise: '/portfolio-dev/wallpaper-sunset.jpg', // 일출 (노을 이미지)
      day: '/portfolio-dev/wallpaper-day.jpg', // 낮
      sunset: '/portfolio-dev/wallpaper-sunset.jpg', // 일몰 (노을 이미지)
      night: '/portfolio-dev/wallpaper-night.jpg' // 밤
    }

    return {
      backgroundImage: `url(${images[timeOfDay]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 1s ease-in-out'
    }
  }

  return (
    <div className="desktop">
      <div className="desktop-background" style={getBackgroundStyle()} onClick={() => {
        setActiveWindow(null)
        setOpenMenu(null)
      }}>
        {/* macOS Menu Bar - 모바일에서는 숨김 */}
        {deviceType !== 'mobile' && (
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={handleWifiClick}>
              <div style={{ fontSize: '9px', lineHeight: '1.3', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div>↓{wifiSpeed.download} KB/s</div>
                <div>↑{wifiSpeed.upload} KB/s</div>
              </div>
              <span className="menu-icon" title="Wi-Fi">
                <svg width="18" height="14" viewBox="0 0 640 512" fill="currentColor">
                  <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/>
                </svg>
              </span>
            </div>
            <span className="menu-icon" onClick={handleBatteryClick} title={`Contribute: ${batteryPercent}% (어제 ${todayCommits}개)`}>
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <rect x="1" y="2" width="16" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="17.5" y="4.5" width="1.5" height="3" rx="0.5" fill="currentColor"/>
                <rect
                  x="2.5"
                  y="3.5"
                  width={13 * (batteryPercent / 100)}
                  height="5"
                  rx="0.5"
                  fill={batteryPercent > 50 ? '#28CA42' : batteryPercent > 20 ? '#FFBD2E' : '#FF5F57'}
                  style={{ transition: 'width 0.3s ease' }}
                />
              </svg>
            </span>
            <span className="menu-icon" onClick={handleSpotlightClick} title="Spotlight 검색">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="9.5" y1="9.5" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="menu-time">{currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          </div>
        )}

        {/* Desktop Icons */}
        <div className="desktop-icons">
          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('projects')}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('projects');
            }}
          >
            <div className="icon-image">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <defs>
                  <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#7CB9E8', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#5A9FD4', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                {/* 폴더 탭 */}
                <path d="M 15 25 L 15 22 Q 15 18 19 18 L 35 18 Q 37 18 38 20 L 42 25 Z"
                  fill="url(#folderGradient)"
                  stroke="#4A8FB8"
                  strokeWidth="1"/>
                {/* 폴더 본체 */}
                <rect x="15" y="25" width="70" height="55" rx="6"
                  fill="url(#folderGradient)"
                  stroke="#4A8FB8"
                  strokeWidth="1.5"/>
                {/* 하이라이트 */}
                <rect x="17" y="27" width="66" height="3" rx="2"
                  fill="rgba(255,255,255,0.3)"/>
              </svg>
            </div>
            <div className="icon-label">Projects</div>
          </div>

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('techStack')}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('techStack');
            }}
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
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('velog');
            }}
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
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('github');
            }}
          >
            <div className="icon-image app-icon-desktop github-icon">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <rect x="10" y="10" width="80" height="80" rx="12" fill="#24292e"/>
                <path d="M50,30c-11,0-20,9-20,20c0,8.8,5.7,16.3,13.7,19c1,0.2,1.4-0.4,1.4-1c0-0.5,0-1.7,0-3.4c-5.6,1.2-6.8-2.7-6.8-2.7 c-0.9-2.3-2.2-2.9-2.2-2.9c-1.8-1.2,0.1-1.2,0.1-1.2c2,0.1,3.1,2.1,3.1,2.1c1.8,3.1,4.7,2.2,5.8,1.7c0.2-1.3,0.7-2.2,1.3-2.7 c-4.5-0.5-9.2-2.2-9.2-9.9c0-2.2,0.8-4,2.1-5.4c-0.2-0.5-0.9-2.6,0.2-5.3c0,0,1.7-0.5,5.5,2.1c1.6-0.4,3.3-0.7,5-0.7 c1.7,0,3.4,0.2,5,0.7c3.8-2.6,5.5-2.1,5.5-2.1c1.1,2.8,0.4,4.8,0.2,5.3c1.3,1.4,2.1,3.2,2.1,5.4c0,7.7-4.7,9.4-9.2,9.9 c0.7,0.6,1.4,1.8,1.4,3.7c0,2.7,0,4.8,0,5.5c0,0.5,0.4,1.2,1.4,1c8-2.7,13.7-10.2,13.7-19C70,39,61,30,50,30z" fill="white"/>
              </svg>
            </div>
            <div className="icon-label">GitHub</div>
          </div>

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('mail')}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('mail');
            }}
          >
            <div className="icon-image app-icon-desktop">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <defs>
                  <linearGradient id="mailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2E9AFE', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0080FF', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#mailGradient)"/>
                <g transform="translate(50, 50)">
                  <rect x="-22" y="-14" width="44" height="28" rx="2" fill="white"/>
                  <path d="M -22 -14 L 0 2 L 22 -14" fill="none" stroke="#0080FF" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M -22 14 L -6 0" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M 22 14 L 6 0" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
              </svg>
            </div>
            <div className="icon-label">Mail</div>
          </div>

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('settings')}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('settings');
            }}
          >
            <div className="icon-image app-icon-desktop">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <defs>
                  <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8E8E93', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#636366', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#settingsGradient)"/>
                <g transform="translate(50, 50)">
                  <path d="M0-20L5-18L5-14L10-12L14-16L18-12L14-8L16-3L20 0L16 3L14 8L18 12L14 16L10 12L5 14L5 18L0 20L-5 18L-5 14L-10 12L-14 16L-18 12L-14 8L-16 3L-20 0L-16-3L-14-8L-18-12L-14-16L-10-12L-5-14L-5-18Z" fill="white" opacity="0.95"/>
                  <circle cx="0" cy="0" r="7" fill="#636366"/>
                </g>
              </svg>
            </div>
            <div className="icon-label">Settings</div>
          </div>

          <div
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick('terminal')}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDoubleClick('terminal');
            }}
          >
            <div className="icon-image app-icon-desktop">
              <svg viewBox="0 0 100 100" width="60" height="60">
                <rect x="10" y="10" width="80" height="80" rx="12" fill="#1e1e1e"/>
                <text x="50" y="68" fontSize="36" fontWeight="bold" fill="#00ff00" textAnchor="middle" fontFamily="Monaco, monospace">&gt;_</text>
              </svg>
            </div>
            <div className="icon-label">Terminal</div>
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
            deviceType={deviceType}
          />
        )}

        {openWindows.techStack && !minimizedWindows.techStack && (
          <TechStack
            onClose={() => handleCloseWindow('techStack')}
            onClick={(e) => bringToFront('techStack', e)}
            zIndex={windowZIndex.techStack}
            onMinimize={() => handleMinimize('techStack')}
            deviceType={deviceType}
          />
        )}

        {openWindows.velog && !minimizedWindows.velog && (
          <Velog
            onClose={() => handleCloseWindow('velog')}
            onClick={(e) => bringToFront('velog', e)}
            zIndex={windowZIndex.velog}
            onMinimize={() => handleMinimize('velog')}
            deviceType={deviceType}
          />
        )}

        {openWindows.github && !minimizedWindows.github && (
          <GitHub
            onClose={() => handleCloseWindow('github')}
            onClick={(e) => bringToFront('github', e)}
            zIndex={windowZIndex.github}
            onMinimize={() => handleMinimize('github')}
            deviceType={deviceType}
          />
        )}

        {openWindows.mail && !minimizedWindows.mail && (
          <Mail
            onClose={() => handleCloseWindow('mail')}
            onClick={(e) => bringToFront('mail', e)}
            zIndex={windowZIndex.mail}
            onMinimize={() => handleMinimize('mail')}
            deviceType={deviceType}
          />
        )}

        {openWindows.settings && !minimizedWindows.settings && (
          <SystemSettings
            onClose={() => handleCloseWindow('settings')}
            onClick={(e) => bringToFront('settings', e)}
            zIndex={windowZIndex.settings}
            onMinimize={() => handleMinimize('settings')}
            deviceType={deviceType}
          />
        )}

        {openWindows.terminal && !minimizedWindows.terminal && (
          <Terminal
            onClose={() => handleCloseWindow('terminal')}
            onClick={(e) => bringToFront('terminal', e)}
            zIndex={windowZIndex.terminal}
            onMinimize={() => handleMinimize('terminal')}
            deviceType={deviceType}
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
            <svg viewBox="0 0 100 100" width="40" height="40">
              <defs>
                <linearGradient id="folderGradientDock" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#7CB9E8', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#5A9FD4', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* 폴더 탭 */}
              <path d="M 15 25 L 15 22 Q 15 18 19 18 L 35 18 Q 37 18 38 20 L 42 25 Z"
                fill="url(#folderGradientDock)"
                stroke="#4A8FB8"
                strokeWidth="1"/>
              {/* 폴더 본체 */}
              <rect x="15" y="25" width="70" height="55" rx="6"
                fill="url(#folderGradientDock)"
                stroke="#4A8FB8"
                strokeWidth="1.5"/>
              {/* 하이라이트 */}
              <rect x="17" y="27" width="66" height="3" rx="2"
                fill="rgba(255,255,255,0.3)"/>
            </svg>
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
          <div
            className={`dock-item ${openWindows.mail ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.mail) {
                handleRestore('mail')
              } else {
                handleDoubleClick('mail')
              }
            }}
          >
            <svg viewBox="0 0 100 100" width="40" height="40">
              <defs>
                <linearGradient id="mailGradientDock" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2E9AFE', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0080FF', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#mailGradientDock)"/>
              <g transform="translate(50, 50)">
                <rect x="-22" y="-14" width="44" height="28" rx="2" fill="white"/>
                <path d="M -22 -14 L 0 2 L 22 -14" fill="none" stroke="#0080FF" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M -22 14 L -6 0" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 22 14 L 6 0" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            </svg>
            {openWindows.mail && <div className="dock-indicator"></div>}
          </div>
          <div
            className={`dock-item ${openWindows.settings ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.settings) {
                handleRestore('settings')
              } else {
                handleDoubleClick('settings')
              }
            }}
          >
            <svg viewBox="0 0 100 100" width="40" height="40">
              <defs>
                <linearGradient id="settingsGradientDock" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8E8E93', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#636366', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#settingsGradientDock)"/>
              <g transform="translate(50, 50)">
                <path d="M0-20L5-18L5-14L10-12L14-16L18-12L14-8L16-3L20 0L16 3L14 8L18 12L14 16L10 12L5 14L5 18L0 20L-5 18L-5 14L-10 12L-14 16L-18 12L-14 8L-16 3L-20 0L-16-3L-14-8L-18-12L-14-16L-10-12L-5-14L-5-18Z" fill="white" opacity="0.95"/>
                <circle cx="0" cy="0" r="7" fill="#636366"/>
              </g>
            </svg>
            {openWindows.settings && <div className="dock-indicator"></div>}
          </div>
          <div
            className={`dock-item ${openWindows.terminal ? 'active' : ''}`}
            onClick={() => {
              if (minimizedWindows.terminal) {
                handleRestore('terminal')
              } else {
                handleDoubleClick('terminal')
              }
            }}
          >
            <svg viewBox="0 0 100 100" width="40" height="40">
              <rect x="10" y="10" width="80" height="80" rx="12" fill="#1e1e1e"/>
              <text x="50" y="65" fontSize="28" fontWeight="bold" fill="#00ff00" textAnchor="middle" fontFamily="Monaco, monospace">&gt;_</text>
            </svg>
            {openWindows.terminal && <div className="dock-indicator"></div>}
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
