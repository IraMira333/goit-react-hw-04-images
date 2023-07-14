import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ largeImageURL, tags }, closeModalWindow) {
  // componentDidMount() {
  //   document.addEventListener('keydown', this.closeEscape);
  //   document.body.classList.toggle('overflow');
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.closeEscape);
  //   document.body.classList.toggle('overflow');
  // }
  useEffect(() => {
    const closeEscape = evt => {
      if (evt.code === 'Escape') {
        closeModalWindow();
      }
    };

    window.addEventListener('keydown', closeEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeEscape);
      document.body.style.overflow = 'auto';
    };
  }, [closeModalWindow]);

  const closeOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      closeModalWindow();
    }
  };

  return (
    <div className={css.overlay} onClick={closeOverlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  dataImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,

  closeModalWindow: PropTypes.func.isRequired,
};
