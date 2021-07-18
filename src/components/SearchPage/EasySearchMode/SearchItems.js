import { React } from 'react';
import SearchCards from './SearchCards';
import FeatureBar from './FeatureBar';

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

const SearchItems = ({ searchInfo }) => {
  // console.log('!searchInfo: ', !searchInfo);
  if (!searchInfo) {
    return <div />;
  }
  return searchInfo.map((eachSearchInfo) => <SearchItem eachSearchInfo={eachSearchInfo} />);
};

export default SearchItems;
