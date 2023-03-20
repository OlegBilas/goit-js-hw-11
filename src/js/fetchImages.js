import axios from 'axios';
const IMADES_PER_PAGE = 40;

export class FetcherOfImages {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  async getImages(query) {
    if (query !== this.query) {
      this.query = query;
      this.page = 1;
    }

    const options = {
      method: 'get',
      // url: 'https://pixabay.com/api/',
      // headers: { 'X-Requested-With': 'XMLHttpRequest' },
      params: {
        key: '34570965-f4c02bf2bd7f36d8810cb4ca2',
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: IMADES_PER_PAGE,
        // responseType: 'json', // default
        // responseEncoding: 'utf8', // default
      },
    };
    try {
      const response = await axios.get('https://pixabay.com/api/', options);
      console.log(response);
      this.page += 1;
      return response;
    } catch (response) {
      console.log(response.statusText);
    }
  }
}

//   getImages(query) {
//     if (query !== this.query) {
//       this.query = query;
//       this.page = 1;
//     }
//     const options = {
//       key: '34570965-f4c02bf2bd7f36d8810cb4ca2',
//       q: this.query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: this.page,
//       per_page: IMADES_PER_PAGE,
//     };

//     const searchParams = new URLSearchParams(options);

//     return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
//   }
// }
