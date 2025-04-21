import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useMemo, useEffect, useState } from 'react'
const ANIMATION_DELAY = 2000

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const strArray = useMemo(
    () => ['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e'],
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, ANIMATION_DELAY)
    return () => clearTimeout(timer) // Cleanup timeout on unmount
  }, [])

  return (
    <>
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
            I am interested in freelance opportunities, especially ambitious or large projects. 
            However, if you have other requests or questions, don't hesitate to contact me using the form below.
          </p>
          <div className="contact-form">
            <form>
              <div className="text-fields">
                <input type="text" className="text-input name-input" placeholder="Name"  required/>
                <input type="text" className="text-input subject-input" placeholder="Subject" required/>
                <input type="email" className="text-input email-input" placeholder="Email" required/>
                <input type="text" className="text-input phone-input" placeholder="Phone Number" />
                <textarea className="text-input message-input" placeholder="Enter Message" required></textarea>
              </div>
                <button type="submit" className="flat-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
