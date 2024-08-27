import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRef } from 'react';
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import ClipboardLink from './ClipboardLink';
import Qna from './Qna';
import './product.css'
import '../../assets/css/common.css'
import '../../assets/css/reset.css'
import Topbutton from '../Main/Topbutton';


const Product = ({ setCartlength }) => {
    const navigate = useNavigate();
    //  상품 페이지에 정보 불러오기
    const { id } = useParams();
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("")
    const [detailimage, setDetailImage] = useState("")
    const [title, setTitle] = useState("")
    const [products, setProducts] = useState([
        {
            id: "",
            thumbnail: "",
            title: "",
            description: "",
            price: "",
            detailimage: "",
        },
    ]);

    const Server_URL = "http://localhost:8000";

    useEffect(() => {
        async function resData() {
            const responses = await axios.get(`${Server_URL}/shop`, {});
            const inputData = await responses.data.filter((it) => it.productid == id);
            const product = await inputData.map((it) => ({
                id: it.productid,
                thumbnail: it.thumbnail,
                title: it.title,
                description: it.description,
                price: it.price,
                detailimage: it.detailimage
            }));

            setProducts(product);
            // 상품 슬라이드 이미지 출력
            const [{ thumbnail }] = product;
            setThumbnail(thumbnail);

            // 상품 상세이미지 출력
            const [{ detailimage }] = product;
            setDetailImage(detailimage);

            // 상품 이름 출력
            const [{ title }] = product;
            setTitle(title);

            // 상품 설명 출력
            const [{ description }] = product;
            setDescription(description);

        }
        resData();
    }, [id]);

    useEffect(() => {
        if (products.length > 0) {
            setTotal(parseInt(products[0].price));
        } else {
            setTotal(0);
        }
    }, [products]);
    //  상품 페이지에 정보 불러오기 F   

    // 구매 개수, 개수에 따른 가격 계산
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const handleClickCounter = (num) => {
        setQuantity(quantity + num);
        setTotal(total + parseInt(products[0].price) * num);
    };

    const formatPrice = (price) => {
        return price.toLocaleString()
    };
    // 구매 개수에 따른 가격 계산 F


    // 장바구니 추가
    const addToCart = () => {
        const loginData = JSON.parse(sessionStorage.getItem("loggedIn"));

        if (!loginData) {
            navigate("/login");
            return;
        }
        const productToAdd = {
            id: products[0].id,
            imageUrl: products[0].thumbnail,
            name: products[0].title,
            price: Number(products[0].price),
            quantity: quantity,
            checked: false,
        };

        const baskets = JSON.parse(localStorage.getItem('baskets')) || [];
        const existingProductIndex = baskets.findIndex(item => item.id === productToAdd.id);

        if (existingProductIndex !== -1) {
            baskets[existingProductIndex].quantity += quantity;
        } else {
            baskets.push(productToAdd);
        }

        localStorage.setItem('baskets', JSON.stringify(baskets));
        setCartlength(baskets.length);
        navigate('/cart');
    };
    // 장바구니 추가 F

    //  구매
    const handlePurchase = () => {

        const loginData = JSON.parse(sessionStorage.getItem("loggedIn"));

        if (!loginData) {
            navigate("/Login");
        } else {
            navigate("/checkout", {
                state: {
                    items: [{
                        id: products[0].id,
                        imageUrl: products[0].thumbnail,
                        name: products[0].title,
                        price: Number(products[0].price),
                        quantity: quantity,
                        checked: false,
                    }],
                    orderType: "single_order",
                },
            });
        }
    };
    // 구매 F

    // 클릭 스크롤 이동
    const detailImageRef = useRef();
    const detailImageMove = () => {
        detailImageRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const purchaseDetailRef = useRef();
    const purchaseDetailMove = () => {
        purchaseDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const qnaDetailRef = useRef();
    const qnaDetailMove = () => {
        qnaDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // 클릭 스크롤 이동 F

    return (
        //  < !--상품이미지, 상품명, 가격, 구매-- >
        <div>
            <div className="product_main">
                <div className="container">
                    <div className="leftside">
                        <div className="product_image_box">
                            <Swiper
                                pagination={{ clickable: true }}
                                navigation={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                autoplay={{ delay: 1800, disableOnInteraction: false }}
                                modules={[Pagination, Navigation, Autoplay]}
                                loop={true}
                            >
                                <SwiperSlide className="swiper-slide">
                                    <img src={thumbnail} alt="phills"></img>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                    <img src={thumbnail} alt="phills"></img>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                    <img src={thumbnail} alt="phills"></img>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="best_review_box">
                            {/* <div className="best_review_head">
                                <div>
                                    <span><img src="../assets/images/star-group-on-111.svg" alt=""></img></span>
                                    <span>평균 평점(리뷰 총 별점 합산/리뷰갯수)</span>
                                    <span>리뷰갯수</span>
                                </div>
                                <div>
                                    <a href="#review_section">더보기</a>
                                </div>
                            </div>
                            <div className="best_review_detail">
                                <div>
                                    (하단 리뷰중 평점 순위 5위까지 슬라이드로 출력)
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="rightside">
                        <div className="rightside_top_box">
                            <div className="brand_link">
                            </div>
                            <div>
                                <div className="like_and_link">
                                    <span><ClipboardLink /></span>
                                </div>
                            </div>
                        </div>

                        <div className="product_name_box">
                            <p className="title-content">
                                {title}
                            </p>
                        </div>

                        <div className='pre_seventeen_box'>
                            <span className='awesomeIcon'><FontAwesomeIcon icon={faTruckFast} style={{ color: "#b63e00", }} /></span>
                            <span className='pre_seventeen'>
                                평일 17시 이전 주문시 당일 출고
                            </span>
                        </div>
                        <div className="product_price_box">
                            <div className="price_list">
                            </div>
                        </div>
                        <div className="member_discount_box">

                            {/* <!-- 쿠폰 서랍 --> */}
                        </div>

                        <div className="price_save_box">

                        </div>

                        <div className="option_box">

                        </div>
                        <div className='description_box'>
                            <div className='description_title'>
                                <p>성분 효과</p>
                            </div>
                            <div className='description'>
                                <p>{description}</p>
                            </div>
                        </div>
                        {/* 구매 수량 및 가격 */}
                        <div className="add_cart_box">
                            <p>구매 수량</p>
                            <div className="add_cart">
                                <div className="add_button_box">
                                    <button className="minus_button" onClick={() => handleClickCounter(-1)} disabled={quantity === 1}><i className="fa-solid fa-minus"></i></button>
                                    <div className="number_of_product">{quantity}</div>
                                    <button className="plus_button" onClick={() => handleClickCounter(+1)}><i className="fa-solid fa-plus"></i></button>
                                </div>
                                <div className="final_cart">
                                    <div className="price_title">
                                        {formatPrice(total)}
                                        <div>원</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 구매 수량 및 가격 F*/}

                        {/* <!-- 최종 구매 --> */}
                        <div className="purchase_box">
                        </div>
                        <div>
                            <div className="buying_box">
                                <div className="btn-wrapper">
                                    <button onClick={handlePurchase} className="purchasebutton">바로구매</button>
                                    <button onClick={addToCart} className="cartbutton">장바구니</button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 최종 구매 F --> */}
                    </div>
                </div>
            </div>

            <div className="product-wrapper">
                {/* <!-- 상품 정보, 문의 질문, 리뷰, 구매정보 스크롤링 --> */}
                <div className="product_section_scroll_box">
                    <div className="scroll">
                        <div className="container">
                            <Topbutton />
                            <div onClick={detailImageMove} >상품정보</div>
                            <div onClick={qnaDetailMove}>Q&A</div>
                            <div onClick={purchaseDetailMove}>구매정보</div>
                        </div>
                    </div>
                </div>
                {/* <!-- 상품 이미지 및 상세설명 --> */}
                <div className="product_detail_box" id="product_detail_section">
                    <div className="container">
                        <div ref={detailImageRef} className="images">
                            <img src={detailimage} alt="phillsimage"></img>
                        </div>
                    </div>
                </div>

                {/* <!-- 리뷰 탭 --> */}
                <div className="bottom_box" id="review_section">
                    {/* <div className='review_box'>
                        <div className="container">
                            <h3 className="title-content">리뷰(총 리뷰갯수)</h3>
                            <div className="review_head">
                                <div className="review_menu">
                                    <span>
                                       
                                        추천순
                                 
                                    </span>
                                    <span>
                                       
                                        최근 등록순
                                      
                                    </span>
                                    <span>
                                    
                                        별점 높은순
                                    
                                    </span>
                                    <span>
                                    
                                        별점 낮은순
                                 
                                    </span>
                                </div>

                            </div>
                            <div className="review_detail">
                                <div className="detail_title">
                                    <div>
                                        <span><img className="review_point_image" src="../assets/images/star-group-on-111.svg" alt=""></img></span>
                                        <span className="detail_point">(평점)</span>
                                    </div>
                                    <div className="detail_id">
                                        <div>(아이디)</div>
                                        <div className="id_line"></div>
                                        <div>(리뷰날짜)</div>
                                    </div>
                                </div>
                                <div className="detail_text">
                                    <div className="review_product">올인원 영양제 MVPO 4in1 1통 2개월분 캡슐</div>
                                    <div className="review_text">컨디션 챙기려고 먹고 있어요. 이거저거 먹다가 다 버리고 이거 하나만 먹습니다. 이번에 해외여행 가서도 열심히 먹었더니, 더 재밌게 놀았습니다. 이거
                                        대박 상품이예요!!! 좋은 상품 감사합니다. </div>
                                </div>
                            </div>
                            <div className="review_detail">
                                <div className="detail_title">
                                    <div>
                                        <span><img className="review_point_image" src="../assets/images/star-group-on-111.svg" alt=""></img></span>
                                        <span className="detail_point">(평점)</span>
                                    </div>
                                    <div className="detail_id">
                                        <div>(아이디)</div>
                                        <div className="id_line"></div>
                                        <div>(리뷰날짜)</div>
                                    </div>
                                </div>
                                <div className="detail_text">
                                    <div className="review_product">올인원 영양제 MVPO 4in1 2통 4개월분 캡슐</div>
                                    <div className="review_text">한알이라 편합니다 신랑이랑 같이 먹고 있어요 신랑도 괜찮아 하네요 재구매 할께요 ~~</div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* QNA 탭 */}


                    <div ref={qnaDetailRef}>
                        <Qna />
                    </div>



                    {/* <!-- 상품 및 구매 정보 고시 --> */}
                    <div className="product_information_box" id="product_information_box">
                        <div className="container">
                            <p ref={purchaseDetailRef} className="title-content">구매정보</p>
                            <div className="information_detail">
                                <div className="table_title">상품 정보 제공 고시</div>
                                <table className="information_table">
                                    <tbody>
                                        <tr>
                                            <td>제품명</td>
                                            <td>건강 영 양 제</td>
                                        </tr>
                                        <tr>
                                            <td>식품의 유형</td>
                                            <td>건강기능식품</td>
                                        </tr>
                                        <tr>
                                            <td>제조업소</td>
                                            <td>㈜00바이오</td>
                                        </tr>
                                        <tr>
                                            <td>소재지</td>
                                            <td>경기도 00시 00동 00길 99</td>
                                        </tr>
                                        <tr>
                                            <td>제조연월일</td>
                                            <td>건강기능식품</td>
                                        </tr>
                                        <tr>
                                            <td>소비기한</td>
                                            <td>제조일로부터 18개월</td>
                                        </tr>
                                        <tr>
                                            <td>포장단위별 내용물의 용량(중량),수량</td>
                                            <td>1,050 mg x 30캡슐 x 2개입, 1통 당</td>
                                        </tr>
                                        <tr>
                                            <td>원재료명 및 함량</td>
                                            <td>EPA및DHA함유유지[미국산/정제어유(명태), d-토코페롤(혼합형)], 알피(RP)5종복합코팅유산균[L.rhamnosus IDCC 3201(국내산), E.faecium IDCC
                                                2102(국내산), Lc.lactis IDCC2301, B.breve IDCC 4401, L.casei IDCC 3451], 아셀렌산나트륨혼합제제(아셀렌산나트륨, 제이인산칼슘),
                                                비타민B12혼합제제(비타민B12, 말토덱스트린, 구연산삼나트륨, 구연산), 비타민B1질산염, 비타민B2, 비타민B6염산염, d-α-토코페롤, 니코틴산아미드, 황산망간, 푸마르산제일철,
                                                판토텐산칼슘, 비오틴혼합제제(비오틴, 제이인산칼슘), 황산동, 비타민A혼합제제(레티닐팔미트산염, 땅콩오일, dl-α-토코페롤), 비타민D혼합제제(비타민D3, 중쇄중성지방유,
                                                dl-α-토코페롤), 엽산, 황납, 대두레시틴, 대두유(콩(외국산: 미국, 브라질, 파라과이 등)), 혼합제제(규소수지, 유화제, CMC) 캡슐기제-젤라틴(돈피), 글리세린,
                                                아미드펙틴,
                                                폴리글리시톨시럽, 안나토색소, 치자청색소 우유, 대두, 땅콩 함유</td>
                                        </tr>
                                        <tr>
                                            <td>영양정보</td>
                                            <td>1일 섭취량 당 함량: 열량 10 kcal, 탄수화물 0 g(0%), 단백질 0 g(0%), 지방 1 g(2%), 나트륨 0 mg(0%), EPA와 DHA의 합 500 mg,
                                                프로바이오틱스 수 50억 CFU, 비타민A 700 ㎍RAE(100%), 비타민D 10㎍(100%), 비타민E 11 mg α-TE, 비타민B1 12 mg(1000%), 비타민B2 14
                                                mg(1000%), 비타민B6 15 mg(1000%), 비타민B12 24 ㎍(1000%), 나이아신 15 mgNE(100%), 판토텐산 5 mg(100%), 엽산 400
                                                ㎍(100%),
                                                비오틴 30 ㎍(100%), 철 3.6 mg(30%), 구리 0.8 mg(100%), 망간 3 mg(100%), 셀렌 55 ㎍(100%)</td>
                                        </tr>
                                        <tr>
                                            <td>기능정보</td>
                                            <td>[EPA 및 DHA 함유 유지] 혈중 중성지질 개선‧혈행 개선에 도움을 줄 수 있음 [프로바이오틱스] 유산균 증식 및 유해균 억제․배변활동 원활·장건강에 도움을 줄 수
                                                있음[비타민A]
                                                어두운 곳에서 시각 적응을 위해 필요, 피부와 점막을 형성하고 기능을 유지하는데 필요, 상피세포의 성장과 발달에 필요 [비타민D] 칼슘과 인이 흡수되고 이용되는데 필요, 뼈의 형성과
                                                유지에
                                                필요, 골다공증발생 위험 감소에 도움을 줌 [비타민E] 항산화 작용을 하여 유해산소로부터 세포를 보호하는데 필요 [비타민B1] 탄수화물과 에너지대사에 필요 [비타민B2] 체내 에너지
                                                생성에
                                                필요 [비타민B6] 단백질 및 아미노산 이용에 필요, 혈액의 호모시스테인 수준을 정상으로 유지하는데 필요 [비타민B12] 정상적인 엽산 대사에 필요 [나이아신] 체내 에너지 생성에
                                                필요
                                                [판토텐산] 지방, 탄수화물, 단백질 대사와 에너지 생성에 필요 [엽산] 세포와 혈액생성에 필요, 태아 신경관의 정상 발달에 필요, 혈액의 호모시스테인 수준을 정상으로 유지하는데 필요
                                                [비오틴] 지방, 탄수화물, 단백질 대사와 에너지 생성에 필요 [철] 체내 산소운반과 혈액생성에 필요, 에너지 생성에 필요 [구리] 철의 운반과 이용에 필요, 유해산소로부터 세포를
                                                보호하는데
                                                필요 [망간] 뼈 형성에 필요, 에너지 이용에 필요, 유해산소로부터 세포를 보호하는데 필요 [셀렌] 유해산소로부터 세포를 보호하는데 필요</td>
                                        </tr>
                                        <tr>
                                            <td>섭취량,섭취방법 및 섭취 시 주의사항 및 부작용 가능성</td>
                                            <td>1일 1회, 1회 1캡슐을 충분한 물과 함께 섭취하십시오. 1. 개인에 따라 피부 관련 이상반응이 발생할 수 있으며 의약품(항응고제, 항혈소판제, 혈압강하제 등) 복용 시 전문가와
                                                상담하시기 바랍니다. 2. 고칼슘혈증이 있거나 의약품 복용 시 전문가와 상담하시기 바랍니다. 3. 특히 6세 이하는 과량섭취하지 않도록 주의하시기 바랍니다. 4. 질환이 있거나 의약품
                                                복용
                                                시 전문가와 상담하십시오. 5. 알레르기 체질 등은 개인에 따라 과민반응을 나타낼 수 있습니다. 6. 어린이가 함부로 섭취하지 않도록 일일섭취량 방법을 지도하십시오. 7. 이상사례
                                                발생
                                                시
                                                섭취를 중단하고 전문가와 상담하십시오.</td>
                                        </tr>
                                        <tr>
                                            <td>소비자안전을 위한 주의사항</td>
                                            <td>1. 개인에 따라 피부 관련 이상반응이 발생할 수 있으며 의약품(항응고제, 항혈소판제, 혈압강하제 등) 복용 시 전문가와 상담하시기 바랍니다. 2. 고칼슘혈증이 있거나 의약품 복용
                                                시
                                                전문가와 상담하시기 바랍니다. 3. 특히 6세 이하는 과량섭취하지 않도록 주의하시기 바랍니다. 4. 질환이 있거나 의약품 복용 시 전문가와 상담하십시오. 5. 알레르기 체질 등은
                                                개인에
                                                따라
                                                과민반응을 나타낼 수 있습니다. 6. 어린이가 함부로 섭취하지 않도록 일일섭취량 방법을 지도하십시오. 7. 이상사례 발생 시 섭취를 중단하고 전문가와 상담하십시오.</td>
                                        </tr>
                                        <tr>
                                            <td>소비자상담관련 전화번호</td>
                                            <td>1544-0188</td>
                                        </tr>
                                    </tbody>

                                </table>

                                <div className="table_title">배송 정보</div>
                                <table className="shipping_table">
                                    <tbody>
                                        <tr>
                                            <td>배송비</td>
                                            <td>3,000원 (30,000원 이상 구매 시 무료배송)

                                                제주 및 도서 산간지역의 경우 3,000원 추가 운임이 발생합니다.</td>
                                        </tr>
                                        <tr>
                                            <td>배송 일정</td>
                                            <td>평일 오후 5시 이전 결제 건은 당일 발송,평일 오후 5시 이후 결제 건은 다음날 발송되며 주말/공휴일은 출고하지 않습니다.</td>
                                        </tr>
                                        <tr>
                                            <td>배송 조회</td>
                                            <td>마이페이지 또는 택배사 홈페이지에서 조회 하실 수 있습니다.

                                                도착일은 발송일로부터 평균 3~4일(영업일 기준) 소요됩니다.

                                                물류센터와 택배사에 물량이 많거나 명절 또는 천재지변 등의 경우 배송이 지연될 수 있사오니 양해 부탁드립니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Product;