import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';  
import toast from 'react-hot-toast';
import Home from './pages/Home';
import Items from './pages/Items';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactUs from './pages/ContactUs';
import VerifyAdmin from './pages/VerifyAdmin';
import AdminDashboard from './pages/AdminDashboard';
import ManageItems from './pages/ManageItems';
import PendingCases from './pages/PendingCases';
import ResolvedCases from './pages/ResolvedCases';
import ReportLostItem from './pages/ReportLostItem';
import ReportFoundItem from './pages/ReportFoundItem';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const token = localStorage.getItem('adminToken');

      if (window.innerWidth <= 992 && token) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTokenTimestamp');
        toast.error('Please use larger device to access admin dashboard. Admin logged out.');
        window.location.href = '/';  
      }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();  

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  const isAdminLoggedIn = () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div style={{ flex: 1, minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<Items />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/secure/admin/confidential" element={<VerifyAdmin />} />
              <Route path="/report-lost" element={<ReportLostItem />} />
              <Route path="/report-found" element={<ReportFoundItem />} />
              <Route 
                path="/admin/dashboard" 
                element={isAdminLoggedIn() ? <AdminDashboard /> : <Navigate to="/secure/admin/confidential" />} 
              />
              <Route 
                path="/admin/manage-items" 
                element={isAdminLoggedIn() ? <ManageItems /> : <Navigate to="/secure/admin/confidential" />} 
              />
              <Route 
                path="/admin/pending-cases" 
                element={isAdminLoggedIn() ? <PendingCases /> : <Navigate to="/secure/admin/confidential" />} 
              />
              <Route 
                path="/admin/resolved-cases" 
                element={isAdminLoggedIn() ? <ResolvedCases /> : <Navigate to="/secure/admin/confidential" />} 
              />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <>
      <Toaster 
        position="top-center"
        duration={2000}
        richColors
      />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppContent />
        </div>
      </Router>
    </>
  );
};

export default App;
