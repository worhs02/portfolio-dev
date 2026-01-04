import React, { useState } from 'react'
import Desktop from './components/Desktop'
import LoginScreen from './components/LoginScreen'
import './App.css'

function DesktopTest() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      {!isLoggedIn && <LoginScreen onLogin={handleLogin} />}
      <Desktop onLogout={handleLogout} />
    </div>
  )
}

export default DesktopTest
