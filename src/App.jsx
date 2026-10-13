  import { useState } from 'react'  
  import { useEffect } from 'react';
  import './App.css'

  function App() {

    const [tasks, setTasks] = useState(() => {
      const savedTasks = localStorage.getItem('tasks');

      if (savedTasks === null) return [];

      return JSON.parse(savedTasks);
    });

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const [inputValue, setInputValue] = useState('');

    const addTask = () => {
      if (inputValue.trim() === '') return;

    const newTask = {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false
      };

      setTasks([...tasks, newTask]);
      setInputValue('')

    };

    const toggleTasks = (id) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {...task, completed: !task.completed}
        }
        return task
      })
      setTasks(newTasks);
    };

    const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
    };

    return (
      <div className='container'>

        <div className='todo-controls'>
      <input 
      type="text"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      className='todo-input'
      />
      <button className='todo-button'  onClick={addTask}>Add</button>
      </div>
      <ul className='todo-table'>{tasks.map((item) => (

        <li 
        key={item.id}>
          <span className={item.completed ? 'completed' : ''}>
            {item.text}
            </span>

        <button  className= {`todo-table-button-completed ${item.completed ? 'active' : ''}`}
         onClick={() => toggleTasks(item.id)}>
          {item.completed ? 'Cancel' : 'Completed'}
          </button>

        <button  className='todo-table-button' onClick={() => deleteTask(item.id)}>
          delete
          </button>
        </li>
      ))}</ul>
      </div>
  )};
  export default App

