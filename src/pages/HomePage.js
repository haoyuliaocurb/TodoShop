/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../utils/firebase/firebase-services';

import HomePageTabBarContainer from '../components/HomePage/HomePageTabBarContainer';
import GeneralTabBar from '../components/app/GeneralTabBar';
import HomePageNavBarContainer from '../components/HomePage/HomePageNavBarContainer';
import HomePageNavBar from '../components/HomePage/HomePageNavBar';
import Welcoming from '../components/HomePage/Welcoming';
import StyledHomePage from '../styles/HomePage/StyledHomePage';
import { styledVariables, removePx } from '../styles/app/cssMaterial';
import SearchCard from '../components/HomePage/SearchCard';
import ActivityTag from '../components/HomePage/ActivityTag';
import CategoryCard from '../components/HomePage/CategoryCard';
import categoryData from '../components/HomePage/data/categoryData';
import ModalMessage from '../components/app/ModalMessage';
import Carousel from '../components/shared/Carousel';

import bannerImages from '../components/HomePage/data/bannerImages';

const TRIAL_DATA = [
  {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA129D9ECD300B0F2B961DC5F9DCABF42544CBC00.jpeg?alt=media&token=f84481be-e936-4d71-b93a-b57efe8f95d5',
    ],
    name: '花王 KAO 洗髮精兒童專用 (750ml/瓶)',
    price: 109,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    pid: '2mS9J1zTXPXX604zb4ik',
  },
  {
    delivery: [0, 2],
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D84A6FE4D47730FB45B68EDF54888C80C79CF74.jpeg?alt=media&token=ed985593-8fa1-42c6-82be-76bdf1fdda1a',
    ],
    name: '淨世代環保抽取式衛生紙100抽x12包x6串/箱',
    price: 600,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    pid: '7c8f8Ab6OQFVpGaAxzCj',
  },
  {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D1A2174AB-SP-8702915.jpeg?alt=media&token=7f6bfad5-1855-414e-a8a9-9020c2d51f82',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F6625C7B3C1-SP-8702915.jpeg?alt=media&token=4a55e40d-c5fb-4504-ae34-d0d259f9e07e',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F5EBF8FDD39-SP-8702915.jpeg?alt=media&token=87232920-97c4-42b7-8630-146c2853ab60',
    ],
    name: 'BeniBear邦尼熊復古酒紅條紋抽取式衛生紙100抽8包6袋',
    price: 489,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    pid: 'CLuaEILOo0NGuBHpaP6V',
  },
  {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FCB77C7CF92C69BC6743D92D6725317E1BEAEAC82.jpeg?alt=media&token=ba1a7d6a-60de-4107-a462-8d5a91ca2a78',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F141BC2544577C12836173E571A42DC82DA5A793A.jpeg?alt=media&token=34ebbe51-e710-4ebc-b1af-6d0f5e09bf33',
    ],
    name: '我的心機 黑珍珠絲光潤白黑面膜8入',
    price: 299,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    pid: 'ENMagTFwTJgEaqCk4bzj',
  },
  {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FD80BB6A390-SP-7136469.jpeg?alt=media&token=544c4d35-d6b9-47cc-a39f-25205f8b208b',
    ],
    name: 'KOSE高絲 雪肌精化妝水100ml+雪肌精乳液33ml*3',
    price: 425,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    pid: 'FgFiYn1pAYkV2gLxNSJh',
  },
];
const TRIAL_ACTIVITY_ARR = ['每日精選', '夏日強檔', '日用商品推薦', '最強疫援'];
const INIT_SCROLLOFFSET = {
  preScrollOffset: 0,
  pageYOffset: 0,
  isScrollEnd: true,
};

