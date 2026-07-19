import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Resume from './Resume';
import Blog from './Blog';
import Contact from './Contact';

const MainPortfolio = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(location.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="flex-grow relative z-10">
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="projects"><Projects /></div>
      <div id="skills"><Skills /></div>
      <div id="resume"><Resume /></div>
      <div id="blog"><Blog /></div>
      <div id="contact"><Contact /></div>
    </main>
  );
};

export default MainPortfolio;
