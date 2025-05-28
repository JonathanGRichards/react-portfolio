import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faExternalLinkAlt,
  faCode,
} from '@fortawesome/free-solid-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const ANIMATION_DELAY = 3000

const projects = [
  {
    title: 'Project 1',
    description: 'Description of project 1',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveLink: '#',
    codeLink: '#',
  },
  {
    title: 'Project 2',
    description: 'Description of project 2',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveLink: '#',
    codeLink: '#',
  },
  {
    title: 'Project 3',
    description: 'Description of project 3',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveLink: '#',
    codeLink: '#',
  },
  {
    title: 'Project 4',
    description: 'Description of project 4',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveLink: '#',
    codeLink: '#',
  },
]

const PROJECTS_PER_PAGE = {
  DESKTOP: 3,
  TABLET: 2,
  MOBILE: 1,
}

const ProjectCard = ({ project, idx }) => {
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

  return (
    <motion.div
      key={`${idx}`}
      className="project-card"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-info">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="technologies">
          {project.technologies.map((tech, techIdx) => (
            <span key={techIdx} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faExternalLinkAlt} /> Demo
          </a>
          <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faCode} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const titleArray = useMemo(() => ['P', 'r', 'o', 'j', 'e', 'c', 't', 's'], [])

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, ANIMATION_DELAY)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleSidebarChange = (e) => {
      if (e.detail) {
        setIsSidebarExpanded(e.detail.expanded)
      }
    }

    window.addEventListener('sidebarStateChange', handleSidebarChange)
    return () =>
      window.removeEventListener('sidebarStateChange', handleSidebarChange)
  }, [])

  const { totalPages, currentProjects } = useMemo(() => {
    let projectsPerPage = PROJECTS_PER_PAGE.DESKTOP
    if (windowWidth <= 768) {
      projectsPerPage = PROJECTS_PER_PAGE.MOBILE
    } else if (windowWidth <= 1024) {
      projectsPerPage = PROJECTS_PER_PAGE.TABLET
    }

    const totalPages = Math.ceil(projects.length / projectsPerPage)
    const startIndex = currentPage * projectsPerPage
    const currentProjects = projects.slice(
      startIndex,
      startIndex + projectsPerPage
    )

    return { totalPages, currentProjects }
  }, [currentPage, windowWidth])

  const nextPage = () => {
    setDirection(1) // Right direction
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setDirection(-1) // Left direction
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (pageIndex) => {
    if (pageIndex === currentPage) return

    // Set direction based on target page
    setDirection(pageIndex > currentPage ? 1 : -1)
    setCurrentPage(pageIndex)
  }

  // Define animation variants
  const pageVariants = {
    // When entering:
    // - If going forward (direction=1), enter from the right (100%)
    // - If going backward (direction=-1), enter from the left (-100%)
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    // Center position (same for all)
    center: {
      x: 0,
      opacity: 1,
    },
    // When exiting:
    // - If going forward (direction=1), exit to the left (-100%)
    // - If going backward (direction=-1), exit to the right (100%)
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <div
      className={`projects-container ${
        isSidebarExpanded ? 'sidebar-expanded' : ''
      }`}
    >
      <motion.div
        className="projects-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={titleArray}
            idx={15}
          />
        </h1>

        <motion.div
          className="carousel-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="nav-button prev"
            onClick={prevPage}
            aria-label="Previous page"
            disabled={totalPages <= 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="carousel-track">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                className="carousel-cards"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                  },
                  opacity: { duration: 0.3 },
                }}
              >
                {currentProjects.map((project, idx) => (
                  <ProjectCard
                    key={`${currentPage}-${idx}`}
                    project={project}
                    idx={idx}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="nav-button next"
            onClick={nextPage}
            aria-label="Next page"
            disabled={totalPages <= 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </motion.div>

        {totalPages > 1 && (
          <motion.div
            className="carousel-dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                className={`dot ${index === currentPage ? 'active' : ''}`}
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Projects