const HomePage = ({ isSignIn }) => {
  // eslint-disable-next-line no-unused-vars
  const currentUid = isSignIn;
  const history = useHistory();
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
  // (1) 處理資料
  const ModolMessagePleaseSignInRef = useRef(null);
  const [activitiesDataInfoObj, setActivitiesDataInfoObj] = useState(null);
  const [activitiesData, setActivitiesData] = useState(null);
  const [currentProductsData, setCurrentProductsData] = useState(null);
  const [currentActivitiesDataIdx, setCurrentActivitiesDataIdx] = useState(0);
  const preCurrentActivitiesDataIdx = useRef(null);
  const preCurrentUid = useRef(null);
  const isCurrentProductsDataAll = useRef(0);
  const nextPage = useRef(0);

  const updateActivitiesData = () => {
    return firestore
      .collection('activities')
      .get()
      .then((srcActivitiesData) => {
        return new Promise((resolve) => {
          const newActivitiesData = [];
          const newActivitiesDataInfoObj = {};
          let counter = 0;
          srcActivitiesData.forEach((srcEachActivitiesData) => {
            const activityId = srcEachActivitiesData.id;
            const decodedEachActivitiesData = srcEachActivitiesData.data();
            const { length } = decodedEachActivitiesData.products;
            const eachActivitiesData = {
              ...decodedEachActivitiesData,
              activityId,
            };
            newActivitiesData.push(eachActivitiesData);
            newActivitiesDataInfoObj[activityId] = {
              idx: counter,
              length,
            };
            counter += 1;
          });
          // console.log('newActivitiesDataInfoObj: ', newActivitiesDataInfoObj);
          const newActivitiesRelatedData = {
            newActivitiesData,
            newActivitiesDataInfoObj,
          };
          resolve(newActivitiesRelatedData);
        });
      })
      .then((newActivitiesRelatedData) => {
        const { newActivitiesData, newActivitiesDataInfoObj } = newActivitiesRelatedData;
        setActivitiesData(newActivitiesData);
        setActivitiesDataInfoObj(newActivitiesDataInfoObj);
      });
  };
  const fetchActivitiesProductsData = (ActivityId, page, currentUidValue = null) => {
    // console.log('page in fetchActivitiesProductsData:', page);
    const hitsPerPage = 8;
    const { idx, length } = activitiesDataInfoObj[ActivityId];
    const startPoint = hitsPerPage * page;
    const nextStartPoint = hitsPerPage * (page + 1);
    if (length <= startPoint) {
      isCurrentProductsDataAll.current = 1;
      return null;
    }
    nextPage.current = page + 1;
    // console.log('nextPage.current: ', nextPage.current);
    const productsIdArr = activitiesData[idx].products;
    const fetchProductData = (pidValue) => {
      return firestore
        .collection('products')
        .doc(pidValue)
        .get()
        .then((srcProductData) => {
          return new Promise((resolve) => {
            const pid = srcProductData.id;
            resolve({
              pid,
              ...srcProductData.data(),
            });
          });
        })
        .then((decodedProductData) => {
          if (!currentUidValue) {
            return {
              ...decodedProductData,
              productAction: {},
            };
          }
          const { pid } = decodedProductData;
          // console.log('pid: ', pid);
          return firestore
            .collection('users')
            .doc(currentUidValue)
            .collection('productAction')
            .doc(pid)
            .get()
            .then((srcProductActionData) => {
              const isSrcProductActionDataExist = srcProductActionData.exists;
              if (!isSrcProductActionDataExist) {
                // console.log(srcProductActionData.data());
                return {
                  ...decodedProductData,
                  productAction: {},
                };
              }
              const productActionData = srcProductActionData.data();
              // console.log(srcProductActionData.data());
              return {
                ...decodedProductData,
                productAction: {
                  like: !productActionData.like ? null : productActionData.like,
                  cart: !productActionData.cart ? null : productActionData.cart,
                },
              };
            });
        });
    };
    if (length <= nextStartPoint) {
      return Promise.all(
        productsIdArr.slice(startPoint).map((productId) => {
          return fetchProductData(productId);
        }),
      );
    }
    return Promise.all(
      productsIdArr.slice(startPoint, nextStartPoint).map((productId) => {
        return fetchProductData(productId);
      }),
    );
  };
  const updateCurrentProductsData = async (currentIdxValue, page, currentUidValue = null) => {
    // console.log('trigger updateCurrentProductsData');
    if (!activitiesData) {
      return;
    }
    const currentActivitiesDataId = activitiesData[currentIdxValue].activityId;
    const newCurrentProductsData = await fetchActivitiesProductsData(
      currentActivitiesDataId,
      page,
      currentUidValue,
    );
    // console.log('newCurrentProductsData: ', newCurrentProductsData);
    setCurrentProductsData((preCurrentProductsData) => {
      if (!newCurrentProductsData) {
        return preCurrentProductsData;
      }
      if (page === 0) {
        return newCurrentProductsData;
      }
      return [...preCurrentProductsData, ...newCurrentProductsData];
    });
  };
  const updateSearchCardProductAction = (pidValue, updatedProductAction) => {
    if (!currentUid) {
      return;
    }
    return firestore
      .collection('users')
      .doc(currentUid)
      .collection('productAction')
      .limit(1)
      .get()
      .then(() => {
        return firestore
          .collection('users')
          .doc(currentUid)
          .collection('productAction')
          .doc(pidValue)
          .update(updatedProductAction);
      })
      .catch((e) => {
        const { message: errorMessage } = e;
        const createProductActionColl = () => {
          return firestore
            .collection('users')
            .doc(currentUid)
            .collection('productAction')
            .doc(pidValue)
            .set({
              uid: currentUid,
            });
        };
        const promiseHandleHasNoCollError = new Promise((resolve) => {
          const handleHasNoCollError = async () => {
            await createProductActionColl();
            await updateSearchCardProductAction(pidValue, updatedProductAction);
            resolve();
          };
          handleHasNoCollError();
        });
        switch (errorMessage) {
          case 'Requested entity was not found.':
            return promiseHandleHasNoCollError;
          default:
        }
      });
  };
  const fetchSearchCardProductAction = (pidValue) => {
    if (!currentUid) {
      return;
    }
    return firestore
      .collection('users')
      .doc(currentUid)
      .collection('productAction')
      .doc(pidValue)
      .get()
      .then((srcSearchCardProductAction) => {
        if (!srcSearchCardProductAction) {
          return null;
        }
        const newSearchCardProductAction = srcSearchCardProductAction.data();
        // console.log('inner newSearchCardProductAction: ', newSearchCardProductAction);
        return newSearchCardProductAction;
      });
  };
  const updateSearchCardInfo = async (
    pidValue,
    updatedProductAction,
    preProductAction,
    cardIdx,
  ) => {
    // console.log('trigger updateSearchCardInfo');
    if (!currentUid) {
      if (!ModolMessagePleaseSignInRef.current) {
        return;
      }
      ModolMessagePleaseSignInRef.current.classList.remove('op-zero');
      ModolMessagePleaseSignInRef.current.addEventListener(
        'transitionend',
        () => {
          ModolMessagePleaseSignInRef.current.classList.add('op-zero');
          ModolMessagePleaseSignInRef.current.addEventListener(
            'transitionend',
            () => {
              window.localStorage.setItem('TodoShopIsAskedForward2SignIn', '1');
              // history.push('/auth/signIn');
            },
            { once: true },
          );
        },
        { once: true },
      );
      return;
    }
    await updateSearchCardProductAction(pidValue, updatedProductAction);
    const newSearchCardProductAction = await fetchSearchCardProductAction(pidValue);
    if ((!preProductAction || preProductAction.cart) && !updatedProductAction.cart) {
      setCartedProductAmount((preCartedProductAmount) => {
        if (preCartedProductAmount < 1) {
          return 0;
        }
        return preCartedProductAmount - 1;
      });
    }
    if ((!preProductAction || !preProductAction.cart) && updatedProductAction.cart) {
      setCartedProductAmount((preCartedProductAmount) => preCartedProductAmount + 1);
    }
    // console.log('newSearchCardProductAction: ', newSearchCardProductAction);
    setCurrentProductsData((preCurrentProductsData) => {
      const newCurrentProductsData = [...preCurrentProductsData];
      newCurrentProductsData[cardIdx].productAction = newSearchCardProductAction;
      return newCurrentProductsData;
    });
  };
  useEffect(() => {
    fetchCartedProductAmount();
    preCurrentUid.current = isSignIn;
  }, [isSignIn]);
  useEffect(() => {
    updateActivitiesData();
  }, []);
  useEffect(() => {
    if (!activitiesData || !activitiesDataInfoObj) {
      return;
    }
    if (currentUid === preCurrentUid.current) {
      if (currentActivitiesDataIdx === preCurrentActivitiesDataIdx.current) {
        return;
      }
    }
    // console.log(
    //   'before preCurrentActivitiesDataIdx.current: ',
    //   preCurrentActivitiesDataIdx.current,
    // );
    preCurrentActivitiesDataIdx.current = currentActivitiesDataIdx;
    // console.log('after preCurrentActivitiesDataIdx.current: ', preCurrentActivitiesDataIdx.current);
    updateCurrentProductsData(currentActivitiesDataIdx, 0, currentUid);
  }, [activitiesData, activitiesDataInfoObj, currentActivitiesDataIdx, currentUid]);
  useEffect(() => {
    // console.log('currentProductsData: ', currentProductsData);
  }, [currentProductsData]);

  // (2) 處理 scroll
  const sideMenuRef = useRef(null);
  const buttonMenuRef = useRef(null);
  const isButtonMenuClicked = useRef(0);
  const handleButtonMenuClick = () => {
    // console.log('isButtonMenuClicked.current: ', isButtonMenuClicked.current);
    if (isButtonMenuClicked.current) {
      buttonMenuRef.current.classList.remove('close');
      sideMenuRef.current.classList.add('close');
      isButtonMenuClicked.current = 0;
      return;
    }
    buttonMenuRef.current.classList.add('close');
    sideMenuRef.current.classList.remove('close');
    isButtonMenuClicked.current = 1;
  };

  const INIT_BARSTATE = {
    navBar: {
      content: <HomePageNavBar cartedProductAmount={cartedProductAmount} />,
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
  // eslint-disable-next-line no-unused-vars
  const [buttonState, setButtonState] = useState(null);
  const [scrollOffsetInfo, setScrollOffsetInfo] = useState(INIT_SCROLLOFFSET);
  const preScrollOffset = useRef(0);
  const isOnScroll = useRef(false);
  const isScrollEnd = useRef(false);
  // const isScrollBackward = useRef(false);
  const scrollTarget = useRef(null);
  const windowOffset = useRef(0);

  const handleScroll = (scrollTargetValue) => {
    if (!scrollTargetValue) {
      return;
    }
    if (isOnScroll.current) {
      return;
    }

    const scrollOffsetValue = scrollTargetValue.scrollTop;
    // console.log('scrollOffsetValue: ', scrollOffsetValue);
    const preScrollOffsetValue = preScrollOffset.current;
    windowOffset.current = scrollOffsetValue - preScrollOffsetValue;
    preScrollOffset.current = scrollOffsetValue;
    // console.log(scrollOffsetValue > 260 || isScrollBackward.current);

    if (windowOffset.current < 0) {
      // if (isScrollBackward.current) {
      //   return;
      // }

      isOnScroll.current = true;
      // isScrollBackward.current = true;
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
    // isScrollBackward.current = false;
    buttonMenuRef.current.classList.remove('close');
    sideMenuRef.current.classList.add('close');
    isButtonMenuClicked.current = 0;

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
    // console.log('isCurrentProductsDataAll.current: ', isCurrentProductsDataAll.current);
    if (isCurrentProductsDataAll.current) {
      return;
    }
    updateCurrentProductsData(currentActivitiesDataIdx, nextPage.current, currentUid);
  };

  useEffect(() => {
    isOnScroll.current = false;
  }, [scrollOffsetInfo]);
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
  }, [buttonState]);
  useEffect(() => {
    // console.log('cartedProductAmount: ', cartedProductAmount);
    setBarState({
      navBar: { ...INIT_BARSTATE.navBar },
      tabBar: { ...INIT_BARSTATE.tabBar },
    });
  }, [cartedProductAmount]);

  // (3) event 動態
  const handleActivityTagClick = (indexValue) => {
    // console.log('indexValue: ', indexValue);
    setCurrentActivitiesDataIdx(indexValue);
    isCurrentProductsDataAll.current = 0;
    nextPage.current = 0;
  };

  return (
    <StyledHomePage>
      <HomePageNavBarContainer scrollOffsetInfo={scrollOffsetInfo} navBarState={barState.navBar} />
      <div
        className="container"
        ref={scrollTarget}
        onScroll={() => {
          handleScroll(scrollTarget.current);
        }}
      >
        <div className="scroll">
          <Welcoming
            sideMenuRef={sideMenuRef}
            buttonMenuRef={buttonMenuRef}
            handleButtonMenuClick={handleButtonMenuClick}
          />
          <div className="content">
            <div className="carouselBlock">
              <div className="carouselTitle">
                <h2 className="divider">ACTIVITIES 活動</h2>
              </div>
              <Carousel imagesData={bannerImages} />
            </div>
            <div className="category">
              <div className="categoryTitle">
                <h2 className="divider">CATEGORIES 商品類別</h2>
              </div>
              <div className="CategoryCardsScrollContainer">
                <div className="CategoryCards">
                  {categoryData.map((data) => (
                    <CategoryCard data={data} />
                  ))}
                </div>
              </div>
            </div>
            <div className="activityBlock">
              <div className="activityTitle">
                <h2 className="divider">SALES 強檔商品</h2>
              </div>
              <div className="activityBar">
                <div className="ActivityTags">
                  {!activitiesData ? (
                    <div />
                  ) : (
                    activitiesData.map((eachActivitiesData, index) => {
                      const { name } = eachActivitiesData;
                      if (index === currentActivitiesDataIdx) {
                        // eslint-disable-next-line react/jsx-curly-brace-presence
                        return (
                          <ActivityTag
                            key={index}
                            index={index}
                            className="selected"
                            content={name}
                            handleActivityTagClick={handleActivityTagClick}
                          />
                        );
                      }
                      return (
                        <ActivityTag
                          key={index}
                          index={index}
                          content={name}
                          handleActivityTagClick={handleActivityTagClick}
                        />
                      );
                    })
                  )}
                </div>
              </div>
              <div className="SearchCardContainer">
                {!currentProductsData ? (
                  <div />
                ) : (
                  currentProductsData.map((eachProductData, index) => {
                    const { pid } = eachProductData;
                    return (
                      <SearchCard
                        key={pid}
                        currentUid={currentUid}
                        eachProductData={eachProductData}
                        // eslint-disable-next-line no-undef
                        updateSearchCardInfo={updateSearchCardInfo}
                        cardIdx={index}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomePageTabBarContainer
        scrollOffsetInfo={scrollOffsetInfo}
        backgroundColor={styledVariables.color.gray100}
        tabBarState={barState.tabBar}
      />
      <ModalMessage
        message={
          <span>
            請登入帳戶
            <br />
            以進一步動作
          </span>
        }
        ModolMessageRef={ModolMessagePleaseSignInRef}
      />
    </StyledHomePage>
  );
};

export default HomePage;
