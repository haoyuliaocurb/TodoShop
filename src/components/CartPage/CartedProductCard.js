import { React } from 'react';
import IconSelectAll from '../app/IconSelectAll';
import StyledCartedProductCard from '../../styles/CartPage/StyledCartedProductCard';

const CartedProductCard = () => {
  return (
    <StyledCartedProductCard>
      <IconSelectAll />
      <div className="imgProduct">
        <img alt="" />
      </div>
      <div className="productContent">
        <h3>花王 KAO 洗髮精兒童專用 (750ml/瓶)</h3>
        <h3 className="textPrice">
          <span>$</span>
          <span>69</span>
        </h3>
        <div className="buttonAdjustAmount">
          <button className="add" type="button">
            <span>-</span>
          </button>
          <span>1</span>
          <button className="sub" type="button">
            <span>+</span>
          </button>
        </div>
      </div>
    </StyledCartedProductCard>
  );
};

export default CartedProductCard;
