import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import { portfolioItems } from '../data/portfolioData'

function Portfolio({ onClose, isWindow = false }) {
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [expandedFolders, setExpandedFolders] = useState(['root'])
  const [selectedFile, setSelectedFile] = useState(null)
  const displayedItems = showAll ? portfolioItems : portfolioItems.slice(0, 4)

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      setExpandedFolders(['root'])
      setSelectedFile('overview')
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  // VS Code Tree Structure
  const treeFiles = selectedProject ? [
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
      id: 'skills',
      name: 'package.json',
      icon: '📦',
      type: 'file'
    },
    {
      id: 'troubleshooting',
      name: 'TROUBLESHOOTING.md',
      icon: '🔧',
      type: 'file'
    },
    ...(selectedProject.github ? [{
      id: 'github',
      name: '.git',
      icon: '🔗',
      type: 'folder'
    }] : []),
    ...(selectedProject.award ? [{
      id: 'award',
      name: 'AWARD.txt',
      icon: '🏆',
      type: 'file'
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
              <span className="file-icon">📄</span>
              <span className="file-name">README.md</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.overview}</pre>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">👥</span>
              <span className="file-name">TEAM.md</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.team}</pre>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">📦</span>
              <span className="file-name">package.json</span>
            </div>
            <div className="file-body">
              <pre>{JSON.stringify({ dependencies: selectedProject.skills }, null, 2)}</pre>
            </div>
          </div>
        )

      case 'troubleshooting':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">🔧</span>
              <span className="file-name">TROUBLESHOOTING.md</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.troubleshooting.map((item, idx) => `${idx + 1}. ${item}`).join('\n\n')}</pre>
            </div>
          </div>
        )

      case 'github':
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">🔗</span>
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
        return (
          <div className="file-content">
            <div className="file-header">
              <span className="file-icon">🏆</span>
              <span className="file-name">AWARD.txt</span>
            </div>
            <div className="file-body">
              <pre>{selectedProject.award}</pre>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // TreeItem component
  const TreeItem = ({ file, isSelected, onClick }) => {
    const isFolderExpanded = file.type === 'folder' && expandedFolders.includes(file.id)

    const handleClick = () => {
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
      <div
        className={`tree-item ${isSelected ? 'tree-item-selected' : ''}`}
        onClick={handleClick}
      >
        <span className="tree-item-icon">
          {file.type === 'folder' ? (isFolderExpanded ? '📂' : '📁') : file.icon}
        </span>
        <span className="tree-item-name">{file.name}</span>
      </div>
    )
  }


  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="finder-window">
          <div className="finder-titlebar">
            <div className="finder-controls">
              <span
                className="finder-btn close"
                onClick={onClose}
              ></span>
              <span className="finder-btn minimize"></span>
              <span className="finder-btn maximize"></span>
            </div>
            <div className="finder-title">My Portfolio</div>
          </div>

          <div className="finder-content">
            <div className="portfolio-grid">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-card"
              onClick={() => setSelectedProject(item)}
            >
              {item.award && (
                <div className="award-sticker">
                  {item.award}
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

            {portfolioItems.length > 4 && (
              <div className="portfolio-more">
                <button
                  className="more-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? '접기 ↑' : '더보기 ↓'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProject && (
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
    </section>
  )
}

export default Portfolio
