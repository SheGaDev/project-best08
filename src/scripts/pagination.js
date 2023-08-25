import Pagination from '../../node_modules/tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { recipesList, renderRecipeCard } from './recipes-render';
const { API } = require('@/lib/api');
const WRAPPER = document.querySelector('#pagination');



export class MakePagination {
  perPage = 1;
  totalItems = 1;
  categories = "";

  createPag() {
    return new Pagination(WRAPPER, {
      itemsPerPage: Number(this.perPage),
      totalItems: Number(this.totalItems),
      visiblePages: window.innerWidth > 768 ? 3 : 2,
      page: 1,

      template: {
        page: '<div class="tui-page-btn hover-class margin-class"><a href=""><p class="text">{{page}}</p></a></div>',
        currentPage: '<div class="tui-page-btn tui-is-selected margin-class"><p class="text">{{page}}</p></div>',
        moveButton:
          '<div class="tui-page-btn tui-{{type}} hover-class move-btn"><a href="#" class="move-link-{{type}}"></a></div>',
        disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip hover-class">' +
          '<span class="elips">...</span>' +
          '</a>',
      },
    });
  }

  async renderCategories(data = {}) {
    const recipesData = await API.fetchRecipes(data);
    const recipeResult = recipesData.results;
    const elements = recipeResult.map(renderRecipeCard);
    recipesList.innerHTML = '';
    recipesList.append(...elements);
  }

  set _itemsPerPage(num) {
    this.perPage = Number(num);
  }

  set _totalItems(totalPages) {
    this.totalItems = Number(this.perPage) * Number(totalPages);
  }
}
