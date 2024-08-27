import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 라우팅을 위한 react-router-dom import

import Header from "./components/Main/Header.jsx";
import { SearchProvider } from "./components/Main/SearchContext.jsx";
import Headernav from "./components/Main/Headernav.jsx";
import Home from "./components/Main/Home.jsx";
import Kategorie from "./components/Main/Kategorie.jsx";
import Latestlist from "./components/Main/Latestlist.jsx";
import Productlist from "./components/Main/Productlist.jsx";
import Footer from "./components/Main/Footer.jsx";

import Cart from "./components/Cart/Cart.jsx";
import Login from "./components/Mypage/Login.jsx";
import Product from "./components/Product/product.jsx";
import Signup from "./components/Mypage/Signup.jsx";
import Mypage from "./components/Mypage/Mypage.jsx";

import Review from "./components/Mypage/Review.jsx";
import ReviewItem from "./components/Mypage/ReviewItem.jsx";
import Info from "./components/Mypage/Info.jsx";
import ReviewList from "./components/Mypage/Reviewlist.jsx";
import ReviewEdit from "./components/Mypage/ReviewEdit.jsx";
import Orderlist from "./components/Mypage/Orderlist.jsx";
import PaymentSuccessPage from "./components/PaymentSuccessPage/PaymentSuccessPage.jsx";
import CheckoutPage from "./components/Checkout/CheckoutPage.jsx";


import ScrollToTop from "./components/Main/ScrollToTop.jsx";
import ProductListSearch from "./components/Main/ProductListSearch.jsx";

function App() {

  const [cartlength, setCartlength] = useState(0);

  useEffect(() => {
    if (localStorage.baskets !== undefined) {
      const baskets = JSON.parse(localStorage.getItem("baskets"));
      setCartlength(baskets.length);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <SearchProvider>
        <div className="App">
          <Header cartlength={cartlength} />
          <Headernav />
          <div className="App_main_height">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Kategorie />} />
              <Route path="/shop/:categoryid/1/:page" element={<Latestlist />} />
              <Route path="/productlist/:categoryid/:page" element={<Productlist />} />
              <Route path="/productListSearch/:categoryid/:page" element={<ProductListSearch />} />
              <Route path="/product/:id" element={<Product setCartlength={setCartlength} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup/personal" element={<Signup />} />
              <Route path="/info" element={<Info />} />
              <Route path="/cart" element={<Cart setCartlength={setCartlength} />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/review/:productid" element={<Review />} />
              <Route path="/review/:productid/:reviewid" element={<ReviewItem />} />
              <Route path="/review/edit/:reviewid" element={<ReviewEdit />} />
              <Route path="/reviews/:page" element={<ReviewList />} />
              <Route path="/Orderlist" element={<Orderlist />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;
