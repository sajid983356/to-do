import "@testing-library/jest-dom"
import { render, screen, fireEvent} from "@testing-library/react";
import TodoItem from '../components/TodoItem';


describe("TodoItem Component", () => {

    const todo = {
        id: '1',
        task: 'Sample Task',
        completed: false,
        isEditing: false,
    };

    
    it("renders the TodoItem component with the task", () => {
        render(<TodoItem todo={todo} />);
        const todoElement = screen.getByText(/Sample Task/i);
        expect(todoElement).toBeInTheDocument();
    })

    it('renders the TodoItem component with a not-completed task', () => {
        render(<TodoItem todo={{ ...todo, completed: false }} />);
        const todoElement = screen.getByText(/Sample Task/i);
        expect(todoElement).not.toHaveClass('completed');
    });

    it('renders the TodoItem component with a completed task', () => {
        render(<TodoItem todo={{ ...todo, completed: true }} />);
        const todoElement = screen.getByText(/Sample Task/i);
        expect(todoElement).toHaveClass('completed');
    });

    it('calls the toggleComplete function when the task is clicked', () => {
        const toggleCompleteMock = jest.fn();
        render(<TodoItem todo={todo} toggleComplete={toggleCompleteMock} />);
        const todoElement = screen.getByText(/Sample Task/i);
    
        fireEvent.click(todoElement);
    
        expect(toggleCompleteMock).toHaveBeenCalled();
      });
    
    it('calls the editTodo function when the edit icon is clicked', () => {
        const editTodoMock = jest.fn();
        render(<TodoItem todo={todo} editTodo={editTodoMock} />);
        const editIcon = screen.getByTestId('edit-icon');
    
        fireEvent.click(editIcon);
    
        expect(editTodoMock).toHaveBeenCalled();
    });

    it('calls the deleteTodo function when the delete icon is clicked', () => {
        const deleteTodoMock = jest.fn();
        render(<TodoItem todo={todo} deleteTodo={deleteTodoMock} />);
        const deleteIcon = screen.getByTestId('delete-icon');
    
        fireEvent.click(deleteIcon);
    
        expect(deleteTodoMock).toHaveBeenCalled();
    });
})
