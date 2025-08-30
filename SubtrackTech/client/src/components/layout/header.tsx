import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getInitials = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase() + (user.lastName?.charAt(0).toUpperCase() || "");
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split("@")[0] || "User";
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden p-2"
        onClick={onMenuClick}
        data-testid="button-mobile-menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </Button>

      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground" data-testid="text-welcome-message">
          Welcome back, {getDisplayName()}
        </h1>
        <p className="text-sm text-muted-foreground">Manage your subscriptions and track your spending</p>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          className="flex items-center gap-3 p-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          data-testid="button-profile-dropdown"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground" data-testid="text-user-initials">
              {getInitials()}
            </span>
          </div>
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
          </svg>
        </Button>
        
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-50">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary/50"
              onClick={() => {
                setDropdownOpen(false);
                // Navigate to profile - for now just close dropdown
              }}
              data-testid="button-profile"
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary/50"
              onClick={() => {
                setDropdownOpen(false);
                // Navigate to settings - for now just close dropdown
              }}
              data-testid="button-settings"
            >
              Settings
            </button>
            <hr className="my-1 border-border" />
            <button
              className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary/50"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
