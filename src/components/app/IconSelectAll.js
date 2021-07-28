import { React } from 'react';
import StyledIconSelectAll from '../../styles/app/StyledIconSelectAll';

const IconSelectAll = ({ buttonSelectAllState }) => {
  return (
    <StyledIconSelectAll className="iconSelectAll">
      <span className={!buttonSelectAllState ? 'dot vb-hidden' : 'dot'} />
    </StyledIconSelectAll>
  );
};

export default IconSelectAll;
