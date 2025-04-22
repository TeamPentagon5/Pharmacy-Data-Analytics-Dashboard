import axios from 'axios'; // Import Axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.scss';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/Registration', formData);

            if (response.data.status === 'success') {
                setSuccessMessage(response.data.Message);
                setTimeout(() => {
                    navigate('/Login'); // Redirect to login page
                }, 2000);
            } else {
                setErrorMessage(response.data.Message);
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <h2 className="registration-header">Register</h2>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegistrationPage;
