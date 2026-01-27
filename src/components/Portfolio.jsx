import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import './Portfolio.css'
import { portfolioItems } from '../data/portfolioData'

// 이미지 종횡비 기준 (세로/가로 비율이 이 값보다 크면 접기)
// 다이버리: 1080/1920 = 0.56, ARCHEIVE: 32768/2675 = 12.25
const ASPECT_RATIO_THRESHOLD = 1.0

// 접힌 상태에서 보여줄 최대 높이
const COLLAPSED_HEIGHT = 650

// 확장 가능한 이미지 컴포넌트
const ExpandableImage = ({ src, alt }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsExpand, setNeedsExpand] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imgRef = useRef(null)

  const handleLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current
      const aspectRatio = naturalHeight / naturalWidth
      if (aspectRatio > ASPECT_RATIO_THRESHOLD) {
        setNeedsExpand(true)
      }
    }
    setIsLoading(false)
  }

  return (
    <span className={`expandable-image-container ${needsExpand && !isExpanded ? 'collapsed' : ''}`}>
      {isLoading && (
        <span className="image-loading-container"></span>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        style={{
          ...(needsExpand && !isExpanded ? { maxHeight: `${COLLAPSED_HEIGHT}px` } : {}),
          ...(isLoading ? { opacity: 0, position: 'absolute' } : { opacity: 1 })
        }}
      />
      {needsExpand && !isExpanded && !isLoading && (
        <span className="image-expand-overlay">
          <button className="image-expand-btn" onClick={() => setIsExpanded(true)}>
            더보기
          </button>
        </span>
      )}
      {needsExpand && isExpanded && (
        <button className="image-collapse-btn" onClick={() => setIsExpanded(false)}>
          접기
        </button>
      )}
    </span>
  )
}

function Portfolio({ onClose, isWindow = false, onClick, zIndex, deviceType = 'desktop' }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [expandedFolders, setExpandedFolders] = useState(['root', 'docs'])
  const [selectedFile, setSelectedFile] = useState('overview')
  const isMobile = deviceType === 'mobile'
  const isTablet = deviceType === 'tablet'

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
    let windowWidth, windowHeight
    const aspectRatio = 900 / 650

    if (isTablet) {
      // 태블릿: 60% 크기
      windowWidth = 900 * 0.6 // 540px
      windowHeight = 650 * 0.6 // 390px

      if (windowWidth > window.innerWidth * 0.9) {
        windowWidth = window.innerWidth * 0.9
        windowHeight = windowWidth / aspectRatio
      }
      if (windowHeight > window.innerHeight * 0.85) {
        windowHeight = window.innerHeight * 0.85
        windowWidth = windowHeight * aspectRatio
      }
    } else {
      windowWidth = 900
      windowHeight = 650
    }

    setSize({ width: windowWidth, height: windowHeight })
    setPrevSize({ width: windowWidth, height: windowHeight })
    const centerX = (window.innerWidth - windowWidth) / 2
    const centerY = (window.innerHeight - windowHeight) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [isTablet])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      setExpandedFolders(['root', 'docs'])
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

  // VS Code Tree Structure with folders
  const treeFiles = selectedProject ? [
    {
      id: 'docs',
      name: 'docs',
      type: 'folder',
      children: [
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
          id: 'troubleshooting',
          name: 'TROUBLESHOOTING.md',
          icon: '🔧',
          type: 'file'
        },
        ...(selectedProject.retrospective ? [{
          id: 'retrospective',
          name: 'RETROSPECTIVE.md',
          icon: '📝',
          type: 'file'
        }] : [])
      ]
    },
    ...(selectedProject.dependencies ? [{
      id: 'config',
      name: 'config',
      type: 'folder',
      children: [
        {
          id: 'skills',
          name: 'build.gradle',
          icon: '',
          type: 'file'
        }
      ]
    }] : []),
    ...(selectedProject.github ? [{
      id: 'github-folder',
      name: 'repository',
      type: 'folder',
      children: [
        {
          id: 'github',
          name: '.git',
          icon: '🔗',
          type: 'file'
        },
        {
          id: 'contribution',
          name: 'CONTRIBUTION.md',
          icon: '✍️',
          type: 'file'
        }
      ]
    }] : []),
    ...(selectedProject.award ? [{
      id: 'awards-folder',
      name: 'awards',
      type: 'folder',
      children: [
        {
          id: 'award',
          name: 'AWARD.txt',
          icon: '🏆',
          type: 'file'
        }
      ]
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
              <span className="file-name">README.md</span>
            </div>
            <div className="file-body markdown-content">
              <ReactMarkdown
                components={{
                  img: ({ src, alt }) => <ExpandableImage src={src} alt={alt} />
                }}
              >{selectedProject.overview}</ReactMarkdown>
            </div>
          </div>
        )

      case 'team':
        // Parse team string like "5명 (백엔드 2명, iOS 3명)"
        const parseTeam = (teamStr) => {
          if (!teamStr) return { total: 0, roles: [] }
          const totalMatch = teamStr.match(/(\d+)명/)
          const total = totalMatch ? parseInt(totalMatch[1]) : 0
          const rolesMatch = teamStr.match(/\(([^)]+)\)/)
          if (!rolesMatch) return { total, roles: [] }
          const roles = rolesMatch[1].split(',').map(r => {
            const match = r.trim().match(/(.+?)\s*(\d+)명/)
            return match ? { name: match[1].trim(), count: parseInt(match[2]) } : null
          }).filter(Boolean)
          return { total, roles }
        }

        const teamData = parseTeam(selectedProject.team)

        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-name">TEAM.md</span>
            </div>
            <div className="file-body">
              {teamData.total > 0 ? (
                <div className="team-container">
                  <div className="team-header">
                    <span className="team-total">{teamData.total}</span>
                    <span className="team-label">Members</span>
                  </div>
                  <div className="team-list">
                    {teamData.roles.map((role, idx) => (
                      <div key={idx} className="team-item">
                        <span className="team-role">{role.name}</span>
                        <span className="team-count">{role.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="team-empty">팀 정보가 없습니다</div>
              )}
            </div>
          </div>
        )

      case 'skills':
        // dependencies 필드가 있으면 그대로 사용
        if (selectedProject.dependencies) {
          const highlightCode = (code) => {
            return code.split('\n').map((line, idx) => {
              // 주석 처리
              if (line.trim().startsWith('//')) {
                return <span key={idx}><span className="code-comment">{line}</span>{'\n'}</span>
              }
              // 키워드와 문자열 하이라이트
              const highlighted = line
                .replace(/(dependencies|implementation|runtimeOnly|compileOnly|testImplementation|testRuntimeOnly|annotationProcessor)\s/g, '<keyword>$1</keyword> ')
                .replace(/'([^']+)'/g, '<string>\'$1\'</string>')
                .replace(/\/\/(.*)$/g, '<comment>//$1</comment>')

              const parts = highlighted.split(/(<keyword>|<\/keyword>|<string>|<\/string>|<comment>|<\/comment>)/)
              let inKeyword = false
              let inString = false
              let inComment = false

              return (
                <span key={idx}>
                  {parts.map((part, i) => {
                    if (part === '<keyword>') { inKeyword = true; return null }
                    if (part === '</keyword>') { inKeyword = false; return null }
                    if (part === '<string>') { inString = true; return null }
                    if (part === '</string>') { inString = false; return null }
                    if (part === '<comment>') { inComment = true; return null }
                    if (part === '</comment>') { inComment = false; return null }
                    if (inKeyword) return <span key={i} className="code-keyword">{part}</span>
                    if (inString) return <span key={i} className="code-string">{part}</span>
                    if (inComment) return <span key={i} className="code-comment">{part}</span>
                    return part
                  })}
                  {'\n'}
                </span>
              )
            })
          }

          return (
            <div className="file-content">
              <div className="file-header">
                <span className="file-name">build.gradle</span>
              </div>
              <div className="file-body">
                <div className="code-block">
                  <pre className="gradle-code">
                    <code>{highlightCode(selectedProject.dependencies)}</code>
                  </pre>
                </div>
              </div>
            </div>
          )
        }

        // dependencies 필드가 없으면 기본 메시지
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-name">build.gradle</span>
            </div>
            <div className="file-body">
              <div className="code-block">
                <pre className="gradle-code">
                  <code>
                    <span className="code-comment">// No dependencies specified</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )

      case 'troubleshooting':
        const troubleshootingContent = typeof selectedProject.troubleshooting === 'string'
          ? selectedProject.troubleshooting
          : selectedProject.troubleshooting.map((item, idx) => `${idx + 1}. ${item}`).join('\n\n')

        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-name">TROUBLESHOOTING.md</span>
            </div>
            <div className="file-body markdown-content">
              <ReactMarkdown>{troubleshootingContent}</ReactMarkdown>
            </div>
          </div>
        )

      case 'github':
        return (
          <div className="file-content">
            <div className="file-header">
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
        const awardData = selectedProject.award
        if (!awardData) return null

        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-name">AWARD.txt</span>
            </div>
            <div className="file-body">
              {typeof awardData === 'string' ? (
                <pre>{awardData}</pre>
              ) : (
                <div className="award-content">
                  <p className="award-name">{awardData.name}</p>
                  <p className="award-from">수여 기관: {awardData.from}</p>
                  {awardData.url && (
                    <a href={awardData.url} target="_blank" rel="noopener noreferrer" className="award-link">
                      증명서 확인하기
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case 'contribution':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-name">CONTRIBUTION.md</span>
            </div>
            <div className="file-body markdown-content">
              <ReactMarkdown>{selectedProject.contribution || '담당 업무 및 기여도:\n\n프로젝트에서 수행한 작업과 기여한 내용을 작성합니다.'}</ReactMarkdown>
            </div>
          </div>
        )

      case 'retrospective':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-name">RETROSPECTIVE.md</span>
            </div>
            <div className="file-body markdown-content">
              <ReactMarkdown>{selectedProject.retrospective || '프로젝트 회고록을 작성해주세요.'}</ReactMarkdown>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // TreeItem component
  const TreeItem = ({ file, isSelected, onClick, level = 0 }) => {
    const isFolderExpanded = file.type === 'folder' && expandedFolders.includes(file.id)

    const handleClick = (e) => {
      e.stopPropagation()
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
      <>
        <div
          className={`tree-item ${isSelected ? 'tree-item-selected' : ''} ${file.type === 'folder' ? 'tree-item-folder' : ''}`}
          onClick={handleClick}
          style={{ paddingLeft: `${8 + level * 16}px` }}
        >
          {file.type === 'folder' && (
            <>
              <span className="tree-item-arrow">
                {isFolderExpanded ? '▼' : '▶'}
              </span>
              <span className="tree-item-icon">
                {isFolderExpanded ? '📂' : '📁'}
              </span>
            </>
          )}
          <span className="tree-item-name">{file.name}</span>
        </div>
        {file.type === 'folder' && isFolderExpanded && file.children && (
          <div className="tree-folder-children">
            {file.children.map((child) => (
              <TreeItem
                key={child.id}
                file={child}
                isSelected={selectedFile === child.id}
                onClick={() => setSelectedFile(child.id)}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </>
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
              onTouchEnd={(e) => {
                e.preventDefault()
                setSelectedProject(item)
              }}
            >
              {item.award && (
                <div className="award-sticker">
                  {typeof item.award === 'string' ? item.award : item.award.name}
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

      {selectedProject && !isMobile && (
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
                        level={0}
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

      {selectedProject && isMobile && (
        <div className="mobile-project-modal" onClick={() => setSelectedProject(null)}>
          <div className="mobile-project-content" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Header */}
            <div className="mobile-project-header">
              <h2>{selectedProject.title}</h2>
              <button className="mobile-close-btn" onClick={() => setSelectedProject(null)}>
                ✕
              </button>
            </div>

            {/* Mobile Scrollable Content */}
            <div className="mobile-project-body">
              <div className="mobile-project-period">{selectedProject.period}</div>

              {/* Overview Section */}
              <section className="mobile-section">
                <h3 className="mobile-section-title">프로젝트 개요</h3>
                <div className="mobile-section-content markdown-content">
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => <ExpandableImage src={src} alt={alt} />
                    }}
                  >{selectedProject.overview}</ReactMarkdown>
                </div>
              </section>

              {/* Team Section */}
              {selectedProject.team && (
                <section className="mobile-section">
                  <h3 className="mobile-section-title">팀 구성</h3>
                  <div className="mobile-section-content">
                    <pre>{selectedProject.team}</pre>
                  </div>
                </section>
              )}

              {/* Skills Section */}
              <section className="mobile-section">
                <h3 className="mobile-section-title">기술 스택</h3>
                <div className="mobile-section-content">
                  <pre>{JSON.stringify({ dependencies: selectedProject.skills }, null, 2)}</pre>
                </div>
              </section>

              {/* Troubleshooting Section */}
              <section className="mobile-section">
                <h3 className="mobile-section-title">트러블슈팅</h3>
                <div className="mobile-section-content markdown-content">
                  <ReactMarkdown>{typeof selectedProject.troubleshooting === 'string'
                    ? selectedProject.troubleshooting
                    : selectedProject.troubleshooting.map((item, idx) => `${idx + 1}. ${item}`).join('\n\n')}</ReactMarkdown>
                </div>
              </section>

              {/* GitHub Section */}
              {selectedProject.github && (
                <section className="mobile-section">
                  <h3 className="mobile-section-title">GitHub</h3>
                  <div className="mobile-section-content">
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="mobile-github-link">
                      {selectedProject.github}
                    </a>
                  </div>
                </section>
              )}

              {/* Award Section */}
              {selectedProject.award && (
                <section className="mobile-section">
                  <h3 className="mobile-section-title">수상</h3>
                  <div className="mobile-section-content">
                    {typeof selectedProject.award === 'string' ? (
                      <pre>{selectedProject.award}</pre>
                    ) : (
                      <div className="award-content">
                        <p className="award-name">{selectedProject.award.name}</p>
                        <p className="award-from">수여 기관: {selectedProject.award.from}</p>
                        {selectedProject.award.url && (
                          <a href={selectedProject.award.url} target="_blank" rel="noopener noreferrer" className="award-link">
                            증명서 확인하기
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio
