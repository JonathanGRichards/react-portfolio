import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
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
import { ScreenContext } from '../Layout/index.jsx'

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile, isTablet } = useContext(ScreenContext)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Close menu when screen size changes
  useEffect(() => {
    if (!isTablet) {
      setMenuOpen(false)
    }
  }, [isTablet])

  return (
    <div
      className={`nav-bar ${menuOpen ? 'open' : ''} ${
        isMobile ? 'mobile' : ''
      } ${isTablet ? 'tablet' : ''}`}
    >
      {isTablet && (
        <button
          className="hamburger"
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
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
            href="https://github.com/JonathanGRichards"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/jonathan-richards-017258132/"
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
