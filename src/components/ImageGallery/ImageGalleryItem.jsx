import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export default function ImageGalleryItem() {
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const showModalWindow = () => {
    setOpenModalWindow(true);
  };

  const closeModalWindow = () => {
    setOpenModalWindow(false);
  };

  const { tags, webformatURL, largeImageURL } = this.props;
  return (
    <>
      <img
        onClick={showModalWindow}
        className={css.galleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {openModalWindow === true && (
        <Modal
          dataImage={{ tags, largeImageURL }}
          closeModalWindow={closeModalWindow}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
