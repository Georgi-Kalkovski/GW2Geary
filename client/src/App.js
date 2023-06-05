import React, { useState, useEffect } from "react";
import EventBus from "./common/EventBus";
import { Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Account from "./components/Account";
import Character from './components/Character';
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import BoardUser from "./components/Board/BoardUser";
import BoardModerator from "./components/Board/BoardModerator";
import BoardAdmin from "./components/Board/BoardAdmin";

import Cog from './cog.svg'
import Dragon from './dragon.svg'
import HamburgerMenu from './hamburger-menu.svg'

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [newUsername, setNewUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

    EventBus.on("usernameChanged", (newUsername) => {
      setNewUsername(newUsername);
    });

    return () => {
      EventBus.remove("logout");
      EventBus.remove("usernameChanged");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <nav className="app-nav">
        <Link to={"/search"} className="nav-a">
          <div className="flex logo-spin">
            <div style={{ fontFamily: 'GW2Font', fontSize: '30px', color: '#aa0404' }}>GW2</div>
            <div className="logo-div">
              <img src={Dragon} alt="" className="logo-dragon" />
              <img src={Cog} alt="" className="logo-cog" />
            </div>
            <div style={{ fontFamily: 'GW2Font', fontSize: '30px' }}>Geary</div>
          </div>
        </Link>
        <div className="flex nav-center">
          <li>
            <Link to={"/search"} className="nav-a">
              Search
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
            <li style={{ paddingRight: '10px' }}>
              {`Welcome, `}
              <Link to={"/profile"} className="nav-a yellow-highlight">
                {`${newUsername ? newUsername : currentUser.username}`}
              </Link>
            </li>
            <li>
              <a href="/search" className="nav-a" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="nav-profile-logout">
            <li>
              <Link to={"/login"} className="nav-a">
                Login
              </Link>
            </li>

            <li>
              <Link to={"/register"} className="nav-a">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="app-body content">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/accounts/:name" element={<Account />} />
          <Route path="/characters/:name" element={<Character />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {showModeratorBoard && (
            <Route path="/mod" element={<BoardModerator />} />
          )}
          {showAdminBoard && (
            <Route path="/admin" element={<BoardAdmin />} />
          )}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<BoardUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
