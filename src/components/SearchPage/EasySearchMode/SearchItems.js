/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import SearchCards from './SearchCards';
import FeatureBar from './FeatureBar';
import { getTimeKeyGenerator } from '../../../utils/selfLibrary';

import { StyledSearchItem } from '../../../styles/SearchPage/EasySearchMode/StyledSearchItemsComps';

const SearchItem = ({ eachSearchInfo, updateSearchCardIdxObj, itemKey }) => {
  const { products: productsData } = eachSearchInfo;
  console.log('itemKey: ', itemKey);
  const [preProductsData, setPreProductsData] = useState(null);

  useEffect(() => {
    if (JSON.stringify(preProductsData) !== JSON.stringify(productsData)) {
      return;
    }
    setPreProductsData(productsData);
  }, [eachSearchInfo]);
  useEffect(() => {
    console.log('preProductsData: ', preProductsData);
  }, [preProductsData]);

  useEffect(() => {
    return () => {
      console.log('<SearchItem />: unmount');
    };
  });
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

const SearchItems = ({
  searchInfo,
  preSearchInfo,
  searchItemIdxObj,
  updateSearchItemIdxObj,
  updateSearchCardIdxObj,
}) => {
  // console.log('!searchInfo: ', !searchInfo);
  let newSearchItems = [];
  const isSearchInfoChange = JSON.stringify(preSearchInfo) !== JSON.stringify(searchInfo);
  const preSearchItemsKeys = !searchItemIdxObj ? null : Object.keys(searchItemIdxObj);
  const newSearchItemIdxObj = {};
  // console.log('preSearchItemsKeys: ', preSearchItemsKeys);

  if (searchInfo) {
    const getTimeKey = getTimeKeyGenerator();
    newSearchItems = searchInfo.map((eachSearchInfo, index) => {
      const itemKey =
        !preSearchItemsKeys || isSearchInfoChange ? getTimeKey() : preSearchItemsKeys[index];
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
    // console.log('searchInfo: ', searchInfo);
    // console.log('preSearchInfo: ', preSearchInfo);
    if (preSearchInfo !== null) {
      if (!isSearchInfoChange) {
        return;
      }
    }
    updateSearchItemIdxObj(newSearchItemIdxObj);
  }, [searchInfo]);
  useEffect(() => {
    return () => {
      console.log('<SearchItems /> unmount');
    };
  });

  return !searchInfo ? <div /> : newSearchItems;
};

export default SearchItems;
