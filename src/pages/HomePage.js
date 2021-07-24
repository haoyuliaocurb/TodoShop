import { React, useState } from 'react';

import TabBar from '../components/app/TabBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import StyledHomePage from '../styles/HomePage/StyledHomePage';
import { styledVariables } from '../styles/app/cssMaterial';

const INIT_BARSTATE = {
  navBar: {
    content: null,
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
      <div className="content">
        <p>This is Home.</p>
      </div>
      <TabBar backgroundColor={styledVariables.color.gray100} tabBarState={barState.tabBar} />
    </StyledHomePage>
  );
};

export default HomePage;
