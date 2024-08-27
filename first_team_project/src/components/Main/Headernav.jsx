import { Link } from "react-router-dom";
import "./css/reset.css";
import "./css/headernav.css";

function Headernav() {
  return (
    <nav className="headernav">
      <ul>
        <li>
          <Link to="/shop">카테고리</Link>
        </li>
        <li>
          <Link to="/productlist/1/1">상품</Link>
        </li>
        <li>
          <Link to="/#rec_products">추천상품</Link>
        </li>
        <li>
          <Link to="/#ranking">랭킹</Link>
        </li>
        <li>
          <Link to="/reviews/1">리뷰 게시판</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Headernav;
