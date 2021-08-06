import { React } from 'react';
import StyledColumnMessage from '../../styles/shared/StyledColumnMessage';

// eslint-disable-next-line no-unused-vars
const ColumnMessage = ({ img, text, ColumnMessageRef }) => {
  return (
    <StyledColumnMessage className="ColumnMessage" ref={ColumnMessageRef}>
      <div>
        {!img ? <span /> : <div className="img">{img}</div>}
        <p className="text">{text}</p>
      </div>
    </StyledColumnMessage>
  );
};

export default ColumnMessage;
