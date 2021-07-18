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

const FilterBar = ({
  handleGeneralSortButtonClick,
  handlePriceSortButtonClick,
  handleHitButtonClick,
  handleEasySearchButtonClick,
  filterButtonState,
}) => {
  const { generalSort, priceSort, hit } = filterButtonState;
  const getGeneralSortIcon = (generalSortValue) => {
    switch (generalSortValue) {
      case 0:
        return <IconSearchPage.NoSort />;
      case 1:
        return <IconSearchPage.SortUp className="fill" />;
      case 2:
        return <IconSearchPage.SortDown className="fill" />;
      default:
        return <IconSearchPage.NoSort />;
    }
  };
  const getPriceSortIcon = (priceSortValue) => {
    switch (priceSortValue) {
      case 0:
        return <IconSearchPage.NoSort />;
      case 1:
        return <IconSearchPage.SortUp className="fill" />;
      case 2:
        return <IconSearchPage.SortDown className="fill" />;
      default:
        return <IconSearchPage.NoSort />;
    }
  };
  return (
    <StyledFilterBar>
      <button
        onClick={handleGeneralSortButtonClick}
        className={`generalSort ${generalSort ? 'notNoSort' : 'noSort'}`}
        type="button"
      >
        <p>綜合排序</p>
        <span>{getGeneralSortIcon(generalSort)}</span>
      </button>
      <button
        onClick={handlePriceSortButtonClick}
        className={`priceSort ${priceSort ? 'notNoSort' : 'noSort'}`}
        type="button"
      >
        <p>價格</p>
        <span>{getPriceSortIcon(priceSort)}</span>
      </button>
      <button
        onClick={handleHitButtonClick}
        className={`hit ${hit ? 'selected' : 'unselected'}`}
        type="button"
      >
        <p>最高人氣</p>
      </button>
      <span>
        <button onClick={handleEasySearchButtonClick} className="easySearch" type="button">
          <IconSearchPage.EasySearch />
        </button>
        <button className="filter" type="button">
          <IconSearchPage.Filter />
          <p>篩選</p>
        </button>
      </span>
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

const SearchCard = ({ productInfo }) => {
  const { name, price, image, productAction } = productInfo;
  const isLiked = productAction ? productAction.like || false : false;
  const isCarted = productAction ? productAction.cart || false : false;

  return (
    <StyledSearchCard>
      {isLiked ? (
        <IconSearchPage.LikeSelected className="IconLikeSelected" />
      ) : (
        <IconSearchPage.LikeUnselected className="IconLikeUnselected" />
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

const NormalSearchMode = ({
  handleGeneralSortButtonClick,
  handlePriceSortButtonClick,
  handleHitButtonClick,
  handleEasySearchButtonClick,
  currentSearchInfo,
  filterButtonState,
}) => {
  const products = currentSearchInfo ? currentSearchInfo.products : null;
  return (
    <StyledNormalSearchMode>
      <FilterBar
        handleGeneralSortButtonClick={handleGeneralSortButtonClick}
        handlePriceSortButtonClick={handlePriceSortButtonClick}
        handleHitButtonClick={handleHitButtonClick}
        handleEasySearchButtonClick={handleEasySearchButtonClick}
        filterButtonState={filterButtonState}
      />
      <FeatureBar />
      <div className="SearchCardContainer">
        {products ? (
          products.map((productInfo) => <SearchCard productInfo={productInfo} />)
        ) : (
          <div />
        )}
      </div>
    </StyledNormalSearchMode>
  );
};

export default NormalSearchMode;
