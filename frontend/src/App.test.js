import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

// Mock the components
jest.mock('./components/tasks/TaskList', () => () => <div data-testid="mock-task-list">Task List</div>);
jest.mock('./components/calendar/Calendar', () => () => <div data-testid="mock-calendar">Calendar</div>);
jest.mock('./components/progress/Progress', () => () => <div data-testid="mock-progress">Progress</div>);
jest.mock('./components/groups/StudyGroups', () => () => <div data-testid="mock-study-groups">Study Groups</div>);
jest.mock('./components/notes/Notes', () => () => <div data-testid="mock-notes">Notes</div>);
jest.mock('./components/settings/Settings', () => () => <div data-testid="mock-settings">Settings</div>);
jest.mock('./components/chatbot/Chatbot', () => () => <div data-testid="mock-chatbot">Chatbot</div>);

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders login page when not authenticated', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renders dashboard when authenticated', async () => {
    // Mock authentication state
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));

    renderWithProviders(<App />);
    
    // Wait for the dashboard to load
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });

  test('navigates to different sections when authenticated', async () => {
    // Mock authentication state
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));

    renderWithProviders(<App />);

    // Wait for the dashboard to load
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    // Test navigation to Tasks
    fireEvent.click(screen.getByText(/tasks/i));
    expect(screen.getByTestId('mock-task-list')).toBeInTheDocument();

    // Test navigation to Calendar
    fireEvent.click(screen.getByText(/calendar/i));
    expect(screen.getByTestId('mock-calendar')).toBeInTheDocument();

    // Test navigation to Progress
    fireEvent.click(screen.getByText(/progress/i));
    expect(screen.getByTestId('mock-progress')).toBeInTheDocument();

    // Test navigation to Study Groups
    fireEvent.click(screen.getByText(/study groups/i));
    expect(screen.getByTestId('mock-study-groups')).toBeInTheDocument();

    // Test navigation to Notes
    fireEvent.click(screen.getByText(/notes/i));
    expect(screen.getByTestId('mock-notes')).toBeInTheDocument();

    // Test navigation to Settings
    fireEvent.click(screen.getByText(/settings/i));
    expect(screen.getByTestId('mock-settings')).toBeInTheDocument();
  });

  test('handles logout correctly', async () => {
    // Mock authentication state
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));

    renderWithProviders(<App />);

    // Wait for the dashboard to load
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    // Click logout
    fireEvent.click(screen.getByText(/logout/i));

    // Verify redirect to login page
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
}); 