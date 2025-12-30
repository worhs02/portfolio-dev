import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">✦ 아진</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#blog">Blog</a>
          <a href="#contact" className="say-hi">Say Hi</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
