import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useMemo, useEffect, useState } from 'react'
import axios from 'axios'

const ANIMATION_DELAY = 2000

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const strArray = useMemo(
    () => ['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e'],
    []
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/send-email', formData);
      console.log('Response:', response);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, ANIMATION_DELAY)
    return () => clearTimeout(timer) // Cleanup timeout on unmount
  }, [])

  return (
    <div className="container contact-page">
      <div className="text-zone">
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={strArray}
            idx={15}
          />
        </h1>
        <p>
          I am interested in freelance opportunities, especially ambitious or
          large projects. However, if you have other requests or questions,
          don't hesitate to contact me using the form below.
        </p>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="text-fields">
              <input
                type="text"
                className="text-input name-input"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="text-input subject-input"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="text-input email-input"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="text-input message-input"
                placeholder="Enter Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="flat-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
