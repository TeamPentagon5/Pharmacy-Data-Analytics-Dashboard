import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import EmailEntryPage from '../Components/Forgot_Pass/forgot';

const mockNavigate = jest.fn();

// Mock react-router-dom to override useNavigate hook with our mock
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // keep other exports
    useNavigate: () => mockNavigate,
}));

jest.mock('axios');

describe('EmailEntryPage (Forgot Password)', () => {
    let mockNavigate;

    beforeAll(() => {
        jest.useFakeTimers(); // Use fake timers to control setTimeout
    });

    beforeEach(() => {
        mockNavigate = jest.fn();
        // Mock useNavigate to return our mock function
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(
            () => mockNavigate
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers(); // Restore real timers after all tests
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <EmailEntryPage />
            </BrowserRouter>
        );

    test('renders the form correctly', () => {
        renderComponent();
        expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('handles successful email verification and navigates', async () => {
        axios.get.mockResolvedValue({
            data: { status: 'success', Message: 'Email verified!' },
        });

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email Address'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Wait for the success message to appear
        await waitFor(() => {
            expect(screen.getByText(/Email verified!/i)).toBeInTheDocument();
        });

        // Advance timers to trigger navigate after 1000ms
        jest.advanceTimersByTime(1000);

        expect(mockNavigate).toHaveBeenCalledWith('/verifycode');
    });

    test('shows error message on invalid email and does not navigate', async () => {
        axios.get.mockResolvedValue({
            data: { status: 'fail', Message: 'Invalid email address.' },
        });

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email Address'), {
            target: { value: 'invalid@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
        });

        // Advance timers to confirm navigate does NOT get called
        jest.advanceTimersByTime(1000);

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('shows error message on network error and does not navigate', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email Address'), {
            target: { value: 'error@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/An error occurred. Please try again./i)).toBeInTheDocument();
        });

        jest.advanceTimersByTime(1000);

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
