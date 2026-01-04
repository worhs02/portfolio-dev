import React, { useState, useEffect, useRef } from 'react'
import './Modal.css'

function Modal({ isOpen, onClose, title, children, width = 400 }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const modalRef = useRef(null)

  // 초기 중앙 배치
  useEffect(() => {
    if (isOpen) {
      const centerX = (window.innerWidth - width) / 2
      const centerY = (window.innerHeight - 400) / 2
      setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
    }
  }, [isOpen, width])

  const handleMouseDown = (e) => {
    if (e.target.closest('.modal-traffic-lights') || e.target.closest('.modal-content')) {
      return
    }
    setIsDragging(true)
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return

      const newX = e.clientX - dragStartPos.current.x
      const newY = e.clientY - dragStartPos.current.y

      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - width, newX)),
        y: Math.max(0, Math.min(window.innerHeight - 200, newY))
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, width])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className={`modal-window ${isDragging ? 'dragging' : ''}`}
        style={{
          width: `${width}px`,
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-titlebar" onMouseDown={handleMouseDown}>
          <div className="modal-traffic-lights">
            <span className="modal-dot modal-close" onClick={onClose}></span>
            <span className="modal-dot modal-minimize"></span>
            <span className="modal-dot modal-maximize"></span>
          </div>
          <div className="modal-title">{title}</div>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
