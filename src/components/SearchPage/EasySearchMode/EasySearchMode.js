// script
import { React, useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import NavBar from '../../app/NavBar';
import TabBar from '../../app/TabBar';
import SearchNavBar from '../SearchNavBar';
import GeneralTabBar from '../../app/GeneralTabBar';

import SearchItems from './SearchItems';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';
import StyledEasySearchMode from '../../../styles/SearchPage/EasySearchMode/StyledEasySearchMode';

import { styledVariables, removePx } from '../../../styles/app/cssMaterial';

const INIT_SCROLLOFFSET = {
  preScrollOffset: 0,
  pageYOffset: 0,
  isScrollEnd: true,
};

const EasySearchPage = ({
  currentSearchKeywordsIdx,
  handleNavBarItemClick,
  handleEasySearchButtonClick,
  searchInfo,
  updateSearchCardInfo,
  cartedProductAmount,
  showModolMessagePleaseSignIn,
  currentUid,
}) => {
  const [scrollOffsetInfo, setScrollOffsetInfo] = useState(INIT_SCROLLOFFSET);
  const preScrollOffset = useRef(0);
  const isOnScroll = useRef(false);
  const isScrollEnd = useRef(false);
  const isScrollBackward = useRef(false);
  const scrollTarget = useRef(null);
  const windowOffset = useRef(0);

  const handleScroll = (scrollTargetValue) => {
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
      // }, 300);
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
    // console.log('cartedProductAmount change');
  }, [cartedProductAmount]);

  useEffect(() => {
    isOnScroll.current = false;
  }, [scrollOffsetInfo]);

  return (
    <StyledEasySearchMode>
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
      <div
        className="container"
        onScroll={() => {
          handleScroll(scrollTarget.current);
        }}
        ref={scrollTarget}
      >
        <button onClick={handleEasySearchButtonClick} type="button">
          <IconSearchPage.NormalSearch />
        </button>
        {!searchInfo ? (
          <div />
        ) : (
          <SearchItems
            searchInfo={searchInfo}
            updateSearchCardInfo={updateSearchCardInfo}
            showModolMessagePleaseSignIn={showModolMessagePleaseSignIn}
            currentUid={currentUid}
          />
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
    </StyledEasySearchMode>
  );
};

export default EasySearchPage;
