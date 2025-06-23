import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './orders.scss';
import OrderTabs from './OrderTabs';
import SearchBar from './SearchBar';
import OrderForm from './OrderForm';
import OrderTable from './OrderTable';

function Orders() {
    const [statusFilter, setStatusFilter] = useState('Pending');
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div className="orders">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="orders_main">
                <Navbar />

                <div className="orders_container">
                    <OrderTabs onStatusChange={setStatusFilter} />
                    {/* <SearchBar setResults={setSearchResults} /> */}
                    <OrderForm />
                    <OrderTable status={statusFilter} searchResults={searchResults} />
                </div>
            </div>
        </div>
    );
}

export default Orders;
