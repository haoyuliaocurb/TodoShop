import { React } from 'react';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';
import {
  StyledSearchCards,
  StyledSearchCard,
} from '../../../styles/SearchPage/EasySearchMode/StyledSearchCardsComps';

const SearchCard = ({ name, image, price, productAction }) => {
  // eslint-disable-next-line no-unused-vars
  const isBookmarked = productAction ? productAction.bookmark || false : false;
  const isCarted = productAction ? productAction.cart || false : false;

  // <StyledSearchCard className={isBookmarked ? 'bookmarked' : ''}>
  return (
    <StyledSearchCard>
      {isBookmarked ? (
        <IconSearchPage.Bookmark className="IconBookmarkSelected" />
      ) : (
        <IconSearchPage.Bookmark className="IconBookmarkUnselected" />
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

const SearchCards = ({ products }) => {
  return (
    <StyledSearchCards>
      {products.map((product) => {
        const { name, image, price, productAction } = product;
        return <SearchCard name={name} image={image} price={price} productAction={productAction} />;
      })}
    </StyledSearchCards>
  );
};

export default SearchCards;
