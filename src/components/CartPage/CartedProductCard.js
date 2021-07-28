/* eslint-disable no-unused-vars */
import { React } from 'react';
import { firebase } from '../../utils/firebase/firebase-services';
import IconSelectAll from '../app/IconSelectAll';
import StyledCartedProductCard from '../../styles/CartPage/StyledCartedProductCard';

// eslint-disable-next-line no-unused-vars
const CartedProductCard = ({
  productData,
  buttonState,
  updateButtonState,
  sid,
  updateProductActionCart,
}) => {
  const { name, price, images, pid, cartAmount, cartType } = productData;
  const getButtonSelectAllState = () => {
    if (!buttonState[sid]) {
      return 0;
    }
    if (!buttonState[sid][pid]) {
      if (buttonState[sid].isOnClick || buttonState.buttonSelectAll) {
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
      updateButtonState(updatedButtonStatePart, 2);
    }
    updateButtonState(updatedButtonStatePart, 1, sid);
  };
  const handleAddAmountClick = () => {
    const newUpdateProductActionCart = { cart: { amount: cartAmount + 1 } };
    if (cartType) {
      newUpdateProductActionCart.cart.type = cartType;
    }
    updateProductActionCart(newUpdateProductActionCart, sid, pid);
  };
  const handleSubAmountClick = () => {
    const subedCartAmount = cartAmount - 1;
    let newUpdateProductActionCart = {};
    if (subedCartAmount < 1) {
      newUpdateProductActionCart.cart = firebase.firestore.FieldValue.delete();
    } else {
      newUpdateProductActionCart = { cart: { amount: subedCartAmount } };
      if (cartType) {
        newUpdateProductActionCart.cart.type = cartType;
      }
    }
    updateProductActionCart(newUpdateProductActionCart, sid, pid);
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
          <button className="sub" type="button" onClick={handleSubAmountClick}>
            <span>-</span>
          </button>
          <span>{cartAmount}</span>
          <button className="add" type="button" onClick={handleAddAmountClick}>
            <span>+</span>
          </button>
        </div>
      </div>
    </StyledCartedProductCard>
  );
};

export default CartedProductCard;
