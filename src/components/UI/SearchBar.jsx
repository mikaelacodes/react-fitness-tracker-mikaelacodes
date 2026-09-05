// SearchBar.jsx
// Search input that holds its own term (so it works standalone) while lifting
// every change up to the parent via onSearch. Demonstrates four event types:
// change, submit, focus and blur.

import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const SearchBar = ({
  searchTerm = '',
  onSearch,
  onClear,
  onSubmit,
  placeholder = 'Search exercises...',
}) => {
  const [term, setTerm] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);

  // onChange: update local state and lift the new value up to the parent.
  const handleChange = (e) => {
    setTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  // onSubmit: stop the browser reloading the page, then pass the term up.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(term);
  };

  // Reset the field locally and notify the parent.
  const handleClear = () => {
    setTerm('');
    if (onClear) onClear();
  };

  // Conditional styling: highlight the wrapper while the input has focus.
  const wrapperClass = `${styles.searchBar} ${isFocused ? styles.searchBarFocused : ''}`;

  return (
    <form className={wrapperClass} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        value={term}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {/* Conditional rendering (&&): only show Clear once there is text. */}
      {term && (
        <button type="button" className={styles.clearButton} onClick={handleClear}>
          Clear
        </button>
      )}
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
