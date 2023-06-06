const KEY = 'https://pixabay.com/api/';
const URL = '34461243-d0245d06d5a649c5dc9c3b27c';
const FILTER = 'image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}

export default fetchImages;