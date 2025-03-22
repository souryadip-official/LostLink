import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactUs from './pages/ContactUs';  // Import ContactUs page
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Added Footer globally

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact-us" element={<ContactUs />} />  {/* Add Contact Us route */}
          </Routes>
        </div>
        <Footer style={{ marginTop: 'auto' }} />  {/* Ensure footer stays at the bottom */}
      </div>
    </Router>
  );
};

export default App;
