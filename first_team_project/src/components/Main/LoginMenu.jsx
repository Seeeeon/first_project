import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/reset.css";
import "./css/loginmenu.css";

function LoginMenu({ navigate }) {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem("loggedIn");
    if (storedLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("usertype");
    sessionStorage.removeItem("userData");
    setLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="login_area">
      {loggedIn ? (
        <ul>
          <li onClick={handleLogout}>
            <a>로그아웃</a>
          </li>
          <li>
            <Link to="/cart">장바구니</Link>
          </li>
          <li>
            <Link to="/orderlist">구매내역</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/signup/personal">회원가입</Link>
          </li>
          <li>
            <Link to="/login">장바구니</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LoginMenu;
