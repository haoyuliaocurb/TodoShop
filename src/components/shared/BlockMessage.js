import { React } from 'react';
import StyledBlockMessage from '../../styles/shared/StyledBlockMessage';
import { styledVariables } from '../../styles/app/cssMaterial';

// eslint-disable-next-line no-unused-vars
const BlockMessage = ({ img, text, color }) => {
  const innerColor = !color ? styledVariables.color.gray300 : color;
  return (
    <StyledBlockMessage className="BlockMessage" innerColor={innerColor}>
      <div>
        {!img ? <span /> : <div className="img">{img}</div>}
        <p className="text">{text}</p>
      </div>
    </StyledBlockMessage>
  );
};

export default BlockMessage;
