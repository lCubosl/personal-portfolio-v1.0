//import React from 'react'
import { useRef, useState } from "react";
import { scaleValue } from "../components/scale";

import "../work.css";

const Work = ({ workActive }) => {
  /* ------------------------------ button movement controller ------------------------------ */
  const size = 5;
  const innerSize = 5;
  const btnRef = useRef([]);
  const inenrBtnRef = useRef([]);

  const handleBtnHover = (ev, index) => {
    if (!btnRef.current[index] || !inenrBtnRef.current[index]) return;

    const mouseX = ev.clientX;
    const mouseY = ev.clientY;
    const rect = ev.currentTarget.getBoundingClientRect();

    const xDistance = (mouseX	- rect.left) / rect.width;
    const yDistance = (mouseY	- rect.top) / rect.height;

    const offsetX =scaleValue(xDistance, [0, 1], [size * -1, size]);
    const offsetY =scaleValue(yDistance, [0, 1], [size * -1, size]);

    const innerOffsetX =scaleValue(xDistance, [0, 1], [innerSize * -1, innerSize]);
    const innerOffsetY =scaleValue(yDistance, [0, 1], [innerSize * -1, innerSize]);

    btnRef.current[index].style.setProperty("--btn-offset-x", `${offsetX}px`);
    btnRef.current[index].style.setProperty("--btn-offset-y", `${offsetY}px`);

    inenrBtnRef.current[index].style.setProperty("--inner-btn-offset-x", `${innerOffsetX}px`);
    inenrBtnRef.current[index].style.setProperty("--inner-btn-offset-y", `${innerOffsetY}px`);
  };
  
  const handleBtnLeave = (index) => {
    if (!btnRef.current[index] || !inenrBtnRef.current[index]) return;
    
    btnRef.current[index].style.setProperty("--btn-offset-x", "0px");
    btnRef.current[index].style.setProperty("--btn-offset-y", "0px");

    inenrBtnRef.current[index].style.setProperty("--inner-btn-offset-x", "0px");
    inenrBtnRef.current[index].style.setProperty("--inner-btn-offset-y", "0px");
  };

  const buttons_pos1 = ["Blender", "Python", "Lua"];
  const buttons_pos2 = ["Blender", "JavaScript"];
  const buttons_pos3 = ["Blender", "C++", "C#"];

  /* ------------------------------ hover controller ------------------------------ */
  const [hoverIndex, setHoverIndex] = useState(null);

  /* ------------------------------ arrow button controller ------------------------------ */
  const arrowX = 10;
  const arrowY = 50;
  const arrowRef = useRef([]);
  const [arrowOffsetY, setArrowOffsetY] = useState(0);

  const handleArrowHover = (ev, index) => {
    if (!arrowRef.current[index]) return;

    const mouseX = ev.clientX;
    const mouseY = ev.clientY;
    const rect = ev.currentTarget.getBoundingClientRect();

    const xDistance = (mouseX	- rect.left) / rect.width;
    const yDistance = (mouseY	- rect.top) / rect.height;

    const arrowOffsetX =scaleValue(xDistance, [0, 1], [arrowX * -1, arrowX]);
    const arrowOffsetY =scaleValue(yDistance, [0, 1], [arrowY * -1, arrowY]);

    arrowRef.current[index].style.setProperty("--arrow-btn-offset-x", `${arrowOffsetX}px`);
    arrowRef.current[index].style.setProperty("--arrow-btn-offset-y", `${arrowOffsetY}px`);   

    setArrowOffsetY(arrowOffsetY);
    
    // neutral offsetY is 0 ■. Negative is UP ⯅. Positive is DOWN ⯆
    const arrowSymbol = arrowRef.current[index].querySelector(".arrow-symbol");
    
    if (arrowOffsetY > 5 || arrowOffsetY < -5) {
      if (arrowSymbol) {
        arrowSymbol.textContent = arrowOffsetY > 5 ? "⯆" : arrowOffsetY < -5 ? "⯅" : "";
        arrowSymbol.classList.add(arrowOffsetY > 5 ? "arrow-down" : arrowOffsetY < -5 ? "arrow-up" : "");
      }
    } else {
      arrowSymbol.textContent = "";
      arrowSymbol.classList.remove("arrow-up", "arrow-down");
    }   
  };

  const handleArrowLeave = (index) => {
    if (!arrowRef.current[index]) return;
    
    arrowRef.current[index].style.setProperty("--arrow-btn-offset-x", "0px");
    arrowRef.current[index].style.setProperty("--arrow-btn-offset-y", "0px");

    const arrowSymbol = arrowRef.current[index].querySelector(".arrow-symbol");
    if (arrowSymbol) {
        arrowSymbol.classList.remove("arrow-up", "arrow-down");
        arrowSymbol.textContent = "";
    }
    
    setArrowOffsetY(0);
  };

  /* ------------------------------ scroll ------------------------------ */
  const workScrollRef = useRef(null);

  const scrollDown = () => {
    if(workScrollRef.current) {
      workScrollRef.current.scrollBy({ top:200, behavior:"smooth" });
    }
  };

  const scrollUp = () => {
    if(workScrollRef.current) {
      workScrollRef.current.scrollBy({ top:-200, behavior:"smooth" });
    }
  };

  /* ------------------------------ HTML ------------------------------ */
  return (
    <div className={`work ${workActive ? "visible" : "hidden"}`}>
      <div className="main-container-center">
        <div className="work-container">
          {/* <div className="work-main-text">Work</div> */}

          <div className="arrow-btn-position">
            <div 
              // arrowOffsetY is inverted. Negative is UP ⯅. Positive is DOWN ⯆
              className="arrow-btn-container"
              onMouseMove={(ev) => handleArrowHover(ev, 0)}
              onMouseLeave={() => handleArrowLeave(0)}
              onClick={() => {
                if(arrowOffsetY < -5){
                  scrollUp();
                } else if(arrowOffsetY > 5){
                  scrollDown();
                } 
              }}
            >
              <button className="arrow-btn" ref={(el) => (arrowRef.current[0] = el)}>
                <span className="arrow-symbol"></span>
                <div className="globe-btn-offset">
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
          
          <div className="work-scroll-container" ref={workScrollRef}>
            <div 
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 0 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <header className="time">2023-2025</header>
              <div className="description-container">
                <a className="work-link" href="https://www.thegang.io/" target="_blank"></a>
                <h3 className="position-title">Tech Artist · The Gang <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <p className="position-description">
                  Build and mantain game experiences for TheGang Sweeden. Work closely with small to medium teams,
                  including artists, programers, designers, developers, managers and brands to implement the 
                  best practices in game development accessibility.
                </p>
                <div className="work-btns-container">
                  {buttons_pos1.map((label, index) => (
                    <div
                      key={`pos1-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index)}
                      onMouseLeave={() => handleBtnLeave(index)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index] = el)}
                      >
                        <button className="work-btn">
                          <span className="work-btn-text">{label}</span>
                        </button>
                      </div>
                    </div>
                  ))}       
                </div>
              </div>
            </div>
            
            <div
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 1 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(1)}
              onMouseLeave={() => setHoverIndex(null)}          
            >
              <header className="time">2019-2022</header>
              <div className="description-container">
                <a className="work-link" href="https://www.slideshow.pt/" target="_blank"></a>
                <h3 className="position-title">Motion Graphics · Slideshow <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <p className="position-description">
                  Design and develop engaging advertisements, branded promotional content, and dynamic websites 
                  under Slideshow Lda. Collaborate closely with marketing to ansure that all client requirements 
                  are thoroughly understood and executed to deliver high-quality, impactful digital experiences.                
                </p>
                <div className="work-btns-container">
                  {buttons_pos2.map((label, index) => (
                    <div
                      key={`pos2-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length] = el)}
                      >
                        <button className="work-btn">
                          <span className="work-btn-text">{label}</span>
                        </button>
                      </div>
                    </div>
                  ))}       
                </div>
              </div>
            </div>

            <div
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 2 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(2)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <header className="time">2017-2019</header>
              <div className="description-container">
                <a className="work-link" href="https://luis-marques.itch.io/" target="_blank"></a>
                <h3 className="position-title">Game Developer · Projects <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <p className="position-description">
                  Designed and developed a diverse range of video games as part of bachelor&apos;s degree projects, 
                  game jams, and independent initiatives. Gained hands-on experience in programming and collaboration 
                  with a diverse set of teams.
                </p>
                <div className="work-btns-container">
                  {buttons_pos3.map((label, index) => (
                    <div
                      key={`pos3-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length] = el)}
                      >
                        <button className="work-btn">
                          <span className="work-btn-text">{label}</span>
                        </button>
                      </div>
                    </div>
                  ))}       
                </div>
              </div>
            </div>

            <div
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 3 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(3)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://drive.google.com/file/d/1aM6p9Gf6ZttuAy6aax4zecQiISFsiwdu/view?usp=sharing" target="_blank"></a>
                <h3 className="position-title">View Full Resume <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Work;