import React, { useState, useEffect, useRef } from 'react'
import './GitHub.css'
import { portfolioItems } from '../data/portfolioData'

function GitHub({ onClose, onClick, zIndex, onMinimize }) {
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 1000, height: 700 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 1000, height: 700 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartWindowPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)

  // GitHub 데이터 가져오기
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // 사용자 정보 가져오기
        const userResponse = await fetch('https://api.github.com/users/worhs02')
        if (!userResponse.ok) {
          throw new Error(`GitHub API Error: ${userResponse.status}`)
        }
        const userData = await userResponse.json()
        console.log('User Data:', userData)
        setUserData(userData)

        // portfolioData에서 GitHub 링크 추출
        const githubUrls = portfolioItems
          .filter(item => item.github)
          .map(item => item.github)

        // URL에서 레포지토리 이름 추출 (예: https://github.com/worhs02/repo-name -> repo-name)
        const repoNames = githubUrls.map(url => {
          const parts = url.split('/')
          return parts[parts.length - 1]
        })

        // 각 레포지토리 정보 가져오기
        const repoPromises = repoNames.map(name =>
          fetch(`https://api.github.com/repos/worhs02/${name}`)
            .then(res => res.json())
            .catch(err => ({ error: true, name }))
        )

        const reposData = await Promise.all(repoPromises)
        // 에러가 없고 실제로 존재하는 레포만 필터링
        const validRepos = reposData.filter(repo => !repo.message && !repo.error)
        setRepos(validRepos.slice(0, 6)) // 최대 6개만 표시

        setLoading(false)
      } catch (error) {
        console.error('GitHub 데이터 가져오기 실패:', error)
        // 에러 시에도 로딩 상태 해제하고 빈 데이터 설정
        setUserData(null)
        setRepos([])
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  // 초기 중앙 배치
  useEffect(() => {
    const centerX = (window.innerWidth - 1000) / 2
    const centerY = (window.innerHeight - 700) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [])

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
      // GitHub 데이터 다시 가져오기
      const userResponse = await fetch('https://api.github.com/users/worhs02')
      const userData = await userResponse.json()
      setUserData(userData)

      // portfolioData에서 GitHub 링크 추출
      const githubUrls = portfolioItems
        .filter(item => item.github)
        .map(item => item.github)

      const repoNames = githubUrls.map(url => {
        const parts = url.split('/')
        return parts[parts.length - 1]
      })

      const repoPromises = repoNames.map(name =>
        fetch(`https://api.github.com/repos/worhs02/${name}`)
          .then(res => res.json())
          .catch(err => ({ error: true, name }))
      )

      const reposData = await Promise.all(repoPromises)
      const validRepos = reposData.filter(repo => !repo.message && !repo.error)
      setRepos(validRepos.slice(0, 6))

      setLoading(false)
    } catch (error) {
      console.error('새로고침 실패:', error)
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
                <img src={userData.avatar_url} alt={userData.name} className="avatar" />
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
              <h2>Contribution Graph</h2>
              <img
                src={`https://ghchart.rshah.org/20C997/worhs02?v=${new Date().toISOString().split('T')[0]}`}
                alt="GitHub Contributions"
                className="contribution-graph"
                key={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* 최근 레포지토리 */}
            <div className="repositories">
              <h2>My Projects</h2>
              <div className="repo-grid">
                {repos.map(repo => (
                  <div
                    key={repo.id}
                    className="repo-card"
                    onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
                  >
                    <h3>{repo.name}</h3>
                    <p className="repo-description">{repo.description || 'No description'}</p>
                    <div className="repo-stats">
                      {repo.language && <span className="language">● {repo.language}</span>}
                      <span className="stars">⭐ {repo.stargazers_count}</span>
                      <span className="forks">🔀 {repo.forks_count}</span>
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
