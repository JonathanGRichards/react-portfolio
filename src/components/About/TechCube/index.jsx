import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNodeJs,
  faReact,
  faHtml5,
  faJsSquare,
  faCss3,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons'
import './index.scss'

const TechCube = () => {
  // Use CSS custom properties for responsive sizing
  const faces = [
    {
      icon: faNodeJs,
      color: '#DD0031',
      transform: `translateZ(var(--cube-half-size))`,
    },
    {
      icon: faHtml5,
      color: '#F06529',
      transform: `rotateY(90deg) translateZ(var(--cube-half-size))`,
    },
    {
      icon: faCss3,
      color: '#28A4D9',
      transform: `rotateY(180deg) translateZ(var(--cube-half-size))`,
    },
    {
      icon: faReact,
      color: '#5ED4F4',
      transform: `rotateY(-90deg) translateZ(var(--cube-half-size))`,
    },
    {
      icon: faJsSquare,
      color: '#EFD81D',
      transform: `rotateX(90deg) translateZ(var(--cube-half-size))`,
    },
    {
      icon: faGitAlt,
      color: '#EC4D28',
      transform: `rotateX(-90deg) translateZ(var(--cube-half-size))`,
    },
  ]

  return (
    <div className="cube-container">
      <motion.div
        className="cube"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {faces.map((face, index) => (
          <motion.div
            key={index}
            className="face"
            style={{
              transform: face.transform,
            }}
          >
            <FontAwesomeIcon
              icon={face.icon}
              color={face.color}
              className="tech-icon"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechCube
