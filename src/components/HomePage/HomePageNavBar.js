import { React } from 'react';
import IconHomePage from '../../styles/HomePage/IconHomePage';
import StyledHomePageNavBar from '../../styles/HomePage/StyledHomePageNavBar';

const HomePageNavBar = () => {
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
      <span className="iconCart">
        <IconHomePage.Cart />
        <span>1</span>
      </span>
    </StyledHomePageNavBar>
  );
};

export default HomePageNavBar;
