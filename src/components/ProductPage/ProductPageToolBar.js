import { React } from 'react';
import StyledProductPageToolBar from '../../styles/ProductPage/StyledProductPageToolBar';

const ProductPageToolBar = ({ productAction }) => {
  const isCarted = productAction && productAction.cart ? 1 : 0;
  return (
    <StyledProductPageToolBar>
      {!isCarted ? (
        <button type="button" className="buttonToolBar buttonAdd2Cart">
          <p>加入購物車</p>
        </button>
      ) : (
        <button type="button" className="buttonToolBar buttonCarted">
          <p>已加入購物車</p>
        </button>
      )}
    </StyledProductPageToolBar>
  );
};

export default ProductPageToolBar;
