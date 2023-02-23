import React from 'react';
import { Button } from 'react-bootstrap';
import './todoCleaner.scss';

function TodoCleaner({ deleteDoneTasks, deleteAllTasks }) {

   return (
      <div className='todoCleaner'>
         <Button
            onClick={deleteDoneTasks}
            className='clearButton m-2'>Delete done tasks</Button>
         <Button
            onClick={deleteAllTasks}
            className='clearButton m-2'>Delete all tasks</Button>
      </div>
   )
}

export default TodoCleaner