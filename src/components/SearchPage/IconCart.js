import { React } from 'react';
import StyledIconCart from '../../styles/SearchPage/StyledIconCart';
import IconSearchPage from '../../styles/SearchPage/IconSearchPage';

const IconCart = ({ isCarted, handleIconCartClick, iconCartRef }) => {
  return (
    <StyledIconCart className="iconAdd2Cart" onClick={handleIconCartClick} ref={iconCartRef}>
      {isCarted ? <IconSearchPage.Add2CartSelected /> : <IconSearchPage.Add2CartUnselected />}
    </StyledIconCart>
  );
};

export default IconCart;
