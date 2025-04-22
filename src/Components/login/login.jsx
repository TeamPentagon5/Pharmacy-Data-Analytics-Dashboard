import axios from 'axios'; // Import axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './login.scss';

function LoginPage() {
    const [username, setUsername] = useState(''); // Username for the email
    const [password, setPassword] = useState(''); // Password for the user
    const [message, setMessage] = useState(''); // For displaying messages (error/success)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Create the request body
        const reqBody = {
            email: username,
            password,
        };

        try {
            // Send POST request to the backend login API
            const response = await axios.post('http://localhost:5000/api/Login', reqBody);

            // Check the response status
            if (response.data.status === 'success') {
                // If login is successful, store the token in localStorage (or sessionStorage)
                localStorage.setItem('authToken', response.data.Token);
                // Redirect to the home page (or any other page)
                navigate('/');
            } else {
                // Show failure message if login is unsuccessful
                setMessage(response.data.Message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const goToRegistration = () => {
        navigate('/registration'); // Redirect to the registration page
    };

    const forgotPassword = () => {
        navigate('/forgot'); // Redirect to the forgot password page
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-header">Login</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
                {message && <p className="response-message">{message}</p>}
                <div className="extra-buttons">
                    <button
                        type="button"
                        className="forgot-password-button"
                        onClick={forgotPassword}
                    >
                        Forgot Password
                    </button>
                    <button type="button" className="register-button" onClick={goToRegistration}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
