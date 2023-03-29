const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
// import {searchQuery} from './index.js';

const API_KEY = '34815757-11540e8253cc9068e0c598d0d';
let searchQuery = '';
let currentPage = 1;
let onPage = 8;
export default async function getImages(ev) {
  searchQuery = ev.target.elements.searchQuery.value.toLowerCase().trim();
  // console.log(searchQuery);
  try {
    const listImages = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${onPage}`
    );
    console.log(listImages);

    if ((searchQuery = "")) {
      return Notify.failure('Please enter another search query');
    }
    currentPage += 1;
    return listImages;
  } catch (error) {
    console.error(error);
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
