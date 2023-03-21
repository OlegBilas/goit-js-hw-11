import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { FetcherOfImages } from './js/fetchImages';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const searchFormRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more');
const observer = new IntersectionObserver(intersectingHandler);
observer.observe(loadMoreBtn);

searchFormRef.addEventListener('submit', onSubmitForm);

const fetcherOfImages = new FetcherOfImages();
const simpleLightbox = initializeSimpleLightbox();

function onSubmitForm(e) {
  e.preventDefault();

  fetchImages();
}

async function fetchImages() {
  const query = searchFormRef.elements.searchQuery.value.trim();
  if (query === '') {
    return;
  }
  await fetcherOfImages
    .getImages(query)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        galleryRef.innerHTML = '';
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (fetcherOfImages.page === 1) {
        galleryRef.innerHTML = renderGallery(data.hits);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } else {
        galleryRef.insertAdjacentHTML('beforeend', renderGallery(data.hits));
      }
      simpleLightbox.refresh();
      setScrollbehavior();
    })
    .catch(error => Notify.failure('Something went wrong. Try again!'));
}

function initializeSimpleLightbox() {
  return new SimpleLightbox('.gallery a', {
    captionSelector: 'p',
    //   captionsData: 'title',
    captionType: 'text',
    captionClass: 'item-info',
  });
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
                    <a class="gallery__link" href="${original}">
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

function setScrollbehavior() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function intersectingHandler(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchImages();
    }
  });
}
