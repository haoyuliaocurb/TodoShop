import {useState, useEffect} from "react";
// import cssMatl from "./cssMaterial.js";
import styled from "@emotion/styled";
import { ReactComponent as IconClose } from './images/icon_close.svg';
import "normalize.css"
import "./general.css";

// 用 JS 思維開發的版本

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
    /* border: black solid 1px; */
    height: 30px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0 10px;

    > span {
        height: 100%;
        max-width: 560px;
    
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
        margin: auto;
        width: 5px;
        background-color: transparent;
        border: none;        
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
            蘋果
            <IconClose />
            {/*<img alt="icon_close" src="./images/icon_close.svg" />*/}        
        </StyledTodolistItem>
    )
}

const TodolistInput = function(props) {



    return (
        <StyledTodolistInput>
            <span>{props.inputDisplayContent}</span>
            <input type="text" id="input" className={`${props.ifClrTransparent? 'clr-transparent': ''}`}  onInput={props.onInputElInput} onKeyPress={props.onInputKeyPress} />            
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

    const outerHandleInputKeyPress = function() {
        let itemCounter = 0;

        function innerHandleInputKeyPress(e) {
            if ((e.key === "Enter")) {
                if (inputDisplayContent === "") {
                    return
                }

                console.log("trigger keydown 'enter' event");

                let inputValue = e.target.value;
                let oldItems = TodolistItems.slice();
                let newItems = oldItems.push(
                    <TodolistItem id={`${itemCounter}`} key={itemCounter} content={inputValue} onItemClick={handleItemClick} />
                )
                itemCounter += 1;
                e.target.value = '';
                setInputDisplayContent('');
                console.log('e.target.value: ', e.target.value);
            }
        }

        return innerHandleInputKeyPress
    }
    const handleInputKeyPress = outerHandleInputKeyPress();
    
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
            
            if (inputValue === '') {
                setIfClrTransparent(false);
                // console.log('ifClrTransparent: ', ifClrTransparent);
            }
            else {
                setIfClrTransparent(true);
                // console.log('ifClrTransparent: ', ifClrTransparent);
            }

        }
        else {
            enterEvent = false;
            // console.log('enterEvent: ', enterEvent);
        } 
    }

    /*
    let initTodolistItems = [];
    initTodolistItems.push(<TodolistItem id={`${itemCounter}`} key={itemCounter} onItemClick={handleItemClick} onInputKeyPress={handleInputKeyPress} />);
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
                <TodolistInput inputDisplayContent={inputDisplayContent} ifClrTransparent={ifClrTransparent} onInputElInput={handleInputElInput} onInputKeyPress={handleInputKeyPress} />
                <label htmlFor="input"></label>  
            </form>
        </StyledTodolist>
    )
}

export default Todolist;

//

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
