import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledSimpleNavBar from '../../styles/shared/StyledSimpleNavBar';

const SimpleNavBar = ({ title, buttonName, handleButtonClick }) => {
  const history = useHistory();
  const innerButtonName = !buttonName ? null : buttonName;
  const handleChevronLeftClick = () => {
    history.go(-1);
  };
  const handleInnerButtonClick = () => {
    if (!handleButtonClick) {
      return;
    }
    handleButtonClick();
  };
  return (
    <StyledSimpleNavBar>
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          handleChevronLeftClick();
        }}
      >
        <IconAppContent.ChevronLeft />
      </Link>
      <h1>{title}</h1>
      {!innerButtonName ? (
        <span />
      ) : (
        <button type="button" onClick={handleInnerButtonClick}>
          {buttonName}
        </button>
      )}
    </StyledSimpleNavBar>
  );
};

export default SimpleNavBar;
