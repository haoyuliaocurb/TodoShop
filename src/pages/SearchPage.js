/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore } from '../utils/firebase/firebase-services';
import { getTimeKeyGenerator } from '../utils/selfLibrary';

import EasySearchMode from '../components/SearchPage/EasySearchMode/EasySearchMode';
import NormalSearchMode from '../components/SearchPage/NormalSearchMode/NormalSearchMode';
import StyledSearchPage from '../styles/SearchPage/StyledSearchPage';

const SEARCH_META_INFO_TEMPLATE = {
  isEasySearchMode: 1,
  currentSearchKeywordsIdx: 0,
  filterButtonState: {
    generalSort: 0,
    priceSort: 0,
    hit: 0,
  },
};
const SEARCH_INFO_WITH_PID_TEST1 = [
  {
    key: 162744031531100,
    keyword: '衛生紙',
    products: [
      {
        pid: '7c8f8Ab6OQFVpGaAxzCj',
        name: '淨世代環保抽取式衛生紙100抽x12包x6串/箱',
        price: 600,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D84A6FE4D47730FB45B68EDF54888C80C79CF74.jpeg?alt=media&token=ed985593-8fa1-42c6-82be-76bdf1fdda1a',
      },
      {
        pid: 'CLuaEILOo0NGuBHpaP6V',
        name: 'BeniBear邦尼熊復古酒紅條紋抽取式衛生紙100抽8包6袋',
        price: 489,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D1A2174AB-SP-8702915.jpeg?alt=media&token=7f6bfad5-1855-414e-a8a9-9020c2d51f82',
      },
      {
        pid: 'SWUNApoWStoWaW7RP4hh',
        name: '春風柔膚感抽取式衛生紙 110抽x24包x3串/箱',
        price: 829,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F7C9EAB399A-SP-7033611.jpeg?alt=media&token=c174d228-1b92-4038-8bd3-a2716f856e9c',
      },
      {
        pid: 'SeFCJJMAzLXBxbJ2MdI1',
        name: '蒲公英環保抽取衛生紙100抽x72包',
        price: 659,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FC9F4A74390-Gd-5619164.jpeg?alt=media&token=57a3e234-48ff-4eef-8361-d39252b101f3',
      },
      {
        pid: 'uym9FbUNRTPpE11GRTwk',
        name: '五月花厚棒抽取式衛生紙90抽x10包/袋',
        price: 229,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FEA12DF5694-Product-22905621.jpeg?alt=media&token=d9aa4352-6a72-45f3-a573-ecd16acd9dd9',
      },
      {
        pid: 'hzLK7rDYOAIQWx5C5OkI',
        name: '得意連續抽取式花紋衛生紙100抽 x70包/箱',
        price: 659,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FF613DAB9DB-Product-12612396.jpeg?alt=media&token=1566dfdf-1f2c-4077-acab-115ba05ff950',
      },
    ],
  },
  {
    key: 162744031531101,
    keyword: '牙線',
    products: [
      {
        pid: 'SnnWbfqOFz0Z5CIMdglT',
        name: 'GUM 牙周護理牙線',
        price: 119,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FACD8F56CF47ABA0FC576123A596B5CB16CC1C87D.jpg?alt=media&token=56195a96-17fb-4c6d-9bd7-85ecdad42445',
      },
      {
        pid: 'aOHwl9peu1BQI7Bq7Kt0',
        name: '刷樂扁線牙線棒(薄荷味)600支入',
        price: 199,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F02E714D1EB-Gd-7396189.jpeg?alt=media&token=6c2a83cb-7de9-490a-a8a5-c7ace08efa8a',
      },
    ],
  },
  {
    key: 162744031531103,
    keyword: '漱口水',
    products: [
      {
        pid: 'l43uxe5pY1Accmi6OPqW',
        name: '百齡Smiling 護牙周到漱口水超級護齦W-綠茶薄荷750ml',
        price: 149,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F1F5E49FDDE-SP-8221369.jpeg?alt=media&token=e366b746-cc25-4f3f-914d-7fc9957f1e22',
      },
    ],
  },
];
// eslint-disable-next-line no-unused-vars
const SEARCH_INFO_WITH_PID_TEST2 = [
  {
    key: 162744031531500,
    keyword: '衛生紙',
    products: [
      {
        pid: '7c8f8Ab6OQFVpGaAxzCj',
        name: '淨世代環保抽取式衛生紙100抽x12包x6串/箱',
        price: 600,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D84A6FE4D47730FB45B68EDF54888C80C79CF74.jpeg?alt=media&token=ed985593-8fa1-42c6-82be-76bdf1fdda1a',
      },
      {
        pid: 'CLuaEILOo0NGuBHpaP6V',
        name: 'BeniBear邦尼熊復古酒紅條紋抽取式衛生紙100抽8包6袋',
        price: 489,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D1A2174AB-SP-8702915.jpeg?alt=media&token=7f6bfad5-1855-414e-a8a9-9020c2d51f82',
      },
      {
        pid: 'SWUNApoWStoWaW7RP4hh',
        name: '春風柔膚感抽取式衛生紙 110抽x24包x3串/箱',
        price: 829,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F7C9EAB399A-SP-7033611.jpeg?alt=media&token=c174d228-1b92-4038-8bd3-a2716f856e9c',
      },
      {
        pid: 'SeFCJJMAzLXBxbJ2MdI1',
        name: '蒲公英環保抽取衛生紙100抽x72包',
        price: 659,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FC9F4A74390-Gd-5619164.jpeg?alt=media&token=57a3e234-48ff-4eef-8361-d39252b101f3',
      },
      {
        pid: 'uym9FbUNRTPpE11GRTwk',
        name: '五月花厚棒抽取式衛生紙90抽x10包/袋',
        price: 229,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FEA12DF5694-Product-22905621.jpeg?alt=media&token=d9aa4352-6a72-45f3-a573-ecd16acd9dd9',
      },
      {
        pid: 'hzLK7rDYOAIQWx5C5OkI',
        name: '得意連續抽取式花紋衛生紙100抽 x70包/箱',
        price: 659,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FF613DAB9DB-Product-12612396.jpeg?alt=media&token=1566dfdf-1f2c-4077-acab-115ba05ff950',
      },
    ],
  },
  {
    key: 16274403153150,
    keyword: '洗髮精',
    products: [
      {
        pid: '2mS9J1zTXPXX604zb4ik',
        name: '花王 KAO 洗髮精兒童專用 (750ml/瓶)',
        price: 109,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA129D9ECD300B0F2B961DC5F9DCABF42544CBC00.jpeg?alt=media&token=f84481be-e936-4d71-b93a-b57efe8f95d5',
      },
    ],
  },
  {
    key: 162744031531502,
    keyword: '乳液',
    products: [
      {
        pid: 'WstK2EjRmnTBp8fGHNtR',
        name: 'KOSE 高絲 雪肌精乳液45mlX2',
        price: 348,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F570DF569BF-SP-8426012.jpeg?alt=media&token=4c7eac54-62f5-4d3a-ac6a-5e97abf87073',
      },
      {
        pid: 'FgFiYn1pAYkV2gLxNSJh',
        name: 'KOSE高絲 雪肌精化妝水100ml+雪肌精乳液33ml*3',
        price: 425,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FD80BB6A390-SP-7136469.jpeg?alt=media&token=544c4d35-d6b9-47cc-a39f-25205f8b208b',
      },
    ],
  },
  {
    key: 162744031531503,
    keyword: '保鮮盒',
    products: [
      {
        pid: 'rnMzEpgykhBfNWOmsNFd',
        name: '樂扣樂扣 純淨抗菌保鮮盒 600ML (長方/淺灰)',
        price: 289,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FE80F38B88B-SP-8895718.jpeg?alt=media&token=f074a102-6f7c-4a52-ab6c-632975cd06d1',
      },
    ],
  },
  {
    key: 162744031531504,
    keyword: '廚房紙巾',
    products: [
      {
        pid: 'SiQ8ExzVc2VzXs4jCXA0',
        name: '春風抽取式廚房紙巾一秒抽 120抽x3包x8串/箱',
        price: 670,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Fc138509e58-Gd-8141862.jpeg?alt=media&token=d02bebdd-c1b2-4d7d-aee0-e238a6692b6d',
      },
    ],
  },
  {
    key: 162744031531505,
    keyword: '洗碗精',
    products: [
      {
        pid: 'NYUjT2vn7uKuMw02BUYT',
        name: '茶樹莊園 茶樹／茶樹檸檬 超濃縮洗碗精(500g)',
        price: 69,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Fp0704206325320-item-2c47xf4x0600x0600-m.jpeg?alt=media&token=0ea188c8-a646-4363-a509-e4eb7fd9c7b3',
      },
    ],
  },
  {
    key: 162744031531506,
    keyword: '面膜',
    products: [
      {
        pid: 'ENMagTFwTJgEaqCk4bzj',
        name: '我的心機 黑珍珠絲光潤白黑面膜8入',
        price: 299,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FCB77C7CF92C69BC6743D92D6725317E1BEAEAC82.jpeg?alt=media&token=ba1a7d6a-60de-4107-a462-8d5a91ca2a78',
      },
    ],
  },
  {
    key: 162744031531507,
    keyword: '化妝水',
    products: [
      {
        pid: 'FgFiYn1pAYkV2gLxNSJh',
        name: 'KOSE高絲 雪肌精化妝水100ml+雪肌精乳液33ml*3',
        price: 425,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FD80BB6A390-SP-7136469.jpeg?alt=media&token=544c4d35-d6b9-47cc-a39f-25205f8b208b',
      },
    ],
  },
  {
    key: 162744031531508,
    keyword: '洗面乳',
    products: [
      {
        pid: 'HyiZa79unVEQY197SEre',
        name: 'DOVE 多芬 潤澤水嫩洗面乳 100G',
        price: 79,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F50433a3f60-Gd-7779186.jpeg?alt=media&token=6198fc9a-0245-47d0-8658-0a5d71988c59',
      },
      {
        pid: 'LH6uNAwmJMWgpQOwqySz',
        name: "MEN'S Biore 痘痘調理洗面乳 100g",
        price: 119,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Ff68de51af6-Gd-7772841.jpeg?alt=media&token=e97605af-2bb4-4a1d-8733-fdd83771483d',
      },
    ],
  },
];

