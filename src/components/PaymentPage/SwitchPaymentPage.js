/* eslint-disable no-unused-vars */
import { React, useEffect, useRef, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import AuthPaymentPage from './AuthPaymentPage';
import HistoryBackword from '../shared/HistoryBackword';

const SwitchPaymentPage = ({ isSignIn }) => {
  return (
    <Switch>
      <Route exact path="/payment/:orderId">
        <AuthPaymentPage isSignIn={isSignIn} />
      </Route>
      <Route>
        <HistoryBackword />
      </Route>
    </Switch>
  );
};

export default SwitchPaymentPage;
