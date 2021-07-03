import Todolist from '../features/todolistPages/Todolist.js'
import TodolistTable from '../features/todolistPages/TodolistTable.js'
import styled from '@emotion/styled'
import {
  useEffect,
} from 'react';
import { 
  firebase,
  auth,
  firestore
} from './firebase-services.js';

const styledVariables = {
  shared: {
    barHeight: '50px',
  },
  tabBar: {
    iconWidth: '30px',
  },
  navBar: {
    iconWidth: '30px',
  }
}

const StyledNavBar = styled.nav`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;      
    width: ${styledVariables.navBar.iconWidth};
    height: ${styledVariables.navBar.iconWidth};
  }

  > h1 {
    text-align: center;
  }

  > button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
    display: inline-block;
    width: ${styledVariables.navBar.iconWidth};
    height: ${styledVariables.navBar.iconWidth};
    // background-color: white;
    border: solid 1px black;
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar>
      <img />
      <h1>
        您的購物清單
      </h1>
      <button>
        管理
      </button>
    </StyledNavBar>
  )
}

const StyledTabBar = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  background-color: bisque;
  display: flex;
  flex-wrap: nowrap;

  > button {
    display: inline-block;
    flex: 100px 1 1;
    // border: solid blue 1px;
    // display: flex;

    > img {
      display: block;
      width: ${styledVariables.tabBar.iconWidth};
      height: ${styledVariables.tabBar.iconWidth};
      // background-color: white;
      margin: 0 auto;
    }

    > p {
      text-align: center;
    }
  }
`;

const TabBar = () => {
  return (
    <StyledTabBar>
      <button>
        <img />
        <p>首頁</p>
      </button>
      <button>
        <img />
        <p>優惠活動</p>
      </button>
      <button>
        <img />
        <p>購物車</p>
      </button>
      <button>
        <img />
        <p>我的帳號</p>
      </button>
      <button>
        <img />
        <p>購物清單</p>
      </button>
    </StyledTabBar>
  )
}

const StyledToolBar = styled.div`
  position: absolute;
  bottom: ${styledVariables.shared.barHeight};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  // border: solid 1px black;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > .buttonAddTodolist {
    height: 30px;
    padding: 0 10px;
    margin-right: 10px;
    background-color: white;
    border-radius: 100px;
  }
`;

const ToolBar = () => {
  return (
    <StyledToolBar>
      <button className="buttonAddTodolist">
        新增購物清單 +
      </button>
    </StyledToolBar>
  )
}

const StyledApp = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
`;

function App() {
  let testData = {
    user: {
      email: 'jeffery84115@gmail.com',
      password: 'haoyuliao'
    }
  }
  useEffect(async () => {
  }) 

  return (
    <StyledApp>
      <NavBar />
      {/* <Todolist /> */}
      <TodolistTable />
      <ToolBar />
      <TabBar />
    </StyledApp>
  );
}

export default App;
