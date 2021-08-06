/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
import { React, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from '../../utils/firebase/firebase-services';
import UserContent from './UserContent';

import IconShared from '../../styles/shared/IconShared';
import ModalMessage from '../app/ModalMessage';
import StyledUser from '../../styles/AuthPage/StyledUser';

const USER_CONTENT_DASHBOARD_OBJ = {
  account: {
    name: (
      <span>
        <IconShared.Account />
        我的帳戶
      </span>
    ),
    path: '/account',
  },
  orders: {
    name: (
      <span>
        <IconShared.Order />
        購買訂單
      </span>
    ),
    path: '/orders',
  },
};

// eslint-disable-next-line no-unused-vars
const User = ({ isSignIn, updateConfigNavBar }) => {
  // console.log('isSignIn: ', isSignIn);
  const history = useHistory();
  const { pathname } = useLocation();
  const currentUid = isSignIn;
  const ModolMessageFunctionDevRef = useRef(null);
  const redirect2SiginIn = () => {
    history.push('/auth/signIn');
  };
  // auth.currentUser();
  // eslint-disable-next-line no-unused-vars
  const handleButtonClick = async () => {
    await auth.signOut();
    redirect2SiginIn();
  };
  const showModolMessageFunctionDev = () => {
    ModolMessageFunctionDevRef.current.classList.remove('op-zero');
    ModolMessageFunctionDevRef.current.addEventListener('transitionend', () => {
      ModolMessageFunctionDevRef.current.classList.add('op-zero');
    });
  };
  const getUserContentDashboardItems = () => {
    return Object.keys(USER_CONTENT_DASHBOARD_OBJ).map((pathKey) => {
      const { name, path } = USER_CONTENT_DASHBOARD_OBJ[pathKey];
      return (
        <button
          key={name}
          className="item"
          type="button"
          onClick={() => {
            const srcPathArr = pathname.split('/');
            srcPathArr.pop();
            const newPath = srcPathArr.join('/').concat(path);
            // console.log('newPath: ', newPath);
            if (path === '/account') {
              showModolMessageFunctionDev();
              return;
            }
            history.push(newPath);
          }}
        >
          {name}
        </button>
      );
    });
  };
  useEffect(() => {
    updateConfigNavBar({ title: '會員中心', buttonName: '登出', handleButtonClick });
  }, []);
  return (
    <StyledUser>
      {!isSignIn ? (
        redirect2SiginIn()
      ) : (
        <div className="userContentContainer">
          <div className="userInfoBar">
            {/* <img alt="" src={IconLogoMono} /> */}
            <div className="img">
              <IconShared.LogoMono />
            </div>
            <div className="textUserInfo">
              <h3>{isSignIn}</h3>
              <p className="textMemberType">
                <span>普通會員</span>
              </p>
            </div>
          </div>
          <div>
            <div className="userContentDashboard">{getUserContentDashboardItems()}</div>
            <UserContent
              currentUid={currentUid}
              showModolMessageFunctionDev={showModolMessageFunctionDev}
            />
          </div>
        </div>
      )}
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
    </StyledUser>
  );
};

export default User;
