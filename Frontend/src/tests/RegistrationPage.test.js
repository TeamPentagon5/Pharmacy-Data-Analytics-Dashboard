import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from '../Components/Registration/registration';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('RegistrationPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders registration input fields and register button', () => {
    renderWithRouter(<RegistrationPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('shows success message and navigates to login on successful registration', async () => {
    axios.post.mockResolvedValueOnce({
      data: { status: 'success', Message: 'Registration successful' },
    });

    renderWithRouter(<RegistrationPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '0123456789' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Registration successful')).toBeInTheDocument();
      expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('shows error message when registration fails', async () => {
    axios.post.mockResolvedValueOnce({
      data: { status: 'fail', Message: 'Email already exists' },
    });

    renderWithRouter(<RegistrationPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });
});
