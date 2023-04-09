import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35135861-e70cbe6a671e8ed18932ba4eb';
const API_SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class ApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhotoes() {
    const options = {
      method: 'get',
      url: `${BASE_URL}`,
      params: {
        key: `${API_KEY}`,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.perPage}`,
      },
    };
    try {
      const response = await axios(options);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.error(error);
    }
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
