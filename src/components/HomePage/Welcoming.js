import { React, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import StyledWelcoming from '../../styles/HomePage/StyledWelcoming';
import welcomingImg from '../../styles/HomePage/images/welcoming.jpeg';
import IconShared from '../../styles/shared/IconShared';
import ModalMessage from '../app/ModalMessage';

const Welcoming = ({ sideMenuRef, buttonMenuRef, handleButtonMenuClick }) => {
  const history = useHistory();
  const ModolMessageFunctionDevRef = useRef(null);
  const handleButtonTodolistClike = () => {
    history.push('/todolist');
  };
  const handleNavItemClick = () => {
    ModolMessageFunctionDevRef.current.classList.remove('op-zero');
    ModolMessageFunctionDevRef.current.addEventListener('transitionend', () => {
      ModolMessageFunctionDevRef.current.classList.add('op-zero');
    });
  };

  return (
    <StyledWelcoming>
      <nav>
        <button type="button" className="buttonItem" onClick={handleNavItemClick}>
          關於我們
        </button>
        <button type="button" className="buttonItem" onClick={handleNavItemClick}>
          服務介紹
        </button>
        <button
          ref={buttonMenuRef}
          type="button"
          className="buttonMenu"
          onClick={handleButtonMenuClick}
        >
          <span className="buttonMenu-first" />
          <span className="buttonMenu-second" />
          <span className="buttonMenu-thrid" />
        </button>
        <div ref={sideMenuRef} className="sideMenu close">
          <button type="button" className="sideMenuItem" onClick={handleNavItemClick}>
            關於我們
          </button>
          <button type="button" className="sideMenuItem" onClick={handleNavItemClick}>
            服務介紹
          </button>
        </div>
      </nav>
      <img alt="" src={welcomingImg} />
      <div className="welcomingTitle">
        <h1>
          <span className="textStartFrom">
            <span>從</span>
            <span className="textTodolist">購物清單</span>
            <span className="textStart">開始</span>
          </span>
          <span className="textTodoShop">
            <span className="textTodo">Todo</span>
            <span className="textShop">Shop</span>
          </span>
          <span className="textInnovation">
            <span className="textInno">創新</span>
            <span className="textWeb">電商網站</span>
          </span>
        </h1>
        <button type="button" onClick={handleButtonTodolistClike}>
          <p>建立購物清單</p>
          <IconShared.ChenvronRight />
        </button>
      </div>
      <div className="divider">
        <h1 className="titleLeft">TODOSHOP</h1>
        <h1 className="titleRight hiddenWhenSmallScreen">TODOSHOP</h1>
        <div className="line" />
      </div>
      <ModalMessage
        message={
          <span>
            相關功能開發中
            <br />
            敬請期待
          </span>
        }
        ModolMessageRef={ModolMessageFunctionDevRef}
      />
    </StyledWelcoming>
  );
};

export default Welcoming;
