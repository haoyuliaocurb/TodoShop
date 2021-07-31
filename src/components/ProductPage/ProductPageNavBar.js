import { React } from 'react';
import { useHistory } from 'react-router-dom';
import StyledProductPageNavBar from '../../styles/ProductPage/StyledProductPageNavBar';
import IconSearchPage from '../../styles/SearchPage/IconSearchPage';
import IconAppContent from '../../styles/app/IconAppContent';

const ProductPageNavBar = ({ cartedProductAmount, isSimpleMode }) => {
  // console.log('isSimpleMode: ', isSimpleMode);
  const history = useHistory();
  const handleChevronLeftClick = () => {
    history.go(-1);
  };
  const handleIconCartClick = () => {
    history.push('/cart');
  };
  const getNavBarContent = (isSimpleModeValue) => {
    switch (isSimpleModeValue) {
      case 1:
        return (
          <div className="simple">
            <span className="groupIconChenvronLeft">
              <span className="background" />
              <IconAppContent.ChevronLeft
                className="iconChenvronLeft"
                onClick={handleChevronLeftClick}
              />
            </span>
            <button type="button" className="iconCart" onClick={handleIconCartClick}>
              <span className="background" />
              <IconSearchPage.Cart />
              <span>{cartedProductAmount > 9 ? '+' : cartedProductAmount}</span>
            </button>
          </div>
        );
      default:
        return (
          <div>
            <span className="groupIconChenvronLeft">
              <span className="background vb-hidden" />
              <IconAppContent.ChevronLeft
                className="iconChenvronLeft"
                onClick={handleChevronLeftClick}
              />
            </span>
            <button type="button" className="iconCart" onClick={handleIconCartClick}>
              <span className="background vb-hidden" />
              <IconSearchPage.Cart />
              <span>{cartedProductAmount > 9 ? '+' : cartedProductAmount}</span>
            </button>
          </div>
        );
    }
  };
  return <StyledProductPageNavBar>{getNavBarContent(isSimpleMode)}</StyledProductPageNavBar>;
};

export default ProductPageNavBar;
