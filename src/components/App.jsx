import React, { useState, useEffect } from 'react';
import { searchImages } from '../API/Api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import LoadMoreBtn from './Button/LoadMoreBtn';
import Loader from './Loader/Loader';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    async function getRequest() {
      try {
        setIsLoading(true);

        const { hits, total, totalHits } = await searchImages(query, page);

        if (!totalHits) {
          toast.warning(`No images found`, toastConfig);
          return;
        }

        if (totalHits > 0 && page === 1) {
          toast.success(`We found ${total} images`, toastConfig);
        }
        const shortimages = hits.map(
          ({ id, tags, largeImageURL, webformatURL }) => {
            return { id, tags, largeImageURL, webformatURL };
          }
        );
        console.log(shortimages);
        setImages(prevState => [...prevState, ...shortimages]);
        setTotalImages(totalHits);
      } catch (error) {
        setError(error => error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    }
    getRequest();
  }, [error, page, query]);

  const searchImagesInput = queryInput => {
    if (query === queryInput) {
      return;
    }
    setQuery(queryInput);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={searchImagesInput} />

      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {!isLoading && images.length !== totalImages && (
        <LoadMoreBtn loadMore={loadMore} />
      )}
      {/* {images.length > 0 &&
          totalImages / imagesPerPage > 1 &&
          Math.ceil(totalImages / imagesPerPage) !== page && (
            <LoadMoreBtn loadMore={this.loadMore} />
          )} */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
