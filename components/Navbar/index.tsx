"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Scissors,
  Repeat2,
  Users,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  {
    label: "Shop",
    href: "/products",
    icon: ShoppingCart,
  },
  {
    label: "Tailors",
    href: "/tailors",
    icon: Scissors,
  },
  {
    label: "Trade",
    href: "/trade",
    icon: Repeat2,
  },
  {
    label: "Community",
    href: "/community",
    icon: Users,
  },
];

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  featured?: boolean;
}

const NavLink = ({
  href,
  icon: Icon,
  label,
  isActive,
  featured,
}: NavLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className={cn(
          "relative px-4 py-2 rounded-full transition-all duration-300",
          "hover:bg-primary/10 dark:hover:bg-primary/20",
          "flex items-center gap-2",
          isActive && "text-primary dark:text-primary font-medium",
          featured && "bg-primary/5"
        )}
      >
        <Icon className="w-4 h-4" />
        <span className={cn("text-sm", featured && "font-medium")}>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    </div>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconButtonClasses = cn(
    "p-2 rounded-full transition-all duration-300",
    "hover:bg-primary/10 dark:hover:bg-primary/20",
    "relative flex items-center justify-center"
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
      )}
    >
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-xs font-medium">
        <p>Free shipping on all orders over Rp 500.000 • Limited time offer</p>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/LOGO.svg"
              alt="Thriftnity"
              width={40}
              height={40}
              className="w-8 h-8"
              priority
            />
            <span className="font-bold text-xl tracking-tight">Thriftnity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                isActive={
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                }
              />
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  className="flex items-center bg-muted rounded-full overflow-hidden px-3"
                >
                  <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none focus:outline-none py-2 px-2 w-full text-sm"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="focus:outline-none flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ) : (
                <button
                  className={iconButtonClasses}
                  aria-label="Search"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </AnimatePresence>

            {/* Wishlist */}
            <Link href="/wishlist" className={iconButtonClasses}>
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] text-primary-foreground rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className={iconButtonClasses}>
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] text-primary-foreground rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </Link>

            {/* Notifications */}
            <button className={cn(iconButtonClasses, "hidden sm:flex")}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] text-primary-foreground rounded-full flex items-center justify-center font-medium">
                5
              </span>
            </button>

            {/* Theme Toggle - Replaced with ThemeToggle component */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Profile */}
            <Link
              href="/profile"
              className={cn(iconButtonClasses, "hidden sm:flex")}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("md:hidden", iconButtonClasses)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 py-4">
                {navItems.map((item) => (
                  <div key={item.href} className="flex flex-col">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg",
                        "hover:bg-primary/5 dark:hover:bg-primary/10",
                        "transition-all duration-300",
                        pathname === item.href &&
                          "bg-primary/10 dark:bg-primary/20 font-medium"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2">
                  <Link
                    href="/profile"
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs">Profile</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="text-xs">Alerts</span>
                  </Link>

                  {/* Theme Toggle in Mobile Menu */}
                  <div
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ThemeToggle isMobile={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
