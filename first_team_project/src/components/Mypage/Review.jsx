
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/style.css";
import axios from "axios";
import Star from "./Star";

export default function Review() {
  const [product, setProduct] = useState(null);
  const [reviewtitle, setReviewtitle] = useState("");
  const [reviewtext, setReviewtext] = useState("");
  const [starrating, setStarrating] = useState(1);
  const { productid } = useParams();
  const location = useLocation();
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    if (location.state && location.state.userid) {
      setUserid(location.state.userid);
    }
  }, [location]);

  const navigate = useNavigate();

  const Server_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${Server_URL}/product/${productid}`);
        setProduct(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    if (productid) {
      fetchProduct();
    }
  }, [productid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    try {
      const response = await axios.post(`${Server_URL}/review`, {
        userid,
        reviewtitle,
        reviewtext,
        starrating,
        productid,
        date: currentDate,
      });
      const reviewid = response.data.id;
      const reviewdata = response.data;
      navigate(`/review/${productid}/${reviewid}`, {
        state: { review: reviewdata, userId: userid },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "reviewtext") {
      setReviewtext(value);
    } else if (name === "starrating") {
      setStarrating(value);
    } else if (name === "reviewtitle") {
      setReviewtitle(value);
    }
  };

  return (
    <div className="review-write">
      <h2>리뷰 작성</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="review-write-product">
          {product ? (
            <>
              <img src={product.thumbnail} alt={product.title} />
              <div className="review-write-productItem">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </>
          ) : (
            <p>Loading product...</p> // 데이터 로딩 중 메시지
          )}
        </div>
        <div className="review-write-star">
          <h4>상품에 대해 별점을 남겨주세요</h4>
          <Star value={starrating} onChange={setStarrating} />
        </div>
        <div className="review-write-comments">
          <input
            type="text"
            name="reviewtitle"
            value={reviewtitle}
            onChange={handleChange}
            maxLength="40"
            placeholder="리뷰 제목을 40자 이내로 작성해주세요"
          />
          <textarea
            name="reviewtext"
            value={reviewtext}
            onChange={handleChange}
            placeholder="리뷰를 작성해주세요"
          ></textarea>
        </div>
        <div className="review-write-submit">
          <button type="button" className="colordiff1" onClick={() => navigate(-1)}>
            등록 취소
          </button>
          <button type="submit" className="colordiff2">
            리뷰 등록
          </button>
        </div>
      </form>
    </div>
  );
}
