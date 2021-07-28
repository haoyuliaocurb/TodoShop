import { React } from 'react';
import IconSelectAll from '../app/IconSelectAll';
import StyledCartedProductCard from '../../styles/CartPage/StyledCartedProductCard';

const CartedProductCard = ({ productData }) => {
  const { name, price, images } = productData;
  return (
    <StyledCartedProductCard>
      <IconSelectAll />
      <div className="imgProduct">
        <img alt="" src={images[0]} />
      </div>
      <div className="productContent">
        <h3>{name}</h3>
        <h3 className="textPrice">
          <span>$</span>
          <span>{price}</span>
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
