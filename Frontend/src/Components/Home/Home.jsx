// Home.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TableList/TableList';
import './Home.scss';

function Home() {
    const location = useLocation();
    const successMessage = location.state?.message;

    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />

                {successMessage && <div className="success-banner">✅ {successMessage}</div>}

                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="user" />
                    <ItemLists type="orders" />
                    <ItemLists type="products" />
                    <ItemLists type="balance" />
                </div>

                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="Revenue" />
                </div>

                <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

export default Home;
