/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { firestore } from '../utils/firebase/firebase-services';

import HomePageTabBarContainer from '../components/HomePage/HomePageTabBarContainer';
import GeneralTabBar from '../components/app/GeneralTabBar';
import HomePageNavBarContainer from '../components/HomePage/HomePageNavBarContainer';
import HomePageNavBar from '../components/HomePage/HomePageNavBar';
import Welcoming from '../components/HomePage/Welcoming';
import StyledHomePage from '../styles/HomePage/StyledHomePage';
import { styledVariables, removePx } from '../styles/app/cssMaterial';
import SearchCard from '../components/SearchPage/NormalSearchMode/SearchCard';
import ActivityTag from '../components/HomePage/ActivityTag';
import CategoryCard from '../components/HomePage/CategoryCard';
import categoryData from '../components/HomePage/categoryData';

import banner1 from '../styles/HomePage/images/banner-1.jpg';

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

  // (2) 處理資料
  const [activitiesDataInfoObj, setActivitiesDataInfoObj] = useState({});
  const [activitiesData, setActivitiesData] = useState(null);
  const [activitiesProductsData, setActivitiesProductsData] = useState(null);
  const updateActivitiesData = () => {
    return firestore
      .collection('activities')
      .get()
      .then((srcActivitiesData) => {
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
        return newActivitiesRelatedData;
      })
      .then((newActivitiesRelatedData) => {
        const { newActivitiesData, newActivitiesDataInfoObj } = newActivitiesRelatedData;
        setActivitiesData(newActivitiesData);
        setActivitiesDataInfoObj(newActivitiesDataInfoObj);
      });
  };
  const fetchActivitiesProductData = (ActivityId, page) => {};
  const initActivitiesProductsData = () => {};
  useEffect(() => {
    fetchCartedProductAmount();
  }, [isSignIn]);
  useEffect(() => {
    updateActivitiesData();
  }, []);
  useEffect(() => {
    console.log('activitiesData: ', activitiesData);
    console.log('activitiesDataInfoObj: ', activitiesDataInfoObj);
  }, [activitiesData, activitiesDataInfoObj]);

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
          <Welcoming />
          <div className="content">
            <div className="carousel">
              <img alt="" src={banner1} />
            </div>
            <div className="category">
              <div className="CategoryCardsScrollContainer">
                <div className="CategoryCards">
                  {categoryData.map((data) => (
                    <CategoryCard data={data} />
                  ))}
                </div>
              </div>
            </div>
            <div className="activityBlock">
              <div className="activityBar">
                <div className="ActivityTags">
                  {TRIAL_ACTIVITY_ARR.map((content, index) => {
                    if (index === 0) {
                      // eslint-disable-next-line react/jsx-curly-brace-presence
                      return <ActivityTag className="selected" content={content} />;
                    }
                    return <ActivityTag content={content} />;
                  })}
                </div>
              </div>
              <div className="SearchCardContainer">
                {TRIAL_DATA.map((productInfo, index) => {
                  return <SearchCard productInfo={productInfo} />;
                })}
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
    </StyledHomePage>
  );
};

export default HomePage;
