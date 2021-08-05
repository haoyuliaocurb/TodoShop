import { React } from 'react';
import StyledProductPageToolBar from '../../styles/ProductPage/StyledProductPageToolBar';

const ProductPageToolBar = ({
  productAction,
  updateProductAction,
  pid,
  currentUid,
  showModolMessagePleaseSignIn,
}) => {
  const isCarted = productAction && productAction.cart ? 1 : 0;
  // console.log('isCarted: ', isCarted);
  const handleIconAdd2CartClick = () => {
    // console.log('trigger handleIconAdd2CartClick');
    if (!currentUid) {
      showModolMessagePleaseSignIn();
      return;
    }
    const getCurrentCart = () => {
      // console.log('isLiked: ', isLiked);
      // console.log('productAction.like: ', productAction.like);
      if (!isCarted) {
        return null;
      }
      if (!productAction.cart) {
        return null;
      }
      return productAction.cart;
    };
    const currentCart = getCurrentCart();
    // console.log('currentCart: ', currentCart);
    if (currentCart) {
      return;
    }
    const cartedProductAction = {
      ...productAction,
      cart: !currentCart ? { amount: 1 } : null,
    };
    updateProductAction(pid, cartedProductAction);
  };
  return (
    <StyledProductPageToolBar>
      {!isCarted ? (
        <button
          type="button"
          className="buttonToolBar buttonAdd2Cart"
          onClick={handleIconAdd2CartClick}
        >
          <p>加入購物車</p>
        </button>
      ) : (
        <button
          type="button"
          className="buttonToolBar buttonCarted"
          onClick={handleIconAdd2CartClick}
        >
          <p>已加入購物車</p>
        </button>
      )}
    </StyledProductPageToolBar>
  );
};

export default ProductPageToolBar;
