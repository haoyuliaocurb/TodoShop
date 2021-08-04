import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledSimpleNavBar from '../../styles/shared/StyledSimpleNavBar';

const SimpleNavBar = () => {
  const history = useHistory();
  const handleChevronLeftClick = () => {
    history.go(-1);
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
      <h1>訂單付款</h1>
    </StyledSimpleNavBar>
  );
};

export default SimpleNavBar;
