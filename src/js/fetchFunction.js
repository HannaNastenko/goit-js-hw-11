const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35135861-e70cbe6a671e8ed18932ba4eb';
const API_SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class ApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotoes() {
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${API_SETTINGS}&page=${this.page}&per_page=40`
    )
      .then(response => {
        return response.json();
      })
      .then(({ hits, totalHits }) => {
        this.page += 1;
        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
