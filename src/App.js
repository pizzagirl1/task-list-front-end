import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  // change to initialize as blank
  const [taskData, setTaskData] = useState(TASKS);
  
  useEffect( () => {
    return axios.get('https://task-list-api-c17.onrender.com/tasks')
      .then((response) => {
        let newTaskData = convertDataFromApi(response.data);
        setTaskData(newTaskData);
      })
      .catch((e) => console.log(e));
  }, []);

  const convertDataFromApi = (data) => {
    const tasks = [];
    for (let task of data) {
      let newTask = {
        id: task.id,
        title: task.title,
        isComplete: task.is_complete
      };
      tasks.push(newTask);
    }
    return tasks;
  };

  const updateTaskData = (updatedTask) => {
    const tasks = taskData.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTaskData(tasks);
  };

  const deleteTask = (id) => {
    setTaskData(tasks => {
      return tasks.filter(task => task.id !== id);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList 
          tasks={taskData} 
          updateTaskData={updateTaskData}
          deleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
