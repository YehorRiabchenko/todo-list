  import { useState } from 'react'  
  import './App.css'

  function App() {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTask = () => {
      if (inputValue.trim() === '') return;

    const newTask = {
        text: inputValue,
        completed: false
      };

      setTasks([...tasks, newTask]);
      setInputValue('')
    };

    const toggleTasks = (index) => {
      const newTasks = tasks.map((task, i) => {
        if (i === index) {
          return {...task, completed: !task.completed}
        }
        return task
      })
      setTasks(newTasks);
    }

    const deleteTask = (indexToRemove) => {
      setTasks(tasks.filter((_, index) => index !== indexToRemove))
    }

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
      <ul className='todo-table'>{tasks.map((item, index) => (

        <li 
        key={index}>
          <span className={item.completed ? 'completed' : ''}>
            {item.text}
            </span>

        <button  className= {`todo-table-button-completed ${item.completed ? 'active' : ''}`}
         onClick={() => toggleTasks(index)}>
          {item.completed ? 'Cancel' : 'Completed'}
          </button>

        <button  className='todo-table-button' onClick={() => deleteTask(index)}>
          delete
          </button>
        </li>
      ))}</ul>
      </div>
  )};
  export default App

