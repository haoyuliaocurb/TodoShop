// script
import { React } from 'react';
// import { Link } from 'react-router-dom';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';

// styling
import {
  StyledFeatureTag,
  StyledFeatureTags,
  StyledFeatureBar,
  StyledSearchCard,
  StyledSearchCards,
  StyledSearchItem,
  StyledEasySearchPage,
} from '../../../styles/SearchPage/EasySearchMode/StyledEasySearchModeComps';

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
      <IconSearchPage.Bookmark className="IconBookmark" />
      <img alt=" " />
      <p className="SearchCardTitle">
        商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名
      </p>
      <p className="SearchCardPrice">
        <span className="priceTag">$</span>
        <span>119</span>
      </p>
      <IconSearchPage.Add2CartUnselected className="IconAdd2CartUnselected" />
    </StyledSearchCard>
  );
};

const SearchItem = () => {
  return (
    <StyledSearchItem>
      <div className="SearchItemTitle">
        <h3>衛生紙</h3>
      </div>
      <FeatureBar />
      <StyledSearchCards>
        {Array.from({ length: 20 }).map(() => (
          <SearchCard />
        ))}
      </StyledSearchCards>
    </StyledSearchItem>
  );
};

const EasySearchPage = () => {
  return (
    <StyledEasySearchPage>
      <SearchItem />
      <SearchItem />
      <SearchItem />
    </StyledEasySearchPage>
  );
};

export default EasySearchPage;
