import React from "react";
import { Link } from "react-router-dom";

import "./css/reset.css";
import "./css/common.css";
import "./css/kategorie.css";

const Kategorie = () => {
  const Server_URL = "http://localhost:8000";

  return (
    <>
      <section id="kategorie" className="kategorie_section">
        <div className="container">
          <ul>
            <li>
              <div className="kategorie_items">
                <Link to={`/shop/1/1/1`}>
                  <img src={`${Server_URL}/multi_vitamin.jpg`} alt="" />
                  <p>종합비타민제</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`/shop/2/1/1`}>
                  <img src={`${Server_URL}/vitamin_d.jpg`} alt="" />
                  <p>비타민 D</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`/shop/3/1/1`}>
                  <img src={`${Server_URL}/omega-3.jpg`} alt="" />
                  <p>오메가-3</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`/shop/4/1/1`}>
                  <img src={`${Server_URL}/calsium_magnesium.jpg`} alt="" />
                  <p>칼슘 & 마그네슘 복합제</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`/shop/5/1/1`}>
                  <img src={`${Server_URL}/vitamin_c.jpg`} alt="" />
                  <p>비타민 C</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`/shop/6/1/1`}>
                  <img src={`${Server_URL}/probiotics.jpg`} alt="" />
                  <p>프로바이오틱스</p>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Kategorie;
