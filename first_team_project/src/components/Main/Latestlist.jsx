import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Paging from "./Paging.jsx";
import "./css/latestlist.css";

const Latestlist = () => {
  const { categoryid, page } = useParams();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const navigate = useNavigate();
  const title = [
    "종합비타민제",
    "비타민 D",
    "오메가-3",
    "칼슘 & 마그네슘 복합제",
    "비타민 C",
    "프로바이오틱스",
  ];
  const Server_URL = "http://localhost:8000";

  useEffect(() => {
    async function fetchData() {
      try {
        const rawData = await axios.get(`${Server_URL}/shop`, {});
        const categoryData = rawData.data.filter(
          (it) => it.category.toString() === categoryid.toString()
        );
        const prodData = categoryData.map((it) => ({
          id: it.productid,
          name: it.title,
          price: it.price,
          thumbnail: it.thumbnail,
          date: it.date,
          starrating: it.starrating,
        }));
        const sortedProd = [...prodData].sort(
          (a, b) => Number(b.id) - Number(a.id)
        );
        setProducts(sortedProd);
        setCount(sortedProd.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [categoryid]);

  useEffect(() => {
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(page);
  }, [page, products]);

  const handleChangePage = (page) => {
    const newUrl = `/shop/${categoryid}/1/${page}`;
    navigate(newUrl);
    setCurrentPage(page);
  };

  const goLatest = () => {
    navigate(`/shop/${categoryid}/1/1`);
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    const starsArray = [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`star ${i < filledStars ? "filled" : ""}`}
      ></span>
    ));
    return starsArray;
  };

  return (
    <div>
      <div className="title">
        <p>{title[categoryid - 1]}</p>
      </div>
      <div className="product_item_wrap">
        {products.map((product) => (
          <div key={product.id}>
            <ul className="product_item">
              <Link to={`/product/${product.id}`}>
                <img src={product.thumbnail} alt="이미지" />
                <li className="product_name">{product.name}</li>
                <li className="product_price">
                  {product.price.toLocaleString()}원
                </li>
                <li className="star_rating_kategorie">
                  {renderStars(product.starrating)}
                </li>
              </Link>
            </ul>
          </div>
        ))}
      </div>

      <Paging
        page={page}
        count={count}
        handleChangePage={handleChangePage}
        postPerPage={postPerPage}
      />
    </div>
  );
};

export default Latestlist;
