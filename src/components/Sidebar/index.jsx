import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './index.scss'
import LogoJR from '../../assets/img/JR_logo.svg'
import LogoSubJonat from '../../assets/img/Jonathan_sub.svg'
import LogoSubRicha from '../../assets/img/Richards_sub.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faHome,
  faUser,
  faFolderOpen,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div
      className={`nav-bar ${menuOpen ? 'open' : ''} ${
        isMobile ? 'mobile' : ''
      } ${isTablet ? 'tablet' : ''}`}
    >
      {isTablet && (
        <div className="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </div>
      )}

      <Link className="logo" to="/">
        <img src={LogoJR} alt="logo" />
        <div className="sub-logo">
          <img
            className="sub-logo-jonathan"
            src={LogoSubJonat}
            alt="Jonathan"
          />
          <img
            className="sub-logo-richards"
            src={LogoSubRicha}
            alt="Jonathan"
          />
        </div>
      </Link>

      <nav>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>About</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          className="projects-link"
          to="/projects"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          <span>Projects</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Contact</span>
        </NavLink>

        {isTablet && (
          <div className="tablet-social-links">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span>LinkedIn</span>
            </a>
          </div>
        )}
      </nav>

      {!isTablet && (
        <div className="social-links">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      )}
    </div>
  )
}

export default Sidebar
