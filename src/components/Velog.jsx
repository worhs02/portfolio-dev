import React, { useState, useEffect, useRef } from 'react'
import './Velog.css'

function Velog({ onClose, onClick, zIndex, onMinimize }) {
  const [url] = useState('https://velog.io/@a_zin/posts')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 1000, height: 700 })
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 1000, height: 700 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)

  // 초기 중앙 배치
  useEffect(() => {
    const centerX = (window.innerWidth - 1000) / 2
    const centerY = (window.innerHeight - 700) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [])

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
      if (!isDragging) return

      const newX = e.clientX - dragStartPos.current.x
      const newY = e.clientY - dragStartPos.current.y

      const maxX = window.innerWidth - 100
      const maxY = window.innerHeight - 50

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  // 타이틀바 커서 업데이트
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.velog-titlebar')
    if (titlebar) {
      titlebar.style.cursor = isDragging ? 'grabbing' : 'grab'
    }
  }, [isDragging])

  const handleRefresh = () => {
    window.location.reload()
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
