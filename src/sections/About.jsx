//import React from 'react'
//import { scaleValue } from "../components/scale.jsx";
import { useRef } from "react";
import { scaleValue } from "../components/scale.jsx";

import "../about.css"


const About = ({ aboutActive, handleContactClick }) => {
  //------------------------------ Button movement controller ------------------------------
  const maxAdditionalSize = 10;
  const innerMaxAdditionalSize = 5;
  const btnRef = useRef(null);
  const innerBtnRef = useRef(null);

  const handleBtnHover = (ev) => {
    if (!btnRef.current || !innerBtnRef.current) return;

    const mouseX = ev.clientX;
    const mouseY = ev.clientY;
    const rect = ev.currentTarget.getBoundingClientRect();

    const xDistance = (mouseX - rect.left) / rect.width; 
    const yDistance = (mouseY - rect.top) / rect.height; 
    
    const offsetX = scaleValue(xDistance, [0, 1], [maxAdditionalSize * -1, maxAdditionalSize]);
    const offsetY = scaleValue(yDistance, [0, 1], [maxAdditionalSize * -1, maxAdditionalSize]);

    const innerOffsetX = scaleValue(xDistance, [0, 1], [innerMaxAdditionalSize * -1, innerMaxAdditionalSize]);
    const innerOffsetY = scaleValue(yDistance, [0, 1], [innerMaxAdditionalSize * -1, innerMaxAdditionalSize]);

    btnRef.current.style.setProperty("--btn-offset-x", `${offsetX}px`);
    btnRef.current.style.setProperty("--btn-offset-y", `${offsetY}px`);

    innerBtnRef.current.style.setProperty("--inner-btn-offset-x", `${innerOffsetX}px`);
    innerBtnRef.current.style.setProperty("--inner-btn-offset-y", `${innerOffsetY}px`);
  };

  const handleBtnLeave = () => {
    if (!btnRef.current || !innerBtnRef.current) return;
    
    btnRef.current.style.setProperty("--btn-offset-x", `0px`);
    btnRef.current.style.setProperty("--btn-offset-y", `0px`);

    innerBtnRef.current.style.setProperty("--inner-btn-offset-x", `0px`);
    innerBtnRef.current.style.setProperty("--inner-btn-offset-y", `0px`);
  };

  //------------------------------------------- HTML -------------------------------------------
  return (
    <div className={`about ${aboutActive ? "visible" : "hidden"}`}>
      <div className="about-container-center">
        <div className="about-main-container">
          <div className="btn-container" ref={btnRef} onMouseMove={handleBtnHover} onMouseLeave={handleBtnLeave}>
              <div className="btn-inner-container" ref={innerBtnRef}>
                <button className="btn" onClick={handleContactClick}>
                  <a href="#contact">
                    <span className="btn-text">Contact</span>
                  </a>
                  <div className="globe-container">
                    <div className="globe">
                      <div className="globe-ring1"></div>
                      <div className="globe-ring2"></div>
                      <div className="globe-ring3"></div>
                      <div className="globe-ring4"></div>
                      <div className="globe-ring5"></div>
                      <div className="globe-ring-vert"></div>
                    </div>
                  </div>
                </button>                     
              </div>
          </div>
          <div className="mission-statement">
              <div className="mission-statement-text">
                Engeneering&nbsp; 
                <span className="font-bold">
                  Modern Solutions
                </span> for Modern Problems. <br/> Always on the cutting edge.
              </div>
              <br />
              <div className="mission-statement-text">
                I build scalable and complete applications from scratch.
              </div>
              <br />
              <div className="mission-statement-text">
                I am confident in my ability to contribute significant value to any employer by aligning my skills 
                with organizational objectives and helping drive business success.
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;