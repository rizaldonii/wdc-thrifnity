"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Heart,
  Menu,
  Repeat2,
  Scissors,
  Search,
  ShoppingCart,
  User,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "../ui/badge";

// Define nav items in a separate constant for better maintainability
const NAV_ITEMS = [
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
];

// Popular categories and recent searches for better reusability
const POPULAR_CATEGORIES = [
  "Dresses",
  "Tops",
  "Shoes",
  "Vintage",
  "Sustainable",
];
const RECENT_SEARCHES = [
  "Vintage Dress",
  "Denim Jacket",
  "Summer Collection",
  "Eco-friendly",
];

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  featured?: boolean;
  onClick?: () => void;
}

const NavLink = ({
  href,
  icon: Icon,
  label,
  isActive,
  featured,
  onClick,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 rounded-full transition-all duration-300",
        "hover:bg-primary/10 dark:hover:bg-primary/20",
        "flex items-center gap-2",
        isActive && "text-primary dark:text-primary font-medium",
        featured && "bg-primary/5"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      <span className={cn("text-sm", featured && "font-medium")}>{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Extract color mode detection to a separate state with useEffect
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Use throttled event listener for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const searchContainer = document.getElementById("search-container");

      if (
        isSearchOpen &&
        searchContainer &&
        !searchContainer.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Escape key handler for search and mobile menu
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isSearchOpen, isMobileMenuOpen]);

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearchItemClick = (term: string) => {
    setSearchQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
  };

  const iconButtonClasses = cn(
    "p-2 rounded-full transition-all duration-300",
    "hover:bg-primary/10 dark:hover:bg-primary/20",
    "relative flex items-center justify-center",
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
    "dark:focus:ring-offset-gray-900"
  );

  const cartCount = 3;
  const wishlistCount = 2;
  const notificationCount = 5;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <nav className="container mx-auto px-4" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Thriftnity Home"
          >
            <Image
              src="/LOGO.svg"
              alt=""
              width={40}
              height={40}
              className="w-8 h-8"
              priority
            />
            <span className="font-bold text-xl tracking-tight">Thriftnity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2" role="navigation">
            {NAV_ITEMS.map((item) => (
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
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  id="search-container"
                  initial={{ width: 40, scale: 0.8, opacity: 0 }}
                  animate={{ width: "300px", scale: 1, opacity: 1 }}
                  exit={{ width: 40, scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  className="relative"
                >
                  <motion.form
                    onSubmit={handleSearch}
                    className={cn(
                      "flex items-center gap-2",
                      "bg-background border rounded-full overflow-hidden px-4 py-2",
                      "shadow-sm hover:shadow-md transition-shadow duration-300",
                      "focus-within:ring-2 focus-within:ring-primary/20",
                      isDark ? "border-primary/20" : "border-primary/10"
                    )}
                  >
                    <Search
                      className={cn(
                        "w-4 h-4 flex-shrink-0 transition-colors duration-200",
                        searchQuery ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search for products, tailors, brands..."
                      className={cn(
                        "bg-transparent border-none focus:outline-none",
                        "w-full text-sm placeholder:text-muted-foreground/70",
                        "transition-all duration-200"
                      )}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      aria-label="Search"
                    />
                    {searchQuery && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className={cn(
                          "p-1 rounded-full hover:bg-muted",
                          "focus:outline-none focus:ring-2 focus:ring-primary/20",
                          "transition-all duration-200"
                        )}
                        aria-label="Clear search"
                      >
                        <X
                          className="w-3 h-3 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </motion.button>
                    )}
                    <motion.button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className={cn(
                        "p-1.5 rounded-full hover:bg-muted",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-200 ml-1"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close search"
                    >
                      <X
                        className="w-4 h-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </motion.button>
                  </motion.form>

                  {/* Quick Suggestions */}
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={cn(
                        "absolute top-full left-0 right-0 mt-2 p-2",
                        "bg-background border rounded-lg shadow-lg",
                        "max-h-[300px] overflow-y-auto"
                      )}
                      role="listbox"
                    >
                      <div className="space-y-1">
                        {/* Recent Searches */}
                        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                          Recent Searches
                        </p>
                        {RECENT_SEARCHES.filter((item) =>
                          item.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((item) => (
                          <button
                            key={item}
                            onClick={() => handleSearchItemClick(item)}
                            className={cn(
                              "flex items-center gap-2 w-full px-2 py-1.5 rounded-md",
                              "text-sm hover:bg-muted transition-colors duration-200"
                            )}
                            role="option"
                          >
                            <Search
                              className="w-3 h-3 text-muted-foreground"
                              aria-hidden="true"
                            />
                            {item}
                          </button>
                        ))}

                        {/* Popular Categories */}
                        <div className="pt-2 mt-2 border-t">
                          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                            Popular Categories
                          </p>
                          <div className="flex flex-wrap gap-2 p-2">
                            {POPULAR_CATEGORIES.filter((category) =>
                              category
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            ).map((category) => (
                              <Badge
                                key={category}
                                variant="outline"
                                className="hover:bg-primary/5 cursor-pointer"
                                onClick={() => handleSearchItemClick(category)}
                                role="option"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  className={iconButtonClasses}
                  aria-label="Search"
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={iconButtonClasses}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[10px] text-gray-50 rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={iconButtonClasses}
              aria-label={`Shopping cart (${cartCount} items)`}
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[10px] text-gray-50 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <Link
              href="/chat"
              className={cn(iconButtonClasses, "hidden sm:flex")}
              aria-label={`Notifications (${notificationCount} unread)`}
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[10px] text-gray-50 rounded-full flex items-center justify-center font-medium">
                  {notificationCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Profile */}
            <Link
              href=""
              className={cn(iconButtonClasses, "hidden sm:flex")}
              aria-label="My Profile"
            >
              <User className="w-5 h-5" aria-hidden="true" />
            </Link>

            <Link
              href="/upload-product"
              className={cn(
                "hidden sm:flex items-center gap-2 px-4 py-2",
                "bg-primary text-primary-foreground rounded-full",
                "hover:bg-primary/90 transition-colors duration-200",
                "font-medium text-sm"
              )}
            >
              Sale or Trade
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("md:hidden", iconButtonClasses)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
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
                    <X className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Menu className="w-5 h-5" aria-hidden="true" />
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
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 py-4">
                {/* Mobile Search Bar */}
                <form onSubmit={handleSearch} className="px-4 mb-3">
                  <div className="flex items-center bg-muted rounded-lg overflow-hidden px-3">
                    <Search
                      className="w-4 h-4 text-muted-foreground flex-shrink-0"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent border-none focus:outline-none py-3 px-2 w-full text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      aria-label="Search"
                    />
                    <button
                      type="submit"
                      className="focus:outline-none focus:ring-2 focus:ring-primary/30 flex-shrink-0 bg-primary text-primary-foreground rounded-md px-3 py-1 text-xs"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {NAV_ITEMS.map((item) => (
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
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" aria-hidden="true" />
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
                    aria-label="My Profile"
                  >
                    <User className="w-5 h-5" aria-hidden="true" />
                    <span className="text-xs">Profile</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`Notifications (${notificationCount} unread)`}
                  >
                    <div className="relative">
                      <Bell className="w-5 h-5" aria-hidden="true" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[8px] text-primary-foreground rounded-full flex items-center justify-center font-medium">
                          {notificationCount > 9 ? "9+" : notificationCount}
                        </span>
                      )}
                    </div>
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
