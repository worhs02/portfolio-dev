import React, { useState } from 'react'
import Desktop from './components/Desktop'
import LoginScreen from './components/LoginScreen'
import './App.css'

function DesktopTest() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <div className="App">
      {!isLoggedIn && <LoginScreen onLogin={handleLogin} />}
      <Desktop />
    </div>
  )
}

export default DesktopTest
