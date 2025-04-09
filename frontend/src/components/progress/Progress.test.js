import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Progress from './Progress';

describe('Progress Component', () => {
    test('renders academic progress title', () => {
        render(<Progress />);
        expect(screen.getByText('Academic Progress')).toBeInTheDocument();
    });

    test('renders add subject button', () => {
        render(<Progress />);
        expect(screen.getByText('Add Subject')).toBeInTheDocument();
    });

    test('opens add subject dialog when clicking add button', () => {
        render(<Progress />);
        fireEvent.click(screen.getByText('Add Subject'));
        expect(screen.getByText('Add New Subject')).toBeInTheDocument();
    });

    test('displays mock subjects', () => {
        render(<Progress />);
        expect(screen.getByText('Mathematics')).toBeInTheDocument();
        expect(screen.getByText('Physics')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
    });

    test('can add new subject', () => {
        render(<Progress />);
        fireEvent.click(screen.getByText('Add Subject'));
        
        // Fill in the form
        fireEvent.change(screen.getByLabelText('Subject Name'), {
            target: { value: 'Chemistry' },
        });
        fireEvent.change(screen.getByLabelText('Current Grade (%)'), {
            target: { value: '88' },
        });
        fireEvent.change(screen.getByLabelText('Target Grade (%)'), {
            target: { value: '90' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Add'));

        // Check if new subject is displayed
        expect(screen.getByText('Chemistry')).toBeInTheDocument();
    });

    test('can delete subject', () => {
        render(<Progress />);
        const deleteButtons = screen.getAllByTestId('DeleteIcon');
        fireEvent.click(deleteButtons[0]);
        expect(screen.queryByText('Mathematics')).not.toBeInTheDocument();
    });
}); 