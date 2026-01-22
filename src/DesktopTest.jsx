import React, { useState } from 'react'
import Desktop from './components/Desktop'
import LoginScreen from './components/LoginScreen'
import BootScreen from './components/BootScreen'
import './App.css'

function DesktopTest() {
  const [bootState, setBootState] = useState('booting') // 'booting' | 'login' | 'desktop'

  const handleBootComplete = () => {
    setBootState('login')
  }

  const handleLogin = () => {
    setBootState('desktop')
  }

  const handleLogout = () => {
    setBootState('login')
  }

  return (
    <div className="App">
      {bootState === 'booting' && <BootScreen onBootComplete={handleBootComplete} />}
      {bootState === 'login' && <LoginScreen onLogin={handleLogin} />}
      <Desktop onLogout={handleLogout} />
    </div>
  )
}

export default DesktopTest
