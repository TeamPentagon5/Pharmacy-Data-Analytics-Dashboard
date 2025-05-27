import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';

function AddNew({ titlee }) {
    const [formData, setFormData] = useState({
        medicineName: '',
        genericNames: '',
        expireDate: '',
        price: '',
        quantity: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate all fields are filled and price/quantity are positive numbers
    const validateForm = () =>
        formData.medicineName.trim() &&
        formData.genericNames.trim() &&
        formData.expireDate.trim() &&
        formData.price.trim() &&
        // eslint-disable-next-line no-restricted-globals
        !isNaN(Number(formData.price)) &&
        Number(formData.price) > 0 &&
        formData.quantity.trim() &&
        // eslint-disable-next-line no-restricted-globals
        !isNaN(Number(formData.quantity)) &&
        Number(formData.quantity) > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage(
                'Please fill all fields correctly. Price and Quantity must be positive numbers.'
            );
            return;
        }

        try {
            setLoading(true);
            setMessage('');

            // Convert price and quantity to numbers before sending
            const payload = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
            };

            console.log('Submitting data:', payload);

            const response = await axios.post('http://localhost:5000/api/Added', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Backend response:', response.data);

            if (response.status === 200 && response.data.status === 'success') {
                setMessage('Medicine added successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/products');
                }, 2000);
            } else {
                setMessage(`Error: ${response.data.Message || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to submit. Please try again later.');
        } finally {
            setLoading(false);
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
                        {message && <p className="form_message">{message}</p>}

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
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_field">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="submit_btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNew;
