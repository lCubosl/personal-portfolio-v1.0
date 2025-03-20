// mport React from 'react'
import { useRef, useState } from "react";
import { scaleValue } from "../components/scale";

import "../projects.css";

const Projects = ({ projectsActive }) => {
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

  /* ------------------------------ Buttons ------------------------------ */
  const buttons_pos1 = ["CSS", "JavaScript"];
  const buttons_pos2 = ["CSS", "JavaScript"];
  const buttons_pos3 = ["CSS", "JavaScript"];
  const buttons_pos4 = ["JavaScript"];
  const buttons_pos5 = ["JavaScript"];
  const buttons_pos6 = ["Python"];
  const buttons_pos7 = ["Python"];
  const buttons_pos8 = ["Python"];
  const buttons_pos9 = ["Python"];
  const buttons_pos10 = ["CSS", "JavaScript", "React"];

  /* ------------------------------ HTML ------------------------------ */
  return (
    <div className={`projects ${projectsActive ? "visible" : "hidden"}`}>
      <div className="main-container-center">
        <div className="projects-container">
          {/* <div className="project-container-text">Recent Projects</div> */}
          
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

          <div className="work-scroll-container projects-scroll-container" ref={workScrollRef}>
            <div 
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 0 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              
              <div className="description-container">
                <a className="work-link" href="https://codepen.io/lCubosl/pen/VwodYYR" target="_blank"></a>
                <h3 className="position-title">Heat Map · Data Visualization <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/heat-map.png" alt="image1" />
                
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
              <div className="description-container">
                <a className="work-link" href="https://codepen.io/lCubosl/pen/WNVyxbW" target="_blank"></a>
                <h3 className="position-title">Choropleth Map · Data Visualization <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/choropleth-map.png" alt="image1" />

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
              <div className="description-container">
                <a className="work-link" href="https://codepen.io/lCubosl/pen/xxvzqYm" target="_blank"></a>
                <h3 className="position-title">Treemap Diagram · Data Visualization <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/tree-map.png" alt="image1" />

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
                <a className="work-link" href="https://codepen.io/lCubosl/pen/KKOZQXV" target="_blank"></a>
                <h3 className="position-title">Focus Clock · JavaScript <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/focus-clock.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos4.map((label, index) => (
                    <div
                      key={`pos4-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length] = el)}
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
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 4 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(4)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://codepen.io/lCubosl/pen/GRVOrQW" target="_blank"></a>
                <h3 className="position-title">Calculator · JavaScript <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/time-calculator.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos5.map((label, index) => (
                    <div
                      key={`pos5-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length] = el)}
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
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 5 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(5)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://colab.research.google.com/drive/1VoMr_x4ZKc_0CPDYYD0MsYw0hln2Jw89?usp=sharing" target="_blank"></a>
                <h3 className="position-title">Probability Calculator · Python <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/probability-calculator.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos6.map((label, index) => (
                    <div
                      key={`pos6-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length] = el)}
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
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 6 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(6)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://colab.research.google.com/drive/1ZpdL1bkx1oNHdNU_5rthh8wYKtmNyJV8?usp=sharing" target="_blank"></a>
                <h3 className="position-title">Polygon Area Calculator · Python <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/polygon-area-calculator.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos7.map((label, index) => (
                    <div
                      key={`pos7-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length] = el)}
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
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 7 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(7)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://colab.research.google.com/drive/1fbBzlIL0BZA9fTZQtvaC6YxVvNqkb062?usp=sharing" target="_blank"></a>
                <h3 className="position-title">Time Calculator · Python <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/time-calculator.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos8.map((label, index) => (
                    <div
                      key={`pos8-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length] = el)}
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
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 8 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(8)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://colab.research.google.com/drive/1HKEYQNZ-Gv1Ft4H9jxrPycjLY9YtOyhG?usp=sharing" target="_blank"></a>
                <h3 className="position-title">Budget app · Python <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/budget-app.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos9.map((label, index) => (
                    <div
                      key={`pos9-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length] = el)}
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
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 9 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(9)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href=""></a>
                <h3 className="position-title">Personal Portfolio · Web Dev <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
                <img className="project-image" src="projects_img/portfolio.png" alt="image1" />

                <div className="work-btns-container">
                  {buttons_pos10.map((label, index) => (
                    <div
                      key={`pos10-${index}`}
                      className="work-btn-container"
                      ref={(el) => (btnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length + buttons_pos9.length] = el)}
                      onMouseMove={(ev) => handleBtnHover(ev, index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length + buttons_pos9.length)}
                      onMouseLeave={() => handleBtnLeave(index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length + buttons_pos9.length)}
                    >
                      <div
                        className="work-btn-inner-container"
                        ref={(el) => (inenrBtnRef.current[index + buttons_pos1.length + buttons_pos2.length + buttons_pos3.length + buttons_pos4.length + buttons_pos5.length + buttons_pos6.length + buttons_pos7.length + buttons_pos8.length + buttons_pos9.length] = el)}
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

            {/* ---------------------------------- Visit General Projects ---------------------------------- */}
            <div
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 10 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(10)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://codepen.io/lCubosl" target="_blank"></a>
                <h3 className="position-title">View All CodePen Projects <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
              </div>
            </div>

            <div
              className={`position1-container ${hoverIndex !== null && hoverIndex !== 11 ? "faded" : "" }`}
              onMouseEnter={() => setHoverIndex(11)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="description-container">
                <a className="work-link" href="https://drive.google.com/file/d/1aM6p9Gf6ZttuAy6aax4zecQiISFsiwdu/view?usp=sharing" target="_blank"></a>
                <h3 className="position-title">Visit my GitHub Projects <span className="work-arrow"><img src="/icons_01/arrow.svg" alt="arrow" /></span></h3>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Projects