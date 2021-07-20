// script
import { React, useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import NavBar from '../../app/NavBar';
import TabBar from '../../app/TabBar';
import SearchNavBar from '../SearchNavBar';
import GeneralTabBar from '../../app/GeneralTabBar';
import usePageYOffsetInfo from '../../app/usePageYOffsetInfo';

import SearchItems from './SearchItems';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';
import StyledEasySearchMode from '../../../styles/SearchPage/EasySearchMode/StyledEasySearchMode';

const EasySearchPage = ({
  currentSearchKeywordsIdx,
  handleNavBarItemClick,
  handleEasySearchButtonClick,
  searchInfo,
}) => {
  const scrollTargetValue = useRef(null);
  const [scrollTarget, setScrollTarget] = useState(null);
  const pageYOffsetInfo = usePageYOffsetInfo(scrollTarget);

  useEffect(() => {
    setScrollTarget(scrollTargetValue.current);
  }, [scrollTargetValue.current]);

  // useEffect(() => {
  //   if (!scrollTarget) {
  //     return;
  //   }
  //   console.log('scrollTarget.classList: ', scrollTarget.classList);
  // }, [scrollTarget]);

  return (
    <StyledEasySearchMode>
      <NavBar
        pageYOffsetInfo={pageYOffsetInfo}
        tabBarState={{
          content: (
            <SearchNavBar
              currentSearchKeywordsIdx={currentSearchKeywordsIdx}
              handleNavBarItemClick={handleNavBarItemClick}
              searchInfo={searchInfo}
            />
          ),
          visibility: 1,
        }}
      />
      <div className="container" ref={scrollTargetValue}>
        <button onClick={handleEasySearchButtonClick} type="button">
          <IconSearchPage.NormalSearch />
        </button>
        <SearchItems searchInfo={searchInfo} />
      </div>
      <TabBar
        pageYOffsetInfo={pageYOffsetInfo}
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
