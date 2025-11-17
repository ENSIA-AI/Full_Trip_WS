import '../F-Stiling/F-backs.css'
import { useState, useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Fbacks() {
  const [expandedItems, setExpandedItems] = useState([0]);

  function showDetails(index) {
    setExpandedItems((prev) => {
      return (prev.includes(index) ? [] : [index])
    })
  }

  const feedbacks = [
    {
      summary: 'The booking process was fast and easy to navigate.',
      details: 'I’ve used several travel websites before, but this one stands out for its clean interface and speed. I was able to compare destinations, manage my budget, and confirm all reservations within minutes. The confirmation emails and reminders were timely and professional.'
    },
    {
      summary: 'Perfect for solo travelers looking for new adventures.',
      details: 'As someone who travels alone often, I appreciated how safe and structured everything felt. The app suggested unique spots off the beaten path, helped me connect with other travelers, and made sure all bookings were verified. I discovered more in five days than I did on my previous two trips combined.'
    },
    {
      summary: 'A truly reliable service for planning group trips!',
      details: 'We planned a university trip for eight people, and I expected chaos — but everything went perfectly. The platform handled multiple travelers, provided budget tracking, and even suggested places that fit everyone’s preferences. Customer support responded in under 10 minutes every time.'
    },
    {
      summary: 'Absolutely loved my trip to Santorini — everything was organized perfectly!',
      details: 'From the moment I booked through this platform, everything went smoothly. The hotel recommendations were spot-on, and the itinerary suggestions saved me hours of research. I even got a local guide who made the experience unforgettable. Definitely using this service again!'
    }
  ]

  useEffect(() => {
    Aos.init({ duration: 1000 });
  })


  return (
    <div className="feedback-section">
      <div className="some-feedbacks">
        <h1 data-aos='fade-up' >Some Of Our Client Feedbacks</h1>
        <ul>
          {feedbacks.map((feedback, index) => (
            <li data-aos='fade-up' key={index}>
              <p style={{
                borderRadius: expandedItems.includes(index) ? '15px 15px 0 0' : '15px'
              }}>
                {feedback.summary}
                <button id='btn' onClick={() => showDetails(index)}>
                  {expandedItems.includes(index) ?
                    <i id='app-arrow' class='bxr  bx-arrow-up-stroke-circle'  ></i>
                    : <i class='bxr  bx-arrow-down-circle'></i>}
                </button>
              </p>
              <small className={
                expandedItems.includes(index) ? 'expand' : 'minimize'
              }>{feedback.details}</small>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-feedback">
        <h1 data-aos='fade-up'>Add Feedback Here:</h1>
        <p data-aos='fade-up'>Please fill the form below with your feedbacks.</p>
        <form>
          <input data-aos='fade-up-left' placeholder='Enter email address' required />
          <textarea data-aos='fade-up-left' placeholder='Enter your Feedbacks here' required />
          <button data-aos='fade-up-left'>Submit Feedback</button>
        </form>
      </div>
    </div >
  )
}
