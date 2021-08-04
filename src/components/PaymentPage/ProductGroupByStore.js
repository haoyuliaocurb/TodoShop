import { React } from 'react';
import StyledProductGroupByStore from '../../styles/PaymentPage/StyledProductGroupByStore';

import StoreTitle from './StoreTitle';
import ProductCard from './ProductCard';

const ProductGroupByStore = ({
  eachCartData,
  buttonState,
  updateButtonState,
  updateProductActionCart,
  visibility,
}) => {
  const { storeName, products, sid } = eachCartData;
  return (
    <StyledProductGroupByStore visibility={visibility}>
      <StoreTitle
        sid={sid}
        productsData={products}
        storeName={storeName}
        buttonState={buttonState}
        updateButtonState={updateButtonState}
      />
      {products.map((productData) => (
        <ProductCard
          sid={sid}
          productData={productData}
          buttonState={buttonState}
          updateButtonState={updateButtonState}
          updateProductActionCart={updateProductActionCart}
        />
      ))}
    </StyledProductGroupByStore>
  );
};

export default ProductGroupByStore;
