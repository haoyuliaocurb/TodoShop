import { React, useRef } from 'react';

import IconSearchPage from '../../styles/SearchPage/IconSearchPage';
import StyledSearchNavBar from '../../styles/SearchPage/StyledSearchNavBar';
import StyledSearchNavBarItems from '../../styles/SearchPage/StyledSearchNavBarItems';

const SearchNavBarItem = ({ index, handleNavBarItemClick, content, selected }) => {
  return (
    <button
      type="button"
      onClick={() => {
        handleNavBarItemClick(index);
      }}
      className={selected ? 'selected' : ''}
    >
      {content}
      <IconSearchPage.Close />
    </button>
  );
};

const SearchNavBar = ({ currentSearchKeywordsIdx, handleNavBarItemClick, searchInfo }) => {
  const searchBar = useRef(null);
  const handleButtonClick = () => {
    if (!searchBar) {
      return;
    }
    searchBar.current.classList.remove('unfocus');
  };
  const handleSearchBarBlur = () => {
    searchBar.current.classList.add('unfocus');
  };
  // console.log('searchInfo: ', searchInfo);
  const getSearchNavBarItems = (searchInfoData) => {
    // eslint-disable-next-line prettier/prettier
    return searchInfoData.map((value, index) => {
      // console.log('value.keyword: ', value.keyword);
      if (index === currentSearchKeywordsIdx) {
        // eslint-disable-next-line react/jsx-boolean-value
        return (
          <SearchNavBarItem
            key={value.keyword}
            handleNavBarItemClick={handleNavBarItemClick}
            content={value.keyword}
            // eslint-disable-next-line react/jsx-boolean-value
            selected={true}
            index={index}
          />
        );
      }
      return (
        <SearchNavBarItem
          key={value.keyword}
          handleNavBarItemClick={handleNavBarItemClick}
          content={value.keyword}
          // eslint-disable-next-line react/jsx-boolean-value
          selected={false}
          index={index}
        />
      );
    });
  };
  return (
    <StyledSearchNavBar>
      <div>
        <span className="searchBar unfocus" ref={searchBar} onBlur={handleSearchBarBlur}>
          <label htmlFor="searchBar">
            <IconSearchPage.Search />
            <input id="searchBar" placeholder="請輸入您欲新增查詢的商品" />
          </label>
        </span>
        <span className="formerItemAmount">1</span>
        <StyledSearchNavBarItems className="container">
          {searchInfo ? getSearchNavBarItems(searchInfo) : ''}
        </StyledSearchNavBarItems>
        <span className="latterItemAmount">1</span>
        <IconSearchPage.Add className="iconAdd" onClick={handleButtonClick} />
      </div>
      <IconSearchPage.ChenvronLeft className="iconChenvronLeft" />
      <span className="iconCart">
        <IconSearchPage.Cart />
        <span>1</span>
      </span>
    </StyledSearchNavBar>
  );
};

export default SearchNavBar;
