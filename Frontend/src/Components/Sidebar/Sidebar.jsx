import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import './Sidebar.scss';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/Home" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">Dashboard</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/Home" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">Lists</p>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Products
                        </li>
                    </Link>
                    <Link to="/orders" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Orders
                        </li>
                    </Link>
                    <li>
                        <CreditCardIcon className="icon" /> Balance
                    </li>
                    <li>
                        <BarChartIcon className="icon" /> Status
                    </li>

                    <p className="spann">Settings</p>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <li>
                            <AccountCircleIcon className="icon" /> Profile
                        </li>
                    </Link>
                    <li>
                        <SettingsRoundedIcon className="icon" /> Setting
                    </li>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Log Out
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
