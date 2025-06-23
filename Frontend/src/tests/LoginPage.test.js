import '@testing-library/jest-dom'; // should be imported first for custom matchers
import axios from 'axios';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../Components/login/login';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios'); // Mock axios

// Mock useNavigate once at the top level
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Helper to wrap components with Router context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders email and password input fields and buttons', () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Forgot Password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('shows error message when login fails', async () => {
    // mock failed login response
    axios.post.mockResolvedValueOnce({
      data: { status: 'fail', Message: 'Invalid credentials' },
    });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    // Make sure navigate is NOT called
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test('stores token and navigates to /Home on successful login', async () => {
    // mock successful login response
    axios.post.mockResolvedValueOnce({
      data: { status: 'success', Token: 'dummyToken' },
    });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('dummyToken');
      expect(mockedNavigate).toHaveBeenCalledWith('/Home');
    });
  });

  test('navigates to /forgot when Forgot Password button clicked', () => {
    renderWithRouter(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Forgot Password' }));
    expect(mockedNavigate).toHaveBeenCalledWith('/forgot');
  });

  test('navigates to /registration when Register button clicked', () => {
    renderWithRouter(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(mockedNavigate).toHaveBeenCalledWith('/registration');
  });
});
