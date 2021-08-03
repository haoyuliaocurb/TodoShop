import { React, useState, useEffect } from 'react';
import StyledPaymentPage from '../styles/PaymentPage/StyledPaymentPage';
import { firestore } from '../utils/firebase/firebase-services';
import TapPayFields from '../components/PaymentPage/TapPayFields';

// eslint-disable-next-line no-unused-vars
const PaymentPage = ({ isSignIn, orderData }) => {
  // console.log('isSignIn: ', isSignIn);
  // console.log('orderData: ', orderData);
  const [fullOrderData, setFullOrderData] = useState(null);
  const [orderPriceSum, setOrderPriceSum] = useState(null);
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

  return (
    <StyledPaymentPage>
      <button type="button">付款</button>
      <p>{!orderPriceSum ? 0 : orderPriceSum}</p>
      <TapPayFields />
    </StyledPaymentPage>
  );
};

export default PaymentPage;
