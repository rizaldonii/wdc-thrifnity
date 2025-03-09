"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sun,
  Moon,
  Heart,
  Bell,
  Mail,
  ShoppingCart,
  Menu,
  User,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";

// NavIconButton component with improved styling
interface NavIconButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
}

const NavIconButton = ({ icon, label, count = 0 }: NavIconButtonProps) => {
  return (
    <button
      className="relative group flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/20 transition-all duration-300"
      aria-label={label}
    >
      <div className="relative">
        {icon}
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-medium bg-rose-500 text-white rounded-full px-1 border border-white">
            {count}
          </span>
        )}
      </div>
      <span className="absolute top-full mt-1 opacity-0 group-hover:opacity-100 text-[10px] font-medium text-foreground bg-white/90 backdrop-blur-md shadow-md px-2 py-1 rounded-md transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-background/90">
        {label}
      </span>
    </button>
  );
};

// Mobile menu item with improved styling
interface MobileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
}

const MobileMenuItem = ({ icon, label, count = 0 }: MobileMenuItemProps) => {
  return (
    <Link
      href="#"
      className="flex items-center justify-between p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center text-primary dark:text-foreground">
          {icon}
        </div>
        <span className="text-primary-dark font-medium dark:text-foreground">
          {label}
        </span>
      </div>
      {count > 0 && (
        <span className="flex items-center justify-center min-w-[20px] h-[20px] text-xs font-medium bg-rose-500 text-white rounded-full px-1">
          {count}
        </span>
      )}
    </Link>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Check if it's light mode
  const isLightMode = theme !== "dark";

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/95 dark:bg-background/85 shadow-lg shadow-primary/10 border-b border-primary/10 dark:border-primary/5"
          : isLightMode
          ? "bg-gradient-to-r from-white/95 via-white/90 to-white/95"
          : "bg-gradient-to-r from-background/70 via-background/60 to-background/70"
      } before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-b before:from-primary/5 before:to-transparent before:dark:from-primary/10 before:pointer-events-none`}
    >
      {/* Ambient light effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-4 top-1/2 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse mix-blend-multiply dark:mix-blend-overlay"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -right-4 top-0 w-64 h-64 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse mix-blend-multiply dark:mix-blend-overlay"
          style={{ animationDuration: "12s" }}
        />
      </div>
      <nav
        className={`container relative max-w-7xl mx-auto px-4 sm:px-6 py-1 ${
          scrolled
            ? isLightMode
              ? "bg-gradient-to-r from-white/80 to-primary/5 border border-primary/10"
              : "bg-[var(--color-accent)]/95"
            : isLightMode
            ? "bg-gradient-to-r from-white/90 to-primary/5 border border-primary/10"
            : "bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-secondary)]/80"
        } backdrop-blur-md rounded-xl transition-all duration-300 shadow-blue`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group"
          >
            <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[45px] md:h-[45px]">
              <Image
                src="/LOGO.svg"
                alt="Thriftnity"
                fill
                className="object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                sizes="(max-width: 640px) 38px, (max-width: 768px) 42px, 45px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-primary-dark dark:text-foreground tracking-tight leading-none">
                Thriftnity
              </h1>
              <span className="text-[10px] text-primary/70 dark:text-muted-foreground tracking-widest uppercase -mt-0.5">
                Fashion Redefined
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-xl mx-4">
            <div
              className={`relative backdrop-blur-md transition-all duration-300 ${
                isSearchFocused
                  ? "bg-white shadow-md ring-2 ring-primary dark:bg-[var(--color-accent)]/95 dark:ring-[var(--color-primary-light)] transform scale-[1.02]"
                  : "bg-white/90 hover:bg-white dark:bg-[var(--color-accent)]/85 dark:hover:bg-[var(--color-accent)]/90 ring-1 ring-primary/30 hover:ring-primary/60 dark:ring-[var(--color-primary-light)]/20 dark:hover:ring-[var(--color-primary-light)]/40"
              } rounded-xl overflow-hidden group hover:shadow-md`}
            >
              <div className="flex items-center px-4 py-2.5">
                <Search
                  className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                    isSearchFocused
                      ? "text-primary dark:text-[var(--color-primary-light)]"
                      : "text-muted group-hover:text-primary dark:text-[var(--text-subtle)] dark:group-hover:text-[var(--color-primary-light)]"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Cari produk thrift..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-1.5 bg-transparent focus:outline-none text-primary-dark dark:text-[var(--text-primary)] placeholder:text-muted/90 dark:placeholder:text-[var(--text-subtle)]/75 transition-colors"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchValue && (
                  <button
                    className={`ml-2 p-1.5 rounded-lg transition-all duration-200 ${
                      isSearchFocused
                        ? "bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-dark"
                        : "bg-muted/10 hover:bg-primary/10 text-muted hover:text-primary"
                    }`}
                    aria-label="Clear search"
                    onClick={() => setSearchValue("")}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search button for mobile */}
            <button
              className="sm:hidden relative p-2 rounded-full hover:bg-primary/15 transition-colors duration-200"
              onClick={() => setIsSearchFocused(!isSearchFocused)}
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-primary-dark dark:text-foreground" />
            </button>

            {/* Theme toggle */}
            <button
              className="relative p-2 rounded-full hover:bg-primary/15 transition-colors duration-200"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-primary-dark" />
              )}
            </button>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <NavIconButton
                icon={
                  <Heart className="w-5 h-5 text-primary-dark dark:text-foreground" />
                }
                label="Wishlist"
                count={3}
              />
              <NavIconButton
                icon={
                  <Bell className="w-5 h-5 text-primary-dark dark:text-foreground" />
                }
                label="Notifikasi"
                count={2}
              />
              <NavIconButton
                icon={
                  <Mail className="w-5 h-5 text-primary-dark dark:text-foreground" />
                }
                label="Pesan"
                count={5}
              />
              <NavIconButton
                icon={
                  <ShoppingCart className="w-5 h-5 text-primary-dark dark:text-foreground" />
                }
                label="Keranjang"
                count={1}
              />
            </div>

            {/* User Avatar - Desktop */}
            <button
              className="hidden md:flex relative items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-200"
              aria-label="Profile"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-primary/30">
                <Image
                  src="/placeholder.svg?height=28&width=28"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span className="text-sm font-medium text-primary-dark dark:text-foreground">
                Account
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden menu-button p-2 rounded-full hover:bg-primary/15 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary-dark dark:text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-primary-dark dark:text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Slide down when active */}
        <AnimatePresence>
          {isSearchFocused && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden overflow-hidden pb-3"
            >
              <div className="bg-white/80 dark:bg-primary/10 backdrop-blur-md rounded-full overflow-hidden shadow-md border border-primary/20">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Cari produk thrift..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full py-2.5 px-5 pr-12 rounded-full text-primary-dark dark:text-foreground bg-transparent focus:outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <button
                    className="absolute right-4 text-primary/70 hover:text-primary transition-colors duration-200 dark:text-muted-foreground dark:hover:text-foreground"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mobile-menu absolute left-0 right-0 mt-2 mx-4 z-50 overflow-hidden rounded-2xl shadow-xl"
          >
            <div className="bg-white/95 dark:bg-background/95 backdrop-blur-xl p-4 border border-primary/10">
              {/* User profile in mobile menu */}
              <div className="flex items-center gap-3 p-3 mb-3 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10">
                <div className="relative w-10 h-10 rounded-full border border-primary/30">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User Avatar"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <span className="text-primary-dark dark:text-foreground font-medium">
                    Pengguna Thriftnity
                  </span>
                  <p className="text-primary/70 dark:text-muted-foreground text-sm">
                    pengguna@email.com
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <MobileMenuItem
                  icon={<Heart className="w-5 h-5" />}
                  label="Wishlist"
                  count={3}
                />
                <MobileMenuItem
                  icon={<Bell className="w-5 h-5" />}
                  label="Notifikasi"
                  count={2}
                />
                <MobileMenuItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Pesan"
                  count={5}
                />
                <MobileMenuItem
                  icon={<ShoppingCart className="w-5 h-5" />}
                  label="Keranjang"
                  count={1}
                />
                <MobileMenuItem
                  icon={<User className="w-5 h-5" />}
                  label="Profil"
                  count={0}
                />
              </div>

              <div className="mt-4 pt-4 border-t border-primary/20">
                <button className="w-full flex items-center gap-3 text-white p-3 rounded-xl bg-rose-500/90 hover:bg-rose-500 transition-colors duration-200 shadow-sm">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Keluar</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
