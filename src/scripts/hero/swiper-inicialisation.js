const swiper = new Swiper('.my-swiper', {
 
    slidesPerView:1,
spaceBetween: 10,
loop: true,

pagination: {
  el: '.swiper-pagination',
},

autoplay: {
  pauseOnMouseEnter: false,
disableOnInteraction: false,
 delay: 2000,
},

});