/* eslint-disable no-unused-vars */
import { React } from 'react';
import { useHistory } from 'react-router-dom';
import { firebase } from '../../utils/firebase/firebase-services';
import IconSelectAll from '../app/IconSelectAll';
import StyledProductCard from '../../styles/PaymentPage/StyledProductCard';

// eslint-disable-next-line no-unused-vars
const ProductCard = ({ productData, sid }) => {
  const { name, price, images, pid, amount } = productData;
  // type seems to be reserved keyword
  const productType = !productData.productType ? null : productData.productType;
  const history = useHistory();
  const handleSelfClick = () => {
    history.push(`/product/${pid}`);
  };
  return (
    <StyledProductCard onClick={handleSelfClick}>
      <div className="imgProduct">
        <img alt="" src={images[0]} />
      </div>
      <div className="productContent">
        <h3 className="textName">{name}</h3>
        <div className="textOthers">
          {!productType ? (
            <div />
          ) : (
            <h3>
              <span>類型：</span>
              <span>{productType}</span>
            </h3>
          )}
          {!amount ? (
            <div />
          ) : (
            <h3>
              <span>數量：</span>
              <span>{amount}</span>
            </h3>
          )}
        </div>
        <h3 className="textPrice">
          <span>$</span>
          <span>{price}</span>
        </h3>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
