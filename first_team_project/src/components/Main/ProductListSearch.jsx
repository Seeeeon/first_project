import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchContext } from "./SearchContext";
import Paging from "./Paging.jsx";
import "./css/productlist.css";

const ProductListSearch = () => {
  const { categoryid, page } = useParams();
  const { search } = useSearchContext();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [searchresultempty, setsearchresultempty] = useState([false]);
  const postPerPage = 9;
  const navigate = useNavigate();
  const Server_URL = "http://localhost:8000";

  useEffect(() => {
    async function fetchData() {
      try {
        const rawData = await axios.get(`${Server_URL}/shop`, {});
        const categoryData = rawData.data.filter(
          (it) => it.category >= categoryid
        );
        const prodData = categoryData.map((it) => ({
          id: it.productid,
          name: it.title,
          price: it.price,
          thumbnail: it.thumbnail,
          date: it.date,
          starrating: it.starrating,
        }));
        const sortedProd = [...prodData].sort((a, b) =>
          a.name.localeCompare(b.name)
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
    const indexOfLastPost = page * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const filteredProducts = searchProducts().slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    setCurrentPosts(filteredProducts);
  }, [page, search, products]);

  const handleChangePage = (page) => {
    const newUrl = `/productlistsearch/${categoryid}/${page}`;
    navigate(newUrl);
    setCurrentPage(page);
  };

  const searchProducts = () => {
    const filter =
      search === ""
        ? products
        : products.filter((it) =>
            it.name.toLowerCase().includes(search.toLowerCase())
          );
    setsearchresultempty(filter.length === 0);
    return filter;
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
      <div className="title"></div>
      <div className="product_item_wrap">
        {searchresultempty ? (
          <p>검색된 결과가 없습니다</p>
        ) : (
          currentPosts.map((product) => (
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
          ))
        )}
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

export default ProductListSearch;
