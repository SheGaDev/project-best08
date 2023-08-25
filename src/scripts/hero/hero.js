import { HEROPlaceholderAPI } from './hero-placeholder-api.js';

import { createMarkup } from './hero-markup.js';
import { initSwiper } from './swiper-inicialisation.js';

const card = document.querySelector('.hero_section_slider');
const mainPlaceholderInstance = new HEROPlaceholderAPI()

mainPlaceholderInstance.getTreats().then(data => card.insertAdjacentHTML('beforeend', createMarkup(data))
)
    .catch(console.warn);
initSwiper();
