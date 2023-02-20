import axios from 'axios';

const API_KEY = '33649994-f80483f60ad654d1c20b01729';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class PhotosAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchAPI() {
    const options = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });
    const { data } = await axios(`?${options}`);
    this.page += 1;
    return data;
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


