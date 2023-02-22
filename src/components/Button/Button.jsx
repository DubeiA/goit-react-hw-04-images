import css from '../Button/Button.module.css';

export const Button = ({ onLoadMore }) => (
  <button type="button" className={css.Button} onClick={onLoadMore}>
    Load More
  </button>
);
