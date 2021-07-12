// script modules
import { 
    useState,
    useEffect,
} from 'react';
import {
    Link,
} from 'react-router-dom';

// styling modules
import styled from '@emotion/styled'
import { 
    styledVariables,
    styledCSS,
 } from '../../../app/cssMaterial';
import "normalize.css"
import "../../../app/general.css";

// 
import { auth } from '../../../app/firebase-services';
import IconTodolistPages from '../iconTodolistPages.js'
import TodolistTableItem from './TodolistTableItem.js'

let data = [
    {
        name: 'A',
        updateTime: '2020/01/28',
        items: [
            {
                name: '洗髮精',
            },
            {
                name: '橘子'
            },
            {
                name: '蘋果',
            },
        ]
    },
    {
        name: 'B',
        updateTime: '2019/01/28',
        items: [
            {
                name: '衛生紙',
            },
            {
                name: '凡士林'
            },
            {
                name: '衛生紙',
            },
        ]
    }
]

const StyledTodolistTable = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.gray100};
    padding: 0 ${styledVariables.shared.contentPadding};

    @media (min-width: ${styledVariables.todolistPages.breakpoint}px ) {
        position: absolute;
        width: 50%;
        left: 0;
    }

    > .dividingLine {
        position: absolute;
        z-index: 5;
        width: 10px;
        height: 100%;
        right: 0px;
        box-shadow: 6px 0 8px #dddddd;
        background-color: ${styledVariables.color.gray100};
    } 

    > button {
        display: inline-block;
        width: ${styledVariables.todolistTable.itemButtonWidth};
        height: 30px;
        margin: auto 0;
        padding: 0 10px;
        background-color: ${styledVariables.color.gray300};
        border-radius: 100px;
        // border: black solid 1px;
        color: ${styledVariables.color.white};      
        display: flex;
        justify-content: flex-end;
        align-items: center;

        > p {
            display: inline-block;
            margin-right: 5px;
        }

        > img {
            width: ${styledVariables.todolistTable.iconWidth};
            height: ${styledVariables.todolistTable.iconWidth};
        }
    }
`;

const TodolistTable = (props) => {
    let { isSignIn, srcTodolistData, tableItemClickState } = props;
    let [ todolistData, setTodolistData] = useState(null);

    // console.log('render TodolistTable.');

    useEffect(() => {
        // console.log('srcTodolistData: ', srcTodolistData);
        setTodolistData(srcTodolistData);
        // console.log('TodolistTable: useEffect depends on srcTodolistData.');
    }, [srcTodolistData]);

    useEffect(() => {
        // console.log('todolistData: ', todolistData);
        // console.log('TodolistTable: useEffect depends on todolistData.');
    }, [todolistData]);

    const getTodolistTableItem = (itemArray) => {

        return itemArray.map((value) => {
            let updateTime = value.data().updateTime.toDate().valueOf();
            // console.log('updateTime: ', updateTime);
            return <TodolistTableItem key={`${updateTime}`} listItemData={value} onTableItemClick={props.onTableItemClick} />
        })
    }

    return (
        <StyledTodolistTable>
            <div className="dividingLine"></div>
        {   
            (!todolistData) ? 
            '':
            ((!isSignIn) ? (<p>{'請登入以瀏覽頁面'}</p>) : (getTodolistTableItem(todolistData)))
            
        }
        </StyledTodolistTable>    
    )
}

export default TodolistTable