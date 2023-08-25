export function createMarkup(arr) {
    const markup = arr.map(({ cook: { imgWebpUrl }, topic: { name, area, previewWebpUrl, imgUrl }, _id }) =>
        `<div class="swiper-slide" id="${_id}">

        <div class="slider_card_cheef">
        <img class="slider_card_cheef_photo" src="${imgWebpUrl}" alt="cheef">
        </div>
        
        <div class="slider_card_dish_introduction">
        <img class="slider_card_dish_introduction_photo" src="${previewWebpUrl}" alt="dish">
        <p class="slider_card_dish_description_name">${name}</p>
        <p class="slider_card_dish_country_area">${area}</p>
        </div>
        
        <div class="slider_card_dish_view">
        <img class="slider_card_dish_view_photo" src="${imgUrl}" alt="dish">
        </div>
        
        </div>
        `
    );
    return markup.join('');

}