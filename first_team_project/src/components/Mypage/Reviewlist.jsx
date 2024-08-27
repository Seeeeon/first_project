
import React, { useState, useEffect } from "react";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/style.css";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from "react-router-dom";

export default function ReviewList() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1); // 초기 페이지 설정
  const [currentPosts, setCurrentPosts] = useState([]);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  // 날짜 변환 함수
  function formatDateToYYYYMMDDHHMM(dateString) {
    const now = new Date(dateString);
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
   
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/reviews");
        if (Array.isArray(response.data)) {
          const reviews = response.data.map((review) => ({
            ...review,
            date: formatDateToYYYYMMDDHHMM(review.date), // 날짜 형식 변환
          }));

          // 리뷰들을 날짜 내림차순으로 정렬
          reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

          setReviews(reviews);
          setCount(reviews.length);
        } else {
          console.error("Data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/shop");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
    fetchReviews();
  }, []);

  useEffect(() => {
    setCurrentPosts(reviews.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, reviews, products]);

  const handleChangePage = (pageNumber) => {
    const newUrl = `/reviews/${pageNumber}`;
    navigate(newUrl);
    setCurrentPage(pageNumber);
  };

  const getProductById = (productid) => {
    const product = products.find((product) => product.id === productid || product.productid === productid); // 키 이름 확인
    return product;
  };

  const handleReviewClick = (review) => {
    const product = getProductById(review.productid);
    navigate(`/review/${review.productid}/${review.reviewid}`, {
      state: { review: { ...review, product }, userId: review.userid },
    });
  };

  return (
    <div className="review-list">
      <h3 className="reviewedlist">작성한 상품 리뷰</h3>
      {currentPosts.map((review, index) => {
        const product = getProductById(review.productid);
        return (
          <div className="review-list-item" key={index}>
            
            <div className="review-list-title">
            <p>{review.userid}</p>
              <p>작성 날짜 {review.date}</p>
            </div>
            {product ? (
              <div className="review-list-product">
                <img src={product.thumbnail} alt="Product Image" />
                <div className="review-list-review">
                  <h5>{product.title}</h5>
                  {[...Array(review.starrating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star filled"></i>
                  ))}
                  <p>{product.description}</p>
                </div>
              </div>
            ) : (
              <p>Product information not found</p>
            )}
            <div className="review-list-comments">
              <p>{review.reviewtitle}</p>
              <p className="reviewtext">{review.reviewtext}</p>
              <div className="reviewbutton">
              <button onClick={() => handleReviewClick(review)}>리뷰보기</button>
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        itemsCountPerPage={postPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        onChange={handleChangePage}
        activePage={currentPage} // 현재 페이지 설정
      />
    </div>
  );
}
