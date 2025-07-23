"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Home, User, Shield, Menu, LogOut, Settings, Users, BarChart3, FileText, BookOpen, Info, BookOpenCheck, BookOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Define navigation links based on user role
  const getNavLinks = (userRole, isLoggedIn) => {
    // Public navigation links (available to everyone)
    const publicLinks = [
      { href: "/dashboard", icon: Home, label: "Home" },
      { href: "/dashboard/categories", icon: BookOpen, label: "Kategori" },
      { href: "/about", icon: Info, label: "About" },
    ];

    // Admin-only navigation links
    const adminLinks = [
      { href: userRole === "ADMIN" ? "/admin" : "/", icon: Home, label: "Dashboard" },
      { href: "/admin/categories", icon: BookOpen, label: "Kategori Materi", adminOnly: true },
      { href: "/admin/series", icon: BookOpenIcon, label: "Series", adminOnly: true },
      { href: "/admin/materials", icon: BookOpenCheck, label: "Materi", adminOnly: true },


    ];

    // Return appropriate links based on user role
    if (userRole === "ADMIN") {
      return adminLinks;
    } else {
      return publicLinks;
    }
  };

  const navLinks = getNavLinks(session?.user?.role, !!session);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-gray-900">
                SI Learn Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  link.adminOnly
                    ? "text-orange-600 hover:bg-orange-50"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <span className="flex items-center space-x-1">
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}

            {/* Auth Section */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {session.user?.role === "ADMIN" && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Admin
                    </Badge>
                  )}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b">
                    <p className="font-medium text-sm">{session.user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">{session.user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // <Link href="/login">
              //   <Button variant="outline" size="sm">
              //     Admin Login
              //   </Button>
              // </Link>
              <div>
                <span></span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium",
                    link.adminOnly
                      ? "text-orange-600 hover:bg-orange-50"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {session ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user?.image} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-base font-medium text-gray-800">
                        {session.user?.name || "User"}
                      </div>
                      {session.user?.role === "ADMIN" && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                          Admin
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{session.user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              // <div className="pt-4 pb-3 border-t border-gray-200">
              //   <div className="px-2">
              //     <Link href="/login" onClick={() => setMobileOpen(false)}>
              //       <Button variant="outline" className="w-full">
              //         Admin Login
              //       </Button>
              //     </Link>
              //   </div>
              // </div>
              <div>
                <span>
                  
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}