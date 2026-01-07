import React, { useState, useEffect } from 'react'
import './LoginScreen.css'

function LoginScreen({ onLogin }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timeOfDay, setTimeOfDay] = useState('day')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
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

  const handleLogin = () => {
    const loginScreen = document.querySelector('.login-screen')
    loginScreen.style.opacity = '0'
    setTimeout(() => {
      onLogin()
    }, 500)
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
    <div className="login-screen">
      <div className="login-background" style={getBackgroundStyle()}></div>

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
              <span className="info-icon">📍</span>
              <span className="info-text">Seoul, Korea</span>
            </div>
            <div className="info-item">
              <span className="info-text">Spring Boot · MySQL</span>
            </div>
            <div className="info-item">
              <span className="info-text">Artificial Intelligence Student</span>
            </div>
          </div>

          <div className="profile-hint" onClick={handleLogin}>
            클릭하여 포트폴리오 탐색하기
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
