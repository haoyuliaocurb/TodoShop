import {
    useState,
    useEffect,
    useRef,
} from "react";
// import cssMatl from "./cssMaterial.js";
import styled from "@emotion/styled";
import IconTodolistPages from "./iconTodolistPages.js";
import "normalize.css"
import "../../app/general.css";
import { 
    styledVariables,
    styledCSS,
} from "../../app/cssMaterial";
import {
    useParams,
} from 'react-router-dom'
import { firestore } from "../../app/firebase-services";

const model = {
    flag: {
        enterEvent: false,
    }
}

const StyledTodolistItem = styled.span`
    display: inline-block;
    position: relative;
    background-color: ${styledVariables.color.pink400};
    height: ${styledVariables.todolist.itemHeight};
    margin: ${styledVariables.todolist.itemMargin} calc(${styledVariables.todolist.itemMargin} / 2);

    padding: 6px 16px;
    border-radius: 100px;
    z-index: 2;

    display: flex;
    align-items: center;

    font-size: 14px;
    color: ${styledVariables.color.white};

    > svg {
        width: 13px;
        height: 13px;
        margin-left: 8px;

        path {
            fill: ${styledVariables.color.white};
        }
    }
`;

const StyledTodolistInput = styled.span`
    display: inline-block;
    position: relative;
    // border: black solid 1px;
    z-index: 0;
    height: ${styledVariables.todolist.itemHeight};
    margin: ${styledVariables.todolist.itemMargin} 0;
    padding: 0 10px;

    > span {
        height: 100%;
        max-width: 560px;
        // border: red solid 1px;
    
        display: flex;
        justify-content: center;
        align-items: center;

        text-align: center;        
    }

    > input {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 5px;
        background-color: transparent;
        border: none;
    }

    > input:focus {
        outline: none;
    }
`;

const TodolistItem = function(props) {

    return (
        <StyledTodolistItem id={props.id} onClick={props.onItemClick} >
            {props.content}
            <IconTodolistPages.Close />
        </StyledTodolistItem>
    )
}

const TodolistInput = function(props) {

    return (
        <StyledTodolistInput>
            <span>{props.inputDisplayContent}</span>
            <input type="text" id="input" className={`${props.ifClrTransparent? 'clr-transparent': ''}`}  onInput={props.onInputElInput} onKeyUp={props.onInputKeyUp} autoFocus="autoFocus" />            
        </StyledTodolistInput>
    )
}

const StyledTodolist = styled.div`
    width: 100%;
    height: 100%;

    @media (min-width: ${styledVariables.todolistPages.breakpoint}px ) {
        position: absolute;
        width: 50%;
        right: 0;            
    }

    > form {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: ${styledVariables.color.gray100};
        padding: ${styledVariables.todolistTable.selfPaddingTop} ${styledVariables.shared.contentPadding};
    
        display: flex;
        flex-wrap: wrap;
        align-content: start;

        > label {
            position: absolute;
            top: ${styledVariables.todolistTable.selfPaddingTop};
            left: 0;
            display: block;
            width: 100%;
            height: 100%;  
            z-index: 1;
        }

        > .grid {
            position: absolute;
            top: ${styledVariables.todolistTable.selfPaddingTop};
            z-index: 0;
            width: calc(100% - ${styledVariables.shared.contentPadding} * 2) ;
            height: 100%;

            > div {
                width: 100%;
                height: calc( ${ styledVariables.todolist.itemHeight} + 2 * ${styledVariables.todolist.itemMargin} );
                border-bottom: solid 1px ${styledVariables.color.gray300};
            }
        }
    }
`;

