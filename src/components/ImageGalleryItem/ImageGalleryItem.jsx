import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ image, tags, onClick, index, getIndex }) {
  return (
    <li onClick={onClick} className={css.ImageGalleryItem}>
      <img
        onClick={() => {
          getIndex(index);
        }}
        src={image}
        alt={tags}
        className={css.image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  getIndex: PropTypes.func,
  image: PropTypes.string,
  tags: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
};
