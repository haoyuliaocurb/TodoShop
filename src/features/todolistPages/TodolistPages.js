import Todolist from './Todolist/Todolist.js'
import TodolistTable from './TodolistTable/TodolistTable.js'

import styled from '@emotion/styled'
import { 
  styledVariables,
  styledCSS,
  StyledIcon,
} from '../../app/cssMaterial.js';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { 
  firebase,
  auth,
  firestore
} from '../../app/firebase-services.js';

const StyledTodolistPages = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TodolistPages = (props) => {
  // console.log('render TodolistPages');

  let breakpoint = styledVariables.todolistPages.breakpoint;
  let { windowWidth, isSignIn} = props;
  let currentUid = isSignIn;
  // console.log('isSignIn when rendering TodolistPages: ', isSignIn);

  // 處理 todolistData
  let [todolistData, setTodolistData] = useState([]);
  let srcCurrentListId = useRef('');
  let currentListData = useRef(null);
  let [currentListId, setCurrentListId] = useState('');

  const getCurrentTodolistData = async (resolve) => {
    let promiseReturned = new Promise((resolve) => {
      if (!isSignIn) {
        return []
      }
  
      // console.log('currentUser.uid: ', currentUser.uid);
      let newTodolistData = [];
      let fetchedNewTodolistDataCounter = 0;
  
      firestore.collection('todolist').where('uid', '==', currentUid).orderBy('updateTime', 'desc').limit(15).get()
      .then((fetchedNewTodolistData) => {
        // console.log('fetchedNewTodolistData: ', fetchedNewTodolistData);
        // console.log('trigger QuerySnapshot .then');
        fetchedNewTodolistData.forEach((value) => {
          // console.log('element of TodolistData');
          // console.log('value: ', value);
          if (fetchedNewTodolistDataCounter === 0) {
            // updateTime 最新者的 doc name 為 currrentId
            srcCurrentListId.current = value.id;
            currentListData.current = value;
            // console.log('srcCurrentListId: ', srcCurrentListId);
          }
          newTodolistData.push(value);
          // console.log('newTodolistData: ', newTodolistData);
          fetchedNewTodolistDataCounter += 1;
        });  

        resolve(newTodolistData);
      })
    });

    return promiseReturned
  }

  useEffect(async () => {
    // 登入狀態改變時，也會重新 setTodolistData
    let newTodolistData = await getCurrentTodolistData();
    setTodolistData(newTodolistData);
    // console.log('useEffect depends on isSignIn');
  }, [isSignIn]);

  useEffect(() => {
    // 當 todolistData 更改，便會更改 currentListId
    const getCurrentListId = () => (srcCurrentListId.current);
    setCurrentListId(getCurrentListId());
    
    // console.log('todolistData: ', todolistData);
    // console.log('srcCurrentListId.current: ', srcCurrentListId.current);
    // console.log('useEffect depends on todolistData');
  }, [todolistData]);

  let location = useLocation();
  useEffect(() => {
    console.log('useEffect depends on currentListId');
    // console.log('currentListData.current: ', currentListData.current);
    // console.log('currentListId: ', currentListId);
    // console.log('----------');
    
    let pathArray = location.pathname.split('/');
    if (pathArray.some((value) => ( value === 'id'))) {
      let listId = pathArray[pathArray.length - 1];
      if (listId === '') {
        return
      }

      if (listId !== currentListId) {
        history.push(`/todolist`);
      }
    }
  }, [currentListId]);

  let history = useHistory();
  const handleTableItemClick = (value) => {
    console.log('TableItem onClick: begin to setCurrentListId');
    currentListData.current = value;
    setCurrentListId(value.id);
  }

  return (
    <StyledTodolistPages>
      {
        // 判斷登入與否
        (!(isSignIn)) ? (
          // 未登入
          // 判斷螢幕尺寸
          (windowWidth <= breakpoint) ? (
            <Switch>                                  
              <Route path="/todolist/table">
                <TodolistTable isSignIn={false} />
              </Route>
              <Route exact path="/todolist/id/">
                <Todolist isSignIn={false} />
              </Route>  
              <Redirect from="/todolist" to={"/todolist/id/"} />
            </Switch>            
          ) : (
            <Switch>
              <Route exact path="/todolist/id/">
                <TodolistTable isSignIn={false} />
                <Todolist isSignIn={false} />  
              </Route>
              <Redirect from="/todolist" to="/todolist/id/" />                   
            </Switch>          
          )
        ) : (
          // 有登入
          (windowWidth <= breakpoint) ? (
            <Switch>                      
              <Route exact path="/todolist/id/:listId">
                <Todolist isSignIn={true} currentListData={currentListData.current} currentListId={currentListId} />
              </Route>                                  
              <Route exact path="/todolist/table">
                <TodolistTable onTableItemClick={handleTableItemClick} isSignIn={true} srcTodolistData={todolistData} />
              </Route>
              <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
            </Switch>            
          ) : (
            <Switch>
              <Route path="/todolist/id/:listId">
                <TodolistTable onTableItemClick={handleTableItemClick} isSignIn={true} srcTodolistData={todolistData} />
                <Todolist isSignIn={true} currentListData={currentListData.current} currentListId={currentListId} />
              </Route>                      
              <Redirect from="/todolist/table" to={`/todolist/id/${currentListId}`} />
              <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
            </Switch>          
          )          
        )
      }
    </StyledTodolistPages>
  )
}

export default TodolistPages