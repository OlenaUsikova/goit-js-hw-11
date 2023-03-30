import './fetchimg.js';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImages from './fetchimg.js';

const API_KEY = '34815757-11540e8253cc9068e0c598d0d';
// let searchQuery = "";
let backup = ``;
const form = document.querySelector('#search-form');
const inputGet = form.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('is-hidden');

form.addEventListener('submit', renderImages);

function renderImages(ev) {
  ev.preventDefault();
  currentPage = 1;
  
  getImages(ev).then(response => {
    console.log(response);

    gallery.innerHTML = '';

    if (response.data.totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${response.data.totalHits} images`);
    }
    response.data.hits.forEach(item => {
      // console.log(item);
      backup += `<div class="photo-card">
    <a class="gallery__item" href=${item.largeImageURL}><img class="gallery__image" src=${item.previewURL} alt=${item.tags} loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>`;});
    gallery.insertAdjacentHTML('afterbegin', backup);

    loadMoreBtn.classList.remove('is-hidden');

    const lightbox = new SimpleLightbox('.gallery a', {
      // captions: true,
      // captionsData: 'alt',
      captionDelay: 250,
    });
  });
}

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore(ev) {
  ev.preventDefault();
  backup = ``;

  getImages(ev).then(response => {
    console.log(response);
    if (response.data.totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if ((response.data.totalHits- onPage * currentPage) <= onPage) {
      loadMoreBtn.classList.remove('is-hidden');
    }
    response.data.hits.forEach(item => {
      backup += `<div class="photo-card">
      <a class="gallery__item" href=${item.largeImageURL}><img class="gallery__image" src=${item.previewURL} alt=${item.description} loading="lazy"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${item.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${item.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${item.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${item.downloads}</b>
      </p>
    </div>
  </div>`;
    });
    gallery.insertAdjacentHTML('afterbegin', backup);
    const lightbox = new SimpleLightbox('.gallery a', {
      // captions: true,
      // captionsData: 'alt',
      captionDelay: 250,
    });
  });
}