const Todolist = function(props) {

    const handleSubmit = function(e) {
        e.preventDefault();
    }

    const handleItemClick = function(e) {
        console.log('trigger click event');
        const getItemkey = () => {
            let srcItemKey = e.target.id;
            console.log('srcItemKey: ', srcItemKey);
            let itemKeyPattern =  /-[0-9]*/i ;
            let result = itemKeyPattern.exec('id-01');
            console.log('result: ', result);

            // return srcItemKey
        }
        // TodolistItems[itemKey] = null;
        let itemKey = getItemkey();
        console.log('itemKey: ', itemKey);
        let oldItems = TodolistItems;
        let newItems = oldItems.slice(0, itemKey);
        newItems.concat(TodolistItems.slice(itemKey + 1));
        setTodolistItems(newItems);

        // console.log('TodolistItems: ', TodolistItems);
    }

    let itemCounter = useRef(0);
    const outerHandleInputKeyUp = function() {

        function innerHandleInputKeyUp(e) {
            // console.log('keyDown: ', 'e.key: ', e.key, 'e.keyCode: ', e.keyCode);
            if ((e.key === "Enter")) {
                if (inputDisplayContent === "") {
                    return
                }

                console.log("trigger keydown 'enter' event");

                let inputValue = e.target.value;
                let newItems = TodolistItems.slice();
                newItems.push(
                    <TodolistItem id={`${itemCounter.current}`} key={`${itemCounter.current}`} content={inputValue} onItemClick={handleItemClick} />
                );
                // console.log('newItems: ', newItems);
                setTodolistItems(newItems);
                itemCounter.current += 1;
                e.target.value = '';
                setInputDisplayContent('');
                // console.log('e.target.value: ', e.target.value);
            }
        }

        return innerHandleInputKeyUp
    }
    const handleInputKeyUp = outerHandleInputKeyUp();
    
    useEffect(() => {
        console.log('itemCounter.current: ', itemCounter.current);
    }); 


    var [TodolistItems, setTodolistItems] = useState([]);
    var [inputDisplayContent, setInputDisplayContent] = useState('');
    var [ifClrTransparent, setIfClrTransparent] = useState(false);
    const handleInputElInput = function(e) {

        let enterEvent = model.flag.enterEvent;
        // console.log('trigger input event', 'enterEvent: ', enterEvent);

        if (enterEvent === false) {
            let inputValue = e.target.value;
            setInputDisplayContent(inputValue);
        }
        else {
            enterEvent = false;
            // console.log('enterEvent: ', enterEvent);
        } 
    }

    let {listId} = useParams();

    /*
    console.log('TodolistItems: ', TodolistItems);
    useEffect(async () => {
        if (!props.isSignIn) {

        }
        else {
            let srcTodolistData = await firestore.collection('todolist').doc(listId).get();
            let todolistData = srcTodolistData.data();
            let todolistItems = todolistData.items.map((value) => (
                <TodolistItem id={`${value.name}`} key={value.name} content={value.name} onItemClick={handleItemClick} />
            ));
            setTodolistItems(todolistItems);
        }
    }, []);
    */

    /*
    let initTodolistItems = [];
    initTodolistItems.push(<TodolistItem id={`${itemCounter}`} key={itemCounter} onItemClick={handleItemClick} onInputKeyUp={handleInputKeyUp} />);
    var [TodolistItems, setTodolistItems] = useState(initTodolistItems);
    */

    // TodolistItems.push(<TodolistItem id={`${itemCounter}`} key={itemCounter} onItemClick={handleItemClick} />);

    /*
    useEffect(
        function() {
            itemCounter += 1;
            console.log('itemCounter: ', itemCounter);
        },
        [TodolistItems]
    );
    */

    /*
        1. 複製 TodolistItems
        2. 操作，CloneTodolistItems.push() 或 CloneTodolistItems[itemKey] = null
        3. setTodolistItems(CloneTodolistItems);
    */
    
    return (
        <StyledTodolist>
            <form onSubmit={handleSubmit} >
                {TodolistItems}
                { 
                /*
                <TodolistItem content="蘋果" onItemClick={handleItemClick} />
                <TodolistItem content="馬鈴薯" onItemClick={handleItemClick} />
                <TodolistItem content="橘子" onItemClick={handleItemClick} />                
                */
                }
                <TodolistInput inputDisplayContent={inputDisplayContent} ifClrTransparent={ifClrTransparent} onInputElInput={handleInputElInput} onInputKeyUp={handleInputKeyUp} />
                <label htmlFor="input"></label>
                <div className="grid">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </form>
        </StyledTodolist>
    )
}

export default Todolist;