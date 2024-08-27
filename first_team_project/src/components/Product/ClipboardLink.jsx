
import './ClipboardLink.css'




function ClipboardLink() {
    const currentUrl = window.location.href;
    const handleCopyUrl = () => {
        window.navigator.clipboard.writeText(currentUrl)
            .then(() => {
                alert('클립보드에 복사되었습니다');
            })
    };
    // 상품 이름의 오른쪽 위 '링크 복사' 를 클릭하여 현재 페이지의 url을 복사하는 기능을 구현하였습니다.


    return (
        <div className='link_box'>
            <p>링크 복사</p>
            <div className='link_copy' onClick={handleCopyUrl}><img src="https://cdn-icons-png.flaticon.com/512/11940/11940163.png" alt="" /></div>
        </div>
    )
}
export default ClipboardLink