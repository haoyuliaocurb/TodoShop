import { React, useState, useEffect } from 'react';
import StyledPaymentPage from '../styles/PaymentPage/StyledPaymentPage';
import { firestore } from '../utils/firebase/firebase-services';
import TapPayFields from '../components/PaymentPage/TapPayFields';
import NavBar from '../components/app/NavBar';
import TabBar from '../components/app/TabBar';
import SimpleNavBar from '../components/shared/SimpleNavBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import IconShared from '../styles/shared/IconShared';

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
    const newProductData = await Promise.all(
      productsData.map((productData) => {
        const { pid } = productData;
        return fetchProductData(pid).then((srcProductData) => {
          return {
            ...productData,
            ...srcProductData,
          };
        });
      }),
    );
    // console.log('newProductData: ', newProductData);
    const newFullOrderData = {
      ...orderDataValue,
      products: newProductData,
    };
    setFullOrderData(newFullOrderData);
  };
  useEffect(() => {
    if (!orderData) {
      return;
    }
    initOrderData(orderData);
  }, []);
  useEffect(() => {
    // console.log('fullOrderData: ', fullOrderData);
    if (!fullOrderData) {
      return;
    }
    setOrderPriceSum(() => {
      // console.log(true);
      let newOrderPriceSum = 0;
      fullOrderData.products.forEach((productData) => {
        const { price, amount } = productData;
        if (!price || !amount) {
          return;
        }
        newOrderPriceSum += price * amount;
      });
      // console.log('newOrderPriceSum: ', newOrderPriceSum);
      return newOrderPriceSum;
    });
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

  // (3) form 動態
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
          <div className="block productsInfo">
            <div className="title">
              <h3>商品資訊</h3>
            </div>
            <button className="ButtonToggleProductCards" type="button">
              <p>展開全部</p>
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
            />
          </div>
        </div>
      </div>
      <TabBar tabBarState={barState.tabBar} />
    </StyledPaymentPage>
  );
};

export default PaymentPage;
