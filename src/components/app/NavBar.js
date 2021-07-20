import { React } from 'react';
import { Link } from 'react-router-dom';
import IconApp from '../../styles/app/IconAppContent';
import StyledNavBar from '../../styles/app/StyledNavBar';

const NavBar = ({ navBarState }) => {
  return (
    <StyledNavBar className={navBarState ? '' : 'vb-hidden'}>
      <Link to="/todolist/table">
        <IconApp.ChevronLeft />
      </Link>
      <h1>您的購物清單</h1>
      <button type="submit">管理</button>
    </StyledNavBar>
  );
};

export default NavBar;
