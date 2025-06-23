import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddNew from '../Pages/AddNew/AddNew';

// ✅ Mock Navbar and Sidebar to avoid importing images
jest.mock('../Components/Navbar/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../Components/Sidebar/Sidebar', () => () => <div data-testid="sidebar" />);

describe('AddNew Component', () => {
  test('renders form inputs and submit button correctly', () => {
    render(
      <MemoryRouter>
        <AddNew titlee="Add New Medicine" />
      </MemoryRouter>
    );

    // Check if all form fields and button exist
    expect(screen.getByLabelText(/Medicine Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Generic Names/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expire Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows error message if form is submitted with empty inputs', () => {
    render(
      <MemoryRouter>
        <AddNew titlee="Add New Medicine" />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/Please fill all fields correctly/i)
    ).toBeInTheDocument();
  });

  test('shows error message if price or quantity are invalid', () => {
    render(
      <MemoryRouter>
        <AddNew titlee="Add New Medicine" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Medicine Name/i), {
      target: { value: 'Paracetamol' },
    });
    fireEvent.change(screen.getByLabelText(/Generic Names/i), {
      target: { value: 'Acetaminophen' },
    });
    fireEvent.change(screen.getByLabelText(/Expire Date/i), {
      target: { value: '2025-12-31' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '-10' }, // Invalid
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: '0' }, // Invalid
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/Please fill all fields correctly/i)
    ).toBeInTheDocument();
  });
});
