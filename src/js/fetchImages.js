import axios from 'axios';
const IMADES_PER_PAGE = 40;

const URL = 'https://pixabay.com/api/';

export class FetcherOfImages {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  async getImages(query) {
    if (query !== this.query) {
      this.query = query;
      this.page = 1;
    } else {
      this.page += 1;
    }

    const options = {
      params: {
        key: '34570965-f4c02bf2bd7f36d8810cb4ca2',
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: IMADES_PER_PAGE,
      },
    };
    const response = await axios.get(URL, options);
    return response;
  }
}
