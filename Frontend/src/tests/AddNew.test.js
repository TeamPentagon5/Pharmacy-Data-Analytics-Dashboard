import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddNew from '../Pages/AddNew/AddNew'; // Adjust path if needed
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock axios post
jest.mock('axios');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('AddNew Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form inputs and submit button', () => {
    renderWithRouter(<AddNew titlee="Add New Medicine" />);
    expect(screen.getByLabelText(/Medicine Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Generic Names/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expire Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows validation error if fields are empty or invalid', async () => {
    renderWithRouter(<AddNew titlee="Add New Medicine" />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/Please fill all fields correctly/i)).toBeInTheDocument();
  });

  test('submits form successfully and navigates to /products', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { status: 'success', Message: 'Medicine added successfully!' },
    });

    renderWithRouter(<AddNew titlee="Add New Medicine" />);

    fireEvent.change(screen.getByLabelText(/Medicine Name/i), { target: { value: 'Paracetamol' } });
    fireEvent.change(screen.getByLabelText(/Generic Names/i), { target: { value: 'Acetaminophen' } });
    fireEvent.change(screen.getByLabelText(/Expire Date/i), { target: { value: '2025-12-31' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Button should be disabled and show 'Submitting...'
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();

    // Success message appears
    expect(await screen.findByText(/Medicine added successfully!/i)).toBeInTheDocument();

    // Wait for navigate to be called
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/products');
    }, { timeout: 3000 });
  });

  test('shows error message if submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter(<AddNew titlee="Add New Medicine" />);

    fireEvent.change(screen.getByLabelText(/Medicine Name/i), { target: { value: 'Paracetamol' } });
    fireEvent.change(screen.getByLabelText(/Generic Names/i), { target: { value: 'Acetaminophen' } });
    fireEvent.change(screen.getByLabelText(/Expire Date/i), { target: { value: '2025-12-31' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Failed to submit/i)).toBeInTheDocument();

    // Button re-enabled after failure
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });
});
