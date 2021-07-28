import { React } from 'react';
import IconSelectAll from '../app/IconSelectAll';
import StyledCartedProductCard from '../../styles/CartPage/StyledCartedProductCard';

// eslint-disable-next-line no-unused-vars
const CartedProductCard = ({ productData, buttonState, updateButtonState, sid }) => {
  const { name, price, images, pid } = productData;
  const getButtonSelectAllState = () => {
    if (!buttonState[sid]) {
      return 0;
    }
    if (!buttonState[sid][pid]) {
      if (buttonState[sid].isOnClick) {
        const updatedButtonStatePart = {};
        updatedButtonStatePart[pid] = 1;
        updateButtonState(updatedButtonStatePart, 1, sid);
      }
      return 0;
    }
    return 1;
  };
  const buttonSelectAllState = getButtonSelectAllState();
  const handleIconSelectAllClick = () => {
    const updatedButtonStatePart = {};
    if (!buttonSelectAllState) {
      updatedButtonStatePart[pid] = 1;
    } else {
      updatedButtonStatePart[pid] = 0;
      updatedButtonStatePart.isOnClick = 0;
    }
    updateButtonState(updatedButtonStatePart, 1, sid);
  };
  return (
    <StyledCartedProductCard>
      <IconSelectAll
        buttonSelectAllState={buttonSelectAllState}
        handleIconSelectAllClick={handleIconSelectAllClick}
      />
      <div className="imgProduct">
        <img alt="" src={images[0]} />
      </div>
      <div className="productContent">
        <h3>{name}</h3>
        <h3 className="textPrice">
          <span>$</span>
          <span>{price}</span>
        </h3>
        <div className="buttonAdjustAmount">
          <button className="add" type="button">
            <span>-</span>
          </button>
          <span>1</span>
          <button className="sub" type="button">
            <span>+</span>
          </button>
        </div>
      </div>
    </StyledCartedProductCard>
  );
};

export default CartedProductCard;
