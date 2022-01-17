import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getImage from './js/data';

// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');

const form = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onInputValue);

function onInputValue(e) {
  e.preventDefault();

  const inputValue = input.value;

  getImage(inputValue).then(data => {
    if (data.data.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    gallery.insertAdjacentHTML('afterbegin', renderMarkup(data));
  });
}

function renderMarkup(data) {
  const markup = data.data.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes${likes}</b>
            </p>
                <p class="info-item">
            <b>Views${views}</b>
            </p>
                <p class="info-item">
            <b>Comments${comments}</b>
                </p>
            <p class="info-item">
            <b>Downloads${downloads}</b>
            </p></div></div>`;
    })
    .join('');
  return markup;
}
