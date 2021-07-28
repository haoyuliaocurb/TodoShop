/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import SearchCards from './SearchCards';
import FeatureBar from './FeatureBar';
import { getTimeKeyGenerator } from '../../../utils/selfLibrary';

import { StyledSearchItem } from '../../../styles/SearchPage/EasySearchMode/StyledSearchItemsComps';

const SearchItem = ({ eachSearchInfo, itemKey, itemIdx, updateSearchCardInfo }) => {
  const { products: productsData } = eachSearchInfo;
  // console.log('itemKey: ', itemKey);

  // useEffect(() => {
  //   return () => {
  //     console.log('<SearchItem />: unmount');
  //   };
  // }, []);
  return (
    <StyledSearchItem>
      <div className="SearchItemTitle">
        <h3>{eachSearchInfo.keyword}</h3>
      </div>
      <FeatureBar />
      <SearchCards
        productsData={productsData}
        itemKey={itemKey}
        itemIdx={itemIdx}
        updateSearchCardInfo={updateSearchCardInfo}
      />
    </StyledSearchItem>
  );
};

const SearchItems = ({ searchInfo, updateSearchCardInfo }) => {
  // console.log('!searchInfo: ', !searchInfo);
  let newSearchItems = [];

  if (searchInfo) {
    newSearchItems = searchInfo.map((eachSearchInfo, index) => {
      const { key: itemKey } = eachSearchInfo;
      return (
        <SearchItem
          key={itemKey}
          itemKey={itemKey}
          itemIdx={index}
          eachSearchInfo={eachSearchInfo}
          updateSearchCardInfo={updateSearchCardInfo}
        />
      );
    });
  }

  useEffect(() => {
    return () => {
      console.log('<SearchItems /> unmount');
    };
  }, []);

  return !searchInfo ? <div /> : newSearchItems;
};

export default SearchItems;
