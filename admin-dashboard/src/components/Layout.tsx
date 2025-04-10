import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main content area with scroll */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
