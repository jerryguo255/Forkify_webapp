import View from './view';
class BookmarkListView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :) ';
  _generateMarkup() {
    const html = this._data
      .map(
        v =>
          `
      <li class="preview">
     <a class="preview__link ${
       v.id === window.location.hash.slice(1) ? 'preview__link--active' : ''
     }" href="#${v.id}">
        <figure class="preview__fig">
            <img src="${v.image_url}" alt="${v.title}" crossorigin />
        </figure>
        <div class="preview_v">
         <h4 class="preview__title">${v.title}</h4>
         <p class="preview__publisher">${v.publisher}</p>
        </div>
     </a>
    </li>
      `
      )
      .join(' ');
    return html;
  }
  //   addHandlerBookmarkList(handler) {
  //     this._parentElement.addEventListener('click', function (e) {
  //       e.target.closest('');
  //     });
  //   }
}

export default bookmarkListView = new BookmarkListView();
