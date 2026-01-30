import React, { useState, useEffect, useRef } from 'react'
import { portfolioItems, techStackData } from '../data/portfolioData'
import './Terminal.css'

function Terminal({ onClose, onClick, zIndex, onMinimize, deviceType = 'desktop' }) {
  const isMobile = deviceType === 'mobile'
  const isTablet = deviceType === 'tablet'
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 800, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 800, height: 600 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartWindowPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  const [input, setInput] = useState('')
  const [output, setOutput] = useState([
    { type: 'welcome', text: 'Welcome to Portfolio Terminal v1.0.0' },
    { type: 'info', text: 'Type "help" for available commands' },
    { type: 'prompt', text: '' }
  ])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    let windowWidth, windowHeight
    const aspectRatio = 800 / 600

    if (isTablet) {
      windowWidth = 800 * 0.6
      windowHeight = 600 * 0.6

      if (windowWidth > window.innerWidth * 0.9) {
        windowWidth = window.innerWidth * 0.9
        windowHeight = windowWidth / aspectRatio
      }
      if (windowHeight > window.innerHeight * 0.85) {
        windowHeight = window.innerHeight * 0.85
        windowWidth = windowHeight * aspectRatio
      }
    } else {
      windowWidth = 800
      windowHeight = 600
    }

    setSize({ width: windowWidth, height: windowHeight })
    setPrevSize({ width: windowWidth, height: windowHeight })
    const centerX = (window.innerWidth - windowWidth) / 2
    const centerY = (window.innerHeight - windowHeight) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [isTablet])

  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.terminal-titlebar')
    if (!titlebar) return

    const handleMouseDown = (e) => {
      if (e.target.closest('.terminal-controls')) return
      if (isMaximized) return

      setIsDragging(true)
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
    }

    titlebar.addEventListener('mousedown', handleMouseDown)
    return () => titlebar.removeEventListener('mousedown', handleMouseDown)
  }, [position, isMaximized])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragStartPos.current.x
      const newY = e.clientY - dragStartPos.current.y

      const maxX = window.innerWidth - size.width
      const maxY = window.innerHeight - size.height

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, size])

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - resizeStartPos.current.x
      const deltaY = e.clientY - resizeStartPos.current.y

      let newWidth = resizeStartSize.current.width
      let newHeight = resizeStartSize.current.height
      let newX = resizeStartWindowPos.current.x
      let newY = resizeStartWindowPos.current.y

      if (resizeDirection.includes('e')) newWidth += deltaX
      if (resizeDirection.includes('s')) newHeight += deltaY
      if (resizeDirection.includes('w')) {
        newWidth -= deltaX
        newX += deltaX
      }
      if (resizeDirection.includes('n')) {
        newHeight -= deltaY
        newY += deltaY
      }

      newWidth = Math.max(400, Math.min(newWidth, window.innerWidth))
      newHeight = Math.max(300, Math.min(newHeight, window.innerHeight))

      setSize({ width: newWidth, height: newHeight })
      if (resizeDirection.includes('w') || resizeDirection.includes('n')) {
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeDirection])

  const handleResizeStart = (direction, e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStartPos.current = { x: e.clientX, y: e.clientY }
    resizeStartSize.current = { ...size }
    resizeStartWindowPos.current = { ...position }
  }

  const handleMaximize = () => {
    if (isMaximized) {
      setSize(prevSize)
      setPosition(prevPosition)
      setIsMaximized(false)
    } else {
      setPrevSize(size)
      setPrevPosition(position)
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 })
      setPosition({ x: 0, y: 40 })
      setIsMaximized(true)
    }
  }

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    setHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    const newOutput = [...output, { type: 'command', text: `$ ${trimmedCmd}` }]

    const parts = trimmedCmd.split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    let result = []

    switch (command) {
      case 'help':
        result = [
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  help          - Show this help message' },
          { type: 'output', text: '  about         - About me' },
          { type: 'output', text: '  ls            - List all projects' },
          { type: 'output', text: '  cat <project> - Show project details' },
          { type: 'output', text: '  skills        - Show tech stack' },
          { type: 'output', text: '  github        - GitHub profile' },
          { type: 'output', text: '  contact       - Contact information' },
          { type: 'output', text: '  clear         - Clear terminal' }
        ]
        break

      case 'about':
        result = [
          { type: 'output', text: 'Backend Developer | Spring Boot Enthusiast' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Name: 송재곤 (worhs02)' },
          { type: 'output', text: 'Focus: Spring Boot, MySQL, AWS, GCP' },
          { type: 'output', text: 'Experience: UMC 7th, Multiple award-winning projects' }
        ]
        break

      case 'ls':
        result = [
          { type: 'output', text: `Total ${portfolioItems.length} projects:` },
          { type: 'output', text: '' },
          ...portfolioItems.map(p => ({
            type: 'output',
            text: `${p.emoji || '📁'} ${p.title.padEnd(20)} - ${p.skills?.[0] || 'N/A'}`
          }))
        ]
        break

      case 'cat':
        if (!args[0]) {
          result = [{ type: 'error', text: 'Usage: cat <project-name>' }]
        } else {
          const project = portfolioItems.find(p =>
            p.title.toLowerCase() === args.join(' ').toLowerCase()
          )
          if (project) {
            result = [
              { type: 'output', text: `${project.emoji} ${project.title}` },
              { type: 'output', text: '─'.repeat(50) },
              { type: 'output', text: `Team: ${project.team || 'Solo'}` },
              { type: 'output', text: `Skills: ${project.skills?.join(', ') || 'N/A'}` },
              { type: 'output', text: `GitHub: ${project.githubUrl || 'N/A'}` },
              ...(project.award ? [{ type: 'output', text: `🏆 ${project.award.name}` }] : [])
            ]
          } else {
            result = [{ type: 'error', text: `cat: ${args[0]}: No such project` }]
          }
        }
        break

      case 'skills':
        result = [
          { type: 'output', text: 'Tech Stack:' },
          { type: 'output', text: '' },
          ...techStackData.map(skill => ({
            type: 'output',
            text: `${skill.name.padEnd(15)} ${'█'.repeat(Math.floor(skill.level / 10))}${'░'.repeat(10 - Math.floor(skill.level / 10))} ${skill.level}%`
          }))
        ]
        break

      case 'github':
        result = [
          { type: 'output', text: 'GitHub: https://github.com/worhs02' },
          { type: 'output', text: 'Repositories: 17 public repos' },
          { type: 'output', text: 'Followers: 5' }
        ]
        break

      case 'contact':
        result = [
          { type: 'output', text: 'Contact Information:' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Email: worhs02@gmail.com' },
          { type: 'output', text: 'GitHub: https://github.com/worhs02' }
        ]
        break

      case 'clear':
        setOutput([{ type: 'prompt', text: '' }])
        setInput('')
        return

      default:
        result = [{ type: 'error', text: `zsh: command not found: ${command}` }]
    }

    setOutput([...newOutput, ...result, { type: 'prompt', text: '' }])
    setInput('')

    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    }, 0)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    if (inputRef.current && !isMobile) {
      inputRef.current.focus()
    }
  }, [output, isMobile])

  if (isMobile) {
    return (
      <div
        className="terminal-window mobile"
        onClick={onClick}
        style={{ zIndex }}
      >
        <div className="terminal-titlebar">
          <div className="terminal-controls">
            <span className="terminal-dot terminal-close" onClick={onClose}></span>
            <span className="terminal-dot terminal-minimize" onClick={onMinimize}></span>
            <span className="terminal-dot terminal-maximize"></span>
          </div>
          <span className="terminal-title">Terminal</span>
        </div>
        <div className="terminal-content" ref={outputRef}>
          {output.map((line, i) => (
            <div key={i} className={`terminal-line ${line.type}`}>
              {line.type === 'prompt' ? (
                <div className="terminal-input-line">
                  <span className="terminal-prompt">$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              ) : (
                line.text
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={windowRef}
      className={`terminal-window ${isMaximized ? 'maximized' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        position: 'absolute'
      }}
      onClick={onClick}
    >
      <div className="terminal-titlebar">
        <div className="terminal-controls">
          <span className="terminal-dot terminal-close" onClick={onClose}></span>
          <span className="terminal-dot terminal-minimize" onClick={onMinimize}></span>
          <span className="terminal-dot terminal-maximize" onClick={handleMaximize}></span>
        </div>
        <span className="terminal-title">Terminal</span>
      </div>

      <div className="terminal-content" ref={outputRef}>
        {output.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.type === 'prompt' ? (
              <div className="terminal-input-line">
                <span className="terminal-prompt">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>

      {!isMaximized && (
        <>
          <div className="resize-handle n" onMouseDown={(e) => handleResizeStart('n', e)} />
          <div className="resize-handle s" onMouseDown={(e) => handleResizeStart('s', e)} />
          <div className="resize-handle e" onMouseDown={(e) => handleResizeStart('e', e)} />
          <div className="resize-handle w" onMouseDown={(e) => handleResizeStart('w', e)} />
          <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart('ne', e)} />
          <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart('nw', e)} />
          <div className="resize-handle se" onMouseDown={(e) => handleResizeStart('se', e)} />
          <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart('sw', e)} />
        </>
      )}
    </div>
  )
}

export default Terminal
