import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react';
import TodoForm from '../components/TodoForm';

describe("TodoForm Component", () =>  {
    const todo = {
        id: '1',
        task: 'Sample Task',
        completed: false,
        isEditing: false,
      };
    
      it('renders the TodoForm component with the correct input placeholder', () => {
        render(<TodoForm todo={todo} />);
        const inputElement = screen.getByPlaceholderText(/Update task/i);
        expect(inputElement).toBeInTheDocument();
      });
})
