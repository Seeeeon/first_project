import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { items } = state || { items: [] };

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [customDeliveryNote, setCustomDeliveryNote] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [depositorName, setDepositorName] = useState('');
  const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);

  const [errors, setErrors] = useState({
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    detailAddress: '',
    paymentMethod: '',
    termsAgreed: ''
  });

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const totalProductPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalShippingPrice = 2500;
  const totalPrice = totalProductPrice + totalShippingPrice;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = value.length <= 3 ? value : value.length <= 7 ?
      `${value.slice(0, 3)}-${value.slice(3)}` : `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;

    setRecipientPhone(formattedValue);
  };

  useEffect(() => {
    const plainPhone = recipientPhone.replace(/-/g, '');
    setErrors((prevErrors) => ({
      ...prevErrors,
      recipientPhone: plainPhone.length === 11 ? '' : '11자리 모두 입력'
    }));
  }, [recipientPhone]);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${extraAddress}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setPostcode(data.zonecode);
    setDeliveryAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
        await loadScript("https://cdn.portone.io/v2/browser-sdk.js");
        setIsScriptsLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadScripts();

    return () => {
      const jquery = document.querySelector(
        'script[src="https://code.jquery.com/jquery-3.7.1.min.js"]'
      );
      const portone = document.querySelector(
        'script[src="https://cdn.portone.io/v2/browser-sdk.js"]'
      );
      if (jquery) document.head.removeChild(jquery);
      if (portone) document.head.removeChild(portone);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!recipientName) newErrors.recipientName = '이름을 입력해주세요.';
    if (recipientPhone.replace(/-/g, '').length !== 11) newErrors.recipientPhone = '11자리 모두 입력';
    if (!deliveryAddress) newErrors.deliveryAddress = '주소를 입력해주세요.';
    if (!termsAgreed) newErrors.termsAgreed = '약관에 동의해주세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async () => {
    if (!validateForm()) {
      return;
    }

    if (!isScriptsLoaded) {
        alert("스크립트가 아직 로드되지 않았습니다. 다시 시도해주세요.");
        return;
    }

    const { PortOne } = window;
    if (!PortOne) {
        alert("결제 SDK가 제대로 로드되지 않았습니다.");
        return;
    }

    const storeId = import.meta.env.VITE_PORTONE_STORE_ID;
    let channelKey, payMethod, easyPay;

    switch (paymentMethod) {
        case '카카오페이':
            channelKey = import.meta.env.VITE_PORTONE_KAKAO_CHANNEL_KEY;
            payMethod = 'EASY_PAY';
            easyPay = { easyPayProvider: "KAKAOPAY" };
            break;
        case '토스페이':
            channelKey = import.meta.env.VITE_PORTONE_TOSS_CHANNEL_KEY;
            payMethod = 'EASY_PAY';
            easyPay = { easyPayProvider: "TOSSPAY" };
            break;
        case '신용/체크카드':
            channelKey = import.meta.env.VITE_PORTONE_NICEPAY_CHANNEL_KEY;
            payMethod = 'CARD';
            easyPay = undefined;
            break;
        case '계좌이체':
            channelKey = import.meta.env.VITE_PORTONE_NICEPAY_CHANNEL_KEY;
            payMethod = 'TRANSFER';
            easyPay = undefined;
            break;
        default:
            alert("올바른 결제 수단을 선택해주세요.");
            return;
    }

    try {
        const payResponse = await PortOne.requestPayment({
            storeId,
            channelKey,
            paymentId: `payment-${uuidv4()}`,
            orderName: `${items[0].name} 외 ${items.length - 1} 건`,
            totalAmount: totalPrice,
            currency: "KRW",
            payMethod,
            productType: "REAL",
            easyPay,
        });

        if (payResponse.code) {
            alert(payResponse.message);
            return;
        }

        if (payResponse.transactionType === "PAYMENT") {
            handleOrder();
        }
    } catch (error) {
        alert("결제 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
        console.error(error);
    }
  };

  const generateOrderNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
  };

  const handleOrder = async () => {
    const orderNumber = generateOrderNumber();
    const userid = sessionStorage.getItem('userid');
    const orderSheet = items.map(item => ({
      orderNumber,
      userid,
      productcode: item.id,
      orderName: item.name,
      postcode,
      address: deliveryAddress,
      detailedAddress: detailAddress,
      phoneNumber: recipientPhone,
      reqMessage: deliveryNote === '직접 입력' ? customDeliveryNote : deliveryNote,
      quantity: item.quantity,
      totalCount: items.length,
      totalAmount: totalPrice,
      payment: paymentMethod,
      imageUrl: item.imageUrl,
      paymentamount: item.price * item.quantity,
    }));

    console.log('Sending order data:', orderSheet);

    try {
      const response = await axios.post("http://localhost:8000/saveOrder", { orderSheet });
      if (response.data.success) {
        alert("결제가 완료되었습니다.");
        localStorage.removeItem('baskets');
        const userInfo = {
          recipientName,
          recipientPhone,
          postcode,
          deliveryAddress,
          detailAddress,
          deliveryNote: deliveryNote === '직접 입력' ? customDeliveryNote : deliveryNote,
          paymentMethod,
          bankName,
          cardNumber,
          orderNumber
        };
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate("/payment-success", { state: { items } });
      } else {
        alert("결제 저장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert("결제 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="checkout-container">
      <h1>결제하기</h1>
      {items.length > 0 ? (
        <>
          <div className="items-container">
            {items.map((item) => (
              <div className="item" key={item.id}>
                <img src={item.imageUrl} alt={item.name} className="item-image" />
                <div className="item-details">
                  <div className="item-name">{formatPrice(item.price)}원</div>
                  <div className="item-quantity">주문수량: {item.quantity} 개</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); processPayment(); }}>
            <div className='user-infomation'>
              <label>
                <p>이름</p>
                <input className='checkout-text'
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, recipientName: '' }))}
                  required
                />
                {errors.recipientName && <span className="error-message">{errors.recipientName}</span>}
              </label>
              <label>
                <p>연락처</p>
                <input className='checkout-text'
                  type="text"
                  value={recipientPhone}
                  onChange={handlePhoneChange}
                  onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, recipientPhone: '' }))}
                  required
                />
                {errors.recipientPhone && <span className="error-message">{errors.recipientPhone}</span>}
              </label>
              <label>
                <p>주소</p>
                <div className='delivery-area'>
                  <input
                    className='checkout-text'
                    type="text"
                    value={postcode}
                    placeholder="우편번호"
                    readOnly
                    style={{ flex: 1, outline: 'none' }}
                  />
                  <button
                    className='find-address'
                    type="button"
                    onClick={() => setIsPostcodeOpen(true)}
                  >
                    주소 찾기
                  </button>
                </div>
                <input className='checkout-text'
                  type="text"
                  value={deliveryAddress}
                  placeholder="배송 주소"
                  readOnly
                  style={{ outline: 'none' }}
                />
                {errors.deliveryAddress && <span className="error-message">{errors.deliveryAddress}</span>}
              </label>
              <label>
                <input className='checkout-text'
                  type="text"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, detailAddress: '' }))}
                  placeholder="나머지 주소(선택 입력 가능)"
                />
                {errors.detailAddress && <span className="error-message">{errors.detailAddress}</span>}
              </label>
              <label>
                <p>배송 메모</p>
                <select
                  className='checkout-text'
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>요청사항을 선택해주세요</option>
                  <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                  <option value="직접 수령할게요">직접 수령할게요</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="배송 전 연락 부탁드립니다">배송 전 연락 부탁드립니다</option>
                  <option value="부재 시 연락처로 연락주세요">부재 시 연락처로 연락주세요</option>
                  <option value="직접 입력">직접 입력</option>
                </select>
                {deliveryNote === '직접 입력' && (
                  <input
                    className='checkout-text'
                    type="text"
                    placeholder="요청사항을 입력해주세요"
                    value={customDeliveryNote}
                    onChange={(e) => setCustomDeliveryNote(e.target.value)}
                    required
                  />
                )}
              </label>
            </div>
            <label>결제 방법</label>
            <div className="payment-method-buttons">
              <button
                type="button"
                className={paymentMethod === '신용/체크카드' ? 'selected' : ''}
                onClick={() => setPaymentMethod('신용/체크카드')}
              >
                신용/체크카드
              </button>
              <button
                type="button"
                className={paymentMethod === '계좌이체' ? 'selected' : ''}
                onClick={() => setPaymentMethod('계좌이체')}
              >
                계좌이체
              </button>
              <button
                type="button"
                className={paymentMethod === '카카오페이' ? 'selected' : ''}
                onClick={() => setPaymentMethod('카카오페이')}
              >
                카카오페이
              </button>
              <button
                type="button"
                className={paymentMethod === '토스페이' ? 'selected' : ''}
                onClick={() => setPaymentMethod('토스페이')}
              >
                토스페이
              </button>
            </div>
            {paymentMethod === '신용/체크카드' && (
              <div className='select-bank'>
                <label>
                  은행 선택
                  <select value={bankName} onChange={(e) => setBankName(e.target.value)} required>
                    <option value="">선택하세요</option>
                    <option value="신한은행">신한은행</option>
                    <option value="농협은행">농협은행</option>
                    <option value="기업은행">기업은행</option>
                    <option value="국민은행">국민은행</option>
                  </select>
                </label>
                <label>
                  카드 번호
                  <input className='checkout-text'
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </label>
                <label>
                  유효 기간
                  <input className='checkout-text'
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    required
                  />
                </label>
                <label>
                  CVV
                  <input className='checkout-text'
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </label>
              </div>
            )}
            {paymentMethod === '계좌이체' && (
              <label>
                은행 선택
                <select value={bankName} onChange={(e) => setBankName(e.target.value)} required>
                  <option value="">선택하세요</option>
                  <option value="신한은행">신한은행</option>
                  <option value="농협은행">농협은행</option>
                  <option value="기업은행">기업은행</option>
                  <option value="국민은행">국민은행</option>
                </select>
                입금자명
                <input className='checkout-text'
                  type='text'
                  value={depositorName}
                  onChange={(e) => setDepositorName(e.target.value)}
                  required>
                </input>
              </label>
            )}
            <div className="payment-terms-container">
              <input
                className='payment-terms'
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                required
              />
              <label className='terms-text'>약관에 동의합니다.</label>
            </div>
            <div className="checkout-summary">
              <p>상품 금액 : {formatPrice(totalProductPrice)}원</p>
              <p>배송비 : {formatPrice(totalShippingPrice)}원</p>
              <p>총 주문 금액 : {formatPrice(totalPrice)}원</p>
            </div>
            <button className='make-payment' type="submit">결제하기</button>
          </form>
        </>
      ) : (
        <div className='none-product'>
          <p>결제할 상품이 없습니다.</p>
          <p>상품을 장바구니에 담으시고 결제를 부탁합니다</p>
          <ul>
            <li>
              <Link to={"/product"}>상세페이지로 이동하시겠습니까?</Link>
            </li>
          </ul>
        </div>
      )}

      {isPostcodeOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsPostcodeOpen(false)}>X</button>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
