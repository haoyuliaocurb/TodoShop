import { React } from 'react';
import { useParams } from 'react-router-dom';
import StyledProductPage from '../styles/ProductPage/StyledProductPage';

const ProductPage = () => {
  const { pid } = useParams();
  return (
    <StyledProductPage>
      <p>{`Product Page: ${pid}`}</p>
    </StyledProductPage>
  );
};

export default ProductPage;
