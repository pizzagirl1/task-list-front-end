import React from 'react';
import { useState } from 'react';

const NewTaskInput = () => {
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

    return (
    <form>
        <div>
            <label htmlFor="title">Title:</label>
            <input name="title" onChange={onTitleChange}/>
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input name="description" onChange={onDescriptionChange}/>
        </div>
        <input
            type="submit"
            value="Add Task" />
    </form>
    );
};

export default NewTaskInput;