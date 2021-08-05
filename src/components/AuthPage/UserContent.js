import { React } from 'react';
// eslint-disable-next-line no-unused-vars
import { Switch, Route } from 'react-router-dom';
import StyledUserContent from '../../styles/AuthPage/StyledUserContent';
import UserOrders from './UserOrders/UserOrders';

const UserContent = () => {
  return (
    <StyledUserContent className="UserContent">
      <Switch>
        <Route path="/auth/uid/:uid/account">
          <p>account</p>
        </Route>
        <Route path="/auth/uid/:uid/orders">
          <UserOrders />
        </Route>
      </Switch>
    </StyledUserContent>
  );
};

export default UserContent;
