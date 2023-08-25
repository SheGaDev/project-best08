import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/swiper.min.css';

// Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);

export const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, Scrollbar, Autoplay],
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
            stopOnLastSlide: false,

        },

        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,


        },

        slidesPerView: 1,
        spaceBetween: 10,
        direction: 'horizontal',
        loop: false,
        observer: true,
        simulateTouch: false,
        speed: 800
    });

}
