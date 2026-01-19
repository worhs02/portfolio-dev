import React, { useState, useEffect, useRef } from 'react'
import './Velog.css'

function Velog({ onClose, onClick, zIndex, onMinimize, deviceType = 'desktop' }) {
  const [url, setUrl] = useState('https://velog.io/@a_zin/posts')
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
  const isTablet = deviceType === 'tablet'

  // 초기 중앙 배치
  useEffect(() => {
    let windowWidth, windowHeight
    const aspectRatio = 1000 / 700

    if (isTablet) {
      // 태블릿: 60% 크기
      windowWidth = 1000 * 0.6 // 600px
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
      windowWidth = 1000
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
    const titlebar = windowRef.current?.querySelector('.velog-titlebar')
    if (!titlebar) return

    const handleMouseDown = (e) => {
      if (e.target.closest('.velog-controls')) return
      if (isMaximized) return // 최대화 상태에서는 드래그 불가

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
    const titlebar = windowRef.current?.querySelector('.velog-titlebar')
    if (titlebar) {
      titlebar.style.cursor = isDragging ? 'grabbing' : 'grab'
    }
  }, [isDragging])

  const handleRefresh = () => {
    // iframe만 리로드 (타임스탬프 추가)
    setUrl('https://velog.io/@a_zin/posts?t=' + Date.now())
  }

  const handleMouseDownResize = (e, direction) => {
    if (isMaximized) return // 최대화 상태에서는 리사이즈 불가

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
      // 복원
      setSize(prevSize)
      setPosition(prevPosition)
      setIsMaximized(false)
    } else {
      // 최대화
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
      className={`velog-window ${isDragging ? 'dragging' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        zIndex,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`
      }}
      onClick={onClick}
    >
      {/* 리사이즈 핸들 - 8개 방향 */}
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

      <div className="velog-titlebar">
        <div className="velog-controls">
          <span className="velog-btn close" onClick={onClose}></span>
          <span className="velog-btn minimize" onClick={onMinimize}></span>
          <span className="velog-btn maximize" onClick={handleMaximize}></span>
        </div>
      </div>

      <div className="velog-toolbar">
        <div className="velog-nav-buttons">
          <button className="nav-btn" onClick={handleRefresh} title="새로고침">⟳</button>
        </div>
        <div className="velog-url-bar">
          <input
            type="text"
            value={url}
            readOnly
            className="url-input"
            placeholder="URL"
          />
        </div>
      </div>

      <div className="velog-content">
        <iframe
          src={url}
          title="Velog"
          className="velog-iframe"
          frameBorder="0"
        />
      </div>
    </div>
  )
}

export default Velog
