import { React, useState, useEffect } from 'react';
import { firestore } from '../utils/firebase/firebase-services';

import TabBar from '../components/app/TabBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import NavBar from '../components/app/NavBar';
import HomePageNavBar from '../components/HomePage/HomePageNavBar';
import StyledHomePage from '../styles/HomePage/StyledHomePage';
import { styledVariables } from '../styles/app/cssMaterial';

import banner1 from '../styles/HomePage/images/banner-1.jpg';

const HomePage = ({ isSignIn }) => {
  // eslint-disable-next-line no-unused-vars
  const currentUid = isSignIn;
  const [cartedProductAmount, setCartedProductAmount] = useState(0);
  const fetchCartedProductAmount = async () => {
    if (!currentUid) {
      return;
    }
    const srcCartedProductAmountData = await firestore
      .collectionGroup('productAction')
      .where('uid', '==', currentUid)
      .where('cart', '!=', false)
      .get();
    const newCartedProductAmount = srcCartedProductAmountData.size;
    setCartedProductAmount(newCartedProductAmount);
  };
  const INIT_BARSTATE = {
    navBar: {
      content: <HomePageNavBar cartedProductAmount={cartedProductAmount} />,
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
  const [barState, setBarState] = useState(INIT_BARSTATE);

  useEffect(() => {
    fetchCartedProductAmount();
  }, [isSignIn]);

  useEffect(() => {
    // console.log('cartedProductAmount: ', cartedProductAmount);
    setBarState({
      navBar: INIT_BARSTATE.navBar,
      toolBar: INIT_BARSTATE.toolBar,
      tabBar: INIT_BARSTATE.tabBar,
    });
  }, [cartedProductAmount]);

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
