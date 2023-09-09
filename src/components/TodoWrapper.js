import React, { useState, useEffect } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faL, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {v4 as uuidv4} from 'uuid';

const TodoWrapper = () => {

    const [isSelected, setIsSelected] = useState(false);
    const [updateValue, setUpdateValue] = useState('');
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos1');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });


    useEffect(() => {
        localStorage.setItem('todos1', JSON.stringify(todos))
        console.log('Todos saved to localStorage:', todos);

    }, [todos]);
    
    useEffect(()=> {
        const storedTodos = localStorage.getItem('todos1');
        if(storedTodos) {
            setTodos(JSON.parse(storedTodos));
            console.log('Todos loaded from localStorage:', JSON.parse(storedTodos));
        }
    }, []);
    

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let obj = {id: uuidv4(), task: value, completed: false, isEditing: false}
    
        console.log("handleFormSubmit")
        setTodos([...todos, obj])
        setValue('')
    }

    const handleInputSubmit = (event) => {
        console.log("handleInputSubmit - setValue")
        setValue(event.target.value);
    }

    const deleteTodo = (id) => {
        console.log("deleteTodo")
        setTodos(todos.filter( todo => todo.id != id))
    }

    const editTodo = (id) => {
        console.log("editTodo")
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const toggleComplete = (id) => {
        console.log("toggleComplete")
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }


    const handleSubmit = (e, id) => {
        e.preventDefault()
        console.log("handleSubmit")
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, task: updateValue, isEditing: !todo.isEditing
        }: todo))
        setValue('')
    }

    const handleSortChange = (e) => {
        const option = e.target.value;
        const sortedTodos = [...todos].sort((obj1, obj2) => {
            if(obj1.completed && !obj2.completed){
                return -1
            } else if(!obj1.completed && obj2.completed) {
                return 1
            } else {
                return 0
            }
        });

        if(option === 'completed') {
            setTodos(sortedTodos)
        } else if (option === 'not-completed') {
            const arrayByNonCompleted = [...todos].sort((obj2, obj1) => {
                if(obj1.completed && !obj2.completed){
                    return -1
                } else if(!obj1.completed && obj2.completed) {
                    return 1
                } else {
                    return 0
                }
            });
            setTodos(arrayByNonCompleted)
        }
    }

    const handleClearAllSeletion = (e) => {
        if(!isSelected) {
            setTodos([])
        }
        setIsSelected(!isSelected);
    }

  return (
    <div className='TodoWrapper'>
    
      <div className='TodoWrapper-sort-dropdown'>
            <select onChange={handleSortChange} className='TodoWrapper-sort-dropdown-select'>
                <option className="TodoWrapper-sort-dropdown-value" value="completed">Sort By completed</option>
                <option className="TodoWrapper-sort-dropdown-value" value="not-completed">Sort By Not completed</option>
            </select>
            <div className='TodoWrapper-sort-dropdown-label'>
                <input 
                    type='checkbox'
                    checked={isSelected}
                    onChange={handleClearAllSeletion}
                />
                CLEAR-ALL
             </div>
      </div>
      <h1 className='TodoWrapper-heading'> Add your Todo List Here</h1>

      <form id="todo-form" onSubmit={handleFormSubmit} onChange={handleInputSubmit} >
            <input type='text' id="todo-input" placeholder='What is the task today?' value={value}/>
            <button type='submit' id="todo-button" > Add Task </button>
      </form>
      {/* {console.log("in return", todos)} */}
      {
        todos.map((todo, index)=> (
            todo.isEditing ? (
                <form className='TodoForm' onSubmit={(e) => handleSubmit(e, todo.id)}>
                    <input type='text' className='todo-input' 
                    value={updateValue}
                    placeholder='Update task'
                    onChange={(e) => setUpdateValue(e.target.value)}
                    />
                    <button type='submit' className='todo-btn'> Update Task</button>
                </form>
            )
            : (
                <div key={index} className='todo-list'>
                <p  className={`${todo.completed ? 'completed': ""} todo-p`} onClick={ () => toggleComplete(todo.id)}>{todo.task}</p>
                <FontAwesomeIcon className="icons" icon={faPenToSquare} onClick={ () => editTodo(todo.id)}/>
                <FontAwesomeIcon className="icons" icon={faTrash} onClick={ () => deleteTodo(todo.id)} />
                </div>
            )
        ))
      }
      {/* {console.log("test", todos)} */}
    </div>
  )
}

export default TodoWrapper;