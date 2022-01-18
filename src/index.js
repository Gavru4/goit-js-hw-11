import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getImage from './js/data';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');

const form = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

input.form.addEventListener('submit', onInputValue);

function onInputValue(e) {
  e.preventDefault(getImage());
  const inputValue = input.value;

  getImage(inputValue).then(data => {
    if (data.data.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    gallery.insertAdjacentHTML('afterbegin', renderMarkup(data));
    lightbox.refresh();
    loadBtn.classList.toggle('is-hidden');
    return Notify.success(`"Hooray! We found ${data.data.totalHits} images."`);
  });
}

function renderMarkup(data) {
  const markup = data.data.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class= gallery-wrap>
        <div class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
              <p class="info-item">
                 <b>Likes<br>${likes}</b>
              </p>
              <p class="info-item">
            <b>Views<br>${views}</b>
            </p>
                <p class="info-item">
            <b>Comments<br>${comments}</b>
                </p>
            <p class="info-item">
            <b>Downloads<br>${downloads}</b>
            </p>
            </div>
        </div>
        </div>`;
    })
    .join('');
  return markup;
}

const lightbox = new SimpleLightbox('.gallery a', {
  swipeClose: true,
  close: true,
});

loadBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick() {
  page += 1;
  getImage(name, page).then(data => {
    renderMarkup(data);
  });
}
// onLoadBtnClick();

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
