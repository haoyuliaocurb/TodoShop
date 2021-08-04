import { React, useState, useEffect } from 'react';
import StyledPaymentPage from '../styles/PaymentPage/StyledPaymentPage';
import { firestore } from '../utils/firebase/firebase-services';
import TapPayFields from '../components/PaymentPage/TapPayFields';
import NavBar from '../components/app/NavBar';
import TabBar from '../components/app/TabBar';
import SimpleNavBar from '../components/shared/SimpleNavBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import IconShared from '../styles/shared/IconShared';
import ProductGroupByStore from '../components/PaymentPage/ProductGroupByStore';

const INIT_ORDER_USER_INFO = {
  name: '',
  email: '',
  phoneNumber: '',
};

// eslint-disable-next-line no-unused-vars
const PaymentPage = ({ isSignIn, orderData }) => {
  // console.log('isSignIn: ', isSignIn);
  // console.log('orderData: ', orderData);
  const [fullOrderData, setFullOrderData] = useState(null);
  const [orderPriceSum, setOrderPriceSum] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [orderUserInfo, setOrderUserInfo] = useState(INIT_ORDER_USER_INFO);
  const { orderId } = !orderData ? '' : orderData;
  const fetchProductData = (pidValue) => {
    return firestore
      .collection('products')
      .doc(pidValue)
      .get()
      .then((srcProductData) => {
        if (!srcProductData.exists) {
          return null;
        }
        return srcProductData.data();
      });
  };
  const initOrderData = async (orderDataValue) => {
    const { products: productsData } = orderDataValue;
    // console.log('productsData: ', productsData);
    const updateOrderPriceSum = (flatProductsData) => {
      console.log('flatProductsData: ', flatProductsData);
      let newOrderPriceSum = 0;
      flatProductsData.forEach((productData) => {
        const { price, amount } = productData;
        if (!price || !amount) {
          return;
        }
        newOrderPriceSum += price * amount;
      });
      setOrderPriceSum(newOrderPriceSum);
    };
    const newProductsData = await Promise.all(
      productsData.map((productData) => {
        const { pid } = productData;
        return fetchProductData(pid).then((srcProductData) => {
          return {
            ...productData,
            ...srcProductData,
          };
        });
      }),
    ).then((newProductsDataValue) => {
      console.log('newProductsDataValue: ', newProductsDataValue);
      updateOrderPriceSum(newProductsDataValue);
      return newProductsDataValue;
    });
    const classifyProductsDataBySid = async (flatProductsData) => {
      const srcClassifiedProductsData = [];
      const sidIdxObj = {};
      let sidIdxCounter = 0;
      flatProductsData.forEach((productData) => {
        const { sid } = productData;
        const sidIdx = sidIdxObj[sid];
        if (sidIdx === undefined) {
          sidIdxObj[sid] = sidIdxCounter;
          sidIdxCounter += 1;
          // console.log('sidIdxObj: ', sidIdxObj);
          const newSidIdx = sidIdxObj[sid];
          srcClassifiedProductsData[newSidIdx] = {};
          srcClassifiedProductsData[newSidIdx].sid = sid;
          srcClassifiedProductsData[newSidIdx].products = [];
          srcClassifiedProductsData[newSidIdx].products.push(productData);
          return;
        }
        srcClassifiedProductsData[sidIdx].products.push(productData);
      });
      return Promise.all(
        srcClassifiedProductsData.map((srcClassifiedProductData) => {
          const { sid } = srcClassifiedProductData;
          // console.log('sid: ', sid);
          return firestore
            .collection('stores')
            .doc(sid)
            .get()
            .then((srcStoreData) => {
              const storeData = srcStoreData.data();
              const { name } = storeData;
              const storeName = !name ? '' : name;
              return {
                ...srcClassifiedProductData,
                storeName,
              };
            });
        }),
      );
    };
    const classifiedProductsData = await classifyProductsDataBySid(newProductsData);
    // console.log('classifiedProductsData: ', classifiedProductsData);
    const newFullOrderData = {
      ...orderDataValue,
      orderProducts: classifiedProductsData,
    };
    delete newFullOrderData.products;
    setFullOrderData(newFullOrderData);
  };
  useEffect(() => {
    if (!orderData) {
      return;
    }
    initOrderData(orderData);
  }, [orderData]);
  useEffect(() => {
    // console.log('fullOrderData: ', fullOrderData);
  }, [fullOrderData]);

  // (2) 處理 bar
  const INIT_BARSTATE = {
    navBar: {
      content: <SimpleNavBar />,
      visibility: 2,
    },
    tabBar: {
      content: <GeneralTabBar />,
      visibility: 2,
    },
  };
  const [barState, setBarState] = useState(INIT_BARSTATE);

  useEffect(() => {
    // console.log('buttonState: ', buttonState);
    setBarState(() => {
      const newBarState = {
        navBar: { ...INIT_BARSTATE.navBar },
        tabBar: { ...INIT_BARSTATE.tabBar },
      };
      return newBarState;
    });
  }, []);

  // (3) 元件動態
  const [orderProductsVisibility, setOrderProductsVisibility] = useState(0);
  const handleButtonToggleProductCardsClick = () => {
    if (!orderProductsVisibility) {
      setOrderProductsVisibility(1);
      return;
    }
    setOrderProductsVisibility(0);
  };
  useEffect(() => {
    // console.log('orderUserInfo: ', orderUserInfo);
  }, [orderUserInfo]);

  return (
    <StyledPaymentPage>
      <NavBar navBarState={barState.navBar} />
      <div className="PaymentPageContent">
        <div className="ScrollPaymentPageContent">
          <div className="block orderInfo">
            <div className="title">
              <h3>訂單資訊</h3>
            </div>
            <div className="column">
              <p>
                <span className="columnName">訂單編號</span>
                <span className="columnData">{orderId}</span>
              </p>
            </div>
            <div className="column">
              <p>
                <span className="columnName">訂單金額</span>
                <span className="columnData">
                  <span>$</span>
                  <span>{!orderPriceSum ? 0 : orderPriceSum}</span>
                </span>
              </p>
            </div>
          </div>
          <div className="block orderProductsInfo">
            <div className="title">
              <h3>商品資訊</h3>
            </div>
            {!fullOrderData || !fullOrderData.orderProducts ? (
              <div />
            ) : (
              fullOrderData.orderProducts.map((eachStoreProductsData) => {
                // eslint-disable-next-line prettier/prettier
                return <ProductGroupByStore visibility={orderProductsVisibility} eachCartData={eachStoreProductsData} />;
              })
            )}
            <button
              className={
                !orderProductsVisibility
                  ? 'ButtonToggleProductCards'
                  : 'ButtonToggleProductCards clicked'
              }
              type="button"
              onClick={handleButtonToggleProductCardsClick}
            >
              <p>{!orderProductsVisibility ? '展開資訊' : '收合資訊'}</p>
              <IconShared.ChenvronBottom />
            </button>
          </div>
          <div className="orderUserInfoBlock">
            <form className="block orderUserInfo">
              <div className="title">
                <h3>訂購人資訊</h3>
              </div>
              <label className="lable name" htmlFor="name">
                <p>姓名</p>
                <input
                  value={orderUserInfo.name}
                  id="name"
                  placeholder="姓名"
                  onInput={(e) => {
                    setOrderUserInfo((preOrderUserInfo) => {
                      return {
                        ...preOrderUserInfo,
                        name: e.target.value,
                      };
                    });
                  }}
                />
              </label>
              <label className="lable email" htmlFor="email">
                <p>電子郵件</p>
                <input
                  value={orderUserInfo.email}
                  id="email"
                  placeholder="example@email.com"
                  onInput={(e) => {
                    setOrderUserInfo((preOrderUserInfo) => {
                      return {
                        ...preOrderUserInfo,
                        email: e.target.value,
                      };
                    });
                  }}
                />
              </label>
              <label className="lable phoneNumber" htmlFor="phoneNumber">
                <p>電話</p>
                <input
                  value={orderUserInfo.phoneNumber}
                  id="phoneNumber"
                  placeholder="手機號碼、家用號碼"
                  onInput={(e) => {
                    setOrderUserInfo((preOrderUserInfo) => {
                      return {
                        ...preOrderUserInfo,
                        phoneNumber: e.target.value,
                      };
                    });
                  }}
                />
              </label>
            </form>
            <TapPayFields
              orderPriceSum={orderPriceSum}
              orderUserInfo={orderUserInfo}
              orderId={orderId}
              fullOrderData={fullOrderData}
            />
          </div>
        </div>
      </div>
      <TabBar tabBarState={barState.tabBar} />
    </StyledPaymentPage>
  );
};

export default PaymentPage;
