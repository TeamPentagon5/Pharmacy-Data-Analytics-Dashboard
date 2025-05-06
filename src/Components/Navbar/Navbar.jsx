import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Import MUI icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import { ColorContext } from '../../ColorContext/darkContext';

// Import styles and images
import './navbar.scss';
import admin from '../../Images/admin_pic.jpg';

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false); // State for notification toggle
    const { darkMode, dispatch } = useContext(ColorContext);

    const handleToggle = () => setToggle(!toggle);

    const handleNotificationToggle = () => setShowNotifications(!showNotifications);

    return (
        <div className="navbar">
            <div className="navbar_main">
                <div className="menu_logo">
                    {toggle ? (
                        <CloseIcon className="menu_icon" onClick={handleToggle} />
                    ) : (
                        <MenuIcon className="menu_icon" onClick={handleToggle} />
                    )}

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h3 className="text_none">Dashboard</h3>
                    </Link>
                </div>

                <div className="search">
                    <input type="text" placeholder="Search.." />
                    <SearchIcon className="search_icon" />
                </div>

                <div className="item_lists">
                    <div className="item item_lan">
                        <LanguageIcon className="item_icon" />
                        <p>English</p>
                    </div>

                    <div className="item">
                        {!darkMode ? (
                            <DarkModeIcon
                                className="item_icon"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        ) : (
                            <LightModeIcon
                                className="item_icon white"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        )}
                    </div>

                    <div className="item">
                        <FullscreenExitIcon className="item_icon" />
                    </div>

                    <div className="item notification">
                        <NotificationsNoneIcon
                            className="item_icon"
                            onClick={handleNotificationToggle}
                        />
                        <span className="badge">3</span> {/* Hardcoded badge count */}
                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="notifications_dropdown">
                                <p className="notif_title">Notifications</p>
                                <ul>
                                    <li>You have 1 new message.</li>
                                    <li>Server updated successfully.</li>
                                    <li>Order #1234 has been delivered.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="item">
                        <img className="admin_pic" src={admin} alt="admin" />
                    </div>
                </div>
            </div>

            {/* Responsive Navbar */}
            <div className="res_navbar">
                {toggle && (
                    <div className="res_nav_menu">
                        <div className="res_nav_menuu">
                            <div className="links">
                                <ul>
                                    <p className="spann">Main</p>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <li>
                                            <DashboardIcon className="icon" /> Dashboard
                                        </li>
                                    </Link>

                                    <p className="spann">Lists</p>
                                    <Link to="/users" style={{ textDecoration: 'none' }}>
                                        <li>
                                            <AccountCircleIcon className="icon" /> Users
                                        </li>
                                    </Link>

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
                                    <li>
                                        <SettingsRoundedIcon className="icon" /> Settings
                                    </li>
                                    <li>
                                        <LogoutIcon className="icon" /> Log Out
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
