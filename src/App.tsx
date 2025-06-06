import React, { useState } from "react";
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
  const [activeNav, setActiveNav] = useState("customers");

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const navComponents: { [key: string]: React.ReactNode } = {
    customers: <Customers />,
    orders: <Orders />,
    products: <Products />,
    coupons: <Coupons />,
    purchase: <Purchase />,
    sellers: <Sellers />,
    dashboard: <Dashboard />,
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar
            open={sidebarOpen}
            onNavClick={setActiveNav}
            activeNav={activeNav}
          />
        </div>
        <main className="flex-1 bg-muted p-6 overflow-y-auto">
          {navComponents[activeNav]}
        </main>
      </div>
    </div>
  );
}

export default App;
