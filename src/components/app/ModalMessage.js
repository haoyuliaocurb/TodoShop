/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { React } from 'react';
import StyledModalMessage from '../../styles/app/StyledModalMessage';
import IconAppContent from '../../styles/app/IconAppContent';

const ModalMessage = ({ message, ModolMessageRef, mask, IconInfo = 1 }) => {
  const isShowMask = !mask ? 0 : 1;
  const isShowIconInfo = !IconInfo ? 0 : 1;
  return (
    <StyledModalMessage ref={ModolMessageRef} className="op-zero" isShowMask={isShowMask} isShowIconInfo={isShowIconInfo}>
      <div className="messageBox">
        {!isShowIconInfo ? (
          <div />
        ) : (
          <div className="img">
            <IconAppContent.Info />
          </div>
        )}
        <h3 className="message center">{message}</h3>
      </div>
    </StyledModalMessage>
  );
};

export default ModalMessage;
