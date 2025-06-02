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
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          open={sidebarOpen}
          onNavClick={setActiveNav}
          activeNav={activeNav}
        />
        <main className="flex-1 bg-muted p-6">{navComponents[activeNav]}</main>
      </div>
    </div>
  );
}

export default App;
