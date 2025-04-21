import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngular,
  faReact,
  faHtml5,
  faJsSquare,
  faCss3,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons'
import './index.scss'

const TechCube = () => {
  const cubeSize = 200
  const faceSize = cubeSize
  const halfSize = cubeSize / 2

  const faces = [
    {
      icon: faAngular,
      color: '#DD0031',
      transform: `translateZ(${halfSize}px)`,
    },
    {
      icon: faHtml5,
      color: '#F06529',
      transform: `rotateY(90deg) translateZ(${halfSize}px)`,
    },
    {
      icon: faCss3,
      color: '#28A4D9',
      transform: `rotateY(180deg) translateZ(${halfSize}px)`,
    },
    {
      icon: faReact,
      color: '#5ED4F4',
      transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
    },
    {
      icon: faJsSquare,
      color: '#EFD81D',
      transform: `rotateX(90deg) translateZ(${halfSize}px)`,
    },
    {
      icon: faGitAlt,
      color: '#EC4D28',
      transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
    },
  ]

  return (
    <div className="cube-container">
      <motion.div
        className="cube"
        style={{
          width: cubeSize,
          height: cubeSize,
        }}
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
              width: faceSize,
              height: faceSize,
              transform: face.transform,
            }}
          >
            <FontAwesomeIcon
              icon={face.icon}
              color={face.color}
              style={{ fontSize: '100px' }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechCube
