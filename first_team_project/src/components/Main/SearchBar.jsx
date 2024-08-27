import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./css/searchbar.css"

function SearchBar({ navigate, setSearch, Server_URL }) {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputRef.current.value.trim() !== "") {
      setSearch(inputRef.current.value);
      navigate(`/productlistsearch/1/1`);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current.value.trim() !== "") {
      setSearch(inputRef.current.value);
      navigate(`/productlistsearch/1/1`);
    }
  };

  return (
    <div className="search_wrap">
      <ul>
        <li className="search_logo">
          <Link to="/">
            <h1>
              <img src={`${Server_URL}/logo.png`} alt="" />
            </h1>
          </Link>
        </li>
        <li className="search_area">
          <input
            className="search_text"
            type="search"
            title="검색"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            placeholder="찾고싶은 상품을 입력해주세요"
          />
          <div className="search_button" onClick={handleButtonClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SearchBar;
