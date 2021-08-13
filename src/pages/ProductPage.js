/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { firestore, firebase } from '../utils/firebase/firebase-services';
import BottomToolBar from '../components/app/TabBar';
import NavBar from '../components/app/NavBar';
import ProductPageNavBar from '../components/ProductPage/ProductPageNavBar';
import ProductPageToolBar from '../components/ProductPage/ProductPageToolBar';
import IconLike from '../components/app/IconLike';
import IconSearchPage from '../styles/SearchPage/IconSearchPage';

import StyledProductPage from '../styles/ProductPage/StyledProductPage';
import { styledVariables, removePx } from '../styles/app/cssMaterial';
import ModalMessage from '../components/app/ModalMessage';

const INIT_SCROLLOFFSET = {
  preScrollOffset: 0,
  pageYOffset: 0,
  isScrollEnd: true,
};
const INIT_BUTTONSTATE = {};

const ProductPage = ({ isSignIn }) => {
  const { pid } = useParams();
  const [productData, setProductData] = useState(null);
  const currentUid = isSignIn;
  const [buttonState, setButtonState] = useState(INIT_BUTTONSTATE);
  const updateButtonState = () => {};
  const [isSimpleMode, setIsSimpleMode] = useState(1);
  const [cartedProductAmount, setCartedProductAmount] = useState(0);
  const [productAction, setProductAction] = useState({ cart: 1 });
  const iconLikeRef = useRef(null);
  const isLiked = productAction && productAction.like ? 1 : 0;
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselImgAmount = useRef(null);
  const ModolMessagePleaseSignInRef = useRef(null);

  // (1) fetch 商品資訊
  const fetchProductData = (pidValue) => {
    // console.log('pidValue: ', pidValue);
    return firestore
      .collection('products')
      .doc(pidValue)
      .get()
      .then((srcProductData) => {
        if (!srcProductData) {
          return null;
        }
        return srcProductData.data();
      });
  };
  const fetchProductAction = (pidValue) => {
    if (!currentUid) {
      return null;
    }
    return firestore
      .collection('users')
      .doc(currentUid)
      .collection('productAction')
      .doc(pidValue)
      .get()
      .then((srcProductActionData) => {
        // console.log('srcProductActionData.data(): ', srcProductActionData.data());
        return srcProductActionData.data();
      });
  };
  const updateProductData = async (pidValue) => {
    const newProductData = await fetchProductData(pidValue);
    setProductData(newProductData);
  };
  const initProductAction = async (pidValue) => {
    const newProductAction = await fetchProductAction(pidValue);
    setProductAction(newProductAction);
  };
  const updateProductAction = async (pidValue, updatedProductAction) => {
    if (!currentUid) {
      return;
    }
    await firestore
      .collection('users')
      .doc(currentUid)
      .collection('productAction')
      .doc(pidValue)
      .update(updatedProductAction);

    const newProductAction = await fetchProductAction(pidValue);
    setProductAction(newProductAction);
  };
  const updateCartedProductAmount = async () => {
    if (!currentUid) {
      setCartedProductAmount(0);
      return;
    }
    // eslint-disable-next-line prefer-const
    let newCartedProductAmount = 0;
    // console.log('before newCartedProductAmount: ', newCartedProductAmount);
    await firestore
      .collectionGroup('productAction')
      .where('uid', '==', currentUid)
      .where('cart', '!=', false)
      .get()
      .then((srcProductActionData) => {
        newCartedProductAmount = srcProductActionData.size;
        // console.log('newCartedProductAmount: ', newCartedProductAmount);
        setCartedProductAmount(newCartedProductAmount);
      });
  };
  const showModolMessagePleaseSignIn = () => {
    ModolMessagePleaseSignInRef.current.classList.remove('op-zero');
    ModolMessagePleaseSignInRef.current.addEventListener(
      'transitionend',
      () => {
        ModolMessagePleaseSignInRef.current.classList.add('op-zero');
      },
      { once: true },
    );
  };
  const handleIconLikeClick = () => {
    if (!currentUid) {
      showModolMessagePleaseSignIn();
      return;
    }
    iconLikeRef.current.classList.add('animation');
    iconLikeRef.current.addEventListener(
      'animationend',
      () => {
        // console.log('true');
        iconLikeRef.current.classList.remove('animation');
      },
      { once: true },
    );

    const getCurrentLike = () => {
      // console.log('isLiked: ', isLiked);
      // console.log('productAction.like: ', productAction.like);
      if (!isLiked) {
        return null;
      }
      if (!productAction.like) {
        return null;
      }
      return productAction.like;
    };
    const currentLike = getCurrentLike();
    // console.log('currentLike: ', currentLike);
    const likedProductAction = {
      ...productAction,
      like: !currentLike ? true : null,
    };
    updateProductAction(pid, likedProductAction);
  };
  useEffect(() => {
    updateProductData(pid);
  }, []);
  useEffect(() => {
    // console.log('productData: ', productData);
  }, [productData]);
  useEffect(() => {
    initProductAction(pid);
  }, [isSignIn]);
  useEffect(() => {
    // console.log('productAction: ', productAction);
  }, [productAction]);

  // (2) 處理 scroll bar
  const INIT_BARSTATE = {
    navBar: {
      content: (
        <ProductPageNavBar
          buttonState={buttonState}
          updateButtonState={updateButtonState}
          isSimpleMode={isSimpleMode}
          cartedProductAmount={cartedProductAmount}
        />
      ),
      visibility: 2,
    },
    tabBar: {
      content: (
        <ProductPageToolBar
          buttonState={buttonState}
          updateButtonState={updateButtonState}
          productAction={productAction}
          updateProductAction={updateProductAction}
          pid={pid}
          currentUid={currentUid}
          showModolMessagePleaseSignIn={showModolMessagePleaseSignIn}
        />
      ),
      visibility: 1,
      topShadow: 1,
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

    const scrollOffsetValue = scrollTargetValue.scrollTop;
    const preScrollOffsetValue = preScrollOffset.current;
    windowOffset.current = scrollOffsetValue - preScrollOffsetValue;
    preScrollOffset.current = scrollOffsetValue;

    // console.log('scrollTargetValue.scrollTop', scrollTargetValue.scrollTop);
    // console.log('scrollTargetValue.scrollTop > 160', scrollTargetValue.scrollTop > 160);
    // console.log('isSimpleMode !== 0: ', isSimpleMode !== 0);
    if (scrollTargetValue.scrollTop > 50 && isSimpleMode !== 0) {
      setIsSimpleMode(0);
    }
    if (scrollTargetValue.scrollTop <= 50 && isSimpleMode !== 1) {
      setIsSimpleMode(1);
    }

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
    isOnScroll.current = false;
  }, [scrollOffsetInfo]);
  useEffect(() => {
    setBarState(() => {
      const newBarState = {
        navBar: { ...INIT_BARSTATE.navBar },
        tabBar: { ...INIT_BARSTATE.tabBar },
      };
      return newBarState;
    });
  }, [buttonState, isSimpleMode, cartedProductAmount, productAction]);
  useEffect(() => {
    updateCartedProductAmount();
  }, [isSignIn, productAction]);

  // (3) carousel
  const handleIconLastImgClick = () => {
    setCarouselIdx((preCarouselIdx) => {
      if (preCarouselIdx === 0) {
        return carouselImgAmount.current - 1;
      }
      return preCarouselIdx - 1;
    });
  };
  const handleIconNextImgClick = () => {
    setCarouselIdx((preCarouselIdx) => {
      if (preCarouselIdx === carouselImgAmount.current - 1) {
        return 0;
      }
      return preCarouselIdx + 1;
    });
  };
  return (
    <StyledProductPage>
      <NavBar scrollOffsetInfo={scrollOffsetInfo} navBarState={barState.navBar} />
      <div
        className="container"
        onScroll={() => {
          handleScroll(scrollTarget.current);
        }}
        ref={scrollTarget}
      >
        <div className="scroll">
          {!productData ? (
            <div />
          ) : (
            <div className="content">
              <div className="contentBlock productInfo">
                <div className="imgProductInfo">
                  <div className="carousel">
                    {productData.images.map((imageURL, index) => {
                      if (index === carouselIdx) {
                        carouselImgAmount.current = productData.images.length;
                        return <img alt="" src={imageURL} />;
                      }
                      return <img alt="" src={imageURL} className="transparent" />;
                    })}
                    <IconSearchPage.ChenvronLeft
                      className="IconLastImg"
                      onClick={handleIconLastImgClick}
                    />
                    <IconSearchPage.ChenvronRight
                      className="IconNextImg"
                      onClick={handleIconNextImgClick}
                    />
                  </div>
                  <div className="dotContainer">
                    {productData.images.map((value, index) => {
                      if (index === carouselIdx) {
                        return <span className="dot focused" />;
                      }
                      return <span className="dot" />;
                    })}
                  </div>
                </div>
                <div className="textProductInfo">
                  <div className="onTopInfo">
                    <div className="column title">
                      <h2>{productData.name}</h2>
                    </div>
                    <div className="column priceNActivity">
                      <h1 className="textPrice">
                        <span>$</span>
                        <span className="price">{productData.price}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="column commentNLike">
                    <IconLike
                      isLiked={isLiked}
                      iconLikeRef={iconLikeRef}
                      handleIconLikeClick={handleIconLikeClick}
                    />
                  </div>
                </div>
              </div>
              <div className="contentBlock productIntro">
                <div className="blockTitle">
                  <h3>商品資訊</h3>
                </div>
                <p>{productData.introduction}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomToolBar scrollOffsetInfo={scrollOffsetInfo} tabBarState={barState.tabBar} />
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
    </StyledProductPage>
  );
};

export default ProductPage;
