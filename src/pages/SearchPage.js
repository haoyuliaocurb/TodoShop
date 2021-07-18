import { React, useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { firestore } from '../utils/firebase/firebase-services';
// import { Link } from 'react-router-dom';

import EasySearchMode from '../components/SearchPage/EasySearchMode/EasySearchMode';
import NormalSearchMode from '../components/SearchPage/NormalSearchMode/NormalSearchMode';
import { styledVariables } from '../styles/app/cssMaterial';
import IconSearchPage from '../styles/SearchPage/IconSearchPage';
import StyledSearchPage from '../styles/SearchPage/StyledSearchPage';

const SearchNavBarItem = ({ content, selected }) => {
  return <span className={selected ? 'selected' : ''}>{content}</span>;
};

const getSearchNavBarItems = (searchInfo) => {
  // eslint-disable-next-line prettier/prettier
  return searchInfo.map((value, index) => {
    // console.log('value.keyword: ', value.keyword);
    if (index === 0) {
      // eslint-disable-next-line react/jsx-boolean-value
      return <SearchNavBarItem content={value.keyword} selected={true} />;
    }
    return <SearchNavBarItem content={value.keyword} selected={false} />;
  });
};

const StyledSearchNavBarItems = styled.div`
  display: inline-block;
  width: 400px;
  max-width: ${styledVariables.shared.contentMaxWidth};
`;

const SearchNavBar = ({ searchInfo }) => {
  // console.log('searchInfo: ', searchInfo);
  return (
    <nav>
      <div>
        <span>1</span>
        <StyledSearchNavBarItems className="container">
          {searchInfo ? getSearchNavBarItems(searchInfo) : ''}
        </StyledSearchNavBarItems>
        <IconSearchPage.Add className="iconAdd" />
      </div>
      <IconSearchPage.ChenvronLeft className="iconChenvronLeft" />
      <span className="iconCart">
        <IconSearchPage.Cart />
        <span>1</span>
      </span>
    </nav>
  );
};

const SEARCH_INFO_WITH_PID_TEST = [
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

const SearchPages = ({ isSignIn, searchMetaInfo }) => {
  const currentUid = isSignIn;
  // console.log('currentUid in SearchPages: ', currentUid);
  const { searchKeywords, isEasySearchMode } = searchMetaInfo;
  // eslint-disable-next-line no-unused-vars
  const [searchInfo, setSearchInfo] = useState(null);
  const updateSearchInfo = async () => {
    const newSearchInfo = JSON.parse(JSON.stringify(SEARCH_INFO_WITH_PID_TEST));
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
    // console.log('useEffect on updateSearchInfo');
    updateSearchInfo();
  }, [isSignIn, searchKeywords]);

  useEffect(() => {
    // console.log('searchInfo in useEffect on searchInfo: ', searchInfo);
  }, [searchInfo]);

  return (
    <StyledSearchPage>
      <SearchNavBar searchInfo={searchInfo} />
      {isEasySearchMode ? (
        <EasySearchMode searchInfo={searchInfo} />
      ) : (
        <NormalSearchMode searchInfo={searchInfo} />
      )}
    </StyledSearchPage>
  );
};

export default SearchPages;
