import View from './view';
import icons from 'url:../../img/icons.svg';
import { PAGE_MAX_ITEMS } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const itemAmount = this._data.recipeList.length;
    const pageAmount = Math.ceil(itemAmount / PAGE_MAX_ITEMS);
    // only 1 page
    if (itemAmount < PAGE_MAX_ITEMS) return;

    // first page
    if (this._data.currentPage == 1) {
      //   console.log(this);
      return this._generateBtnsNextMarkup();
    }

    // last page
    if (this._data.currentPage >= pageAmount) {
      return this._generateBtnsPrevMarkup();
    }

    // other page
    return this._generateBtnsPrevMarkup() + '' + this._generateBtnsNextMarkup();
  }

  _generateBtnsPrevMarkup() {
    const prevPage = +this._data.currentPage - 1;
    return `      
        <button class="btn--inline pagination__btn--prev "data-goto-page="${prevPage}">
        <span>Page ${prevPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>
         `;
  }
  _generateBtnsNextMarkup() {
    const nextPage = +this._data.currentPage + 1;
    return `      
        <button class="btn--inline pagination__btn--next " data-goto-page="${nextPage}">
            <span>Page ${nextPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>   `;
  }
  //event delegation
  //handler == controlPagination

  addHandlerPagination(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        this._data.currentPage =
          e.target.closest('.btn--inline').dataset.gotoPage;
        handler();
      }.bind(this)
    );
  }

  //
}

export default paginationView = new PaginationView();
