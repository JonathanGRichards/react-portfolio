import {useEffect, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import LogoTitle from '../../assets/img/J_logo_initial.svg';
import Logo from './Logo';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const ANIMATION_DELAY = 4000;

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const nameArray = useMemo(() => ['o', 'n', 'a', 't', 'h', 'a', 'n', ','], []);
  const jobArray = useMemo(() => ['w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r'], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, ANIMATION_DELAY);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
           <br/> 
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>'m</span>
          <img src={LogoTitle} alt="developer" />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={15}
          />
          <br />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={22}
          />
        </h1>
        <h2>Full Stack Developer / React Specialist</h2>
        <Link to="/contact" className="flat-button">CONTACT ME</Link>
      </div>
      <Logo />
    </div>
  );
}

export default Home;