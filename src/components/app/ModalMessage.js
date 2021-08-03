/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { React } from 'react';
import StyledModalMessage from '../../styles/app/StyledModalMessage';
import IconAppContent from '../../styles/app/IconAppContent';

const ModalMessage = ({ message, ModolMessageRef, mask }) => {
  const isShowMask = !mask ? 0 : 1;
  return (
    <StyledModalMessage ref={ModolMessageRef} className="op-zero" isShowMask={isShowMask}>
      <div className="messageBox">
        <div className="img">
          <IconAppContent.Info />
        </div>
        <h3 className="message">{message}</h3>
      </div>
    </StyledModalMessage>
  );
};

export default ModalMessage;
