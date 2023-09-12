import React, { useState, useEffect } from 'react';

import {v4 as uuidv4} from 'uuid';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoWrapper = () => {

    const [isSelected, setIsSelected] = useState(false);
    const [updateValue, setUpdateValue] = useState('');
    const [task, setTask] = useState('');
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

        let newTodo = {id: uuidv4(), task: task, completed: false, isEditing: false}
            setTodos([...todos, newTodo])
        setTask('')
    }

    const handleInputSubmit = (event) => {
        setTask(event.target.value);
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter( todo => todo.id !== id))
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }


    const updateTodo = (e, id) => {
        e.preventDefault()
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, task: updateValue, isEditing: !todo.isEditing
        }: todo))
        setUpdateValue('')
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
      <h1 className='TodoWrapper-heading'>Add your Todo List Here</h1>

      <form id="todo-form" onSubmit={handleFormSubmit} onChange={handleInputSubmit} >
            <input type='text' id="todo-input" placeholder='What is the task today?' value={task}/>
            <button type='submit' id="todo-button" > Add Task </button>
      </form>
      {
        todos.map((todo, index)=> (
            todo.isEditing ? (
                <TodoForm 
                 key={todo.id}
                 updateValue={updateValue}
                 setUpdateValue={setUpdateValue}
                 todo={todo}
                 onSubmit={(e) => updateTodo(e, todo.id)}
                />
            )
            : (
                <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={() => toggleComplete(todo.id)}
                editTodo={() => editTodo(todo.id)}
                deleteTodo={() => deleteTodo(todo.id)}
                />
            )
        ))
      }
    </div>
  )
}

export default TodoWrapper;