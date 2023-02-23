import React from 'react';
import TodoApp from './components/todoApp/TodoApp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='wrapper'>
          <TodoApp />
        </div>
      </div>
    </div>
  );
}

export default App;
