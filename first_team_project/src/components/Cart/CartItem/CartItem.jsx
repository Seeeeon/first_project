import React from 'react';
import './CartItem.css';
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

function CartItem({ id, imageUrl, name, price, checked, quantity, onCheck, onDelete, onQuantityChange }) {
  const addProduct = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(id, newQuantity);
  };

  const removeProduct = () => {
    const newQuantity = quantity <= 1 ? 1 : quantity - 1;
    onQuantityChange(id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-checkbox">
        <input type="checkbox" checked={checked} onChange={e => onCheck(id, e.target.checked)} />
      </div>
      <div className="cart-item-delete">
        <button type="button" onClick={() => onDelete(id)}><MdClose /></button>
      </div>
      <div className="cart-item-info">
        <div className="cart-item-detail">
          <div className="cart-item-detail-thumb">
            <Link to={`/product/${id}`}><img src={imageUrl} alt={name} /></Link>
          </div>
          <div className="cart-item-detail-text">
          <Link to={`/product/${id}`}>{name}</Link>
            <p><span>{price}</span>원</p>
          </div>
        </div>
        <div className="cart-item-count">
          <p>수량</p>
          <div className="cart-item-count-content">
            <button type="button" onClick={removeProduct}><FaMinus /></button>
            <input type="text" pattern="\d*" maxLength="3" value={quantity} readOnly />
            <button type="button" onClick={addProduct}><FaPlus /></button>
          </div>
        </div>
        <div className='cart-item-product-total-price'>
          <p>상품 금액</p>
          <p><span>{(quantity*price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>원</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;