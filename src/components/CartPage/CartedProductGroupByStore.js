import { React } from 'react';
import StyledCartedProductGroupByStore from '../../styles/CartPage/StyledCartedProductGroupByStore';

import StoreTitle from './StoreTitle';
import CartedProductCard from './CartedProductCard';

const CartedProductGroupByStore = () => {
  return (
    <StyledCartedProductGroupByStore>
      <StoreTitle />
      {Array.from({ length: 2 }).map(() => (
        <CartedProductCard />
      ))}
    </StyledCartedProductGroupByStore>
  );
};

export default CartedProductGroupByStore;
