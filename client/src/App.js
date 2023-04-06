import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Character';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="characters/:name" element={<Character />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
