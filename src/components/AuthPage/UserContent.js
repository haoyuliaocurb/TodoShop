import { React } from 'react';
// eslint-disable-next-line no-unused-vars
import { Switch, Route } from 'react-router-dom';
import StyledUserContent from '../../styles/AuthPage/StyledUserContent';
import UserOrders from './UserOrders/UserOrders';

const UserContent = ({ currentUid, showModolMessageFunctionDev }) => {
  return (
    <StyledUserContent className="UserContent">
      <Switch>
        <Route path="/auth/uid/:uid/account">
          <p>account</p>
        </Route>
        <Route path="/auth/uid/:uid/orders">
          <UserOrders
            currentUid={currentUid}
            showModolMessageFunctionDev={showModolMessageFunctionDev}
          />
        </Route>
      </Switch>
    </StyledUserContent>
  );
};

export default UserContent;
