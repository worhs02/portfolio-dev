import React, { useState } from 'react'
import './Services.css'

function Services() {
  const skills = [
    {
      id: 1,
      name: 'Java',
      description: 'Object-oriented programming language',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      color: '#007396',
      proficiency: 'Advanced',
      level: 90
    },
    {
      id: 2,
      name: 'Spring Boot',
      description: 'Java-based framework for backend development',
      image: 'https://cdn.simpleicons.org/springboot/6DB33F',
      color: '#6DB33F',
      proficiency: 'Advanced',
      level: 85
    },
    {
      id: 3,
      name: 'MySQL',
      description: 'Relational database management system',
      image: 'https://cdn.simpleicons.org/mysql/4479A1',
      color: '#4479A1',
      proficiency: 'Intermediate',
      level: 75
    },
    {
      id: 4,
      name: 'UIkit',
      description: 'Frontend UI framework',
      image: 'https://cdn.simpleicons.org/uikit/2396F3',
      color: '#2396F3',
      proficiency: 'Intermediate',
      level: 70
    },
    {
      id: 5,
      name: 'Android',
      description: 'Mobile app development with Java',
      image: 'https://cdn.simpleicons.org/android/3DDC84',
      color: '#3DDC84',
      proficiency: 'Intermediate',
      level: 65
    },
    {
      id: 6,
      name: 'AWS',
      description: 'Amazon Web Services cloud platform',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      color: '#FF9900',
      proficiency: 'Beginner',
      level: 50
    },
    {
      id: 7,
      name: 'GCP',
      description: 'Google Cloud Platform services',
      image: 'https://cdn.simpleicons.org/googlecloud/4285F4',
      color: '#4285F4',
      proficiency: 'Beginner',
      level: 45
    },
    {
      id: 8,
      name: 'Docker',
      description: 'Containerization platform',
      image: 'https://cdn.simpleicons.org/docker/2496ED',
      color: '#2496ED',
      proficiency: 'Intermediate',
      level: 60
    }
  ]

  const [selectedSkill, setSelectedSkill] = useState(skills[0])

  return (
    <section className="services">
      <div className="container">
        <div className="skills-showcase">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="url-bar">
              <span className="url-icon">🔒</span>
              <span className="url-text">Tech Stack & Skills ☺</span>
            </div>
          </div>
          <div className="window-content">
          <div className="main-skill-display">
            <div className="main-skill-image">
              <img src={selectedSkill.image} alt={selectedSkill.name} />
            </div>
            <div className="main-skill-info">
              <p className="skill-label">CURRENTLY SELECTED</p>
              <h3 className="skill-name">{selectedSkill.name}</h3>
              <p className="skill-description">{selectedSkill.description}</p>
            </div>
            <div className="skill-memo">
              <div className="memo-header">Proficiency</div>
              <div className="memo-level">{selectedSkill.proficiency}</div>
              <div className="memo-bar">
                <div className="memo-bar-fill" style={{ width: `${selectedSkill.level}%` }}></div>
              </div>
              <div className="memo-percentage">{selectedSkill.level}%</div>
            </div>
          </div>

          <div className="skills-grid">

            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`skill-card ${selectedSkill.id === skill.id ? 'active' : ''}`}
                onClick={() => setSelectedSkill(skill)}
              >
                <img src={skill.image} alt={skill.name} />
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
