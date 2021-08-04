/* eslint-disable no-unused-vars */
import { React, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import HistoryBackword from '../shared/HistoryBackword';
import LoaderDotFullPage from '../shared/LoaderDotFullPage';
import PaymentPage from '../../pages/PaymentPage';
import { firestore } from '../../utils/firebase/firebase-services';

const AuthPaymentPage = ({ isSignIn }) => {
  const currentUid = isSignIn;
  const preIsSignIn = useRef(null);
  const { orderId } = useParams();
  const history = useHistory();
  const isCheckPaymentAuthTrigger = useRef(0);
  const [isPaymentAuthChecked, setIsPaymentAuthChecked] = useState(0);
  const [orderData, setOrderData] = useState(null);
  const fetchOrderData = () => {
    return firestore
      .collection('orders')
      .doc(orderId)
      .get()
      .then((srcOrderData) => {
        if (!srcOrderData.exists) {
          return null;
        }
        // console.log(srcOrderData.exists);
        return {
          ...srcOrderData.data(),
          orderId,
        };
      });
  };
  const checkPaymentAuth = async () => {
    isCheckPaymentAuthTrigger.current = 1;
    const newOrderData = await fetchOrderData();
    if (!newOrderData || newOrderData.uid !== currentUid) {
      console.log(2);
      setIsPaymentAuthChecked(2);
      return;
    }
    setOrderData(newOrderData);
  };
  useEffect(() => {
    // console.log('isSignIn: ', isSignIn);
    const innerHistoryBackwordIfNoAnswer = () => {
      if (currentUid) {
        return;
      }
      // console.log(true);
      history.push('/');
    };
    innerHistoryBackwordIfNoAnswer.bind(this);
    const HistoryBackwordIfNoAnswer = setTimeout(innerHistoryBackwordIfNoAnswer, 2000);
    if (preIsSignIn.current !== isSignIn) {
      checkPaymentAuth();
    }
    return () => {
      clearTimeout(HistoryBackwordIfNoAnswer);
    };
  }, [isSignIn]);
  useEffect(() => {
    // console.log('rerender');
  }, [isPaymentAuthChecked]);
  useEffect(() => {
    if (!isCheckPaymentAuthTrigger.current) {
      return;
    }
    setIsPaymentAuthChecked(1);
  }, [orderData]);

  const getPaymentPageContent = () => {
    if (!isPaymentAuthChecked) {
      return <LoaderDotFullPage />;
    }
    if (isPaymentAuthChecked === 2) {
      return <HistoryBackword />;
    }
    return <PaymentPage orderData={orderData} isSignIn={isSignIn} />;
  };
  return <div>{getPaymentPageContent()}</div>;
};

export default AuthPaymentPage;
