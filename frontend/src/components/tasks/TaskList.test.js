import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from './TaskList';

describe('TaskList Component', () => {
    test('renders initial tasks', () => {
        render(<TaskList />);
        
        // Check if initial tasks are rendered
        expect(screen.getByText('Complete Math Assignment')).toBeInTheDocument();
        expect(screen.getByText('Study for Physics Test')).toBeInTheDocument();
        expect(screen.getByText('Read Chapter 5 of History')).toBeInTheDocument();
    });

    test('adds a new task', () => {
        render(<TaskList />);
        
        // Get the input field and add button
        const taskInput = screen.getByPlaceholderText('Add a new task');
        const addButton = screen.getByText('Add');
        
        // Add button should be disabled when input is empty
        expect(addButton).toBeDisabled();
        
        // Type a new task
        fireEvent.change(taskInput, { target: { value: 'New Test Task' } });
        
        // Add button should be enabled
        expect(addButton).not.toBeDisabled();
        
        // Click add button
        fireEvent.click(addButton);
        
        // Check if new task is added
        expect(screen.getByText('New Test Task')).toBeInTheDocument();
        
        // Input should be cleared
        expect(taskInput.value).toBe('');
    });

    test('validates empty task submission', () => {
        render(<TaskList />);
        
        const addButton = screen.getByText('Add');
        
        // Add button should be disabled when input is empty
        expect(addButton).toBeDisabled();
        
        // Type a task with only spaces
        const taskInput = screen.getByPlaceholderText('Add a new task');
        fireEvent.change(taskInput, { target: { value: '   ' } });
        
        // Add button should still be disabled
        expect(addButton).toBeDisabled();
    });

    test('toggles task completion status', () => {
        render(<TaskList />);
        
        // Find the first task's checkbox
        const checkboxes = screen.getAllByRole('checkbox');
        const firstTaskCheckbox = checkboxes[0];
        
        // Initially, the first task should not be completed
        expect(firstTaskCheckbox).not.toBeChecked();
        
        // Click the checkbox to toggle completion
        fireEvent.click(firstTaskCheckbox);
        
        // Now the task should be marked as completed
        expect(firstTaskCheckbox).toBeChecked();
        
        // The task text should have a line-through style
        const taskListItem = screen.getByText('Complete Math Assignment').closest('.MuiListItemText-root');
        expect(taskListItem).toHaveStyle({ textDecoration: 'line-through' });
        
        // Click again to uncheck
        fireEvent.click(firstTaskCheckbox);
        
        // Task should be uncompleted again
        expect(firstTaskCheckbox).not.toBeChecked();
        expect(taskListItem).not.toHaveStyle({ textDecoration: 'line-through' });
    });

    test('deletes a task', () => {
        render(<TaskList />);
        
        // Get initial count of tasks
        const initialTasks = screen.getAllByRole('listitem');
        const initialCount = initialTasks.length;
        
        // Find and click delete button for first task
        const deleteButtons = screen.getAllByTestId('DeleteIcon');
        fireEvent.click(deleteButtons[0]);
        
        // Check if task count decreased
        const remainingTasks = screen.getAllByRole('listitem');
        expect(remainingTasks.length).toBe(initialCount - 1);
        
        // Check if deleted task is removed
        expect(screen.queryByText('Complete Math Assignment')).not.toBeInTheDocument();
    });
}); 