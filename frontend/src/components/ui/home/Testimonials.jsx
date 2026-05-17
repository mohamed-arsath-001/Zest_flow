import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: "ZestTea completely transformed our operational workflows. Their AI integration saved us countless hours and significantly boosted our bottom line.",
      name: "Sarah Jenkins",
      role: "COO, Nexus Tech"
    },
    {
      quote: "The strategic approach and technical depth they bring to the table is unmatched. They didn't just build a solution; they built a scalable engine for our growth.",
      name: "David Chen",
      role: "Founder, Elevate Marketing"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <blockquote className="testimonial-quote">
              "{testimonial.quote}"
            </blockquote>
            <div className="testimonial-author">
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
