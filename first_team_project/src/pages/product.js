// 스와이퍼 슬라이드

var swiper = new Swiper(".product_image_box .mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true
});

// 스와이퍼 슬라이드 F



// 가격 상세내역 서랍 오픈

member_coupon_open_btn.onclick = function couponOpen(){
    if (document.getElementById("coupon_window").style.display === "none") {
        document.getElementById("coupon_window").style.display = "block";
        document.getElementById("member_coupon_open_btn").textContetent = '닫기';
    }
    else {
        document.getElementById("coupon_window").style.display = "none";
        document.getElementById("member_coupon_open_btn").textContent = '열기';
    }
}

price_save_open_btn.onclick = function priceOpen(){
    if (document.getElementById("price_window").style.display === "none") {
        document.getElementById("price_window").style.display = "block";
        document.getElementById("price_save_open_btn").textContetent = '닫기';
    }
    else {
        document.getElementById("price_window").style.display = "none";
        document.getElementById("price_save_open_btn").textContent = '열기';
    }
}