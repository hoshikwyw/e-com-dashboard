import React, { useEffect, useState } from "react";
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
import AddNewSellerPage from "./components/pages/seller/AddNewSellerPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if we should apply the margin based on window width
  const shouldApplyMargin = sidebarOpen && windowWidth >= 1000;
  const showOverlay = !shouldApplyMargin && sidebarOpen;

  return (
    <div className="flex flex-col relative overflow-hidden">
      <div className=" fixed top-0 z-50 w-full mb-6">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className="flex flex-1 mt-12 overflow-hidden">
        {showOverlay && (
          <div
            className="fixed inset-0 bg-gray-100/60 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar open={sidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <main
          className={`flex-1 h-full overflow-y-auto p-6 bg-muted transition-all duration-200 ${
            shouldApplyMargin ? "ml-64" : "ml-0"
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
              <Route path="/sellers/new" element={<AddNewSellerPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
