import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledCartPageNavBar from '../../styles/CartPage/StyledCartPageNavBar';

const CartPageNavBar = ({ buttonState, updateButtonState }) => {
  const getButtonManagementContent = () => {
    if (!buttonState) {
      return '管理';
    }
    if (!buttonState.management) {
      return '管理';
    }
    return '編輯';
  };
  const buttonManagementContent = getButtonManagementContent();
  const history = useHistory();
  const handleChevronLeftClick = () => {
    history.go(-1);
  };
  const handleButtonManagementClick = () => {
    const newUpdateButtonStatePart = {};
    if (buttonManagementContent === '管理') {
      newUpdateButtonStatePart.management = 1;
    } else {
      newUpdateButtonStatePart.management = 0;
    }
    console.log('newUpdateButtonStatePart: ', newUpdateButtonStatePart);
    updateButtonState(newUpdateButtonStatePart, 3);
  };

  return (
    <StyledCartPageNavBar>
      <Link
        to="/todolist/table"
        onClick={(e) => {
          e.preventDefault();
          handleChevronLeftClick();
        }}
      >
        <IconAppContent.ChevronLeft />
      </Link>
      <h1>購物車</h1>
      <button onClick={handleButtonManagementClick} type="button">
        {buttonManagementContent}
      </button>
    </StyledCartPageNavBar>
  );
};

export default CartPageNavBar;
