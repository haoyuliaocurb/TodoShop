/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import StyledTapPayFields from '../../styles/PaymentPage/StyledTapPayFields';
import LoaderDotModal from '../shared/LoaderDotModal';
import ModalMessageError from '../app/ModalMessageError';
import ModalMessageChecked from '../app/ModalMessageChecked';
import { firestore } from '../../utils/firebase/firebase-services';

const TP_FIELDS = {
  number: {
    element: '#card-number',
    placeholder: '**** **** **** ****',
  },
  expirationDate: {
    element: '#card-expiration-date',
    placeholder: 'MM / YY',
  },
  ccv: {
    element: '#card-ccv',
    placeholder: 'ccv',
  },
};
const TP_FIELDS_CONFIG = {
  fields: TP_FIELDS,
  styles: {
    'input': {
      'color': 'black',
      'font-family': 'Noto Sans TC',
      'font-style': 'normal',
      'font-size': '12px',
      'line-height': '21px',
      'font-weight': 'normal',
    },
    ':focus': {
      'color': 'black',
    },
    '.valid': {
      'color': 'green',
    },
    '.invalid': {
      'color': 'red',
    },
    '@media screen and (max-width: 400px)': {
      'input': {
          'color': 'orange',
      },
    },
  },
};
const TapPayFields = ({ orderPriceSum, orderUserInfo, orderId }) => {
  // const [isTapPaySDKSet, setIsTapPaySDKSet] = useState(0);
  const TAPPAY_APP_ID = 20704;
  const TAPPAY_APP_KEY = 'app_aZCYMha5Pc1ywLOxmUgD3O1g3i90rnEx7DFMqwf1QGpEZgpRvF96fFMC2h8i';
  const LoaderDotModalRef = useRef(null);
  const ModolMessagErrorSubmitRef = useRef(null);
  const ModolMessagCheckedSubmitRef = useRef(null);
  const ModolMessagErrorUpdateDBRef = useRef(null);
  const history = useHistory();

  const getTPPrime = () => {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-undef
      TPDirect.card.getPrime((result) => {
        if (result.status === 0) {
          resolve(result.card.prime);
        }
        else {
          console.log('error message of getting  tappay prime: ', result.msg);
        }
      });
    });
  };
  const handleTapPayFieldsSubmit = async () => {
    if (!orderPriceSum) {
      console.log('orderPriceSum is empty');
      return;
    }
    if (!orderUserInfo) {
      console.log('orderUserInfo columns is empty');
      return;
    };
    const { phoneNumber, name, email } = orderUserInfo;
    if (!phoneNumber || !name || !email) {
      console.log('orderUserInfo columns is empty');
      return;
    }
    const checkCardDetailsForm = () => {
      // eslint-disable-next-line no-undef
      const tappayStatus = TPDirect.card.getTappayFieldsStatus();
      // console.log('tappayStatus: ', tappayStatus);
      if (!tappayStatus.canGetPrime) {
        return false;
      }
      return true;
    };
    if (!checkCardDetailsForm()) {
      console.log('cardDetails columns is empty');
      return;
    }
    LoaderDotModalRef.current.classList.remove('op-zero');
    // eslint-disable-next-line no-unused-vars
    const prime = await getTPPrime();
    // console.log('prime: ', prime);
    const response = await fetch('https://us-central1-todoshop-5fd25.cloudfunctions.net/widgets/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        name,
        email,
        priceSum: orderPriceSum,
      })})
      .then((responseValue) => {
        // console.log(responseValue.status);
        return responseValue.json();
      })
      .then((data) => {
        return data;
      });
    // console.log('response: ', response);
    if (response.status !== 0) {
      LoaderDotModalRef.current.classList.add('op-zero');
      LoaderDotModalRef.current.addEventListener('transitionend', () => {
        ModolMessagErrorSubmitRef.current.classList.remove('op-zero');
        ModolMessagErrorSubmitRef.current.addEventListener('transitionend', () => {
          ModolMessagErrorSubmitRef.current.classList.add('op-zero');
        }, { once: true });          
      }, { once: true })
      return;
    }
    const checkStatus = await firestore.collection('orders').doc(orderId).update({ status: 1 }).then(async () => {
      const srcCheckStatus = await firestore.collection('orders').doc(orderId).get();
      if (!srcCheckStatus.exists) {
        return 0;
      }
      return srcCheckStatus.data();
    });
    if (!checkStatus) {
      LoaderDotModalRef.current.classList.add('op-zero');
      LoaderDotModalRef.current.addEventListener('transitionend', () => {
        ModolMessagErrorUpdateDBRef.current.classList.remove('op-zero');
        ModolMessagErrorUpdateDBRef.current.addEventListener('transitionend', () => {
          ModolMessagErrorUpdateDBRef.current.classList.add('op-zero');
        }, { once: true });
      }, { once: true });
      return;
    }
    LoaderDotModalRef.current.classList.add('op-zero');
    LoaderDotModalRef.current.addEventListener('transitionend', () => {
      ModolMessagCheckedSubmitRef.current.classList.remove('op-zero');
      ModolMessagCheckedSubmitRef.current.addEventListener('transitionend', () => {
        ModolMessagCheckedSubmitRef.current.classList.add('op-zero');
        ModolMessagCheckedSubmitRef.current.addEventListener('transitionend', () => {
          history.push('/cart');
        }, { once: true })
      }, { once: true });
    }, { once: true });
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    TPDirect.setupSDK(TAPPAY_APP_ID, TAPPAY_APP_KEY, 'sandbox');
    // eslint-disable-next-line no-undef
    TPDirect.card.setup(TP_FIELDS_CONFIG);
  }, []);
  useEffect(() => {
    // ModolMessagErrorUpdateDBRef.current.classList.remove('op-zero');
  }, []);

  return (
    <StyledTapPayFields
      onSubmit={(e) => {
        e.preventDefault();
        handleTapPayFieldsSubmit();
      }}
      className="block"
    >
      <div className="title">
        <h3>信用卡資訊</h3>
      </div>
      <div className="label">
        <p>信用卡號</p>
        <div className="tpfield" id="card-number" />
      </div>
      <div className="label">
        <p>有效期限</p>
        <div className="tpfield" id="card-expiration-date" />
      </div>
      <div className="label">
        <p>驗證碼</p>
        <div className="tpfield" id="card-ccv" />
      </div>
      <button type="submit">
        <p>確認付款</p>
      </button>
      <LoaderDotModal LoaderDotModalRef={LoaderDotModalRef} />
      <ModalMessageError ModolMessagErrorRef={ModolMessagErrorSubmitRef} message={<span>付款連線未成功<br />請再試一次</span>} />
      <ModalMessageError ModolMessagErrorRef={ModolMessagErrorUpdateDBRef} message={<span>資料庫連線未成功<br />請聯繫客服</span>} />
      <ModalMessageChecked ModolMessageCheckedeRef={ModolMessagCheckedSubmitRef} message={<span>付款成功</span>} />
    </StyledTapPayFields>
  );
};

export default TapPayFields;

// useEffect(() => {
//   if (isTapPaySDKSet) {
//     return;
//   }
//   const TapPaySDK = document.createElement('script');
//   TapPaySDK.src = 'https://js.tappaysdk.com/tpdirect/v5.7.0';
//   TapPaySDK.defer = true;
//   document.body.appendChild(TapPaySDK);
//   setIsTapPaySDKSet(1);
//   // eslint-disable-next-line consistent-return
//   return () => {
//     document.body.removeChild(TapPaySDK);
//   };
// }, []);
// useEffect(() => {
//   if (!isTapPaySDKSet) {
//     return;
//   }
//   console.log('document.body.childNodes: ', document.body.childNodes);
//   // eslint-disable-next-line no-undef
//   TPDirect.setupSDK(TAPPAY_APP_ID, TAPPAY_APP_KEY, 'sandbox');
//   // eslint-disable-next-line no-undef
//   TPDirect.card.setup(TP_FIELDS_CONFIG);
// }, [isTapPaySDKSet]);
