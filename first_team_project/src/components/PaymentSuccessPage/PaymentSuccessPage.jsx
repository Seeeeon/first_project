import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { state } = useLocation();
  const { items } = state || { items: [] };
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      setOrderNumber(parsedUserInfo.orderNumber);
    }
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  if (!userInfo) {
    return <div>주문 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="payment-success-container">
      <h1>주문이 성공적으로 완료되었습니다.</h1>
      <p>주문 번호: {orderNumber}</p>
      <div className="order-summary">
        <h2>주문상품내역</h2>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>수량</th>
              <th>가격</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price)}원</td>
                <td>{formatPrice(item.price * item.quantity)}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>주문자정보</h2>
      <div className="user-info">
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td>{userInfo.recipientName}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{userInfo.recipientPhone}</td>
            </tr>
            <tr>
              <th>우편번호</th>
              <td>{userInfo.postcode}</td>
            </tr>
            <tr>
              <th>배송 주소</th>
              <td>{userInfo.deliveryAddress} {userInfo.detailAddress}</td>
            </tr>
            <tr>
              <th>배송 메모</th>
              <td>{userInfo.deliveryNote}</td>
            </tr>
            <tr>
              <th>결제 방법</th>
              <td>{userInfo.paymentMethod}</td>
            </tr>
            {userInfo.paymentMethod === '신용/체크카드' && (
              <>
                <tr>
                  <th>은행</th>
                  <td>{userInfo.bankName}</td>
                </tr>
                <tr>
                  <th>카드 번호</th>
                  <td>{userInfo.cardNumber}</td>
                </tr>
              </>
            )}
            {userInfo.paymentMethod === '계좌이체' && (
              <tr>
                <th>은행</th>
                <td>{userInfo.bankName}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default PaymentSuccessPage;
