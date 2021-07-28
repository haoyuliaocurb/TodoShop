/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
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

const SearchCards = ({ productsData, updateSearchCardIdxObj, itemKey }) => {
  // const [preProductsData, setPreProductsData] = useState(null);
  // const preItemKey = useRef(null);
  let newSearchCards = [];
  const newSearchCardIdxObj = {};
  newSearchCardIdxObj[itemKey] = {};

  if (productsData) {
    newSearchCards = productsData.map((eachProductData, index) => {
      const { name, image, price, pid, productAction } = eachProductData;
      newSearchCardIdxObj[itemKey][pid] = index;
      return (
        <SearchCard
          key={pid}
          name={name}
          image={image}
          price={price}
          productAction={productAction}
        />
      );
    });
  }

  // useEffect(() => {
  //   console.log('preItemKey.current: ', preItemKey.current);
  // }, [preItemKey]);
  // useEffect(() => {
  //   if (preProductsData !== null) {
  //     if (JSON.stringify(productsData) === JSON.stringify(preProductsData)) {
  //       return;
  //     }
  //   }
  //   console.log('preItemKey.current: ', preItemKey.current);
  //   console.log('itemKey: ', itemKey);
  //   console.log('preProductsData: ', preProductsData);
  //   console.log('productsData: ', productsData);
  //   setPreProductsData(productsData);
  //   updateSearchCardIdxObj(newSearchCardIdxObj, preItemKey.current);
  //   preItemKey.current = itemKey;
  // }, [productsData]);
  // useEffect(() => {
  //   // console.log('preProductsData: ', preProductsData);
  // }, [preProductsData]);
  useEffect(() => {
    return () => {
      console.log('<SearchCards /> unmount');
    };
  }, []);

  return <StyledSearchCards>{!productsData ? <div /> : newSearchCards}</StyledSearchCards>;
};

export default SearchCards;
