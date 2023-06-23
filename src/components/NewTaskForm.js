import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskInput = ( {addTask} ) => {
    const defaultTaskForm = {
        title: '',
        description: ''
    };
    
    const [formFields, setFormFields] = useState(defaultTaskForm);

    const onTitleChange = (event) => {
        setFormFields({
            ...formFields,
            title: event.target.value
        });
    };

    const onDescriptionChange = (event) => {
        setFormFields({
            ...formFields,
            description: event.target.value
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        addTask({
            title: formFields.title,
            description: formFields.description
        });

        setFormFields(defaultTaskForm);
    };

    return (
    <form onSubmit={onFormSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input 
                name="title" 
                onChange={onTitleChange}
                value={formFields.title}
            />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input 
                name="description" 
                onChange={onDescriptionChange}
                value={formFields.description}
            />
        </div>
        <input
            type="submit"
            value="Add Task" 
        />
    </form>
    );
};

NewTaskInput.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default NewTaskInput; 