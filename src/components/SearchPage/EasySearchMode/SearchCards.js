/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';
import {
  StyledSearchCards,
  StyledSearchCard,
} from '../../../styles/SearchPage/EasySearchMode/StyledSearchCardsComps';

const SearchCard = ({
  pid,
  name,
  image,
  price,
  productAction,
  cardIdx,
  itemIdx,
  updateSearchCardInfo,
}) => {
  // eslint-disable-next-line no-unused-vars
  const isBookmarked = productAction ? productAction.bookmark || false : false;
  const isCarted = productAction ? productAction.cart || false : false;
  const handleIconBookmarkClick = () => {
    const getCurrentBookmark = () => {
      if (!isBookmarked) {
        return null;
      }
      if (!productAction.bookmark) {
        return null;
      }
      return productAction.bookmark;
    };
    const currentBookmark = getCurrentBookmark();
    const bookmarkedProductAction = {
      ...productAction,
      bookmark: !currentBookmark ? true : null,
    };
    updateSearchCardInfo(pid, bookmarkedProductAction, itemIdx, cardIdx);
  };

  // <StyledSearchCard className={isBookmarked ? 'bookmarked' : ''}>
  return (
    <StyledSearchCard>
      {isBookmarked ? (
        <IconSearchPage.Bookmark
          className="IconBookmarkSelected"
          onClick={handleIconBookmarkClick}
        />
      ) : (
        <IconSearchPage.Bookmark
          className="IconBookmarkUnselected"
          onClick={handleIconBookmarkClick}
        />
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

const SearchCards = ({ productsData, itemKey, itemIdx, updateSearchCardInfo }) => {
  // const [preProductsData, setPreProductsData] = useState(null);
  // const preItemKey = useRef(null);
  let newSearchCards = [];

  if (productsData) {
    newSearchCards = productsData.map((eachProductData, index) => {
      const { name, image, price, pid, productAction } = eachProductData;
      return (
        <SearchCard
          key={pid}
          pid={pid}
          name={name}
          image={image}
          price={price}
          productAction={productAction}
          cardIdx={index}
          itemIdx={itemIdx}
          updateSearchCardInfo={updateSearchCardInfo}
        />
      );
    });
  }

  useEffect(() => {
    return () => {
      console.log('<SearchCards /> unmount');
    };
  }, []);

  return <StyledSearchCards>{!productsData ? <div /> : newSearchCards}</StyledSearchCards>;
};

export default SearchCards;
