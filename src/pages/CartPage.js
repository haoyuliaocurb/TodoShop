import { React, useState } from 'react';
import StyledCartPage from '../styles/CartPage/StyledCartPage';
import TabBar from '../components/app/TabBar';
import ToolBar from '../components/app/ToolBar';
import NavBar from '../components/app/NavBar';
import CartPageNavBar from '../components/CartPage/CartPageNavBar';
import CartPageToolBar from '../components/CartPage/CartPageToolBar';
import GeneralTabBar from '../components/app/GeneralTabBar';

const CartPage = () => {
  const INIT_BARSTATE = {
    navBar: {
      content: <CartPageNavBar />,
      visibility: 1,
    },
    toolBar: {
      content: <CartPageToolBar />,
      visibility: 1,
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
      visibility: 1,
    },
  };
  const [barState, setBarState] = useState(INIT_BARSTATE);

  return (
    <StyledCartPage>
      <NavBar scrollOffsetInfo={scrollOffsetInfo} navBarState={barState.navBar} />
      <p>CartPage</p>
      <ToolBar scrollOffsetInfo={scrollOffsetInfo} toolBarState={barState.toolBar} />
      <TabBar scrollOffsetInfo={scrollOffsetInfo} tabBarState={barState.tabBar} />
    </StyledCartPage>
  );
};

export default CartPage;
