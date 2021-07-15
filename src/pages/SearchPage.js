import { React } from 'react';
import styled from '@emotion/styled/macro';
// import { Link } from 'react-router-dom';

import EasySearchMode from '../components/SearchPage/EasySearchMode/EasySearchMode';
import { styledVariables } from '../styles/app/cssMaterial';
import IconSearchPage from '../styles/SearchPage/IconSearchPage';
import StyledSearchPage from '../styles/SearchPage/StyledSearchPage';

const SearchNavBarItem = ({ selected }) => {
  return <span className={selected ? 'selected' : ''}>衛生紙</span>;
};

const getSearchNavBarItems = () => {
  // eslint-disable-next-line prettier/prettier
  return Array.from({ length: 20 }).map((value, index) => {
    if (index === 0) {
      // eslint-disable-next-line react/jsx-boolean-value
      return <SearchNavBarItem selected={true} />;
    }
    return <SearchNavBarItem selected={false} />;
  });
};

const StyledSearchNavBarItems = styled.div`
  display: inline-block;
  width: 400px;
  max-width: ${styledVariables.shared.contentMaxWidth};
`;

const SearchNavBar = () => {
  return (
    <nav>
      <div>
        <span>1</span>
        <StyledSearchNavBarItems className="container">
          {getSearchNavBarItems()}
        </StyledSearchNavBarItems>
        <IconSearchPage.Add className="iconAdd" />
      </div>
      <IconSearchPage.ChenvronLeft className="iconChenvronLeft" />
      <span className="iconCart">
        <IconSearchPage.Cart />
        <span>1</span>
      </span>
    </nav>
  );
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
