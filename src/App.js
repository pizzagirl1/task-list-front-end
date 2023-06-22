import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const taskURL = 'https://task-list-api-c17.onrender.com';

const getAllTasks = () => {
  return axios.get(`${taskURL}/tasks`)
    .then((response) => {
      return convertDataFromApi(response.data);})
    .catch((e) => console.log(e));
};

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

const App = () => {
  const [taskData, setTaskData] = useState([]);
  
  const fetchTasks = () => {
    getAllTasks().then((tasks) => setTaskData(tasks));
  };

  useEffect( () => {
    fetchTasks();
  }, []);
  
  const updateTaskData = (updatedTask) => {
    const tasks = taskData.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    patchTaskAPI(updatedTask);
    setTaskData(tasks);
  };

  const patchTaskAPI = (updatedTask) => {
    let patchPath = updatedTask.isComplete ? 'mark_incomplete' : 'mark_complete';
    axios.patch(`${taskURL}/${updatedTask.id}/${patchPath}`)
    .catch((e) => console.log('error in patch!', e));
  };

  const deleteTask = (id) => {
    setTaskData(tasks => {
      return tasks.filter(task => task.id !== id);
    });
    deleteTaskFromAPI(id);
  };

  const deleteTaskFromAPI = (id) => {
    axios.delete(`${taskURL}/${id}`)
    .then((response) => console.log('deleted!', response.data))
    .catch((e) => console.log('error!', e));
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
