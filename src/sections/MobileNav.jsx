// import React from 'react'

import { useRef, useState } from "react";
import { scaleValue } from "../components/scale";
import "../mobileNav.css";

const MobileNav = ({ handleAboutClick, handleContactClick, handleWorkClick, handleProjectsClick, mobileNavActive }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isappHovered, setIsApphovered] = useState(false);
  
  /* ------------------------------ Socials Bar hover controller ------------------------------ */
  const dockRef = useRef(null);
  const navSize = 5;

  const handleNavHover = (ev) => {
    if (!dockRef.current) return;

    const mouseNavPositionX = ev.clientX;
    const mouseNavPositionY = ev.clientY;
    const mouseNavRect = ev.currentTarget.getBoundingClientRect();

    const xNavDistance = (mouseNavPositionX - mouseNavRect.left) / mouseNavRect.width;
    const yNavDistance = (mouseNavPositionY - mouseNavRect.top) / mouseNavRect.height;

    const navOffsetX = scaleValue(xNavDistance, [0, 1], [navSize * -1, navSize]);
    const navOffsetY = scaleValue(yNavDistance, [0, 1], [navSize * -1, navSize]);
    
    dockRef.current.style.setProperty("--btn-offset-x", `${navOffsetX}px`);
    dockRef.current.style.setProperty("--btn-offset-y", `${navOffsetY}px`);

    setIsApphovered(true);
  };

  const handleNavLeave = () => {
    if (!dockRef.current) return;

    dockRef.current.style.setProperty("--btn-offset-x", `0px`);
    dockRef.current.style.setProperty("--btn-offset-y", `0px`);

    setIsApphovered(false);
  }

  /* ------------------------------ Socials Bar hover controller ------------------------------ */
  const socialsRef = useRef(null);

  const handleSocialsHover = (ev) => {
    if (!socialsRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(cursorDistance, [0, 1], [navSize * -1, navSize]);
    
    socialsRef.current.style.setProperty("--dock-offset-left", `${offsetPixels * -1}px`);
    socialsRef.current.style.setProperty("--dock-offset-right", `${offsetPixels}px`);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={`mobile-nav ${mobileNavActive ? "visible" : "invisible"}`}>
      <div className="mobile-nav-center">
        <span className="text">Navigation</span>
        <div className="horizontal-line"></div>
        
        <nav ref={dockRef}>
          <ul className="mobile-nav-ul">
            <li
              className={`mobile-nav-li inline-flex w-auto ${
                isClicked ? "clicked" : ""
              }`}
              onMouseMove={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={() => {
                handleWorkClick();
                handleClick();
              }}
            >
              <a href="#work">
                <span className={`circle ${isappHovered ? "visible" : ""}`}>
                  ●
                </span>
                Work
              </a>
            </li>
            <li
              className={`mobile-nav-li inline-flex w-auto ${
                isClicked ? "clicked" : ""
              }`}
              onMouseMove={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={() => {
                handleAboutClick();
                handleClick();
              }}
            >
              <a href="#about">
                <span className={`circle ${isappHovered ? "visible" : ""}`}>
                  ●
                </span>
                About
              </a>
            </li>
            <li
              className={`mobile-nav-li inline-flex w-auto ${
                isClicked ? "clicked" : ""
              }`}
              onMouseMove={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={() => {
                handleProjectsClick();
                handleClick();
              }}
            >
              <a href="#projects">
                <span className={`circle ${isappHovered ? "visible" : ""}`}>
                  ●
                </span>
                Projects
              </a>
            </li>
            <li
              className={`mobile-nav-li inline-flex w-auto ${
                isClicked ? "clicked" : ""
              }`}
              onMouseMove={handleNavHover}
              onMouseLeave={handleNavLeave}
              onClick={() => {
                handleContactClick();
                handleClick();
              }}
            >
              <a href="#contact">
                <span className={`circle ${isappHovered ? "visible" : ""}`}>
                  ●
                </span>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="horizontal-line"></div>
        
        <div className="socials">
          <nav ref={socialsRef} className="socials-container mobile-socials-container">
            <ul>
              <li className="socials-li" onMouseMove={handleSocialsHover}>
                <a href="https://github.com/lCubosl" target="_blank">
                  <img src="/icons_01/github_negative.svg" alt="github" />
                  <span className="socials-text">GitHub</span>
                </a>
              </li>
              <li className="socials-li" onMouseMove={handleSocialsHover}>
                <a
                  href="https://www.linkedin.com/in/luis-sena-marques/"
                  target="_blank"
                >
                  <img src="/icons_01/linkedin_negative.svg" alt="linkedin" />
                  <span className="socials-text">LinkedIn</span>
                </a>
              </li>
              <li className="socials-li" onMouseMove={handleSocialsHover}>
                <a href="https://codepen.io/lCubosl" target="_blank">
                  <img src="/icons_01/codepen_negative.svg" alt="codepen" />
                  <span className="socials-text">Codepen</span>
                </a>
              </li>
              <li className="socials-li" onMouseMove={handleSocialsHover}>
                <a
                  href="https://mail.google.com/mail/u/3/#inbox?compose=CllgCJNxNpCplcTVpshdCTVmxVprjzTNWSdMwMCZfSgBQjNzlQhxhwCBXLfdcPWWGGsrWsMkLbq"
                  target="_blank"
                >
                  <img src="/icons_01/email_negative.svg" alt="email" />
                  <span className="socials-text">Mail</span>
                </a>
              </li>
              <li className="socials-li" onMouseMove={handleSocialsHover}>
                <a
                  href="https://www.artstation.com/luismarques"
                  target="_blank"
                >
                  <img src="/icons_01/artstation_negative.svg" alt="slack" />
                  <span className="socials-text">Artstation</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default MobileNav