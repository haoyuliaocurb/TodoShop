import { React } from 'react';
import StyledIconSelectAll from '../../styles/app/StyledIconSelectAll';

const IconSelectAll = ({ buttonSelectAllState, handleIconSelectAllClick, display }) => {
  const getDisplayValue = () => {
    if (display === undefined) {
      return 1;
    }
    if (!display) {
      return 0;
    }
    return 1;
  };
  const displayValue = getDisplayValue();
  const handleClick = () => {
    if (!handleIconSelectAllClick) {
      return;
    }
    handleIconSelectAllClick();
  };
  return (
    <StyledIconSelectAll
      className={!displayValue ? 'iconSelectAll dp-none' : 'iconSelectAll'}
      onClick={handleClick}
    >
      <span className={!buttonSelectAllState ? 'dot vb-hidden' : 'dot'} />
    </StyledIconSelectAll>
  );
};

export default IconSelectAll;
