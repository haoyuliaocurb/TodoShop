// script
import { React, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// import { auth } from '../utils/firebase/firebase-services';

import Main from '../components/app/Main';
import TabBar from '../components/app/TabBar';
import IconApp from '../styles/app/IconApp';

// styling
import 'normalize.css';
import '../styles/app/general.css';
import { StyledNavBar, StyledToolBar, StyledApp } from '../styles/app/StyledAppComps';

const NavBar = () => {
  return (
    <StyledNavBar>
      <Link to="/todolist/table">
        <IconApp.ChevronLeft />
      </Link>
      <h1>您的購物清單</h1>
      <button type="submit">管理</button>
    </StyledNavBar>
  );
};

const ToolBar = () => {
  return (
    <StyledToolBar>
      <button type="button" className="buttonAddTodolist">
        新增購物清單 +
      </button>
    </StyledToolBar>
  );
};

function App() {
  // const testData = {
  //   user: {
  //     email: 'jeffery84115@gmail.com',
  //     password: 'haoyuliao'
  //   },
  // };
  useEffect(() => {});

  return (
    <Router>
      <StyledApp>
        <NavBar />
        <Main />
        <ToolBar />
        <TabBar />
      </StyledApp>
    </Router>
  );
}

export default App;
