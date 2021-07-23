class SearchView {
  #parentEl = document.querySelector('.search');
  #query;

  getQuery() {
    const inputEl = this.#parentEl.querySelector('.search__field');

    this.#query = inputEl.value;
    inputEl.value = '';
    return this.#query;
  }

  // listen search bar input value
  addHandlerToSearchBar(handler) {
    const searchFormEl = this.#parentEl;

    searchFormEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default searchView = new SearchView();
