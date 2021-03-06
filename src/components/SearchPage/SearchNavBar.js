/* eslint-disable jsx-a11y/no-autofocus */
import { React, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SearchNavBarItem from './SearchNavBarItem';
import IconSearchPage from '../../styles/SearchPage/IconSearchPage';
import StyledSearchNavBar from '../../styles/SearchPage/StyledSearchNavBar';

const SearchNavBar = ({
  currentSearchKeywordsIdx,
  handleNavBarItemClick,
  searchInfo,
  cartedProductAmount,
}) => {
  const searchBar = useRef(null);
  const searchBarInput = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const location = useLocation();
  const handleButtonClick = () => {
    if (!searchBar) {
      return;
    }
    const isUnfocus = /\S*unfocus\S*/.test(searchBar.current.className);
    if (!isUnfocus) {
      return;
    }
    searchBar.current.classList.remove('unfocus');
  };
  const handleSearchBarBlur = () => {
    if (!searchBar.current && !searchBarInput.current) {
      return;
    }
    const isUnfocus = /\S*unfocus\S*/.test(searchBar.current.className);
    if (isUnfocus) {
      return;
    }
    searchBar.current.classList.add('unfocus');
    searchBar.current.addEventListener(
      'transitionend',
      () => {
        // console.log('Transition ended');
        // console.log('searchBarInput.current: ', searchBarInput.current);
        searchBarInput.current.focus();
      },
      { once: true },
    );
  };
  const handleIconCartClick = () => {
    history.push('/cart');
  };
  // console.log('searchInfo: ', searchInfo);
  const getSearchNavBarItems = (searchInfoData) => {
    if (JSON.stringify(searchInfoData) === JSON.stringify({})) {
      return <span />;
    }
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
  const handleInputInput = (e) => {
    // console.log('e.currentTarget.value: ', e.currentTarget.value);
    setInputValue(e.currentTarget.value);
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    const queryStrArr = decodeURI(location.search).split('=');
    queryStrArr[queryStrArr.length - 1] = `${searchBarInput.current.value}+${
      queryStrArr[queryStrArr.length - 1]
    }`;
    const newURL = `${location.pathname}${queryStrArr.join('=')}`;
    // const newURL = `${location.pathname}${decodeURI(location.search)}+${
    //   searchBarInput.current.value
    // }`;
    // console.log('newURL: ', newURL);
    history.push(newURL);
    searchBarInput.current.blur();
  };
  const handleChevronLeftClick = () => {
    history.go(-1);
  };
  // window.addEventListener('click', handleSearchBarBlur);
  return (
    <StyledSearchNavBar>
      <form onSubmit={handleInputSubmit}>
        <span className="searchBar unfocus" ref={searchBar} onBlur={handleSearchBarBlur}>
          <label htmlFor="searchBar">
            <IconSearchPage.Search />
            <input
              value={inputValue}
              id="searchBar"
              type="text"
              placeholder="????????????????????????????????????"
              onInput={handleInputInput}
              ref={searchBarInput}
            />
          </label>
        </span>
        <span className="formerItemAmount vb-hidden">1</span>
        <div className="container">{!searchInfo ? '' : getSearchNavBarItems(searchInfo)}</div>
        <span className="latterItemAmount vb-hidden">1</span>
        <IconSearchPage.Add className="iconAdd" onClick={handleButtonClick} />
      </form>
      <IconSearchPage.ChenvronLeft className="iconChenvronLeft" onClick={handleChevronLeftClick} />
      <button type="button" className="iconCart" onClick={handleIconCartClick}>
        <IconSearchPage.Cart />
        <span>{cartedProductAmount > 9 ? '+' : cartedProductAmount}</span>
      </button>
    </StyledSearchNavBar>
  );
};

export default SearchNavBar;
