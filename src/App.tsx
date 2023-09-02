import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sets from './pages/Sets';
import Pokedex from "./pages/Pokedex";
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
