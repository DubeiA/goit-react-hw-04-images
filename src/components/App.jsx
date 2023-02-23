import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { fetchPictures } from './services';

import css from './ImageGallery/ImageGallery.module.css';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [index, setIndex] = useState(null);

  const toggleModal = () => {
    setisOpenModal(prevState => !prevState);
  };

  const getIndex = index => {
    setIndex(index);
  };

  const getSearchSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);

    fetchPictures(query, page)
      .then(images => {
        if (page === 1) {
          setImages([...images.hits]);
          return;
        }

        setImages(prevImages => [...prevImages, ...images.hits]);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [query, page]);

  return (
    <div className={css.container}>
      <Searchbar onSubmit={getSearchSubmit} />
      {error && <div>{error.message}</div>}
      {loading && <Loader />}
      <ImageGallery>
        {images.map((image, index) => {
          return (
            <ImageGalleryItem
              onClick={toggleModal}
              getIndex={getIndex}
              key={image.id}
              index={index}
              image={image.webformatURL}
              tags={image.tags}
            />
          );
        })}
      </ImageGallery>

      {images.length >= 12 && (
        <Button
          onLoadMore={() => {
            setPage(prevPage => prevPage + 1);
          }}
        />
      )}
      {isOpenModal && (
        <Modal onClose={toggleModal}>
          <img src={images[index].largeImageURL} alt={images[index].tags} />
        </Modal>
      )}
    </div>
  );
}
