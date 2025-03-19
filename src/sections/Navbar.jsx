import { useRef, useState } from "react";
import { scaleValue } from "../components/scale.jsx";

//import React from "react";
import "../navIndex.css";

const maxAdditionalSize = 10; 

const Navbar = ({ handleAboutClick, handleContactClick, handleWorkClick, handleProjectsClick, handleMobileNavClick, mobileNavActive }) => {
  const dockRef = useRef(null);

  const handleAppHover = (ev) => {
    if (!dockRef.current) return;

    const mouseX = ev.clientX;
    const mouseY = ev.clientY;

    const rect = ev.currentTarget.getBoundingClientRect();

    const xDistance = (mouseX - rect.left) / rect.width; 
    const yDistance = (mouseY - rect.top) / rect.height; 

    const offsetX = scaleValue(xDistance, [0, 1], [maxAdditionalSize * -1, maxAdditionalSize]);
    const offsetY = scaleValue(yDistance, [0, 1], [maxAdditionalSize * -1, maxAdditionalSize]);

    dockRef.current.style.setProperty("--dock-offset-left", `${offsetX * -1}px`);
    dockRef.current.style.setProperty("--dock-offset-right", `${offsetX}px`);
    dockRef.current.style.setProperty("--dock-offset-top", `${offsetY * -1}px`);
    dockRef.current.style.setProperty("--dock-offset-bottom", `${offsetY}px`);
  };

  const [hoverText, setHoverText] = useState(false);
  const [hoverElement, setHoverElement] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setHoverText(true);
    setHoverElement(true);
  }

  const handleMouseLeave = () => {
    setHoverText(false);
    setHoverElement(false);
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="page">
      <nav ref={dockRef} className="dock mx-auto px-3">
        {/* Mobile button */}
        <div className="mobile-btn-position">
          <ul className={`mobile-btn ${mobileNavActive ? "active" : ""}`}>
            <li 
              className={`app ${isClicked ? 'clicked' : ''}`} 
              onMouseMove={handleAppHover} 
              onClick={()=>{
                handleMobileNavClick();
                handleClick();
              }}
            >
              <div className="mobile-btn-content">
                <img 
                  src={mobileNavActive ? "/icons_01/cross.svg" : "/icons_01/mobile-btn.svg"}
                  alt="mobile-btn"
                />
              </div>
            </li>
          </ul>
        </div>

        {/* C code by luis marques */}
        <ul className={`nav-left ${mobileNavActive ? "hidden" : ""}`}>
          <li className="appIcons" onMouseMove={handleAppHover}>
            <a href="">
             <div className="code-by" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
              <span className={`${hoverElement ? "rotating" : "reverse"}`}>
                &copy;
              </span>

              &nbsp;
              <span id="changeText" className={`${hoverText ? "pos1" : "pos2"}`}>
                <div>
                  Code By Luis Marques
                </div>
              </span>
             </div>
            </a>
          </li>
        </ul>
        <div className="dock-right-center">
          <ul className="nav-right">
            {/* #work */}
            <li 
              className={`app ${isClicked ? 'clicked' : ''}`} 
              onMouseMove={handleAppHover}
              onClick={() => {
                handleWorkClick();
                handleClick();
              }}
            >
              <a href="#work">
                Work
                <span className="more-info"></span>
              </a>
            </li>
            {/* #about */}
            <li 
              className={`app ${isClicked ? 'clicked' : ''}`} 
              onMouseMove={handleAppHover}
              onMouseLeave={() => setIsClicked(false)} 
              onClick={() => {
                handleAboutClick(); 
                handleClick();
              }}
            >
              <a href="#about">
                About
                <span className="more-info"></span>
              </a>
            </li>
            {/* #projects */}
            <li 
              className={`app ${isClicked ? 'clicked' : ''}`} 
              onMouseMove={handleAppHover}
              onClick={() => {
                handleProjectsClick();
                handleClick();
              }}
            >
              <a href="#projects">
                Projects
                <span className="more-info"></span>
              </a>
            </li>
            {/* #contact */}
            <li 
              className="app" 
              onMouseMove={handleAppHover}
              onClick={() => {
                handleContactClick();
                handleClick();
              }}
            >
              <a href="#contact">
                Contact
                <span className="more-info"></span>
              </a>
            </li>
          </ul>
        </div>  
      </nav>
    </div>
  );
};

export default Navbar