import React from 'react'
import './Testimonials.css'

function Testimonials() {
  const testimonials = [
    { id: 1, name: 'Client First Name' },
    { id: 2, name: 'Client Name' },
    { id: 3, name: 'Client Name' },
    { id: 4, name: 'Client Name' }
  ]

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials-title">
          Here's what my clients<br />
          are saying about my work
          <span className="new-badge">New!</span>
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p>"Design is a bridge that connects everyone and everything"</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>UX Designer, Company Name</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
