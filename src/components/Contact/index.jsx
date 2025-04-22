import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useMemo, useEffect, useState } from 'react'
import axios from 'axios'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const ANIMATION_DELAY = 2000

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const strArray = useMemo(
    () => ['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e'],
    []
  )

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 100 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post('http://localhost:5000/send-email', formData)
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const centerX = width / 2
    const centerY = height / 2

    rotateX.set((mouseY - centerY) / 20)
    rotateY.set((centerX - mouseX) / 20)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, ANIMATION_DELAY)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="contact-page">
      <div className="contact-container">
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
                />
              </div>
              <button
                type="submit"
                className="flat-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
        <div className="map-zone">
          <motion.div
            className="map-card"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              mass: 1,
              delay: 2,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <h2>Location</h2>
            <p>Based in Manchester, UK</p>
            <div className="map-container">
              <iframe
                title="Manchester Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19003.19315678912!2d-2.242835!3d53.4807593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
