import './style.css';
import { useState, useRef } from 'react';

export default function Main () {
  const [ tasks, setTasks ] = useState([]);
  const idRef = useRef(0);

  function handleAddTask (event) {
    const content = event.target.value;
    if (event.key !== 'Enter' || !content) return;
    const localTasks = [...tasks];
    
    const newTask = {
      id: idRef.current++,
      name: content,
      done: false
    }

    console.log(newTask);

    localTasks.push(newTask);

    setTasks(localTasks);

    event.target.value = '';
  }

  function handleDeleteTask (taskId) {
    const localTask = [...tasks];
    const newTasks = localTask.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  }

  function handleFinishedTask (taskId) {
    const localTask = [...tasks];
    const searchedTask = localTask.find((task) => task.id === taskId);
    if (!searchedTask) return;

    searchedTask.done = !searchedTask.done;
    setTasks(localTask);
  }

  return (
    <div className='container'>
      <div>
        <input 
          type='text' 
          placeholder='Nova Tarefa'
          onKeyDown={(event) => handleAddTask(event)}
        />
      </div>

      <div>
        <ul>
          {
            tasks.map((task) => (
              <li key={task.id}>
                <span 
                  className={`${task.done && 'task-done'}`}
                  onClick={() => handleFinishedTask(task.id)}
                >
                  {task.name}
                </span>
                <button 
                  className='btn-del'
                  onClick={() => handleDeleteTask(task.id)}
                >
                  X
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}