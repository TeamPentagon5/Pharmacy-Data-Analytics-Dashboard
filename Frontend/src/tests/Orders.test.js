import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Orders from '../Components/Orders/Orders';

// We'll mock child components that are imported inside Orders to keep the test focused

jest.mock(
    '../Components/Navbar/Navbar',
    () =>
        function () {
            return <div data-testid="navbar" />;
        }
);
jest.mock(
    '../Components/Sidebar/Sidebar',
    () =>
        function () {
            return <div data-testid="sidebar" />;
        }
);
jest.mock(
    '../Components/Orders/OrderTabs',
    () =>
        function (props) {
            // Simulate a button to change statusFilter by invoking onStatusChange prop
            return (
                <div data-testid="order-tabs">
                    <button onClick={() => props.onStatusChange('Completed')}>Set Completed</button>
                </div>
            );
        }
);
jest.mock(
    '../Components/Orders/OrderForm',
    () =>
        function () {
            return <div data-testid="order-form" />;
        }
);
jest.mock(
    '../Components/Orders/OrderTable',
    () =>
        function (props) {
            return (
                <div data-testid="order-table">
                    Status: {props.status}
                    <div>Search Results Length: {props.searchResults.length}</div>
                </div>
            );
        }
);

describe('Orders Component', () => {
    test('renders main layout and children components', () => {
        render(<Orders />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('order-tabs')).toBeInTheDocument();
        expect(screen.getByTestId('order-form')).toBeInTheDocument();
        expect(screen.getByTestId('order-table')).toBeInTheDocument();

        // Default statusFilter is 'Pending'
        expect(screen.getByTestId('order-table')).toHaveTextContent('Status: Pending');
        expect(screen.getByTestId('order-table')).toHaveTextContent('Search Results Length: 0');
    });

    test('changes status filter when OrderTabs triggers onStatusChange', async () => {
        render(<Orders />);

        const button = screen.getByRole('button', { name: /set completed/i });
        await userEvent.click(button);

        expect(screen.getByTestId('order-table')).toHaveTextContent('Status: Completed');
    });
});
