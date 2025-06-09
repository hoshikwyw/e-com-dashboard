import React from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import {
  User,
  ShoppingCart,
  Users,
  Tag,
  Store,
  Package,
  UserCircle,
  LayoutDashboard,
  Package2,
  CreditCard,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    label: "Products",
    icon: <Package className="w-5 h-5" />,
    href: "/products",
  },
  { label: "Sellers", icon: <Store className="w-5 h-5" />, href: "/sellers" },
  {
    label: "Customers",
    icon: <Users className="w-5 h-5" />,
    href: "/customers",
  },
  {
    label: "Inventory",
    icon: <Package2 className="w-5 h-5" />,
    href: "/inventory",
  },
  { label: "Coupons", icon: <Tag className="w-5 h-5" />, href: "/coupons" },
  {
    label: "Orders",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "/orders",
  },
  {
    label: "Purchase",
    icon: <CreditCard className="w-5 h-5" />,
    href: "/purchase",
  },
];

interface SidebarProps {
  open?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open = true }) => {
  return (
    <aside
      className={`
        fixed md:static left-0 top-16 z-30
        w-64 h-[calc(100vh-4rem)] bg-white border-r flex flex-col justify-between py-6 px-4 dark:bg-zinc-950 dark:border-zinc-800
        transition-transform duration-200
        overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors w-full text-left ${
                isActive
                  ? "bg-primary-foreground text-background hover:bg-primary-foreground/90"
                  : "text-black-normal-text dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t pt-4 flex items-center gap-3">
        <UserCircle className="w-8 h-8 text-zinc-400" />
        <div>
          <div className="font-semibold text-zinc-800 dark:text-zinc-100">
            Admin Name
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            admin@email.com
          </div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
