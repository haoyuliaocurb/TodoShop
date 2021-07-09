import styled from '@emotion/styled'
import { 
    useState,
    useEffect,
} from 'react';
import { 
    styledVariables,
    styledCSS,
 } from '../../app/cssMaterial';
import { auth } from '../../app/firebase-services';
import IconTodolistPages from './iconTodolistPages.js'
import {
    Link,
} from 'react-router-dom';

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
    z-index: 5;
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.gray100};
    box-shadow: 1px 0 15px #dddddd;
    padding: 0 ${styledVariables.shared.contentPadding};

    @media (min-width: ${styledVariables.todolistPages.breakpoint}px ) {
        position: absolute;
        width: 50%;
        left: 0;
    }

    > .TodolistTableItem {
        position: relative;
        width: 100%;
        height: 65px;
        display: flex;
        align-items: center;
        padding: 10px 10px 10px 10px;
        border-bottom: solid ${styledVariables.color.gray300} 1px;

        > div {
            display: inline-block;
            // border: black solid 1px;
            width: calc(100% - ${styledVariables.todolistTable.itemButtonWidth});
            height: 100%;
            position: relative;

            > p {
                position: absolute;
                bottom: 0;
                color: ${styledVariables.color.gray300};

                > .cartedItem {
                    color: red;
                }

                > span:not(:last-of-type)::after  {
                    content: '、';
                }
            }
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
    }
`;

const StyledIcon2Search = styled.span`
    display: inline-block;
    width: ${styledVariables.todolistTable.itemButtonWidth};
    height: 30px;
    // border: black solid 1px;

    > a:hover {
            background-color: ${styledVariables.color.pink400};
        }

    > a {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        border-radius: 100px;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: ${(props) => (props.disabled ? styledVariables.color.gray200 : styledVariables.color.gray300)};
        color: ${styledVariables.color.white};

        > svg {
            // display: block;
            width: ${styledVariables.todolistTable.iconWidth};
            height: ${styledVariables.todolistTable.iconWidth};
            // margin: 0 auto;

            path {
                fill: ${styledVariables.color.white};
            }
        }

        > p.textIcon {
            position: absolute;
            left: 0;
            display: inline-block;
            margin-left: 15px;
        }
    }
`;

const TodolistTableItem = (props) => {
    const getTodolistTableItemSpan = (itemArray) => {
        return itemArray.map((value) => (
            <span key={`${encodeURI(value.name)}`}>{value.name}</span>
        ))
    };

    return (
        <div className="TodolistTableItem">
            <div>
                <h2>{props.content.updateTime}</h2>
                <p>{getTodolistTableItemSpan(props.content.items)}</p>                
            </div>
            <StyledIcon2Search disabled={false}>
                <Link to="/search">
                    <p className="textIcon">輕鬆選</p>                            
                    <IconTodolistPages.ChevronRight />
                </Link>
            </StyledIcon2Search>
        </div>
    )
}

const TodolistTable = (props) => {
    const getTodolistTableItem = (itemArray) => {
        return itemArray.map((value) => (
            <TodolistTableItem key={`${value.name}`} content={value} />
        ))
    }
    console.log('props.isSignIn in TodolistTable: ', props.isSignIn);

    return (
        <StyledTodolistTable>
        {
            // !(props.isSignIn)
            (false) ? (
                <p>{'請登入以瀏覽頁面'}</p>                
            ) : (
                // getTodolistTableItem(props.todolistData)
                getTodolistTableItem(data)
            )
        }
        </StyledTodolistTable>    
    )
}

export default TodolistTable