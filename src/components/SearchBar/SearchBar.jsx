import {
  SearchButton,
  SearchForm,
  SearchHeader,
  SearchInput,
  SearchLabel,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const formSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.searchInput.value);
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={formSubmit}>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <SearchInput
          type="text"
          name="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
