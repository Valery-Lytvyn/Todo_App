import React from 'react';
import TodoInput from '../todoInput/TodoInput';
import ServiceButtons from './serviceBattons/ServiceButtons';
import { borderStyle } from '../../services/borderStyle';
import './todoList.scss';

function TodoList({ tasks, deleteClickHandler, editClickHandler, completedClickHandler, addValue, changeColor, isEditing, changeTitle }) {

   return (
      <div className='todoList'>
         <div className='col'>
            {tasks.map(({ title, id, color, edit, completed }) => (
               <div
                  key={id}
                  style={(edit) ? null : borderStyle(color)}
                  className='task'>
                  {edit ?
                     <TodoInput isEditing={isEditing} addValue={addValue} changeColor={changeColor} changeTitle={changeTitle} textTodo={title} color={color} />
                     :
                     <>
                        <div className={completed ? 'completed' : 'todoTitle'}
                           onClick={() => {
                              completedClickHandler(id)
                           }
                           }>
                           {title}
                        </div>
                        {isEditing ? null : <ServiceButtons
                           deleteClickHandler={deleteClickHandler}
                           editClickHandler={editClickHandler}
                           color={color}
                           id={id}
                        />}
                     </>
                  }
               </div>
            ))
            }
         </div>
      </div>
   )
}

export default TodoList