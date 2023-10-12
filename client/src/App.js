import React, { useState, useEffect } from "react";
import EventBus from "./common/EventBus";
import { Route, Routes, Link, useLocation, matchPath } from "react-router-dom";
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
import CharacterFashion from "./components/CharacterFashion";
import ErrorBoundary from "./ErrorBoundary";

import Cog from './cog.svg';
import Dragon from './dragon.svg';
import CharacterFashionEmbed from "./components/CharacterFashionEmbed";
import ErrorPage from "./components/ErrorPage";

import { Helmet } from "react-helmet";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [newUsername, setNewUsername] = useState("");
  const storedFashion = localStorage.getItem('isFashionOn');
  const isFashionOn = storedFashion === 'true';
  const { pathname } = useLocation();
  const isEmbed = matchPath('/f/*', pathname);

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

  if (isEmbed) {
    document.body.style.backgroundColor = '#202124';
  }
  return (
    <>
      <Helmet>
        <title data-react-helmet="true">GW2Geary</title>
        <meta name="description" content="
        Discover and Inspect GW2 Accounts and Characters.
        Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate tool to explore and inspect Guild Wars 2 accounts and characters.
        With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
        Want to show your gear(armour & weapons) to others? Use GW2Geary!
        " data-react-helmet="true" />
        <meta property="og:title" content="GW2Geary" data-react-helmet="true" />
        <meta name="og:description" content="
        Discover and Inspect GW2 Accounts and Characters.
        Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate tool to explore and inspect Guild Wars 2 accounts and characters.
        With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
        Want to show your gear(armour & weapons) to others? Use GW2Geary!
        " data-react-helmet="true" />
        <meta property="og:url" content="https://gw2geary.com/" data-react-helmet="true" />
      </Helmet>
      {isEmbed
        ? <Routes>
          <Route path="/f/:name" element={<ErrorBoundary><CharacterFashionEmbed /></ErrorBoundary>} />
          <Route path="/f/:name/:eq" element={<ErrorBoundary><CharacterFashionEmbed /></ErrorBoundary>} />
          <Route path="/f/:name/:eq/:bld" element={<ErrorBoundary><CharacterFashionEmbed /></ErrorBoundary>} />
        </Routes>
        : <div className="App">
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
                  <a href="/" className="nav-a" onClick={logOut}>
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
              <Route path="/a/:name" element={<ErrorBoundary><Account /></ErrorBoundary>} />
              {isFashionOn ? (
                <>
                  <Route path="/c/:name" element={<ErrorBoundary><CharacterFashion /></ErrorBoundary>} />
                  <Route path="/c/:name/:eq/:bld" element={<ErrorBoundary><CharacterFashion /></ErrorBoundary>} />
                </>
              ) : (
                <>
                  <Route path="/c/:name" element={<ErrorBoundary><Character /></ErrorBoundary>} />
                  <Route path="/c/:name/:eq/:bld" element={<ErrorBoundary><Character /></ErrorBoundary>} />
                </>
              )}
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/news" element={<News />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      }
    </>
  );
};

export default App;
