/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from 'react';
import StyledTapPayFields from '../../styles/PaymentPage/StyledTapPayFields';

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
      'font-size': '16px',
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
const TapPayFields = () => {
  // const [isTapPaySDKSet, setIsTapPaySDKSet] = useState(0);
  const TAPPAY_APP_ID = 20704;
  const TAPPAY_APP_KEY = 'app_aZCYMha5Pc1ywLOxmUgD3O1g3i90rnEx7DFMqwf1QGpEZgpRvF96fFMC2h8i';

  // eslint-disable-next-line no-unused-vars
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
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      return;
    }
    // const prime = await getTPPrime();
    // console.log('prime: ', prime);
    const response = await fetch('https://us-central1-todoshop-5fd25.cloudfunctions.net/widgets/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        phoneNumber: '0958155898',
        name: 'haoyuliao',
        email: 'haoyuliaocurb@gmail.com',
        priceSum: 1000,
      }})
      .then((srcData) => srcData.json);
    console.log('response: ', response);
    // let dateStringObj = lib.transferMysqlDateString(bookingDataArray[i]['date']);
    // model.section_unpaidBooking._fetchPostOrderMaterial = {
    //     prime: null,
    //     order: {
    //         id: bookingDataArray[i].id,
    //         price: bookingDataArray[i]['price'],
    //         trip: {
    //             attraction: {
    //             id: bookingDataArray[i]['attraction']['id'],
    //             name: bookingDataArray[i]['attraction']['name'],
    //             address: bookingDataArray[i]['attraction']['address'],
    //             image: bookingDataArray[i]['attraction']['image']
    //             },
    //             date: `${dateStringObj['year']}-${dateStringObj['month']}-${dateStringObj['day']}`,
    //             time: bookingDataArray[i]['time']
    //         },
    //         contact: {
    //             name: gen.exportFunc.getSignInData().name,
    //             email: gen.exportFunc.getSignInData().email,
    //             phone: contact_label_phone_input.value,
    //         },
    //     }
    // }
    // controller.section_unpaidBooking.postOrder();
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    TPDirect.setupSDK(TAPPAY_APP_ID, TAPPAY_APP_KEY, 'sandbox');
    // eslint-disable-next-line no-undef
    TPDirect.card.setup(TP_FIELDS_CONFIG);
  }, []);

  return (
    <StyledTapPayFields onSubmit={handleSubmit}>
      <div className="tpfield" id="card-number" />
      <div className="tpfield" id="card-expiration-date" />
      <div className="tpfield" id="card-ccv" />
      <button type="submit">送出</button>
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
