import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ searchImagesInput }) {
  // const [searching, setSearching] = useState('');

  // const handleChangeInput = e => {
  //   setSearching(e.target.value);
  //   console.log(searching);
  // };

  const onSubmit = e => {
    e.preventDefault();
    const searching = e.target.searching.value.trim().toLowerCase();
    if (searching === '') {
      toast.warn('Please enter a request!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    searchImagesInput(searching);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <input
          className={css.searchFormBtnInput}
          type="text"
          name="searching"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.searchFormBtn}>
          <span className={css.searchFormBtnLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  searchImagesInput: PropTypes.func.isRequired,
};
