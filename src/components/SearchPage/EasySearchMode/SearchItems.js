import { React } from 'react';
import SearchCards from './SearchCards';
import FeatureBar from './FeatureBar';
import { getTimeKeyGenerator } from '../../../utils/selfLibrary';

import { StyledSearchItem } from '../../../styles/SearchPage/EasySearchMode/StyledSearchItemsComps';

const SearchItem = ({ eachSearchInfo }) => {
  const { products } = eachSearchInfo;
  return (
    <StyledSearchItem>
      <div className="SearchItemTitle">
        <h3>{eachSearchInfo.keyword}</h3>
      </div>
      <FeatureBar />
      <SearchCards products={products} />
    </StyledSearchItem>
  );
};

const SearchItems = ({ searchInfo, updateSearchItemIdxObj }) => {
  // console.log('!searchInfo: ', !searchInfo);
  if (!searchInfo) {
    return <div />;
  }
  const newSearchItemIdxObj = {};
  const getTimeKey = getTimeKeyGenerator();
  const newSearchItems = searchInfo.map((eachSearchInfo, index) => {
    const timeKey = getTimeKey();
    newSearchItemIdxObj[timeKey] = index;
    return <SearchItem key={timeKey} eachSearchInfo={eachSearchInfo} />;
  });
  updateSearchItemIdxObj(newSearchItemIdxObj);

  return newSearchItems;
};

export default SearchItems;
