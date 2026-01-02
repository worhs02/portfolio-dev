import React, { useState, useEffect, useRef } from 'react'
import './Portfolio.css'
import { portfolioItems } from '../data/portfolioData'

function Portfolio({ onClose, isWindow = false, onClick, zIndex }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [expandedFolders, setExpandedFolders] = useState(['root'])
  const [selectedFile, setSelectedFile] = useState(null)

  // Window drag/resize states
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 900, height: 650 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 900, height: 650 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })

  const windowRef = useRef(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartWindowPos = useRef({ x: 0, y: 0 })

  // 초기 중앙 배치
  useEffect(() => {
    const centerX = (window.innerWidth - 900) / 2
    const centerY = (window.innerHeight - 650) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      setExpandedFolders(['root'])
      setSelectedFile('overview')
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  // 타이틀바에 드래그 이벤트 연결
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.finder-titlebar')
    if (!titlebar) return

    const handleMouseDownDrag = (e) => {
      if (e.target.closest('.finder-controls') || e.target.closest('.finder-btn')) {
        return
      }

      if (isMaximized) return // 최대화 상태에서는 드래그 불가

      setIsDragging(true)
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
      e.preventDefault()
    }

    titlebar.addEventListener('mousedown', handleMouseDownDrag)
    titlebar.style.cursor = isMaximized ? 'default' : 'grab'

    return () => {
      titlebar.removeEventListener('mousedown', handleMouseDownDrag)
    }
  }, [position, isMaximized])

  // 타이틀바 커서 업데이트
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.finder-titlebar')
    if (titlebar) {
      titlebar.style.cursor = isDragging ? 'grabbing' : 'grab'
    }
  }, [isDragging])

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

  // 리사이즈 시작
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

  // 최대화/복원
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
        height: window.innerHeight
      })
      setPosition({ x: 0, y: 0 })
      setIsMaximized(true)
    }
  }

  // 최소화 (윈도우 닫기)
  const handleMinimize = () => {
    onClose()
  }

  // VS Code Tree Structure
  const treeFiles = selectedProject ? [
    {
      id: 'overview',
      name: 'README.md',
      icon: '📄',
      type: 'file'
    },
    {
      id: 'team',
      name: 'TEAM.md',
      icon: '👥',
      type: 'file'
    },
    {
      id: 'skills',
      name: 'package.json',
      icon: '📦',
      type: 'file'
    },
    {
      id: 'troubleshooting',
      name: 'TROUBLESHOOTING.md',
      icon: '🔧',
      type: 'file'
    },
    ...(selectedProject.github ? [{
      id: 'github',
      name: '.git',
      icon: '🔗',
      type: 'folder'
    }] : []),
    ...(selectedProject.award ? [{
      id: 'award',
      name: 'AWARD.txt',
      icon: '🏆',
      type: 'file'
    }] : [])
  ] : []

  // Content renderer for each file
  const getFileContent = (fileId) => {
    if (!selectedProject) return null

    switch(fileId) {
      case 'overview':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">📄</span>
              <span className="file-name">README.md</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.overview}</pre>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">👥</span>
              <span className="file-name">TEAM.md</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.team}</pre>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">📦</span>
              <span className="file-name">package.json</span>
            </div>
            <div className="file-body">
              <pre>{JSON.stringify({ dependencies: selectedProject.skills }, null, 2)}</pre>
            </div>
          </div>
        )

      case 'troubleshooting':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">🔧</span>
              <span className="file-name">TROUBLESHOOTING.md</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.troubleshooting.map((item, idx) => `${idx + 1}. ${item}`).join('\n\n')}</pre>
            </div>
          </div>
        )

      case 'github':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">🔗</span>
              <span className="file-name">.git</span>
            </div>
            <div className="file-body">
              <pre>
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="file-link">
                  {selectedProject.github}
                </a>
              </pre>
            </div>
          </div>
        )

      case 'award':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">🏆</span>
              <span className="file-name">AWARD.txt</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.award}</pre>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // TreeItem component
  const TreeItem = ({ file, isSelected, onClick }) => {
    const isFolderExpanded = file.type === 'folder' && expandedFolders.includes(file.id)

    const handleClick = () => {
      if (file.type === 'folder') {
        setExpandedFolders(prev =>
          prev.includes(file.id)
            ? prev.filter(id => id !== file.id)
            : [...prev, file.id]
        )
      } else {
        onClick()
      }
    }

    return (
      <div
        className={`tree-item ${isSelected ? 'tree-item-selected' : ''}`}
        onClick={handleClick}
      >
        <span className="tree-item-icon">
          {file.type === 'folder' ? (isFolderExpanded ? '📂' : '📁') : file.icon}
        </span>
        <span className="tree-item-name">{file.name}</span>
      </div>
    )
  }


  return (
    <section
      ref={windowRef}
      className={`portfolio ${isWindow !== false ? 'draggable-window' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${isMaximized ? 'maximized' : ''}`}
      id="portfolio"
      onClick={onClick}
      style={isWindow !== false ? (isMaximized ? {
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        zIndex: zIndex || 100
      } : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex || 100
      }) : {}}
    >
      {/* 리사이즈 핸들 - 8개 방향 (window 모드일 때만) */}
      {isWindow !== false && (
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

      <div className="container">
        <div className="finder-window">
          <div className="finder-titlebar">
            <div className="finder-controls">
              <span
                className="finder-btn close"
                onClick={onClose}
              ></span>
              <span
                className="finder-btn minimize"
                onClick={handleMinimize}
              ></span>
              <span
                className="finder-btn maximize"
                onClick={handleMaximize}
              ></span>
            </div>
            <div className="finder-title">My Portfolio</div>
          </div>

          <div className="finder-content">
            <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-card"
              onClick={() => setSelectedProject(item)}
            >
              {item.award && (
                <div className="award-sticker">
                  {item.award}
                </div>
              )}
              <div className="portfolio-info">
                <div className="folder-icon">
                  <div className="folder-tab"></div>
                  <div className="folder-body"></div>
                </div>
                <h3>{item.title}</h3>
                <p className="project-period">{item.period}</p>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div
          className="vscode-modal"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="vscode-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title Bar */}
            <div className="vscode-titlebar">
              <div className="vscode-title">
                <span className="vscode-folder-icon">📁</span>
                {selectedProject.title}
              </div>
              <button
                className="vscode-close"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>

            {/* Main Content */}
            <div className="vscode-content">
              {/* Sidebar - File Explorer */}
              <div className="vscode-sidebar">
                <div className="vscode-sidebar-header">
                  <span>EXPLORER</span>
                </div>
                <div className="vscode-tree">
                  <div className="tree-folder-header">
                    <span className="tree-folder-icon">▼</span>
                    <span className="tree-folder-name">{selectedProject.title}</span>
                  </div>
                  <div className="tree-folder-content">
                    {treeFiles.map((file) => (
                      <TreeItem
                        key={file.id}
                        file={file}
                        isSelected={selectedFile === file.id}
                        onClick={() => setSelectedFile(file.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Editor - File Content */}
              <div className="vscode-editor">
                {selectedFile ? (
                  getFileContent(selectedFile)
                ) : (
                  <div className="vscode-welcome">
                    <h2>Welcome to {selectedProject.title}</h2>
                    <p>{selectedProject.period}</p>
                    <p>Select a file from the explorer to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio
