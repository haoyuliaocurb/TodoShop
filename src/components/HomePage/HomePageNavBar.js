/* eslint-disable jsx-a11y/no-autofocus */
import { React } from 'react';
import { useHistory } from 'react-router-dom';
import IconHomePage from '../../styles/HomePage/IconHomePage';
import StyledHomePageNavBar from '../../styles/HomePage/StyledHomePageNavBar';

const HomePageNavBar = ({ cartedProductAmount }) => {
  const history = useHistory();
  const handleIconCartClick = () => {
    history.push('/cart');
  };
  return (
    <StyledHomePageNavBar>
      <div>
        <span className="searchBar">
          <label htmlFor="searchBar">
            <IconHomePage.Search />
            <input id="searchBar" placeholder="請輸入您欲新增查詢的商品" />
          </label>
        </span>
        <span className="formerItemAmount">1</span>
        <span className="latterItemAmount">1</span>
      </div>
      <IconHomePage.ChenvronLeft className="iconChenvronLeft" />
      <button type="button" className="iconCart" onClick={handleIconCartClick}>
        <IconHomePage.Cart />
        <span>{cartedProductAmount}</span>
      </button>
    </StyledHomePageNavBar>
  );
};

export default HomePageNavBar;
