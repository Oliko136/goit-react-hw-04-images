import { Component } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader"; 
import { Modal } from "../Modal/Modal";
import { fetchImages } from "services/images-api";
import styles from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    maxPage: null,
    modalOpen: false,
    imageDetails: {}
  }

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage !== prevPage || nextQuery !== prevQuery) {
      this.setState({ status: 'pending' });
    
      try {
        const { hits, totalHits } = await fetchImages(nextQuery, nextPage);

        this.setState(({ images }) => ({
          images: [...images, ...hits],
          maxPage: Math.ceil(totalHits / 12 ),
          status: 'resolved'
        }))
        
      }
      catch (error) {
        this.setState({ error: error.message, status: 'rejected' });
      }
    }
  }

  handleSearch = (query) => {
    this.setState({
      query,
      images: [],
      page: 1
    });
  }

  loadMore = () => {
    this.setState(({ page }) => ({page: page + 1}));
  }

  showModal = ({ largeImageURL, tags }) => {
    this.setState({
      modalOpen: true,
      imageDetails: {
        largeImageURL,
        tags
      }
    }) 
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
      imageDetails: {}
    })
  }
  

  render() {
    const { handleSearch,loadMore, showModal, closeModal } = this;
    const { query, images, error, status, page, maxPage, modalOpen, imageDetails } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleSearch} />
        
        {status === 'idle' && <p className={styles.DefaultText}>Search images</p>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>{error}</p>}
        {status === 'resolved' && !images.length && <p className={styles.ErrorMessage}>Sorry, no images for {query}. Please, enter a valid query.</p>}
        {images.length > 0 &&
          <>
            <ImageGallery showModal={showModal} items={images} />
            {page < maxPage && <Button onClick={loadMore}>Load More</Button>}
          </>}
        {modalOpen &&
          <Modal close={closeModal}>
            <img src={imageDetails.largeImageURL} alt={imageDetails.tags} />
          </Modal>}
      </div>
    )
  }
};