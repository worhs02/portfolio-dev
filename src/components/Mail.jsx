import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './Mail.css'

function Mail({ onClose, onClick, zIndex, onMinimize }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 900, height: 650 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevSize, setPrevSize] = useState({ width: 900, height: 650 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const resizeStartWindowPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)

  const [viewMode, setViewMode] = useState('inbox') // 'inbox' or 'compose'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState(null)

  // 받은편지함 메시지들
  const inboxMessages = [
    {
      id: 1,
      from: 'Song Jaegon',
      subject: '안녕하세요',
      preview: '포트폴리오를 방문해주셔서 감사합니다. 궁금하신 점이 있으시면 언제든 연락주세요.',
      date: '2024-01-01',
      content: `안녕하세요!

제 포트폴리오를 방문해주셔서 진심으로 감사드립니다.

저는 열정적인 개발자로, 새로운 기술을 배우고 도전하는 것을 즐깁니다.
프로젝트나 채용 제안, 혹은 단순한 질문이라도 편하게 연락주시면 감사하겠습니다.

빠른 시일 내에 답변드리겠습니다.

감사합니다.
Song Jaegon`
    },
    {
      id: 2,
      from: 'Song Jaegon',
      subject: '채용 제안 환영합니다',
      preview: '새로운 기회를 찾고 있습니다. 함께 성장할 수 있는 팀을 만나고 싶습니다.',
      date: '2024-01-02',
      content: `채용 담당자님께,

새로운 도전과 성장의 기회를 찾고 있습니다.

저는 다음과 같은 환경에서 최고의 성과를 낼 수 있습니다:
- 협업과 소통을 중시하는 팀
- 기술적 도전이 있는 프로젝트
- 지속적인 학습과 성장을 지원하는 문화

채용이나 프로젝트 협업에 관심이 있으시다면 언제든 연락주세요.

기대하겠습니다.
Song Jaegon`
    },
    {
      id: 3,
      from: 'Song Jaegon',
      subject: '프로젝트 협업',
      preview: '흥미로운 프로젝트가 있으시다면 함께하고 싶습니다.',
      date: '2024-01-03',
      content: `프로젝트 협업 제안을 환영합니다.

관심 분야:
- 웹 애플리케이션 개발
- 사용자 경험 개선
- 새로운 기술 스택 도전

함께 의미있는 결과물을 만들어가고 싶습니다.
아이디어나 제안이 있으시다면 편하게 연락주세요.

감사합니다.
Song Jaegon`
    }
  ]

  const [selectedMessage, setSelectedMessage] = useState(null)
  const [readMessages, setReadMessages] = useState(new Set()) // 읽은 메시지 ID 저장

  // 메시지 선택 시 읽음 처리
  const handleSelectMessage = (message) => {
    setSelectedMessage(message)
    setReadMessages(prev => new Set([...prev, message.id]))
  }

  // 초기 중앙 배치
  useEffect(() => {
    const centerX = (window.innerWidth - 900) / 2
    const centerY = (window.innerHeight - 650) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [])

  // 타이틀바 드래그
  useEffect(() => {
    const titlebar = windowRef.current?.querySelector('.mail-titlebar')
    if (!titlebar) return

    const handleMouseDown = (e) => {
      if (e.target.closest('.mail-controls')) return
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
          newWidth = Math.max(600, resizeStartSize.current.width + deltaX)
        }
        if (resizeDirection.includes('w')) {
          const potentialWidth = resizeStartSize.current.width - deltaX
          if (potentialWidth >= 600) {
            newWidth = potentialWidth
            newX = resizeStartWindowPos.current.x + deltaX
          }
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(400, resizeStartSize.current.height + deltaY)
        }
        if (resizeDirection.includes('n')) {
          const potentialHeight = resizeStartSize.current.height - deltaY
          if (potentialHeight >= 400) {
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
    const titlebar = windowRef.current?.querySelector('.mail-titlebar')
    if (titlebar) {
      titlebar.style.cursor = isDragging ? 'grabbing' : 'grab'
    }
  }, [isDragging])

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setSendError(null)

    try {
      // EmailJS 설정
      // 아래 값들을 실제 EmailJS 계정의 값으로 교체해야 합니다
      // 1. https://www.emailjs.com/ 에서 계정 생성
      // 2. Email Service 추가 (Gmail, Outlook 등)
      // 3. Email Template 생성
      // 4. 아래 값들을 복사해서 입력

      const serviceId = 'service_8w7lffp'  // EmailJS Service ID
      const templateId = 'template_oiyb85b'  // EmailJS Template ID
      const publicKey = 'tFKKir50d-uJQEX96'  // EmailJS Public Key

      // EmailJS로 이메일 전송
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'setiguy@gachon.ac.kr'
        },
        publicKey
      )

      console.log('Email sent successfully:', result)
      setIsSending(false)
      setSendSuccess(true)

      // 3초 후 폼 초기화 및 받은편지함으로 이동
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setSendSuccess(false)
        setViewMode('inbox')
      }, 3000)
    } catch (error) {
      console.error('Email send failed:', error)
      setIsSending(false)
      setSendError('이메일 전송에 실패했습니다. EmailJS 설정을 확인해주세요.')

      // 5초 후 에러 메시지 제거
      setTimeout(() => {
        setSendError(null)
      }, 5000)
    }
  }

  return (
    <div
      ref={windowRef}
      className={`mail-window ${isDragging ? 'dragging' : ''} ${isMaximized ? 'maximized' : ''}`}
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

      <div className="mail-titlebar">
        <div className="mail-controls">
          <span className="mail-btn close" onClick={onClose}></span>
          <span className="mail-btn minimize" onClick={onMinimize}></span>
          <span className="mail-btn maximize" onClick={handleMaximize}></span>
        </div>
      </div>

      <div className="mail-toolbar">
        <div className="toolbar-spacer"></div>
        <button className="compose-btn" onClick={() => setViewMode('compose')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          메시지 작성
        </button>
      </div>

      <div className="mail-content">
        {viewMode === 'compose' ? (
          sendSuccess ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>소중한 메시지 잘 받았습니다!</h2>
              <p>빠른 시일 내에 답변드리겠습니다.</p>
            </div>
          ) : (
            <div className="compose-view">
              <div className="compose-header">
                <h2>새 메시지</h2>
                <button className="close-compose-btn" onClick={() => setViewMode('inbox')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <form className="mail-form" onSubmit={handleSend}>
                {sendError && (
                  <div className="error-message">
                    <strong>⚠️ {sendError}</strong>
                  </div>
                )}
                <div className="form-field">
                  <label>받는 사람</label>
                  <input
                    type="text"
                    value="setiguy@gachon.ac.kr"
                    readOnly
                    className="readonly-input"
                  />
                </div>

                <div className="form-field">
                  <label>성함</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="성함을 입력해주세요"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>이메일 주소</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일 주소를 입력해주세요"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>문의 제목</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="문의하실 내용의 제목을 입력해주세요"
                    required
                  />
                </div>

                <div className="form-field message-field">
                  <label>문의 내용</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="문의하실 내용을 자세히 작성해주세요"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="send-btn" disabled={isSending}>
                    {isSending ? (
                      <>
                        <span className="spinner"></span>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        전송
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )
        ) : (
          <div className="mail-layout">
            {/* 사이드바 */}
            <div className="mail-sidebar">
              <div className="sidebar-section">
                <div className="sidebar-item active">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>받은편지함</span>
                  <span className="count">{inboxMessages.filter(m => !readMessages.has(m.id)).length}</span>
                </div>
              </div>
            </div>

            {/* 메시지 목록 */}
            <div className="message-list-pane">
              <div className="inbox-list">
                {inboxMessages.map(message => {
                  const isUnread = !readMessages.has(message.id)
                  const isSelected = selectedMessage?.id === message.id
                  return (
                    <div
                      key={message.id}
                      className={`inbox-item ${isUnread ? 'unread' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <div className="inbox-item-header">
                        <div className="inbox-from-wrapper">
                          {isUnread && <span className="unread-dot"></span>}
                          <span className="inbox-from">{message.from}</span>
                        </div>
                        <span className="inbox-date">{message.date}</span>
                      </div>
                      <div className="inbox-subject">{message.subject}</div>
                      <div className="inbox-preview">{message.preview}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 메시지 상세 보기 */}
            <div className="message-detail-pane">
              {selectedMessage ? (
                <div className="message-detail">
                  <div className="message-header">
                    <h2>{selectedMessage.subject}</h2>
                    <div className="message-meta">
                      <div className="from-info">
                        <div className="avatar">{selectedMessage.from.charAt(0)}</div>
                        <div>
                          <div className="from-name">{selectedMessage.from}</div>
                          <div className="from-email">setiguy@gachon.ac.kr</div>
                        </div>
                      </div>
                      <span className="date">{selectedMessage.date}</span>
                    </div>
                  </div>
                  <div className="message-body">
                    {selectedMessage.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-message-selected">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <p>메시지를 선택해주세요</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mail
