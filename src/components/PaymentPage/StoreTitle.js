import { React } from 'react';
import StyledStoreTitle from '../../styles/CartPage/StyledStoreTitle';

// eslint-disable-next-line no-unused-vars
const StoreTitle = ({ storeName, sid, productsData }) => {
  return (
    <StyledStoreTitle>
      <h3>{storeName}</h3>
    </StyledStoreTitle>
  );
};

export default StoreTitle;
