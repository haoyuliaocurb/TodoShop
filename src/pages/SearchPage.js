import { React } from 'react';
import styled from '@emotion/styled/macro';
// import { Link } from 'react-router-dom';

import EasySearchMode from '../components/SearchPage/EasySearchMode/EasySearchMode';
import NormalSearchMode from '../components/SearchPage/NormalSearchMode/NormalSearchMode';
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

const SearchPages = ({ searchInfo }) => {
  const { isEasySearchMode } = searchInfo;

  /*
      const searchResult = ['SWUNApoWStoWaW7RP4hh', 'SeFCJJMAzLXBxbJ2MdI1'];
    const UID_TEST = 'kqXYsHFzzTN0DGlBqFdyafGtU052';
    const results = await firestore
      .collectionGroup('productAction')
      .where('uid', '==', UID_TEST)
      .limit(15)
      .get();
    // console.log('end promise');
    const productAction = { bookmark: {}, like: {}, cart: {} };
    results.forEach((srcValue) => {
      const value = srcValue.data();
      const { pid } = value;
      if (value.bookmark) {
        productAction.bookmark[pid] = true;
      }
      if (value.like) {
        productAction.like[pid] = true;
      }
      if (value.cart) {
        productAction.cart[pid] = true;
      }
    });
    const newSearchResult = searchResult.map((pid) => {
      const objReturned = {};
      if (productAction.bookmark[pid]) {
        objReturned.bookmark = true;
      }
      if (productAction.like[pid]) {
        objReturned.like = true;
      }
      if (productAction.cart[pid]) {
        objReturned.cart = true;
      }
      return objReturned;
    });
    console.log('newSearchResult: ', newSearchResult);
  };
  getData();
  */

  return (
    <StyledSearchPage>
      <SearchNavBar />
      {isEasySearchMode ? <EasySearchMode /> : <NormalSearchMode />}
    </StyledSearchPage>
  );
};

export default SearchPages;
