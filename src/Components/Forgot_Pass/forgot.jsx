import axios from 'axios'; // Import axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './forgot.scss';

function EmailEntryPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // For displaying backend response
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send GET request to verify email using axios
            const response = await axios.get(`http://localhost:5000/api/EmailVerify/${email}`);

            // Check if the email exists (success response from backend)
            if (response.data.status === 'success') {
                setMessage(response.data.Message); // Display success message
                navigate('/'); // Redirect to the verify code page on success
            } else {
                setMessage(response.data.Message); // Display failure message (e.g., "Email does not exist")
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="email-entry-container">
            <form className="email-entry-form" onSubmit={handleSubmit}>
                <h2 className="email-entry-header">Enter Your Email Address</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="email-submit-button">
                    Submit
                </button>
                {message && <p className="response-message">{message}</p>}
                {/* Display success or failure message */}
            </form>
        </div>
    );
}

export default EmailEntryPage;
