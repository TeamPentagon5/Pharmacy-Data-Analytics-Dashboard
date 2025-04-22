import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import { ColorContext } from './ColorContext/darkContext';
import RegistrationPage from './Components/Registration/registration';
import Valid from './Pages/Forgot/forgot';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Login />} />
                        <Route path="registration" element={<RegistrationPage />} />
                        <Route path="forgot" element={<Valid />} />
                        <Route path="navbar" element={<Navbar />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
