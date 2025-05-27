import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './verifycode.scss';

function VerifyCodePage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/VerifyCode/${email}/${otp}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.status === 'success') {
                setMessage('Verification Successful!');
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/reset-password');
                }, 1500);
            } else {
                setMessage(result.Message || 'Invalid OTP or Email. Please try again.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setMessage('An error occurred. Please try again.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="verify-code-container">
            <form className="verify-code-form" onSubmit={handleSubmit}>
                <h2 className="verify-code-header">Verify OTP Code</h2>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="verify-submit-button">
                    Verify Code
                </button>

                {message && (
                    <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default VerifyCodePage;
