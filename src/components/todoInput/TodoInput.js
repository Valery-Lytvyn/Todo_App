import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useContext, useState } from 'react';
import { colorContext } from '../todoApp/TodoApp';
import { borderStyle } from '../../services/borderStyle';
import './todoInput.scss';

function TodoInput({ changeColor, addValue, isEditing, changeTitle, textTodo }) {

   const color = useContext(colorContext);
   const [inputValue, setInputValue] = useState(textTodo ? textTodo : '');
   const inputRef = useRef(null);

   useEffect(() => {
      inputRef.current.focus();
   }, [inputValue])


   const submitHandler = (event) => {
      event.preventDefault();
      if (inputValue) {
         if (isEditing) {
            changeTitle(inputValue);
            setInputValue('');
         } else {
            addValue(inputValue);
            changeColor();
            setInputValue('');
         }
      }
   }

   return (
      <div className='todoInput'>
         <div className='col p-0 m-0'>
            <form className='form task' style={borderStyle(color)} onSubmit={submitHandler}>
               <input
                  ref={inputRef}
                  className='input ps-2'
                  type='text'
                  autoFocus
                  placeholder='add todo'
                  value={inputValue}
                  onChange={(e) => {
                     setInputValue(e.target.value)
                  }}
               />
               <Button className='addButton' style={{ backgroundColor: `${color}`, boxShadow: `0px 0px 3px 1px ${color}`, border: 'none' }} type='submit'>ok</Button>
            </form>
         </div>
      </div>
   )
}

export default TodoInput