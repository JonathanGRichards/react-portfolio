import { Link, NavLink } from 'react-router-dom'
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
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => (
  <div className="nav-bar">
    <Link className="logo" to="/">
      <img src={LogoJR} alt="logo" />
      <div className="sub-logo">
        <img className="sub-logo-jonathan" src={LogoSubJonat} alt="Jonathan" />
        <img className="sub-logo-richards" src={LogoSubRicha} alt="Jonathan" />
      </div>
    </Link>
    <nav>
      <NavLink exact="true" activeclassname="active" to="/">
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        className="about-link"
        to="/about"
      >
        <FontAwesomeIcon icon={faUser} />
        <span>About</span>
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        className="projects-link"
        to="/projects"
      >
        <FontAwesomeIcon icon={faFolderOpen} />
        <span>Projects</span>
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        className="contact-link"
        to="/contact"
      >
        <FontAwesomeIcon icon={faEnvelope} />
        <span>Contact</span>
      </NavLink>
    </nav>
  </div>
)

export default Sidebar
