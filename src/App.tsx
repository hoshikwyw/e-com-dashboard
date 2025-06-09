import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <Router>
      <div className="flex flex-col h-screen relative overflow-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />
        <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
          <div className="flex-shrink-0">
            <Sidebar open={sidebarOpen} />
          </div>
          <main className="flex-1 h-full overflow-y-scroll p-6 bg-muted [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="max-w-full h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] overflow-x-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/sellers" element={<Sellers />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
