import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import axios from 'axios';
//import  fetchImages from './service-api';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  // notify = () => {
  //   if (this.state.query > 0 && this.state.images.length === 0) {
  //   toast("Wow so easy!")};
  // }

  componentDidUpdate = (prevProps, prevState) => {
    const KEY = "34461243-d0245d06d5a649c5dc9c3b27c";
    const BASE_URL = "https://pixabay.com/api/"
    const FILTER = "&image_type=photo&orientation=horizontal&safesearch=true&per_page=12";
    const URL = `${BASE_URL}?key=${KEY}&q=${this.state.query}${FILTER}&page=${this.state.page}`;

    if (prevState.query !== this.state.query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));


    setTimeout(() => {
      fetch(URL).
      then(res => res.json()).
      then(({ hits, totalHits }) => {
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));
        console.log(hits);
        return this.setState({
          page: 1,
          images: imagesArray,
          imagesOnPage: imagesArray.length,
          totalImages: totalHits,
        });

      })
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
      );
    }, 3000)

}

if (prevState.page !== this.state.page && this.state.page !== 1) {
  this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  setTimeout(() => {
  fetch(URL).
  then(res => res.json())
    .then(({ hits }) => {
      const imagesArray = hits.map(hit => ({
        id: hit.id,
        description: hit.tags,
        smallImage: hit.webformatURL,
        largeImage: hit.largeImageURL,
      }));

      return this.setState(({ images, imagesOnPage }) => {
        return {
          images: [...images, ...imagesArray],
          imagesOnPage: imagesOnPage + imagesArray.length,
        };
      });
    })
    .catch(error => this.setState({ error }))
    .finally(() =>
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
    );
  }, 3000)
}
  }

  getSearchRequest = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const getSearchRequest = this.getSearchRequest;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={getSearchRequest} />

        {images && <ImageGallery images={images} openModal={openModal} />}

        {isLoading && <Loader />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && !isLoading &&(
          <Button onClick={this.notify} onNextFetch={onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
          <ToastContainer />
      </div>
    );
  }
}

export default App;
