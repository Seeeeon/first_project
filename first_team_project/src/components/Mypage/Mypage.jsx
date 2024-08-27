import React, { useEffect, useState } from "react";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/style.css";

export default function Mypage() {
  const Server_URL = "http://localhost:8000";

  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await fetch(`${Server_URL}/signup`)
  //     }
  //   }
  // })


  // useEffect(() => {
  //   if () {

  //   }

  //   if(!location.state) {
  //     alert("잘못된 접근입니다!");
  //     return Navigate("/");
  //   } else {

  //   }


  // })

  return (
    <>
      <section className="register-mypage">
        {/* <div className="navbar">
          <h1>Logo</h1>
          <nav>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-solid fa-house"></i>홈
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-shop"></i>상품페이지
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-cart-shopping"></i>장바구니
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-scroll"></i>마이페이지
                </a>
              </li>
            </ul>
          </nav>
        </div> */}

        <div className="maintext-container">
          <h2>마이페이지</h2>
          <div className="flex-box">
            <div className="flex-content">
              <div className="div-box">
                <div className="account-info">
                  <div className="flexwrap">
                    <h3>계정관리</h3>
                    <button>
                      <a href="/Info">개인정보변경</a>
                    </button>
                  </div>
                  <ul>
                    <li>
                      <p>이메일</p>
                      <span className="info-item6">asdfsadfsafd</span>
                    </li>
                    <li>
                      <p>비밀번호</p>
                      <span className="info-item4">asdfsadfsafd</span>
                    </li>
                    <li>
                      <p>유저이름</p>
                      <span className="info-item4">asdfsadfsafd</span>
                    </li>
                    <li>
                      <p>전화번호</p>
                      <span className="info-item4">asdfsadfsafd</span>
                    </li>
                    <li>
                      <p>주소</p>
                      <span className="info-item2">asdfsadfsafd</span>
                    </li>
                  </ul>
                </div>
                <div className="purchase-history">
                  <h3>구매내역</h3>
                  <div className="purchase-history-container">
                    <h4>2024-06-05</h4>
                    <div className="purchase-history-container-items">
                      <div className="purchase-history-container-item">
                        <div className="left">
                          <div className="flex-left">
                            <a href="#">
                              <img
                                src="http://localhost:8000/hff_logo.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="flex-right">
                            <h5>상품명</h5>
                            <a href="#">
                              상품설명 1줄 요약Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Labore vitae
                              incidunt eos atque dicta natus quam accusantium
                              placeat.
                            </a>
                            <p>수량/가격</p>
                          </div>
                        </div>
                        <div className="right">
                          <p>승인번호</p>
                          <a href="/Review">
                            {" "}
                            <button>리뷰쓰기</button>
                          </a>
                          <button>구매취소</button>
                        </div>
                      </div>
                      <div className="purchase-history-container-item">
                        <div className="left">
                          <div className="flex-left">
                            <a href="#">
                              <img
                                src="http://localhost:8000/hff_logo.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="flex-right">
                            <h5>상품명</h5>
                            <a href="#">
                              상품설명 1줄 요약Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Labore vitae
                              incidunt eos atque dicta natus quam accusantium
                              placeat.
                            </a>
                            <p>수량/가격</p>
                          </div>
                        </div>
                        <div className="right">
                          <p>승인번호</p>
                          <a href="/Review">
                            {" "}
                            <button>리뷰쓰기</button>
                          </a>
                          <button>구매취소</button>
                        </div>
                      </div>
                      <div className="purchase-history-container-item">
                        <div className="left">
                          <div className="flex-left">
                            <a href="#">
                              <img
                                src="http://localhost:8000/hff_logo.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="flex-right">
                            <h5>상품명</h5>
                            <a href="#">
                              상품설명 1줄 요약Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Labore vitae
                              incidunt eos atque dicta natus quam accusantium
                              placeat.
                            </a>
                            <p>수량/가격</p>
                          </div>
                        </div>
                        <div className="right">
                          <p>승인번호</p>
                          <a href="/Review">
                            {" "}
                            <button>리뷰쓰기</button>
                          </a>
                          <button>구매취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="purchase-history-container">
                    <h4>2024-06-04</h4>
                    <div className="purchase-history-container-items">
                      <div className="purchase-history-container-item">
                        <div className="left">
                          <div className="flex-left">
                            <a href="#">
                              <img
                                src="http://localhost:8000/hff_logo.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="flex-right">
                            <h5>상품명</h5>
                            <a href="#">
                              상품설명 1줄 요약Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Labore vitae
                              incidunt eos atque dicta natus quam accusantium
                              placeat.
                            </a>
                            <p>수량/가격</p>
                          </div>
                        </div>
                        <div className="right">
                          <p>승인번호</p>
                          <a href="/Review">
                            {" "}
                            <button>리뷰쓰기</button>
                          </a>
                          <button>구매취소</button>
                        </div>
                      </div>

                      <div className="purchase-history-container-item">
                        <div className="left">
                          <div className="flex-left">
                            <a href="#">
                              <img
                                src="http://localhost:8000/hff_logo.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="flex-right">
                            <h5>상품명</h5>
                            <a href="#">
                              상품설명 1줄 요약Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Labore vitae
                              incidunt eos atque dicta natus quam accusantium
                              placeat.
                            </a>
                            <p>수량/가격</p>
                          </div>
                        </div>
                        <div className="right">
                          <p>승인번호</p>
                          <a href="/Review">
                            {" "}
                            <button>리뷰쓰기</button>
                          </a>
                          <button>구매취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review-list">
                  <h3>작성한 상품 리뷰</h3>
                  <div className="review-list-container">
                    <div className="review-list-item">
                      <div className="review-list-title">
                        <p>작성 날짜 2024-06-05</p>
                      </div>
                      <div className="review-list-product">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                        <div className="review-list-review">
                          <h5>상품명</h5>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                      <div className="review-list-comments">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Labore vitae incidunt eos atque dicta natus quam
                          accusantium placeat.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore vitae incidunt
                          eos atque dicta natus quam accusantium placeat.Lorem
                          ipsum dolor sit amet consectetur adipisicing elit.
                          Labore vitae incidunt eos atque dicta natus quam
                          accusantium placeat.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore vitae incidunt
                          eos atque dicta natus quam accusantium placeat.
                        </p>
                      </div>
                      <div className="review-list-edit">
                        <a href="/Review">
                          <button>수정하기</button>
                        </a>
                        <button>삭제하기</button>
                      </div>
                    </div>
                    <div className="review-list-item">
                      <div className="review-list-title">
                        <p>작성 날짜 2024-06-05</p>
                      </div>
                      <div className="review-list-product">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                        <div className="review-list-review">
                          <h5>상품명</h5>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                      <div className="review-list-comments">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Labore vitae incidunt eos atque dicta natus quam
                          accusantium placeat.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore vitae incidunt
                          eos atque dicta natus quam accusantium placeat.Lorem
                          ipsum dolor sit amet consectetur adipisicing elit.
                          Labore vitae incidunt eos atque dicta natus quam
                          accusantium placeat.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore vitae incidunt
                          eos atque dicta natus quam accusantium placeat.
                        </p>
                      </div>
                      <div className="review-list-edit">
                        <a href="/Review">
                          <button>수정하기</button>
                        </a>
                        <button>삭제하기</button>
                      </div>
                    </div>
                    <div className="review-list-item">
                      <div className="review-list-title">
                        <p>작성 날짜 2024-06-05</p>
                      </div>
                      <div className="review-list-product">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                        <div className="review-list-review">
                          <h5>상품명</h5>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                      <div className="review-list-comments">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Labore vitae incidunt eos atque dicta natus quam
                          accusantium placeat.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore vitae incidunt
                          eos atque dicta natus quam accusantium placeat.Lorem
                          ipsum dolor sit amet consectetur adipisicing elit.
                          Labore vitae incidunt eos atque dicta natus quam
                          accusantium placeat.Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore vitae incidunt
                          eos atque dicta natus quam accusantium placeat.
                        </p>
                      </div>
                      <div className="review-list-edit">
                        <a href="/Review">
                          <button>수정하기</button>
                        </a>
                        <button>삭제하기</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="recentview">
                  <h3>최근 본 상품</h3>
                  <div className="flex-wrap">
                    <div className="wrap-content">
                      <a href="#">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                      </a>
                      <p>가격</p>
                      <h4>상품명</h4>
                    </div>
                    <div className="wrap-content">
                      <a href="#">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                      </a>
                      <p>가격</p>
                      <h4>상품명</h4>
                    </div>
                    <div className="wrap-content">
                      <a href="#">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                      </a>
                      <p>가격</p>
                      <h4>상품명</h4>
                    </div>
                    <div className="wrap-content">
                      <a href="#">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                      </a>
                      <p>가격</p>
                      <h4>상품명</h4>
                    </div>
                    <div className="wrap-content">
                      <a href="#">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                      </a>
                      <p>가격</p>
                      <h4>상품명</h4>
                    </div>
                    <div className="wrap-content">
                      <a href="#">
                        <img src="http://localhost:8000/hff_logo.jpg" alt="" />
                      </a>
                      <p>가격</p>
                      <h4>상품명</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
