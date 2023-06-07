const swiper = new Swiper('.swiper', {
  // 分頁
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // 在手機版時呈現單欄排版
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    // 在 768px 以上時呈現雙欄排版
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    // 在 992px 以上時呈現三欄排版
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});
