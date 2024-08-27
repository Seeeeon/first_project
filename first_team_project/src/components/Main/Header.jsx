import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "./SearchContext";
import "./css/reset.css";
import "./css/header.css";
import LoginMenu from "./LoginMenu";
import SearchBar from "./SearchBar";

function Header() {
  const navigate = useNavigate();
  const { setSearch } = useSearchContext();
  const Server_URL = "http://localhost:8000";

  return (
    <header>
      <div className="login_search_wrap">
        <LoginMenu navigate={navigate} />
        <SearchBar navigate={navigate} setSearch={setSearch} Server_URL={Server_URL} />
      </div>
    </header>
  );
}

export default Header;
