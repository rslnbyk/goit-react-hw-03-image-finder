import { GalleryItemImg, GalleryItemLi } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img, openModal }) => {
  return (
    <GalleryItemLi>
      <GalleryItemImg
        src={img.webformatURL}
        alt="Searched content"
        onClick={() => openModal(img.largeImageURL)}
      />
    </GalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
