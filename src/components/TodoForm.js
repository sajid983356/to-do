import React from 'react'

const TodoForm = ({ updateValue, setUpdateValue, todo, onSubmit}) => {
    {console.log("sajid shaikh ",updateValue)}
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

export default TodoForm
