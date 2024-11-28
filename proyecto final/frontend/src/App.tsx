import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Users/Profile';
import ResourceList from './components/Resources/ResourceList';
import ResourceForm from './components/Resources/ResourceForm';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resources/new" element={<ResourceForm />} />
        <Route path="/resources/edit/:id" element={<ResourceForm />} />
      </Routes>
    </Router>
  );
}

export default App;
