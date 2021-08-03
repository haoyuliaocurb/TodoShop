import { React, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ModalMessage from '../app/ModalMessage';

const HistoryBackword = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const ModalMessageHistoryBackword = useRef(null);
  useEffect(() => {
    ModalMessageHistoryBackword.current.classList.remove('op-zero');
    // 備案：用 setTimeout 來 redirect
    setTimeout(() => {
      history.go(-1);
    }, 3000);
    ModalMessageHistoryBackword.current.addEventListener(
      'transitionend',
      () => {
        ModalMessageHistoryBackword.current.classList.add('op-zero');
        ModalMessageHistoryBackword.current.addEventListener(
          'transitionend',
          () => {
            history.go(-1);
          },
          { once: true },
        );
      },
      { once: true },
    );
  }, []);
  return (
    <div>
      <ModalMessage
        ModolMessageRef={ModalMessageHistoryBackword}
        message={<span>返回前一頁</span>}
        mask={1}
      />
    </div>
  );
};

export default HistoryBackword;
