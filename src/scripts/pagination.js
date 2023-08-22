import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../styles/_pagination.scss';
const container = document.querySelector('#pagination');

const pagination = new Pagination(container, {
  totalItems: 100,
  itemsPerPage: 9,
  visiblePages: window.innerWidth > 768 ? 3 : 2,
  page: 1,
  template: {
    page: '<div class="tui-page-btn hover-class margin-class"><a href=""><p class="text">{{page}}</p></a></div>',
    currentPage: '<div class="tui-page-btn tui-is-selected margin-class"><p class="text">{{page}}</p></div>',
    moveButton:
      '<div class="tui-page-btn tui-{{type}} hover-class move-btn"><a href="#" class="move-link-{{type}}"></a></div>',
    disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip hover-class">' + '<span class="elips">...</span>' + '</a>',
  },
});
