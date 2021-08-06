import { React, useState, useEffect, useRef } from 'react';
import OrderCard from './OrderCard';
import StyledUserOrders from '../../../styles/AuthPage/UserOrder/StyledUserOrders';
import { firestore } from '../../../utils/firebase/firebase-services';
import ColumnMessage from '../../shared/ColumnMessage';
import LoaderDotModal from '../../shared/LoaderDotModal';
// eslint-disable-next-line no-unused-vars
import IconShared from '../../../styles/shared/IconShared';

const BUTTON_ORDER_TYPE_ARR = [
  {
    name: '全部',
    status: null,
  },
  {
    name: '待付款',
    status: 0,
  },
  {
    name: '待出貨',
    status: 1,
  },
  {
    name: '待收貨',
    status: 2,
  },
  {
    name: '完成',
    status: 3,
  },
  {
    name: '不成立',
    status: 4,
  },
];
const UserOrders = ({ currentUid, showModolMessageFunctionDev }) => {
  // eslint-disable-next-line no-unused-vars
  const [ordersData, setOrdersData] = useState(null);
  const [currentButtonOrderTypeIdx, setCurrentButtonOrderTypeIdx] = useState(0);
  const LoaderDotModalRef = useRef(null);
  const ColumnMessageRef = useRef(null);

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
  const initOrderData = (orderDataValue) => {
    return new Promise((resolve) => {
      const innerInitOrderData = async () => {
        const { products: productsData } = orderDataValue;
        // console.log('productsData: ', productsData);
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
        );
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
                  // console.log('storeData: ', storeData);
                  let storeName = '';
                  if (storeData) {
                    const { name } = storeData;
                    storeName = !name ? '' : name;
                  }
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
        const newOrdersData = {
          ...orderDataValue,
          orderProducts: classifiedProductsData,
        };
        delete newOrdersData.products;
        resolve(newOrdersData);
      };
      innerInitOrderData();
    });
  };
  const fetchOrdersData = (orderStatus = null) => {
    // console.log('currentUid: ', currentUid);
    if (!currentUid) {
      return;
    }
    if (orderStatus === null) {
      // eslint-disable-next-line consistent-return
      return firestore
        .collection('orders')
        .where('uid', '==', currentUid)
        .orderBy('updateTime', 'desc')
        .limit(8)
        .get()
        .then((srcOrdersData) => {
          if (srcOrdersData.empty) {
            return null;
          }
          const newOrdersData = [];
          srcOrdersData.forEach((srcEachOrdersData) => {
            const orderId = srcEachOrdersData.id;
            newOrdersData.push({
              ...srcEachOrdersData.data(),
              orderId,
            });
          });
          return newOrdersData;
        });
    }
    // eslint-disable-next-line consistent-return
    return firestore
      .collection('orders')
      .where('uid', '==', currentUid)
      .where('status', '==', orderStatus)
      .orderBy('updateTime', 'desc')
      .limit(8)
      .get()
      .then((srcOrdersData) => {
        if (srcOrdersData.empty) {
          return null;
        }
        const newOrdersData = [];
        srcOrdersData.forEach((srcEachOrdersData) => {
          const orderId = srcEachOrdersData.id;
          newOrdersData.push({
            ...srcEachOrdersData.data(),
            orderId,
          });
        });
        return newOrdersData;
      });
  };
  const updateOrdersData = async (orderStatus = null) => {
    if (ColumnMessageRef.current) {
      ColumnMessageRef.current.classList.add('op-zero');
    }
    LoaderDotModalRef.current.classList.remove('op-zero');
    LoaderDotModalRef.current.addEventListener(
      'transitionend',
      () => {
        LoaderDotModalRef.current.classList.add('op-zero');
      },
      { once: true },
    );
    const newOrdersData = await fetchOrdersData(orderStatus);
    if (!newOrdersData) {
      setOrdersData(newOrdersData);
      LoaderDotModalRef.current.classList.add('op-zero');
      if (ColumnMessageRef.current) {
        ColumnMessageRef.current.classList.remove('op-zero');
      }
      return;
    }
    const newConvertedOrdersData = await Promise.all(
      newOrdersData.map((orderData) => {
        return initOrderData(orderData);
      }),
    );
    LoaderDotModalRef.current.classList.add('op-zero');
    // if (ColumnMessageRef.current) {
    //   ColumnMessageRef.current.classList.remove('op-zero');
    // }
    setOrdersData(newConvertedOrdersData);
  };
  const handleButtonOrderTypeClck = (indexValue, statusValue) => {
    setCurrentButtonOrderTypeIdx(indexValue);
    updateOrdersData(statusValue);
  };

  useEffect(() => {
    updateOrdersData();
  }, [currentUid]);
  useEffect(() => {
    //
  }, [ordersData]);
  return (
    <StyledUserOrders>
      <div className="orderTypeBar">
        <div className="orderTypeBarScroll">
          {BUTTON_ORDER_TYPE_ARR.map((buttonData, index) => {
            const { name, status } = buttonData;
            if (index === currentButtonOrderTypeIdx) {
              return (
                <button
                  className="selected"
                  type="button"
                  onClick={() => {
                    handleButtonOrderTypeClck(index, status);
                  }}
                >
                  {name}
                </button>
              );
            }
            return (
              <button
                type="button"
                onClick={() => {
                  handleButtonOrderTypeClck(index, status);
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="OrderCardsContainer">
        {!ordersData ? (
          <ColumnMessage
            text="目前無相關購買訂單"
            img={<IconShared.NoOrder />}
            ColumnMessageRef={ColumnMessageRef}
          />
        ) : (
          ordersData.map((orderData) => (
            <OrderCard
              orderData={orderData}
              showModolMessageFunctionDev={showModolMessageFunctionDev}
            />
          ))
        )}
      </div>
      <LoaderDotModal LoaderDotModalRef={LoaderDotModalRef} />
    </StyledUserOrders>
  );
};

export default UserOrders;
