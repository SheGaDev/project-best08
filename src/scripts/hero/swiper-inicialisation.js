
import Swiper from 'swiper';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);

export const initSwiper = () => {
    // setTimeout(() => {
    const swiper = new Swiper('.swiper', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 10,
        direction: 'horizontal',
        loop: true,
        observer: true,
        simulateTouch: false,
        speed: 600
    });
    // }, 0);
}


import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);


// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// init Swiper:
const swiper = new Swiper('.swiper-wrapper', {
 
  direction: 'vertical',
  pagination: {
      el: '.swiper-pagination',
    },
    speed:500,
    autoplay: {
      pauseOnMouseEnter: false,
    disableOnInteraction: false,
     delay: 2000,
    },
    
});








// // new Swiper('.swiper-wrapper', {
 
// //     slidesPerView:1,
// // spaceBetween: 10,
// // loop: true,

// // pagination: {
// //   el: '.swiper-pagination',
// // },
// // speed:500,
// // autoplay: {
// //   pauseOnMouseEnter: false,
// // disableOnInteraction: false,
// //  delay: 2000,
// // },

// // });