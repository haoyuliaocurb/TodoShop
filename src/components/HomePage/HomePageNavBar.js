/* eslint-disable jsx-a11y/no-autofocus */
import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IconHomePage from '../../styles/HomePage/IconHomePage';
import StyledHomePageNavBar from '../../styles/HomePage/StyledHomePageNavBar';

const HomePageNavBar = ({ cartedProductAmount }) => {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const handleIconCartClick = () => {
    history.push('/cart');
  };
  const handleInputInput = (e) => {
    setInputValue(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?source=0&keywords=${inputValue}`);
  };
  return (
    <StyledHomePageNavBar onSubmit={handleSubmit}>
      <form>
        <span className="searchBar">
          <label htmlFor="searchBar">
            <IconHomePage.Search />
            <input
              value={inputValue}
              id="searchBar"
              placeholder="請輸入您欲新增查詢的商品"
              onInput={handleInputInput}
            />
          </label>
        </span>
        <span className="formerItemAmount">1</span>
        <span className="latterItemAmount">1</span>
      </form>
      <IconHomePage.ChenvronLeft className="iconChenvronLeft" />
      <button type="button" className="iconCart" onClick={handleIconCartClick}>
        <IconHomePage.Cart />
        <span>{cartedProductAmount > 9 ? '+' : cartedProductAmount}</span>
      </button>
    </StyledHomePageNavBar>
  );
};

export default HomePageNavBar;
