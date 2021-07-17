import { React } from 'react';

import {
  StyledNormalSearchMode,
  StyledSearchCard,
  StyledFilterBar,
  StyledFeatureBar,
  StyledFeatureTags,
  StyledFeatureTag,
} from '../../../styles/SearchPage/NormalSearchMode/StyledNormalSearchModeComps';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';

const FilterBar = () => {
  return (
    <StyledFilterBar>
      <button type="button">
        <p>綜合排序</p>
      </button>
      <button type="button">
        <p>價格</p>
      </button>
      <button type="button">
        <p>最高人氣</p>
      </button>
      <button type="button">
        <p>綜合排序</p>
      </button>
      <button type="button">
        <p>篩選</p>
      </button>
    </StyledFilterBar>
  );
};

const FeatureTag = () => {
  return (
    <StyledFeatureTag>
      <h3>抽取</h3>
    </StyledFeatureTag>
  );
};

const FeatureBar = () => {
  return (
    <StyledFeatureBar>
      <StyledFeatureTags>
        {Array.from({ length: 20 }).map(() => (
          <FeatureTag />
        ))}
      </StyledFeatureTags>
    </StyledFeatureBar>
  );
};

const SearchCard = () => {
  return (
    <StyledSearchCard>
      <IconSearchPage.LikeUnselected className="IconLikeUnselected" />
      <img alt=" " />
      <p className="SearchCardTitle">
        商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名
      </p>
      <p className="SearchCardPrice">
        <span className="priceTag">$</span>
        <span>300</span>
      </p>
      <IconSearchPage.Add2CartUnselected className="IconAdd2CartUnselected" />
    </StyledSearchCard>
  );
};

const NormalSearchMode = () => {
  return (
    <StyledNormalSearchMode>
      <FilterBar />
      <FeatureBar />
      <div className="SearchCardContainer">
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </div>
    </StyledNormalSearchMode>
  );
};

export default NormalSearchMode;

// const Trial = () => {
//     return (
//         <StyledEasySearchPage>
//             <div className="SearchItem">
//                 <h2 className="SearchItemTitle"></h2> {/* Normal 隱藏*/}
//                 <div className="FeatureBar">
//                     <FeatureTag />
//                     <FeatureTag />
//                 </div>
//                 <div className="SearchCards">
//                     <div className="SearchCard">
//                     </div>
//                 </div>
//             </div>
//             <SearchItem />
//         </StyledEasySearchPage>
//     )
// }
