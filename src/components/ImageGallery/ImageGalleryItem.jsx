import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ showModal, url, largeImageURL, alt }) => {
    return (
        <li className={styles.ImageGalleryItem} onClick={() => showModal({ largeImageURL, alt })}>
            <img src={url} alt={alt} className={styles.ImageGalleryItemImage} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    showModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string
}