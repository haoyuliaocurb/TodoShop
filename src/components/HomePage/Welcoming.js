import { React, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import StyledWelcoming from '../../styles/HomePage/StyledWelcoming';
import welcomingImg from '../../styles/HomePage/images/welcoming.jpeg';
import IconShared from '../../styles/shared/IconShared';

const Welcoming = () => {
  const history = useHistory();
  const buttonMenu = useRef(null);
  const sideMenu = useRef(null);
  const isButtonMenuClicked = useRef(0);
  const handleButtonMenuClick = () => {
    console.log('isButtonMenuClicked.current: ', isButtonMenuClicked.current);
    if (isButtonMenuClicked.current) {
      buttonMenu.current.classList.remove('close');
      sideMenu.current.classList.add('close');
      isButtonMenuClicked.current = 0;
      return;
    }
    buttonMenu.current.classList.add('close');
    sideMenu.current.classList.remove('close');
    isButtonMenuClicked.current = 1;
  };
  const handleButtonTodolistClike = () => {
    history.push('/todolist');
  };

  return (
    <StyledWelcoming>
      <nav>
        <button type="button" className="buttonItem">
          關於我們
        </button>
        <button type="button" className="buttonItem">
          服務介紹
        </button>
        <button
          ref={buttonMenu}
          type="button"
          className="buttonMenu"
          onClick={handleButtonMenuClick}
        >
          <span className="buttonMenu-first" />
          <span className="buttonMenu-second" />
          <span className="buttonMenu-thrid" />
        </button>
        <div ref={sideMenu} className="sideMenu close">
          <button type="button" className="sideMenuItem">
            關於我們
          </button>
          <button type="button" className="sideMenuItem">
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
    </StyledWelcoming>
  );
};

export default Welcoming;
