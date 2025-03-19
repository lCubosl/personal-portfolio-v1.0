import { useState } from "react";
//import Header from "./sections/Header";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Projects from "./sections/Projects";
import MobileNav from "./sections/MobileNav";

const App = () => {
  const [aboutActive, setAboutActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const [workActive, setWorkActive] = useState(false);
  const [projectsActive, setProjectsActive] = useState(false);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const handleAboutClick = () => {
    if(!aboutActive) {
      setAboutActive(true);
      setContactActive(false);
      setWorkActive(false);
      setProjectsActive(false);
      setMobileNavActive(false);
    }
  };

  const handleContactClick = () => {
    if(!contactActive) {
      setContactActive(true);
      setAboutActive(false);
      setWorkActive(false);
      setProjectsActive(false);
      setMobileNavActive(false);
    }
  }

  const handleWorkClick = () => {
    if(!workActive) {
      setWorkActive(true);
      setContactActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setMobileNavActive(false);
    }
  }

  const handleProjectsClick = () => {
    if(!projectsActive) {
      setProjectsActive(true);
      setWorkActive(false);
      setContactActive(false);
      setAboutActive(false);
      setMobileNavActive(false);
    }
  }

  const handleMobileNavClick = () => {
    setMobileNavActive((prevState) => !prevState);
    if(!mobileNavActive) {
      setProjectsActive(false);
      setWorkActive(false);
      setContactActive(false);
      setAboutActive(false);
    }
  }

  return (
    <main className="overflow-hidden relative">
      <Navbar 
        handleAboutClick={handleAboutClick}
        handleContactClick={handleContactClick}
        handleWorkClick={handleWorkClick} 
        handleProjectsClick={handleProjectsClick}
        handleMobileNavClick={handleMobileNavClick}
        mobileNavActive={mobileNavActive}  
      />
      <Hero 
        aboutActive={aboutActive} 
        contactActive={contactActive} 
        workActive={workActive} 
        projectsActive={projectsActive}
        mobileNavActive={mobileNavActive} 
      />
      <Work workActive={workActive} />
      <About aboutActive={aboutActive} handleContactClick={handleContactClick} />
      <Projects projectsActive={projectsActive} />
      <Contact contactActive={contactActive} />
      <MobileNav 
        handleAboutClick={handleAboutClick}
        handleContactClick={handleContactClick}
        handleWorkClick={handleWorkClick} 
        handleProjectsClick={handleProjectsClick}
        mobileNavActive={mobileNavActive}
      />
    </main>
  );
};

export default App;
