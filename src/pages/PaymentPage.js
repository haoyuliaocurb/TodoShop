/* eslint-disable no-unused-vars */
import { React, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StyledPaymentPage from '../styles/PaymentPage/StyledPaymentPage';
import HistoryBackword from '../components/shared/HistoryBackword';
import LoaderDotFullPage from '../components/shared/LoaderDotFullPage';
import { firestore } from '../utils/firebase/firebase-services';

const PaymentPage = ({ isSignIn }) => {
  const currentUid = isSignIn;
  const preIsSignIn = useRef(null);
  const { orderId } = useParams();
  const history = useHistory();
  const [isPaymentAuthChecked, setIsPaymentAuthChecked] = useState(0);
  const fetchOrderData = () => {
    return firestore
      .collection('orders')
      .doc(orderId)
      .get()
      .then((srcOrderData) => {
        if (!srcOrderData.exists) {
          return null;
        }
        console.log(srcOrderData.exists);
        return srcOrderData.data();
      });
  };
  const checkPaymentAuth = async () => {
    const newOrderData = await fetchOrderData();
    if (!newOrderData || newOrderData.uid !== currentUid) {
      console.log(2);
      setIsPaymentAuthChecked(2);
      return;
    }
    setIsPaymentAuthChecked(1);
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

  const getPaymentPageContent = () => {
    if (!isPaymentAuthChecked) {
      return <LoaderDotFullPage />;
    }
    if (isPaymentAuthChecked === 2) {
      return <HistoryBackword />;
    }
    return <p>paymentPage</p>;
  };
  return <StyledPaymentPage>{getPaymentPageContent()}</StyledPaymentPage>;
};

export default PaymentPage;
