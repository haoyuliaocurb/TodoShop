// script
import { React } from 'react';
// import { Link } from 'react-router-dom';

import EasySearchMode from '../components/SearchPage/EasySearchMode/EasySearchMode';

// styling
import StyledSearchPage from '../styles/SearchPage/StyledSearchPage';

const SearchNavBar = () => {
  return <nav />;
};

const FilterBar = () => {
  return <div />;
};

const SearchPages = () => {
  return (
    <StyledSearchPage>
      <SearchNavBar />
      {false ? <div /> : <FilterBar />}
      <EasySearchMode />
    </StyledSearchPage>
  );
};

export default SearchPages;
