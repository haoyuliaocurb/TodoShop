import { React } from 'react';
import StyledCartedProductGroupByStore from '../../styles/CartPage/StyledCartedProductGroupByStore';

import StoreTitle from './StoreTitle';
import CartedProductCard from './CartedProductCard';

const CartedProductGroupByStore = ({ eachCartData }) => {
  const { storeName, products } = eachCartData;
  return (
    <StyledCartedProductGroupByStore>
      <StoreTitle storeName={storeName} />
      {products.map((productData) => (
        <CartedProductCard productData={productData} />
      ))}
    </StyledCartedProductGroupByStore>
  );
};

export default CartedProductGroupByStore;
