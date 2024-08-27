import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/style.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emailDuplication, setEmailDuplication] = useState(true);
  const [allChecked, setAllChecked] = useState(false);
  const [requiredTerms, setRequiredTerms] = useState([false, false, false, false]);
  const [optionalTerms, setOptionalTerms] = useState([false, false]);
  const [terms, setTerms] = useState("");

  const Server_URL = "http://localhost:8000";

  const handleEmailDuplicationCheck = () => {
    if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    axios
      .post(`${Server_URL}/checkEmailDuplication`, { email })
      .then((response) => {
        console.log("서버 응답:", response.data);
        setEmailDuplication(response.data.success);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("이메일 중복 확인 중 오류:", error);
        alert("이메일 중복 확인 중 오류가 발생했습니다.");
      });
  };

  const handleAllCheckedChange = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setRequiredTerms([checked, checked, checked, checked]);
    setOptionalTerms([checked, checked]);
    setTerms(checked ? "전부수락" : "");
  };

  const handleRequiredChange = (index) => (e) => {
    const updatedRequiredTerms = [...requiredTerms];
    updatedRequiredTerms[index] = e.target.checked;
    setRequiredTerms(updatedRequiredTerms);
    updateTermsState(updatedRequiredTerms, optionalTerms);
  };

  const handleOptionalChange = (index) => (e) => {
    const updatedOptionalTerms = [...optionalTerms];
    updatedOptionalTerms[index] = e.target.checked;
    setOptionalTerms(updatedOptionalTerms);
    updateTermsState(requiredTerms, updatedOptionalTerms);
  };

  const updateTermsState = (updatedRequiredTerms, updatedOptionalTerms) => {
    const allRequiredChecked = updatedRequiredTerms.every(term => term);
    const [opt1, opt2] = updatedOptionalTerms;

    if (allRequiredChecked && opt1 && opt2) {
      setAllChecked(true);
      setTerms("전부수락");
    } else {
      setAllChecked(false);
      if (allRequiredChecked) {
        if (opt1 && opt2) {
          setTerms("전부수락");
        } else if (opt1) {
          setTerms("선택1");
        } else if (opt2) {
          setTerms("선택2");
        } else {
          setTerms("필수");
        }
      } else {
        setTerms("");
      }
    }
  };

  const handleRegisterClick = () => {
    if (!username || !email || !password || !confirmPassword || !address || !terms) {
      alert("필수 입력 사항들을 모두 입력해주세요!");
      return;
    }
    if (!emailDuplication) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!requiredTerms.every(term => term)) {
      alert("필수 약관들을 모두 동의해주세요.");
      return;
    }

    axios
      .post(`${Server_URL}/signup`, {
        username,
        password,
        email,
        address,
        phonenumber,
        usertype: "personal",
        terms,
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/login";
      })
      .catch((error) => {
        if (error.response) {
          console.error("서버 응답 오류:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("서버 응답이 없음:", error.request);
        } else {
          console.error("요청 설정 중 오류:", error.message);
        }
        alert("서버와의 통신 중 오류가 발생했습니다.");
      });
  };

  return (
    <section className="register-signup">
      <div className="signup-container">
        <h2>회원가입</h2>
        <div className="signup-flex">
          <div className="signup-flex-left">
            <div className="email-check-flex"><label htmlFor="email">이메일</label><button onClick={handleEmailDuplicationCheck}>중복확인</button></div>
            <input
              type="email"
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            

            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-flex-right">
            <label htmlFor="username">이름</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="phonenumber">전화번호</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
              maxLength="13"
              pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
              placeholder="휴대전화번호 입력"
            />

            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="terms">
          <p className="all-accept">
            <input
              type="checkbox"
              id="termCheckbox1"
              checked={allChecked}
              onChange={handleAllCheckedChange}
            />
            <label htmlFor="termCheckbox1">모두 확인하였습니다</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="termCheckbox2"
              checked={requiredTerms[0]}
              onChange={handleRequiredChange(0)}
              required
            />
            <label htmlFor="termCheckbox2">[필수]만 14세 이상인가요</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="termCheckbox3"
              checked={requiredTerms[1]}
              onChange={handleRequiredChange(1)}
              required
            />
            <label htmlFor="termCheckbox3">[필수]전자금융거래 이용약관 동의</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="termCheckbox4"
              checked={requiredTerms[2]}
              onChange={handleRequiredChange(2)}
              required
            />
            <label htmlFor="termCheckbox4">[필수]이용약관 동의</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="termCheckbox5"
              checked={requiredTerms[3]}
              onChange={handleRequiredChange(3)}
              required
            />
            <label htmlFor="termCheckbox5">[필수]개인정보 동의</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="termCheckbox6"
              checked={optionalTerms[0]}
              onChange={handleOptionalChange(0)}
            />
            <label htmlFor="termCheckbox6">[선택]개인정보 수집 및 이용 동의</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="termCheckbox7"
              checked={optionalTerms[1]}
              onChange={handleOptionalChange(1)}
            />
            <label htmlFor="termCheckbox7">[선택]광고성 정보 수신 동의</label>
          </p>
        </div>
        <div className="signup-btn">
          <button
            type="button"
            onClick={handleRegisterClick}
            disabled={!requiredTerms.every(term => term)}
          >
            회원가입
          </button>
        </div>
      </div>
    </section>
  );
}
