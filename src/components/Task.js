import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ( {id, title, isComplete, updateTaskData, deleteTask} ) => {
  
  const toggleTaskIsComplete = () => {
    updateTaskData({
      id: id,
      title: title,
      isComplete: !isComplete
    });
  };

  const handleDeleteTask = () => {
    deleteTask(id);
  };
  
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  
  return (
    <li className="tasks__item">
      <button 
        className={`tasks__item__toggle ${buttonClass}`} 
        onClick={toggleTaskIsComplete}>{title}</button>
      <button 
        className="tasks__item__remove button"
        onClick={handleDeleteTask}>
        x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTaskData: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default Task;