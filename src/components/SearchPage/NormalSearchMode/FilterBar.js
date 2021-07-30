import { React } from 'react';
import StyledFilterBar from '../../../styles/SearchPage/NormalSearchMode/StyledFilterBar';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';

const FilterBar = ({
  handleGeneralSortButtonClick,
  handlePriceSortButtonClick,
  handleHitButtonClick,
  handleEasySearchButtonClick,
  filterButtonState,
  scrollOffsetInfo,
  updateSearchItemInfo,
  currentSearchKeywordsIdx,
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
  const handlePriceSortBtnClick2UpdateItemInfo = (priceSortValue) => {
    const searchOption = {};
    switch (priceSortValue) {
      case 0:
        searchOption.sort = { price: 0 };
        break;
      case 1:
        searchOption.sort = { price: 1 };
        break;
      case 2:
        break;
      default:
        break;
    }
    updateSearchItemInfo(currentSearchKeywordsIdx, searchOption);
  };

  // (2) scrollable
  const visibility = 1;
  // const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  const preScrollOffset = visibility !== 1 ? null : scrollOffsetInfo.preScrollOffset;
  const scrollOffset = visibility !== 1 ? null : scrollOffsetInfo.scrollOffset;
  const isScrollEnd = visibility !== 1 ? null : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = visibility !== 1 ? null : scrollOffset - preScrollOffset;
  return (
    <StyledFilterBar
      visibility={visibility}
      windowOffset={windowOffset}
      scrollOffset={scrollOffset}
      isScrollEnd={isScrollEnd}
      // className={`${visibility ? '' : 'vb-hidden'} ${
      //   windowOffset < 0 || isScrollEnd ? 'transition' : ''
      // }`}
      className="transition"
    >
      <button
        onClick={handleGeneralSortButtonClick}
        className={`generalSort ${generalSort ? 'notNoSort dp-none' : 'noSort dp-none'}`}
        type="button"
      >
        <p>綜合排序</p>
        <span>{getGeneralSortIcon(generalSort)}</span>
      </button>
      <button
        onClick={() => {
          handlePriceSortButtonClick();
          handlePriceSortBtnClick2UpdateItemInfo(priceSort);
        }}
        className={`priceSort ${priceSort ? 'notNoSort' : 'noSort'}`}
        type="button"
      >
        <p>價格</p>
        <span>{getPriceSortIcon(priceSort)}</span>
      </button>
      <button
        onClick={handleHitButtonClick}
        className={`hit ${hit ? 'selected dp-none' : 'unselected dp-none'}`}
        type="button"
      >
        <p>最高人氣</p>
      </button>
      <span>
        <button onClick={handleEasySearchButtonClick} className="easySearch" type="button">
          <IconSearchPage.EasySearch />
        </button>
        <button className="filter dp-none" type="button">
          <IconSearchPage.Filter />
          <p>篩選</p>
        </button>
      </span>
    </StyledFilterBar>
  );
};

export default FilterBar;
