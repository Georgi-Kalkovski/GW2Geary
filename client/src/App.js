import React, { useState, useEffect } from "react";
import EventBus from "./common/EventBus";
import { Route, Routes, Link } from "react-router-dom";
import ToggleLightMode from "./ToggleLightMode";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Account from "./components/Account";
import Character from './components/Character';
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import Footer from "./components/Footer";
import About from "./components/About";
import Contacts from "./components/Contacts";
import News from "./components/News";
import Support from "./components/Support";
import ErrorPage from "./components/ErrorPage";

import Cog from './cog.svg';
import Dragon from './dragon.svg';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
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
    setCurrentUser(undefined);
  };
  return (
    <div className="App">
      <nav className="app-nav">
        <Link to={"/"} className="nav-a left-nav">
          <div className="flex logo-spin">
            <div style={{ fontFamily: 'GW2Font', fontSize: '30px', color: '#aa0404' }}>GW2</div>
            <div className="logo-div">
              <img src={Dragon} alt="" className="logo-dragon" />
              <img src={Cog} alt="" className="logo-cog" />
            </div>
            <div style={{ fontFamily: 'GW2Font', fontSize: '30px' }}>Geary</div>
          </div>
        </Link>

        {currentUser ? (
          <div className="nav-profile-logout right-nav">

            <ToggleLightMode />
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
          <div className="nav-profile-logout right-nav">

            <ToggleLightMode />
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
          {currentUser
            ? <Route path="/profile" element={<Profile />} />
            : <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          }
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/accounts/:name" element={<Account />} />
          <Route path="/a/:name" element={<Account />} />
          <Route path="/characters/:name" element={<Character />} />
          <Route path="/c/:name" element={<Character />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/news" element={<News />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
