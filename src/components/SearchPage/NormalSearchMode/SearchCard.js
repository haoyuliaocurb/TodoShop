import { React } from 'react';
import StyledSearchCard from '../../../styles/SearchPage/NormalSearchMode/StyledSearchCard';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';

const SearchCard = ({ productInfo, updateSearchCardInfo, cardIdx, currentSearchKeywordsIdx }) => {
  const { name, price, images, productAction, pid } = productInfo;
  const isLiked = productAction ? productAction.like || false : false;
  const isCarted = productAction ? productAction.cart || false : false;

  const handleIconLikeClick = () => {
    const getCurrentLike = () => {
      if (!isLiked) {
        return null;
      }
      if (!productAction.like) {
        return null;
      }
      return productAction.like;
    };
    const currentLike = getCurrentLike();
    const likeedProductAction = {
      ...productAction,
      like: !currentLike ? true : null,
    };
    updateSearchCardInfo(
      pid,
      likeedProductAction,
      currentSearchKeywordsIdx,
      cardIdx,
      productAction,
    );
  };

  const handleIconCartClick = () => {
    const getCurrentCart = () => {
      if (!isCarted) {
        return null;
      }
      if (!productAction.cart) {
        return null;
      }
      return productAction.cart;
    };
    const currentCart = getCurrentCart();
    const cartedProductAction = {
      ...productAction,
      cart: !currentCart ? { amount: 1 } : null,
    };
    updateSearchCardInfo(
      pid,
      cartedProductAction,
      currentSearchKeywordsIdx,
      cardIdx,
      productAction,
    );
  };

  return (
    <StyledSearchCard>
      {isLiked ? (
        <IconSearchPage.LikeSelected className="IconLikeSelected" onClick={handleIconLikeClick} />
      ) : (
        <IconSearchPage.LikeUnselected
          className="IconLikeUnselected"
          onClick={handleIconLikeClick}
        />
      )}
      <img alt="" src={images[0]} />
      <p className="SearchCardTitle">{name}</p>
      <p className="SearchCardPrice">
        <span className="priceTag">$</span>
        <span>{price}</span>
      </p>
      {isCarted ? (
        <IconSearchPage.Add2CartSelected className="IconAdd2Cart" onClick={handleIconCartClick} />
      ) : (
        <IconSearchPage.Add2CartUnselected className="IconAdd2Cart" onClick={handleIconCartClick} />
      )}
    </StyledSearchCard>
  );
};

export default SearchCard;
