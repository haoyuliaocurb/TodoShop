import { React } from 'react';
import StyledSearchCard from '../../../styles/SearchPage/NormalSearchMode/StyledSearchCard';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';

const SearchCard = ({ productInfo }) => {
  const { name, price, image, productAction } = productInfo;
  const isLiked = productAction ? productAction.like || false : false;
  const isCarted = productAction ? productAction.cart || false : false;

  return (
    <StyledSearchCard>
      {isLiked ? (
        <IconSearchPage.LikeSelected className="IconLikeSelected" />
      ) : (
        <IconSearchPage.LikeUnselected className="IconLikeUnselected" />
      )}
      <img alt="" src={image} />
      <p className="SearchCardTitle">{name}</p>
      <p className="SearchCardPrice">
        <span className="priceTag">$</span>
        <span>{price}</span>
      </p>
      {isCarted ? (
        <IconSearchPage.Add2CartSelected className="IconAdd2Cart" />
      ) : (
        <IconSearchPage.Add2CartUnselected className="IconAdd2Cart" />
      )}
    </StyledSearchCard>
  );
};

export default SearchCard;
