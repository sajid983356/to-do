import React from 'react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo}) => {
    return (
    <div className='todo-list'>
        <p  className={`${todo.completed ? 'completed': ""} todo-p`} onClick={toggleComplete}>{todo.task}</p>
        <FontAwesomeIcon data-testid="edit-icon" className="icons" icon={faPenToSquare} onClick={editTodo}/>
        <FontAwesomeIcon data-testid="delete-icon" className="icons" icon={faTrash} onClick={deleteTodo} />
    </div>
  )
}

export default TodoItem;
