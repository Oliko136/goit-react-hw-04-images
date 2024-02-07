import { useState, useEffect } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader"; 
import { Modal } from "../Modal/Modal";
import { fetchImages } from "services/images-api";
import styles from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageDetails, setImageDetails] = useState({});

  useEffect(() => {
    if (!query) {
      return
    }
    
    setStatus('pending');

    const getImages = async () => {
      try {
        const { hits, totalHits } = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...hits]);
        setMaxPage(Math.ceil(totalHits / 12));
        setStatus('resolved');
        
      }
      catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    getImages();
  }, [page, query])

  const handleSearch = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
  }

  const loadMore = () => {
    setPage( prevPage => prevPage + 1);
  }

  const showModal = ({ largeImageURL, tags }) => {
    setModalOpen(true);
    setImageDetails({ largeImageURL, tags });
  }

  const closeModal = () => {
    setModalOpen(false);
    setImageDetails({});
  }

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