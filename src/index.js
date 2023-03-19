// import axios from 'axios';

// import SimpleLightbox from 'simplelightbox';
// // Додатковий імпорт стилів
// import 'simplelightbox/dist/simple-lightbox.min.css';
// // Add imports above this line
// import { galleryItems } from './gallery-items';
// // Change code below this line
// const galleryRef = document.querySelector('.gallery');
// galleryRef.innerHTML = createGalleryItems(galleryItems);

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// function createGalleryItems(galleryItems) {
//   return galleryItems
//     .map(({ preview, original, description }) => {
//       return `<a class="gallery__item" href="${original}">
//                     <img
//                     class="gallery__image"
//                     src="${preview}"
//                     alt="${description}"
//                     />
//                 </a>`;
//     })
//     .join('');
// }

// //Обробка запиту
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// const options = {
//   // `url` is the server URL that will be used for the request
//   baseURL: 'https://some-domain.com/api',
//   url: '/user',
//   headers: { 'X-Requested-With': 'XMLHttpRequest' },
//   params: {
//     ID: 12345,
//   },
//   responseType: 'json', // default
//   responseEncoding: 'utf8', // default
// };
