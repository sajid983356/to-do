import "@testing-library/jest-dom"
import {render, screen, fireEvent} from "@testing-library/react";
import TodoWrapper from '../components/TodoWrapper';

describe("TodoWrapper Component", () => {

    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<TodoWrapper />)
    })

    afterEach(() => {
      console.warn.mockRestore();
      console.error.mockRestore();
      console.log.mockRestore();
    });

    it('deletes a task when the delete icon is clicked', () => {
      
      const taskInput = screen.getByPlaceholderText(/What is the task today?/i);
      const addButton = screen.getByText(/Add Task/i);
  
      fireEvent.change(taskInput, { target: { value: 'Task to Delete' } });
      fireEvent.click(addButton);
  
      const taskElement = screen.getByText(/Task to Delete/i);
      expect(taskElement).toBeInTheDocument();
  
      const deleteIcon = screen.getByTestId('delete-icon');

      fireEvent.click(deleteIcon);
  
      expect(taskElement).not.toBeInTheDocument();
    });

    
    it('edits a task when the edit icon is clicked', () => {
      
      const taskInput = screen.getByPlaceholderText(/What is the task today?/i);
      const addButton = screen.getByText(/Add Task/i);
  
      fireEvent.change(taskInput, { target: { value: 'Editable Task' } });
      fireEvent.click(addButton);
  
      const taskElement = screen.getByText(/Editable Task/i);
      expect(taskElement).toBeInTheDocument();
  
      const editIcon = screen.getByTestId('edit-icon');
      fireEvent.click(editIcon);
  
      const updatedTaskInput = screen.getByPlaceholderText(/Update task/i);
      expect(updatedTaskInput).toBeInTheDocument();
  
      fireEvent.change(updatedTaskInput, { target: { value: 'Updated Task' } });
      const updateButton = screen.getByText(/Update Task/i);
      fireEvent.click(updateButton);
  
      const updatedTaskElement = screen.getByText(/Updated Task/i);
      expect(updatedTaskElement).toBeInTheDocument();
    });

    it("renders the todoWrapper component", () => {
      const headingElement = screen.getByText(/Add your Todo List Here/i);
      expect(headingElement).toBeInTheDocument();
  })

  it('adds a new task when the "Add Task" button is clicked', () => {
    
    const taskInput = screen.getByPlaceholderText(/What is the task today?/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const newTaskElement = screen.getByText(/New Task/i);
    expect(newTaskElement).toBeInTheDocument();
  });

  it('marks a task as completed when clicked', () => {
    
    const taskInput = screen.getByPlaceholderText(/What is the task today?/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: 'Task to Complete' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/Task to Complete/i);
    expect(taskElement).toBeInTheDocument();

    fireEvent.click(taskElement);

    expect(taskElement).toHaveClass('completed');
  });
})