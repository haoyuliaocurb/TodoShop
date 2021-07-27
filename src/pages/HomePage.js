import { React, useState } from 'react';

import TabBar from '../components/app/TabBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import NavBar from '../components/app/NavBar';
import HomePageNavBar from '../components/HomePage/HomePageNavBar';
import StyledHomePage from '../styles/HomePage/StyledHomePage';
import { styledVariables } from '../styles/app/cssMaterial';

import banner1 from '../styles/HomePage/images/banner-1.jpg';

const INIT_BARSTATE = {
  navBar: {
    content: <HomePageNavBar />,
    visibility: 2,
  },
  tabBar: {
    content: (
      <GeneralTabBar
      // handleTabBarSearchTabClick={handleTabBarSearchTabClick}
      // handleTabBarHomeTabClick={handleTabBarHomeTabClick}
      // handleTabBarCartTabClick={handleTabBarCartTabClick}
      // handleTabBarAuthTabClick={handleTabBarAuthTabClick}
      // handleTabBarListTabClick={handleTabBarListTabClick}
      />
    ),
    visibility: 2,
  },
  toolBar: {
    content: null,
    visibility: 2,
  },
};

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [barState, setBarState] = useState(INIT_BARSTATE);

  return (
    <StyledHomePage>
      <NavBar navBarState={barState.navBar} />

      <div className="content">
        <div className="carousel">
          <img alt="" src={banner1} />
        </div>
      </div>
      <TabBar backgroundColor={styledVariables.color.gray100} tabBarState={barState.tabBar} />
    </StyledHomePage>
  );
};

export default HomePage;
