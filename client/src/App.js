import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Account from "./components/Account";
import Accounts from "./components/Accounts";
import Characters from './components/Characters';
import Character from './components/Character';
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="App">
      <nav className="app-nav">
        <Link to={"/"} className="nav-a">
          GW2Geary
        </Link>
        <div className="flex">
          <li>
            <Link to={"/accounts"} className="nav-a">
              Accounts
            </Link>
          </li>
          <li>
            <Link to={"/characters"} className="nav-a">
              Characters
            </Link>
          </li>

          {showModeratorBoard && (
            <li >
              <Link to={"/mod"} className="nav-a">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li>
              <Link to={"/admin"} className="nav-a">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li>
              <Link to={"/profile"} className="nav-a">
                Profile
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="nav-profile-logout">
            <li>
              <Link to={"/profile"} className="nav-a">
                {currentUser.username}
              </Link>
            </li>
            <li >
              <a href="/login" onClick={logOut} className="nav-a">
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="nav-login-register">
            <li>
              <Link to={"/login"} className="nav-a">
                Login
              </Link>
            </li>

            <li>
              <Link to={"/register"} className="nav-a">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:name" element={<Account />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:name" element={<Character />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;