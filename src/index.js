import './fetchimg.js';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImages from './fetchimg.js';

const form = document.querySelector('#search-form');
const inputGet = form.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('is-hidden');

let searchQuery = '';
let currentPage = 1;
let perPage = 40;
let backup = ``;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();
  searchQuery = inputGet.value;
    console.log(searchQuery);
  getImages(searchQuery, currentPage, perPage)
  .then(( data) => {
   console.log(data);
       if (data.totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images`);
      gallery.innerHTML = '';
      renderImages(data.hits);
    }
  })
  .catch((error) => error);

  loadMoreBtn.addEventListener('click', onLoadMore);
  function onLoadMore() {
    backup = ``;
    currentPage += 1;

    getImages(searchQuery, currentPage, perPage)
    .then((data) => {
              if ((data.totalHits - perPage * currentPage) <= perPage) {
            
            loadMoreBtn.style.display = "none";
            Notify.warning(
              "We're sorry, but you've reached the end of search results."
          )};
         
          lightbox.refresh()
          renderImages(data.hits)
       });
}

function renderImages(array) {
  currentPage = 1;

  array.forEach(item => {
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
     gallery.innerHTML += backup;

    loadMoreBtn.classList.remove('is-hidden');

    const lightbox = new SimpleLightbox('.gallery a', {
      // captions: true,
      // captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh()
  };
}
