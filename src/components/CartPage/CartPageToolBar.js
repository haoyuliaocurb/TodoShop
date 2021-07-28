import { React } from 'react';
import StyledCartPageToolBar from '../../styles/CartPage/StyledCartPageToolBar';
import IconSelectAll from '../app/IconSelectAll';

const CartPageToolBar = ({ cartedProductPriceSum }) => {
  const toolBarState = 1;
  const buttonSelectAllState = 0;
  // console.log('<TodolistPageToolBar />: render');
  const getToolBarContent = (toolBarStateValue) => {
    switch (toolBarStateValue) {
      case 2:
        return (
          <div>
            <button type="button" className="buttonSelectAll">
              <span>
                <span className={!buttonSelectAllState ? 'dot vb-hidden' : 'dot'} />
              </span>
              <p>全選</p>
            </button>
            <button type="button" className="buttonDeleteCard">
              刪除
            </button>
          </div>
        );
      default:
        return (
          <div>
            <button type="button" className="buttonSelectAll">
              <IconSelectAll buttonSelectAllState={0} />
              <p>全選</p>
            </button>
            <div className="sumPriceText">
              <p>合計</p>
              <span className="sumPrice">
                <h3>$</h3>
                <h3>{cartedProductPriceSum}</h3>
              </span>
            </div>
            <button type="button" className="buttonPayment">
              結算
            </button>
          </div>
        );
    }
  };
  return <StyledCartPageToolBar>{getToolBarContent(toolBarState)}</StyledCartPageToolBar>;
};

export default CartPageToolBar;
