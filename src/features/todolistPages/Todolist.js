import {useState, useEffect} from "react";
// import cssMatl from "./cssMaterial.js";
import styled from "@emotion/styled";
import { ReactComponent as IconClose } from './images/icon_close.svg';
import "normalize.css"
import "../../app/general.css";

const model = {
    flag: {
        enterEvent: false,
    }
}

const StyledTodolistItem = styled.span`
    display: inline-block;
    position: relative;
    background-color: white;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;

    padding: 6px 16px;
    border-radius: 100px;
    z-index: 1;

    display: flex;
    align-items: center;

    > svg {
        width: 13px;
        height: 13px;
        margin-left: 8px;        
    }
`;

const StyledTodolistInput = styled.span`
    display: inline-block;
    position: relative;
    border: black solid 1px;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0 10px;

    > span {
        height: 100%;
        max-width: 560px;
        border: red solid 1px;
    
        display: flex;
        justify-content: center;
        align-items: center;

        text-align: center;        
    }

    > input {
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        margin: auto;
        background-color: transparent;
        border: blue solid 1px;
    }

    > input:focus {
        outline: none;
    }
`;
const StyledTodolist = styled.div`
    > form {
        width: 600px;
        height: 800px;
        background-color: cadetblue;
        padding: 40px 20px ;
    
        display: flex;
        flex-wrap: wrap;
        align-content: start;

        > label {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;            
        }
    }
`;

const TodolistItem = function(props) {

    return (
        <StyledTodolistItem id={props.id} key={props.key} onClick={props.onItemClick} >
            {props.content}
            <IconClose />
            {/*<img alt="icon_close" src="./images/icon_close.svg" />*/}        
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

const Todolist = function() {

    const handleSubmit = function(e) {
        e.preventDefault();
    }

    const handleItemClick = function(e) {
        console.log('trigger click event');
        let itemKey = e.target.id;
        // console.log('itemKey: ', itemKey);
        // TodolistItems[itemKey] = null;
        let oldItems = TodolistItems;
        let newItems = oldItems.slice(0, itemKey);
        newItems.concat(TodolistItems.slice(itemKey + 1));
        setTodolistItems(newItems);

        console.log('TodolistItems: ', TodolistItems);
    }

    const outerHandleInputKeyUp = function() {
        let itemCounter = 0;

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
                    <TodolistItem id={`${itemCounter}`} key={itemCounter} content={inputValue} onItemClick={handleItemClick} />
                );
                console.log('newItems: ', newItems);
                setTodolistItems(newItems);
                itemCounter += 1;
                e.target.value = '';
                setInputDisplayContent('');
                console.log('e.target.value: ', e.target.value);
            }
        }

        return innerHandleInputKeyUp
    }
    const handleInputKeyUp = outerHandleInputKeyUp();
    
    var [TodolistItems, setTodolistItems] = useState([]);
    var [inputDisplayContent, setInputDisplayContent] = useState('');

    //

    var [ifClrTransparent, setIfClrTransparent] = useState(false);
    const handleInputElInput = function(e) {

        let enterEvent = model.flag.enterEvent;
        // console.log('trigger input event', 'enterEvent: ', enterEvent);

        if (enterEvent === false) {
            let inputValue = e.target.value;
            setInputDisplayContent(inputValue);
            // console.log('inputValue: ', inputValue);
            
            /*
            if (inputValue === '') {
                setIfClrTransparent(false);
                // console.log('ifClrTransparent: ', ifClrTransparent);
            }
            else {
                setIfClrTransparent(true);
                // console.log('ifClrTransparent: ', ifClrTransparent);
            }
            */
        }
        else {
            enterEvent = false;
            // console.log('enterEvent: ', enterEvent);
        } 
    }

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
                {/*
                <TodolistItem content="蘋果" onItemClick={handleItemClick} />
                <TodolistItem content="馬鈴薯" onItemClick={handleItemClick} />
                <TodolistItem content="橘子" onItemClick={handleItemClick} />                
                */}
                <TodolistInput inputDisplayContent={inputDisplayContent} ifClrTransparent={ifClrTransparent} onInputElInput={handleInputElInput} onInputKeyUp={handleInputKeyUp} />
                <label htmlFor="input"></label>  
            </form>
        </StyledTodolist>
    )
}

export default Todolist;