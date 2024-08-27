import React, { useState } from "react";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  const Server_URL = "http://localhost:8000";

  const LoginPages = () => {
    console.log("LoginPages 함수 호출됨");

    axios
      .post(`${Server_URL}/login`, {
        email: email,
        password: password,
        usertype: "1",
      })
      .then((response) => {
        console.log("서버 응답:", response);
        if (response.data.success) {
          const { usertype, userid, username } = response.data.data[0];
          const userData = {
            userid: userid,
            username: username,
            usertype: usertype,
          };
          sessionStorage.setItem("userid", userid);
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userData", JSON.stringify(userData));
          sessionStorage.setItem("usertype", usertype);
          sessionStorage.setItem("userid", userid);

          navigate("/");
          window, location.reload();
        } else {
          console.log("로그인 실패:", response.data);
          setLoginStatus("로그인 실패: " + response.data.message);
        }
      });
  };

  return (
    <div>
      <section className="register-login">
        <div className="login-container">
          <div className="login-logo">
            <h1>
              <a href="/">
                <img src={`${Server_URL}/logo.png`} alt="logo" />
              </a>
            </h1>
          </div>
          <div className="login-id-pw">          
            <form action="#" method="post">
              <p>
                <label htmlFor="userid">
                  <span>이메일</span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </p>
              <p>
                <label htmlFor="userpw">
                  <span>비밀번호</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </p>
              {loginStatus && (
                    <div>{loginStatus}</div>
                  )}
              <div className="btn-wrapper">
                <div className="btn-point">
                 

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        LoginPages();
                      }}
                    >
                      로그인
                    </button>
                  
                </div>
              </div>
            </form>

            <div className="find-id-pw">
              <a href="#">아이디 찾기</a>
              <p>or</p>
              <a href="#">비밀번호 찾기</a>
            </div>
            <div className="go-sign-up">
              <p>
                로그인 계정이 없으신가요?
                <button onClick={() => navigate("/signup/personal")}>여기를 눌러 회원가입 하세요</button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
