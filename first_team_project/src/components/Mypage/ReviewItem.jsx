
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function ReviewItem() {
  const location = useLocation();
  const { review, userId } = location.state;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffTime = Math.abs(now - date);
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffSeconds < 60) {
      return `${diffSeconds} 초 전`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} 분 전`;
    } else if (diffHours < 24) {
      return `${diffHours} 시간 전`;
    } else {
      return `${diffDays} 일 전`;
    }
  };

  if (!review) {
    return <p>Loading review...</p>;
  }

  const maskUserId = (userId) => {
    if (userId.length > 3) {
      return `${userId.slice(0, 3)}***`;
    }
    return userId;
  };

  return (
    <div className="review-list item">
      <div className="review-list-title">
        <div className="review-list-reviewtitle">
          <p className="review-list-title-size">{review.reviewtitle}</p>
          <p>id: {maskUserId(userId)}</p>
        </div>
        <div className="review-list-title-flex">
          <div className="review-list-title-button">
            <Link to="/reviews/1">
              <button>리뷰 게시판</button>
            </Link>
          </div>
          <div className="review-list-date">{formatDate(review.date)}</div>
        </div>
      </div>
      <div className="review-list-product">
        <div>
          <img src={review.product.thumbnail} alt="Product Thumbnail" />
        </div>
        <div className="review-list-product-wrap">
          <div className="review-list-product-title">
            {review.product.title}
          </div>
          <div className="review-list-product-star">
            {[...Array(review.starrating)].map((_, i) => (
              <i key={i} className="fa-solid fa-star filled"></i>
            ))}
          </div>
          <div className="review-list-product-description">
        {review.product.description}
      </div>
        </div>
      </div>
      
      <div className="review-list-comments">
        <p>{review.reviewtext}</p>
      </div>
      <div className="review-list-button">
        <Link to="/reviews/1">
          <button>목록</button>
        </Link>
      </div>
    </div>
  );
}
