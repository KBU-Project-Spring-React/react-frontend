import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
