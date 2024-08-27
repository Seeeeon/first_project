import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Topbutton from "./Topbutton.jsx";

import "swiper/css";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/autoplay";
import "./css/reset.css";
import "./css/common.css";
import "./css/home.css";
import "./css/topbutton.css";

function Home() {
  const Server_URL = "http://localhost:8000";
  const [prodData, setProdData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await axios.get(`${Server_URL}/shop`, {});
        const processedData = rawData.data.map((item) => ({
          id: item.productid,
          name: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          starrating: item.starrating,
        }));
        processedData.sort((a, b) => b.starrating - a.starrating);
        setProdData(processedData);
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };
    fetchData();
  }, []);

  const rankingRef = useRef(null);
  const recProductsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#ranking" && rankingRef.current) {
      rankingRef.current.scrollIntoView({ behavior: "auto" });
      history.replaceState(null, null, " ");
    } else if (hash === "#rec_products" && recProductsRef.current) {
      recProductsRef.current.scrollIntoView({ behavior: "auto" });
      history.replaceState(null, null, " ");
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const renderProductItem = (index) => {
    const product = prodData[index];
    if (!product) return null;
    return (
      <div className="products_items" key={index}>
        {prodData.length > 0 && (
          <Link to={`/product/${product.id}`}>
            <img src={`${product.thumbnail}`} alt="이미지" />
            <p className="item_name">{product.name}</p>
            <p className="item_price">{product.price.toLocaleString()}원</p>
            <div className="star_rating">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < product.starrating ? "filled" : ""}`}
                ></span>
              ))}
            </div>
          </Link>
        )}
      </div>
    );
  };

  const renderRankingItem = (index) => {
    const product = prodData[index];
    if (!product) return null;
    return (
      <li key={index}>
        <div className="ranking_item">
          <Link to={`/product/${product.id}`}>
            <img src={`${product.thumbnail}`} alt="이미지" />
            <p className="item_name_ranking">{product.name}</p>
            <p className="item_price_ranking">
              {product.price.toLocaleString()}원
            </p>
            <div className="star_rating_ranking">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < product.starrating ? "filled" : ""}`}
                ></span>
              ))}
            </div>
            <div className="mark_best">BEST {index + 1}</div>
          </Link>
        </div>
      </li>
    );
  };

  return (
    <>
      <Topbutton />
      {/* swiper */}
      <section className="swiper_section">
        <div className="swiper_wrap">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 3000 }}
            className="swiper"
          >
            <SwiperSlide>
              <Link to="product/3">
                <img
                  className="banner_img"
                  src={`${Server_URL}/banner_1.jpg`}
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="product/2">
                <img
                  className="banner_img"
                  src={`${Server_URL}/banner_2.jpg`}
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="product/1">
                <img
                  className="banner_img"
                  src={`${Server_URL}/banner_3.jpg`}
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="product/4">
                <img
                  className="banner_img"
                  src={`${Server_URL}/banner_4.jpg`}
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* /swiper */}

      {/* recproducts */}
      <section
        id="rec_products"
        className="rec_products_section"
        ref={recProductsRef}
      >
        <div className="container">
          <h2>오늘의 추천상품</h2>
          <ul className="flex_area">
            <li>
              <div className="rec_products_item1 rec_products_item">
                <Link to="product/6">
                  <img src={`${Server_URL}/rec_1.png`} alt="" />
                </Link>
              </div>
              <div className="second_flex">
                <div>
                  <div className="rec_products_item2 rec_products_item">
                    <Link to="product/3">
                      <img src={`${Server_URL}/rec_2.jpg`} alt="" />
                    </Link>
                  </div>
                  <div className="rec_products_item3 rec_products_item">
                    <Link to="product/4">
                      <img src={`${Server_URL}/rec_3.jpg`} alt="" />
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="rec_products_item4 rec_products_item">
                    <Link to="product/5">
                      <img src={`${Server_URL}/rec_4.jpg`} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="rec_products_item5 rec_products_item">
                <Link to="product/1">
                  <img src={`${Server_URL}/rec_5.jpg`} alt="" />
                </Link>
              </div>
              <div className="rec_products_item6 rec_products_item">
                <Link to="product/2">
                  <img src={`${Server_URL}/rec_6.jpg`} alt="" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* /recproducts */}

      {/* product */}
      <section id="products" className="products_section">
        <div className="container">
          <h2>상품</h2>
          <ul>
            {prodData.slice(0, 6).map((_, index) => (
              <li key={index}>{renderProductItem(index)}</li>
            ))}
          </ul>
        </div>
      </section>
      {/* /product */}

      {/* kategorie */}
      <section id="kategorie" className="kategorie_section">
        <div className="container">
          <h2>카테고리</h2>
          <ul>
            <li>
              <div className="kategorie_items">
                <Link to={`shop/1/1/1`}>
                  <img src={`${Server_URL}/multi_vitamin.jpg`} alt="" />
                  <p>종합비타민제</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`shop/2/1/1`}>
                  <img src={`${Server_URL}/vitamin_d.jpg`} alt="" />
                  <p>비타민 D</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`shop/3/1/1`}>
                  <img src={`${Server_URL}/omega-3.jpg`} alt="" />
                  <p>오메가-3</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`shop/4/1/1`}>
                  <img src={`${Server_URL}/calsium_magnesium.jpg`} alt="" />
                  <p>칼슘 & 마그네슘 복합제</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`shop/5/1/1`}>
                  <img src={`${Server_URL}/vitamin_c.jpg`} alt="" />
                  <p>비타민 C</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="kategorie_items">
                <Link to={`shop/6/1/1`}>
                  <img src={`${Server_URL}/probiotics.jpg`} alt="" />
                  <p>프로바이오틱스</p>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* /kategorie */}

      {/* ranking */}
      <section id="ranking" className="ranking_section" ref={rankingRef}>
        <div className="container">
          <h2>랭킹</h2>
          <ul>
            <div className="ranking_items">
              {[...Array(8)].map((_, index) => renderRankingItem(index))}
            </div>
          </ul>
        </div>
      </section>
      {/* /ranking */}
    </>
  );
}

export default Home;
