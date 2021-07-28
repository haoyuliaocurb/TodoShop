import { React } from 'react';
import StyledStoreTitle from '../../styles/CartPage/StyledStoreTitle';
import IconSelectAll from '../app/IconSelectAll';

const StoreTitle = ({ storeName }) => {
  return (
    <StyledStoreTitle>
      <IconSelectAll buttonSelectAllState={0} />
      <h3>{storeName}</h3>
    </StyledStoreTitle>
  );
};

export default StoreTitle;
