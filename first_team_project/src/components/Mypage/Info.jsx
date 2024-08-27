import React, { useState } from "react";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";

export default function Info({ loggedIn, onSubmit }) {
  // const [state, setState] = useState();
  // const  navigate = useNavigate();
  // const handeleChangeContent = (e) =. {
  //   setState({
  //     ...state,
  //     password: e.target.value,
  //     address: e.target.value,
  //     phonenumber: e.target.value,
  //   })
  // }
  return (
    <section className="info">
      <div className="info-container">
        <h2>개인정보변경</h2>
        <div className="info-items">
          <form action="/signup" target="_self" method="post">
            <label htmlFor="email">이메일 주소</label>
            <input
              type="email"
              id="email"
              name="email"
              value="joshkim159@hotmail.com"
              required
            />

            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value="asdf1234"
              required
            />

            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              value="asdf1234"
              required
            />

            <label htmlFor="username">이름</label>
            <input
              type="text"
              id="username"
              name="username"
              value="김주영"
              readOnly
            />

            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value="010-4908-4106"
              required
              maxLength="11"
              pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
              placeholder="휴대전화번호 입력"
            />

            <label htmlFor="address">주소</label>
            <input type="text" id="address" value="인천시 구월동" required />

            <div className="info-btn">
              <button>개인정보변경</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
