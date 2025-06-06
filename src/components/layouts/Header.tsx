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
  Menu,
  Search,
  Bell,
  MessageCircle,
  UserCircle,
  LogOut,
  User,
} from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 w-full h-16 flex items-center justify-between px-4 border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
      {/* Sidebar Toggle */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="" />
          <h1 className=" text-primary-foreground md:block sm:hidden">
            Strike Market
          </h1>
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2">
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
