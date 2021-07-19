import { React, useState, useEffect } from 'react';
import { firestore } from '../utils/firebase/firebase-services';
// import { Link } from 'react-router-dom';

import EasySearchMode from '../components/SearchPage/EasySearchMode/EasySearchMode';
import SearchNavBar from '../components/SearchPage/SearchNavBar';
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
    ],
  },
  {
    keyword: '牙線',
    products: [
      {
        pid: 'SnnWbfqOFz0Z5CIMdglT',
        name: 'GUM 牙周護理牙線 (含蠟滑順型) (50m)',
        price: 119,
        image:
          'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA83E0F310755133A5AB524A5CC7B3AB9E8ACBF76.jpeg?alt=media&token=be7c0420-3c8c-4fce-9fe2-a17df5b33a5d',
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
  {
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
    ],
  },
];

const getSearchInfo = (searchMetaInfo) => {
  if (!searchMetaInfo.keywords) {
    return;
  }
  const { length } = searchMetaInfo.keywords;
  if (length > 5) {
    // eslint-disable-next-line consistent-return
    return SEARCH_INFO_WITH_PID_TEST2;
  }

  // eslint-disable-next-line consistent-return
  return SEARCH_INFO_WITH_PID_TEST1;
};

const SearchPages = ({ isSignIn }) => {
  const currentUid = isSignIn;
  // console.log('currentUid in SearchPages: ', currentUid);
  // eslint-disable-next-line no-unused-vars
  const [searchMetaInfo, setSearchMetaInfo] = useState(SEARCH_META_INFO_TEMPLATE);
  // console.log('searchMetaInfo: ', searchMetaInfo);
  // eslint-disable-next-line no-unused-vars
  const { isEasySearchMode, currentSearchKeywordsIdx, filterButtonState } = searchMetaInfo;
  const [searchInfo, setSearchInfo] = useState(null);
  const updateSearchInfo = async () => {
    // console.log('getSearchInfo(searchMetaInfo): ', getSearchInfo(searchMetaInfo));
    const newSearchInfo = JSON.parse(JSON.stringify(getSearchInfo(searchMetaInfo)));
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
              productActionObj[pid].cart = true;
            }
          });
          resolve(productActionObj);
        };
        innerGetProductActionObj();
      });
      return pmsGetGetProductActionObj;
    };
    const productActionObj = await getGetProductActionObj();
    // console.log('productActionObj: ', productActionObj);

    // console.log('newSearchInfo: ', newSearchInfo);
    for (let i = 0; i < newSearchInfo.length; i += 1) {
      const productsGroupByKeyword = newSearchInfo[i];
      for (let j = 0; j < productsGroupByKeyword.products.length; j += 1) {
        const productInfo = productsGroupByKeyword.products[j];
        // console.log('j: ', j, 'productInfo: ', productInfo);
        const { pid } = productInfo;
        if (productActionObj[pid]) {
          // console.log('productActionObj[pid]: ', productActionObj[pid]);
          productInfo.productAction = productActionObj[pid];
        }
      }
    }

    // console.log('newSearchInfo: ', newSearchInfo);
    setSearchInfo(newSearchInfo);
  };

  useEffect(() => {
    const updateSearchMetaInfo = async () => {
      // eslint-disable-next-line no-unused-vars
      const getSearchKeywordsLog = async (isSignInValue) => {
        const promiseReturned = new Promise((resolve) => {
          // eslint-disable-next-line consistent-return
          const innerGetSearchKeywordsLog = async (innerIsSignInValue) => {
            // console.log('innerIsSignInValue: ', innerIsSignInValue);
            if (!innerIsSignInValue) {
              // 若未登入，則從 localStorage 取搜尋紀錄，若沒有則導回首頁
              return [];
            }
            const srcSearchKeywordsLog = await firestore
              .collection('users')
              .doc(innerIsSignInValue)
              .collection('searchKeywordsLog')
              .orderBy('updateTime', 'desc')
              .limit(1)
              .get();
            let searchKeywordsLog = {};
            // console.log('srcSearchKeywordsLog: ', srcSearchKeywordsLog);
            // searchKeywordsLog = srcSearchKeywordsLog.data();
            srcSearchKeywordsLog.forEach((searchKeywordsLogValue) => {
              // console.log('searchKeywordsLogValue.data(): ', searchKeywordsLogValue.data());
              searchKeywordsLog = searchKeywordsLogValue.data();
            });
            // console.log('searchKeywordsLog: ', searchKeywordsLog);
            resolve(searchKeywordsLog);
          };
          innerGetSearchKeywordsLog(isSignInValue);
        });
        return promiseReturned;
      };
      const { keywords } = await getSearchKeywordsLog(isSignIn);
      setSearchMetaInfo((preValue) => ({
        ...preValue,
        keywords,
      }));
    };
    updateSearchMetaInfo();
  }, [isSignIn]);

  useEffect(() => {
    // console.log('useEffect on updateSearchInfo');
    // console.log('searchMetaInfo: ', searchMetaInfo);
    // console.log('!searchMetaInfo.searchKeywordsLog: ', !searchMetaInfo.searchKeywordsLog);
    if (!searchMetaInfo.keywords) {
      return;
    }
    updateSearchInfo();
  }, [searchMetaInfo]);

  useEffect(() => {
    // console.log('searchInfo in useEffect on searchInfo: ', searchInfo);
  }, [searchInfo]);

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

  return (
    <StyledSearchPage>
      <SearchNavBar
        currentSearchKeywordsIdx={currentSearchKeywordsIdx}
        handleNavBarItemClick={handleNavBarItemClick}
        searchInfo={searchInfo}
      />
      {isEasySearchMode ? (
        <EasySearchMode
          handleEasySearchButtonClick={handleEasySearchButtonClick}
          searchInfo={searchInfo}
        />
      ) : (
        <NormalSearchMode
          currentSearchInfo={searchInfo ? searchInfo[currentSearchKeywordsIdx] : null}
          filterButtonState={filterButtonState}
          handleGeneralSortButtonClick={handleGeneralSortButtonClick}
          handlePriceSortButtonClick={handlePriceSortButtonClick}
          handleHitButtonClick={handleHitButtonClick}
          handleEasySearchButtonClick={handleEasySearchButtonClick}
        />
      )}
    </StyledSearchPage>
  );
};

export default SearchPages;
