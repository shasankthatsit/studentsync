import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';

const renderNavbar = (authValue = { isAuthenticated: true, logout: jest.fn() }) => {
    return render(
        <BrowserRouter>
            <AuthContext.Provider value={authValue}>
                <Navbar />
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('Navbar Component', () => {
    test('renders brand logo', () => {
        renderNavbar();
        const logoElements = screen.getAllByText('StudentSync');
        expect(logoElements[0]).toBeInTheDocument();
    });

    test('renders navigation links when authenticated', () => {
        renderNavbar();
        expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /tasks/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /calendar/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /study groups/i })).toBeInTheDocument();
    });

    test('toggles mobile menu when hamburger button is clicked', () => {
        renderNavbar();
        const menuButton = screen.getByLabelText('menu');
        
        // Click menu button
        fireEvent.click(menuButton);
        
        // Navigation drawer should be visible
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('toggles profile dropdown when profile button is clicked', () => {
        renderNavbar();
        const profileButton = screen.getByLabelText('profile menu');
        
        // Click profile button
        fireEvent.click(profileButton);
        
        // Settings and Logout options should be visible
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('calls logout function when logout button is clicked', () => {
        const mockLogout = jest.fn();
        renderNavbar({ isAuthenticated: true, logout: mockLogout });
        
        // Open profile menu
        const profileButton = screen.getByLabelText('profile menu');
        fireEvent.click(profileButton);
        
        // Click logout button
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        
        expect(mockLogout).toHaveBeenCalled();
    });
}); 