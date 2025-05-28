import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState, useMemo } from 'react'
import TechCube from './TechCube'
import { motion, useSpring } from 'framer-motion'

const ANIMATION_DELAY = 3000

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = useMemo(() => ['A', 'b', 'o', 'u', 't', ' ', 'm', 'e'], [])

  const springConfig = { damping: 20, stiffness: 100 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

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
          <div className="text-content">
            <p>
              I'm a passionate web developer with a knack for creating dynamic
              and responsive web applications. I have a strong foundation in
              both front-end and back-end technologies, allowing me to build
              complete solutions.
            </p>
            <p>
              I thrive in collaborative environments and enjoy working with
              teams to bring ideas to life. My goal is to continuously learn and
              adapt to new challenges in the ever-evolving tech landscape.
            </p>
            <p>
              I am particularly interested in the intersection of technology and
              design, and I strive to create user-friendly experiences that are
              both functional and aesthetically pleasing.
            </p>
            <p>
              If you're looking for a dedicated and skilled developer to join
              your team, feel free to reach out!
            </p>
          </div>
        </div>
        <div className="cube-zone">
          <motion.div
            className="cube-card"
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
            <TechCube />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About
