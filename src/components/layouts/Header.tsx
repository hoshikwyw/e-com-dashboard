import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  MessageCircle,
  UserCircle,
  LogOut,
  User,
  Menu,
} from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar }) => {
  return (
    <header
      className={`fixed top-0 z-40 w-full h-16 flex items-center justify-between border-b bg-white dark:bg-zinc-950 dark:border-zinc-800 ${
        sidebarOpen ? "md:pl-64" : "md:pl-4"
      } transition-all duration-200 relative`}
    >
      <Button
        variant="ghost"
        className={` block`}
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="" color="#667085" />
      </Button>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4">
        {/* Search */}
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="w-5 h-5" />
        </Button>
        {/* Alarm */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </Button>
        {/* Messages */}
        <Button variant="ghost" size="icon" aria-label="Messages">
          <MessageCircle className="w-5 h-5" />
        </Button>
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="w-7 h-7 text-zinc-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (window.location.href = "/profile")}
            >
              <User className="w-4 h-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                /* handle logout logic */
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
