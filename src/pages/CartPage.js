/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { firestore } from '../utils/firebase/firebase-services';
import StyledCartPage from '../styles/CartPage/StyledCartPage';
import TabBar from '../components/app/TabBar';
import ToolBar from '../components/app/ToolBar';
import NavBar from '../components/app/NavBar';
import CartPageNavBar from '../components/CartPage/CartPageNavBar';
import CartPageToolBar from '../components/CartPage/CartPageToolBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import CartedProductGroupByStore from '../components/CartPage/CartedProductGroupByStore';

import { styledVariables, removePx } from '../styles/app/cssMaterial';

const INIT_SCROLLOFFSET = {
  preScrollOffset: 0,
  pageYOffset: 0,
  isScrollEnd: true,
};

const CartPage = ({ isSignIn }) => {
  // (1) 處理 scroll bar
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
  // eslint-disable-next-line no-unused-vars
  const [barState, setBarState] = useState(INIT_BARSTATE);
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
      setTimeout(() => {
        scrollTarget.current.scrollTop -= removePx(styledVariables.shared.barHeight);
      }, 300);
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
    isOnScroll.current = false;
  }, [scrollOffsetInfo]);

  // (2) 處理 data
  const currentUid = isSignIn;
  const [cartData, setCartData] = useState(null);

  // eslint-disable-next-line consistent-return
  const fetchCartData = (uidValue) => {
    if (!uidValue) {
      return;
    }
    const promiseCartData = new Promise((resolve) => {
      // eslint-disable-next-line consistent-return
      const innerFetchCartData = async (innerUidValue) => {
        const cartDataResolved = [];
        firestore
          .collectionGroup('productAction')
          .where('uid', '==', innerUidValue)
          .where('cart', '!=', false)
          .get()
          .then((srcCartedProductActionDataArray) => {
            // console.log('srcCartedProductActionDataArray: ', srcCartedProductActionDataArray);
            if (!srcCartedProductActionDataArray) {
              resolve(null);
            }
            const cartedProductActionDataArray = [];
            srcCartedProductActionDataArray.forEach((cartedProductActionData) => {
              const dataPushed = {
                pid: cartedProductActionData.id,
                decodedProductActionData: cartedProductActionData.data(),
              };
              // console.log('dataPushed: ', dataPushed);
              cartedProductActionDataArray.push(dataPushed);
            });
            // console.log('cartedProductActionDataArray: ', cartedProductActionDataArray);

            const sidIdxObj = {};
            let sidIdxCounter = 0;
            return Promise.all(
              cartedProductActionDataArray.map((cartedProductActionData) => {
                const { pid, decodedProductActionData } = cartedProductActionData;
                const promiseProductData = new Promise((innerResolve) => {
                  const fetchProductData = async (pidValue) => {
                    const productData = await firestore.collection('products').doc(pidValue).get();
                    if (!productData) {
                      console.log(false);
                      innerResolve(null);
                    }
                    const decodedProductData = productData.data();
                    // console.log('decodedProductData: ', decodedProductData);
                    const { sid } = decodedProductData;
                    const dataResolved = {
                      pid,
                      sid,
                      cartAmount: decodedProductActionData.cart.amount,
                      cartType: !decodedProductActionData.cart.type
                        ? 0
                        : decodedProductActionData.cart.type,
                    };
                    // console.log('dataPushed: ', dataPushed);

                    const sidIdx = sidIdxObj[sid];
                    if (sidIdx === undefined) {
                      sidIdxObj[sid] = sidIdxCounter;
                      sidIdxCounter += 1;
                      // console.log('sidIdxObj: ', sidIdxObj);
                      const newSidIdx = sidIdxObj[sid];
                      cartDataResolved[newSidIdx] = {};
                      cartDataResolved[newSidIdx].sid = sid;
                      cartDataResolved[newSidIdx].products = [];
                      cartDataResolved[newSidIdx].products.push(dataResolved);
                      innerResolve(0);
                      return;
                    }
                    cartDataResolved[sidIdx].products.push(dataResolved);
                    innerResolve(1);
                  };
                  fetchProductData(pid);
                });
                return promiseProductData;
              }),
            );
          })
          .then(() => {
            setCartData(cartDataResolved);
            resolve(cartDataResolved);
          });
      };
      innerFetchCartData(uidValue);
    });
    // eslint-disable-next-line consistent-return
    return promiseCartData;
  };
  useEffect(() => {
    fetchCartData(currentUid);
  }, [currentUid]);
  useEffect(() => {
    console.log('cartData: ', cartData);
  }, [cartData]);

  return (
    <StyledCartPage>
      <NavBar scrollOffsetInfo={scrollOffsetInfo} navBarState={barState.navBar} />
      <div
        className="container"
        onScroll={() => {
          handleScroll(scrollTarget.current);
        }}
        ref={scrollTarget}
      >
        <div className="scroll">
          {Array.from({ length: 10 }).map(() => (
            <CartedProductGroupByStore />
          ))}
        </div>
      </div>
      <ToolBar scrollOffsetInfo={scrollOffsetInfo} toolBarState={barState.toolBar} />
      <TabBar scrollOffsetInfo={scrollOffsetInfo} tabBarState={barState.tabBar} />
    </StyledCartPage>
  );
};

export default CartPage;
