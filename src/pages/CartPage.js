/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { firestore, firebase } from '../utils/firebase/firebase-services';
import StyledCartPage from '../styles/CartPage/StyledCartPage';
import TabBar from '../components/app/TabBar';
import ToolBar from '../components/app/ToolBar';
import NavBar from '../components/app/NavBar';
import CartPageNavBar from '../components/CartPage/CartPageNavBar';
import CartPageToolBar from '../components/CartPage/CartPageToolBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import CartedProductGroupByStore from '../components/CartPage/CartedProductGroupByStore';
import BlockMessage from '../components/shared/BlockMessage';
import IconShared from '../styles/shared/IconShared';

import { styledVariables, removePx } from '../styles/app/cssMaterial';

const INIT_SCROLLOFFSET = {
  preScrollOffset: 0,
  pageYOffset: 0,
  isScrollEnd: true,
};

const INIT_BUTTONSTATE = {
  management: 0,
};

const CartPage = ({ isSignIn }) => {
  const currentUid = isSignIn;
  const [cartData, setCartData] = useState(null);
  const [cartedProductPriceSum, setCartedProductPriceSum] = useState(0);
  const [buttonState, setButtonState] = useState(INIT_BUTTONSTATE);

  // (2) 處理 data
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
                    const { sid, name, price, images } = decodedProductData;
                    const dataResolved = {
                      pid,
                      sid,
                      name,
                      price,
                      images,
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
            return Promise.all(
              // eslint-disable-next-line array-callback-return
              cartDataResolved.map((eachCartData) => {
                const { sid } = eachCartData;
                // console.log('sid: ', sid);
                return firestore.collection('stores').doc(sid).get();
              }),
            );
          })
          .then((srcStoreDate) => {
            let counter = 0;
            srcStoreDate.forEach((srcEachStoreData) => {
              const eachStoreData = srcEachStoreData.data();
              if (!eachStoreData) {
                return;
              }
              // console.log('eachStoreData: ', eachStoreData);
              const { name: storeName } = eachStoreData;
              cartDataResolved[counter].storeName = storeName;
              counter += 1;
            });
            setCartData(cartDataResolved);
            resolve(cartDataResolved);
          });
      };
      innerFetchCartData(uidValue);
    });
    // eslint-disable-next-line consistent-return
    return promiseCartData;
  };
  const updateProductActionCart = async (newProductActionCart, targetSid, targetPid) => {
    await firestore
      .collection('users')
      .doc(currentUid)
      .collection('productAction')
      .doc(targetPid)
      .update(newProductActionCart);
    const srcFetchedProductActionData = await firestore
      .collection('users')
      .doc(currentUid)
      .collection('productAction')
      .doc(targetPid)
      .get();
    const fetchedProductActionData = srcFetchedProductActionData.data();
    const cart = !fetchedProductActionData ? null : fetchedProductActionData.cart;
    if (!cart) {
      setCartData((preCartData) => {
        const newCartData = preCartData.map((eachPreCartData) => {
          const { sid } = eachPreCartData;
          if (sid !== targetSid) {
            return eachPreCartData;
          }
          let targetPidIdx = null;
          const newEachCartData = {
            ...eachPreCartData,
          };
          const { products: productsData } = eachPreCartData;
          const newProductData = productsData.map((eachProductData, index) => {
            const { pid } = eachProductData;
            if (pid !== targetPid) {
              return eachProductData;
            }
            targetPidIdx = index;
            return null;
          });
          newProductData.splice(targetPidIdx, 1);
          // console.log('newProductData: ', newProductData);
          newEachCartData.products = newProductData;
          return newEachCartData;
        });
        return newCartData;
      });
      return;
    }
    const cartAmount = cart.amount;
    const cartType = !cart.type ? 0 : cart.type;
    setCartData((preCartData) => {
      const newCartData = preCartData.map((eachPreCartData) => {
        const { sid } = eachPreCartData;
        if (sid !== targetSid) {
          return eachPreCartData;
        }
        const newEachCartData = {
          ...eachPreCartData,
        };
        const { products: productsData } = eachPreCartData;
        const newProductData = productsData.map((eachProductData) => {
          const { pid } = eachProductData;
          if (pid !== targetPid) {
            return eachProductData;
          }
          const newEachProductData = {
            ...eachProductData,
            cartAmount,
            cartType,
          };
          return newEachProductData;
        });
        newEachCartData.products = newProductData;
        return newEachCartData;
      });
      return newCartData;
    });
  };
  const updateButtonState = (newButtonStateValue, updateBehavior = 0, sid) => {
    // console.log('newButtonStateValue: ', newButtonStateValue);
    switch (updateBehavior) {
      case 0:
        setButtonState((preButtonState) => {
          const newButtonState = {
            ...preButtonState,
            ...newButtonStateValue,
          };
          return newButtonState;
        });
        break;
      case 1:
        if (newButtonStateValue === null) {
          setButtonState((preButtonState) => {
            const newButtonState = {
              ...preButtonState,
            };
            delete newButtonState[sid];
            return newButtonState;
          });
          return;
        }
        setButtonState((preButtonState) => {
          const newSidButtonState = {
            ...preButtonState[sid],
            ...newButtonStateValue,
          };
          const newButtonState = {
            ...preButtonState,
          };
          newButtonState[sid] = newSidButtonState;
          return newButtonState;
        });
        break;
      case 2:
        setButtonState((preButtonState) => {
          const newButtonState = {
            ...preButtonState,
            buttonSelectAll: 0,
          };
          return newButtonState;
        });
        break;
      case 3:
        // management
        setButtonState((preButtonState) => {
          const newButtonState = {
            ...newButtonStateValue,
          };
          return newButtonState;
        });
        break;
      default:
    }
  };
  const deleteProductActionCart = async (pid2DeleteValue) => {
    const getPidArray2Delete = () => {
      if (typeof pid2Delete === 'string') {
        return [pid2DeleteValue];
      }
      return pid2DeleteValue;
    };
    const pidArray2Delete = getPidArray2Delete();
    const pid2DeleteObj = {};
    await Promise.all(
      pidArray2Delete.map((pid) => {
        pid2DeleteObj[pid] = 1;
        return firestore
          .collection('users')
          .doc(currentUid)
          .collection('productAction')
          .doc(pid)
          .update({ cart: firebase.firestore.FieldValue.delete() });
      }),
    );
    fetchCartData(currentUid).then(() => {
      updateButtonState({ management: 0 }, 3);
    });
  };
  // (1) 處理 scroll bar
  const INIT_BARSTATE = {
    navBar: {
      content: <CartPageNavBar buttonState={buttonState} updateButtonState={updateButtonState} />,
      visibility: 1,
    },
    toolBar: {
      content: (
        <CartPageToolBar
          cartedProductPriceSum={cartedProductPriceSum}
          buttonState={buttonState}
          updateButtonState={updateButtonState}
          cartData={cartData}
          deleteProductActionCart={deleteProductActionCart}
          currentUid={currentUid}
        />
      ),
      visibility: 1,
      topShadow: 1,
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
  useEffect(() => {
    fetchCartData(currentUid);
  }, [currentUid]);
  useEffect(() => {
    // console.log('cartData: ', cartData);
  }, [cartData]);
  useEffect(() => {
    // console.log('buttonState: ', buttonState);
    setBarState(() => {
      const newBarState = {
        navBar: { ...INIT_BARSTATE.navBar },
        toolBar: { ...INIT_BARSTATE.toolBar },
        tabBar: { ...INIT_BARSTATE.tabBar },
      };
      return newBarState;
    });
  }, [buttonState, cartData, cartedProductPriceSum]);
  useEffect(() => {
    let newCartedProductPriceSum = 0;
    if (cartData) {
      cartData.forEach((eachCartData) => {
        const { sid, products } = eachCartData;
        const sidButtonState = buttonState[sid];
        if (!sidButtonState) {
          return;
        }
        products.forEach((productData) => {
          const { pid, price, cartAmount } = productData;
          if (!sidButtonState[pid]) {
            return;
          }
          newCartedProductPriceSum += price * cartAmount;
        });
      });
    }
    // console.log('newCartedProductPriceSum: ', newCartedProductPriceSum);
    setCartedProductPriceSum(newCartedProductPriceSum);
  }, [buttonState]);

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
          <div className="cartedBlock">
            {!cartData ? (
              <BlockMessage
                img={<IconShared.Info />}
                text={
                  <span>
                    請登入帳號
                    <br />
                    以瀏覽購物車
                  </span>
                }
              />
            ) : (
              cartData.length < 1 ? (
                <BlockMessage
                  img={<IconShared.Info />}
                  text={<span>目前購物車內無商品</span>}
                />
              ) : (
                cartData.map((eachCartData) => {
                  return (
                    <CartedProductGroupByStore
                      eachCartData={eachCartData}
                      buttonState={buttonState}
                      updateButtonState={updateButtonState}
                      updateProductActionCart={updateProductActionCart}
                    />
                  );
                })
              )
            )}
          </div>
        </div>
      </div>
      <ToolBar scrollOffsetInfo={scrollOffsetInfo} toolBarState={barState.toolBar} />
      <TabBar scrollOffsetInfo={scrollOffsetInfo} tabBarState={barState.tabBar} />
    </StyledCartPage>
  );
};

export default CartPage;
