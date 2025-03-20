//import { Element } from "react-scroll";
//import React from "react";
import { useEffect } from "react";
import "../heroIndex.css";

const Hero = ({ aboutActive, contactActive, workActive, projectsActive, mobileNavActive }) => {
  
  useEffect(() => {
    const interBubble = document.querySelector(".interactive");

    let curX = 0;
    let curY = 0;
    let tgX = window.innerWidth / 2;
    let tgY = window.innerHeight / 2;

    const move = () => {
      curX += (tgX - curX) / 10;
      curY += (tgY - curY) / 10;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    };

    const handleMouseMove = (ev) => {
      tgX = ev.clientX;
      tgY = ev.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="info-main-container relative w-full h-screen border-0">
      <div className="info-container absolute">
        {/* navigation bar divider */}
        <div className="divider"></div>
        <div className={`name absolute ${contactActive || workActive || projectsActive || mobileNavActive ? "hidden" : ""}`}>
          {/* crashed out. Decided to make .move-top-text disable the h4 to avoid further headhache */}
          <h4 className={`top-text ${aboutActive ? "move-top-text" : ""}`}>
            Luís Marques
          </h4>
          <h3
            className={`bottom-text ${
              aboutActive ? "disapear-bottom-text" : ""
            }`}
          >
            Full Stack <span className="text-color">Engineer</span>.
          </h3>
        </div>
        
        <div className="location absolute">
          <p className="globe-text">
            Located in <br />
            Portugal
          </p>
          {/* Globe right corner */}
          <div className="globe-hero-offset">
            <div className="globe">
              <div className="globe-ring1"></div>
              <div className="globe-ring2"></div>
              <div className="globe-ring3"></div>
              <div className="globe-ring4"></div>
              <div className="globe-ring5"></div>
              <div className="globe-ring-vert"></div>
            </div>
            <div className="globe-bg"></div>
          </div>
        </div>

      </div>
      {/* Background gradient with animation (css) */}
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradient-container">
          <div className="g1"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
