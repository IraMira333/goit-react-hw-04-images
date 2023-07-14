import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ hits, closeModalWindow }) {
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
    document.body.classList.toggle('overflow');

    return () => {
      window.removeEventListener('keydown', closeEscape);
      document.body.classList.toggle('overflow');
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
        <img src={hits.largeImageURL} alt={hits.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  hits: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,

  closeModalWindow: PropTypes.func.isRequired,
};
