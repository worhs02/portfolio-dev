import React, { useState, useEffect } from 'react'
import './LoginScreen.css'

function LoginScreen({ onLogin }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = () => {
    const loginScreen = document.querySelector('.login-screen')
    loginScreen.style.opacity = '0'
    setTimeout(() => {
      onLogin()
    }, 500)
  }

  return (
    <div className="login-screen">
      <div className="login-background"></div>

      {/* 중앙 상단 시계 */}
      <div className="login-clock">
        <div className="clock-time">
          {currentTime.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </div>
        <div className="clock-date">
          {currentTime.toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}
        </div>
      </div>

      {/* 중앙 프로필 */}
      <div className="login-container">
        <div className="login-profile">
          <div className="profile-avatar" onClick={handleLogin}>
            <div className="avatar-circle">
              <span className="avatar-emoji">👨‍💻</span>
            </div>
          </div>

          <h1 className="profile-name">Song Jaegon</h1>

          <div className="profile-subtitle">
            Backend Developer
          </div>

          <div className="profile-info">
            <div className="info-item">
              <span className="info-icon">💻</span>
              <span className="info-text">Spring Boot · MySQL</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎓</span>
              <span className="info-text">Artificial Intelligence Student</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <span className="info-text">Seoul, Korea</span>
            </div>
          </div>

          <button className="login-arrow-button" onClick={handleLogin}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </button>

          <div className="profile-hint">
            클릭하여 포트폴리오 탐색하기
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
