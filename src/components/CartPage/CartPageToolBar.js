/* eslint-disable prettier/prettier */
import { React, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import StyledCartPageToolBar from '../../styles/CartPage/StyledCartPageToolBar';
import { firestore, firebase } from '../../utils/firebase/firebase-services';
import IconSelectAll from '../app/IconSelectAll';
import ModalMessageChecked from '../app/ModalMessageChecked';
import ModalMessage from '../app/ModalMessage';

const CartPageToolBar = ({
  cartedProductPriceSum,
  buttonState,
  updateButtonState,
  cartData,
  deleteProductActionCart,
  currentUid,
}) => {
  // console.log('cartData: ', cartData);
  const toolBarState = !buttonState.management ? 1 : 2;
  const ModolCheckedCreateOrderRef = useRef(null);
  const ModalMessagAddAtLeastOneItemRef = useRef(null);
  const history = useHistory();
  // console.log('<TodolistPageToolBar />: render');
  const getButtonSelectAllState = () => {
    if (!buttonState) {
      return 0;
    }
    if (!buttonState.buttonSelectAll) {
      if (cartData) {
        const isSidAllSelected = cartData.every((eachCartData) => {
          const { sid } = eachCartData;
          return buttonState[sid] && buttonState[sid].isOnClick;
        });
        if (isSidAllSelected) {
          return 1;
        }
      }
      return 0;
    }
    return 1;
  };
  const buttonSelectAllState = getButtonSelectAllState();
  const handleIconSelectAllClick = () => {
    // console.log('handleIconSelectAllClick');
    const newUpdateButtonStatePart = {};
    if (!buttonSelectAllState) {
      newUpdateButtonStatePart.buttonSelectAll = 1;
      cartData.forEach((eachCartData) => {
        const { sid } = eachCartData;
        if (!newUpdateButtonStatePart[sid]) {
          newUpdateButtonStatePart[sid] = {};
        }
        newUpdateButtonStatePart[sid].isOnClick = 1;
      });
      updateButtonState(newUpdateButtonStatePart);
      return;
    }
    newUpdateButtonStatePart.buttonSelectAll = 0;
    cartData.forEach((eachCartData) => {
      const { sid } = eachCartData;
      newUpdateButtonStatePart[sid] = {};
    });
    updateButtonState(newUpdateButtonStatePart);
  };
  const handleButtonDeleteClick = () => {
    const pid2DeleteArray = [];
    cartData.forEach((eachCartData) => {
      const { sid } = eachCartData;
      if (buttonState[sid]) {
        // console.log('buttonState[sid]: ', buttonState[sid]);
        const srcPid2DeleteObjPart = buttonState[sid];
        delete srcPid2DeleteObjPart.isOnClick;
        Object.entries(srcPid2DeleteObjPart).forEach((pair) => {
          if (pair[1] === 0) {
            return;
          }
          pid2DeleteArray.push(pair[0]);
        });
        // pid2DeleteArray = pid2DeleteArray.concat(Object.keys(srcPid2DeleteObjPart));
        // console.log('pid2DeleteArray: ', pid2DeleteArray);
      }
    });
    deleteProductActionCart(pid2DeleteArray);
  };
  const handleButtonCreateOrder = async () => {
    const sidKeysArr = Object.keys(buttonState).filter((key) => /\S{20}/.test(key));
    if (!sidKeysArr.length) {
      ModalMessagAddAtLeastOneItemRef.current.classList.remove('op-zero');
      ModalMessagAddAtLeastOneItemRef.current.addEventListener('transitionend', () => {
        ModalMessagAddAtLeastOneItemRef.current.classList.add('op-zero');        
      }, { once: true });
      return;
    }
    const storePidsObj = {};
    const storePidsArr = sidKeysArr.map((sidKey) => buttonState[sidKey]);
    storePidsArr.forEach((storePids, index) => {
      const newPidsKeyArr = Object.keys(storePids).filter((key) => /\S{20}/.test(key));
      const filtedNewPidsKeyArr = newPidsKeyArr.filter((pidKey) => storePids[pidKey] !== 0);
      if (filtedNewPidsKeyArr.length < 1) {
        return;
      }
      const storePidsKeyObj = {};
      filtedNewPidsKeyArr.forEach((pidKey) => {
        storePidsKeyObj[pidKey] = 1;
      });
      storePidsObj[sidKeysArr[index]] = storePidsKeyObj;
    });
    // console.log('storePidsObj: ', storePidsObj);
    const newOrderProductsData = [];
    cartData.forEach((eachCartData) => {
      const { sid } = eachCartData;
      if (!storePidsObj[sid]) {
        return;
      }
      eachCartData.products.forEach((eachProductData) => {
        const { pid, cartAmount: amount } = eachProductData;
        // console.log('storePidsObj[sid]: ', storePidsObj[sid]);
        if (!storePidsObj[sid][pid]) {
          return;
        }
        newOrderProductsData.push({
          pid,
          amount,
        });
      });
    });
    // console.log('newOrderProductsData.length: ', newOrderProductsData.length);
    // console.log('newOrderProductsData: ', newOrderProductsData);
    const newDocId = firestore.collection('orders').doc().id;
    console.log('newDocId: ', newDocId);
    const isOrderBuilded = await firestore
      .collection('orders')
      .doc(newDocId)
      .set({
        products: newOrderProductsData,
        uid: currentUid,
        status: 0,
      })
      .then(() => {
        return firestore
          .collection('orders')
          .doc(newDocId)
          .get()
          .then((srcData) => {
            console.log('srcData.exists: ', srcData.exists);
            const data = srcData.data();
            console.log('data.status: ', data.status);
            if (!srcData.exists || data.status !== 0) {
              // 未成功建立 order
              return 0;
            }
            return 1;
          });
      });
    if (!isOrderBuilded) {
      // 未成功建立 order
      return;
    }
    Promise.all(
      newOrderProductsData.map((productData) => {
        const { pid } = productData;
        return firestore
          .collection('users')
          .doc(currentUid)
          .collection('productAction')
          .doc(pid)
          .update({
            cart: firebase.firestore.FieldValue.delete(),
          });
      }),
    ).then(() => {
      // console.log('successfully delete carted');
      ModolCheckedCreateOrderRef.current.classList.remove('op-zero');
      ModolCheckedCreateOrderRef.current.addEventListener('transitionend', () => {
        ModolCheckedCreateOrderRef.current.classList.add('op-zero');
        ModolCheckedCreateOrderRef.current.addEventListener('transitionend', () => {
          history.push(`/payment/${newDocId}`);
        }, { once: true })
      }, { once: true });
    });
  };
  const getToolBarContent = (toolBarStateValue) => {
    switch (toolBarStateValue) {
      case 2:
        return (
          <div>
            <button type="button" className="buttonSelectAll">
              <IconSelectAll
                buttonSelectAllState={buttonSelectAllState}
                handleIconSelectAllClick={handleIconSelectAllClick}
              />
              <p>全選</p>
            </button>
            <button type="button" className="buttonDeleteCard" onClick={handleButtonDeleteClick}>
              刪除
            </button>
          </div>
        );
      default:
        return (
          <div>
            <button type="button" className="buttonSelectAll">
              <IconSelectAll
                buttonSelectAllState={buttonSelectAllState}
                handleIconSelectAllClick={handleIconSelectAllClick}
              />
              <p>全選</p>
            </button>
            <div className="sumPriceText">
              <p>合計</p>
              <span className="sumPrice">
                <h3>$</h3>
                <h3>{cartedProductPriceSum}</h3>
              </span>
            </div>
            <button type="button" className="buttonPayment" onClick={handleButtonCreateOrder}>
              結算
            </button>
            <ModalMessageChecked
              message={<span>成功新增訂單</span>}
              ModolMessageCheckedeRef={ModolCheckedCreateOrderRef}
            />
            <ModalMessage ModolMessageRef={ModalMessagAddAtLeastOneItemRef} message={<span>選擇至少一個商品<br />以建立新訂單</span>}/>
          </div>
        );
    }
  };
  return <StyledCartPageToolBar>{getToolBarContent(toolBarState)}</StyledCartPageToolBar>;
};

export default CartPageToolBar;
