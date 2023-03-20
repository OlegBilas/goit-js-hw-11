import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { FetcherOfImages } from './js/fetchImages';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const galleryRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchFormRef.addEventListener('submit', onSubmitForm);

const fetcherOfImages = new FetcherOfImages();
const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'p',
  //   captionsData: 'title',
  captionType: 'text',
  captionClass: 'item-info',
});

function onSubmitForm(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value.trim();
  if (query === '') {
    return Notify.warning('Your query is empty. Please, type another request');
  }

  fetcherOfImages
    .getImages(query)
    .then(({ data }) => {
      if (data.hints.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (fetcherOfImages.page === 1) {
        galleryRef.innerHTML = renderGallery(data.hints);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } else {
        galleryRef.insertAdjacentElement(
          'beforeend',
          renderGallery(data.hints)
        );
        simpleLightbox.refresh();
      }
    })
    .catch(error => Notify.failure('Something went wrong. Try again!'));
}

function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL: preview,
        largeImageURL: original,
        tags: description,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                    <a class="gallery__item" href="${original}">
                        <img src="${preview}" alt="${description}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                            </p>
                            <p class="info-item">
                            <b>Views</b>
                            ${views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>
                            </p>
                            ${comments}
                            <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                            </p>
                        </div>
                    </a>
                 </div>`;
      }
    )
    .join('');
}
