const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '34815757-11540e8253cc9068e0c598d0d';

export default async function getImages(searchQuery, currentPage, perPage) {
    
        const listImages = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`
        );
        console.log(listImages.data.totalHits);
        if (listImages.data.totalHits === 0) {
            throw Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        }
        return listImages.data;
    }
 