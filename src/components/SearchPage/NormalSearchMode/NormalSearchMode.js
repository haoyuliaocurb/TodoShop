import { React, useState, useEffect, useRef } from 'react';

import FilterBar from './FilterBar';
import FeatureBar from './FeatureBar';
import SearchCard from './SearchCard';
import NavBar from '../../app/NavBar';
import TabBar from '../../app/TabBar';
import SearchNavBar from '../SearchNavBar';
import GeneralTabBar from '../../app/GeneralTabBar';

import StyledNormalSearchMode from '../../../styles/SearchPage/NormalSearchMode/StyledNormalSearchMode';
import { styledVariables, removePx } from '../../../styles/app/cssMaterial';

const INIT_SCROLLOFFSET = {
  preScrollOffset: 0,
  pageYOffset: 0,
  isScrollEnd: true,
};

const NormalSearchMode = ({
  handleGeneralSortButtonClick,
  handlePriceSortButtonClick,
  handleHitButtonClick,
  handleEasySearchButtonClick,
  currentSearchInfo,
  filterButtonState,
  currentSearchKeywordsIdx,
  handleNavBarItemClick,
  searchInfo,
  updateSearchCardInfo,
  cartedProductAmount,
}) => {
  const products = currentSearchInfo ? currentSearchInfo.products : null;
  const [scrollOffsetInfo, setScrollOffsetInfo] = useState(INIT_SCROLLOFFSET);
  const preScrollOffset = useRef(0);
  const isOnScroll = useRef(false);
  const isScrollEnd = useRef(false);
  const isScrollBackward = useRef(false);
  const scrollTarget = useRef(null);
  const windowOffset = useRef(0);

  const handleScroll = (scrollTargetValue) => {
    // console.log('trigger onScroll');
    if (!scrollTargetValue) {
      return;
    }
    if (isOnScroll.current) {
      return;
    }

    // console.log('trigger addEventListener');
    // console.log('windowOffset.current: ', windowOffset.current);
    // console.log('isScrollBackward.current: ', isScrollBackward.current);
    // console.log('scrollOffsetInfo.isScrollEnd: ', scrollOffsetInfo.isScrollEnd);
    // console.log('scrollTarget.current.offsetHeight: ', scrollTarget.current.offsetHeight);
    // console.log('scrollTarget.current.scrollTop: ', scrollTarget.current.scrollTop);
    // console.log('scrollTarget.current.scrollHeight: ', scrollTarget.current.scrollHeight);
    // console.log('window.innerHeight: ', window.innerHeight);

    const scrollOffsetValue = scrollTargetValue.scrollTop;
    const preScrollOffsetValue = preScrollOffset.current;
    windowOffset.current = scrollOffsetValue - preScrollOffsetValue;
    preScrollOffset.current = scrollOffsetValue;

    if (windowOffset.current < 0) {
      if (isScrollBackward.current) {
        return;
      }

      isOnScroll.current = true;
      isScrollBackward.current = true;
      // console.log('trigger backward scrollTarget');
      // console.log('before: scrollTarget.current.scrollTop: ', scrollTarget.current.scrollTop);
      // setTimeout(() => {
      //   scrollTarget.current.scrollTop -= removePx(styledVariables.shared.barHeight);
      // }, 200);
      setTimeout(() => {
        scrollTarget.current.scrollTop -= removePx(styledVariables.shared.barHeight * 1.5);
      }, 350);
      setTimeout(() => {
        scrollTarget.current.scrollTop -= removePx(styledVariables.shared.barHeight * 1.5);
      }, 450);
      // scrollTarget.scrollTo(0, scrollTarget.scrollTop - styledVariables.shared.barHeight);
      // console.log('after: scrollTarget.current.scrollTop: ', scrollTarget.current.scrollTop);

      setScrollOffsetInfo({
        preScrollOffset: preScrollOffsetValue,
        scrollOffset: scrollOffsetValue,
        isScrollEnd: isScrollEnd.current,
      });
      return;
    }
    // windowOffset.current >= 0

    isOnScroll.current = true;
    isScrollBackward.current = false;

    // 若滑到底
    if (
      scrollTargetValue.offsetHeight + scrollTargetValue.scrollTop >=
      scrollTargetValue.scrollHeight - removePx(styledVariables.shared.barHeight) / 2
    ) {
      isScrollEnd.current = true;
    } else {
      isScrollEnd.current = false;
    }

    setScrollOffsetInfo({
      preScrollOffset: preScrollOffsetValue,
      scrollOffset: scrollOffsetValue,
      isScrollEnd: isScrollEnd.current,
    });
  };

  useEffect(() => {
    // console.log('scrollTarget.current: ', scrollTarget.current);
    // console.log('windowOffset.current: ', windowOffset.current);
    // console.log('scrollTarget.current.clientHeight: ', scrollTarget.current.clientHeight);
    // console.log('scrollOffsetInfo: ', scrollOffsetInfo);
  });

  useEffect(() => {
    isOnScroll.current = false;
  }, [scrollOffsetInfo]);

  return (
    <StyledNormalSearchMode>
      <NavBar
        scrollOffsetInfo={scrollOffsetInfo}
        navBarState={{
          content: (
            <SearchNavBar
              currentSearchKeywordsIdx={currentSearchKeywordsIdx}
              handleNavBarItemClick={handleNavBarItemClick}
              searchInfo={searchInfo}
              cartedProductAmount={cartedProductAmount}
            />
          ),
          visibility: 1,
        }}
      />
      <FilterBar
        handleGeneralSortButtonClick={handleGeneralSortButtonClick}
        handlePriceSortButtonClick={handlePriceSortButtonClick}
        handleHitButtonClick={handleHitButtonClick}
        handleEasySearchButtonClick={handleEasySearchButtonClick}
        filterButtonState={filterButtonState}
        scrollOffsetInfo={scrollOffsetInfo}
      />
      <FeatureBar scrollOffsetInfo={scrollOffsetInfo} />
      <div
        className="SearchCardContainer"
        ref={scrollTarget}
        onScroll={() => {
          handleScroll(scrollTarget.current);
        }}
      >
        {products ? (
          products.map((productInfo, index) => {
            const { pid } = productInfo;
            const cardIdx = index;
            console.log('productInfo: ', productInfo);
            return (
              <SearchCard
                key={pid}
                productInfo={productInfo}
                updateSearchCardInfo={updateSearchCardInfo}
                cardIdx={cardIdx}
                currentSearchKeywordsIdx={currentSearchKeywordsIdx}
              />
            );
          })
        ) : (
          <div />
        )}
      </div>
      <TabBar
        scrollOffsetInfo={scrollOffsetInfo}
        tabBarState={{
          content: (
            <GeneralTabBar
            // handleTabBarSearchTabClick={handleTabBarSearchTabClick}
            // handleTabBarHomeTabClick={handleTabBarHomeTabClick}
            // handleTabBarCartTabClick={handleTabBarCartTabClick}
            // handleTabBarAuthTabClick={handleTabBarAuthTabClick}
            // handleTabBarListTabClick={handleTabBarListTabClick}
            />
          ),
          visibility: 1,
        }}
      />
    </StyledNormalSearchMode>
  );
};

export default NormalSearchMode;
