import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState, useMemo } from 'react'
import TechCube from './TechCube'

const ANIMATION_DELAY = 3000

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = useMemo(() => ['A', 'b', 'o', 'u', 't', ' ', 'm', 'e'], [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, ANIMATION_DELAY)
    return () => clearTimeout(timer) // Cleanup timeout on unmount
  }, [])

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
          </h1>
          <p>
            I'm a passionate web developer with a knack for creating dynamic and
            responsive web applications. I have a strong foundation in both
            front-end and back-end technologies, allowing me to build complete
            solutions.
          </p>
          <p>
            I thrive in collaborative environments and enjoy working with teams
            to bring ideas to life. My goal is to continuously learn and adapt
            to new challenges in the ever-evolving tech landscape.
          </p>
          <p>
            I am particularly interested in the intersection of technology and
            design, and I strive to create user-friendly experiences that are
            both functional and aesthetically pleasing.
          </p>
          <p>
            If you're looking for a dedicated and skilled developer to join your
            team, feel free to reach out!
          </p>
        </div>
        <div className="cube-zone">
          <div className="cube-card">
            <TechCube />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
