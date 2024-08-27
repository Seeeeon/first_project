  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import CartItem from './CartItem/CartItem';

  import CartInfo from './CartInfo/CartInfo';
  import './Cart.css';


  import { useNavigate } from 'react-router-dom';



  function CartSummary({ items }) {
    const navigate = useNavigate();
  
    const handleOrderAll = () => {
      if (items.length === 0) {
        alert('장바구니에 상품이 없습니다.');
      } else if (window.confirm('장바구니 안의 모든 상품을 주문 하시겠습니까?')) {
        navigate('/checkout', { state: { items } });
      }
    };
  
    const handleOrderSelected = () => {
      const selectedItems = items.filter(item => item.checked);
      if (selectedItems.length > 0) {
        if (window.confirm('선택하신 상품만 주문 하시겠습니까?')) {
          navigate('/checkout', { state: { items: selectedItems } });
        }
      } else {
        alert('선택된 상품이 없습니다.');
      }
    };
  
    const selectedItems = items.filter(item => item.checked);
    const totalProductPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalShippingPrice = selectedItems.length > 0 ? 2500 : 0;  // 배송비는 선택된 아이템이 있을 때만 부과
    const totalPrice = totalProductPrice + totalShippingPrice;
  
    return (
      <div className="cart-summary">
        <div className='cart-summary-price'>
          <h2>결제 정보</h2>
          <ul>
            <li>총 상품 금액 <span id="total-product-price">{totalProductPrice.toLocaleString()}원</span></li>
            <li>배송비 <span id="total-shipping-price">{totalShippingPrice.toLocaleString()}원</span></li>
            <li id="cart-total-price">결제 예정 금액 <span id="total-price">{totalPrice.toLocaleString()}원</span></li>
          </ul>
        </div>
        <div className="cart-summary-actions">
          <button 
            className="right-global-order-button" 
            type="button" 
            onClick={handleOrderAll}>
            전체 상품 주문
          </button>
          <button 
            className="right-global-order-selected-button" 
            type="button" 
            onClick={handleOrderSelected}>
            선택 상품 주문
          </button>
        </div>
      </div>
    );
  }




  function Cart() {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      const savedItems = localStorage.getItem('baskets');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
  
      const handleStorageChange = () => {
        const updatedItems = localStorage.getItem('baskets');
        if (updatedItems) {
          setItems(JSON.parse(updatedItems));
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
  
    const updateLocalStorage = (newItems) => {
      localStorage.setItem('baskets', JSON.stringify(newItems));
      window.dispatchEvent(new Event('storage'));
    };
  
    const handleSelectAll = () => {
      const allChecked = items.every(item => item.checked);
      const updatedItems = items.map(item => ({ ...item, checked: !allChecked }));
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
    };
  
    const handleItemCheck = (id, checked) => {
      const updatedItems = items.map(item => item.id === id ? { ...item, checked } : item);
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
    };
  
    const handleDeleteSelected = () => {
      if (items.some(item => item.checked)) {
        if (window.confirm('선택하신 상품들만 삭제하시겠습니까?')) {
          const updatedItems = items.filter(item => !item.checked);
          setItems(updatedItems);
          updateLocalStorage(updatedItems);
        }
      } else {
        alert('선택된 상품이 없습니다.');
      }
    };
  
    const handleItemDelete = (id) => {
      if (window.confirm('선택하신 상품을 정말 지우시겠습니까?')) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        updateLocalStorage(updatedItems);
      }
    };
  
    const handleQuantityChange = (id, quantity) => {
      const updatedItems = items.map(item => item.id === id ? { ...item, quantity } : item);
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
    };
  
    return (
      <div className="container">
        <div className="cart-textarea">
          <h1>장바구니</h1>
        </div>
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-item-wrapper">
              {items.length > 0 ? (
                items.map(item => (
                  <CartItem
                    key={item.id}
                    {...item}
                    quantity={item.quantity}
                    onCheck={handleItemCheck}
                    onDelete={handleItemDelete}
                    onQuantityChange={handleQuantityChange}
                  />
                ))
              ) : (
                <div className='cart-none-product'>
                  <p>장바구니가 비어 있습니다.</p>
                  <ul>
                    <li>
                      <Link to={'/productlist/1/1'}>상품페이지로 이동을 원하시면 클릭 해주세요.</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="cart-select-actions">
              <button className="cart-all-select" onClick={handleSelectAll}>전체선택</button>
              <button className="cart-all-select-delete" onClick={handleDeleteSelected}>선택삭제</button>
            </div>
          </div>
          <CartSummary items={items} />
        </div>
        <CartInfo />
      </div>
    );
  }
  
  export default Cart;