import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot.scss';

function EmailEntryPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setMessage('');

        try {
            const response = await axios.get(`http://localhost:5000/api/EmailVerify/${email}`);

            if (response.data.status === 'success') {
                setMessage(response.data.Message);
                setTimeout(() => {
                    navigate('/verifycode');
                }, 1000);
            } else {
                setMessage(response.data.Message);
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
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

                <button type="submit" className="email-submit-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Submit'}
                </button>

                {loading && <div className="loader" />}

                {message && <p className="response-message">{message}</p>}
            </form>
        </div>
    );
}

export default EmailEntryPage;
