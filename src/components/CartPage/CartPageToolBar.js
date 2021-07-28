import { React } from 'react';
import StyledCartPageToolBar from '../../styles/CartPage/StyledCartPageToolBar';
import IconSelectAll from '../app/IconSelectAll';

const CartPageToolBar = ({ cartedProductPriceSum, buttonState, updateButtonState, cartData }) => {
  const toolBarState = !buttonState.management ? 1 : 2;
  // console.log('<TodolistPageToolBar />: render');
  const getButtonSelectAllState = () => {
    if (!buttonState) {
      return 0;
    }
    if (!buttonState.buttonSelectAll) {
      if (cartData) {
        const isSidAllSelected = cartData.every((eachCartData) => {
          const { sid } = eachCartData;
          return buttonState[sid] && buttonState[sid].isOnClick;
        });
        if (isSidAllSelected) {
          return 1;
        }
      }
      return 0;
    }
    return 1;
  };
  const buttonSelectAllState = getButtonSelectAllState();
  const handleIconSelectAllClick = () => {
    console.log('handleIconSelectAllClick');
    const newUpdateButtonStatePart = {};
    if (!buttonSelectAllState) {
      newUpdateButtonStatePart.buttonSelectAll = 1;
      cartData.forEach((eachCartData) => {
        const { sid } = eachCartData;
        if (!newUpdateButtonStatePart[sid]) {
          newUpdateButtonStatePart[sid] = {};
        }
        newUpdateButtonStatePart[sid].isOnClick = 1;
      });
      updateButtonState(newUpdateButtonStatePart);
      return;
    }
    newUpdateButtonStatePart.buttonSelectAll = 0;
    cartData.forEach((eachCartData) => {
      const { sid } = eachCartData;
      newUpdateButtonStatePart[sid] = {};
    });
    updateButtonState(newUpdateButtonStatePart);
  };

  const getToolBarContent = (toolBarStateValue) => {
    switch (toolBarStateValue) {
      case 2:
        return (
          <div>
            <button type="button" className="buttonSelectAll">
              <IconSelectAll
                buttonSelectAllState={buttonSelectAllState}
                handleIconSelectAllClick={handleIconSelectAllClick}
              />
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
              <IconSelectAll
                buttonSelectAllState={buttonSelectAllState}
                handleIconSelectAllClick={handleIconSelectAllClick}
              />
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