const fetchProductsData = async (searchStr, page, option) => {
  const getBody = () => {
    const newBody = { searchStr };
    newBody.page = !page ? 0 : page;
    if (option) {
      newBody.option = option;
    }
    return JSON.stringify(newBody);
  };
  return fetch('https://us-central1-todoshop-5fd25.cloudfunctions.net/widgets/searchProducts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: getBody(),
  }).then((srcProductsData) => {
    return srcProductsData.json();
  });
};

const SearchPages = ({ isSignIn }) => {
  const currentUid = isSignIn;
  const location = useLocation();
  // console.log('currentUid in SearchPages: ', currentUid);
  // eslint-disable-next-line no-unused-vars
  const [searchMetaInfo, setSearchMetaInfo] = useState(SEARCH_META_INFO_TEMPLATE);
  const [searchInfo, setSearchInfo] = useState(null);
  const [eachSearchInfoKeyArr, setEachSearchInfoKeyArr] = useState(null);
  // console.log('searchMetaInfo: ', searchMetaInfo);
  // eslint-disable-next-line no-unused-vars
  const { isEasySearchMode, currentSearchKeywordsIdx, filterButtonState } = searchMetaInfo;
  const [cartedProductAmount, setCartedProductAmount] = useState(0);
  const getTimeKey = useRef(getTimeKeyGenerator());

  const fetchEachSearchInfo = (keyword, page, option) => {
    return fetchProductsData(keyword, page, option).then((products) => {
      return {
        key: getTimeKey.current(),
        keyword,
        products,
      };
    });
  };
  const fetchAllSearchInfo = (locationValue, page = 0, option) => {
    // console.log('locationValue: ', locationValue);
    if (!locationValue.search) {
      return;
    }
    const getKeywordsStr = () => {
      const srcKeywordsStr = /keywords=[\S]+$/.exec(decodeURI(locationValue.search))[0];
      return srcKeywordsStr.replace('keywords=', '');
    };
    const keywordArray = getKeywordsStr().split('+');
    return Promise.all(
      keywordArray.map((keyword) => {
        return fetchEachSearchInfo(keyword, page, option);
      }),
    ).then((newSearchInfo) => {
      // console.log('newSearchInfo: ', newSearchInfo);
      return newSearchInfo;
    });
  };

  const fetchSearchItemInfo = () => {};
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
    itemIdx,
    cardIdx,
    preProductAction,
  ) => {
    await updateSearchCardProductAction(pidValue, updatedProductAction);
    const newSearchCardProductAction = await fetchSearchCardProductAction(
      pidValue,
      updatedProductAction,
    );
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
    setSearchInfo((preSearchInfoValue) => {
      const newSearchInfo = [...preSearchInfoValue];
      newSearchInfo[itemIdx].products[cardIdx].productAction = newSearchCardProductAction;

      return newSearchInfo;
    });
  };
  const getGetProductActionObj = () => {
    const pmsGetGetProductActionObj = new Promise((resolve) => {
      const innerGetProductActionObj = async () => {
        const productActionObj = {};
        if (!currentUid) {
          resolve(productActionObj);
        }
        const srcProductActionArray = await firestore
          .collectionGroup('productAction')
          .where('uid', '==', currentUid)
          .get();
        let counter = 0;
        srcProductActionArray.forEach((srcProductAction) => {
          const pid = srcProductAction.id;
          const productActionData = srcProductAction.data();
          // console.log('productActionData: ', productActionData);
          productActionObj[pid] = {};
          if (productActionData.bookmark) {
            productActionObj[pid].bookmark = true;
          }
          if (productActionData.like) {
            productActionObj[pid].like = true;
          }
          if (productActionData.cart) {
            productActionObj[pid].cart = {};
            productActionObj[pid].cart.amount = productActionData.cart.amount;
            if (productActionData.cart.type) {
              productActionObj[pid].cart.type = productActionData.cart.type;
            }
            counter += 1;
          }
        });
        setCartedProductAmount(counter);
        resolve(productActionObj);
      };
      innerGetProductActionObj();
    });
    return pmsGetGetProductActionObj;
  };
  const addProductAction2SearchItemInfo = async (productActionObj, productsData) => {
    for (let j = 0; j < productsData.length; j += 1) {
      const productInfo = productsData[j];
      // console.log('j: ', j, 'productInfo: ', productInfo);
      const { pid } = productInfo;
      if (productActionObj[pid]) {
        // console.log('productActionObj[pid]: ', productActionObj[pid]);
        productInfo.productAction = productActionObj[pid];
      } else {
        productInfo.productAction = null;
      }
    }
    return productsData;
  };
  const updateSearchInfo = async () => {
    const newSearchInfo = await fetchAllSearchInfo(location);
    // console.log('newSearchInfo: ', newSearchInfo);

    const productActionObj = await getGetProductActionObj();
    // console.log('productActionObj: ', productActionObj);
    const newEachSearchInfoKeyArr = [];
    for (let i = 0; i < newSearchInfo.length; i += 1) {
      const productsGroupByKeyword = newSearchInfo[i];
      const { key, keyword, products: productsData } = productsGroupByKeyword;
      newEachSearchInfoKeyArr.push({ key, keyword });
      addProductAction2SearchItemInfo(productActionObj, productsData);
    }
    setEachSearchInfoKeyArr(newEachSearchInfoKeyArr);
    setSearchInfo(newSearchInfo);
  };
  const updateSearchItemInfo = async (currentKeywordsIdx, searchOption, page = 0) => {
    console.log(
      'eachSearchInfoKeyArr[currentKeywordsIdx]: ',
      eachSearchInfoKeyArr[currentKeywordsIdx],
    );
    const { keyword } = eachSearchInfoKeyArr[currentKeywordsIdx];
    const newEachSearchInfo = await fetchEachSearchInfo(keyword, page, searchOption);
    const { products: productsData } = newEachSearchInfo;
    const productActionObj = await getGetProductActionObj();
    addProductAction2SearchItemInfo(productActionObj, productsData);
    setSearchInfo((preSearchInfo) => {
      const newSearchInfo = [...preSearchInfo];
      newSearchInfo[currentKeywordsIdx] = newEachSearchInfo;
      return newSearchInfo;
    });
  };
  const handleNavBarItemClick = (idx) => {
    // console.log('idx: ', idx);
    setSearchMetaInfo((preValue) => ({ ...preValue, currentSearchKeywordsIdx: idx }));
  };
  const handleGeneralSortButtonClick = () => {
    // console.log('trigger handleGeneralSortButtonClick');
    setSearchMetaInfo((preValue) => {
      switch (preValue.filterButtonState.generalSort) {
        case 0:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, generalSort: 1 },
          };
        case 1:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, generalSort: 2 },
          };
        case 2:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, generalSort: 0 },
          };
        default:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, generalSort: 0 },
          };
      }
    });
  };
  const handlePriceSortButtonClick = () => {
    setSearchMetaInfo((preValue) => {
      switch (preValue.filterButtonState.priceSort) {
        case 0:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, priceSort: 1 },
          };
        case 1:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, priceSort: 2 },
          };
        case 2:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, priceSort: 0 },
          };
        default:
          return {
            ...preValue,
            filterButtonState: { ...preValue.filterButtonState, priceSort: 0 },
          };
      }
    });
  };
  const handleHitButtonClick = () => {
    setSearchMetaInfo((preValue) => {
      if (!preValue.filterButtonState.hit) {
        return {
          ...preValue,
          filterButtonState: { ...preValue.filterButtonState, hit: 1 },
        };
      }
      return {
        ...preValue,
        filterButtonState: { ...preValue.filterButtonState, hit: 0 },
      };
    });
  };
  const handleEasySearchButtonClick = () => {
    setSearchMetaInfo((preValue) => {
      if (!preValue.isEasySearchMode) {
        return {
          ...preValue,
          isEasySearchMode: 1,
        };
      }
      return {
        ...preValue,
        isEasySearchMode: 0,
      };
    });
  };
  // useEffect(() => {
  //   const updateSearchMetaInfo = async () => {
  //     // eslint-disable-next-line no-unused-vars
  //     const getSearchKeywordsLog = async (isSignInValue) => {
  //       const promiseReturned = new Promise((resolve) => {
  //         // eslint-disable-next-line consistent-return
  //         const innerGetSearchKeywordsLog = async (innerIsSignInValue) => {
  //           // console.log('innerIsSignInValue: ', innerIsSignInValue);
  //           if (!innerIsSignInValue) {
  //             // 若未登入，則從 localStorage 取搜尋紀錄，若沒有則導回首頁
  //             return [];
  //           }
  //           const srcSearchKeywordsLog = await firestore
  //             .collection('users')
  //             .doc(innerIsSignInValue)
  //             .collection('searchKeywordsLog')
  //             .orderBy('updateTime', 'desc')
  //             .limit(1)
  //             .get();
  //           let searchKeywordsLog = {};
  //           // console.log('srcSearchKeywordsLog: ', srcSearchKeywordsLog);
  //           // searchKeywordsLog = srcSearchKeywordsLog.data();
  //           srcSearchKeywordsLog.forEach((searchKeywordsLogValue) => {
  //             // console.log('searchKeywordsLogValue.data(): ', searchKeywordsLogValue.data());
  //             searchKeywordsLog = searchKeywordsLogValue.data();
  //           });
  //           // console.log('searchKeywordsLog: ', searchKeywordsLog);
  //           resolve(searchKeywordsLog);
  //         };
  //         innerGetSearchKeywordsLog(isSignInValue);
  //       });
  //       return promiseReturned;
  //     };
  //     const { keywords } = await getSearchKeywordsLog(isSignIn);
  //     setSearchMetaInfo((preValue) => ({
  //       ...preValue,
  //       keywords,
  //     }));
  //   };
  //   updateSearchMetaInfo();
  // }, [isSignIn]);
  useEffect(() => {
    updateSearchInfo();
  }, [isSignIn, location.search]);
  useEffect(() => {
    // console.log('searchInfo: ', searchInfo);
  }, [searchInfo]);
  useEffect(() => {
    // console.log('eachSearchInfoKeyArr: ', eachSearchInfoKeyArr);
  }, [eachSearchInfoKeyArr]);
  return (
    <StyledSearchPage>
      {isEasySearchMode ? (
        <EasySearchMode
          currentSearchKeywordsIdx={currentSearchKeywordsIdx}
          handleNavBarItemClick={handleNavBarItemClick}
          handleEasySearchButtonClick={handleEasySearchButtonClick}
          searchInfo={searchInfo}
          updateSearchCardInfo={updateSearchCardInfo}
          cartedProductAmount={cartedProductAmount}
        />
      ) : (
        <NormalSearchMode
          currentSearchInfo={searchInfo ? searchInfo[currentSearchKeywordsIdx] : null}
          filterButtonState={filterButtonState}
          handleGeneralSortButtonClick={handleGeneralSortButtonClick}
          handlePriceSortButtonClick={handlePriceSortButtonClick}
          handleHitButtonClick={handleHitButtonClick}
          handleEasySearchButtonClick={handleEasySearchButtonClick}
          currentSearchKeywordsIdx={currentSearchKeywordsIdx}
          handleNavBarItemClick={handleNavBarItemClick}
          searchInfo={searchInfo}
          updateSearchCardInfo={updateSearchCardInfo}
          cartedProductAmount={cartedProductAmount}
          updateSearchItemInfo={updateSearchItemInfo}
        />
      )}
    </StyledSearchPage>
  );
};

export default SearchPages;
