import { React } from 'react';
import StyledStoreTitle from '../../styles/CartPage/StyledStoreTitle';
import IconSelectAll from '../app/IconSelectAll';

const StoreTitle = () => {
  return (
    <StyledStoreTitle>
      <IconSelectAll buttonSelectAllState={0} />
      <h3>store</h3>
    </StyledStoreTitle>
  );
};

export default StoreTitle;
