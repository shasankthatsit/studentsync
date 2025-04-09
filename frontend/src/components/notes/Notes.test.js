import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notes from './Notes';

describe('Notes Component', () => {
    test('renders initial notes', () => {
        render(<Notes />);
        
        // Check if initial notes are rendered
        expect(screen.getByText('Math Formulas')).toBeInTheDocument();
        expect(screen.getByText('Physics Notes')).toBeInTheDocument();
        expect(screen.getByText('History Timeline')).toBeInTheDocument();
    });

    test('adds a new note', () => {
        render(<Notes />);
        
        // Fill in the new note form
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText('Content');
        const addButton = screen.getByText('Add Note');

        fireEvent.change(titleInput, { target: { value: 'New Test Note' } });
        fireEvent.change(contentInput, { target: { value: 'This is a test note content' } });
        
        // Add button should be enabled
        expect(addButton).not.toBeDisabled();
        
        // Click add button
        fireEvent.click(addButton);

        // Check if new note is added
        expect(screen.getByText('New Test Note')).toBeInTheDocument();
        expect(screen.getByText('This is a test note content')).toBeInTheDocument();
        
        // Form should be cleared
        expect(titleInput.value).toBe('');
        expect(contentInput.value).toBe('');
    });

    test('validates empty note submission', () => {
        render(<Notes />);
        
        const addButton = screen.getByText('Add Note');
        
        // Add button should be disabled when form is empty
        expect(addButton).toBeDisabled();
        
        // Fill only title
        const titleInput = screen.getByLabelText('Title');
        fireEvent.change(titleInput, { target: { value: 'Only Title' } });
        expect(addButton).toBeDisabled();
        
        // Fill only content
        fireEvent.change(titleInput, { target: { value: '' } });
        const contentInput = screen.getByLabelText('Content');
        fireEvent.change(contentInput, { target: { value: 'Only Content' } });
        expect(addButton).toBeDisabled();
    });

    test('edits an existing note', () => {
        render(<Notes />);
        
        // Find and click edit button for first note
        const editButtons = screen.getAllByTestId('EditIcon');
        fireEvent.click(editButtons[0]);
        
        // Form should be populated with note data
        const titleInputs = screen.getAllByLabelText('Title');
        const contentInputs = screen.getAllByLabelText('Content');
        
        // Get the first edit form inputs
        const titleInput = titleInputs[0];
        const contentInput = contentInputs[0];
        
        expect(titleInput.value).toBe('Math Formulas');
        expect(contentInput.value).toBe('Important formulas for calculus...');
        
        // Edit the note
        fireEvent.change(titleInput, { target: { value: 'Updated Math Formulas' } });
        fireEvent.change(contentInput, { target: { value: 'Updated calculus formulas...' } });
        
        // Save the changes
        const saveButton = screen.getByTestId('save-note-1');
        fireEvent.click(saveButton);
        
        // Check if note is updated
        expect(screen.getByText('Updated Math Formulas')).toBeInTheDocument();
        expect(screen.getByText('Updated calculus formulas...')).toBeInTheDocument();
    });

    test('deletes a note', () => {
        render(<Notes />);
        
        // Get initial count of notes
        const initialNotes = screen.getAllByRole('heading', { level: 6 });
        const initialCount = initialNotes.length;
        
        // Delete first note
        const deleteButtons = screen.getAllByTestId('DeleteIcon');
        fireEvent.click(deleteButtons[0]);
        
        // Check if note count decreased
        const remainingNotes = screen.getAllByRole('heading', { level: 6 });
        expect(remainingNotes.length).toBe(initialCount - 1);
        
        // Check if deleted note is removed
        expect(screen.queryByText('Math Formulas')).not.toBeInTheDocument();
    });
}); 