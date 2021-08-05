/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import SearchCards from './SearchCards';
import FeatureBar from './FeatureBar';
import { getTimeKeyGenerator } from '../../../utils/selfLibrary';

import { StyledSearchItem } from '../../../styles/SearchPage/EasySearchMode/StyledSearchItemsComps';
import MessageNoResult from '../MessageNoResult';

const SearchItem = ({
  eachSearchInfo,
  itemKey,
  itemIdx,
  updateSearchCardInfo,
  showModolMessagePleaseSignIn,
  currentUid,
}) => {
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
        showModolMessagePleaseSignIn={showModolMessagePleaseSignIn}
        currentUid={currentUid}
      />
    </StyledSearchItem>
  );
};

const SearchItems = ({
  searchInfo,
  updateSearchCardInfo,
  showModolMessagePleaseSignIn,
  currentUid,
}) => {
  // console.log('!searchInfo: ', !searchInfo);
  let newSearchItems = [];

  if (searchInfo) {
    if (JSON.stringify(searchInfo) === JSON.stringify({})) {
      return <MessageNoResult />;
    }
    newSearchItems = searchInfo.map((eachSearchInfo, index) => {
      const { key: itemKey } = eachSearchInfo;
      return (
        <SearchItem
          key={itemKey}
          itemKey={itemKey}
          itemIdx={index}
          eachSearchInfo={eachSearchInfo}
          updateSearchCardInfo={updateSearchCardInfo}
          showModolMessagePleaseSignIn={showModolMessagePleaseSignIn}
          currentUid={currentUid}
        />
      );
    });
  }

  // useEffect(() => {
  //   return () => {
  //     console.log('<SearchItems /> unmount');
  //   };
  // }, []);

  return !searchInfo ? <div /> : newSearchItems;
};

export default SearchItems;
