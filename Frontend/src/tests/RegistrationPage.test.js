import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import RegistrationPage from '../Components/Registration/registration';

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

// Mock axios post
jest.mock('axios');

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('RegistrationPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('shows success message and navigates to login on successful registration', async () => {
        // Arrange: mock axios post to resolve with success
        axios.post.mockResolvedValueOnce({
            data: {
                status: 'success',
                Message: 'Registration successful',
            },
        });

        renderWithRouter(<RegistrationPage />);

        // Fill the form fields
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/first name/i), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByPlaceholderText(/phone number/i), {
            target: { value: '0123456789' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'password123' },
        });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Assert: success message appears
        await waitFor(() => {
            expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
        });

        // Because navigate is called after 2 seconds, wait for that too
        await waitFor(
            () => {
                expect(mockedNavigate).toHaveBeenCalledWith('/login');
            },
            { timeout: 3000 }
        );
    });
});
