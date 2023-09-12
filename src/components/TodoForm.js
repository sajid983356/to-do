  import React from 'react'
  import PropTypes from 'prop-types';

  const TodoForm = ({ updateValue, setUpdateValue, todo, onSubmit}) => {
      return (
      <form className='TodoForm' onSubmit={onSubmit}>
      <input 
          type='text' 
          className='todo-input' 
          value={updateValue ? updateValue : todo.task}
          placeholder='Update task'
          onChange={(e) => setUpdateValue(e.target.value)}
      />
      <button type='submit' className='todo-button'> Update Task</button>
  </form>
    )
  }

  TodoForm.propTypes = {
    updateValue: PropTypes.string, // Assuming updateValue is a string
    setUpdateValue: PropTypes.func.isRequired,
    todo: PropTypes.shape({
      task: PropTypes.string.isRequired,
      // Add other properties if needed
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  
  export default TodoForm
