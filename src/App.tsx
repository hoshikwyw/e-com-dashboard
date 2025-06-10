import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import {
  Coupons,
  Customers,
  Dashboard,
  Orders,
  Products,
  Purchase,
  Sellers,
} from "./pages";
import SellerDetailPage from "./components/pages/seller/SellerDetailsPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="flex flex-col relative overflow-hidden">
      <div className=" fixed top-0 z-50 w-full mb-6">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className="flex flex-1 mt-12 overflow-hidden">
        <Sidebar open={sidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <main
          className={`flex-1 h-full overflow-y-auto p-6 bg-muted transition-all duration-200 ${
            sidebarOpen ? "md:ml-64" : "md:ml-0"
          }`}
        >
          <div className="max-w-full h-full">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/sellers" element={<Sellers />} />
               <Route path="/sellers/:id" element={<SellerDetailPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
