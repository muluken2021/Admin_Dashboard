import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  // Centralized state for the mobile menu
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. Sidebar: Hidden on mobile, fixed on desktop */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* 3. Navbar: Fixed at top */}
        <Navbar 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        {/* 4. Dynamic Page Content: Scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* This is where DashboardHome, Products, etc. will render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;