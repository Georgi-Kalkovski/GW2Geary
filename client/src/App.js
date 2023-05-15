import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Accounts from './components/Accounts';
import Character from './components/Character';
import Logout from './components/Logout';
// import User from './components/User';
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
    <Router>
      <div className="App">
        <nav className="app-nav">
          <ul className="app-ul">
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
              <>
                {/* <li>
                  <Link to="/user">User</Link>
                </li> */}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
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
              {/* <Route path="/user" element={<Navigate to="/" />} /> */}
              <Route path="*" element={<Home />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/characters/:name" element={<Character />} />
              <Route path="/accounts" element={<Accounts />} />
              {/* <Route
                path="/user"
                element={<User isLoggedIn={isLoggedIn} />}
              /> */}
              <Route
                path="/logout"
                element={<Logout handleLogout={handleLogout} />}
              />
              <Route path="*" element={<Home />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
