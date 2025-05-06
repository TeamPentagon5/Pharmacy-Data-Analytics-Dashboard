import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // For navigation
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';

function AddNew({ titlee }) {
    const [formData, setFormData] = useState({
        medicineName: '',
        genericNames: '',
        expireDate: '',
        Price: '',
        Countity: '',
    });

    const [message, setMessage] = useState(''); // State for success/error messages
    const navigate = useNavigate(); // To redirect users

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate if any field is empty
    const validateForm = () =>
        formData.medicineName.trim() &&
        formData.genericNames.trim() &&
        formData.expireDate.trim() &&
        formData.Price.trim() &&
        formData.Countity.trim();

    // Submit form data using Axios
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!validateForm()) {
            setMessage('Please fill up all the fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/Added', formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                setMessage('Medicine added successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/products'); // Redirect to products page after success
                }, 2000);
            } else {
                setMessage(`Error: ${response.data.Message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to submit. Please try again later.');
        }
    };

    return (
        <div className="add_new">
            <Sidebar />
            <div className="new_page">
                <Navbar />
                <div className="new_page_main">
                    <div className="new_page_content">
                        <p className="add_new_title">{titlee}</p>
                        {message && <p className="form_message">{message}</p>}{' '}
                        {/* Display messages */}
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_field">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="medicineName">Medicine Name</label>
                                <input
                                    id="medicineName"
                                    type="text"
                                    name="medicineName"
                                    placeholder="Enter medicine name"
                                    value={formData.medicineName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_field">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="genericNames">Generic Names</label>
                                <input
                                    id="genericNames"
                                    type="text"
                                    name="genericNames"
                                    placeholder="Enter generic names"
                                    value={formData.genericNames}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_field">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="expireDate">Expire Date</label>
                                <input
                                    id="expireDate"
                                    type="date"
                                    name="expireDate"
                                    value={formData.expireDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_field">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="Price">Price</label>
                                <input
                                    id="Price"
                                    type="number"
                                    name="Price"
                                    placeholder="Enter price"
                                    value={formData.Price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_field">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="Countity">Quantity</label>
                                <input
                                    id="Countity"
                                    type="number"
                                    name="Countity"
                                    placeholder="Enter quantity"
                                    value={formData.Countity}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="submit_btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNew;
