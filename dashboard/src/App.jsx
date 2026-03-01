import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Pages
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Products from './pages/Products';
import OrderLists from './pages/OrderLists';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* All routes inside DashboardLayout will share the Sidebar and Navbar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order-lists" element={<OrderLists />} />
        </Route>

        {/* Fallback for 404 - outside the layout so it can be a full-screen error if needed */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center font-bold text-2xl text-gray-400 uppercase tracking-widest">404 | Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;