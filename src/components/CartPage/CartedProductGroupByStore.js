import { React } from 'react';
import StyledCartedProductGroupByStore from '../../styles/CartPage/StyledCartedProductGroupByStore';

import StoreTitle from './StoreTitle';
import CartedProductCard from './CartedProductCard';

const CartedProductGroupByStore = ({
  eachCartData,
  buttonState,
  updateButtonState,
  updateProductActionCart,
}) => {
  const { storeName, products, sid } = eachCartData;
  return (
    <StyledCartedProductGroupByStore>
      <StoreTitle
        sid={sid}
        productsData={products}
        storeName={storeName}
        buttonState={buttonState}
        updateButtonState={updateButtonState}
      />
      {products.map((productData) => (
        <CartedProductCard
          sid={sid}
          productData={productData}
          buttonState={buttonState}
          updateButtonState={updateButtonState}
          updateProductActionCart={updateProductActionCart}
        />
      ))}
    </StyledCartedProductGroupByStore>
  );
};

export default CartedProductGroupByStore;
