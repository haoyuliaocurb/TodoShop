import { React } from 'react';
import StyledStoreTitle from '../../styles/CartPage/StyledStoreTitle';
import IconSelectAll from '../app/IconSelectAll';

// eslint-disable-next-line no-unused-vars
const StoreTitle = ({ storeName, buttonState, updateButtonState, sid, productsData }) => {
  const getButtonSelectAllState = () => {
    if (!buttonState[sid]) {
      return 0;
    }
    if (!buttonState[sid].isOnClick) {
      const isPidAllSelected = productsData.every((productData) => {
        const { pid } = productData;
        return buttonState[sid][pid];
      });
      if (isPidAllSelected) {
        return 1;
      }
      return 0;
    }
    return 1;
  };
  const buttonSelectAllState = getButtonSelectAllState();
  const handleIconSelectAllClick = () => {
    let updatedButtonStatePart = {};
    if (!buttonSelectAllState) {
      updatedButtonStatePart.isOnClick = 1;
    } else {
      updatedButtonStatePart = null;
    }
    updateButtonState(updatedButtonStatePart, 1, sid);
  };
  return (
    <StyledStoreTitle>
      <IconSelectAll
        buttonSelectAllState={buttonSelectAllState}
        handleIconSelectAllClick={handleIconSelectAllClick}
      />
      <h3>{storeName}</h3>
    </StyledStoreTitle>
  );
};

export default StoreTitle;
