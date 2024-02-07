import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ showModal, items }) => {
    const element = items.map(({ id, webformatURL, largeImageURL, tags }) =>
        <ImageGalleryItem key={id} showModal={showModal} largeImageURL={largeImageURL} url={webformatURL} alt={tags} />)

    return (
        <ul className={styles.ImageGallery}>
           {element}
        </ul>
    )
}

ImageGallery.propTypes = {
    showModal: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
}
