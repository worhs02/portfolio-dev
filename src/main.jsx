import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DesktopTest from './DesktopTest.jsx'
import './index.css'

const isAppMode = window.location.pathname.includes('/app')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAppMode ? <App /> : <DesktopTest />}
  </React.StrictMode>,
)
