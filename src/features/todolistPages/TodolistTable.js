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

const StyledTodolistTableItem = styled.div`

    position: relative;
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 10px;
    border-bottom: solid ${styledVariables.color.gray300} 1px;
    background-color: ${(props) => {
        let {clickState} = props;
        switch (clickState) {
            case 0:
                // disabled
                return 'transparent'

            case 1:
                // selected
                return 'red'
            case 2:
                // unselected
                return 'transparent'              
        }
    }};

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
            width: 100%;
            padding-right: 7%;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            > .cartedItem {
                color: red;
            }

            > span:not(:last-of-type)::after  {
                content: '、';
            }
        }
    }
`;

const TodolistTableItem = (props) => {
    let { listItemData } = props;
    let uptimeTime = listItemData.data().updateTime.toDate();
    const getTodolistTableItemSpan = (itemArray) => {
        let itemString = '';
        itemArray.forEach((srcValue, index) => {
            let value = srcValue.name;
            if (index === 0) {
                itemString += value;
                return 
            }
            itemString += `、${value}`;
        });

        return itemString
        /*
        return itemArray.map((value) => (
            <span key={`${encodeURI(value.name)}`}>{value.name}</span>
        ))
        */
    };

    let [clickState, setClickState] = useState(2);

    const handleClick = (value) => {
        // console.log('trigger handleClick of TodolistTableItem.');
        // console.log('props.key: ', props.key);
        props.onTableItemClick(value);
        setClickState(1);
    }

    useEffect(() => {
        // console.log('clickState of ', listItemData.data().updateTime.valueOf(), ' :' , clickState);
    }, [clickState]);


    return (
        <StyledTodolistTableItem clickState={clickState} onClick={() => {handleClick(listItemData);}}>
            <div>
                <h2>{`${uptimeTime.getFullYear()}/${String(uptimeTime.getMonth()).padStart(2, '0')}/${String(uptimeTime.getDate()).padStart(2, '0')}`}</h2>
                <p>{getTodolistTableItemSpan(listItemData.data().items)}</p>               
            </div>
            <StyledIcon2Search disabled={false}>
                <Link to="/search">
                    <p className="textIcon">輕鬆選</p>                            
                    <IconTodolistPages.ChevronRight />
                </Link>
            </StyledIcon2Search>
        </StyledTodolistTableItem>
    )
}

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
        {   
            (!todolistData) ? 
            '':
            ((!isSignIn) ? (<p>{'請登入以瀏覽頁面'}</p>) : (getTodolistTableItem(todolistData)))
            
        }
        </StyledTodolistTable>    
    )
}

export default TodolistTable