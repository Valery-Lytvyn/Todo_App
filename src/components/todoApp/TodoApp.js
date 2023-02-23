import React, { useRef, useState, useEffect, createContext } from 'react';
import TodoCleaner from '../todoCleaner/TodoCleaner';
import TodoInput from '../todoInput/TodoInput';
import TodoList from '../todoList/TodoList';
import { colorsArr } from '../../constants/todoData';
import './todoApp.scss';

export const colorContext = createContext();

function TodoApp() {

   const notInitialRender = useRef(false);
   const [indexColor, setIndexColor] = useState(0);
   const [color, setColor] = useState('#a4bad6');
   const [tasks, setTasks] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [completed, setCompleted] = useState(false);

   useEffect(() => {
      if (notInitialRender.current) {
         localStorage.setItem('tasks', JSON.stringify(tasks));
      } else {
         if (tasks.length) {
            notInitialRender.current = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
         }
      }
   }, [tasks]);

   useEffect(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks != null) {
         setTasks(tasks);
      }
   }, []);

   const changeColor = () => {
      setColor(colorsArr[indexColor]);
      (indexColor === colorsArr.length) ? setIndexColor(0) : setIndexColor(prev => prev + 1);
   }

   const addValue = (item) => {
      setTasks([{
         title: item,
         id: Math.floor(Math.random() * 10000),
         color: color,
         edit: false,
      }, ...tasks]);
   }

   const editClickHandler = (id) => {
      setTasks(prev => prev.map(item => {
         if (item.id === id) {
            setIsEditing(true);
            return ({ ...item, edit: true });
         } else {
            return item
         }
      })
      )
   }

   const completedClickHandler = (id) => {
      setTasks(prev => prev.map(item => {
         if (item.id === id) {
            setCompleted(!completed);
            if (item.completed) { return ({ ...item, completed: false }); }
            else { return ({ ...item, completed: true }); }
         } else {
            return item
         }
      })
      )
   }

   const changeTitle = (newTitle) => {
      setIsEditing(false);
      setTasks(prev => prev.map(item => {
         if (item.edit) {
            return ({ ...item, edit: false, title: newTitle });
         } else {
            return item
         }
      })
      )
   }

   const deleteClickHandler = (id) => {
      setTasks([...tasks].filter(item => item.id !== id));
   }

   const deleteDoneTasks = () => {
      setTasks([...tasks].filter(item => !item.completed));
   }

   const deleteAllTasks = () => {
      setTasks([]);
      localStorage.clear();
   }

   return (
      <colorContext.Provider value={color}>
         <div className='col-sm-10 col-md-8 col-lg-6'>
            <div className='todoApp' style={{ boxShadow: `0px 0px 2px 1px ${color}` }}>
               <TodoCleaner deleteDoneTasks={deleteDoneTasks} deleteAllTasks={deleteAllTasks} />
               {isEditing ? null : <TodoInput changeColor={changeColor} addValue={addValue} isEditing={isEditing} changeTitle={changeTitle} />}
               <TodoList tasks={tasks} deleteClickHandler={deleteClickHandler} editClickHandler={editClickHandler} changeTitle={changeTitle} isEditing={isEditing} addValue={addValue} changeColor={changeColor} completedClickHandler={completedClickHandler} />
            </div>
         </div>
      </colorContext.Provider>
   )
}

export default TodoApp