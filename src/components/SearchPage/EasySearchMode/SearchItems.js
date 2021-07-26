/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import SearchCards from './SearchCards';
import FeatureBar from './FeatureBar';
import { getTimeKeyGenerator } from '../../../utils/selfLibrary';

import { StyledSearchItem } from '../../../styles/SearchPage/EasySearchMode/StyledSearchItemsComps';

const SearchItem = ({ eachSearchInfo, updateSearchCardIdxObj, itemKey }) => {
  const { products: productsData } = eachSearchInfo;
  return (
    <StyledSearchItem>
      <div className="SearchItemTitle">
        <h3>{eachSearchInfo.keyword}</h3>
      </div>
      <FeatureBar />
      <SearchCards
        productsData={productsData}
        updateSearchCardIdxObj={updateSearchCardIdxObj}
        itemKey={itemKey}
      />
    </StyledSearchItem>
  );
};

const SearchItems = ({ searchInfo, updateSearchItemIdxObj, updateSearchCardIdxObj }) => {
  // console.log('!searchInfo: ', !searchInfo);
  const [preSearchInfo, setPreSearchInfo] = useState(null);
  let newSearchItems = [];
  const newSearchItemIdxObj = {};

  if (searchInfo) {
    const getTimeKey = getTimeKeyGenerator();
    newSearchItems = searchInfo.map((eachSearchInfo, index) => {
      const itemKey = getTimeKey();
      newSearchItemIdxObj[itemKey] = index;
      let eachPreSearchInfo = null;
      if (preSearchInfo) {
        eachPreSearchInfo = preSearchInfo[index];
      }
      return (
        <SearchItem
          key={itemKey}
          itemKey={itemKey}
          eachSearchInfo={eachSearchInfo}
          eachPreSearchInfo={eachPreSearchInfo}
          updateSearchCardIdxObj={updateSearchCardIdxObj}
        />
      );
    });
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('searchInfo: ', searchInfo);
    console.log('preSearchInfo: ', preSearchInfo);
    if (preSearchInfo !== null) {
      if (JSON.stringify(searchInfo) === JSON.stringify(preSearchInfo)) {
        return;
      }
    }
    setPreSearchInfo(searchInfo);
    updateSearchItemIdxObj(newSearchItemIdxObj);
  }, [searchInfo]);
  useEffect(() => {
    // console.log('preSearchInfo: ', preSearchInfo);
  }, [preSearchInfo]);

  return !searchInfo ? <div /> : newSearchItems;
};

export default SearchItems;
