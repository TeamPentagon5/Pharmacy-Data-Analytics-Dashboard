import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './resetpassword.scss';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/ResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code, password }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                setMessage(result.Message);
                setTimeout(() => navigate('/login'), 1500); // Redirect after success
            } else {
                setMessage(result.Message);
            }
        } catch (error) {
            setMessage('Something went wrong!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter OTP Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Reset Password'}
                </button>

                {message && <p className="response">{message}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
