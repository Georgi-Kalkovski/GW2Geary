import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Accounts from './components/Accounts';
import Character from './components/Character';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/accounts" Component={Accounts} />
          <Route path="characters/:name" Component={Character} />
          <Route path="*" Component={Home} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
