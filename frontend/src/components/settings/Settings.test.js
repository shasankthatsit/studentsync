import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from './Settings';

describe('Settings Component', () => {
    test('renders settings title', () => {
        render(<Settings />);
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    test('renders all setting options', () => {
        render(<Settings />);
        expect(screen.getByText('Dark Mode')).toBeInTheDocument();
        expect(screen.getByText('Push Notifications')).toBeInTheDocument();
        expect(screen.getByText('Email Notifications')).toBeInTheDocument();
        expect(screen.getByText('Auto Sync')).toBeInTheDocument();
    });

    test('renders change password button', () => {
        render(<Settings />);
        expect(screen.getByText('Change Password')).toBeInTheDocument();
    });

    test('opens password dialog on button click', () => {
        render(<Settings />);
        fireEvent.click(screen.getByText('Change Password'));
        expect(screen.getByText('Change Password', { selector: 'h2' })).toBeInTheDocument();
    });

    test('can toggle settings', () => {
        render(<Settings />);
        const switches = screen.getAllByRole('checkbox');
        fireEvent.click(switches[0]); // Toggle Dark Mode
        expect(switches[0]).toBeChecked();
    });
}); 