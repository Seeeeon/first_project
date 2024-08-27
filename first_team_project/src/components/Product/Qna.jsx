import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import './Qna.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Qna() {
    const [inputTitleQna, setInputTitleQna] = useState('');
    const [inputDetailQna, setInputDetailQna] = useState('');
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    
    // 데이터베이스 날짜 규격
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, 0);
    const day = today.getDay();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const YYYY_MM_DD_HHMMSS = `${year}-${month}-${day}` + " " + `${hour}:${minute}:${second}`;
    // 데이터베이스 날짜 규격 F

    // 서버 주소 저장
    const Server_URL = "http://localhost:8000";

    // 작성된 QNA 출력
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${Server_URL}/saveQna`, {
                });
                const filteredData = response.data.filter(item => item.productid == id);
                setProducts(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);
    // 작성된 QNA 출력 F


    // 현재 로그인한 사용자의 userid 저장
    const loginUserInfo = sessionStorage.userid;
    console.log(loginUserInfo);




    
    // 버튼으로 QNA 저장
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${Server_URL}/saveQna`, {
                productid: id,
                qna_title: inputTitleQna,
                userid: loginUserInfo,
                qna_detail: inputDetailQna,
                qna_date: YYYY_MM_DD_HHMMSS,
            

            });
            console.log("Response from server:", response.data);
            alert('게시물이 성공적으로 저장되었습니다.');
            setInputTitleQna('');
            setInputDetailQna('');
        } catch (error) {
            alert('게시물 저장 중 오류가 발생했습니다.');
            console.error('Error saving post:', error);
        }
        window.location.reload(`/product/${id}`);
    };
    // 버튼으로 QNA 저장 F

    return (
        <div className="qna_box">
            <div className="container">
                <p className="title-content">Q&A (총 {products.length}건)</p>
                <div className='qna_list_box'>
                    {products.map(product => (
                        <div key={product.id} className="qna_item">
                            <p>작성자 : {product.userid}</p>
                            <div className='qna_list_title'><p>{product.qna_title}</p></div>
                            <div className='qna_list_detail'><p>{product.qna_detail}</p></div>
                        </div>
                    ))}
                </div>
                <form>
                    <div className='qna_container'>
                        <div className='qna_title'>
                            <input className='qna_title_input'
                                type="text"
                                value={inputTitleQna}
                                placeholder='질문 제목을 50자 이내로 작성해주세요.'
                                onChange={(e) => setInputTitleQna(e.target.value)}
                            />
                        </div>
                        <div className='qna_detail'>
                            <input className='qna_detail_input'
                                type="text"
                                value={inputDetailQna}
                                placeholder='질문 내용을 300자 이내로 작성해주세요.'
                                onChange={(e) => setInputDetailQna(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <div className='create_qna'>
                    <button className='qna_button' onClick={handleSubmit}>질문하기</button>
                </div>
            </div>
        </div>
    );
}

export default Qna;