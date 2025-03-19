//import React from 'react'

import { useRef } from "react";
import { scaleValue } from "../components/scale";
import "../contact.css"

const Contact = ({ contactActive }) => {
  /* ------------------------------ Socials Bar hover controller ------------------------------ */
  const maxAdditionalSize = 5;
  const dockRef = useRef(null);

  const handleSocialsHover = (ev) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(cursorDistance, [0, 1], [maxAdditionalSize * -1, maxAdditionalSize]);
    
    dockRef.current.style.setProperty("--dock-offset-left", `${offsetPixels * -1}px`);
    dockRef.current.style.setProperty("--dock-offset-right", `${offsetPixels}px`);
  };
  /* ------------------------------ Contact details hover controller ------------------------------ */
  const btnMaxAdditionalSize = 10;
  const btnRef = useRef(null);

  const handleBtnHover = (ev) => {
    if (!btnRef.current) return;

    const mouseX = ev.clientX;
    const mouseY = ev.clientY;
    const rect = ev.currentTarget.getBoundingClientRect();

    const xDistance = (mouseX - rect.left) / rect.width; 
    const yDistance = (mouseY - rect.top) / rect.height; 
    
    const offsetX = scaleValue(xDistance, [0, 1], [btnMaxAdditionalSize * -1, btnMaxAdditionalSize]);
    const offsetY = scaleValue(yDistance, [0, 1], [btnMaxAdditionalSize * -1, btnMaxAdditionalSize]);

    btnRef.current.style.setProperty("--btn-offset-x", `${offsetX}px`);
    btnRef.current.style.setProperty("--btn-offset-y", `${offsetY}px`);
  };

  const handleBtnLeave = () => {
    if (!btnRef.current) return;
    
    btnRef.current.style.setProperty("--btn-offset-x", `0px`);
    btnRef.current.style.setProperty("--btn-offset-y", `0px`);
  };  

  /* ------------------------------ Socials Bar hover controller ------------------------------ */
  return (
    <div className={`contact-container ${contactActive ? "visible" : "hidden"}`}>
      <div className="contact-container-center">
        <div className="contact-container-main">
          {/* <div className="contact">Contact</div> */}
          <div className="contact-details-div">
            <div className="contact-details-header">Contact Details</div>
            <div className="contact-details-btn-container" ref={btnRef} onMouseMove={handleBtnHover} onMouseLeave={handleBtnLeave}>
              <ul className="contact-details-ul">
                <li className="contact-details-li">
                  <a className="contact-details-flex" href="https://mail.google.com/mail/u/3/#inbox?compose=CllgCJNxNpCplcTVpshdCTVmxVprjzTNWSdMwMCZfSgBQjNzlQhxhwCBXLfdcPWWGGsrWsMkLbq" target="_blank">
                    <span className="circles"></span>
                    <span>luissena.info@gmail.com</span>
                  </a>
                </li>
                <li className="contact-details-li">
                  <a className="contact-details-flex" href="tel:+351960096598" target="_blank">
                    <span className="circles"></span>
                    <span>+351 960 096  598</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="socials-div">
            <div className="socials-header">Socials</div>        
            <div className="socials">
              <nav ref={dockRef} className="socials-container">
                <ul>
                  <li className="socials-li" onMouseMove={handleSocialsHover}>
                    <a href="https://github.com/lCubosl" target="_blank">
                      <img src="/icons_01/github.svg" alt="github" />
                      <span className="socials-text">GitHub</span>
                    </a>
                  </li>
                  <li className="socials-li" onMouseMove={handleSocialsHover}>
                    <a href="https://www.linkedin.com/in/luis-sena-marques/" target="_blank">
                      <img src="/icons_01/linkedin.svg" alt="linkedin" />
                      <span className="socials-text">LinkedIn</span>
                    </a>
                  </li>
                  <li className="socials-li" onMouseMove={handleSocialsHover}>
                    <a href="https://codepen.io/lCubosl" target="_blank">
                      <img src="/icons_01/codepen.svg" alt="codepen" />
                      <span className="socials-text">Codepen</span>
                    </a>
                  </li>
                  <li className="socials-li" onMouseMove={handleSocialsHover}>
                    <a href="https://mail.google.com/mail/u/3/#inbox?compose=CllgCJNxNpCplcTVpshdCTVmxVprjzTNWSdMwMCZfSgBQjNzlQhxhwCBXLfdcPWWGGsrWsMkLbq" target="_blank">
                      <img src="/icons_01/email.svg" alt="email" />
                      <span className="socials-text">Mail</span>
                    </a>
                  </li>
                  <li className="socials-li" onMouseMove={handleSocialsHover}>
                    <a href="https://www.artstation.com/luismarques" target="_blank">
                      <img src="/icons_01/artstation.svg" alt="slack" />
                      <span className="socials-text">Artstation</span>
                    </a>
                  </li>
                </ul>
              </nav>        
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact