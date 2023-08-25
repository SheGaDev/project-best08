var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},i=e.parcelRequire9016;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in r){var i=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequire9016=i),i("a3EbL"),i("725Gb"),i("aXWsA"),i("8yBLL");var o=i("9Ha4D"),a=i("jlvaJ");const n={favoriteHeroSection:document.querySelector(".hero-favorites-section"),emptyFavoriteSection:document.querySelector(".empty-favorite-list-section"),favoriteCategoriesSection:document.querySelector(".favorite-categories-section"),favoriteCardsSection:document.querySelector(".favorite-cards-section"),favoriteCategoriesList:document.querySelector(".favorite-categories-box"),favoriteCategoryBtn:document.querySelector(".favorite-categories-btn"),favoriteCardsList:document.querySelector(".favorite-cards-list"),favoriteCardsBox:document.querySelector(".favorite-cards-box")};let s=(0,o.getFavoriteItems)().results;function d(e){n.favoriteCategoriesList.innerHTML='<button type="button" class="favorite-categories-btn">All categories</button>';for(let t=0;t<e.length;t+=1){let r=`<button type="button" class="favorite-categories-btn">${e[t]}</button>`;n.favoriteCategoriesList.insertAdjacentHTML("beforeend",r)}}function l(e){n.favoriteCardsBox.innerHTML="";for(let t=0;t<e.length;t+=1){let r=function(e){let t=document.createElement("li");t.classList.add("recipe-card"),t.style.backgroundImage=`linear-gradient(
          1deg,
          rgba(5, 5, 5, 0.6) 0%,
          rgba(5, 5, 5, 0) 100%
        ),
        url(${e.preview})`;let r=document.createElement("h2");r.textContent=e.title,t.appendChild(r);let i=document.createElement("p");i.textContent=e.description,t.appendChild(i);let o=document.createElement("span");o.classList.add("favourite-heart"),o.innerHTML=`
                        <svg
                          class="heart-icon"
                          width="22px"
                          height="22px"
                          viewBox="0 0 22 22"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z"
                            stroke="#F8F8F8"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>`,t.appendChild(o);let a=document.createElement("div");a.classList.add("card-bottom__block-wrapper"),t.appendChild(a);let n=document.createElement("div");n.classList.add("card-bottom__rating-wrapper"),a.appendChild(n);let s=document.createElement("span");s.classList.add("rating-number"),s.textContent=e.rating,n.appendChild(s);let d=document.createElement("ul");d.classList.add("recipe-card_rating-stars-list"),n.appendChild(d);let l=Math.round(e.rating);for(let e=0;e<5;e+=1){let t=document.createElement("li");t.classList.add("star"),t.innerHTML=`
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                    >
                      <path
                        d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                      />
                    </svg>`,e<l&&t.classList.add("filled"),d.appendChild(t)}let c=document.createElement("button");return c.type="button",c.textContent="See recipe",c.classList.add("see-recipe_button"),c.setAttribute("recipe-id",e._id),a.appendChild(c),t}(e[t]);n.favoriteCardsBox.appendChild(r)}let t=document.querySelector(".favorite-cards-box");t.addEventListener("click",a.onClickOpenRecipeModal)}async function c(e){if(e.preventDefault(),"favourite-heart"!==e.target.className)return;let t=e.currentTarget.closest("[recipe-id]");await (0,o.asyncToggleFavoriteItem)(t),d(),l()}s&&0!==s.length&&(n.favoriteHeroSection.classList.remove("unvisible"),n.emptyFavoriteSection.classList.add("is-hidden"),n.favoriteCategoriesSection.classList.remove("is-hidden"),n.favoriteCardsSection.classList.remove("is-hidden")),d((0,o.getCategories)(s)),l(s),n.favoriteCardsList.addEventListener("click",c),n.favoriteCategoriesList.addEventListener("click",function(e){e.preventDefault(),"All categories"===(selectedCategory=e.target.textContent)&&(selectedCategory="All"),l((0,o.getFavoriteItems)({category:`${selectedCategory}`}).results)});
//# sourceMappingURL=favorites.f4024de8.js.map
