import React from "react";
import { Link } from "react-router-dom";
import "./css/reset.css";
import "./css/footer.css";

function Footer() {
  const Server_URL = "http://localhost:8000";

  return (
    <footer>
      <div className="footer_nav_wrap">
        <nav>
          <ul className="footer_nav_area">
            <li>
              <p>회사소개</p>
            </li>
            <li>
              <p>이용약관</p>
            </li>
            <li>
              <p>개인정보처리방침</p>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer_info">
        <ul>
          <li>
            <Link to="/">
              <h3>
                <img src={`${Server_URL}/logo.png`} alt="" />
              </h3>
            </Link>
          </li>
          <li className="footer_info_text">
            <p>주소: 인천 남동구 인주대로 593 엔타스빌딩 12층</p>
            <p>고객센터: 032-000-0000</p>
            <p>이메일문의: blahblah@naver.com</p>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
