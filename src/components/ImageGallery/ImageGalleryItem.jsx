import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
}) {
  const [openModalWindow, setOpenModalWindow] = useState(false);

  // const showModalWindow = () => {
  //   setOpenModalWindow(true);
  // };

  // const closeModalWindow = () => {
  //   setOpenModalWindow(false);
  // };
  //const toglModalWindow = () => setOpenModalWindow(data => !data);

  return (
    <>
      <img
        onClick={() => setOpenModalWindow(true)}
        className={css.galleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {openModalWindow === true && (
        <Modal
          hits={{ tags, largeImageURL }}
          closeModalWindow={() => setOpenModalWindow(false)}
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
