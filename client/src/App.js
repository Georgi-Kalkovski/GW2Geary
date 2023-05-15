import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Accounts from './components/Accounts';
import Character from './components/Character';
import Logout from './components/Logout';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          {!isLoggedIn && (
            <>
              <Route
                path="/register"
                element={<Register handleLogin={handleLogin} />}
              />
              <Route
                path="/login"
                element={<Login handleLogin={handleLogin} />}
              />
              <Route path="*" element={<Home />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route
                path="/characters/:name"
                element={<Character />}
              />
              <Route
                path="/accounts"
                element={<Accounts />}
              />
              <Route
                path="/logout"
                element={<Logout handleLogout={handleLogout} />}
              />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
