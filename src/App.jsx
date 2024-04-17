import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaBatteryThreeQuarters, FaWifi, FaSignal } from 'react-icons/fa';
import './App.css';
import Login from './components/login/Login';
import Challenge from './components/challenge/Challenge';

const App = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => setDate(new Date()), 60000);
      return function cleanup() {
        clearInterval(timer);
      }
  });

  return (
    <BrowserRouter>
      <div className="mobile-container">
        <div className="mobile-content">
          <div className="mobile-header">
            <p>{date.getHours()}:{date.getMinutes()}</p>
            <div className="mobile-indicators">
              <FaSignal/>
              <FaWifi/>
              <FaBatteryThreeQuarters/>
            </div>
          </div>
          <div className="mobile-body">
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route exact path='/challenge' element={<Challenge/>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
