import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';


class Searchbar extends Component {

  state = {
    query: '',
  };

  onChangeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;
    const { hits } = this.state;

    if (query.trim() === '') {
      return toast.info('Please enter a search term.');

    }

    onSubmit(query);
  };

  render() {
    const { query } = this.state;
    const onSubmitForm = this.onSubmitForm;
    const onChangeInput = this.onChangeInput;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmitForm}>
          <input className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={onChangeInput}
          />
        <button className={css.SearchFormButton} type="submit">
        <FaSearch size={15} />
        </button>
        </form>
      </header>
    );
  }
}


Searchbar.propTypes = { 
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;